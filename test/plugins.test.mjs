import assert from "node:assert/strict";
import { spawnSync, execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import syncFs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";
import test, { before, after } from "node:test";
import { buildPlugin, HOSTS } from "../lib/plugin-builder.mjs";
import { routeTask, routingContext, referenceReadPlan } from "../lib/routing.mjs";
import { isKitEdit, nativeKitEdits, observeKitEdit } from "../lib/kit-monitor.mjs";
import { configureOpenClaw } from "../scripts/configure-openclaw.mjs";
import { installMA } from "../scripts/install-ma.mjs";

const sourceRoot = fileURLToPath(new URL("../", import.meta.url));
const task = "帮我做一个待办事项 App，重启后还能读到之前保存的待办项。";
const outputs = {};
let temporary, baseline;
const readJson = async file => JSON.parse(await fs.readFile(file, "utf8"));
const exists = async file => fs.access(file).then(() => true, () => false);
const cleanEnv = () => {
  const env = { ...process.env };
  for (const key of Object.keys(env)) if (/^(VERIKIT_|CLAUDE_PLUGIN_ROOT$|CODEAGENT3_PLUGIN_ROOT$)/.test(key)) delete env[key];
  return env;
};

before(async () => {
  temporary = await fs.mkdtemp(path.join(os.tmpdir(), "verikit-插件 $() & "));
  for (const host of HOSTS) outputs[host] = await buildPlugin({ host, sourceRoot, outputRoot: temporary });
  baseline = await routeTask(sourceRoot, task);
});
after(async () => { if (temporary) await fs.rm(temporary, { recursive: true, force: true }); });

test("builds three self-contained, mutually exclusive host packages", async () => {
  for (const host of HOSTS) {
    const root = outputs[host];
    const pkg = await readJson(path.join(root, "package.json"));
    assert.equal(pkg.version, "0.0.8");
    assert.equal(pkg.scripts, undefined);
    for (const directory of [".git", "node_modules", "test", "packaging", "bin"]) assert.equal(await exists(path.join(root, directory)), false);
    const dist = (await fs.readdir(path.join(root, "dist"))).sort();
    assert.deepEqual(dist, ["compositions", "contracts", "manifests", "verikit-cli.js"]);
    assert.equal((await fs.readdir(path.join(root, "dist/contracts"))).length, 100);
    assert.equal((await fs.readdir(path.join(root, "dist/manifests"))).length, 100);
    assert.equal(await fs.readFile(path.join(root, "dist/verikit-cli.js"), "utf8"), await fs.readFile(path.join(sourceRoot, "runtime/verikit-cli.js"), "utf8"));
    assert.deepEqual(pkg.bin, { verikit: "./dist/verikit-cli.js" });
    assert.equal(await exists(path.join(root, ".claude-plugin")), host === "claude");
    assert.equal(await exists(path.join(root, ".cac-plugin")), host === "codeagent");
    assert.equal(await exists(path.join(root, "openclaw.plugin.json")), host === "openclaw");
    assert.equal(await exists(path.join(root, "hooks")), host !== "openclaw");
    assert.equal(await exists(path.join(root, "commands")), host !== "openclaw");
    assert.equal(await exists(path.join(root, "lib/openclaw")), host === "openclaw");
    const listed = execFileSync(process.execPath, [path.join(root, "dist/verikit-cli.js"), "list-skills"], { env: cleanEnv(), cwd: temporary, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    assert.equal(listed.trim().split("\n").length, 101);
    assert.deepEqual(await routeTask(root, task), baseline, host);
  }
  const manifest = await readJson(path.join(outputs.openclaw, "openclaw.plugin.json"));
  const pkg = await readJson(path.join(outputs.openclaw, "package.json"));
  assert.deepEqual(pkg.openclaw.extensions, [manifest.main]);
  assert.equal(await exists(path.join(outputs.openclaw, manifest.main)), true);
  assert.deepEqual(manifest.contracts.tools, ["verikit_route"]);
  assert.equal(await exists(path.join(outputs.openclaw, "host-skills/verikit-route/SKILL.md")), true);
  assert.equal(await exists(path.join(outputs.openclaw, "skills/verikit-route")), false);
});

test("source CLI and root hook work without dist runtime inputs", async () => {
  assert.equal(await exists(path.join(sourceRoot, "dist/verikit-cli.js")), false);
  const pkg = await readJson(path.join(sourceRoot, "package.json"));
  assert.deepEqual(pkg.bin, { verikit: "./runtime/verikit-cli.js" });
  const listed = execFileSync(process.execPath, [path.join(sourceRoot, pkg.bin.verikit), "list-skills"], { env: cleanEnv(), encoding: "utf8" });
  assert.equal(listed.trim().split("\n").length, 101);
  const result = spawnSync(process.execPath, [path.join(sourceRoot, "hooks/run-hook.mjs"), "user-prompt-submit"], {
    env: cleanEnv(), input: JSON.stringify({ prompt: task }), encoding: "utf8", timeout: 20000,
  });
  assert.equal(result.status, 0, result.stderr);
  const context = JSON.parse(result.stdout).hookSpecificOutput.additionalContext;
  assert.deepEqual(JSON.parse(context.match(/<verikit-routing>\n(.+)\n<\/verikit-routing>/)[1]), baseline);
});

test("rebuild replaces only its own artifact and never copies earlier builds", async () => {
  const marker = path.join(outputs.codeagent, "unrelated.txt");
  await fs.writeFile(marker, "keep");
  await fs.writeFile(path.join(outputs.claude, "stale.txt"), "remove");
  await buildPlugin({ host: "claude", sourceRoot, outputRoot: temporary });
  assert.equal(await exists(path.join(outputs.claude, "stale.txt")), false);
  assert.equal(await fs.readFile(marker, "utf8"), "keep");
  await fs.rm(marker);
  await assert.rejects(buildPlugin({ host: "unknown", sourceRoot, outputRoot: temporary }), /Plugin host/);
  const linked = path.join(temporary, "symlinks");
  await fs.mkdir(linked);
  await fs.symlink(sourceRoot, path.join(linked, "verikit-openclaw"), "dir");
  await assert.rejects(buildPlugin({ host: "openclaw", sourceRoot, outputRoot: linked }), /symlink/);
});

test("host routing ignores foreign discovery overrides while the standalone CLI retains them", async () => {
  const foreign = path.join(temporary, "foreign-catalog");
  await fs.mkdir(path.join(foreign, "skills/foreign-kit"), { recursive: true });
  await fs.writeFile(path.join(foreign, "skills/foreign-kit/SKILL.md"), "---\nname: foreign-kit\ndescription: foreign catalog\n---\nForeign content.\n");
  await fs.mkdir(path.join(foreign, "contracts"));
  const contract = await readJson(path.join(sourceRoot, "runtime/contracts/arkdata.json"));
  contract.contract.use_when = ["foreign override only"];
  await fs.writeFile(path.join(foreign, "contracts/arkdata.json"), JSON.stringify(contract));
  await fs.mkdir(path.join(foreign, "manifests"));
  await fs.writeFile(path.join(foreign, "manifests/arkdata.json"), JSON.stringify({ references: [] }));
  await fs.writeFile(path.join(foreign, "recipes.json"), JSON.stringify({ compositions: [] }));
  const env = { ...cleanEnv(), VERIKIT_SKILL_ROOT: foreign, VERIKIT_CONTRACTS_DIR: path.join(foreign, "contracts"),
    VERIKIT_MANIFESTS_DIR: path.join(foreign, "manifests"), VERIKIT_COMPOSITIONS_FILE: path.join(foreign, "recipes.json") };
  for (const host of HOSTS) {
    const code = `import { routeTask } from ${JSON.stringify(pathToFileURL(path.join(outputs[host], "lib/routing.mjs")).href)}; console.log(JSON.stringify(await routeTask(${JSON.stringify(outputs[host])}, ${JSON.stringify(task)})));`;
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", code], { env, encoding: "utf8", timeout: 20000 });
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout), baseline, host);
  }
  const manual = execFileSync(process.execPath, [path.join(outputs.claude, "dist/verikit-cli.js"), "list-skills"], { env, encoding: "utf8" });
  assert.equal(manual.trim().split("\n").length, 1);
  assert.match(manual, /foreign-kit/);
});

for (const [host, variable, manifestDir] of [["claude", "CLAUDE_PLUGIN_ROOT", ".claude-plugin"], ["codeagent", "CODEAGENT3_PLUGIN_ROOT", ".cac-plugin"]]) {
  test(`${host}: declared hooks execute from another working directory, with Unicode and shell characters in the install path`, async () => {
    const root = outputs[host];
    const hooks = (await readJson(path.join(root, "hooks/hooks.json"))).hooks;
    const manifest = await readJson(path.join(root, manifestDir, "plugin.json"));
    const market = await readJson(path.join(root, manifestDir, "marketplace.json"));
    assert.equal(market.plugins[0].version, manifest.version);
    assert.deepEqual(Object.keys(hooks), ["UserPromptSubmit", "PreToolUse"]);
    const command = hooks.UserPromptSubmit[0].hooks[0].command;
    assert.match(command, new RegExp(variable));
    const env = { ...cleanEnv(), [variable]: root, VK_LOG_DIR: path.join(temporary, "logs") };
    const run = input => spawnSync(command, { shell: true, cwd: temporary, env, input, encoding: "utf8", timeout: 20000 });
    const result = run(JSON.stringify({ prompt: task }));
    assert.equal(result.status, 0, result.stderr);
    const context = JSON.parse(result.stdout).hookSpecificOutput.additionalContext;
    assert.ok(context.includes("<verikit-routing>\n"));
    assert.ok(context.includes(`Catalog root: ${JSON.stringify(path.join(root, "skills"))}.`));
    assert.deepEqual(JSON.parse(context.match(/<verikit-routing>\n(.+)\n<\/verikit-routing>/)[1]), baseline);
    assert.deepEqual(JSON.parse(run("invalid").stdout), { continue: true });
    assert.deepEqual(JSON.parse(run('{"prompt":""}').stdout), { continue: true });
    assert.deepEqual(JSON.parse(run('{"prompt":"What is the capital of France?"}').stdout), { continue: true });
    assert.deepEqual(JSON.parse(run('{"prompt":"法国的首都是哪里？"}').stdout), { continue: true });
    assert.deepEqual(JSON.parse(run('{"prompt":"法国的首都是哪里？只回答城市名称。"}').stdout), { continue: true });
    const pre = spawnSync(hooks.PreToolUse[0].hooks[0].command, { shell: true, env, input: "{}", encoding: "utf8" });
    assert.equal(pre.status, 0, pre.stderr);
    assert.deepEqual(JSON.parse(pre.stdout), { continue: true });
    const missing = spawnSync(command, { shell: true, env: cleanEnv(), input: "{}", encoding: "utf8" });
    assert.notEqual(missing.status, 0);
    assert.equal(missing.stdout, "");

    // Execute the command's real bootstrap with the host-substituted inline
    // root, with no exported root variable (slash-command host behavior).
    const markdown = await fs.readFile(path.join(root, "commands/verikit-route.md"), "utf8");
    const bootstrap = markdown.match(/node -e "([^"]+)" "\$\{[^}]+\}" route/)[1];
    const manual = spawnSync(process.execPath, ["-e", bootstrap, root, "route", "--task", task, "--top", "5", "--compose", "--deep", "--refs", "5"], { cwd: temporary, env: cleanEnv(), encoding: "utf8", timeout: 20000 });
    assert.equal(manual.status, 0, manual.stderr);
    assert.deepEqual(JSON.parse(manual.stdout), baseline);
  });
}

