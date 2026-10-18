// Independently exercise the generated restore contract on malformed persisted data.
import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';
import{stripTypeScriptTypes}from'node:module';import{pathToFileURL}from'node:url';import{createHash}from'node:crypto';
const root=path.resolve(process.argv[2]),source=await fs.readFile(path.join(root,'workspace/app/entry/src/main/ets/model/TodoModel.ets'),'utf8');
assert.doesNotMatch(source,/^\s*import\b/m);const file=path.join(root,'accepted-TodoModel-edge.mjs');
await fs.writeFile(file,stripTypeScriptTypes(source,{mode:'strip'}));const{TodoModel}=await import(pathToFileURL(file));
const checks=[];function check(name,fn){try{fn();checks.push({name,status:'PASS'});}catch(e){checks.push({name,status:'FAIL',error:e.message});}}
check('malformed persisted JSON is safely handled',()=>{const m=new TodoModel();m.restore('{broken');assert.deepEqual(m.items,[]);});
check('non-array persisted JSON is safely handled',()=>{for(const json of ['null','{}','42','"string"']){const m=new TodoModel();m.restore(json);assert.deepEqual(m.items,[]);}});
check('restore skips invalid field types and retains valid item state',()=>{
 const m=new TodoModel();m.restore(JSON.stringify([{id:'t17',title:'有效',completed:true},{id:18,title:'bad-id',completed:false},{id:'t19',title:23,completed:false},{id:'t20',title:'bad-state',completed:'true'},null,{}]));
 assert.deepEqual(m.items,[{id:'t17',title:'有效',completed:true}]);assert.equal(m.add('新增'),true);assert.equal(new Set(m.items.map(x=>x.id)).size,2);
});
const report={at:new Date().toISOString(),sourceExecuted:'actual generated pure ArkTS model with types stripped',sourceSha256:createHash('sha256').update(source).digest('hex'),checks,passed:checks.filter(x=>x.status==='PASS').length,total:checks.length};
await fs.writeFile(path.join(root,'model-edge-acceptance.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));if(report.passed!==report.total)process.exitCode=1;
