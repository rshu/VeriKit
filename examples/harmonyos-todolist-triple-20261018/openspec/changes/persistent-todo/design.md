## Context

实验工程（`app/`）为真实 HarmonyOS Stage ArkTS 应用，SDK API 21，已有空工程与 EntryAbility。需求硬约束来自 `app/requirements.md`：纯逻辑模型独立成 `entry/src/main/ets/model/TodoModel.ets`、不引入 SDK/第三方模块、ArkData Preferences 真实存储、每次 put 后 `await flush`、稳定元素 id、单页面 UI、业务 .ets 文件不超过四个。本变更处于规范阶段，实现与外部验收在后续授权后进行。

依据 VeriKit 文档（arkdata《通过用户首选项实现数据持久化 (ArkTS)》、arkts《异步并发 (Promise和async/await)》）：Preferences XML 模式适合单进程轻量级数据，写入后需调用 flush 落盘；异步 I/O 使用 async/await 顺序编排可保证时序。

## Goals / Non-Goals

**Goals:**

- TodoModel 为零依赖纯逻辑，可独立验证 add/toggle/remove/visible/serialize/restore。
- Preferences 持久化可靠：变更即保存、await flush、启动恢复、失败可见、并发保存串行化。
- 单页面 UI 用 @State 驱动列表与统计刷新，元素 id 稳定可测。

**Non-Goals:**

- 不做通知、网络、账号、多页面导航；不改构建配置与 EntryAbility。
- 不做多进程并发存储（不启用 GSKV 模式，默认 XML 模式满足单进程场景）。
- 不在本阶段实现代码或声称测试完成；构建与验收由外部实验程序执行。

## Decisions

### D1. 分层：纯逻辑模型 + 存储助手 + 单页面（共 ≤4 个 .ets）
- `model/TodoModel.ets`：导出 `TodoItem`、`TodoFilter`、`TodoModel`，不 import 任何模块。`add(title)` 在追加前执行标题校验：trim 后非空且长度 ≤80 个字符方为合法，非法返回 false、合法返回 true；支持中文与重复标题。id 生效顺序：restore 时记录已见 id 的最大数值后缀，新增时取不碰撞的递增后缀（如 `t<max+1>`），保证"恢复后新增不碰撞"。
- `store/TodoStore.ets`（或并入页面文件）：持有 Preferences 实例，`load()` 返回保存的 JSON 字符串，`save(json)` 执行 put + `await flush`。
- `pages/Index.ets`（既有页面文件，EntryAbility 固定加载 `pages/Index`，禁止改 EntryAbility，故在此页面内改造）：@State 持有 `items`/`filter`/`counts`/`loading`/`saveError`，全部变更经由 TodoModel 后同步 @State。
- 备选：把存储逻辑也写进页面 → 否，分离可测且符合文件数约束。

### D2. serialize/restore 格式
`serialize()` 返回 `JSON.stringify(items)`（`TodoItem[]` 数组）；`restore(json)` 解析同格式，逐条校验 id/title/completed 类型，非法条目跳过；解析失败时保持 items 为空（视作无历史数据）。restore 后重建 id 计数基线。

### D3. Preferences flush 串行化
存储助手内维护一个 promise 链（`pending = pending.then(() => doSave(json))`），每次变更将"put + await flush"追加进链尾，保证多次快速变更串行执行、最终落盘为最后一次 serialize() 结果；链中任一失败置 `saveError` 状态供 UI 显示，不中断后续保存。备选"防抖只存最后一次" → 否，会丢失中间失败可见性且仍需串行控制。

### D4. UI 状态与稳定 id
- 加载：`aboutToAppear` 中 `await store.load()` + `model.restore(json)`，完成后才置 `loading=false`；loading 期间禁用新增。
- 列表用 `ForEach` 渲染 `visible(filter)` 快照到 @State；每行 Row `.id('todo-row-'+id)`，内含 toggle 与 delete 控件 `.id('toggle-'+id)`/`.id('delete-'+id)`；输入框 `.id('todo-input')`、添加按钮 `.id('add-button')`、筛选 `.id('filter-all'|'filter-active'|'filter-completed')`。
- 统计为派生值，随 items @State 更新自动刷新。

## Risks / Trade-offs

- [restore 数据被篡改/格式异常] → restore 逐条校验并跳过非法条目，整体解析失败按空数据处理。
- [快速操作时 flush 失败] → 错误写入 `saveError` 并在 UI 提示；内存状态不被回滚。
- [TodoModel 使用 JSON.parse 的运行时类型不确定性] → restore 内做显式字段类型检查；序列化数据仅来自自身 serialize()。
- [业务文件数超限] → 严格控制在 ≤4 个 .ets（TodoModel、存储助手、页面，必要时一个公共类型文件）；EntryAbility 与构建配置零改动。
