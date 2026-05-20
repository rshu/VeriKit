# VeriKit — HarmonyOS Kit selection for LLM agents

[中文](#中文) · [English](#english)

---

# 中文

## 1. VeriKit 简介

VeriKit 是一个 Claude Code 插件，在 agent 写代码之前，先帮开发者选好任务该用哪些 **HarmonyOS Kit** 和哪些 **参考文档**。它内置了完整的 100 Kit HarmonyOS SDK 目录，并提供：

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

如果没有自动重载，重启 Claude Code 即可。`dist/` 和 `skills/` 已提交到仓库，开箱即用——无需克隆到本地或运行构建步骤。

### 前置条件

- **Node ≥ 20** 在 `PATH` 中（Windows：`winget install OpenJS.NodeJS`，或使用 DevEco Studio 自带的 `node.exe`）。

## 3. 三种使用入口

### a) 斜杠命令 `/verikit-route`（最直观）

Claude 运行排序器并直接把结果总结给你：

```
/verikit-route 保存待办事项让应用重启后还能读出来
```

Claude 会回复：该用哪个 Kit，哪个配方（若有）适用，先读哪些参考文档。

### b) 自动 UserPromptSubmit 钩子

每次你给 Claude Code 发消息时，这个钩子会自动运行完整的 VeriKit 排序器（与 `/verikit-route` 输出相同），并以 `<verikit-routing>` 块的形式将结果注入到 agent 的上下文中——agent 据此挑选 Kit、读参考文档，你无需手动调用。

该块默认不显示在终端上。若想自己也看到注入的内容，用 `--debug` 启动 Claude Code：

```bash
claude --debug
```

### c) 直接调用 CLI

用于脚本化、批量测试，或不通过 Claude Code 直接查看排序结果（例如在 CI 中验证某个新任务的 Kit 选择是否符合预期）：

```bash
node <plugin>/dist/verikit-cli.js route \
  --task "你的任务描述" \
  --top 5 --compose --deep --refs 5
```

上面这串 `--top 5 --compose --deep --refs 5` 就是斜杠命令和钩子默认使用的完整策略，逐个参数的作用：

- `--top N`——返回排序器打分最高的前 N 个候选 Kit。
- `--compose`——额外返回匹配的多 Kit 组合配方，并运行冲突确认检测器（详见示例 ii）。
- `--deep --refs K`——对每个相关 Kit 的约 30 篇参考文档进行二级排序，返回前 K 篇最相关的（agent 据此知道先读哪些文档）。

## 4. 三个代表性示例

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
> 我先读 `arkdata` 列出的两篇核心参考，然后开始实现。

随后 agent 自主调用 `Skill(verikit:arkdata)` 加载完整的 SKILL.md（含上面提到的参考链接），读完后直接生成 ArkTS 代码：

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

### 示例 (iii)——使用自定义目录（进阶）

如果你有自己的 SDK 和对应的技能目录（分叉、企业内部产品、追加的供应商 SDK），可以让 VeriKit 跑在你的目录上而不必改源码——同一套排序器、冲突检测器和二级参考逻辑会照常工作：

```bash
export VERIKIT_SKILL_ROOT=/path/to/your/skills      # 含 <skill>/SKILL.md
export VERIKIT_CONTRACTS_DIR=/path/to/contracts     # JSON 边车合约
node <plugin>/dist/verikit-cli.js route --task "你的任务描述" --top 5
```

完整环境变量清单：`VERIKIT_SKILL_ROOT`、`VERIKIT_CONTRACTS_DIR`、`VERIKIT_MANIFESTS_DIR`、`VERIKIT_COMPOSITIONS_FILE`——详见 `bin/verikit-cli.ts`（仓库内已含 TS 源码以便审计）。

## 5. 许可

VeriKit 的排序器、CLI、钩子、斜杠命令、合约编写、组合配方和构建脚本采用 MIT 协议。详见 [`LICENSE`](./LICENSE)。

---

# English

## 1. What VeriKit is

VeriKit is a Claude Code plugin that selects which **HarmonyOS Kit(s)** and **reference docs** to consult for a developer's task, before the agent writes any code. It ships the full 100-Kit HarmonyOS SDK catalog pre-indexed, with:

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

Restart Claude Code if it doesn't auto-reload. That's it — `dist/` and `skills/` are committed in the repo, so the plugin works immediately, with no local clone or build step required.

### Prerequisites

- **Node ≥ 20** on `PATH` (Windows: `winget install OpenJS.NodeJS`, or use the bundled `node.exe` from DevEco Studio).

## 3. Usage — three entry points

### a) The `/verikit-route` slash command (most visible)

Claude runs the router and summarizes the selection back to you:

```
/verikit-route 保存待办事项让应用重启后还能读出来
```

Claude replies with: which Kit to load, which recipe (if any) governs, and which reference docs to read first.

### b) The automatic UserPromptSubmit hook

Fires on every message you send to Claude Code. Runs the full VeriKit router (same payload as `/verikit-route`) and injects the result as a `<verikit-routing>` block into the agent's context — the agent uses it to pick the right Kit and reference docs without you typing anything.

The block isn't echoed in the terminal by default. To see it yourself, start Claude Code with `--debug`:

```bash
claude --debug
```

### c) The raw CLI

For scripting, batch testing, or inspecting the ranker's output outside Claude Code (e.g. in CI, verifying that a new task selects the expected Kit):

```bash
node <plugin>/dist/verikit-cli.js route \
  --task "your task description" \
  --top 5 --compose --deep --refs 5
```

That `--top 5 --compose --deep --refs 5` combination is the full default the slash command and hook also run. Each flag in turn:

- `--top N` — return the N highest-scoring Kit candidates.
- `--compose` — additionally return matched multi-Kit recipes and run the conflict-confirmation detector (see Example ii).
- `--deep --refs K` — second-stage rank each relevant Kit's ~30 reference docs and return the top K (so the agent knows which docs to read first).

## 4. Three representative walkthroughs

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
> I'll read the two key references arkdata suggests, then start implementing.

The agent then autonomously calls `Skill(verikit:arkdata)` to load the full SKILL.md (which links the references above), reads them, and produces ArkTS code:

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

### Example (iii) — Bring your own catalog (advanced)

If you have your own SDK and its own skill catalog (a fork, an internal product, an additional vendor SDK), VeriKit's ranker / conflict detector / two-stage reference logic can run against it without source changes — just point at two directories:

```bash
export VERIKIT_SKILL_ROOT=/path/to/your/skills      # contains <skill>/SKILL.md
export VERIKIT_CONTRACTS_DIR=/path/to/contracts     # JSON sidecar contracts
node <plugin>/dist/verikit-cli.js route --task "your task description" --top 5
```

Full env-var list: `VERIKIT_SKILL_ROOT`, `VERIKIT_CONTRACTS_DIR`, `VERIKIT_MANIFESTS_DIR`, `VERIKIT_COMPOSITIONS_FILE` — see `bin/verikit-cli.ts` (TS source included in the repo for audit).

## 5. License

MIT for the VeriKit ranker, CLI, hooks, slash command, contract authoring, composition recipes, and build scripts. See [`LICENSE`](./LICENSE).
