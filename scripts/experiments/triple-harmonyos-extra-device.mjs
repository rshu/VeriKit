// Additional OpenSpec task coverage on the same disposable API 21 device.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const exec=promisify(execFile),root=path.resolve(process.argv[2]);
const bundle=JSON.parse(await fs.readFile(path.join(root,'workspace/app/AppScope/app.json5'),'utf8')).app.bundleName;
assert.equal(bundle,'com.verikit.experiment.openspectodo');
const hdc='/Volumes/PortableSSD/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc';
const directory=path.join(root,'device-extra-evidence');await fs.mkdir(directory,{recursive:true});
if(await fs.access(path.join(root,'device-extra-acceptance.json')).then(()=>true,()=>false))throw Error('Preserve previous evidence; use a fresh raw run or archive it explicitly');
const commands=[],checks=[];let seq=0;
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function command(args){const at=Date.now();const{stdout,stderr}=await exec(hdc,['-t','127.0.0.1:13017',...args],{timeout:15000,maxBuffer:2097152});commands.push({at,finishedAt:Date.now(),args,stdout,stderr});return stdout;}
function flatten(n){return[n.attributes??{},...(n.children??[]).flatMap(flatten)];}
async function layout(){const file=`extra-${++seq}.json`,remote='/data/local/tmp/verikit-'+file;await command(['shell','uitest','dumpLayout','-b',bundle,'-p',remote]);await command(['file','recv',remote,path.join(directory,file)]);return flatten(JSON.parse(await fs.readFile(path.join(directory,file))));}
function find(nodes,id){const n=nodes.find(x=>x.id===id);assert.ok(n,'Missing '+id);return n;}
function center(n){const a=n.bounds.match(/-?\d+/g).map(Number);return[String(Math.floor((a[0]+a[2])/2)),String(Math.floor((a[1]+a[3])/2))];}
async function click(id){const n=find(await layout(),id);assert.notEqual(n.enabled,'false');await command(['shell','uitest','uiInput','click',...center(n)]);await pause(200);}
const rows=nodes=>nodes.filter(x=>x.id?.startsWith('todo-row-'));
async function input(text){
 const current=find(await layout(),'todo-input');
 if(current.text){
  await command(['shell','uitest','uiInput','click',...center(current)]);
  // Official API 21 KeyCode: CTRL_LEFT=2072, A=2017, DEL=2055.
  await command(['shell','uitest','uiInput','keyEvent','2072','2017']);
  await command(['shell','uitest','uiInput','keyEvent','2055']);
  assert.equal(find(await layout(),'todo-input').text,'','Native selection/delete must actually clear previous input');
 }
 await command(['shell','uitest','uiInput','inputText',...center(find(await layout(),'todo-input')),text]);return find(await layout(),'todo-input').text;
}
async function closeKeyboard(){await command(['shell','uitest','uiInput','keyEvent','Back']);await pause(200);}
function completed(nodes,id){const n=find(nodes,'toggle-'+id);return n.text==='✓'||n.checked==='true';}
async function check(name,fn){try{const evidence=await fn();checks.push({name,status:'PASS',evidence});}catch(e){checks.push({name,status:'FAIL',error:e.message});throw e;}}
const report={at:new Date().toISOString(),root,bundle,target:'127.0.0.1:13017',mode:'real native UI operations; no app or plugin modifications',checks};
try{
 await check('duplicate Chinese titles retain different IDs',async()=>{
  const before=rows(await layout());assert.equal(before.length,1,'Baseline must leave exactly one Chinese todo');
  assert.equal(await input('买牛奶'),'买牛奶');await click('add-button');await closeKeyboard();await pause(400);
  const n=await layout(),after=rows(n);assert.equal(after.length,2);assert.equal(new Set(after.map(x=>x.id)).size,2);assert.equal(n.filter(x=>x.text==='买牛奶').length,2);
  return{beforeIds:before.map(x=>x.id),afterIds:after.map(x=>x.id)};
 });
 await check('whitespace-only native input does not append',async()=>{
  const before=rows(await layout()).map(x=>x.id);assert.equal(await input('   '),'   ');await click('add-button');await closeKeyboard();assert.deepEqual(rows(await layout()).map(x=>x.id),before);return{unchangedIds:before};
 });
 await check('81-character title is blocked or rejected in the UI',async()=>{
  const before=rows(await layout()).map(x=>x.id),sent='中'.repeat(81),actual=await input(sent);
  if(actual.length<=80){assert.ok(actual.length>0);assert.deepEqual(rows(await layout()).map(x=>x.id),before);return{sentLength:81,inputLength:actual.length,mechanism:'input length restriction prevents oversized title reaching add; direct model separately rejects 81',addAttempted:false};}
  assert.equal(actual,sent);await click('add-button');await closeKeyboard();assert.deepEqual(rows(await layout()).map(x=>x.id),before);return{sentLength:81,inputLength:actual.length,mechanism:'actual add rejected oversized input',addAttempted:true};
 });
 // Replace any remaining validation text with a short input; do not add it.
 await input('临时');await closeKeyboard();
 await check('rapid consecutive toggles persist the final state and stable IDs',async()=>{
  const before=await layout(),id=rows(before)[0].id.slice('todo-row-'.length),initial=completed(before,id);
  const point=center(find(before,'toggle-'+id)),start=commands.length;
  for(let i=0;i<7;i++)await command(['shell','uitest','uiInput','click',...point]);
  await pause(1200);const changed=await layout();assert.equal(completed(changed,id),!initial);
  const ids=rows(changed).map(x=>x.id);
  await command(['shell','aa','force-stop',bundle]);await command(['shell','aa','start','-a','EntryAbility','-b',bundle]);await pause(1000);
  const after=await layout();assert.deepEqual(rows(after).map(x=>x.id),ids);assert.equal(completed(after,id),!initial);
  const taps=commands.slice(start).filter(x=>x.args[1]==='uitest'&&x.args[2]==='uiInput'&&x.args[3]==='click');
  return{id,toggles:7,initial,final:!initial,restoredIds:ids,clickTimes:taps.map(x=>x.at),scope:'sequential native commands without intentional delays; no claim of concurrent flushes or a load benchmark'};
 });
 report.status='PASS';
}catch(e){report.status='FAIL';report.error=e.message;process.exitCode=1;}
finally{report.passed=checks.filter(x=>x.status==='PASS').length;report.total=4;await fs.writeFile(path.join(root,'device-extra-acceptance.json'),JSON.stringify(report,null,2)+'\n');await fs.writeFile(path.join(directory,'commands.json'),JSON.stringify(commands,null,2)+'\n');console.log(JSON.stringify(report));}
