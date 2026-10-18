// Real Preferences failure, using only the disposable app's debug sandbox.
// No application source, plugin, SDK or system partition is patched.
import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';
import{execFile}from'node:child_process';import{promisify}from'node:util';
const exec=promisify(execFile),root=path.resolve(process.argv[2]),bundle='com.verikit.experiment.openspectodo';
assert.equal(JSON.parse(await fs.readFile(path.join(root,'workspace/app/AppScope/app.json5'),'utf8')).app.bundleName,bundle);
const emulator=JSON.parse(await fs.readFile(path.join(root,'emulator-result.json'),'utf8'));assert.equal(emulator.state,'booted');assert.ok(emulator.directory.startsWith(path.join(root,'emulator')+path.sep));
const directory=path.join(root,'device-storage-evidence'),output=path.join(root,'device-storage-fault.json');
if(await fs.access(output).then(()=>true,()=>false))throw Error('Preserve the prior fault attempt');await fs.mkdir(directory,{recursive:true});
const hdc='/Volumes/PortableSSD/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc',commands=[];
const prefs='./data/storage/el2/base/haps/entry/preferences',file=prefs+'/todoStore',blocker=file+'.bak',pause=ms=>new Promise(r=>setTimeout(r,ms));let sequence=0,originalMode,originalFileMode,blockerCreated=false;
async function command(args){const at=Date.now();const{stdout,stderr}=await exec(hdc,['-t','127.0.0.1:13017',...args],{timeout:15000,maxBuffer:2097152});commands.push({at,finishedAt:Date.now(),args,stdout,stderr});return stdout;}
const sandbox=args=>command(['shell','-b',bundle,...args]);
function flatten(n){return[n.attributes??{},...(n.children??[]).flatMap(flatten)];}
async function layout(){const file=`storage-${++sequence}.json`,remote='/data/local/tmp/verikit-'+file;await command(['shell','uitest','dumpLayout','-b',bundle,'-p',remote]);await command(['file','recv',remote,path.join(directory,file)]);return flatten(JSON.parse(await fs.readFile(path.join(directory,file))));}
function find(n,id){const node=n.find(x=>x.id===id);assert.ok(node,'Missing '+id);return node;}
const rows=n=>n.filter(x=>x.id?.startsWith('todo-row-'));
function center(n){const a=n.bounds.match(/-?\d+/g).map(Number);return[String(Math.floor((a[0]+a[2])/2)),String(Math.floor((a[1]+a[3])/2))];}
async function click(id){await command(['shell','uitest','uiInput','click',...center(find(await layout(),id))]);await pause(250);}
function done(n,id){const v=find(n,'toggle-'+id);return v.checked==='true'||v.text==='✓';}
const report={at:new Date().toISOString(),root,bundle,target:'127.0.0.1:13017',scope:'create only an empty todoStore.bak directory inside this synthetic app Preferences directory, obstructing the native backup rename; remove only that empty directory in finally; original data is not moved or replaced; no root required',methodReference:'https://github.com/openharmony/distributeddatamgr_preferences/blob/master/frameworks/native/src/preferences_xml_utils.cpp',checks:[]};
try{
 const before=await layout(),beforeIds=rows(before).map(x=>x.id);assert.equal(beforeIds.length,2,'Run after the successful baseline and extra tests');assert.equal(find(before,'todo-input').text,'');
 originalMode=(await sandbox(['stat','-c','%a',prefs])).trim();assert.match(originalMode,/^[0-7]{3,4}$/);report.originalMode=originalMode;
 originalFileMode=(await sandbox(['stat','-c','%a',file])).trim();assert.match(originalFileMode,/^[0-7]{3,4}$/);report.originalFileMode=originalFileMode;
 assert.match(await sandbox(['stat','-c','%F',blocker]),/No such file|not exist/i,'Refuse to overwrite an existing backup');
 assert.equal((await sandbox(['stat','-c','%F',file])).trim(),'regular file');
 assert.doesNotMatch(await sandbox(['mkdir',blocker]),/denied|failed|cannot|exists/i);blockerCreated=true;
 report.blockerType=(await sandbox(['stat','-c','%F',blocker])).trim();assert.equal(report.blockerType,'directory');
 await command(['shell','uitest','uiInput','inputText',...center(find(await layout(),'todo-input')),'故障保存']);await click('add-button');await command(['shell','uitest','uiInput','keyEvent','Back']);await pause(1500);
 const failed=await layout(),errors=failed.filter(x=>/保存失败|保存错误|写入失败/.test(x.text??'')).map(x=>x.text);assert.ok(errors.length,'Actual put/flush failure must be visible in the UI');
 assert.equal(rows(failed).length,3,'The failed save must retain the in-memory addition');const added=rows(failed).find(x=>!beforeIds.includes(x.id));assert.ok(added);report.failedAdditionId=added.id;report.checks.push({name:'real Preferences path-conflict failure is visible and preserves memory',status:'PASS',errors,id:added.id});
 await command(['shell','uitest','screenCap','-p','/data/local/tmp/verikit-storage-failure.png']);await command(['file','recv','/data/local/tmp/verikit-storage-failure.png',path.join(directory,'storage-failure.png')]);
}catch(e){report.status='FAIL';report.error=e.message;process.exitCode=1;}
finally{
 if(blockerCreated){try{
  assert.equal((await sandbox(['stat','-c','%F',blocker])).trim(),'directory','Unexpected path type; do not delete it');
  assert.doesNotMatch(await sandbox(['rmdir',blocker]),/denied|failed|cannot|not empty/i);
  assert.match(await sandbox(['stat','-c','%F',blocker]),/No such file|not exist/i);
  report.restoredMode=(await sandbox(['stat','-c','%a',prefs])).trim();report.restoredFileMode=(await sandbox(['stat','-c','%a',file])).trim();assert.equal(report.restoredMode,originalMode);assert.equal(report.restoredFileMode,originalFileMode);report.permissionsRestored=true;report.blockerRemoved=true;report.originalDataNotReplaced=true;
 }catch(e){report.status='FAIL';report.restoreError=e.message;process.exitCode=1;}}
}
if(!report.status&&report.permissionsRestored){try{
 const id=report.failedAdditionId.slice('todo-row-'.length);await click('toggle-'+id);await pause(1500);const saved=await layout();assert.equal(done(saved,id),true);assert.equal(saved.some(x=>/保存失败|保存错误|写入失败/.test(x.text??'')),false);
 const ids=rows(saved).map(x=>x.id);await command(['shell','aa','force-stop',bundle]);await command(['shell','aa','start','-a','EntryAbility','-b',bundle]);await pause(1000);const restored=await layout();assert.deepEqual(rows(restored).map(x=>x.id),ids);assert.equal(done(restored,id),true);
 report.checks.push({name:'queue recovers after real failure and persists subsequent state across restart',status:'PASS',restoredIds:ids,completedId:id});report.status='PASS';
}catch(e){report.status='FAIL';report.error=e.message;process.exitCode=1;}}
await fs.writeFile(output,JSON.stringify(report,null,2)+'\n');await fs.writeFile(path.join(directory,'commands.json'),JSON.stringify(commands,null,2)+'\n');console.log(JSON.stringify(report));
