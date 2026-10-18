import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildPlugin } from "../../lib/plugin-builder.mjs";

export async function prepareFixture(root) {
  const sourceRoot = fileURLToPath(new URL("../../", import.meta.url));
  const workspace = path.join(root, "workspace"), app = path.join(workspace, "app");
  await fs.mkdir(app, { recursive: true });
  const write = async (name, value) => {
    const target = path.join(app, name);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, typeof value === "string" ? value : JSON.stringify(value, null, 2) + "\n");
  };
  const icon = '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect width="256" height="256" rx="56" fill="#187E73"/><path d="M64 130l42 42 86-92" fill="none" stroke="white" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  await write("AppScope/app.json5", { app: { bundleName: "com.verikit.experiment.todolist", vendor: "VeriKit", versionCode: 1000000, versionName: "1.0.0", icon: "$media:app_icon", label: "$string:app_name" } });
  await write("AppScope/resources/base/element/string.json", { string: [{ name: "app_name", value: "VeriKit Todo" }] });
  await write("AppScope/resources/base/media/app_icon.svg", icon);
  await write("build-profile.json5", { app: { signingConfigs: [], products: [{ name: "default", targetSdkVersion: "6.0.1(21)", compatibleSdkVersion: "6.0.1(21)", runtimeOS: "HarmonyOS" }], buildModeSet: [{ name: "debug" }, { name: "release" }] }, modules: [{ name: "entry", srcPath: "./entry", targets: [{ name: "default", applyToProducts: ["default"] }] }] });
  await write("oh-package.json5", { modelVersion: "6.0.1", name: "verikit-todolist-experiment", version: "1.0.0", dependencies: {} });
  await write("hvigorfile.ts", "import { appTasks } from '@ohos/hvigor-ohos-plugin';\nexport default { system: appTasks, plugins: [] };\n");
  await write("hvigor/hvigor-config.json5", { modelVersion: "6.0.1", dependencies: {}, execution: { daemon: false, parallel: false, incremental: false } });
  await write("entry/oh-package.json5", { name: "entry", version: "1.0.0", dependencies: {} });
  await write("entry/hvigorfile.ts", "import { hapTasks } from '@ohos/hvigor-ohos-plugin';\nexport default { system: hapTasks, plugins: [] };\n");
  await write("entry/build-profile.json5", { apiType: "stageMode", buildOption: {}, targets: [{ name: "default" }] });
  await write("entry/src/main/module.json5", { module: { name: "entry", type: "entry", description: "$string:module_desc", mainElement: "EntryAbility", deviceTypes: ["phone"], deliveryWithInstall: true, installationFree: false, pages: "$profile:main_pages", abilities: [{ name: "EntryAbility", srcEntry: "./ets/entryability/EntryAbility.ets", description: "$string:module_desc", icon: "$media:app_icon", label: "$string:app_name", startWindowIcon: "$media:app_icon", startWindowBackground: "$color:start_window_background", exported: true, skills: [{ entities: ["entity.system.home"], actions: ["ohos.want.action.home"] }] }] } });
  await write("entry/src/main/resources/base/element/string.json", { string: [{ name: "module_desc", value: "Isolated VeriKit TodoList experiment" }] });
  await write("entry/src/main/resources/base/element/color.json", { color: [{ name: "start_window_background", value: "#F6F8FA" }] });
  await write("entry/src/main/resources/base/profile/main_pages.json", { src: ["pages/Index"] });
  await write("entry/src/main/ets/entryability/EntryAbility.ets", "import { UIAbility } from '@kit.AbilityKit';\nimport { window } from '@kit.ArkUI';\nexport default class EntryAbility extends UIAbility {\n  onWindowStageCreate(stage: window.WindowStage): void { stage.loadContent('pages/Index'); }\n}\n");
  await write("entry/src/main/ets/pages/Index.ets", "@Entry\n@Component\nstruct Index { build() { Column() { Text('VeriKit Todo scaffold') } } }\n");
  await write("requirements.md", [
    "# 实验应用需求", "真实 HarmonyOS Stage ArkTS 应用，已有空工程及 EntryAbility，使用 SDK API 21。",
    "仅修改 app 目录，不修改 .plugins。新增、完成/恢复、删除、全部/未完成/已完成筛选、数量统计。",
    "拒绝纯空白标题；trim 后最多 80 个字符；支持中文及重复标题。ID 唯一稳定。",
    "使用 ArkData Preferences 真实存储，每次变更 put 后 await flush；恢复状态；保存失败显示错误。避免并发保存覆盖。",
    "单页面 UI，元素提供稳定 id: todo-input, add-button, filter-all, filter-active, filter-completed, todo-row-<id>, toggle-<id>, delete-<id>。",
    "使用独立纯逻辑文件 entry/src/main/ets/model/TodoModel.ets，不引入任何 SDK 或第三方模块，必须被实际 UI 使用。",
    "导出 interface TodoItem { id: string; title: string; completed: boolean }，export type TodoFilter = 'all' | 'active' | 'completed'。",
    "导出 class TodoModel，公开 items: TodoItem[]（初始空）。方法 add(title: string): boolean（非法返回 false，合法追加返回 true），toggle(id: string): void，remove(id: string): void，visible(filter: TodoFilter): TodoItem[]，serialize(): string，restore(json: string): void。",
    "restore 使用 serialize 的格式，恢复各条 ID 与状态，之后新增 ID 不碰撞。不要使用浏览器 DOM 或 localStorage。",
    "UI 用 ArkUI @State 触发刷新；读取 Preferences 前保持 loading，加载完可新增。业务文件最多四个 .ets 文件即可。",
    "不要增加通知、网络、账号；不要编辑构建配置或已有 EntryAbility。构建与验收由外部实验程序执行，不要声称已经测试。",
  ].join("\n") + "\n");
  const pluginRoot = await buildPlugin({ host: "openclaw", sourceRoot, outputRoot: path.join(workspace, ".plugins") });
  return { root, workspace, app, pluginRoot, templateSource: "self-contained synthetic scaffold, no other project code" };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  if (!process.argv[2]) throw new Error("Usage: todolist-fixture.mjs <new-experiment-root>");
  const root = path.resolve(process.argv[2]);
  if (await fs.access(path.join(root, "workspace/app")).then(() => true, () => false)) throw new Error("Refusing to replace an existing experiment app.");
  console.log(JSON.stringify(await prepareFixture(root)));
}
