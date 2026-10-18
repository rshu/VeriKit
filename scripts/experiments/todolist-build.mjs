import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
const root = path.resolve(process.argv[2]);
const app = path.join(root, "workspace/app");
const studio = "/Volumes/PortableSSD/Applications/DevEco-Studio.app/Contents";
const tools = process.env.VK_DEVECO_TOOLS ?? path.join(studio, "tools");
const sdk = process.env.VK_DEVECO_SDK ?? path.join(studio, "sdk");
const node = path.join(studio, "tools/node/bin/node");
const packageDir = path.join(app, "node_modules/@ohos");
await fs.mkdir(packageDir, { recursive: true });
for (const name of ["hvigor", "hvigor-ohos-plugin"]) {
  const target = path.join(packageDir, name);
  const existing = await fs.lstat(target).catch(() => null);
  if (existing?.isSymbolicLink()) await fs.unlink(target);
  else if (existing) throw new Error("Expected only an experiment-local tool symlink.");
  await fs.symlink(path.join(tools, "hvigor", name), target, "dir");
}
const args = [path.join(tools, "hvigor/hvigor/bin/hvigor.js"), "--mode", "module", "-p", "product=default", "-p", "module=entry@default", "-p", "buildMode=debug", "assembleHap", "--no-daemon", "--no-parallel", "--no-incremental"];
const env = { ...process.env, HVIGOR_USER_HOME: path.join(root, "hvigor-home"), DEVECO_SDK_HOME: sdk,
  OHOS_SDK_HOME: path.join(sdk, "default/openharmony"), JAVA_HOME: path.join(studio, "jbr/Contents/Home"),
  NODE_HOME: path.join(studio, "tools/node"), NODE_PATH: path.join(app, "node_modules"), CI: "true" };
const startedAt = Date.now();
const child = spawn(node, args, { cwd: app, env, stdio: ["ignore", "pipe", "pipe"] });
let output = "", timedOut = false;
for (const stream of [child.stdout, child.stderr]) stream.on("data", data => { output += data; process.stdout.write(data); });
const timer = setTimeout(() => { timedOut = true; child.kill("SIGTERM"); }, 180000);
child.once("error", error => { output += error.message; });
const code = await new Promise(resolve => child.once("exit", resolve));
clearTimeout(timer);
await fs.writeFile(path.join(root, "build.log"), output);
await fs.writeFile(path.join(root, "build-result.json"), JSON.stringify({ startedAt, elapsedMs: Date.now() - startedAt, exitCode: code, timedOut, sdk, tools, command: [node, ...args], passed: code === 0 }, null, 2) + "\n");
if (code || timedOut) process.exitCode = 1;
