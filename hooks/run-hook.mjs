import { fileURLToPath } from "node:url";
import { routeTask, routingContext } from "../lib/routing.mjs";
import { observeKitEdit } from "../lib/kit-monitor.mjs";

const pluginRoot = fileURLToPath(new URL("../", import.meta.url));
let output = { continue: true };
try {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  const input = JSON.parse(raw);
  if (process.argv[2] === "user-prompt-submit" && typeof input.prompt === "string" && input.prompt.trim()) {
    const context = routingContext(await routeTask(pluginRoot, input.prompt), pluginRoot);
    if (context) output = { hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: context } };
  } else if (process.argv[2] === "pre-tool-use") {
    await observeKitEdit(input, { pluginRoot });
  }
} catch { /* Routing is advisory; a failed hook must allow the user's turn. */ }
process.stdout.write(JSON.stringify(output));
