import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";
const root = path.resolve(process.argv[2]);
const outputName = process.argv[3] ?? "native-controls.json";
const directory = path.join(root, "native-controls");
const workspaceDir = path.join(root, "workspace/app");
const pluginRoot = path.join(root, "workspace/.plugins/verikit-openclaw");
const hostRoot = "/opt/homebrew/lib/node_modules/openclaw";
await fs.mkdir(directory, { recursive: true });
process.env.OPENCLAW_HOME = path.join(directory, "home");
process.env.OPENCLAW_STATE_DIR = path.join(directory, "state");
process.env.OPENCLAW_CONFIG_PATH = path.join(directory, "openclaw.json");
process.env.VK_LOG_DIR = path.join(directory, "logs-" + outputName.replace(/\.json$/, ""));
const config = { agents: { defaults: { workspace: workspaceDir } }, session: { store: path.join(directory, "sessions.json") },
  plugins: { allow: ["verikit"], slots: { memory: "none" }, load: { paths: [pluginRoot] }, entries: { verikit: { enabled: true, hooks: { allowPromptInjection: true }, config: { monitorEdits: true } } } } };
await fs.writeFile(process.env.OPENCLAW_CONFIG_PATH, JSON.stringify(config));
process.argv[1] = path.join(hostRoot, "openclaw.mjs");
const { loadOpenClawPlugins } = await import(pathToFileURL(path.join(hostRoot, "dist/plugins/loader.js")));
const { getGlobalHookRunner } = await import(pathToFileURL(path.join(hostRoot, "dist/plugins/hook-runner-global.js")));
const { resolvePluginTools } = await import(pathToFileURL(path.join(hostRoot, "dist/plugins/tools.js")));
const { createPluginRuntime } = await import(pathToFileURL(path.join(hostRoot, "dist/plugins/runtime/index.js")));
const { createWriteToolDefinition } = await import(pathToFileURL(path.join(hostRoot, "dist/plugin-sdk/agent-sessions.js")));
const runtime = createPluginRuntime();
const sessionId = randomUUID(), sessionKey = "agent:main:verikit-native-control";
const transcriptPath = path.join(directory, sessionId + ".jsonl");
const initial = [ { type: "session", id: sessionId, version: 3, cwd: workspaceDir },
  { type: "message", id: "user-1", message: { role: "user", content: [{ type: "text", text: "直接编写当前实验文件" }] } } ];
