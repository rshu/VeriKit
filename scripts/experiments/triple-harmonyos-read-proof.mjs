// Audit app-code boundaries separately from OpenSpec Markdown artifact writes.
// Audit native transcripts, whose tool results retain full text. Observer hooks
// sanitize long strings, so their abbreviated result is not content evidence.
import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

const root = path.resolve(process.argv[2]);
const workspace = path.join(root, "workspace");
const catalog = path.join(workspace, ".plugins/verikit-openclaw/skills");
const hash = value => createHash("sha256").update(value).digest("hex");
const report = JSON.parse(await fs.readFile(path.join(root, "report.json")));
const turn = report.turns.find(t => t.name === "02-implement");
if (!turn?.finishedAt) throw new Error("An actual completed implementation turn is required.");
const sessionsDir = path.join(root, "state/agents/main/sessions");
const sessions = JSON.parse(await fs.readFile(path.join(sessionsDir, "sessions.json")));
// The host may rotate/compact a session during later repair turns. Prefer the
// native snapshot taken after initial development, outside the model workspace.
const initialSnapshot = path.join(root, "native-main-initial.jsonl");
const sessionFile = await fs.access(initialSnapshot).then(() => initialSnapshot, () => sessions[turn.sessionKey]?.sessionFile);
if (!sessionFile || sessionFile !== initialSnapshot && !sessionFile.startsWith(sessionsDir + path.sep)) throw new Error("Experiment session transcript unavailable.");
const transcript = await fs.readFile(sessionFile);
const entries = transcript.toString().trim().split("\n").map(JSON.parse);
const rows = entries.filter(row => row.type === "message" && Date.parse(row.timestamp) >= turn.startedAt && Date.parse(row.timestamp) <= turn.finishedAt);
const calls = new Map();
let firstCode;
for (const [index, row] of rows.entries()) {
  for (const part of row.message.content ?? []) {
    if (part.type !== "toolCall") continue;
    calls.set(part.id, { ...part, index, at: row.timestamp });
    const target=part.arguments?.path??part.arguments?.file_path??"";
    const appCode=/entry\/src\/main\/ets\/.+\.ets$/.test(target)||part.name==="apply_patch"&&/entry\/src\/main\/ets\/[^\n]+\.ets/.test(part.arguments?.input??part.arguments?.patch??"");
    if (!firstCode && appCode && ["write", "edit", "apply_patch"].includes(part.name)) firstCode = { tool: part.name, id: part.id, index, at: row.timestamp, path: part.arguments?.path };
  }
}
if (!firstCode) throw new Error("No native code tool call found.");
const reads = [];
for (const [index, row] of rows.entries()) {
  const msg = row.message, call = calls.get(msg.toolCallId);
  if (msg.role !== "toolResult" || msg.toolName !== "read" || !call) continue;
  const file = path.resolve(workspace, call.arguments?.path ?? call.arguments?.file_path ?? "");
  if (!file.startsWith(catalog + path.sep)) continue;
  const source = await fs.readFile(file, "utf8").catch(() => "");
  const text = msg.content.filter(p => p.type === "text").map(p => p.text).join("\n");
  const body = text.replace(/\n\n\[(?:Read output capped|Showing lines|\d+ more lines in file)[\s\S]*$/, "");
  const offset = call.arguments?.offset ?? 1;
  const lines = source.split("\n");
  const start = offset === 1 ? 0 : lines.slice(0, offset - 1).join("\n").length + 1;
  const successful = !msg.isError && msg.details?.status !== "error" && body.length > 0;
  const matchesSource = successful && source.startsWith(body, start);
  // A line-limited native read omits the separator before its continuation
  // notice. Count that separator only at a verified source line boundary.
  const end = start + body.length + (source[start + body.length] === "\n" ? 1 : 0);
  reads.push({ path: path.relative(catalog, file), toolCallId: msg.toolCallId, calledAt: call.at, returnedAt: row.timestamp,
    beforeFirstCode: index < firstCode.index, successful, sourceSha256: hash(source), returnedTextSha256: hash(text),
    sourceBytes: Buffer.byteLength(source), returnedBytes: Buffer.byteLength(body), offset, limit: call.arguments?.limit,
    truncation: msg.details?.truncation, matchesSource,
    sourceRange: matchesSource ? [Buffer.byteLength(source.slice(0, start)), Buffer.byteLength(source.slice(0, end))] : undefined,
  });
}
function fullyRead(file) {
  const chunks = reads.filter(r => r.path === file && r.successful && r.matchesSource && r.beforeFirstCode).sort((a, b) => a.sourceRange[0] - b.sourceRange[0]);
  let end = 0;
  for (const chunk of chunks) {
    if (chunk.sourceRange[0] > end) break;
    end = Math.max(end, chunk.sourceRange[1]);
  }
  return chunks.length > 0 && end >= chunks[0].sourceBytes;
}
const kits = ["arkdata", "arkts"].map(kit => {
  const references = [...new Set(reads.filter(r => r.path.startsWith(kit + "/references/")).map(r => r.path))];
  return { kit, skillFullyReadBeforeCode: fullyRead(kit + "/SKILL.md"),
    references: references.map(file => ({ path: file, fullyReadBeforeCode: fullyRead(file) })),
    referenceFullyReadBeforeCode: references.some(fullyRead) };
});
const applySkill=path.join(workspace,".claude/skills/openspec-apply-change/SKILL.md");
const applySource=await fs.readFile(applySkill,"utf8");
const applyReads=[];
for(const [index,row] of rows.entries()){
 const msg=row.message,call=calls.get(msg.toolCallId);
 if(msg.role!=="toolResult"||msg.toolName!=="read"||!call)continue;
 const file=path.resolve(workspace,call.arguments?.path??call.arguments?.file_path??"");
 if(file!==applySkill)continue;
 const text=msg.content.filter(p=>p.type==="text").map(p=>p.text).join("\n");
 const body=text.replace(/\n\n\[(?:Read output capped|Showing lines|\d+ more lines in file)[\s\S]*$/,"");
 const successful=!msg.isError&&msg.details?.status!=="error";
 applyReads.push({toolCallId:msg.toolCallId,at:row.timestamp,beforeFirstAppCode:index<firstCode.index,fullyReturned:successful&&(call.arguments?.offset??1)===1&&applySource.startsWith(body)&&body.length>=applySource.trimEnd().length,sourceSha256:hash(applySource),returnedSha256:hash(body)});
}
const officialApplySkillRead=applyReads.some(x=>x.beforeFirstAppCode&&x.fullyReturned);
const result = { at: new Date().toISOString(), root, sessionFile, transcriptSha256: hash(transcript),
  auditSha256: hash(await fs.readFile(fileURLToPath(import.meta.url))), frozenAuditSha256: report.appAudit?.sha256,
  turn: { name: turn.name, runId: turn.actualRunId ?? turn.runId, startedAt: turn.startedAt, finishedAt: turn.finishedAt },
  source: "native OpenClaw transcript; app .ets writes only, OpenSpec Markdown writes are not code; exact source content and tool-result order", firstCode, kits, reads, applySkill:{officialApplySkillRead,reads:applyReads},
  passed: officialApplySkillRead && kits.every(k => k.skillFullyReadBeforeCode && k.referenceFullyReadBeforeCode) };
await fs.writeFile(path.join(root, "read-before-code-proof.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;
