// Experimental transport only: executes the unmodified, pinned official CLI.
import fs from 'node:fs/promises';
import path from 'node:path';
import {execFile} from 'node:child_process';
export function registerOpenSpec(api,{root}){
 const workspace=path.join(root,'workspace'),cli=path.join(root,'tooling/openspec/bin/openspec.js');
 const run=async argv=>{
  const env={...process.env,OPENSPEC_TELEMETRY:'0',DO_NOT_TRACK:'1',XDG_CONFIG_HOME:path.join(root,'openspec-xdg/config'),XDG_DATA_HOME:path.join(root,'openspec-xdg/data')};
  for(const name of Object.keys(env))if(/KEY|TOKEN|SECRET|PASSWORD/i.test(name))delete env[name];
  const startedAt=Date.now();
  const result=await new Promise(resolve=>execFile(process.execPath,[cli,...argv],{cwd:workspace,env,timeout:45000,maxBuffer:2*1024*1024},(error,stdout,stderr)=>resolve({exitCode:error?typeof error.code==='number'?error.code:1:0,stdout,stderr,error:error?.code,startedAt,finishedAt:Date.now()})));
  await fs.appendFile(path.join(root,'openspec-cli.jsonl'),JSON.stringify({argv,...result})+'\n',{mode:0o600});
  return {content:[{type:'text',text:result.stdout||result.stderr||`CLI exited ${result.exitCode}`}],details:{argv,exitCode:result.exitCode,stderr:result.stderr},...(result.exitCode?{isError:true}:{})};
 };
 api.registerTool({name:'openspec_cli',label:'OpenSpec 1.3.1',description:'Execute the official OpenSpec CLI inside this isolated project. Use this tool instead of Bash in OpenSpec skills. It cannot run arbitrary shell commands. Change name is persistent-todo. instructions artifact supports proposal, specs, design, tasks, apply.',parameters:{type:'object',additionalProperties:false,required:['command'],properties:{command:{type:'string',enum:['new','status','instructions','validate','show','list','schemas','templates']},artifact:{type:'string',enum:['proposal','specs','design','tasks','apply']}}},async execute(_id,args){
  const id='persistent-todo';let argv;
  switch(args.command){
   case'new':argv=['new','change',id,'--schema','spec-driven'];break;
   case'status':argv=['status','--change',id,'--json'];break;
   case'instructions':if(!args.artifact)throw Error('artifact required');argv=['instructions',args.artifact,'--change',id,'--json'];break;
   case'validate':argv=['validate',id,'--type','change','--strict','--json','--no-interactive'];break;
   case'show':argv=['show',id,'--type','change','--json'];break;
   case'list':argv=['list','--json'];break;
   case'schemas':argv=['schemas','--json'];break;
   case'templates':argv=['templates','--schema','spec-driven','--json'];break;
   default:throw Error('Unsupported command');
  }return run(argv);
 }},{optional:true});
}
