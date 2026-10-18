import fs from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import os from "node:os";
import net from "node:net";
import { spawn } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import { prepareFixture } from "./todolist-fixture.mjs";

const sourceRoot = fileURLToPath(new URL("../../", import.meta.url));
const root = path.resolve(process.argv[2] ?? path.join(sourceRoot, "experiments/runs", new Date().toISOString().replaceAll(":", "-").replace(/\.\d+Z$/, "Z")));
const stage = process.argv[3] ?? "main";
const hostRoot = process.env.VK_HOST_ROOT ?? "/opt/homebrew/lib/node_modules/openclaw";
const workspace = path.join(root, "workspace");
const app = path.join(workspace, "app");
const pluginRoot = path.join(workspace, ".plugins/verikit-openclaw");
const json = async file => JSON.parse(await fs.readFile(file, "utf8"));
const hash = text => createHash("sha256").update(text).digest("hex");
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const hostPackage = await json(path.join(hostRoot, "package.json"));
if (hostPackage.version !== "2026.7.1-2") throw new Error("Exact OpenClaw 2026.7.1-2 required.");
await fs.mkdir(root, { recursive: true, mode: 0o700 });
let report = await json(path.join(root, "report.json")).catch(() => ({ root, hostVersion: hostPackage.version, node: process.version,
  startedAt: new Date().toISOString(), stages: [], turns: [], isolation: { originalProfileModified: false, referenceRepositoryModified: false, modelShellAccess: false, workspaceOnly: true } }));

// Resolve only the configured provider; never print or save credentials.
const originalConfigFile = path.join(os.homedir(), ".openclaw/openclaw.json");
const originalConfigText = await fs.readFile(originalConfigFile, "utf8");
const original = JSON.parse(originalConfigText);
const vars = { ...process.env };
for (const line of (await fs.readFile(path.join(os.homedir(), ".openclaw/.env"), "utf8").catch(() => "")).split(/\r?\n/)) {
  const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
  if (match) vars[match[1]] = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
}
const expand = value => typeof value === "string" ? value.replace(/\$\{([^}]+)\}/g, (_, name) => {
  if (!vars[name]) throw new Error(`Configured environment variable unavailable: ${name}`);
  return vars[name];
}) : value;
const reference = process.env.VK_MODEL ?? (typeof original.agents.defaults.model === "string" ? original.agents.defaults.model : original.agents.defaults.model.primary);
const split = reference.indexOf("/");
const selectedProvider = original.models.providers[reference.slice(0, split)];
if (!selectedProvider) throw new Error("Configured provider not found.");
if (new URL(expand(selectedProvider.baseUrl)).hostname !== "open.bigmodel.cn") {
  throw new Error("This experiment's reviewed destination is open.bigmodel.cn; a different provider requires a new scope review.");
}
const modelId = expand(reference.slice(split + 1));
const model = selectedProvider.models.find(model => expand(model.id) === modelId);
if (!model) throw new Error("Configured model not found.");
const key = process.env.VK_EXPERIMENT_MODEL_KEY ?? expand(selectedProvider.apiKey);
if (!key) throw new Error("Configured model credential unavailable.");
const token = randomUUID();
const redact = value => [key, token].reduce((text, secret) => text.replaceAll(secret, "<redacted>"), String(value));
const save = async (name, value) => fs.writeFile(path.join(root, name), redact(typeof value === "string" ? value : JSON.stringify(value, null, 2)) + "\n", { mode: 0o600 });
const progress = value => console.log(JSON.stringify({ at: new Date().toISOString(), root, ...value }));
report.model = reference;
const effort = process.env.VK_EXPERIMENT_EFFORT ?? "low";
if (!["low", "high", "max"].includes(effort)) throw new Error("Invalid GLM experiment reasoning effort.");
report.modelRequest = { effort, adapter: "isolated native provider wrapper", endpoint: "https://open.bigmodel.cn/api/anthropic" };
report.originalConfigSha256 ??= hash(originalConfigText);