async function registration(config = {}) {
  const hooks = new Map(), tools = [];
  const entry = (await import(pathToFileURL(path.join(outputs.openclaw, "lib/openclaw/entry.mjs")))).default;
  const api = { runtime: { version: "2026.7.1-2" }, pluginConfig: config,
    on: (name, fn, options) => hooks.set(name, { fn, options }), registerTool: (tool, options) => tools.push({ tool, options }) };
  entry.register(api);
  return { api, entry, hooks, tools };
}

test("OpenClaw registers native hooks and optional tool; honors disabled and metadata modes and exact host version", async () => {
  const { entry, api, hooks, tools } = await registration();
  assert.deepEqual([...hooks.keys()], ["before_prompt_build", "before_tool_call"]);
  assert.equal(tools[0].tool.name, "verikit_route");
  assert.equal(tools[0].options.optional, true);
  assert.equal((await registration({ enabled: false })).hooks.size, 0);
  assert.equal((await registration({ enabled: false })).tools.length, 0);
  assert.doesNotThrow(() => entry.register({ registrationMode: "cli-metadata" }));
  assert.throws(() => entry.register({ ...api, runtime: { version: "2026.7.1" } }), /requires OpenClaw 2026.7.1-2/);
});

test("OpenClaw prompt and tool preserve ranking, conflicts, references and fail-open behavior", async () => {
  const { hooks, tools } = await registration();
  const prompt = hooks.get("before_prompt_build").fn;
  const result = await prompt({ prompt: task, messages: [] }, {});
  assert.ok(result.prependContext.includes("catalog root"));
  assert.ok(result.appendSystemContext.includes("then STOP and wait"));
  const tool = await tools[0].tool.execute("route-1", { task });
  const routed = JSON.parse(tool.content[0].text);
  const { catalog_root, read_plan, ...ranking } = routed;
  assert.equal(catalog_root, path.join(outputs.openclaw, "skills"));
  assert.deepEqual(read_plan, referenceReadPlan(baseline, outputs.openclaw));
  assert.deepEqual(ranking, baseline);
  assert.equal(await prompt({ prompt: "What is the capital of France?", messages: [] }, {}), undefined);
  assert.equal(await prompt({ prompt: "法国的首都是哪里？", messages: [] }, {}), undefined);
  assert.equal(await prompt({ prompt: "法国的首都是哪里？只回答城市名称。", messages: [] }, {}), undefined);
  assert.ok((await prompt({ prompt: "实现按城市名称查询天气数据的应用功能", messages: [] }, {}))?.prependContext);
  assert.equal(await prompt({ prompt: task, currentUserMessage: "", messages: [] }, {}), undefined);
  assert.equal(await prompt({ prompt: task }, { hookInvocation: { assertActive() { throw new Error("expired"); } } }), undefined);
  assert.equal((await tools[0].tool.execute("invalid", { task: 1 })).isError, true);
  const conflict = await routeTask(outputs.openclaw, "添加任务提醒通知，到点弹出并可点击查看");
  assert.equal(conflict.routing.status, "conflict");
  assert.equal(conflict.bundle_source, "ask-human");
  assert.ok(routingContext(conflict, outputs.openclaw).includes("never silently substitute"));
  await assert.rejects(routeTask(outputs.openclaw, task, { timeoutMs: 1 }));
  await assert.rejects(routeTask(temporary, task));
});

