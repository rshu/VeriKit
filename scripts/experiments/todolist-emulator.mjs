import fs from "node:fs/promises";
import path from "node:path";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { randomUUID } from "node:crypto";
const execute = promisify(execFile);
const root = path.resolve(process.argv[2]);
const directory = path.join(root, "emulator", "VeriKitTodoExperiment");
const studio = "/Volumes/PortableSSD/Applications/DevEco-Studio.app/Contents";
const executable = path.join(studio, "tools/emulator/Emulator");
const imageRoot = "/Users/id02271616/Library/Huawei/Sdk";
const hdc = path.join(studio, "sdk/default/openharmony/toolchains/hdc");
await fs.mkdir(directory, { recursive: true });
const previousUuid = /^uuid=(.+)$/m.exec(await fs.readFile(path.join(directory, "config.ini"), "utf8").catch(() => ""))?.[1];
const config = { name: "VeriKitTodoExperiment", "hw.lcd.density": 320, "hw.lcd.height": 1280, "hw.lcd.width": 720,
  "hw.cpu.ncore": 4, "hw.phy.height": 156, "hw.phy.width": 72, diagonalSize: 6.82, "hw.ramSize": 3072, deviceType: "phone", uuid: previousUuid ?? randomUUID(),
  hmApiVersion: 21, hmAbi: "arm", hmVersion: "6.0.0.112", "hw.cpu.arch": "arm64", "hw.apiName": "6.0.1",
  "image.sysdir.1": "system-image/HarmonyOS-6.0.1/phone_all_arm/", "hvd.path": directory, "disk.dataPartition.size": "5120M", hmShowVersion: "HarmonyOS 6.0.1(21)",
  harmonyOSVersion: "HarmonyOS-6.0.1", "harmonyos.sdk.path": path.join(studio, "sdk"),
  "harmonyos.config.path": path.join(root, "emulator-settings"), "harmonyos.log.path": path.join(root, "emulator-logs"),
  "guest.version": "HarmonyOS 6.0.0.112(SP3)", devModel: "PHEMU-FD00", model: "VeriKit isolated test device", isCustomize: true, vendorCountry: "CN", "hw.hdc.port": 13017 };
await fs.writeFile(path.join(directory, "config.ini"), Object.entries(config).map(([k, v]) => `${k}=${v}`).join("\n") + "\n");
for (const folder of ["emulator-settings", "emulator-logs"]) await fs.mkdir(path.join(root, folder), { recursive: true });
const log = await fs.open(path.join(root, "emulator-console.log"), "a");
const child = spawn(executable, ["-hvd", "VeriKitTodoExperiment", "-path", path.dirname(directory), "-imageRoot", imageRoot, "-hdcport", "13017"], { cwd: directory, stdio: ["ignore", "pipe", "pipe"] });
for (const stream of [child.stdout, child.stderr]) stream.on("data", data => { void log.appendFile(data); });
const report = { pid: child.pid, directory, imageRoot, startedAt: Date.now(), originalDeviceDataCopied: false, reusedExperimentData: Boolean(previousUuid), target: "127.0.0.1:13017", state: "starting" };
const save = async () => {
  const file = path.join(root, "emulator-result.json");
  const current = await fs.readFile(file, "utf8").then(JSON.parse).catch(() => null);
  if (current?.startedAt > report.startedAt) return;
  await fs.writeFile(file, JSON.stringify(report, null, 2) + "\n");
};
await save(); console.log(JSON.stringify(report));
const stopTimer = setTimeout(() => child.kill("SIGTERM"), 30 * 60 * 1000);
child.once("exit", async (code, signal) => { clearTimeout(stopTimer); report.exitCode = code; report.signal = signal; report.exitedAt = Date.now(); await save(); await log.close(); });
process.on("SIGTERM", () => child.kill("SIGTERM"));
for (let attempt = 0; attempt < 40 && child.exitCode === null; attempt++) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  try {
    await execute(hdc, ["tconn", report.target], { timeout: 4000 });
    const { stdout } = await execute(hdc, ["-t", report.target, "shell", "param", "get", "const.ohos.apiversion"], { timeout: 4000 });
    if (stdout.trim() === "21") { report.state = "booted"; report.bootedAt = Date.now(); await save(); console.log(JSON.stringify(report)); break; }
  } catch { /* Fresh emulator may still be creating data or booting. */ }
}
if (report.state !== "booted") { report.state = "boot_not_confirmed"; await save(); console.log(JSON.stringify(report)); }
