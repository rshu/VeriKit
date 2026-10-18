// Audit actual official apply instructions and frozen context reads before code.
import fs from 'node:fs/promises';import path from 'node:path';import{createHash}from'node:crypto';
const root=path.resolve(process.argv[2]),workspace=path.join(root,'workspace'),json=async f=>JSON.parse(await fs.readFile(path.join(root,f),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex'),gate=await json('spec-gate.json'),proof=await json('read-before-code-proof.json');
const rows=(await fs.readFile(path.join(root,'native-main-initial.jsonl'),'utf8')).trim().split('\n').map(JSON.parse).filter(x=>x.type==='message'&&Date.parse(x.timestamp)>=proof.turn.startedAt&&Date.parse(x.timestamp)<Date.parse(proof.firstCode.at));
const calls=new Map();for(const row of rows)for(const p of Array.isArray(row.message.content)?row.message.content:[])if(p.type==='toolCall')calls.set(p.id,p);
const files=Object.keys(gate.sources).filter(p=>p.endsWith('.md')),reads=[];
for(const p of files){const source=await fs.readFile(path.join(root,'snapshots/spec-gate',p),'utf8');if(hash(source)!==gate.sources[p])throw Error('Frozen spec bytes mismatch');
 const matches=[];for(const row of rows){const m=row.message,c=calls.get(m.toolCallId);if(m.role!=='toolResult'||m.toolName!=='read'||!c)continue;if(path.resolve(workspace,c.arguments.path??c.arguments.file_path??'')!==path.join(workspace,p))continue;
 const text=m.content.filter(x=>x.type==='text').map(x=>x.text).join('\n'),body=text.replace(/\n\n\[(?:Read output capped|Showing lines|\d+ more lines in file)[\s\S]*$/,'');
 matches.push({toolCallId:m.toolCallId,returnedAt:row.timestamp,sourceSha256:hash(source),returnedSha256:hash(body),fullyReturned:!m.isError&&(c.arguments.offset??1)===1&&source.startsWith(body)&&body.length>=source.trimEnd().length});}
 reads.push({path:p,fullyReadBeforeAppCode:matches.some(x=>x.fullyReturned),reads:matches});
}
const cliResults=rows.filter(r=>r.message.role==='toolResult'&&r.message.toolName==='openspec_cli').map(r=>{const c=calls.get(r.message.toolCallId);return{at:r.timestamp,command:c?.arguments.command,artifact:c?.arguments.artifact,successful:!r.message.isError&&r.message.details?.exitCode===0,details:r.message.details};});
const requiredCli=['status','apply instructions'].map(label=>({label,successful:cliResults.some(r=>r.successful&&(label==='status'?r.command==='status':r.command==='instructions'&&r.artifact==='apply'))}));
const result={at:new Date().toISOString(),firstAppCode:proof.firstCode,source:'original native tool results and frozen pre-apply OpenSpec bytes',reads,cliResults,requiredCli,officialApplySkillRead:proof.applySkill.officialApplySkillRead,passed:proof.applySkill.officialApplySkillRead&&reads.every(x=>x.fullyReadBeforeAppCode)&&requiredCli.every(x=>x.successful)};
await fs.writeFile(path.join(root,'openspec-read-before-code-proof.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));if(!result.passed)process.exitCode=1;