test("OpenClaw keeps Runtime Corrector private reviews free of Kit selection prompts", async () => {
  const { hooks } = await registration();
  const prompt = hooks.get("before_prompt_build").fn;
  const event = { prompt: task, messages: [] };
  const review = { sessionKey: "agent:main:runtime-corrector:5e558ad4-898a-4e51-a9f5-0b74f6a048f3" };
  assert.equal(await prompt(event, review), undefined);
  assert.equal(await hooks.get("before_tool_call").fn({ toolName: "write", params: { path: "file.ets", content: "import { preferences } from '@kit.ArkData';" } }, review), undefined);
  const business = await prompt(event, { sessionKey: "agent:main:joint-main" });
  assert.ok(business.prependContext.includes("<verikit-routing>"));
  assert.ok(business.appendSystemContext.includes("<verikit-protocol>"));
  // Mentioning the reviewer name in a normal task does not suppress routing.
  assert.ok((await prompt({ prompt: task + " 与 runtime-corrector 联合验证" }, { sessionKey: "agent:main:other" })).prependContext);
});

test("per-Kit read plan survives noisy recipes and missing deep hits without approving candidate Kits", async () => {
  const { hooks } = await registration();
  const result = await hooks.get("before_prompt_build").fn({ prompt: "我选择 local-persistence 配方的 arkdata、arkts；界面使用现有 ArkUI 基础组件。现在请开发真实鸿蒙 TodoList。先阅读 app/requirements.md，严格满足其中功能与公开 TodoModel 接口；然后按 VeriKit 结果先读取所选 Kit 的 SKILL.md 和本任务参考文档，再编写代码。已确认 Kit，不必再次提问。工程目录是 app，禁止修改 .plugins。不要声称已编译或已运行，外部实验程序会独立验证。尽量在本轮完成。" }, {});
  const plan = JSON.parse(result.appendSystemContext.match(/<verikit-read-plan>\n(.+)\n<\/verikit-read-plan>/)[1]);
  for (const kit of ["arkdata", "arkts"]) {
    const row = plan.find(row => row.kit === kit);
    await fs.access(row.skill);
    const source = await fs.readFile(row.skill, "utf8");
    const lines = source.match(/[^\n]*\n|[^\n]+$/g);
    let next = 1;
    const chunks = [];
    for (const step of row.skill_reads) {
      assert.equal(step.path, row.skill);
      assert.equal(step.offset, next);
      const chunk = lines.slice(step.offset - 1, step.offset - 1 + step.limit).join("");
      assert.ok(Buffer.byteLength(chunk) <= 32 * 1024);
      chunks.push(chunk); next += step.limit;
    }
    assert.equal(chunks.join(""), source, "read ranges must cover the exact Unicode source without gaps");
    assert.ok(row.reference_candidates.length > 0);
    for (const file of row.reference_candidates) await fs.access(file);
  }
  assert.ok(result.appendSystemContext.includes("Complete BOTH checks for EVERY selected Kit before the first write"));
  assert.ok(result.appendSystemContext.includes("Supporting and language Kits need their own reference reads"));
  assert.ok(result.appendSystemContext.includes("reference TO THE END for EACH selected Kit"));
  const arkts = plan.find(row => row.kit === "arkts");
  assert.equal(arkts.reference_candidates[0], path.join(outputs.openclaw, "skills/arkts/references/异步并发 (Promise和async_await).md"));
  assert.ok(arkts.task_reference_hints[0].reason.includes("asynchronous storage"));
  assert.ok(result.appendSystemContext.includes("NOT approved Kits or completed reads"));
  const fallback = referenceReadPlan({ top: [{ name: "arkts" }], bundle: [] }, outputs.openclaw);
  assert.equal(fallback[0].skill, path.join(outputs.openclaw, "skills/arkts/SKILL.md"));
  assert.deepEqual(fallback[0].reference_candidates, []);
});

