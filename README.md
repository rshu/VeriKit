# VeriKit — HarmonyOS Kit selection for LLM agents

[English](#english) · [中文](#中文)

---

# English

## 1. What VeriKit is

VeriKit is a Claude Code plugin that selects which **HarmonyOS Kit(s)** and **reference docs** to consult for a developer's task, before the agent writes any code. It ships the full 100-Kit HarmonyOS SDK catalog pre-indexed, with:

- A **deterministic ranker** (BM25 + authored positive/negative trigger clauses) that scores all 100 Kits against the task and returns the top candidates.
- **Curated composition recipes** for common multi-Kit features (e.g. "local notification with a tap action" → `notification-kit + ability-kit + arkts`).
- A **conflict-confirmation gate**: when the ranker's top Kit disagrees with the recipe, VeriKit refuses to silently substitute and asks the human to choose.
- A **second-stage reference selector** that ranks each relevant Kit's ~30 reference docs and surfaces the top 5 task-relevant ones.

The HarmonyOS SDK documentation under `skills/<kit>/references/` is © Huawei Device Co., Ltd. — see [`ATTRIBUTION.md`](./ATTRIBUTION.md).

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
- On Windows, the UserPromptSubmit hook runs through `hooks/run-hook.cmd` (a polyglot bash/batch wrapper). If the hook silently does nothing, fall back to the `/verikit-route` slash command.

### Verify it works

Expected behaviour after install: opening Claude Code prints these lines to stderr on first plugin load:

```
verikit: discovered 101 skill(s) under <plugin-path>
verikit: loaded 100/100 sidecar contract(s) from <plugin-path>/dist/contracts
```

The `101 / 100/100` numbers are 100 Kits + a navigation meta-index (`harmonyos-sdk-skill`).

## 3. Usage — three entry points

### a) The `/verikit-route` slash command (most visible)

Claude runs the router and summarizes the selection back to you:

```
/verikit-route 保存待办事项让应用重启后还能读出来
```

Claude replies with: which Kit to load, which recipe (if any) governs, and which reference docs to read first.

### b) The automatic UserPromptSubmit hook

Runs on every prompt; the result is injected into the agent's context as a `<verikit-routing>` block. To see the block, start Claude Code with `--debug`:

```bash
claude --debug
```

Without `--debug`, the block is still injected — just not echoed to you.

### c) The raw CLI

For scripting and verification:

```bash
node <plugin>/dist/verikit-cli.js route \
  --task "your task description" \
  --top 5 --compose --deep --refs 5
```

Flags:
- `--top N` — return up to N ranked Kits.
- `--compose` — also return matched curated recipe bundles and run the conflict-confirmation detector.
- `--deep --refs K` — for every relevant Kit, also rank its reference docs and return the top K.

`--top 5 --compose --deep --refs 5` is the full default the slash command and hook run.

## 4. Examples (four worked end-to-end)

### Example (i) — Clean single-Kit (Chinese task)

**Task:** `保存待办事项让应用重启后还能读出来` ("save todos so the app can read them back after restart")

**Invocation:** `route --task "保存待办事项让应用重启后还能读出来" --top 3`

**What you get (salient fields):**

```json
{
  "top": [
    {"name": "arkdata", "combinedScore": 0.527, "triggerScore": 0.054, "bm25Score": 1, "positiveHits": 2},
    {"name": "form-kit", "combinedScore": 0.304},
    {"name": "asset-store-kit", "combinedScore": 0.202}
  ]
}
```

**Read:** `arkdata` wins decisively — both BM25 (perfect lexical match) and two distinctive trigger clauses fired (`"实现本地离线数据持久化"`, `"同步待办事项"`). Use `arkdata` for the persistence work.

### Example (ii) — Multi-Kit feature, recipe agrees (`--compose --deep`)

**Task:** same as (i).

**Invocation:** `route --task "保存待办事项让应用重启后还能读出来" --top 5 --compose --deep --refs 5`

**What you get (salient fields):**

```json
{
  "top": [{"name": "arkdata"}, "..."],
  "compositions": [{"id": "local-persistence", "skills": ["arkdata", "arkts"], "score": 1, "lifecycle": "validated"}],
  "routing": {"status": "agree", "top_in_recipe": true},
  "bundle": ["arkdata", "arkts"],
  "bundle_source": "recipe",
  "deep_references": {"arkdata": "[5 docs]", "arkts": "[5 docs]"}
}
```

**Read:** `arkdata` is the top Kit AND it is in the `local-persistence` recipe — so the conflict detector emits `routing.status: "agree"` and the bundle is the full recipe `[arkdata, arkts]` with the top 5 reference docs per Kit. Read those refs, then implement. This is the full payload the UserPromptSubmit hook injects on every prompt.

### Example (iii) — Multi-Kit feature, **conflict** (English task)

**Task:** `send a local notification when a task is due`

**Invocation:** `route --task "send a local notification when a task is due" --compose --top 3`

**What you get (salient fields):**

```json
{
  "top": [{"name": "ringtone-kit", "combinedScore": 0.514, "positiveHits": 4}, "..."],
  "compositions": [{"id": "notification-with-action", "skills": ["notification-kit", "ability-kit", "arkts"], "score": 1, "lifecycle": "validated"}],
  "routing": {
    "status": "conflict",
    "top_in_recipe": false,
    "directive": "CONFLICT: the curated recipe and the top-ranked Kit disagree. Do NOT silently pick. Ask the human to choose one of: ..."
  },
  "bundle": ["ringtone-kit"],
  "bundle_source": "ask-human"
}
```

**Read:** the ranker picked `ringtone-kit` (the words `通知` / "notification" are shared across notification-kit / ringtone-kit / push-kit, and BM25 cannot separate them). But the curated recipe says use `notification-kit + ability-kit + arkts`. VeriKit refuses to silently substitute — it sets `bundle_source: "ask-human"` and emits a directive instructing the agent to ask you which to use. This is the conflict-confirmation gate; it exists precisely because silent recipe substitution is wrong on a documented fraction of this shape of task.

### Example (iv) — Bring your own catalog (advanced)

VeriKit defaults to the bundled HarmonyOS 100-Kit catalog. To point at a different one (a fork, a custom skill set, an additional product SDK):

```bash
export VERIKIT_SKILL_ROOT=/path/to/your/skills      # contains <skill>/SKILL.md
export VERIKIT_CONTRACTS_DIR=/path/to/contracts     # JSON sidecar contracts
node <plugin>/dist/verikit-cli.js route --task "..." --top 5
```

The same ranker / conflict detector / two-level reference logic runs against your catalog. See `bin/verikit-cli.ts` (the TS source is included in the repo for transparency) for the full list of env vars: `VERIKIT_SKILL_ROOT`, `VERIKIT_CONTRACTS_DIR`, `VERIKIT_MANIFESTS_DIR`, `VERIKIT_COMPOSITIONS_FILE`.

## 5. License, attribution, links

- **License:** MIT for the VeriKit ranker, CLI, hooks, slash command, contract authoring, composition recipes, and build scripts. See [`LICENSE`](./LICENSE).
- **Attribution:** The HarmonyOS SDK documentation under `skills/<kit>/references/` is © Huawei Device Co., Ltd., redistributed here as developer reference material. See [`ATTRIBUTION.md`](./ATTRIBUTION.md).
- **Issues / PRs:** [`github.com/rshu/VeriKit`](https://github.com/rshu/VeriKit).

---

# 中文

## 1. VeriKit 简介

VeriKit 是一个 Claude Code 插件，在代理写代码之前，先帮开发者选好任务该用哪些 **HarmonyOS Kit** 和哪些 **参考文档**。它内置了完整的 100 Kit HarmonyOS SDK 目录，并提供：

- **确定性排序器**（BM25 + 人工编写的正负触发子句），对全部 100 个 Kit 打分，返回最相关的候选。
- **精选组合配方**，用于常见的多 Kit 特性（例如「带跳转的本地通知」→ `notification-kit + ability-kit + arkts`）。
- **冲突确认机制**：当排序器的首选 Kit 与配方不一致时，VeriKit 拒绝静默替换，而是请人类决定。
- **二级参考选择器**：对每个相关 Kit 的约 30 篇参考文档再次排序，给出最相关的 5 篇。

`skills/<kit>/references/` 下的 HarmonyOS SDK 文档 © 华为终端有限公司——详见 [`ATTRIBUTION.md`](./ATTRIBUTION.md)。

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
- Windows 上 UserPromptSubmit 钩子通过 `hooks/run-hook.cmd`（bash/批处理双语包装器）运行。若钩子无响应，请改用 `/verikit-route` 斜杠命令兜底。

### 验证安装

首次加载插件时，Claude Code 会在 stderr 打印：

```
verikit: discovered 101 skill(s) under <plugin-path>
verikit: loaded 100/100 sidecar contract(s) from <plugin-path>/dist/contracts
```

`101 / 100/100` 中 101 = 100 个 Kit + 1 个导航元索引（`harmonyos-sdk-skill`）。

## 3. 三种使用入口

### a) 斜杠命令 `/verikit-route`（最直观）

Claude 运行排序器并直接把结果总结给你：

```
/verikit-route 保存待办事项让应用重启后还能读出来
```

Claude 会回复：该用哪个 Kit，哪个配方（若有）适用，先读哪些参考文档。

### b) 自动 UserPromptSubmit 钩子

每次提示都会运行，结果以 `<verikit-routing>` 块的形式注入到代理上下文。想看到内容，用 `--debug` 启动 Claude Code：

```bash
claude --debug
```

不加 `--debug` 时，该块依然注入，只是不会回显给你。

### c) 直接调用 CLI

适合脚本化和验证：

```bash
node <plugin>/dist/verikit-cli.js route \
  --task "你的任务描述" \
  --top 5 --compose --deep --refs 5
```

参数：
- `--top N`——返回前 N 个候选 Kit。
- `--compose`——同时返回匹配的配方，并运行冲突确认检测器。
- `--deep --refs K`——为每个相关 Kit 再对参考文档排序，返回前 K 篇。

`--top 5 --compose --deep --refs 5` 是斜杠命令与钩子默认使用的完整策略。

## 4. 四个完整示例

### 示例 (i)——单 Kit 直击（中文任务）

**任务：** `保存待办事项让应用重启后还能读出来`

**调用：** `route --task "保存待办事项让应用重启后还能读出来" --top 3`

**输出（关键字段）：**

```json
{
  "top": [
    {"name": "arkdata", "combinedScore": 0.527, "triggerScore": 0.054, "bm25Score": 1, "positiveHits": 2},
    {"name": "form-kit", "combinedScore": 0.304},
    {"name": "asset-store-kit", "combinedScore": 0.202}
  ]
}
```

**解读：** `arkdata` 完胜——BM25 完全匹配，并命中两条独特的正触发子句（`"实现本地离线数据持久化"`、`"同步待办事项"`）。直接用 `arkdata` 实现持久化即可。

### 示例 (ii)——多 Kit 特性，配方一致（`--compose --deep`）

**任务：** 同 (i)。

**调用：** `route --task "保存待办事项让应用重启后还能读出来" --top 5 --compose --deep --refs 5`

**输出（关键字段）：**

```json
{
  "top": [{"name": "arkdata"}, "..."],
  "compositions": [{"id": "local-persistence", "skills": ["arkdata", "arkts"], "score": 1, "lifecycle": "validated"}],
  "routing": {"status": "agree", "top_in_recipe": true},
  "bundle": ["arkdata", "arkts"],
  "bundle_source": "recipe",
  "deep_references": {"arkdata": "[5 篇文档]", "arkts": "[5 篇文档]"}
}
```

**解读：** `arkdata` 既是首选 Kit，又出现在 `local-persistence` 配方中——冲突检测器返回 `routing.status: "agree"`，bundle 为完整配方 `[arkdata, arkts]`，每个 Kit 附 5 篇参考。读完参考再实现即可。这就是 UserPromptSubmit 钩子每轮注入的完整载荷。

### 示例 (iii)——多 Kit 特性，**冲突**（英文任务）

**任务：** `send a local notification when a task is due`

**调用：** `route --task "send a local notification when a task is due" --compose --top 3`

**输出（关键字段）：**

```json
{
  "top": [{"name": "ringtone-kit", "combinedScore": 0.514, "positiveHits": 4}, "..."],
  "compositions": [{"id": "notification-with-action", "skills": ["notification-kit", "ability-kit", "arkts"], "score": 1, "lifecycle": "validated"}],
  "routing": {
    "status": "conflict",
    "top_in_recipe": false,
    "directive": "CONFLICT: the curated recipe and the top-ranked Kit disagree. Do NOT silently pick. Ask the human to choose one of: ..."
  },
  "bundle": ["ringtone-kit"],
  "bundle_source": "ask-human"
}
```

**解读：** 排序器选了 `ringtone-kit`（`通知` / "notification" 在 notification-kit / ringtone-kit / push-kit 之间共享，BM25 无法区分），但配方建议用 `notification-kit + ability-kit + arkts`。VeriKit 拒绝静默替换——将 `bundle_source` 设为 `"ask-human"` 并发出 directive，让代理询问你怎么选。这就是冲突确认机制存在的意义——静默走配方在这类任务上有过半概率出错。

### 示例 (iv)——使用自定义目录（进阶）

VeriKit 默认走内置的 100 Kit HarmonyOS 目录。若想指向其他目录（分叉、自定义技能集、追加的产品 SDK）：

```bash
export VERIKIT_SKILL_ROOT=/path/to/your/skills      # 包含 <skill>/SKILL.md
export VERIKIT_CONTRACTS_DIR=/path/to/contracts     # JSON 边车合约
node <plugin>/dist/verikit-cli.js route --task "..." --top 5
```

同一套排序器 / 冲突检测器 / 二级参考逻辑会在你的目录上运行。完整的环境变量清单（`VERIKIT_SKILL_ROOT`、`VERIKIT_CONTRACTS_DIR`、`VERIKIT_MANIFESTS_DIR`、`VERIKIT_COMPOSITIONS_FILE`）见 `bin/verikit-cli.ts`（TS 源码已包含在仓库中以便审计）。

## 5. 许可、致谢与链接

- **许可：** VeriKit 的排序器、CLI、钩子、斜杠命令、合约编写、组合配方和构建脚本采用 MIT 协议。详见 [`LICENSE`](./LICENSE)。
- **致谢：** `skills/<kit>/references/` 下的 HarmonyOS SDK 文档 © 华为终端有限公司，在此作为开发者参考材料再分发。详见 [`ATTRIBUTION.md`](./ATTRIBUTION.md)。
- **Issues / PRs：** [`github.com/rshu/VeriKit`](https://github.com/rshu/VeriKit)。
