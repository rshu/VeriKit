# VeriKit for OpenClaw 2026.7.1-2

此包使用 OpenClaw 原生插件接口，在 `before_prompt_build` 中运行 VeriKit 排序器，
为 HarmonyOS 开发任务提供 Kit 候选、组合配方和参考文档。非相关请求静默通过；
路由故障或超时也不会阻塞宿主。`verikit_route` 工具可以手动重跑路由。
选择流程同时通过宿主的 `appendSystemContext` 提供系统级指导，要求未确认 Kit 时
只展示选项并等待，已有选择则继续。它是模型指导，不是阻止编辑的权限检查。

与 Runtime Corrector 同时启用时，RC 的独立内部评审会话不执行自动 Kit 路由或
编辑监测，避免把评审请求当作新的开发任务。RC 在原业务会话中发起的修复仍正常
获得 VeriKit 指导；手动 `verikit_route` 工具的权限保持由宿主控制。

支持的宿主版本固定为 **2026.7.1-2**；运行时会拒绝其他版本。
Node 版本要求沿用该宿主：`>=22.22.3 <23 || >=24.15.0 <25 || >=25.9.0`。
包内已有完整运行文件和文档，安装后无需下载依赖或编译 TypeScript。

## 构建和安装

在 VeriKit 源码目录执行：

```sh
npm run build:plugins
# 或仅构建目标宿主
npm run build:plugin -- --host openclaw
```

生成 `dist/verikit-openclaw/`。Claude Code 和 CodeAgent 的独立产物分别是
`dist/verikit-claude/`、`dist/verikit-codeagent/`。
`dist/` 仅存放生成的安装包，可以从空目录开始构建，也可以整体清空后重建。
构建输入保存在源码的 `runtime/`；生成的独立安装包内部布局保持不变。

普通 OpenClaw 使用其 CLI 安装生成的目录（路径换成你的实际路径）；
MA 请使用下一节的统一安装入口：

```sh
openclaw plugins install /absolute/path/to/VeriKit/dist/verikit-openclaw
```

或将完整目录复制到当前 OpenClaw profile 的 `extensions/verikit`，并按下面配置
显式加入 `plugins.load.paths`。移动插件后需要同步更新该路径。

### MA 安装（必做）

MA `1.8.160` 启动时不扫描标准的 `~/.openclaw/extensions`，会把未登记加载路径的
VeriKit 从 `plugins.allow` 和 `plugins.entries` 删除。**首次安装或缺少登记时，推荐
使用下面的统一入口，一次完成原生安装和配置登记。**

完全退出 MA，在本仓库完成构建后执行（将 MA 路径换成实际位置）：

PowerShell：

```powershell
npm run install:ma -- --host-root "<MA安装目录>" --config "$env:USERPROFILE/.openclaw/openclaw.json"
```

命令提示符（CMD）：

```bat
npm run install:ma -- --host-root "<MA安装目录>" --config "%USERPROFILE%/.openclaw/openclaw.json"
```

直接运行原生 `plugins install` 不会调用此入口。其 `Installed plugin` 只表示原生安装完成，
不包含 MA 所需的配置登记；统一入口最后还会输出 `VeriKit installed and registered for MA`。
登记成功后，只要已安装目录不变且相关配置仍保留，后续更新可继续使用原生
`plugins install --force` 和 `plugins enable verikit`，无需每次重跑统一入口。

已有安装需追加 `--force`。命令调用 MA 内置 OpenClaw `2026.7.1-2` CLI 安装，
随后复用配置助手，登记已安装插件的绝对加载路径、启用设置、提示注入和
现有 `main` Agent 的 `verikit_route` 工具授权。安装失败时停止；登记失败时返回错误，
只有两步均完成才报告成功。原有配置、其他 Agent 和拒绝规则保留，登记前自动备份。
其他助手可传 `--tool-agent <实际 Agent ID>`；安装使用的状态目录固定为 `--config` 的父目录，
安装和登记始终使用同一 profile。成功后再启动 MA。

独立安装包也包含同一入口，无需保留源码仓库：

```powershell
node /absolute/path/to/verikit-openclaw/scripts/install-ma.mjs --host-root "<MA安装目录>" --config "$env:USERPROFILE/.openclaw/openclaw.json"
```

已安装但配置被清理时，可直接运行已安装包的配置助手修复，无需重新安装：