test("read plan paths cannot escape the installed Kit directory", () => {
  const plan = referenceReadPlan({ bundle: ["arkts", "../outside"], deep_references: { arkts: [
    { path: "references/异步并发 (Promise和async_await).md" },
    { path: "references/../../outside.md" }, { path: "/outside.md" },
    { path: "references/..\\outside.md" }, { path: "references/./fake.md" },
  ] } }, outputs.openclaw);
  assert.equal(plan.length, 1);
  assert.deepEqual(plan[0].reference_candidates, [path.join(outputs.openclaw, "skills/arkts/references/异步并发 (Promise和async_await).md")]);
});

test("prompt truncation counts Unicode code points and never executes task text in a shell", async () => {
  const payload = "😀".repeat(3999) + "存" + "储; $(touch injected) `touch injected`";
  const result = await routeTask(outputs.openclaw, payload);
  assert.equal(Array.from(result.task).length, 4000);
  assert.equal(result.task.endsWith("存"), true);
  assert.equal(await exists(path.join(outputs.openclaw, "injected")), false);
});

test("Kit edit monitor stays log-only and only examines assistant text after the latest user prompt", async () => {
  const logDir = path.join(temporary, "monitor");
  const input = { cwd: temporary, tool_name: "edit", tool_input: { path: "Index.ets", newText: "import { preferences } from '@kit.ArkData';" } };
  assert.equal(isKitEdit(input), true);
  assert.equal(isKitEdit({ tool_input: { path: "README.md", content: "@kit.ArkData" } }), false);
  const messages = [{ role: "assistant", content: "arkdata" }, { role: "user", content: task }];
  await observeKitEdit(input, { pluginRoot: outputs.openclaw, messages, logDir });
  let rows = (await fs.readFile(path.join(logDir, "gate.log"), "utf8")).trim().split("\n");
  assert.equal(rows.length, 1);
  assert.equal(JSON.parse(rows[0]).file, path.join(temporary, "Index.ets"));
  await observeKitEdit(input, { pluginRoot: outputs.openclaw, messages: [...messages, { role: "assistant", content: [{ type: "text", text: "使用 arkdata" }] }], logDir });
  await observeKitEdit(input, { pluginRoot: outputs.openclaw, messages: [...messages, { role: "assistant", content: "<verikit-no-kit>" }], logDir });
  await observeKitEdit(input, { pluginRoot: outputs.openclaw, logDir });
  rows = (await fs.readFile(path.join(logDir, "gate.log"), "utf8")).trim().split("\n");
  assert.equal(rows.length, 1);
});

test("native apply_patch monitoring scopes SDK additions to each ArkTS file", () => {
  const input = ["*** Begin Patch", "*** Add File: a.ets", "+import '@kit.ArkData';", "*** Update File: readme.md", "+@kit.ArkData", "*** Update File: b.ets", "-import '@kit.ArkData';", "+Text('plain UI')", "*** Update File: c.ets", "*** Move to: renamed.ets", "+import '@ohos.data.preferences';", "*** Delete File: removed.ets", "*** End Patch"].join("\n");
  assert.deepEqual(nativeKitEdits({ toolName: "apply_patch", params: { input } }).map(e => e.tool_input.path), ["a.ets", "renamed.ets"]);
  assert.deepEqual(nativeKitEdits({ toolName: "exec", params: { input } }), []);
  assert.deepEqual(nativeKitEdits({ toolName: "apply_patch", params: {} }), []);
});

