// Capture the independently reviewed requirement mapping before allowing apply.
// This is an evidence gate, not a semantic correctness proof.
import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import{createHash}from'node:crypto';
const root=path.resolve(process.argv[2]),workspace=path.join(root,'workspace'),change='openspec/changes/persistent-todo';
const json=async f=>JSON.parse(await fs.readFile(path.join(root,f),'utf8')),hash=b=>createHash('sha256').update(b).digest('hex');
if(await fs.access(path.join(root,'spec-gate.json')).then(()=>true,()=>false))throw Error('Do not overwrite the initial gate');
const report=await json('report.json'),validation=await json('openspec-external-post-drift.json');
const receipts=await json('rc-receipts-drift-1.json');
assert.ok(receipts.receipts.every(x=>x.status==='SETTLED'));assert.equal(receipts.receipts.find(x=>x.runId===report.turns.find(t=>t.name==='drift').actualRunId)?.reviewStatus??receipts.receipts.find(x=>x.runId===report.turns.find(t=>t.name==='drift').runId)?.reviewStatus,'PASS');
const sources={};async function walk(dir){for(const e of await fs.readdir(path.join(workspace,dir),{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())await walk(p);else{const bytes=await fs.readFile(path.join(workspace,p));sources[p]=hash(bytes);const target=path.join(root,'snapshots/spec-gate',p);await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,bytes,{flag:'wx'});}}}await walk(change);
const design=await fs.readFile(path.join(workspace,change,'design.md'),'utf8'),stats=await fs.readFile(path.join(workspace,change,'specs/todo-filter-stats/spec.md'),'utf8');
const mappings=[
 ['add/trim/80/Chinese/duplicates','specs/todo-item-management/spec.md',/trim 后长度超过 80/],
 ['unique stable and restored IDs','specs/todo-item-management/spec.md',/恢复之后新增条目的 id MUST NOT/],
 ['toggle and delete','specs/todo-item-management/spec.md',/Requirement: 删除待办条目/],
 ['three filters and reactive counts','specs/todo-filter-stats/spec.md',/数量统计立即反映最新状态/],
 ['Preferences put then awaited flush','specs/todo-persistence/spec.md',/MUST 在 put 之后 `await flush`/],
 ['startup loading and restored state','specs/todo-persistence/spec.md',/读取完成前 UI MUST 处于 loading/],
 ['visible save failure and retained memory state','specs/todo-persistence/spec.md',/失败 MUST NOT 被静默吞掉/],
 ['serialized rapid saves','specs/todo-persistence/spec.md',/保存操作 MUST 串行化/],
 ['pure model with no SDK dependencies','design.md',/不 import 任何模块/],
 ['separate actual external verification','tasks.md',/外部功能验收/]
];
const traceability=[];for(const[requirement,file,pattern]of mappings){const text=await fs.readFile(path.join(workspace,change,file),'utf8'),index=text.search(pattern);traceability.push({requirement,path:change+'/'+file,line:index<0?null:text.slice(0,index).split('\n').length,present:index>=0});}
const checks={structurallyReady:validation.structurallyReady,externalTasksStillUnchecked:validation.progress.total===17&&validation.progress.complete===0,
 requirementsUnchanged:hash(await fs.readFile(path.join(workspace,'app/requirements.md')))===report.frozenInputs.requirementsSha256,
 initialPageUnchanged:hash(await fs.readFile(path.join(workspace,'app/entry/src/main/ets/pages/Index.ets')))===report.frozenInputs.initialPageSha256,
 noBusinessModelYet:!await fs.access(path.join(workspace,'app/entry/src/main/ets/model/TodoModel.ets')).then(()=>true,()=>false),
 controlledContradictionRemoved:!design.includes('todos SHALL be stored only in memory'),actualPagePathCorrected:design.includes('pages/Index.ets')&&!design.includes('pages/TodoPage.ets'),
 countExampleCorrected:stats.includes('未完成数变为 0'),traceabilityPresent:traceability.every(x=>x.present)};
const result={at:new Date().toISOString(),scope:'independent requirement and source review plus official CLI; requirement mapping is not a formal semantic proof',validation:'openspec-external-post-drift.json',checks,traceability,sources,passed:Object.values(checks).every(Boolean)};
await fs.writeFile(path.join(root,'spec-gate.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify(result));if(!result.passed)process.exitCode=1;
