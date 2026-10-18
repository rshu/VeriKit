// Joint plugin experiment: derived from the isolated TodoList runner.
// No runtime-corrector or host implementation is patched.
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
const stage = process.argv[3] ?? "develop";
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

const stageLabel = stage + "-" + (report.stages.filter(s=>s.stage===stage).length+1);

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
await save(`driver-${stageLabel}.mjs`, await fs.readFile(fileURLToPath(import.meta.url), "utf8"));
const progress = value => console.log(JSON.stringify({ at: new Date().toISOString(), root, ...value }));
report.model = reference;
const effort = process.env.VK_EXPERIMENT_EFFORT ?? "low";
if (!["low", "high", "max"].includes(effort)) throw new Error("Invalid GLM experiment reasoning effort.");
report.modelRequest = { effort, adapter: "isolated native provider wrapper", endpoint: "https://open.bigmodel.cn/api/anthropic" };
report.originalConfigSha256 ??= hash(originalConfigText);

if (stage === "develop" && !await fs.access(app).then(() => true, () => false)) {
  await prepareFixture(root);
}
if (stage === "develop" && !report.frozenInputs) {
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

const rcSource = "/Volumes/PortableSSD/projects/runtime-corrector-toy";
const rcRoot = path.join(workspace, ".plugins/runtime-corrector-openclaw");
if (stage === "develop") {
  const { buildPlugin } = await import(pathToFileURL(path.join(rcSource, "lib/plugin-builder.mjs")));
  await buildPlugin({ host: "openclaw", sourceRoot: rcSource, outputRoot: path.join(workspace, ".plugins") });
  const policy = `version: 2
artifacts: []
dynamicGroundTruth:
  enabled: true
  materialRoots: []
  panel:
    size: 0
skillCorrection:
  enabled: false
artifactCorrection:
  groundTruthReviewEnabled: false
  stageMetricsEnabled: false
implementationCorrection:
  enabled: false
stopCorrection:
  enabled: true
  maxCorrectionsPerEpoch: 3
  assessmentTimeoutMs: 3600000
reviewers:
  defaults:
    session: detached
    effort: low
    timeoutMs: 1200000
    formatRepairAttempts: 3
limits:
  semanticReviewTimeoutMs: 1200000
output:
  persist: true
  mode: centralized
  directory: .runtime-correction
`;
  await fs.mkdir(path.join(workspace, ".runtime-corrector"));
  await fs.writeFile(path.join(workspace, ".runtime-corrector/config.yaml"), policy);
  report.joint = { plugins: ["verikit", "runtime-corrector"], rcSource, rcPackage: await json(path.join(rcRoot,"package.json")),
    policySha256: hash(policy), scope: "VeriKit routing/document reads/edit logging plus RC dynamic requirement extraction and native Stop correction; other RC feature flags disabled explicitly", patchedImplementations: false };
  await save("joint-plan.json", { at: new Date().toISOString(), phases: ["fresh model development", "native Stop review and bounded host correction", "independent model/business and real SDK build", "controlled 80-to-800 title-limit fault in disposable app", "native Stop feedback -> host-only repair -> independent boundary verification", "real emulator acceptance and cleanup"],
    passCriteria: ["both exact source plugin packages loaded with granted hooks", "both Kit entry and task reference documents fully read before first code", "actual GLM reviewers, distinct native sessions, not test doubles", "RC feedback tied to real source and observed by host before repair", "independent business/build/device evidence; UNVERIFIED never treated as PASS"], productionProfilesModified: false, rcSourceModified: false,
    controlledFault: { appOnly: true, intended: "change generated 80-character guard to 800, preserving immutable requirements; first turn read-only, subsequent RC feedback may authorize original task repair", claim: "control-flow efficacy, not natural defect incidence" } });
}
async function allFiles(dir) {
  const out=[]; for(const e of await fs.readdir(dir,{withFileTypes:true}).catch(()=>[])) { const f=path.join(dir,e.name); if(e.isDirectory())out.push(...await allFiles(f));else if(e.isFile())out.push(f); } return out;
}
async function freezeSources(label) {
  const snapshot={};for(const f of await allFiles(path.join(app,"entry/src/main/ets"))) { const relative=path.relative(app,f);snapshot[relative]=hash(await fs.readFile(f));await fs.mkdir(path.dirname(path.join(root,"snapshots",label,relative)),{recursive:true});await fs.copyFile(f,path.join(root,"snapshots",label,relative)); }
  await save(`sources-${label}.json`,snapshot);
}
async function waitForReviews(turn) {
  const deadline=Date.now()+65*60*1000;let previous="";
  while(Date.now()<deadline) {
    const receipts=await Promise.all((await allFiles(path.join(workspace,".runtime-correction/openclaw/native-stop-reviews"))).filter(f=>f.endsWith(".json")).map(json));
    const follows=await Promise.all((await allFiles(path.join(workspace,".runtime-correction/openclaw/native-followups"))).filter(f=>f.endsWith(".json")).map(json));
    const relevant=receipts.filter(r=>r.sessionKey===turn.sessionKey);
    const state=JSON.stringify(relevant.map(r=>[r.runId,r.status,r.reviewStatus]));
    if(state!==previous){previous=state;progress({event:"RC_REVIEW_STATE",receipts:relevant.map(r=>({runId:r.runId,status:r.status,reviewStatus:r.reviewStatus}))});await save(`rc-receipts-${stageLabel}.json`,{receipts:relevant,followups:follows});}
    const last=[...relevant].sort((a,b)=>(b.settledAt??b.createdAt??0)-(a.settledAt??a.createdAt??0))[0];
    const active=follows.some(f=>f.sessionKey===turn.sessionKey && !f.finishedAt && !["CANCELLED","REJECTED"].includes(f.status));
    if(relevant.some(r=>r.runId===(turn.actualRunId??turn.runId)) && last?.status==="SETTLED" && !active && relevant.every(r=>r.status==="SETTLED")) { await save(`rc-receipts-${stageLabel}.json`,{receipts:relevant,followups:follows});return {receipts:relevant,followups:follows}; }
    if(gateway.exitCode!==null||gateway.signalCode)throw Error("Gateway exited during RC review");
    await pause(2000);
  } throw Error("RC review/follow-up deadline; preserve UNVERIFIED state");
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
  agents: { defaults: { workspace, skipBootstrap: true, timeoutSeconds: 1800, thinkingDefault: "low", sandbox: { mode: "off" }, model: { primary: `experiment/${modelId}` }, models: { [`experiment/${modelId}`]: {} } } },
  models: { providers: { experiment: { baseUrl: expand(selectedProvider.baseUrl), api: selectedProvider.api, authHeader: selectedProvider.authHeader, apiKey: "${VK_EXPERIMENT_MODEL_KEY}", agentRuntime: { id: "openclaw" }, models: [{ ...model, id: modelId, name: modelId, reasoning: true, thinkingLevelMap: { off: null, minimal: "low", low: "low", high: "high", max: "max" }, maxTokens: Math.min(model.maxTokens ?? 8192, 16384) }] } } },
  tools: { allow: ["read", "write", "edit", "verikit_route", "runtime_corrector"], fs: { workspaceOnly: true }, exec: { security: "deny", ask: "always" } },
  plugins: { allow: ["verikit", "runtime-corrector", "verikit-experiment-observer"], slots: { memory: "none" }, load: { paths: [pluginRoot, rcRoot, observerRoot] }, entries: {
    "runtime-corrector": { enabled: true, hooks: { allowPromptInjection: true, allowConversationAccess: true }, config: { enabled: true, reviewerModel: `experiment/${modelId}`, hookTimeoutMs: 1200000 } },
    verikit: { enabled: true, hooks: { allowPromptInjection: true }, config: { enabled: true, monitorEdits: true } },
    "verikit-experiment-observer": { enabled: true, hooks: { allowConversationAccess: true } },
  } }, logging: { level: "info", consoleLevel: "error", file: path.join(root, "gateway.jsonl") } };
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
async function send(name, message, { session = "main", timeout = 1800000, command = false } = {}) {
  const runId = randomUUID(), sessionKey = `agent:main:joint-${session}`;
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
      // Async RC terminal review is tracked separately after business completion.
      const observed = (await fs.readFile(path.join(root, "observer.jsonl"), "utf8").catch(() => "")).trim().split("\n").flatMap(line => { try { return [JSON.parse(line)]; } catch { return []; } });
      if (!command && !observed.some(row => row.type === "llm_input" && [runId, turn.actualRunId].includes(row.runId))) throw new Error("Host completed without an actual model invocation; refusing to treat a setup response as model completion.");
    }
    await save("report.json", report);
    progress({ event: "TURN_END", name, state: result.state, elapsedMs: turn.finishedAt - turn.startedAt,
      text: result.message?.content?.filter?.(p => p.type === "text").map(p => p.text).join("\n").slice(-1200) });
    if (result.state !== "final") throw new Error(`Host turn ${result.state}: ${result.errorMessage ?? ""}`);
    return turn;
  } finally { clearTimeout(timer); pending.delete(runId); }
}
try {
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
  await save(`process-${stageLabel}.json`, { gatewayPid: gateway.pid, driverPid: process.pid, port, stage, stageLabel });
  report.stages.push({ stage, port, startedAt: Date.now(), routingAdapterSha256: hash(await fs.readFile(path.join(pluginRoot, "lib/routing.mjs"))) });
  await save("report.json", report);
  const sessionName="main";
  const sessionKey=`agent:main:joint-${sessionName}`;
  if(stage==="develop") {
    const created=await client.request("sessions.create",{key:sessionKey,model:`experiment/${modelId}`,label:`Joint HarmonyOS ${stage}`,emitCommandHooks:false});
    await save(`session-created-${stage}.json`,created);
    await send("bind-project",`/rc-project bind ${workspace}`,{command:true,timeout:30000});
  }
  const status=await send("project-status","/rc-project status",{command:true,timeout:30000});
  await save(`project-status-${stage}.json`,status.result);
  const requirements=await fs.readFile(path.join(app,"requirements.md"),"utf8");
  let message;
  if(stage==="develop")message="我选择 local-persistence 配方的 arkdata、arkts；界面使用现有 ArkUI 基础组件。请完成真实鸿蒙 TodoList 开发。已确认 Kit，无须再问；必须先读取每个所选 Kit 的完整 SKILL.md 和至少一篇与本任务相关的完整参考文档，再写代码。先读 app/requirements.md，严格遵守以下正式需求。仅修改 app/entry/src/main/ets/model/ 与 pages/Index.ets，不修改插件、纠偏配置、需求或构建文件。外部程序会独立编译和设备验收，不要虚构测试结果。若 RC 意见指出偏离，已授权你自行修复业务文件直到满足原要求。\n\n"+requirements;
  else if(stage==="repair")message=await fs.readFile(path.join(root,"repair-request.txt"),"utf8");
  else if(stage==="challenge")message="这是联合插件的受控偏离验证。当前 TodoList 有一处人为注入的业务缺陷。以下正式需求持续有效，80 字符上限不可放宽。第一轮先使用 read 查看 app/requirements.md 及 app/entry/src/main/ets/model/TodoModel.ets，再只在 TodoModel.ets 文件首行添加一行 // JOINT_CONTROLLED_CHECKPOINT 注释，禁止改变任何业务逻辑，然后完成本轮交付，交由 RC 按正式需求终审。这是触发原生编辑终审的实验检查点，不豁免任何业务验收标准，实际80字符要求仍须满足。若 RC 随后给出有依据的不通过反馈，允许宿主自动修改实际业务代码并自行复核，不要等待第二条用户指令。保持所选 arkdata、arkts 与其他功能不变。\n\n"+requirements;
  else throw Error("Unknown joint experiment stage");
  const turn=await send(stage==="develop"?"02-implement":stage,message,{session:sessionName});
  await freezeSources(`${stageLabel}-initial`);
  const sessionDirectory=path.join(root,"state/agents/main/sessions");
  const sessionEntries=await json(path.join(sessionDirectory,"sessions.json"));
  const transcript=sessionEntries[sessionKey]?.sessionFile;
  if(!transcript?.startsWith(sessionDirectory+path.sep))throw Error("Native session file outside isolation");
  await fs.copyFile(transcript,path.join(root,stage==="develop"?"native-main-initial.jsonl":`native-${stageLabel}-initial.jsonl`),constants.COPYFILE_EXCL);
  report.jointReview=await waitForReviews(turn);
  await freezeSources(`${stageLabel}-settled`);
  const settledSessions=await json(path.join(sessionDirectory,"sessions.json"));
  const settledTranscript=settledSessions[sessionKey]?.sessionFile;
  if(!settledTranscript?.startsWith(sessionDirectory+path.sep))throw Error("Settled native session file outside isolation");
  await fs.copyFile(settledTranscript,path.join(root,`native-${stageLabel}-settled.jsonl`));
  report.finalReview=[...report.jointReview.receipts].sort((a,b)=>(b.settledAt??0)-(a.settledAt??0))[0]?.reviewStatus;
  progress({event:"JOINT_SETTLED",stage,reviewStatus:report.finalReview});
  report.stages.at(-1).status = "completed";
} catch (error) {
  report.errors ??= []; report.errors.push({ stage, at: Date.now(), message: redact(error.stack ?? error.message) });
  progress({ event: "EXPERIMENT_ERROR", error: redact(error.message) });
  process.exitCode = 1;
} finally {
  await client?.stopAndWait?.({ timeoutMs: 1000 }); client?.stop();
  if (gateway && gateway.exitCode === null) { gateway.kill("SIGTERM"); await Promise.race([new Promise(resolve => gateway.once("exit", resolve)), pause(3000)]); if (gateway.exitCode === null) gateway.kill("SIGKILL"); }
  report.originalConfigUnchanged = hash(await fs.readFile(originalConfigFile)) === report.originalConfigSha256;
  report.updatedAt = new Date().toISOString();
  await save("report.json", report); await save(`console-${stageLabel}.log`, consoleOutput); await wire.close();
  progress({ event: "STAGE_FINISHED", stage, originalConfigUnchanged: report.originalConfigUnchanged });
}