test("OpenClaw native edit monitor reads the session API's direct entry and follows spawnedCwd", async () => {
  const { hooks, api } = await registration();
  const transcript = path.join(temporary, "native-session.jsonl");
  await fs.writeFile(transcript, JSON.stringify({ type: "message", message: { role: "user", content: task } }) + "\n");
  const store = path.join(temporary, "sessions.json");
  const entry = { sessionId: "session-1", spawnedCwd: temporary };
  api.runtime.agent = { session: {
    resolveStorePath: () => store,
    getSessionEntry: options => { assert.equal(options.sessionKey, "agent:main:session-1"); return entry; },
    resolveSessionFilePath: (id, value, options) => { assert.equal(id, entry.sessionId); assert.equal(value, entry); assert.equal(options.sessionsDir, temporary); return transcript; },
  } };
  const logDir = path.join(temporary, "native-monitor");
  const priorLog = process.env.VK_LOG_DIR;
  process.env.VK_LOG_DIR = logDir;
  try {
    const monitor = hooks.get("before_tool_call").fn;
    assert.equal(await monitor({ toolName: "write", params: { path: "Index.ets", content: "import '@kit.ArkData';" } }, { sessionKey: "agent:main:session-1", sessionId: "session-1" }), undefined);
    assert.equal(JSON.parse((await fs.readFile(path.join(logDir, "gate.log"), "utf8")).trim()).file, path.join(temporary, "Index.ets"));
    await monitor({ toolName: "apply_patch", params: { input: "*** Begin Patch\n*** Add File: Patched.ets\n+import '@kit.ArkData';\n*** End Patch" } }, { sessionKey: "agent:main:session-1", sessionId: "session-1" });
    const recorded = (await fs.readFile(path.join(logDir, "gate.log"), "utf8")).trim().split("\n").map(JSON.parse);
    assert.equal(recorded.at(-1).file, path.join(temporary, "Patched.ets"));
    delete entry.spawnedCwd;
    entry.spawnedWorkspaceDir = path.join(temporary, "spawned-workspace");
    await monitor({ toolName: "write", params: { path: "Spawned.ets", content: "import '@kit.ArkData';" } }, { sessionKey: "agent:main:session-1", sessionId: "session-1" });
    const spawnedLog = (await fs.readFile(path.join(logDir, "gate.log"), "utf8")).trim().split("\n").map(JSON.parse);
    assert.equal(spawnedLog.at(-1).file, path.join(entry.spawnedWorkspaceDir, "Spawned.ets"));
    delete entry.spawnedWorkspaceDir;
    const mainWorkspace = path.join(temporary, "agent-workspace");
    api.config = { agents: { defaults: { workspace: mainWorkspace } } };
    api.runtime.agent.resolveAgentWorkspaceDir = (config, agentId) => {
      assert.equal(config, api.config); assert.equal(agentId, "main"); return mainWorkspace;
    };
    await monitor({ toolName: "write", params: { path: "Main.ets", content: "import '@kit.ArkData';" } }, { sessionKey: "agent:main:session-1", sessionId: "session-1" });
    const mainLog = (await fs.readFile(path.join(logDir, "gate.log"), "utf8")).trim().split("\n").map(JSON.parse);
    assert.equal(mainLog.at(-1).file, path.join(mainWorkspace, "Main.ets"));
    assert.equal(await monitor({ toolName: "write", params: { path: "Index.ets", content: "import '@kit.ArkData';" } }, { sessionKey: "agent:main:session-1", sessionId: "replaced" }), undefined);
  } finally {
    if (priorLog === undefined) delete process.env.VK_LOG_DIR; else process.env.VK_LOG_DIR = priorLog;
  }
});

test("configuration helper preserves plugins, tool restrictions and inherited alsoAllow; backs up exact bytes and is idempotent", async () => {
  const configPath = path.join(temporary, "openclaw.json");
  const config = {
    tools: { profile: "coding", alsoAllow: ["browser"], deny: ["exec"] },
    agents: { list: [{ id: "main", tools: { deny: ["write"] } }, { id: "other", tools: { alsoAllow: ["read"] } }] },
    plugins: { load: { paths: ["/host/other"] }, allow: ["other"], entries: { other: { enabled: false }, verikit: { config: { monitorEdits: false } } } },
  };
  const original = JSON.stringify(config, null, 2) + "\n";
  await fs.writeFile(configPath, original);
  const params = { configPath, pluginRoot: outputs.openclaw, toolAgent: "main" };
  const result = await configureOpenClaw(params);
  assert.equal(await fs.readFile(result.backupPath, "utf8"), original);
  const updated = await readJson(configPath);
  assert.deepEqual(updated.tools, config.tools);
  assert.deepEqual(updated.agents.list[1], config.agents.list[1]);
  assert.deepEqual(updated.agents.list[0].tools, { deny: ["write"], alsoAllow: ["browser", "verikit_route"] });
  assert.deepEqual(updated.plugins.entries.other, config.plugins.entries.other);
  assert.equal(updated.plugins.entries.verikit.config.monitorEdits, false);
  assert.equal(updated.plugins.entries.verikit.hooks.allowPromptInjection, true);
  assert.deepEqual(updated.plugins.load.paths, ["/host/other", outputs.openclaw.replaceAll("\\", "/")]);
  assert.equal((await configureOpenClaw(params)).changed, false);
  const before = await fs.readFile(configPath, "utf8");
  await assert.rejects(configureOpenClaw({ ...params, toolAgent: "absent" }), /not found/);
  assert.equal(await fs.readFile(configPath, "utf8"), before);
  await fs.writeFile(configPath, '{"plugins":{"load":{"paths":"invalid"}}}');
  await assert.rejects(configureOpenClaw(params), /array of paths/);
  assert.equal(await fs.readFile(configPath, "utf8"), '{"plugins":{"load":{"paths":"invalid"}}}');
  for (const allow of [undefined, []]) {
    const open = { plugins: { load: { paths: ["/host/other"] }, entries: { other: { enabled: true } }, ...(allow === undefined ? {} : { allow }) } };
    await fs.writeFile(configPath, JSON.stringify(open));
    await configureOpenClaw({ configPath, pluginRoot: outputs.openclaw });
    const updatedOpen = await readJson(configPath);
    assert.equal(Object.hasOwn(updatedOpen.plugins, "allow"), allow !== undefined);
    assert.deepEqual(updatedOpen.plugins.allow, allow);
    assert.equal(updatedOpen.plugins.entries.other.enabled, true);
    assert.equal((await configureOpenClaw({ configPath, pluginRoot: outputs.openclaw })).changed, false);
  }
});

