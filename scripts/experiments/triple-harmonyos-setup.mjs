// Pinned official OpenSpec installation and project setup, confined to a new run.
import fs from 'node:fs/promises';
import path from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {prepareFixture} from './todolist-fixture.mjs';
const exec=promisify(execFile), root=path.resolve(process.argv[2]);
const original='/opt/homebrew/lib/node_modules/@fission-ai/openspec';
const pkg=JSON.parse(await fs.readFile(path.join(original,'package.json'),'utf8'));
if(pkg.name!=='@fission-ai/openspec'||pkg.version!=='1.3.1')throw Error('Pinned official OpenSpec 1.3.1 required');
if(await fs.access(path.join(root,'workspace')).then(()=>true,()=>false))throw Error('New experiment directory required');
await fs.mkdir(root,{recursive:true,mode:0o700});
await prepareFixture(root);
const workspace=path.join(root,'workspace'), installed=path.join(root,'tooling/openspec');
await fs.cp(original,installed,{recursive:true,verbatimSymlinks:true});
const xdg=path.join(root,'openspec-xdg');
const env={...process.env,OPENSPEC_TELEMETRY:'0',DO_NOT_TRACK:'1',XDG_CONFIG_HOME:path.join(xdg,'config'),XDG_DATA_HOME:path.join(xdg,'data')};
for(const key of Object.keys(env))if(/KEY|TOKEN|SECRET|PASSWORD/i.test(key))delete env[key];
await fs.mkdir(path.join(env.XDG_CONFIG_HOME,'openspec'),{recursive:true});
await fs.writeFile(path.join(env.XDG_CONFIG_HOME,'openspec/config.json'),JSON.stringify({profile:'core',delivery:'both',featureFlags:{}},null,2)+'\n');
const cli=path.join(installed,'bin/openspec.js');
const version=await exec(process.execPath,[cli,'--version'],{cwd:workspace,env,timeout:30000});
const init=await exec(process.execPath,[cli,'init','--tools','claude','--profile','core'],{cwd:workspace,env,timeout:30000});
await fs.writeFile(path.join(root,'openspec-init.log'),init.stdout+init.stderr);
const hash=b=>createHash('sha256').update(b).digest('hex');
const skills={};for(const name of await fs.readdir(path.join(workspace,'.claude/skills'))){const f=path.join(workspace,'.claude/skills',name,'SKILL.md');skills[name]=hash(await fs.readFile(f));}
const sourceHashes={};for(const f of ['package.json','bin/openspec.js','schemas/spec-driven/schema.yaml']){sourceHashes[f]=hash(await fs.readFile(path.join(original,f)));if(hash(await fs.readFile(path.join(installed,f)))!==sourceHashes[f])throw Error('OpenSpec copied bytes differ');}
const appFile=path.join(workspace,'app/AppScope/app.json5');const app=JSON.parse(await fs.readFile(appFile,'utf8'));app.app.bundleName='com.verikit.experiment.openspectodo';await fs.writeFile(appFile,JSON.stringify(app,null,2)+'\n');
await fs.writeFile(path.join(workspace,'openspec/config.yaml'),`schema: spec-driven
context: |
  This is an isolated HarmonyOS API 21 ArkTS TodoList experiment.
  The approved task and hard requirements are in app/requirements.md.
  Use ArkData Preferences and ArkTS; existing ArkUI foundation is allowed.
  The app is under app/. Never change the installed plugins or RC configuration.
  Propose artifacts before implementation; leave external verification tasks unchecked until evidence is supplied.
  No accounts, network, notifications, third-party libraries, or fabricated test results.
rules:
  proposal:
    - Keep the complete feature scope and the 80-character title limit.
  specs:
    - Use SHALL or MUST and exactly four-hash Scenario headers with WHEN and THEN.
  design:
    - Describe Preferences flush serialization and reactive ArkUI list and statistics updates.
  tasks:
    - Separate implementation tasks from external business, SDK build, and emulator verification.
`);
const report={at:new Date().toISOString(),package:pkg.name,version:version.stdout.trim(),installedRoot:installed,installation:'complete byte-preserving copy of the preinstalled official package and its installed dependencies',nativeOpenClawAdapter:false,integration:'official Claude-target SKILL.md files loaded unmodified by OpenClaw skills.load.extraDirs; restricted argv tool executes the original CLI',telemetryDisabled:true,isolatedConfig:env.XDG_CONFIG_HOME,isolatedData:env.XDG_DATA_HOME,globalInstallationModified:false,sourceHashes,generatedSkills:skills,changeName:'persistent-todo'};
await fs.writeFile(path.join(root,'openspec-install.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
