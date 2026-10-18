// Native HarmonyOS developer-test interface, restricted to this experiment's bundle.
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execute = promisify(execFile);
const root = path.resolve(process.argv[2]);
const target = process.argv[3]?.startsWith("--") ? "127.0.0.1:13017" : process.argv[3] ?? "127.0.0.1:13017";
const allowBasicInput = process.argv.includes("--allow-basic-input");
const resetApp = process.argv.includes("--reset-app");
const consentActions = [];
const app = path.join(root, "workspace/app");
const bundle = JSON.parse(await fs.readFile(path.join(app, "AppScope/app.json5"))).app.bundleName;
if (!bundle.startsWith("com.verikit.experiment.")) throw new Error("Only the experiment's own bundle may be tested.");
const hdc = "/Volumes/PortableSSD/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc";
const records = [], checks = [];
const directory = path.join(root, "device-evidence");
await fs.mkdir(directory, { recursive: true });
async function command(args) {
  const startedAt = Date.now();
  const { stdout, stderr } = await execute(hdc, ["-t", target, ...args], { timeout: 15000, maxBuffer: 2 * 1024 * 1024 });
  records.push({ at: startedAt, args, stdout, stderr });
  return stdout;
}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
class ConsentRequired extends Error {}
let sequence = 0;
function flatten(node) { return [node.attributes ?? {}, ...(node.children ?? []).flatMap(flatten)]; }
async function layout() {
  const name = `layout-${++sequence}.json`;
  const remote = "/data/local/tmp/verikit-" + name;
  await command(["shell", "uitest", "dumpLayout", "-b", bundle, "-p", remote]);
  await command(["file", "recv", remote, path.join(directory, name)]);
  let nodes = flatten(JSON.parse(await fs.readFile(path.join(directory, name))));
  if (nodes.length < 2) {
    // A clean emulator may show the keyboard's first-use privacy consent.
    // Basic mode requires explicit authorization outside this script.
    const dialogName = `system-${sequence}.json`, remoteDialog = "/data/local/tmp/verikit-dialog.json";
    await command(["shell", "uitest", "dumpLayout", "-p", remoteDialog]);
    await command(["file", "recv", remoteDialog, path.join(directory, dialogName)]);
    const dialog = flatten(JSON.parse(await fs.readFile(path.join(directory, dialogName))));
    const cancel = dialog.find(n => n.id === "Paf.Permission.button_cancel" && n.text === "取消");
    if (cancel && dialog.some(n => n.id === "Paf.Permission.appName" && n.text === "小艺输入法")) {
      await command(["shell", "uitest", "uiInput", "click", ...center(cancel)]);
      consentActions.push("cancel initial keyboard dialog");
      await wait(300);
      await command(["shell", "uitest", "dumpLayout", "-b", bundle, "-p", remote]);
      await command(["file", "recv", remote, path.join(directory, name)]);
      nodes = flatten(JSON.parse(await fs.readFile(path.join(directory, name))));
      if (nodes.length < 2) {
        await command(["shell", "uitest", "dumpLayout", "-p", remoteDialog]);
        await command(["file", "recv", remoteDialog, path.join(directory, `after-cancel-${sequence}.json`)]);
        const remaining = flatten(JSON.parse(await fs.readFile(path.join(directory, `after-cancel-${sequence}.json`))));
        const basic = remaining.find(n => n.id === "advanced_dialog_button_1" && n.text === "同意基本模式");
        if (allowBasicInput && basic) {
          await command(["shell", "uitest", "uiInput", "click", ...center(basic)]);
          consentActions.push("accept basic input mode under explicit user authorization");
          await wait(700);
          await command(["shell", "uitest", "dumpLayout", "-b", bundle, "-p", remote]);
          await command(["file", "recv", remote, path.join(directory, name)]);
          nodes = flatten(JSON.parse(await fs.readFile(path.join(directory, name))));
          if (nodes.length < 2) {
            const setupFile = path.join(directory, `keyboard-setup-${sequence}.json`);
            await command(["shell", "uitest", "dumpLayout", "-p", remoteDialog]);
            await command(["file", "recv", remoteDialog, setupFile]);
            let setup = flatten(JSON.parse(await fs.readFile(setupFile)));
            if (setup.some(n => n.text === "请选择中文键盘布局")) {
              const option = setup.find(n => n.text === "26 键, 26键" && n.clickable === "true");
              if (option) await command(["shell", "uitest", "uiInput", "click", ...center(option)]);
              const scroll = setup.find(n => n.type === "Scroll" && n.scrollable === "true");
              if (scroll) {
                const [left, top, right, bottom] = scroll.bounds.match(/-?\d+/g).map(Number);
                const x = String(left + Math.min(20, (right - left) / 10));
                await command(["shell", "uitest", "uiInput", "swipe", x, String(Math.floor(top + (bottom - top) * .85)), x, String(Math.floor(top + (bottom - top) * .2)), "600"]);
              }
              await command(["shell", "uitest", "dumpLayout", "-p", remoteDialog]);
              await command(["file", "recv", remoteDialog, setupFile]);
              setup = flatten(JSON.parse(await fs.readFile(setupFile)));
              const next = setup.find(n => n.text === "下一步");
              assert.ok(next, "Keyboard layout setup did not expose its next button");
              await command(["shell", "uitest", "uiInput", "click", ...center(next)]);
              consentActions.push("choose 26-key layout and finish basic keyboard setup");
              await wait(700);
              await command(["shell", "uitest", "dumpLayout", "-b", bundle, "-p", remote]);
              await command(["file", "recv", remote, path.join(directory, name)]);
              nodes = flatten(JSON.parse(await fs.readFile(path.join(directory, name))));
            }
          }
          assert.ok(nodes.length > 1, "Application did not return after selecting basic input mode");
          return nodes;
        }
        const exit = remaining.find(n => n.id === "advanced_dialog_button_2" && n.text === "退出应用");
        if (exit) await command(["shell", "uitest", "uiInput", "click", ...center(exit)]);
        throw new ConsentRequired("The clean emulator's input method requires a separate agreement; cancellation/exit was selected. No agreement was accepted.");
      }
    }
  }
  return nodes;
}
function find(nodes, id) { const node = nodes.find(n => n.id === id); assert.ok(node, `Missing UI component ${id}`); return node; }
function center(node) {
  const values = node.bounds.match(/-?\d+/g).map(Number);
  return [Math.floor((values[0] + values[2]) / 2), Math.floor((values[1] + values[3]) / 2)].map(String);
}
async function click(id) {
  const node = find(await layout(), id); assert.notEqual(node.enabled, "false", id + " is disabled");
  await command(["shell", "uitest", "uiInput", "click", ...center(node)]);
  await wait(250);
}
async function add(title) {
  const input = find(await layout(), "todo-input");
  await command(["shell", "uitest", "uiInput", "inputText", ...center(input), title]);
  let afterInput = await layout();
  if (find(afterInput, "todo-input").text === "") {
    await command(["shell", "uitest", "uiInput", "inputText", ...center(find(afterInput, "todo-input")), title]);
    afterInput = await layout();
  }
  assert.equal(find(afterInput, "todo-input").text, title, "Native input text must match the test data exactly");
  await click("add-button");
  await command(["shell", "uitest", "uiInput", "keyEvent", "Back"]);
  await wait(700);
}
const rows = nodes => nodes.filter(n => n.id?.startsWith("todo-row-"));
const textPresent = (nodes, text) => nodes.some(n => n.text === text);
async function check(name, fn) { try { const evidence = await fn(); checks.push({ name, status: "PASS", passed: true, evidence }); } catch (error) { checks.push({ name, status: error instanceof ConsentRequired ? "BLOCKED" : "FAIL", passed: false, error: error.message }); throw error; } }
const report = { at: new Date().toISOString(), root, bundle, target, mode: "real HarmonyOS API 21 emulator and native UITest commands", basicInputModeAuthorized: allowBasicInput, resetApp, consentActions, checks };
try {
  if (resetApp) assert.match(await command(["uninstall", bundle]), /uninstall bundle successfully/);
  const output = await command(["install", path.join(app, "entry/build/default/outputs/default/entry-default-unsigned.hap")]);
  assert.match(output, /install bundle successfully/);
  assert.match(await command(["shell", "aa", "start", "-a", "EntryAbility", "-b", bundle]), /start ability successfully/);
  await wait(1000);
  await check("real ArkUI app loads empty state", async () => { const nodes = await layout(); assert.equal(rows(nodes).length, 0); find(nodes, "todo-input"); return { rowCount: 0 }; });
  await check("blank title is rejected on device", async () => { await click("add-button"); assert.equal(rows(await layout()).length, 0); });
  await check("Chinese title can be added", async () => { await add("买牛奶"); const nodes = await layout(); assert.equal(rows(nodes).length, 1); assert.ok(textPresent(nodes, "买牛奶")); });
  await check("second todo gets a separate row", async () => { await add("Read docs"); const nodes = await layout(); assert.equal(rows(nodes).length, 2); assert.ok(textPresent(nodes, "Read docs")); });
  const initialRows = rows(await layout());
  const firstId = initialRows[0].id.substring("todo-row-".length);
  const secondId = initialRows[1].id.substring("todo-row-".length);
  await check("complete selected todo", async () => { await click("toggle-" + firstId); await wait(500); assert.equal(find(await layout(), "toggle-" + firstId).checked, "true"); });
  await check("active filter excludes completed todo", async () => { await click("filter-active"); const nodes = await layout(); assert.equal(rows(nodes).length, 1); assert.ok(textPresent(nodes, "Read docs")); assert.equal(textPresent(nodes, "买牛奶"), false); });
  await check("completed filter shows completed todo only", async () => { await click("filter-completed"); const nodes = await layout(); assert.equal(rows(nodes).length, 1); assert.ok(textPresent(nodes, "买牛奶")); assert.equal(textPresent(nodes, "Read docs"), false); });
  await click("filter-all");
  await command(["shell", "uitest", "screenCap", "-p", "/data/local/tmp/verikit-todos.png"]);
  await command(["file", "recv", "/data/local/tmp/verikit-todos.png", path.join(directory, "todolist.png")]);
  await check("process restart restores actual Preferences data", async () => {
    await command(["shell", "aa", "force-stop", bundle]);
    await command(["shell", "aa", "start", "-a", "EntryAbility", "-b", bundle]); await wait(1000);
    const nodes = await layout(); assert.equal(rows(nodes).length, 2); assert.equal(find(nodes, "toggle-" + firstId).checked, "true"); assert.ok(textPresent(nodes, "Read docs")); return { restoredIds: rows(nodes).map(n => n.id) };
  });
  await check("completed todo can be reopened", async () => { await click("toggle-" + firstId); await wait(500); assert.equal(find(await layout(), "toggle-" + firstId).checked, "false"); });
  await check("delete targets the selected row", async () => { await click("delete-" + secondId); await wait(500); const nodes = await layout(); assert.equal(rows(nodes).length, 1); assert.ok(textPresent(nodes, "买牛奶")); assert.equal(textPresent(nodes, "Read docs"), false); });
  await check("deletion and reopened state survive restart", async () => {
    await command(["shell", "aa", "force-stop", bundle]); await command(["shell", "aa", "start", "-a", "EntryAbility", "-b", bundle]); await wait(1000);
    const nodes = await layout(); assert.equal(rows(nodes).length, 1); assert.equal(find(nodes, "toggle-" + firstId).checked, "false"); assert.ok(textPresent(nodes, "买牛奶"));
  });
} catch (error) { report.error = error.message; report.status = error instanceof ConsentRequired ? "BLOCKED" : "FAIL"; process.exitCode = 1; }
finally {
  report.passed = checks.filter(c => c.passed).length; report.total = 11;
  report.counts = { PASS: report.passed, FAIL: checks.filter(c => c.status === "FAIL").length, BLOCKED: checks.filter(c => c.status === "BLOCKED").length, NOT_RUN: 11 - checks.length };
  report.status ??= "PASS";
  await fs.writeFile(path.join(root, "device-acceptance.json"), JSON.stringify(report, null, 2) + "\n");
  await fs.writeFile(path.join(directory, "commands.json"), JSON.stringify(records, null, 2) + "\n");
  console.log(JSON.stringify(report));
}