test("unified MA install stops on native install failure and reports registration failure", async () => {
  const hostRoot = path.join(temporary, "failed-ma");
  const cliRoot = path.join(hostRoot, "resources/openclaw");
  const stateDir = path.join(temporary, "failed-profile");
  await fs.mkdir(cliRoot, { recursive: true });
  await fs.mkdir(stateDir);
  await fs.writeFile(path.join(cliRoot, "package.json"), JSON.stringify({ version: "2026.7.1-2" }));
  const configPath = path.join(stateDir, "openclaw.json");
  const original = JSON.stringify({ agents: { list: [{ id: "main" }] }, tools: { deny: ["exec"] } });
  await fs.writeFile(configPath, original);
  const attempted = path.join(stateDir, "attempt.json");
  await fs.writeFile(path.join(cliRoot, "openclaw.mjs"), `
import fs from 'node:fs';
import path from 'node:path';
fs.writeFileSync(path.join(process.env.OPENCLAW_STATE_DIR, 'attempt.json'), JSON.stringify({ args: process.argv.slice(2), config: process.env.OPENCLAW_CONFIG_PATH }));
process.exit(7);
`);
  const options = { hostRoot, configPath, packageRoot: outputs.openclaw, force: true };
  await assert.rejects(installMA(options), /installation failed \(7\).*registration was not run/);
  assert.equal(await fs.readFile(configPath, "utf8"), original);
  assert.deepEqual(await readJson(attempted), { args: ["plugins", "install", "--force", outputs.openclaw], config: configPath });
  await fs.rm(attempted);
  await assert.rejects(installMA({ ...options, toolAgent: "absent" }), /agent not found/);
  assert.equal(await exists(attempted), false, "missing agents must fail before installing");
  await fs.writeFile(path.join(cliRoot, "openclaw.mjs"), "process.exit(0);\n");
  await assert.rejects(installMA(options), /files were installed, but configuration registration failed/);
  assert.equal(await fs.readFile(configPath, "utf8"), original);
  assert.deepEqual((await fs.readdir(stateDir)).sort(), ["openclaw.json"]);
});