const writeTranscript = entries => fs.writeFile(transcriptPath, entries.map(e => JSON.stringify(e)).join("\n") + "\n");
await writeTranscript(initial);
await runtime.agent.session.upsertSessionEntry({ sessionKey, agentId: "main", storePath: config.session.store, entry: { sessionId, sessionFile: transcriptPath, spawnedCwd: workspaceDir, updatedAt: Date.now() } });
assert.equal((await runtime.agent.session.getSessionEntry({ sessionKey, agentId: "main", storePath: config.session.store, readConsistency: "latest" }))?.sessionId, sessionId, "The controlled session must be persisted before testing the monitor.");
const ctx = { sessionId, sessionKey, agentId: "main", workspaceDir };
const checks = [];
async function check(name, fn) { try { const evidence = await fn(); checks.push({ name, passed: true, evidence }); } catch (error) { checks.push({ name, passed: false, error: error.message }); } }
const reload = async () => {
  await fs.writeFile(process.env.OPENCLAW_CONFIG_PATH, JSON.stringify(config));
  return loadOpenClawPlugins({ config, workspaceDir, onlyPluginIds: ["verikit"], cache: false, activate: true });
};
const logRows = async () => (await fs.readFile(path.join(process.env.VK_LOG_DIR, "gate.log"), "utf8").catch(() => "")).trim().split("\n").filter(Boolean).map(JSON.parse);
let registry = await reload();
await check("real host loads plugin", async () => { const record = registry.plugins.find(p => p.id === "verikit"); assert.equal(record.status, "loaded"); return { tools: record.toolNames, hooks: registry.typedHooks.map(h => h.hookName) }; });
await check("native prompt hook returns complete routing", async () => {
  const result = await getGlobalHookRunner().runBeforePromptBuild({ prompt: "帮我做一个待办事项 App，重启后还能读到之前保存的待办项。", messages: [] }, ctx);
  const r = JSON.parse(result.prependContext.match(/<verikit-routing>\s*(.+)\s*<\/verikit-routing>/)[1]);
  assert.ok(result.appendSystemContext.includes("then STOP and wait"));
  const readPlan = JSON.parse(result.appendSystemContext.match(/<verikit-read-plan>\n(.+)\n<\/verikit-read-plan>/)[1]);
  for (const kit of ["arkdata", "arkts"]) {
    const row = readPlan.find(row => row.kit === kit);
    await fs.access(row.skill);
    assert.ok(row.reference_candidates.length > 0);
    for (const file of row.reference_candidates) await fs.access(file);
  }
  assert.ok(result.appendSystemContext.includes("Complete BOTH checks for EVERY selected Kit before the first write"));
  assert.equal(r.skill_count, 101); assert.deepEqual(r.bundle, ["arkdata", "arkts"]); return { status: r.routing.status, bundle: r.bundle, refs: Object.keys(r.deep_references), readPlan };
});
await check("irrelevant prompt passes silently", async () => { for (const prompt of ["法国的首都是哪里？", "法国的首都是哪里？只回答城市名称。"]) { const result = await getGlobalHookRunner().runBeforePromptBuild({ prompt, messages: [] }, ctx); assert.equal(result?.prependContext, undefined); } });
await check("RC private review receives no automatic Kit guidance", async () => {
  const reviewCtx = { ...ctx, sessionKey: "agent:main:runtime-corrector:5e558ad4-898a-4e51-a9f5-0b74f6a048f3" };
  const result = await getGlobalHookRunner().runBeforePromptBuild({ prompt: "帮我做一个待办事项 App，重启后还能读到之前保存的待办项。", messages: [] }, reviewCtx);
  assert.equal(result?.prependContext, undefined);
  assert.equal(result?.appendSystemContext, undefined);
});
await check("native conflict remains ask-human", async () => {
  const result = await getGlobalHookRunner().runBeforePromptBuild({ prompt: "添加任务提醒通知，到点弹出并可点击查看", messages: [] }, ctx);
  const r = JSON.parse(result.prependContext.match(/<verikit-routing>\s*(.+)\s*<\/verikit-routing>/)[1]);
  assert.equal(r.routing.status, "conflict"); assert.equal(r.bundle_source, "ask-human"); return r.routing;
});
await check("native manually resolved tool returns existing references", async () => {
  const [tool] = resolvePluginTools({ context: { config, ...ctx }, runtimeRegistry: registry, toolAllowlist: ["verikit_route"] });
  const result = JSON.parse((await tool.execute("native-manual", { task: "保存应用数据使其在应用重启后仍可读取" })).content[0].text);
  for (const [kit, references] of Object.entries(result.deep_references)) for (const reference of references) await fs.access(path.join(result.catalog_root, kit, reference.path));
  return { skills: result.skill_count, bundle: result.bundle };
});
await check("native tool policy denies verikit_route", async () => { assert.equal(resolvePluginTools({ context: { config, ...ctx }, runtimeRegistry: registry, toolAllowlist: ["read"] }).length, 0); });
await check("real session API supports log-only native write", async () => {
  const params = { path: "native-probes/missing-kit.ets", content: "import { preferences } from '@kit.ArkData';\n" };
  const result = await getGlobalHookRunner().runBeforeToolCall({ toolName: "write", params }, ctx);
  assert.notEqual(result?.block, true);
  await createWriteToolDefinition(workspaceDir).execute("native-write", params);
  assert.equal(await fs.readFile(path.join(workspaceDir, params.path), "utf8"), params.content);
  assert.ok((await logRows()).some(row => row.file === path.join(workspaceDir, params.path)));
  return await logRows();
});
await check("Kit mention suppresses log in real transcript", async () => {
  await writeTranscript([...initial, { type: "message", message: { role: "assistant", content: [{ type: "text", text: "我使用 arkdata，已阅读文档。" }] } }]);
  const before = (await logRows()).length;
  await getGlobalHookRunner().runBeforeToolCall({ toolName: "edit", params: { path: "native-probes/mentioned.ets", newText: "import '@kit.ArkData';" } }, ctx);
  assert.equal((await logRows()).length, before);
  await writeTranscript(initial);
});
await check("native apply_patch SDK edit is observed", async () => {
  await getGlobalHookRunner().runBeforeToolCall({ toolName: "apply_patch", params: { input: "*** Begin Patch\n*** Add File: native-probes/patched.ets\n+import { preferences } from '@kit.ArkData';\n*** End Patch" } }, ctx);
  assert.ok((await logRows()).some(row => row.file.endsWith("/native-probes/patched.ets")));
});
await check("monitorEdits false suppresses native logging", async () => {
  config.plugins.entries.verikit.config.monitorEdits = false; registry = await reload();
  const before = (await logRows()).length;
  await getGlobalHookRunner().runBeforeToolCall({ toolName: "write", params: { path: "native-probes/monitor-off.ets", content: "import '@kit.ArkData';" } }, ctx);
  assert.equal((await logRows()).length, before);
  config.plugins.entries.verikit.config.monitorEdits = true;
});
await check("injection opt-out suppresses prompt but retains tool", async () => {
  config.plugins.entries.verikit.hooks.allowPromptInjection = false; registry = await reload();
  const result = await getGlobalHookRunner().runBeforePromptBuild({ prompt: "保存应用数据使其在应用重启后仍可读取", messages: [] }, ctx);
  assert.equal(result?.prependContext, undefined);
  assert.equal(result?.appendSystemContext, undefined);
  assert.equal(resolvePluginTools({ context: { config, ...ctx }, runtimeRegistry: registry, toolAllowlist: ["verikit_route"] }).length, 1);
  config.plugins.entries.verikit.hooks.allowPromptInjection = true; registry = await reload();
});
const cli = path.join(pluginRoot, "dist/verikit-cli.js"), original = await fs.readFile(cli);
try {
  for (const [name, content] of [["failure", "throw new Error('ISOLATED_EXPERIMENT_FAULT');"], ["timeout", "setInterval(()=>{},1000);"]]) {
    await fs.writeFile(cli, content);
    await check("native " + name + " fails open", async () => {
      const startedAt = Date.now();
      const result = await getGlobalHookRunner().runBeforePromptBuild({ prompt: "保存应用数据使其在应用重启后仍可读取", messages: [] }, ctx);
      assert.equal(result?.prependContext, undefined);
      return { elapsedMs: Date.now() - startedAt };
    });
    if (name === "failure") await check("manual routing error is explicit", async () => {
      const [tool] = resolvePluginTools({ context: { config, ...ctx }, runtimeRegistry: registry, toolAllowlist: ["verikit_route"] });
      assert.equal((await tool.execute("broken-route", { task: "保存数据" })).isError, true);
    });
  }
} finally { await fs.writeFile(cli, original); }
await check("fault injection restored exact router bytes", async () => { assert.deepEqual(await fs.readFile(cli), original); return createHash("sha256").update(original).digest("hex"); });
await check("enabled false registers no hooks or tools", async () => {
  config.plugins.entries.verikit.config.enabled = false; registry = await reload();
  assert.equal(registry.typedHooks.length, 0); assert.equal(registry.tools.length, 0);
});
const result = { at: new Date().toISOString(), mode: "deterministic real host SDK controls; no model call", hostVersion: runtime.version,
  checks, passed: checks.filter(c => c.passed).length, total: checks.length };
await fs.writeFile(path.join(root, outputName), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result));
if (result.passed !== result.total) process.exitCode = 1;