if (stage === "main" && !await fs.access(app).then(() => true, () => false)) {
  await prepareFixture(root);
}
if (stage === "main" && !report.frozenInputs) {
  report.frozenInputs = {
    requirementsSha256: hash(await fs.readFile(path.join(app, "requirements.md"))),
    acceptanceSha256: hash(await fs.readFile(new URL("./todolist-acceptance.mjs", import.meta.url))),
    readProofSha256: hash(await fs.readFile(new URL("./todolist-read-proof.mjs", import.meta.url))),
    initialPageSha256: hash(await fs.readFile(path.join(app, "entry/src/main/ets/pages/Index.ets"))),
    pluginEntrySha256: hash(await fs.readFile(path.join(pluginRoot, "lib/openclaw/entry.mjs"))),
    routingAdapterSha256: hash(await fs.readFile(path.join(pluginRoot, "lib/routing.mjs"))),
    routerSha256: hash(await fs.readFile(path.join(pluginRoot, "dist/verikit-cli.js"))),
  };
}

const observerRoot = path.join(root, "observer");
await fs.mkdir(observerRoot, { recursive: true });
await fs.writeFile(path.join(observerRoot, "package.json"), JSON.stringify({ name: "verikit-experiment-observer", type: "module", version: "1.0.0", openclaw: { extensions: ["./entry.mjs"] } }));
await fs.writeFile(path.join(observerRoot, "openclaw.plugin.json"), JSON.stringify({ id: "verikit-experiment-observer", main: "./entry.mjs", providers: ["experiment"], activation: { onStartup: true }, configSchema: { type: "object", properties: {} } }));
await fs.writeFile(path.join(observerRoot, "entry.mjs"), `
import fs from 'node:fs';
const file = ${JSON.stringify(path.join(root, "observer.jsonl"))};
function write(type,event,ctx){
 try {
  const row={at:Date.now(),type,sessionKey:ctx?.sessionKey,runId:ctx?.runId??event?.runId};
  if(type==='llm_input') { row.prompt=event.prompt; row.systemPrompt=event.systemPrompt; row.tools=event.tools?.map(t=>t.name??t.function?.name); }
  else if(type==='before_tool_call') { row.tool=event.toolName;row.params=event.params; }
  else if(type==='after_tool_call') { row.tool=event.toolName;row.params=event.params;row.error=event.error;row.isError=event.result?.isError;row.result=JSON.stringify(event.result)?.slice(0,24000); }
  else if(type==='llm_output') { row.text=event.assistantTexts;row.output=event.lastAssistant; }
  else {row.success=event.success;row.error=event.error;}
  fs.appendFileSync(file,JSON.stringify(row)+'\\n');
 } catch {}
}
export default {id:'verikit-experiment-observer',register(api){if(api.registrationMode==='cli-metadata')return;
api.registerProvider({id:'experiment',label:'GLM isolated experiment',auth:[],wrapStreamFn(ctx){
 if(typeof ctx.streamFn!=='function') throw new Error('Native experiment stream is unavailable');
 return (model,context,options={})=>ctx.streamFn(model,context,{...options,onPayload:async(payload,...args)=>{
  const previous=await options.onPayload?.(payload,...args);const body=previous??payload;
  body.reasoning_effort=${JSON.stringify(effort)};body.output_config={...(body.output_config??{}),effort:${JSON.stringify(effort)}};
  body.thinking={...(body.thinking??{}),type:'enabled',budget_tokens:1024};
  fs.appendFileSync(file,JSON.stringify({at:Date.now(),type:'provider_request',model:model.id,effort:body.reasoning_effort,thinking:body.thinking,output_config:body.output_config})+'\\n');
  return body;
 }});
}});
for(const event of ['llm_input','before_tool_call','after_tool_call','llm_output','agent_end']) api.on(event,(e,c)=>write(event,e,c));
}};
`);

const listener = net.createServer();
await new Promise((resolve, reject) => { listener.once("error", reject); listener.listen(0, "127.0.0.1", resolve); });
const port = listener.address().port;
await new Promise(resolve => listener.close(resolve));
const configFile = path.join(root, "openclaw.json");
const config = { gateway: { mode: "local", port, bind: "loopback", auth: { mode: "token", token: "${VK_EXPERIMENT_TOKEN}" } },
  agents: { defaults: { workspace, skipBootstrap: true, timeoutSeconds: 360, thinkingDefault: "low", sandbox: { mode: "off" }, model: { primary: `experiment/${modelId}` }, models: { [`experiment/${modelId}`]: {} } } },
  models: { providers: { experiment: { baseUrl: expand(selectedProvider.baseUrl), api: selectedProvider.api, authHeader: selectedProvider.authHeader, apiKey: "${VK_EXPERIMENT_MODEL_KEY}", agentRuntime: { id: "openclaw" }, models: [{ ...model, id: modelId, name: modelId, reasoning: true, thinkingLevelMap: { off: null, minimal: "low", low: "low", high: "high", max: "max" }, maxTokens: Math.min(model.maxTokens ?? 8192, 16384) }] } } },
  tools: { allow: ["read", "write", "edit", "verikit_route"], fs: { workspaceOnly: true }, exec: { security: "deny", ask: "always" } },
  plugins: { allow: ["verikit", "verikit-experiment-observer"], slots: { memory: "none" }, load: { paths: [pluginRoot, observerRoot] }, entries: {
    verikit: { enabled: true, hooks: { allowPromptInjection: true }, config: { enabled: true, monitorEdits: true } },
    "verikit-experiment-observer": { enabled: true, hooks: { allowConversationAccess: true } },
  } }, logging: { level: "info", consoleLevel: "error", file: path.join(root, "gateway.jsonl") } };
