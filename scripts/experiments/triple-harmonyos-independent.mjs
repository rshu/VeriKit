// Freeze independent results for the model's final OpenSpec task bookkeeping.
import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import{createHash}from'node:crypto';
const root=path.resolve(process.argv[2]),workspace=path.join(root,'workspace'),app=path.join(workspace,'app'),hash=b=>createHash('sha256').update(b).digest('hex');
const json=async name=>JSON.parse(await fs.readFile(path.join(root,name),'utf8'));
const [business,edge,sdk,binding,device,extra,fault,kitRead,specRead,gate]=await Promise.all(['business-acceptance.json','model-edge-acceptance.json','build-result.json','sdk-source-binding.json','device-acceptance.json','device-extra-acceptance.json','device-storage-fault.json','read-before-code-proof.json','openspec-read-before-code-proof.json','spec-gate.json'].map(json));
const current={};async function walk(dir){for(const e of await fs.readdir(path.join(app,dir),{withFileTypes:true})){if(['node_modules','build','.hvigor','.preview','.git'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.isFile())current[p]=hash(await fs.readFile(path.join(app,p)));}}await walk('');
const observer=(await fs.readFile(path.join(root,'observer.jsonl'),'utf8')).trim().split('\n').map(JSON.parse);
const writesDuringBuild=observer.filter(x=>x.type==='before_tool_call'&&['write','edit','apply_patch'].includes(x.tool)&&x.at>=binding.startedAt&&x.at<=binding.finishedAt&&JSON.stringify(x.params).includes('entry/src/main/ets'));
const specIntegrity=[];for(const[p,sha256]of Object.entries(gate.sources))if(!p.endsWith('/tasks.md'))specIntegrity.push(hash(await fs.readFile(path.join(workspace,p)))===sha256);
const beforeCode=await json('sources-specify-1-settled.json');
const checks={gatePassed:gate.passed,kitReadsBeforeCode:kitRead.passed,officialSkillAndContextReadsBeforeCode:specRead.passed,business:business.passed===11&&business.total===11,edge:edge.passed===3&&edge.total===3,sdk:sdk.passed===true,
 businessModelMatchesTestedBytes:current['entry/src/main/ets/model/TodoModel.ets']===edge.sourceSha256,
 allSourceMatchesSdk:JSON.stringify(current)===JSON.stringify(binding.sourceAfter),sourceUnchangedDuringBuild:binding.sourceUnchangedDuringBuild,noAppToolWritesDuringBuild:writesDuringBuild.length===0,specsUnchangedSinceGate:specIntegrity.every(Boolean),entryAbilityUnchanged:current['entry/src/main/ets/entryability/EntryAbility.ets']===beforeCode['entry/src/main/ets/entryability/EntryAbility.ets'],
 device:device.passed===12&&device.total===12,extra:extra.passed===4&&extra.total===4,realStorageFailureAndRecovery:fault.status==='PASS'&&fault.permissionsRestored===true,
 installedHapMatchesSdk:device.hapSha256===binding.hapSha256&&hash(await fs.readFile(path.join(app,'entry/build/default/outputs/default/entry-default-unsigned.hap')))===binding.hapSha256};
const tasks=[
 ['4.1','real API 21 SDK compile',checks.sdk,['build-result.json','sdk-source-binding.json']],
 ['4.2','real installation, launch and load',checks.device,['device-acceptance.json']],
 ['5.1','Chinese, duplicates, whitespace and actual oversized title rejection',checks.business&&checks.extra,['business-acceptance.json','device-extra-acceptance.json']],
 ['5.2','completion/reopening, deletion and stable IDs',checks.device,['device-acceptance.json']],
 ['5.3','three filters and reactive totals',checks.device,['device-acceptance.json']],
 ['5.4','restart/rapid persistence and real failure UI with queue recovery',checks.device&&checks.extra&&checks.realStorageFailureAndRecovery,['device-acceptance.json','device-extra-acceptance.json','device-storage-fault.json']]
].map(([id,criterion,passed,evidence])=>({id,criterion,passed,evidence}));
const evidenceHashes={};for(const f of ['business-acceptance.json','model-edge-acceptance.json','build-result.json','sdk-source-binding.json','device-acceptance.json','device-extra-acceptance.json','device-storage-fault.json','read-before-code-proof.json','openspec-read-before-code-proof.json'])evidenceHashes[f]=hash(await fs.readFile(path.join(root,f)));
const result={at:new Date().toISOString(),source:'independent local execution of actual generated model, official SDK, and native API 21 emulator; no test outcomes authored by the model',root,checks,tasks,sources:current,hapSha256:binding.hapSha256,evidenceHashes,allIndependentChecksPassed:Object.values(checks).every(x=>x===true),limitations:['Single synthetic app; no physical device or release signing.','Rapid UI operations are sequential native commands, not a load or concurrent-fsync benchmark.','Read-failure protection was source reviewed, not device fault tested; the real failure test targets saving.']};
await fs.writeFile(path.join(root,'independent-acceptance.json'),JSON.stringify(result,null,2)+'\n',{flag:'wx'});assert.equal(result.allIndependentChecksPassed,true,'Do not publish failed acceptance as complete');
await fs.mkdir(path.join(workspace,'evidence'),{recursive:true});await fs.copyFile(path.join(root,'independent-acceptance.json'),path.join(workspace,'evidence/independent-acceptance.json'),fs.constants.COPYFILE_EXCL);console.log(JSON.stringify(result));
