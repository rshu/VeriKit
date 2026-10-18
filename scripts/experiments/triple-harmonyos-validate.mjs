import fs from 'node:fs/promises';import path from 'node:path';import{execFile}from'node:child_process';import{promisify}from'node:util';
const exec=promisify(execFile),root=path.resolve(process.argv[2]),label=process.argv[3]??'initial';
if(!/^[a-z0-9-]+$/.test(label))throw Error('Invalid evidence label');
const output=path.join(root,`openspec-external-${label}.json`);if(await fs.access(output).then(()=>true,()=>false))throw Error('Refusing to overwrite original validation');
const env={...process.env,OPENSPEC_TELEMETRY:'0',DO_NOT_TRACK:'1',XDG_CONFIG_HOME:path.join(root,'openspec-xdg/config'),XDG_DATA_HOME:path.join(root,'openspec-xdg/data')};for(const n of Object.keys(env))if(/KEY|TOKEN|SECRET|PASSWORD/i.test(n))delete env[n];
const cli=path.join(root,'tooling/openspec/bin/openspec.js'),results=[];
for(const argv of [['status','--change','persistent-todo','--json'],['validate','persistent-todo','--type','change','--strict','--json','--no-interactive'],['instructions','apply','--change','persistent-todo','--json']]){
 let stdout='',stderr='',exitCode=0;
 try{const r=await exec(process.execPath,[cli,...argv],{cwd:path.join(root,'workspace'),env,timeout:45000,maxBuffer:2*1024*1024});stdout=r.stdout;stderr=r.stderr;}catch(e){stdout=e.stdout??'';stderr=e.stderr??e.message;exitCode=typeof e.code==='number'?e.code:1;}
 let data;try{data=JSON.parse(stdout);}catch{}
 results.push({argv,exitCode,stdout,stderr,data});
}
const status=results[0].data,apply=results[2].data;
const result={at:new Date().toISOString(),source:'independent execution of original OpenSpec CLI; not a model assertion',results,structurallyReady:results.every(x=>x.exitCode===0)&&status?.artifacts?.every(a=>a.status==='done')===true,allTasksComplete:apply?.state==='all_done',progress:apply?.progress};
await fs.writeFile(output,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({label,structurallyReady:result.structurallyReady,allTasksComplete:result.allTasksComplete,progress:result.progress}));if(!result.structurallyReady)process.exitCode=1;
