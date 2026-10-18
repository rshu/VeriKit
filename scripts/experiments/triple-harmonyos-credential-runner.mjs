// Keep user-supplied credentials in memory and child environments, never files/argv.
import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(process.argv[2]);
const stages = process.argv.slice(3);
if (!stages.length) stages.push("specify");
const allowed = new Set(["specify", "drift", "develop", "repair", "finalize"]);
if (stages.some(stage => !allowed.has(stage))) throw new Error("Unknown experiment stage.");
await fs.mkdir(root, { recursive: true, mode: 0o700 });
process.stdin.setEncoding("utf8");
if (process.stdin.isTTY) process.stdin.setRawMode(true);
console.log("READY_FOR_CREDENTIALS: input is hidden; JSON array followed by newline.");
let keys;
try {
  keys = await new Promise((resolve, reject) => {
    let buffer = "";
    const timer = setTimeout(() => reject(new Error("Credential input timeout")), 60000);
    process.stdin.on("data", chunk => {
      buffer += chunk;
      if (buffer.length > 2000) { clearTimeout(timer); reject(new Error("Credential input too long")); return; }
      if (!buffer.includes("\n")) return;
      clearTimeout(timer); process.stdin.pause();
      try { resolve(JSON.parse(buffer.trim())); } catch { reject(new Error("Expected a JSON array of credentials")); }
    });
  });
  if (!Array.isArray(keys) || !keys.length || keys.length > 2 || keys.some(k => typeof k !== "string" || !/^[A-Za-z0-9._-]{16,256}$/.test(k))) throw new Error("Invalid credential input");
  const redact = text => keys.reduce((value, key) => value.replaceAll(key, "<redacted>"), text);
  const results = [], endpoint = "https://open.bigmodel.cn/api/anthropic/v1/messages";
  let selected;
  for (let index = 0; index < keys.length; index++) {
    try {
      const response = await fetch(endpoint, { method: "POST", headers: {
        "content-type": "application/json", "anthropic-version": "2023-06-01",
        authorization: "Bearer " + keys[index], "x-api-key": keys[index],
      }, body: JSON.stringify({ model: "glm-5.3-flash", max_tokens: 16,
        messages: [{ role: "user", content: "只回复 OK。这是隔离连通性检查。" }] }), signal: AbortSignal.timeout(20000) });
      const data = await response.json();
      const result = { credential: index === 0 ? "primary" : "backup", status: response.status,
        error: data.error ? { type: data.error.type, message: data.error.message } : undefined,
        model: data.model, connected: response.ok };
      results.push(result); console.log(redact(JSON.stringify(result)));
      if (response.ok) { selected = keys[index]; break; }
    } catch (error) {
      const result = { credential: index === 0 ? "primary" : "backup", connected: false, error: { message: error.message, code: error.cause?.code } };
      results.push(result); console.log(redact(JSON.stringify(result)));
    }
  }
  const connectivity = { at: new Date().toISOString(), endpoint, model: "glm-5.3-flash", checks: results };
  const historyFile = path.join(root, "provider-connectivity-history.jsonl");
  if (!await fs.access(historyFile).then(() => true, () => false)) {
    const previous = await fs.readFile(path.join(root, "provider-connectivity.json"), "utf8").then(JSON.parse).catch(() => null);
    if (previous) await fs.appendFile(historyFile, redact(JSON.stringify(previous)) + "\n", { mode: 0o600 });
  }
  await fs.appendFile(historyFile, redact(JSON.stringify(connectivity)) + "\n", { mode: 0o600 });
  await fs.writeFile(path.join(root, "provider-connectivity.json"), redact(JSON.stringify(connectivity, null, 2)) + "\n", { mode: 0o600 });
  if (!selected) throw new Error("No supplied credential passed the service check; no model workflow was started.");
  for (const stage of stages) {
    const child = spawn(process.execPath, [fileURLToPath(new URL("./triple-harmonyos-live.mjs", import.meta.url)), root, stage], {
      env: { ...process.env, VK_EXPERIMENT_MODEL_KEY: selected }, stdio: ["ignore", "pipe", "pipe"],
    });
    for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => {
      let text = chunk.toString();
      for (const key of keys) text = text.replaceAll(key, "<redacted>");
      process.stdout.write(text);
    });
    const code = await new Promise((resolve, reject) => { child.once("error", reject); child.once("exit", resolve); });
    if (code !== 0) { process.exitCode = 1; break; }
  }
} catch (error) {
  let message = error.message;
  for (const key of keys ?? []) message = message.replaceAll(key, "<redacted>");
  console.error(message); process.exitCode = 1;
} finally {
  keys = undefined;
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.stdin.pause();
}