test("unified install with real MA CLI survives two actual startup cleanups and preserves agent tools", {
  skip: !process.env.VERIKIT_MA_HOST_ROOT && "Set VERIKIT_MA_HOST_ROOT to the packaged MA directory.",
}, async () => {
  const hostRoot = process.env.VERIKIT_MA_HOST_ROOT;
  // Read the installed startup code; all writes below target temporary state.
  const archive = await fs.open(path.join(hostRoot, "resources/app.asar"), "r");
  let source;
  try {
    const prefix = Buffer.alloc(16);
    await archive.read(prefix, 0, prefix.length, 0);
    const header = Buffer.alloc(prefix.readUInt32LE(12));
    await archive.read(header, 0, header.length, 16);
    const files = JSON.parse(header).files["dist-electron"].files.main.files;
    for (const [name, entry] of Object.entries(files)) {
      if (!name.endsWith(".js") || entry.unpacked) continue;
      const bytes = Buffer.alloc(entry.size);
      await archive.read(bytes, 0, bytes.length, 8 + prefix.readUInt32LE(4) + Number(entry.offset));
      const text = bytes.toString("utf8");
      if (text.includes("function cleanupStalePluginConfigs(")) { source = text; break; }
    }
  } finally { await archive.close(); }
  assert.ok(source, "installed MA startup code must be present");
  const functions = ["pluginEntryExists", "scanPluginManifestIds", "collectKnownPluginIds",
    "ensureDefaultPluginPaths", "cleanupStalePluginConfigs", "forceTemplateValues", "getPathValue", "ensureDefaults"].map(name => {
    const start = source.indexOf(`function ${name}(`);
    const end = source.indexOf("function ", start + 9);
    assert.ok(start >= 0 && end > start, `installed ${name} must be extractable`);
    return source.slice(start, end);
  }).join("\n");
  const defaults = await readJson(path.join(hostRoot, "resources/openclaw-defaults.json"));
  const configPath = path.join(temporary, "ma-openclaw.json");
  let config = {
    plugins: { allow: ["verikit"], entries: { verikit: { enabled: true } } },
    tools: { profile: "coding", alsoAllow: [...defaults.tools.alsoAllow, "verikit_route"], deny: ["exec"] },
    agents: { list: [{ id: "main", tools: { deny: ["write"] } },
      { id: "other", tools: { alsoAllow: ["read"], deny: ["verikit_route"] } }] },
  };
  const errors = [];
  const context = vm.createContext({
    u: syncFs, path$2: path, DEFAULT_PLUGIN_ENTRY: "dist/index.js", SEMVER_SUFFIX_REGEX: /[.-]\d+\.\d+.*/,
    electron: { app: { isPackaged: true, getPath: () => temporary } },
    getResourcesDirPath$1: () => path.join(hostRoot, "resources"),
    readPluginRegistry: () => ({}), readAllPluginStates: () => ({}), isYellowMode: () => false,
    readConfig$2: () => config, writeConfig$2: next => { config = next; },
    performBackup: () => "isolated-test-only", cleanupOldBackups() {},
    loadDefaults: () => defaults, readConfigFile: () => config, writeConfig$3: next => { config = next; },
    CONFIG_PATH: configPath, ConfigParseError: class extends Error {}, KNOWN_INVALID_KEYS: {},
    getDefaultAgentEntries: () => [], DEFAULT_CRON_MAX_CONCURRENT_RUNS: 3,
    EXACT_TOOLS_ARRAY_PATHS: new Set(["tools.alsoAllow", "tools.deny", "tools.media.image.models"]),
    logger$2: { info() {}, warn: (...args) => errors.push(args), error: (...args) => errors.push(args) },
  });
  vm.runInContext(functions, context);
  const startup = () => vm.runInContext("ensureDefaults(); ensureDefaultPluginPaths(); cleanupStalePluginConfigs();", context);
  startup();
  assert.equal(config.plugins.entries.verikit, undefined, "install/enable alone is removed");
  assert.ok(!config.plugins.allow.includes("verikit"));
  assert.ok(!config.tools.alsoAllow.includes("verikit_route"), "global tool opt-in is overwritten");

  await fs.writeFile(configPath, JSON.stringify(config));
  const installed = spawnSync(process.execPath, [path.join(outputs.openclaw, "scripts/install-ma.mjs"),
    "--host-root", hostRoot, "--config", configPath], {
    encoding: "utf8", timeout: 120000, windowsHide: true,
    env: { ...cleanEnv(), OPENCLAW_HOME: temporary, OPENCLAW_NO_RESPAWN: "1" },
  });
  assert.equal(installed.status, 0, installed.stderr + installed.stdout);
  assert.match(installed.stdout, /VeriKit installed and registered for MA/);
  config = await readJson(configPath);
  const entry = structuredClone(config.plugins.entries.verikit);
  const mainTools = structuredClone(config.agents.list[0].tools);
  const otherAgent = structuredClone(config.agents.list[1]);
  assert.equal(entry.hooks.allowPromptInjection, true);
  assert.ok(mainTools.alsoAllow.includes("verikit_route"));
  assert.deepEqual(mainTools.deny, ["write"]);
  for (let restart = 0; restart < 2; restart++) {
    startup();
    assert.deepEqual(config.plugins.entries.verikit, entry);
    assert.ok(config.plugins.allow.includes("verikit"));
    assert.ok(config.plugins.load.paths.includes(path.join(temporary, "extensions/verikit").replaceAll("\\", "/")));
    assert.deepEqual(config.agents.list[0].tools, mainTools);
    assert.deepEqual(config.agents.list[1], otherAgent);
  }
  assert.deepEqual(errors, [], "real startup functions must complete without swallowed errors");
});

