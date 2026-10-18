import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

const normalize = value => String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
const messageOf = entry => entry?.message ?? entry;
const textOf = message => typeof message?.content === "string" ? message.content
  : Array.isArray(message?.content) ? message.content.filter(part => part?.type === "text").map(part => part.text).join(" ") : "";

export function isKitEdit(input) {
  const tool = input.tool_input ?? {};
  const file = tool.file_path ?? tool.notebook_path ?? tool.path ?? "";
  const content = [tool.content, tool.new_string, tool.newText, tool.new_source,
    ...(Array.isArray(tool.edits) ? tool.edits.map(edit => edit?.new_string ?? edit?.newText) : []),
  ].filter(value => typeof value === "string").join("\n");
  return /\.ets$/i.test(file) && /@(kit|ohos|hms)\./i.test(content);
}

export function nativeKitEdits(event) {
  const tool = event?.toolName?.toLowerCase();
  if (tool === "write" || tool === "edit") return [{ tool_name: event.toolName, tool_input: event.params ?? {} }].filter(isKitEdit);
  if (tool !== "apply_patch") return [];
  const patch = event.params?.input ?? event.params?.patch;
  if (typeof patch !== "string") return [];
  const edits = [];
  let file = "", added = [];
  const flush = () => {
    const input = { tool_name: event.toolName, tool_input: { path: file, content: added.join("\n") } };
    if (isKitEdit(input)) edits.push(input);
  };
  for (const line of patch.split(/\r?\n/)) {
    const header = /^\*\*\* (Add|Update|Delete) File: (.+)$/.exec(line);
    if (header) { flush(); file = header[1] === "Delete" ? "" : header[2]; added = []; }
    else if (line.startsWith("*** Move to: ")) file = line.slice("*** Move to: ".length);
    else if (line.startsWith("+")) added.push(line.slice(1));
  }
  flush();
  return edits;
}

// Diagnostic only, just like the original PreToolUse hook. Never blocks tools.
export async function observeKitEdit(input, { pluginRoot, messages, logDir = process.env.VK_LOG_DIR ?? path.join(os.homedir(), ".verikit") }) {
  try {
    if (!isKitEdit(input)) return;
    if (!messages) {
      const transcript = await fs.readFile(input.transcript_path, "utf8");
      messages = transcript.split(/\r?\n/).flatMap(line => {
        try { return [JSON.parse(line)]; } catch { return []; }
      });
    }
    const known = (await fs.readdir(path.join(pluginRoot, "skills"), { withFileTypes: true }))
      .filter(entry => entry.isDirectory()).map(entry => entry.name);
    if (!known.length) return;
    const latestUser = messages.findLastIndex(entry => messageOf(entry)?.role === "user" && textOf(messageOf(entry)));
    if (latestUser < 0) return;
    for (const entry of messages.slice(latestUser + 1)) {
      const message = messageOf(entry);
      if (message?.role !== "assistant") continue;
      const text = textOf(message);
      if (/<verikit-no-kit\b/i.test(text) || known.some(kit => normalize(text).includes(normalize(kit)))) return;
    }
    const tool = input.tool_input;
    const file = path.resolve(input.cwd ?? process.cwd(), tool.file_path ?? tool.notebook_path ?? tool.path);
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(path.join(logDir, "gate.log"), JSON.stringify({
      ts: new Date().toISOString(), tool: input.tool_name ?? "", file,
    }) + "\n");
  } catch { /* Missing transcript/catalog or an unwritable log must never affect an edit. */ }
}