if (["no-injection", "monitor-off"].includes(stage)) config.plugins.entries.verikit.hooks.allowPromptInjection = false;
if (stage === "monitor-off") config.plugins.entries.verikit.config.monitorEdits = false;
if (stage === "denied") config.tools.allow = ["read", "write", "edit"];
if (stage === "disabled") config.plugins.entries.verikit.config.enabled = false;
await fs.writeFile(configFile, JSON.stringify(config, null, 2), { mode: 0o600 });
const env = { ...process.env, OPENCLAW_HOME: path.join(root, "home"), OPENCLAW_STATE_DIR: path.join(root, "state"), OPENCLAW_CONFIG_PATH: configFile,
  VK_EXPERIMENT_MODEL_KEY: key, VK_EXPERIMENT_TOKEN: token, VK_LOG_DIR: path.join(root, "verikit-logs"), OPENCLAW_NO_RESPAWN: "1" };
for (const name of ["OPENCLAW_HOME", "OPENCLAW_STATE_DIR", "OPENCLAW_CONFIG_PATH", "VK_EXPERIMENT_TOKEN", "VK_EXPERIMENT_MODEL_KEY"]) process.env[name] = env[name];
const dist = path.join(hostRoot, "dist");
let clientFile;
for (const name of (await fs.readdir(dist)).filter(name => /^client-[^.]+\.(js|mjs)$/.test(name))) {
  if ((await fs.readFile(path.join(dist, name), "utf8")).includes("var GatewayClient = class")) { clientFile = name; break; }
}
if (!clientFile) throw new Error("Native Gateway client unavailable.");
const clientModule = await import(pathToFileURL(path.join(dist, clientFile)));
const GatewayClient = clientModule.GatewayClient ?? clientModule.t;
let gateway, client, consoleOutput = "";
const pending = new Map();
const wire = await fs.open(path.join(root, "wire.jsonl"), "a");
async function send(name, message, { session = "main", timeout = 360000 } = {}) {
  const runId = randomUUID(), sessionKey = `agent:main:verikit-${session}`;
  progress({ event: "TURN_START", name, runId });
  const turn = { name, runId, sessionKey, message, source: "experiment_driver", startedAt: Date.now() };
  report.turns.push(turn); await save("report.json", report);
  let timer;
  const terminal = new Promise((resolve, reject) => {
    timer = setTimeout(() => { pending.delete(runId); reject(new Error(`Turn timeout: ${name}`)); }, timeout);
    pending.set(runId, { turn, resolve });
  });
  try {
    const receipt = await client.request("chat.send", { sessionKey, message, idempotencyKey: runId, thinking: "low" });
    turn.receipt = receipt;
    const result = await terminal;
    turn.result = result; turn.finishedAt = Date.now();
    if (result.state === "final") {
      turn.gatewayDrain = await client.request("agent.wait", { runId: result.runId, timeoutMs: 30000 });
      if (turn.gatewayDrain.status === "timeout") throw new Error("Gateway did not finish draining the turn.");
      const observed = (await fs.readFile(path.join(root, "observer.jsonl"), "utf8").catch(() => "")).trim().split("\n").flatMap(line => { try { return [JSON.parse(line)]; } catch { return []; } });
      if (!observed.some(row => row.type === "llm_input" && [runId, turn.actualRunId].includes(row.runId))) throw new Error("Host completed without an actual model invocation; refusing to treat a setup response as model completion.");
    }
    await save("report.json", report);
    progress({ event: "TURN_END", name, state: result.state, elapsedMs: turn.finishedAt - turn.startedAt,
      text: result.message?.content?.filter?.(p => p.type === "text").map(p => p.text).join("\n").slice(-1200) });
    if (result.state !== "final") throw new Error(`Host turn ${result.state}: ${result.errorMessage ?? ""}`);
    return turn;
  } finally { clearTimeout(timer); pending.delete(runId); }
}
let originalCli;
try {
  if (["broken", "timeout"].includes(stage)) {
    originalCli = await fs.readFile(path.join(pluginRoot, "dist/verikit-cli.js"));
    await fs.writeFile(path.join(pluginRoot, "dist/verikit-cli.js"), stage === "broken" ? "throw new Error('VERIKIT_EXPERIMENT_ROUTER_FAILURE');\n" : "setInterval(()=>{},1000);\n");
    report.fault = { stage, originalSha256: hash(originalCli), scope: "experiment plugin copy only" };
  }
  gateway = spawn(process.execPath, [path.join(hostRoot, "openclaw.mjs"), "gateway", "run", "--port", String(port)], { env, cwd: workspace, stdio: ["ignore", "pipe", "pipe"] });
  for (const stream of [gateway.stdout, gateway.stderr]) stream.on("data", value => { consoleOutput += redact(value); });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Gateway readiness timeout: " + consoleOutput.slice(-2000))), 45000);
    gateway.once("exit", code => { clearTimeout(timer); reject(new Error(`Gateway exited ${code}: ${consoleOutput.slice(-3000)}`)); });
    client = new GatewayClient({ url: `ws://127.0.0.1:${port}`, token, env, clientName: "cli", mode: "cli", caps: ["tool-events"], scopes: ["operator.admin", "operator.read", "operator.write"],
      onHelloOk() { clearTimeout(timer); resolve(); }, onConnectError() {}, onEvent(event) {
        void wire.appendFile(redact(JSON.stringify({ at: Date.now(), stage, ...event })) + "\n");
        if (event.event === "agent" && event.payload?.stream === "lifecycle" && event.payload.data?.phase === "start") {
          const active = [...pending.values()].find(value => value.turn.sessionKey === event.payload.sessionKey);
          if (active && event.payload.runId !== active.turn.runId) active.turn.actualRunId = event.payload.runId;
        }
        if (event.event === "chat" && ["final", "error", "aborted"].includes(event.payload?.state)) {
          const active = pending.get(event.payload.runId) ?? [...pending.values()].find(value => value.turn.sessionKey === event.payload.sessionKey);
          if (!active) return;
          // A queued follow-up gets an empty final receipt before its model run starts.
          if (event.payload.state === "final" && !event.payload.message) { active.turn.emptyFinalReceipts = (active.turn.emptyFinalReceipts ?? 0) + 1; return; }
          if (event.payload.runId !== active.turn.runId) active.turn.actualRunId = event.payload.runId;
          active.resolve(event.payload);
        }
      } }); client.start();
  });
  progress({ event: "GATEWAY_READY", port, model: reference, stage });
  report.stages.push({ stage, port, startedAt: Date.now(), routingAdapterSha256: hash(await fs.readFile(path.join(pluginRoot, "lib/routing.mjs"))) });
  await save("report.json", report);
  if (stage === "main") {
    await send("01-menu", "帮我做一个待办事项 App，重启后还能读到之前保存的待办项。");
    const files = await fs.readdir(path.join(app, "entry/src/main/ets/pages"));
    report.afterMenu = { pageFiles: files, indexSha256: hash(await fs.readFile(path.join(app, "entry/src/main/ets/pages/Index.ets"))) };
    const menuTurn = report.turns.at(-1);
    const menuRows = (await fs.readFile(path.join(root, "observer.jsonl"), "utf8")).trim().split("\n").map(line => JSON.parse(line)).filter(row => [menuTurn.runId, menuTurn.actualRunId].filter(Boolean).includes(row.runId));
    report.menuAudit = { codeTools: menuRows.filter(row => row.type === "before_tool_call" && ["write", "edit", "apply_patch"].includes(row.tool)).map(row => row.tool) };
    await save("report.json", report);
    if (report.menuAudit.codeTools.length) throw new Error("Preselection code write detected; preserve this failed run and stop before implementation.");
    await send("02-implement", "我选择 local-persistence 配方的 arkdata、arkts；界面使用现有 ArkUI 基础组件。现在请开发真实鸿蒙 TodoList。先阅读 app/requirements.md，严格满足其中功能与公开 TodoModel 接口；然后按 VeriKit 结果先读取所选 Kit 的 SKILL.md 和本任务参考文档，再编写代码。已确认 Kit，不必再次提问。工程目录是 app，禁止修改 .plugins。不要声称已编译或已运行，外部实验程序会独立验证。尽量在本轮完成。" );
    const sessionDirectory = path.join(root, "state/agents/main/sessions");
    const entries = await json(path.join(sessionDirectory, "sessions.json"));
    const nativeFile = entries[report.turns.at(-1).sessionKey]?.sessionFile;
    if (!nativeFile?.startsWith(sessionDirectory + path.sep)) throw new Error("Initial native transcript unavailable inside experiment state.");
    const initialSnapshot = path.join(root, "native-main-initial.jsonl");
    await fs.copyFile(nativeFile, initialSnapshot, constants.COPYFILE_EXCL).catch(error => { if (error.code !== "EEXIST") throw error; });
    report.initialTranscript = { path: initialSnapshot, sha256: hash(await fs.readFile(initialSnapshot)) };
    await save("report.json", report);
    await send("03-manual-route", "请真实调用 verikit_route 工具查询：保存应用数据使其在应用重启后仍可读取。只汇报工具返回的配方与前两篇参考路径，不要修改任何文件。", { session: "manual" });
    await send("04-conflict", "添加任务提醒通知，到点弹出并可点击查看", { session: "conflict" });
    await send("05-unrelated", "法国的首都是哪里？只回答城市名称。", { session: "unrelated" });
  } else if (stage === "unrelated") {
    await send("05-unrelated", "法国的首都是哪里？只回答城市名称。", { session: "unrelated-fixed" });
  } else if (stage === "repair") {
    const feedback = await fs.readFile(path.join(root, "repair-request.txt"), "utf8");
    await send("repair-" + report.turns.length, feedback, { timeout: 360000 });
  } else if (["no-injection", "monitor-off"].includes(stage)) {
    await send(stage + "-write", "这是一次隔离的工具日志实验。不要解释，不要讨论 Kit，不要读取文档，只用 write 工具创建 app/" + stage + ".ets，内容精确为 import { preferences } from '@kit.ArkData'; 然后回答完成。", { session: stage });
    if (stage === "no-injection") await send("no-injection-manual", "调用 verikit_route，task 为 保存应用数据使其在应用重启后仍可读取。不要写文件。", { session: "no-injection-manual" });
  } else if (stage === "denied" || stage === "disabled") {
    await send(stage, "请检查当前可用工具中是否有 verikit_route。若无，只回答 unavailable。不要写文件。", { session: stage });
  } else if (stage === "broken" || stage === "timeout") {
    await send(stage, "请先调用 verikit_route，task 为 保存应用数据使其在应用重启后仍可读取。即使失败也继续：使用 write 工具创建 app/" + stage + ".txt，内容为 HOST_CONTINUED。不要修改其他文件，最后汇报工具是否失败。", { session: stage });
  } else throw new Error("Unknown stage: " + stage);
  report.stages.at(-1).status = "completed";
} catch (error) {
  report.errors ??= []; report.errors.push({ stage, at: Date.now(), message: redact(error.stack ?? error.message) });
  progress({ event: "EXPERIMENT_ERROR", error: redact(error.message) });
  process.exitCode = 1;
} finally {
  await client?.stopAndWait?.({ timeoutMs: 1000 }); client?.stop();
  if (gateway && gateway.exitCode === null) { gateway.kill("SIGTERM"); await Promise.race([new Promise(resolve => gateway.once("exit", resolve)), pause(3000)]); if (gateway.exitCode === null) gateway.kill("SIGKILL"); }
  if (originalCli) { await fs.writeFile(path.join(pluginRoot, "dist/verikit-cli.js"), originalCli); report.fault.restoredSha256 = hash(await fs.readFile(path.join(pluginRoot, "dist/verikit-cli.js"))); }
  report.originalConfigUnchanged = hash(await fs.readFile(originalConfigFile)) === report.originalConfigSha256;
  report.updatedAt = new Date().toISOString();
  await save("report.json", report); await save(`console-${stage}.log`, consoleOutput); await wire.close();
  progress({ event: "STAGE_FINISHED", stage, originalConfigUnchanged: report.originalConfigUnchanged });
}
