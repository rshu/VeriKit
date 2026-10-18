// Preserve every real SDK result and bind it to the exact business source bytes.
import fs from 'node:fs/promises';import path from 'node:path';import{spawn}from'node:child_process';import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';
const root=path.resolve(process.argv[2]),app=path.join(root,'workspace/app'),hash=b=>createHash('sha256').update(b).digest('hex');
async function sources(){const out={};async function walk(dir){for(const e of await fs.readdir(path.join(app,dir),{withFileTypes:true})){if(['node_modules','build','.hvigor','.preview','.git'].includes(e.name))continue;const p=path.join(dir,e.name);if(e.isDirectory())await walk(p);else if(e.isFile())out[p]=hash(await fs.readFile(path.join(app,p)));}}await walk('');return out;}
const parent=path.join(root,'sdk-history');await fs.mkdir(parent,{recursive:true});const name=String((await fs.readdir(parent)).length+1).padStart(2,'0'),folder=path.join(parent,name);await fs.mkdir(folder);
const before=await sources(),startedAt=Date.now();await fs.writeFile(path.join(folder,'sources-before.json'),JSON.stringify(before,null,2)+'\n');
const child=spawn(process.execPath,[fileURLToPath(new URL('./todolist-build.mjs',import.meta.url)),root],{stdio:'inherit'});
const code=await new Promise((r,j)=>{child.once('error',j);child.once('exit',r);});const finishedAt=Date.now(),after=await sources();
for(const name of ['build.log','build-result.json'])await fs.copyFile(path.join(root,name),path.join(folder,name));
const result=JSON.parse(await fs.readFile(path.join(root,'build-result.json'),'utf8'));let hapSha256=null;
if(result.passed)hapSha256=hash(await fs.readFile(path.join(app,'entry/build/default/outputs/default/entry-default-unsigned.hap')));
const proof={attempt:name,startedAt,finishedAt,sourceBefore:before,sourceAfter:after,sourceUnchangedDuringBuild:JSON.stringify(before)===JSON.stringify(after),hapSha256,sdkPassed:result.passed};
await fs.writeFile(path.join(folder,'source-binding.json'),JSON.stringify(proof,null,2)+'\n');await fs.writeFile(path.join(root,'sdk-source-binding.json'),JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify({attempt:name,sdkPassed:result.passed,sourceUnchangedDuringBuild:proof.sourceUnchangedDuringBuild,hapSha256}));if(code||!proof.sourceUnchangedDuringBuild)process.exitCode=1;
