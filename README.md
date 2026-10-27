# VeriKit — HarmonyOS Kit selection for LLM agents

[中文](#中文) · [English](#english)

---

# 中文

## 1. VeriKit 简介

VeriKit 是一个支持 Claude Code、CodeAgent 和 OpenClaw `2026.7.1-2` 的多宿主插件，在 agent 写代码之前，先帮开发者选好任务该用哪些 **HarmonyOS Kit** 和哪些 **参考文档**。它内置了完整的 100 Kit HarmonyOS SDK 目录，并提供：

- **确定性排序器**（BM25 + 人工编写的正负触发子句），对全部 100 个 Kit 打分，返回最相关的候选。
- **精选组合配方**，用于常见的多 Kit 特性（例如「带跳转的本地通知」→ `notification-kit + ability-kit + arkts`）。
- **冲突确认机制**：当排序器的首选 Kit 与配方不一致时，VeriKit 拒绝静默替换，而是请用户决定。
- **二级参考选择器**：对每个相关 Kit 的约 30 篇参考文档再次排序，给出最相关的 5 篇。

`skills/<kit>/references/` 下的 HarmonyOS SDK 文档来自 HarmonyOS 开发者公开文档，本仓库重新分发仅为方便 VeriKit Kit 选择排序器对其定位；以官方 HarmonyOS 开发者站点上的版本为准。详见 [`LICENSE`](./LICENSE)。

## 2. 安装

在 Claude Code 中：

```
/plugin marketplace add rshu/VeriKit
/plugin marketplace list                 # 应显示: verikit-local
/plugin install verikit@verikit-local
/plugin list                             # 应显示: verikit
```

如果没有自动重载，重启 Claude Code 即可。`runtime/` 和 `skills/` 已提交到仓库，开箱即用——无需克隆到本地或运行构建步骤。

### 多宿主构建

```sh
npm run build:plugins
```

一次生成三个独立安装包，共享原有的排序器、合约、组合配方和参考文档：

| 宿主 | 产物目录 | 插件清单 |
| --- | --- | --- |
| Claude Code | `dist/verikit-claude/` | `.claude-plugin/plugin.json` |
| CodeAgent | `dist/verikit-codeagent/` | `.cac-plugin/plugin.json` |
| OpenClaw 2026.7.1-2 | `dist/verikit-openclaw/` | `openclaw.plugin.json` |

无需安装构建依赖。`npm run build:plugin` 默认只生成 OpenClaw 包；也可使用
`npm run build:plugin -- --host claude`（或 `codeagent`、`openclaw`）指定宿主。
生成的目录可独立复制、安装；重建不会把其他宿主产物嵌套打包。
原仓库根目录仍可按上述方式直接安装到 Claude Code。
`dist/` 初始为空（不存在也可以），仅存放生成的安装包，可以随时清空后重新构建。
排序器、合约、参考索引和配方保存在 `runtime/`，构建不依赖已有 `dist/` 内容。

OpenClaw 使用原生 `before_prompt_build` 钩子和 `verikit_route` 工具，
通过原生文件读取工具加载参考文档。新会话默认关闭，可用 `/verikit-session on|off|status`
管理并持久化当前会话开关；`plugins.entries.verikit.config.defaultSession: true` 可让新会话默认开启。
修改默认值不改变已有会话的开关；`off` 后当前会话停止自动路由、提示注入、编辑看护和手动路由工具执行。
安装、MA 配置保留及工具权限说明见
[OpenClaw 适配说明](docs/openclaw.md)。运行 `npm test` 验证产物、路由和宿主接口；
检测到目标版本的本地 OpenClaw 时还会进行隔离的实际加载测试。

**MA 已通过原生 CLI 安装：最小配置方式。** 完全退出 MA 后，在 CMD
中补执行一次下面的命令即可，`%NODE%` 沿用安装时设置的 `node.exe` 路径：

```bat
"%NODE%" "%USERPROFILE%\.openclaw\extensions\verikit\scripts\configure-openclaw.mjs" --config "%USERPROFILE%\.openclaw\openclaw.json" --tool-agent main
```

助手会先备份配置，再登记加载路径、启用提示注入，并给 `main` Agent 追加工具授权，
保留其他配置。完成后再启动 MA，无需重新安装插件。

**首次安装也可使用统一入口**：完成构建并完全退出 MA 后执行：

```powershell
npm run install:ma -- --host-root "<MA安装目录>" --config "$env:USERPROFILE/.openclaw/openclaw.json"
```

该命令先调用 MA 内置 CLI 安装，再自动登记加载路径、提示注入和 `main` Agent 的工具授权。
已有安装需追加 `--force`；全部完成才报告成功。详见 [MA 安装步骤](docs/openclaw.md#ma-安装必做)。
兼容登记只需做一次；以后在同一路径更新可继续使用原生 `plugins install` / `plugins enable`。
仅在加载路径或授权被清理、插件目录移动时，才需要重新登记。

### 前置条件

- **Node ≥ 20** 在 `PATH` 中（Windows：`winget install OpenJS.NodeJS`，或使用 DevEco Studio 自带的 `node.exe`）。
- OpenClaw 产物沿用目标宿主更严格的 Node 版本要求，见 [OpenClaw 适配说明](docs/openclaw.md)。

## 3. 代表性示例

以下为预期交互示例。2026-10-18 续跑及此前真实 TodoList 实验结果与验收范围见
[实验报告](docs/experiments/harmonyos-todolist-status.md)，参考工程见 [TodoList 应用](examples/harmonyos-todolist/README.md)。
单插件真实 GLM 版本见 [2026-10-18 模型实验应用](examples/harmonyos-todolist-glm-20261018/README.md)；
[2026-10-17 版本](examples/harmonyos-todolist-glm/README.md)及其失败记录单独保留。
与 Runtime Corrector 同时启用的后续真实开发见[联合实验报告](docs/experiments/joint-harmonyos-20261018.md)
和[联合实验应用](examples/harmonyos-todolist-joint-20261018/README.md)，包含真实纠偏、漏报、网络故障及最终设备复验。

加入官方 OpenSpec Skills/CLI 的[三组件实验](docs/experiments/triple-harmonyos-20261018.md)已完成规范到真实鸿蒙应用的流程：任务 17/17、基础设备 12/12、扩展 4/4，并验证真实保存失败与恢复；原始偏离和接线失败均保留。

### 示例 (i)——端到端：从一句话到能跑的代码

在 Claude Code 里你输入一句普通需求：

> 帮我做一个待办事项 App，重启后还能读到之前保存的待办项。

UserPromptSubmit 钩子自动触发，跑完整的 VeriKit 排序器，并把 `<verikit-routing>` 块注入到 agent 上下文（用 `claude --debug` 可看到原始内容；以下为关键字段）：

```json
{
  "compositions": [{"id": "local-persistence", "skills": ["arkdata", "arkts"], "lifecycle": "validated"}],
  "routing": {"status": "agree", "top_in_recipe": true},
  "bundle": ["arkdata", "arkts"],
  "deep_references": {
    "arkdata": [
      {"path": "references/通过用户首选项实现数据持久化(ArkTS).md", "score": 0.48},
      {"path": "references/通过关系型数据库实现数据持久化(ArkTS).md", "score": 0.44}
    ],
    "arkts": ["..."]
  }
}
```

agent 读到该块后会先告诉你接下来要做什么：

> 这是单设备本地持久化场景。匹配到 `local-persistence` 配方（已验证），用：
> - **arkdata** 做存储——用 `@ohos.data.preferences` 把待办项序列化为 JSON 持久化；
> - **arkts** 组织异步存取代码。
>
> 你是否选择这个配方，还是希望指定其他 Kit？

你确认选择后，agent 调用 `Skill(verikit:arkdata)` 加载完整的 SKILL.md（含上面提到的参考链接），读完所选 Kit 的文档后生成 ArkTS 代码：

```typescript
import preferences from '@ohos.data.preferences';

export class TodoStore {
  private readonly storeName = 'todo_store';
  // ... agent 写出的 saveAll / loadAll 实现
}
```

**这就是 VeriKit 的核心价值：** 用户只写一句中文需求，agent 在动手写代码之前就拿到了对的 Kit、对的参考文档、（必要时）对的多 Kit 组合配方——不必在 100 个 Kit 里靠运气猜。

### 示例 (ii)——冲突：VeriKit 拒绝静默挑错 Kit

在 Claude Code 里你输入：

> 帮我做一个本地通知，任务到期时弹出提醒。

钩子触发后，注入的块显示排序器与配方不一致：

```json
{
  "top": [{"name": "ringtone-kit", "combinedScore": 0.514, "positiveHits": 4}, "..."],
  "compositions": [{"id": "notification-with-action", "skills": ["notification-kit", "ability-kit", "arkts"], "lifecycle": "validated"}],
  "routing": {
    "status": "conflict",
    "top_in_recipe": false,
    "directive": "CONFLICT: ... ask the user to choose one of: 1. recipe ..., 2. top-ranked Kit ringtone-kit, 3. specify own."
  },
  "bundle": ["ringtone-kit"],
  "bundle_source": "ask-human"
}
```

agent 不会静默挑——而是直接问你：

> 排序器的首选是 `ringtone-kit`（一个铃声相关的 Kit），但精选配方 `notification-with-action` 用 `notification-kit + ability-kit + arkts` 实现「带跳转的本地通知」。两边不一致。
>
> 你想用哪个？
> 1. 配方推荐 `[notification-kit, ability-kit, arkts]`——推荐（已验证的多 Kit 方案）；
> 2. 排序器的 `ringtone-kit`（单 Kit，但本任务大概率跑偏）；
> 3. 你自己指定 Kit。

你选 1。agent 加载 `notification-kit + ability-kit` 的 SKILL.md，参考其中的文档实现 `NotificationRequest.publish()` 和 `WantAgent`（点击通知的跳转目标）。

**这一机制存在的意义：** "通知" / "notification" 在 100 个 Kit 里被多个 Kit 用到（notification / ringtone / push / live-view / localization），BM25 单凭词无法区分。VeriKit 不静默替换，而是把模糊性暴露给用户——比让 agent 凭直觉猜可靠。

## 4. 许可

VeriKit 的排序器、CLI、钩子、合约编写、组合配方和构建脚本采用 MIT 协议。详见 [`LICENSE`](./LICENSE)。

---

# English

## 1. What VeriKit is

VeriKit is a multi-host plugin for Claude Code, CodeAgent, and OpenClaw `2026.7.1-2` that selects which **HarmonyOS Kit(s)** and **reference docs** to consult for a developer's task, before the agent writes any code. It ships the full 100-Kit HarmonyOS SDK catalog pre-indexed, with:

- A **deterministic ranker** (BM25 + authored positive/negative trigger clauses) that scores all 100 Kits against the task and returns the top candidates.
- **Curated composition recipes** for common multi-Kit features (e.g. "local notification with a tap action" → `notification-kit + ability-kit + arkts`).
- A **conflict-confirmation gate**: when the ranker's top Kit disagrees with the recipe, VeriKit refuses to silently substitute and asks the user to choose.
- A **second-stage reference selector** that ranks each relevant Kit's ~30 reference docs and surfaces the top 5 task-relevant ones.

The HarmonyOS SDK documentation under `skills/<kit>/references/` is sourced from the public HarmonyOS developer documentation and redistributed here as developer reference material; refer to the upstream HarmonyOS Developer site for authoritative versions. See [`LICENSE`](./LICENSE).

## 2. Setup

In your Claude Code session:

```
/plugin marketplace add rshu/VeriKit
/plugin marketplace list                 # should show: verikit-local
/plugin install verikit@verikit-local
/plugin list                             # should show: verikit
```

Restart Claude Code if it doesn't auto-reload. That's it — `runtime/` and `skills/` are committed in the repo, so the plugin works immediately, with no local clone or build step required.

### Build for multiple hosts

From a source checkout, run `npm run build:plugins` to generate independent packages in
`dist/verikit-claude/`, `dist/verikit-codeagent/`, and `dist/verikit-openclaw/`.
They share the committed ranker and complete catalog; no build dependencies are needed.
`npm run build:plugin` defaults to OpenClaw, or select a host with
`npm run build:plugin -- --host claude` (also `codeagent` or `openclaw`).
The source root remains directly installable as the existing Claude Code plugin.
`dist/` starts empty (or absent) and contains only generated packages. It can be deleted
and rebuilt at any time; committed build inputs live in `runtime/`.

OpenClaw uses native prompt hooks and the `verikit_route` tool. Sessions default to off;
`/verikit-session on|off|status` manages the persisted session setting.
New sessions default to off; set `plugins.entries.verikit.config.defaultSession: true`
to enable new sessions. Changing this default leaves existing sessions unchanged.
`off` stops automatic routing, prompt injection, edit monitoring, and manual routing in that session. See the
[OpenClaw guide](docs/openclaw.md) for installation, MA configuration,
and tool access. `npm test` checks artifacts, routing, and plugin interfaces,
including an isolated native loader test when the exact OpenClaw version is installed.

### Prerequisites

- **Node ≥ 20** on `PATH` (Windows: `winget install OpenJS.NodeJS`, or use the bundled `node.exe` from DevEco Studio).
- OpenClaw packages follow the target host's stricter Node requirements; see the [OpenClaw guide](docs/openclaw.md).

## 3. Walkthroughs

These illustrate the intended interaction. The [TodoList experiment report](docs/experiments/harmonyos-todolist-status.md)
records the actual results and validation scope; the [reference app](examples/harmonyos-todolist/README.md) is a separate local implementation.
The separate [2026-10-18 GLM app](examples/harmonyos-todolist-glm-20261018/README.md) passed compilation and all 11 emulator checks after model repairs. The [2026-10-17 version](examples/harmonyos-todolist-glm/README.md) and its initial failures are preserved separately.
The subsequent [joint experiment](docs/experiments/joint-harmonyos-20261018.md) with Runtime Corrector includes actual native correction, missed defects, a network failure, and final 12/12 emulator checks of its [own generated app](examples/harmonyos-todolist-joint-20261018/README.md).

The [three-component experiment](docs/experiments/triple-harmonyos-20261018.md) adds official OpenSpec Skills/CLI: 17/17 tasks, 12/12 baseline and 4/4 extra device checks, and a real save failure followed by recovery. It preserves the initial deviations and integration failures.

### Example (i) — End-to-end: from one sentence to working code

In Claude Code, you type a plain request:

> Build me a todo-list app that remembers entries across restarts.

The UserPromptSubmit hook fires, runs the full VeriKit router, and injects a `<verikit-routing>` block into the agent's context (run `claude --debug` to see it raw; salient fields below):

```json
{
  "compositions": [{"id": "local-persistence", "skills": ["arkdata", "arkts"], "lifecycle": "validated"}],
  "routing": {"status": "agree", "top_in_recipe": true},
  "bundle": ["arkdata", "arkts"],
  "deep_references": {
    "arkdata": [
      {"path": "references/通过用户首选项实现数据持久化(ArkTS).md", "score": 0.48},
      {"path": "references/通过关系型数据库实现数据持久化(ArkTS).md", "score": 0.44}
    ],
    "arkts": ["..."]
  }
}
```

Having read the block, the agent first tells you what it's going to do:

> This is single-device local persistence. Matched the validated `local-persistence` recipe; I'll use:
> - **arkdata** for storage — `@ohos.data.preferences` to persist todos serialized as JSON;
> - **arkts** for the async-IO code organization.
>
> Would you like to use this recipe, or specify different Kits?

After you confirm the selection, the agent calls `Skill(verikit:arkdata)` to load the full SKILL.md (which links the references above), reads the selected Kits' docs, and produces ArkTS code:

```typescript
import preferences from '@ohos.data.preferences';

export class TodoStore {
  private readonly storeName = 'todo_store';
  // ... agent's saveAll / loadAll implementation
}
```

**The value:** one sentence in, working code out — with the right Kits, the right reference docs, and (when needed) the right multi-Kit recipe selected *before* the agent writes anything, instead of guessing among 100 Kits.

### Example (ii) — Conflict: VeriKit refuses to silently pick the wrong Kit

In Claude Code, you type:

> Send me a local notification when a todo is due.

After the hook fires, the injected block shows ranker-vs-recipe disagreement:

```json
{
  "top": [{"name": "ringtone-kit", "combinedScore": 0.514, "positiveHits": 4}, "..."],
  "compositions": [{"id": "notification-with-action", "skills": ["notification-kit", "ability-kit", "arkts"], "lifecycle": "validated"}],
  "routing": {
    "status": "conflict",
    "top_in_recipe": false,
    "directive": "CONFLICT: ... ask the user to choose one of: 1. recipe ..., 2. top-ranked Kit ringtone-kit, 3. specify own."
  },
  "bundle": ["ringtone-kit"],
  "bundle_source": "ask-human"
}
```

The agent doesn't silently pick — it asks you directly:

> The ranker's top pick is `ringtone-kit` (a ringtone-related Kit), but the curated recipe `notification-with-action` uses `notification-kit + ability-kit + arkts` for "local notification with a tap action." They disagree.
>
> Which do you want?
> 1. Recipe bundle `[notification-kit, ability-kit, arkts]` — recommended (validated multi-Kit solution);
> 2. Ranker's `ringtone-kit` (single-Kit, but likely off-task here);
> 3. Specify your own.

You pick (1). The agent loads the `notification-kit + ability-kit` SKILL.mds and implements `NotificationRequest.publish()` plus a `WantAgent` for the tap action.

**Why this matters:** "notification" / `通知` is shared vocabulary across several Kits (notification / ringtone / push / live-view / localization), and BM25 alone can't disambiguate them. VeriKit doesn't silently swap; it surfaces the ambiguity to you — more reliable than letting the agent guess.

## 4. License

MIT for the VeriKit ranker, CLI, hooks, contract authoring, composition recipes, and build scripts. See [`LICENSE`](./LICENSE).
