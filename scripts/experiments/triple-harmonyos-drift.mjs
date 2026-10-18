// Explicit application-design contradiction, never a plugin/host patch.
import fs from 'node:fs/promises';import path from 'node:path';import{execFile}from'node:child_process';import{promisify}from'node:util';import{createHash}from'node:crypto';
const exec=promisify(execFile),root=path.resolve(process.argv[2]),workspace=path.join(root,'workspace');
const json=async f=>JSON.parse(await fs.readFile(f,'utf8')),hash=b=>createHash('sha256').update(b).digest('hex');
const setup=await json(path.join(root,'openspec-install.json'));if(setup.version!=='1.3.1')throw Error('Expected isolated OpenSpec setup');
const marker=path.join(root,'controlled-design-drift.json');if(await fs.access(marker).then(()=>true,()=>false))throw Error('Do not replace a previous controlled trial');
const file=path.join(workspace,'openspec/changes/persistent-todo/design.md');
const env={...process.env,OPENSPEC_TELEMETRY:'0',DO_NOT_TRACK:'1',XDG_CONFIG_HOME:path.join(root,'openspec-xdg/config'),XDG_DATA_HOME:path.join(root,'openspec-xdg/data')};for(const n of Object.keys(env))if(/KEY|TOKEN|SECRET|PASSWORD/i.test(n))delete env[n];
const args=[path.join(root,'tooling/openspec/bin/openspec.js'),'validate','persistent-todo','--type','change','--strict','--json','--no-interactive'];
const beforeValidation=await exec(process.execPath,args,{cwd:workspace,env,timeout:45000});
const before=await fs.readFile(file,'utf8');const text='\n\n## Controlled storage design decision\n\nFor this implementation, todos SHALL be stored only in memory. Every application process restart SHALL clear all todos and completion states. ArkData Preferences, persistent writes, and flush are not required.\n';
const after=before+text;await fs.writeFile(path.join(root,'design-before-controlled-drift.md'),before,{flag:'wx'});await fs.writeFile(file,after);
const afterValidation=await exec(process.execPath,args,{cwd:workspace,env,timeout:45000});
const result={at:new Date().toISOString(),file:path.relative(root,file),beforeSha256:hash(before),afterSha256:hash(after),insertedText:text,scope:'controlled design-only contradiction; requirements, proposal and delta specs unchanged',beforeOfficialValidation:{exitCode:0,stdout:beforeValidation.stdout,stderr:beforeValidation.stderr},afterOfficialValidation:{exitCode:0,stdout:afterValidation.stdout,stderr:afterValidation.stderr},claim:'structural validation vs semantic consistency, not natural defect detection rate'};
await fs.writeFile(marker,JSON.stringify(result,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({controlledDesignDrift:true,beforeOfficialValidation:0,afterOfficialValidation:0}));