```powershell
node "$env:USERPROFILE/.openclaw/extensions/verikit/scripts/configure-openclaw.mjs" --config "$env:USERPROFILE/.openclaw/openclaw.json" --tool-agent main
```

卸载请使用宿主原生的 `plugins uninstall verikit`，让宿主同步清理配置。
直接删除已安装目录会留下失效的 `plugins.load.paths`，使安装和卸载都在配置校验时被拦截。
如果已经手动删除，可先将构建包恢复到原安装目录，让原生卸载或重装命令恢复可用。

## OpenClaw / MA 配置

参考适配仓库 `runtime-corrector-toy` 的 `codex/ma-plugin-compatibility`
分支，阅读基线为 `e136761395ef295b8218d6a3eddeb5cdb05eb610`，并参考其
`a9e07ff` 的 MA 配置修复：MA 启动清理要求 `openclaw.plugin.json.main`
指向存在的入口，并保留 `plugins.load.paths` 中的插件。此包同时声明匹配的
`main` 和 `package.json.openclaw.extensions`。

在实际宿主使用的 `openclaw.json` 合并如下配置，保留其他插件和现有设置：

```json
{
  "plugins": {
    "allow": ["verikit"],
    "load": { "paths": ["/absolute/path/to/installed/verikit"] },
    "entries": {
      "verikit": {
        "enabled": true,
        "hooks": { "allowPromptInjection": true },
        "config": { "enabled": true, "monitorEdits": true }
      }
    }
  }
}
```

`verikit_route` 是可选工具。需要手动调用时，在相应 agent 的
`tools.alsoAllow` 中追加 `verikit_route`。**MA 会在启动时覆盖全局 `tools.alsoAllow`，
必须使用 Agent 级配置**，推荐通过上述 `--tool-agent main` 完成。
普通 OpenClaw 也可配置全局列表。保留已有列表和 `deny` 规则；agent 自己的
`alsoAllow` 会替代全局列表，应继承原列表后追加。

包内提供配置助手，可对**明确指定**的配置文件执行以上合并。它保留其他设置，
创建原文件备份，原子替换，并支持重复执行。原插件白名单缺省或为空时保持
开放策略；已有非空白名单时才追加 VeriKit，避免关闭其他原本启用的插件：

```sh
node /absolute/path/to/installed/verikit/scripts/configure-openclaw.mjs \
  --config /absolute/path/to/active-profile/openclaw.json \
  --tool-agent main
```

`--tool-agent` 必须对应 `agents.list` 中已有的 agent；省略它则只启用插件和
提示注入，工具权限按上述方式手动配置。助手只接受标准 JSON 配置；JSON5
配置请手动合并。构建和测试不会改动正在使用的宿主配置。完成后重启宿主，
通过 `openclaw plugins inspect verikit --runtime --json` 检查注册情况。

## 行为和限制

- 自动路由与其他宿主使用同一份已打包排序器、100 个 Kit 合约及组合配方。
  原始目录共有 101 个技能条目；额外的 `verikit-route` 宿主技能独立存放，
  不参与 Kit 打分，不改变原始候选排序。
  自动注入要求配方、明确平台/Kit 名，或同时命中触发词与开发意图，
  避免“城市名称”等日常词误触发；手动工具仍返回原始排序结果。
  宿主适配调用固定使用包内技能、合约、参考索引和配方，不受其他项目遗留的
  `VERIKIT_*` 目录覆盖影响。独立 CLI 仍支持这些覆盖变量。
- HarmonyOS 任务提示先展示候选供用户选择，已有选择会被保留；冲突时遵循
  `routing.directive`，不得静默替换 Kit。之后通过原生 `read` 工具读取
  安装目录内对应的 `SKILL.md` 和参考文档，再实现功能。
  系统指导按 Kit 分别列出两项检查：成功读取入口说明、成功读取至少一篇
  任务相关参考；语言和辅助 Kit 同样适用。`read_plan` 提供绝对路径及
  `skill_reads` 的连续分段（每段至多 100 行、通常不超过 32 KiB），避免
  长入口说明受宿主单次 50 KiB 上限截断。参考只读任务所需内容，不遍历
  全部候选。清单是导航信息，不代表用户选择或已经读取。
  `task_reference_hints` 补充配方中的职责导航：例如 local-persistence
  使用 ArkTS Promise/async-await 包装异步存储。长提示把明确提到的配方
  挤出前三名时仍可提供该导航，不把配方名当作用户已批准 Kit 的证明。
  原始 `top`、`compositions` 和 `deep_references` 排名保持不变。
