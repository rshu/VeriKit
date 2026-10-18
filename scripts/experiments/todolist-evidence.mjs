import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve(process.argv[2]);
const report = JSON.parse(await fs.readFile(path.join(root, "report.json")));
const rows = (await fs.readFile(path.join(root, "observer.jsonl"), "utf8")).trim().split("\n").flatMap(line => { try { return [JSON.parse(line)]; } catch { return []; } });
const checks = [];
const turn = name => report.turns.findLast(t => t.name === name);
const events = name => rows.filter(row => [turn(name)?.runId, turn(name)?.actualRunId].filter(Boolean).includes(row.runId));
const routing = name => events(name).filter(e => e.type === "llm_input").flatMap(e => {
  const match = /<verikit-routing>\s*([\s\S]*?)\s*<\/verikit-routing>/.exec(e.prompt ?? "");
  try { return match ? [JSON.parse(match[1])] : []; } catch { return []; }
});
const calls = name => events(name).filter(e => e.type === "before_tool_call");
const completed = name => turn(name)?.result?.state === "final" && Boolean(turn(name)?.result?.message) && events(name).some(e => e.type === "agent_end" && e.success);
const response = name => {
  const content = turn(name)?.result?.message?.content;
  return typeof content === "string" ? content : (content ?? []).filter(p => p.type === "text").map(p => p.text).join("\n");
};
function check(name, evaluated, passed, evidence) { checks.push({ name, status: !evaluated ? "NOT_RUN" : passed ? "PASS" : "FAIL", evidence }); }
const menu = turn("01-menu");
check("automatic route enters real host model request", events("01-menu").some(e => e.type === "llm_input"), routing("01-menu").length > 0, routing("01-menu").map(r => ({ status: r.routing?.status, bundle: r.bundle, skills: r.skill_count })));
check("model presents Kits and requests a choice", completed("01-menu"), /arkdata/i.test(response("01-menu")) && /arkts/i.test(response("01-menu")) && /选择|确认|请选|请问|指定|choose|select|which/i.test(response("01-menu")), response("01-menu"));
check("no code written before Kit selection", completed("01-menu"), !calls("01-menu").some(c => ["write", "edit", "apply_patch"].includes(c.tool)), calls("01-menu").map(c => c.tool));
check("menu leaves initial page unchanged", completed("01-menu") && report.afterMenu, report.afterMenu?.indexSha256 === report.frozenInputs?.initialPageSha256, report.afterMenu);
const development = calls("02-implement");
const firstWrite = development.findIndex(c => ["write", "edit", "apply_patch"].includes(c.tool));
const readsBeforeWrite = events("02-implement").filter(c => c.type === "after_tool_call" && c.tool === "read" && !c.error && c.isError !== true && c.at < (development[firstWrite]?.at ?? Infinity)).map(c => c.params?.path ?? c.params?.file_path ?? "");
check("selected Kit skills read before code", completed("02-implement"), ["arkdata", "arkts"].every(kit => readsBeforeWrite.some(p => p.includes(`/${kit}/SKILL.md`))), readsBeforeWrite);
check("task reference docs read before code", completed("02-implement"), ["arkdata", "arkts"].every(kit => readsBeforeWrite.some(p => p.includes(`/${kit}/references/`) && p.endsWith(".md"))), readsBeforeWrite.filter(p => p.includes("/references/")));
check("SDK app implementation uses native tools", completed("02-implement"), firstWrite >= 0, development.filter(c => ["write", "edit", "apply_patch"].includes(c.tool)).map(c => ({ tool: c.tool, path: c.params?.path })));
check("manual routing tool called", completed("03-manual-route"), calls("03-manual-route").some(c => c.tool === "verikit_route"), calls("03-manual-route").map(c => ({ tool: c.tool, params: c.params })));
check("conflict is surfaced without writes", completed("04-conflict"), routing("04-conflict").some(r => r.routing?.status === "conflict") && /选择|确认|请选|请问|指定|choose|select|which/i.test(response("04-conflict")) && !calls("04-conflict").some(c => ["write", "edit", "apply_patch"].includes(c.tool)), { routes: routing("04-conflict").map(r => r.routing), calls: calls("04-conflict").map(c => c.tool), result: turn("04-conflict")?.result });
check("unrelated request receives no route", completed("05-unrelated"), routing("05-unrelated").length === 0 && calls("05-unrelated").length === 0, turn("05-unrelated")?.result);
check("host injection opt-out honored", turn("no-injection-write"), routing("no-injection-write").length === 0, events("no-injection-write").filter(e => e.type === "llm_input").map(e => ({ tools: e.tools, route: /<verikit-routing>/.test(e.prompt ?? "") })));
check("manual tool survives injection opt-out", turn("no-injection-manual"), calls("no-injection-manual").some(c => c.tool === "verikit_route"), calls("no-injection-manual").map(c => c.tool));
for (const name of ["denied", "disabled"]) {
  const inputs = events(name).filter(e => e.type === "llm_input");
  check(name + " tool surface", turn(name) && inputs.some(e => e.tools), inputs.every(e => !e.tools?.includes("verikit_route")), inputs.map(e => e.tools));
}
const logs = (await fs.readFile(path.join(root, "verikit-logs/gate.log"), "utf8").catch(() => "")).trim().split("\n").flatMap(line => { try { return [JSON.parse(line)]; } catch { return []; } });
check("log-only monitor records unselected SDK edit", completed("no-injection-write"), calls("no-injection-write").some(c => c.tool === "write") && logs.some(e => e.file.endsWith("no-injection.ets")), logs);
check("monitor opt-out suppresses log", completed("monitor-off-write"), calls("monitor-off-write").some(c => c.tool === "write") && !logs.some(e => e.file.endsWith("monitor-off.ets")), logs);
for (const name of ["broken", "timeout"]) {
  const marker = await fs.readFile(path.join(root, `workspace/app/${name}.txt`), "utf8").catch(() => "");
  check(name + " routing fail-open", completed(name), marker.trim() === "HOST_CONTINUED" && routing(name).length === 0, { marker, elapsedMs: turn(name)?.finishedAt - turn(name)?.startedAt, calls: calls(name).map(c => c.tool) });
}
const recovery = report.turns.filter(t => t.name.startsWith("repair-")).map(t => {
  const turnRows = rowsForTurn(t);
  const firstEdit = turnRows.find(r => r.type === "before_tool_call" && ["write", "edit", "apply_patch"].includes(r.tool));
  const reads = turnRows.filter(r => r.type === "after_tool_call" && r.tool === "read" && !r.error && r.isError !== true && r.at < (firstEdit?.at ?? Infinity)).map(r => r.params?.path ?? r.params?.file_path ?? "");
  const sessionReads = rows.filter(r => r.sessionKey === t.sessionKey && r.type === "after_tool_call" && r.tool === "read" && !r.error && r.isError !== true && r.at < (firstEdit?.at ?? Infinity)).map(r => r.params?.path ?? r.params?.file_path ?? "");
  return { name: t.name, state: t.result?.state, firstEditAt: firstEdit?.at, successfullyReadBeforeEdit: reads,
    allSelectedKitReferencesAvailableBeforeRepairEdit: ["arkdata", "arkts"].every(kit => sessionReads.some(p => p.includes(`/${kit}/references/`) && p.endsWith(".md"))),
    toolErrors: turnRows.filter(r => r.type === "after_tool_call" && r.error).map(r => ({ tool: r.tool, error: r.error })) };
});
function rowsForTurn(t) { return rows.filter(r => [t.runId, t.actualRunId].filter(Boolean).includes(r.runId)); }
const summary = { at: new Date().toISOString(), root, hostVersion: report.hostVersion, model: report.model, modelRequest: report.modelRequest, turns: report.turns.map(t => ({ name: t.name, runId: t.runId, state: t.result?.state, elapsedMs: t.finishedAt - t.startedAt })), counts: Object.fromEntries(["PASS", "FAIL", "NOT_RUN"].map(status => [status, checks.filter(c => c.status === status).length])), checks, recovery };
await fs.writeFile(path.join(root, "plugin-acceptance.json"), JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify({ counts: summary.counts, checks: checks.map(c => ({ name: c.name, status: c.status })) }));
