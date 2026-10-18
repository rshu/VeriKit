// Summarize actual native evidence without publishing raw transcripts or secrets.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const exec=promisify(execFile), root=path.resolve(process.argv[2]);
const json=async f=>JSON.parse(await fs.readFile(f,'utf8'));
const optional=async f=>json(path.join(root,f)).catch(e=>{if(e.code==='ENOENT')return null;throw e;});
const hash=v=>createHash('sha256').update(v).digest('hex');
async function files(dir){const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true}).catch(e=>{if(e.code==='ENOENT')return [];throw e;})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await files(f));else if(e.isFile())out.push(f);}return out;}
const report=await optional('report.json');
const rows=(await fs.readFile(path.join(root,'observer.jsonl'),'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const inputs=rows.filter(x=>x.type==='llm_input');
const reviewInputs=inputs.filter(x=>/^agent:[^:]+:runtime-corrector:[^:]+$/.test(x.sessionKey??''));
const businessInputs=inputs.filter(x=>x.sessionKey==='agent:main:joint-main');
const correctionDir=path.join(root,'workspace/.runtime-correction');
const rcFiles=await files(correctionDir);
const receipts=await Promise.all(rcFiles.filter(f=>f.includes('/native-stop-reviews/')&&f.endsWith('.json')).map(json));
const followups=await Promise.all(rcFiles.filter(f=>f.includes('/native-followups/')&&f.endsWith('.json')).map(json));
const evaluations=await Promise.all(rcFiles.filter(f=>/\/evaluations\/stop-.+\.json$/.test(f)).map(async f=>({path:path.relative(root,f),sha256:hash(await fs.readFile(f)),...await json(f)})));
const tasks=await Promise.all(rcFiles.filter(f=>f.endsWith('/task.json')).map(async f=>{const t=await json(f);return {taskId:t.taskId,status:t.status,groundTruth:t.groundTruth,correctionEpoch:t.correctionEpoch,stop:t.stop};}));
const journals=(await Promise.all(rcFiles.filter(f=>f.endsWith('/journal/events.jsonl')).map(async f=>(await fs.readFile(f,'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse)))).flat();
const first=await optional('integrity-before.json');
const reference='/Volumes/PortableSSD/projects/runtime-corrector-toy';
const refStatus=(await exec('git',['-C',reference,'status','--porcelain'])).stdout;
const runtimeComparison=[];
for(const label of ['verikit','runtime-corrector']){
 const installed=path.join(root,'workspace/.plugins',label==='verikit'?'verikit-openclaw':'runtime-corrector-openclaw');
 for(const [name,digest]of Object.entries(first?.runtimeFiles??{}).filter(([name])=>name.startsWith(label+'/lib/')||name.startsWith(label+'/config/'))){
  const relative=name.slice(label.length+1), f=path.join(installed,relative);
  if(label==="verikit" && !["lib/routing.mjs","lib/kit-monitor.mjs","lib/openclaw/entry.mjs"].includes(relative))continue;
  if(label==="runtime-corrector" && ["lib/plugin-builder.mjs","lib/hosts/claude.mjs","lib/hosts/codeagent.mjs","lib/claude-executable.mjs","lib/active-host.mjs"].includes(relative))continue;
  runtimeComparison.push({path:name,matchesFrozenSource:hash(await fs.readFile(f))===digest});
 }
}
const generatedHostBinding=(await fs.readFile(path.join(root,"workspace/.plugins/runtime-corrector-openclaw/lib/active-host.mjs"),"utf8"))==='export * from "./hosts/openclaw.mjs";\n';
const sources={};for(const f of await files(path.join(root,'workspace/app/entry/src/main/ets')))sources[path.relative(path.join(root,'workspace/app'),f)]=hash(await fs.readFile(f));
const proof=await optional('read-before-code-proof.json'),business=await optional('business-acceptance.json'),build=await optional('build-result.json'),device=await optional('device-acceptance.json');
const nativeFiles=(await files(path.join(root,'state/agents/main/sessions'))).filter(f=>f.endsWith('.jsonl')&&!f.endsWith('.trajectory.jsonl'));
const usage={input:0,output:0,cacheRead:0,cacheWrite:0,responses:0,errorResponses:0};
for(const f of nativeFiles)for(const line of (await fs.readFile(f,'utf8')).split('\n').filter(Boolean)){
 const row=JSON.parse(line),m=row.message;if(row.type!=='message'||m?.role!=='assistant')continue;
 if(m.errorMessage)usage.errorResponses++;if(m.usage){usage.responses++;for(const key of ['input','output','cacheRead','cacheWrite'])usage[key]+=m.usage[key]??0;}
}
const finalReceipt=[...receipts].sort((a,b)=>(b.settledAt??0)-(a.settledAt??0))[0];
const controlledCorrection=followups.map(f=>({
  runId:f.runId,assessmentId:f.assessmentId,modelObservedAt:f.modelObservedAt,finishedAt:f.finishedAt,reviewStatus:f.reviewStatus,
  actualEdits:rows.filter(x=>x.type==='before_tool_call'&&x.runId===f.runId&&x.tool==='edit')
    .flatMap(x=>(x.params?.edits??[x.params]).filter(e=>/MAX_TITLE_LENGTH\s*=\s*800/.test(e?.oldText??'')&&/MAX_TITLE_LENGTH\s*=\s*80;/.test(e?.newText??''))
      .map(e=>({at:x.at,path:x.params?.path,oldText:e.oldText,newText:e.newText,afterFeedbackObserved:Boolean(f.modelObservedAt&&x.at>=f.modelObservedAt)})))
}));
const result={at:new Date().toISOString(),auditSha256:hash(await fs.readFile(new URL(import.meta.url))),root,hostVersion:report.hostVersion,model:report.model,modelRequest:report.modelRequest,
 scope:report.joint.scope,sourceBase:{verikit:first?.verikitBaseCommit,runtimeCorrector:first?.rcCommit},
 loading:{plugins:report.joint.plugins,privateReviewSessions:[...new Set(reviewInputs.map(x=>x.sessionKey))],
   privateReviewWithRouting:reviewInputs.filter(x=>(x.systemPrompt??'').includes('<verikit-protocol>')).length,
   privateReviewWithRoutingPrompt:reviewInputs.filter(x=>(x.prompt??'').includes('<verikit-routing>')).length,
   businessWithRouting:businessInputs.filter(x=>(x.systemPrompt??'').includes('<verikit-protocol>')).length,
   inputs:inputs.map(x=>({sessionKey:x.sessionKey,runId:x.runId,systemChars:(x.systemPrompt??'').length,promptChars:(x.prompt??'').length,routingInjected:(x.systemPrompt??'').includes('<verikit-protocol>'),routingInPrompt:(x.prompt??'').includes('<verikit-routing>')}))},
 readProof:proof&&{passed:proof.passed,firstCode:proof.firstCode,kits:proof.kits,transcriptSha256:proof.transcriptSha256},
 turns:report.turns.map(x=>({name:x.name,runId:x.actualRunId??x.runId,state:x.result?.state,startedAt:x.startedAt,finishedAt:x.finishedAt,elapsedMs:x.finishedAt?x.finishedAt-x.startedAt:null})),
 terminalReviews:receipts,followups,tasks,controlledCorrection,
 evaluations:evaluations.map(x=>({path:x.path,sha256:x.sha256,evaluationId:x.evaluationId,summary:x.review?.summary,stopClassification:x.review?.stopClassification,findings:x.review?.findings,correctionAttempt:x.correctionAttempt,sourceCitationCount:x.sourceCitations?.length,metricReport:x.metricReport})),
 journalEventCounts:Object.fromEntries([...new Set(journals.map(x=>x.type))].sort().map(type=>[type,journals.filter(x=>x.type===type).length])),
 controlledFault:await optional('controlled-fault.json'),
 observedProviderRequests:rows.filter(x=>x.type==='provider_request').length,
 usage:{...usage,scope:'Persisted assistant messages in the host state only. RC temporary review transcripts may be removed; this is not total review usage or billing.'},
 independent:{business:business&&{passed:business.passed,total:business.total},build:build&&{passed:build.passed,elapsedMs:build.elapsedMs},device},
 integrity:{originalConfigUnchanged:hash(await fs.readFile(path.join(process.env.HOME,'.openclaw/openclaw.json')))===first?.originalConfigSha256,referenceRepositoryClean:refStatus==='',referenceStatus:refStatus,generatedHostBinding,runtimeComparison,allInstalledRuntimeMatchesFrozenSource:runtimeComparison.length>0&&runtimeComparison.every(x=>x.matchesFrozenSource),sources},
 finalReviewStatus:finalReceipt?.reviewStatus,
 pendingTerminalReviews:receipts.filter(x=>x.status!=="SETTLED").length,
 controlledCaseFullyVerified:controlledCorrection.length>0&&controlledCorrection.every(x=>x.actualEdits.some(e=>e.afterFeedbackObserved)&&x.reviewStatus==="PASS"),
 allIndependentChecksPassed:proof?.passed===true&&business?.passed===business?.total&&business?.total===11&&build?.passed===true&&device?.passed===device?.total&&device?.total===12,
 limitations:['Single synthetic app and controlled fault, not a defect-rate or load benchmark.','RC semantic PASS does not establish SDK compilation or device correctness.','RC source unchanged; skillCorrection, artifactCorrection and implementationCorrection disabled explicitly.','Both execution and review use GLM-5.3-Flash; sessions are independent but model families are not heterogeneous.']};
await fs.writeFile(path.join(root,'joint-summary.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({root,privateReviewSessions:result.loading.privateReviewSessions.length,privateReviewWithRouting:result.loading.privateReviewWithRouting,finalReviewStatus:result.finalReviewStatus,independent:{business:result.independent.business,build:result.independent.build,device:device&&{passed:device.passed,total:device.total}},allIndependentChecksPassed:result.allIndependentChecksPassed}));