test("installed OpenClaw 2026.7.1-2 loads the artifact and dispatches native prompt hooks and tools with isolated state", async t => {
  const hostRoot = process.env.VERIKIT_OPENCLAW_HOST_ROOT ?? "/opt/homebrew/lib/node_modules/openclaw";
  const hostPackage = await readJson(path.join(hostRoot, "package.json")).catch(() => null);
  if (hostPackage?.version !== "2026.7.1-2") {
    if (process.env.VERIKIT_OPENCLAW_HOST_ROOT) assert.fail("VERIKIT_OPENCLAW_HOST_ROOT must point to OpenClaw 2026.7.1-2.");
    t.skip("Install OpenClaw 2026.7.1-2 or set VERIKIT_OPENCLAW_HOST_ROOT for native validation.");
    return;
  }
  const isolated = path.join(temporary, "native-host");
  await fs.mkdir(isolated);
  const script = path.join(isolated, "probe.mjs");
  await fs.writeFile(script, `
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const hostRoot = ${JSON.stringify(hostRoot)};
const pluginRoot = ${JSON.stringify(outputs.openclaw)};
const workspaceDir = ${JSON.stringify(isolated)};
process.argv[1] = path.join(hostRoot, 'openclaw.mjs');
const config = {
  agents: { defaults: { workspace: workspaceDir } },
  plugins: { allow: ['verikit'], load: { paths: [pluginRoot] }, slots: { memory: 'none' },
    entries: { verikit: { enabled: true, hooks: { allowPromptInjection: true } } } }
};
await fs.writeFile(process.env.OPENCLAW_CONFIG_PATH, JSON.stringify(config));
const { loadOpenClawPlugins } = await import(pathToFileURL(path.join(hostRoot, 'dist/plugins/loader.js')));
const { getGlobalHookRunner } = await import(pathToFileURL(path.join(hostRoot, 'dist/plugins/hook-runner-global.js')));
const { resolvePluginTools } = await import(pathToFileURL(path.join(hostRoot, 'dist/plugins/tools.js')));
const registry = loadOpenClawPlugins({ config, workspaceDir, onlyPluginIds: ['verikit'], cache: false, activate: true });
const record = registry.plugins.find(p => p.id === 'verikit');
assert.equal(record?.status, 'loaded', JSON.stringify({ record, diagnostics: registry.diagnostics }));
assert.deepEqual(record.toolNames, ['verikit_route']);
assert.deepEqual(registry.typedHooks.filter(h => h.pluginId === 'verikit').map(h => h.hookName), ['before_prompt_build', 'before_tool_call']);
const runner = getGlobalHookRunner();
const result = await runner.runBeforePromptBuild({ prompt: ${JSON.stringify(task)}, messages: [] }, { sessionKey: 'agent:main:verikit-test', agentId: 'main', workspaceDir });
assert.ok(result?.prependContext?.includes('<verikit-routing>'), 'native host must accept and merge routing context');
assert.ok(result.prependContext.includes('arkdata'));
assert.ok(result.appendSystemContext.includes('then STOP and wait'));
assert.equal((await runner.runBeforePromptBuild({ prompt: 'What is the capital of France?', messages: [] }, { workspaceDir }))?.prependContext, undefined);
const registration = registry.tools.find(t => t.pluginId === 'verikit');
assert.equal(registration.optional, true);
const context = { config, workspaceDir, agentId: 'main', sessionKey: 'agent:main:verikit-test' };
const allowed = resolvePluginTools({ context, runtimeRegistry: registry, toolAllowlist: ['verikit_route'] });
assert.deepEqual(allowed.map(t => t.name), ['verikit_route']);
assert.equal(resolvePluginTools({ context, runtimeRegistry: registry, toolAllowlist: ['read'] }).length, 0);
assert.equal(resolvePluginTools({ context, runtimeRegistry: registry, toolAllowlist: ['verikit_route'], toolDenylist: ['verikit_route'] }).length, 0);
const tool = allowed[0];
const routed = await tool.execute('native-route', { task: ${JSON.stringify(task)} });
assert.equal(routed.isError, undefined);
const routing = JSON.parse(routed.content[0].text);
assert.equal(routing.skill_count, 101);
assert.deepEqual(routing.bundle, ['arkdata', 'arkts']);
for (const [kit, references] of Object.entries(routing.deep_references)) {
  await fs.access(path.join(routing.catalog_root, kit, 'SKILL.md'));
  for (const reference of references) await fs.access(path.join(routing.catalog_root, kit, reference.path));
}
const restrictedConfig = structuredClone(config);
restrictedConfig.plugins.entries.verikit.hooks.allowPromptInjection = false;
loadOpenClawPlugins({ config: restrictedConfig, workspaceDir, onlyPluginIds: ['verikit'], cache: false, activate: true });
const suppressed = await getGlobalHookRunner().runBeforePromptBuild({ prompt: ${JSON.stringify(task)}, messages: [] }, { workspaceDir });
assert.equal(suppressed?.prependContext, undefined, 'native prompt-injection restrictions must be respected');
assert.equal(suppressed?.appendSystemContext, undefined, 'native restrictions also suppress system guidance');
// Exercise the setup helper against real host activation, with another plugin
// that was already enabled under the host's missing/empty (open) allow policy.
const otherRoot = path.join(workspaceDir, 'other-plugin');
await fs.mkdir(otherRoot);
await fs.writeFile(path.join(otherRoot, 'package.json'), JSON.stringify({ name: 'other-plugin-fixture', version: '1.0.0', type: 'module', openclaw: { extensions: ['./entry.mjs'] } }));
await fs.writeFile(path.join(otherRoot, 'openclaw.plugin.json'), JSON.stringify({ id: 'other', main: './entry.mjs', activation: { onStartup: true }, configSchema: { type: 'object', properties: {} } }));
await fs.writeFile(path.join(otherRoot, 'entry.mjs'), "export default { id: 'other', register() {} };\\n");
const { configureOpenClaw } = await import(pathToFileURL(path.join(pluginRoot, 'scripts/configure-openclaw.mjs')));
for (const allow of [undefined, []]) {
  const openConfig = { agents: config.agents, plugins: { load: { paths: [otherRoot] }, entries: { other: { enabled: true } }, slots: { memory: 'none' }, ...(allow === undefined ? {} : { allow }) } };
  const beforeSetup = loadOpenClawPlugins({ config: openConfig, workspaceDir, onlyPluginIds: ['other'], cache: false, activate: true });
  assert.equal(beforeSetup.plugins.find(p => p.id === 'other')?.status, 'loaded');
  await fs.writeFile(process.env.OPENCLAW_CONFIG_PATH, JSON.stringify(openConfig));
  await configureOpenClaw({ configPath: process.env.OPENCLAW_CONFIG_PATH, pluginRoot });
  const applied = JSON.parse(await fs.readFile(process.env.OPENCLAW_CONFIG_PATH, 'utf8'));
  const afterSetup = loadOpenClawPlugins({ config: applied, workspaceDir, onlyPluginIds: ['other', 'verikit'], cache: false, activate: true });
  assert.equal(afterSetup.plugins.find(p => p.id === 'other')?.status, 'loaded', 'setup must retain the previously enabled plugin');
  assert.equal(afterSetup.plugins.find(p => p.id === 'verikit')?.status, 'loaded');
}
console.log('NATIVE_OPENCLAW_PASS');
`);
  const result = spawnSync(process.execPath, [script], { cwd: isolated, encoding: "utf8", timeout: 60000,
    env: { ...cleanEnv(), OPENCLAW_HOME: isolated, OPENCLAW_STATE_DIR: path.join(isolated, "state"),
      OPENCLAW_CONFIG_PATH: path.join(isolated, "openclaw.json"), OPENCLAW_NO_RESPAWN: "1" } });
  assert.equal(result.status, 0, result.stderr + result.stdout);
  assert.match(result.stdout, /NATIVE_OPENCLAW_PASS/);
});