- `before_tool_call` 保留原插件的日志监测语义：仅记录未提及 Kit 的 SDK
  `.ets` 编辑，写入 `~/.verikit/gate.log`（可用 `VK_LOG_DIR` 指定目录）。
  它不阻止编辑，也不把“提及 Kit”当作用户已确认选择的证明。
  支持原生 `write`、`edit` 和 `apply_patch`；补丁按文件检查新增内容，
  删除和非 `.ets` 文件不触发记录。
  监测使用宿主 session API 解析当前会话，优先使用 `spawnedCwd`、
  `spawnedWorkspaceDir`，普通会话通过原生 agent API 解析工作目录。
  不保存跨会话状态。
- `config.monitorEdits: false` 关闭日志监测；`config.enabled: false` 关闭
  插件注册的自动路由、日志监测及工具。宿主的 `allowPromptInjection: false`
  会阻止自动提示注入，手动工具仍受宿主工具权限控制。
- OpenClaw 包不包含 Claude/CodeAgent 的清单、命令钩子或 Shell 包装器。
  自动路由最多处理 4000 个 Unicode 码点，排序进程上限 15 秒，故障静默通过。

## 验证记录（2026-10-18）

macOS、Node `26.0.0`、本地 OpenClaw `2026.7.1-2`：提交前 `npm test` 的 15 项测试
全部通过，无跳过。测试覆盖三宿主产物隔离及排序一致性、实际命令钩子、
冲突结果、Unicode 截断、超时、日志监测、配置备份与重复执行。

真实 OpenClaw 加载器在临时配置与状态目录中成功注册插件，调用原生提示钩子、
解析可选工具权限，并读取返回的全部参考路径。宿主禁止提示注入和拒绝工具时，
对应限制生效。另有真实宿主 SDK 对照实验 16/16 通过，覆盖实际会话日志、
原生补丁、关闭开关和 15 秒超时；这部分不调用模型服务。
提交前审查另覆盖开放插件策略下的真实双插件加载、外部目录环境污染及普通/
子会话日志路径。此前模型实验的路由结果和系统指导与修复后逐项一致。
TodoList 真实 GLM 完整流程为 18/18。首次代码工具调用前，两个所选 Kit 的
完整入口说明、Preferences 参考和 ArkTS Promise/async-await 参考已成功返回；
原生 transcript、toolCallId、时间顺序及逐段内容哈希均已核对。
此前漏读、片段读取、无关 FAQ 和过量阅读的试验单独保留，未算作完整文档通过。
提示仍是模型指导，一次场景通过不能保证所有模型和任务的行为。详细记录保存在源码仓库的
`docs/experiments/harmonyos-todolist-status.md`。
上述 2026-10-18 记录未覆盖 MA 桌面界面与 Windows 宿主。
`VERIKIT_OPENCLAW_HOST_ROOT` 可指定目标版本的 OpenClaw 安装目录；未检测到时，
真实 OpenClaw 加载测试会跳过。

MA 启动回归可通过 `VERIKIT_MA_HOST_ROOT` 指定 MA 安装目录后运行 `npm test`。
测试读取 `app.asar` 中的真实配置清理和默认值函数，在临时配置上复现删除，
再从独立安装包执行统一入口，调用真实 MA CLI 安装并登记，检查连续两轮启动
保留插件、Agent 工具授权和拒绝规则。
此测试不启动 MA 界面，也不修改正式配置；未指定 MA 目录时跳过。
2026-10-20 在 Windows、Node `24.16.0`、MA `1.8.160` / OpenClaw `2026.7.1-2`
上指定两个宿主目录运行，19 项测试全部通过、无跳过，包含无 `dist` 输入时的源码
CLI/钩子、统一安装入口的真实 MA CLI 安装与启动清理回归、失败中止检查及真实
OpenClaw 加载。另已从空 `dist/` 实际执行 `npm run build:plugins`，三个宿主均构建成功。
MA 桌面界面的完整重启流程尚未实测。

接口实现以目标版本已安装代码为准；在线接口说明可参阅
[OpenClaw 提示与会话钩子](https://docs.openclaw.ai/plugins/hooks/prompt-and-session)。
