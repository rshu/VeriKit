## Why

实验需要一个真实的 HarmonyOS Stage ArkTS TodoList 应用：目前工程只有空 EntryAbility，没有任何业务功能与持久化。需要以规范化流程（proposal → specs → design → tasks）先行定义新增、完成/恢复、删除、筛选与数量统计，以及基于 ArkData Preferences 的真实持久化与恢复行为，之后才授权实现。

## What Changes

- 新增单页面 TodoList UI（仅使用既有 ArkUI 基础组件），提供输入、添加、完成/恢复、删除、全部/未完成/已完成筛选与数量统计；关键元素提供稳定测试 id：`todo-input`、`add-button`、`filter-all`、`filter-active`、`filter-completed`、`todo-row-<id>`、`toggle-<id>`、`delete-<id>`。
- 新增独立纯逻辑文件 `entry/src/main/ets/model/TodoModel.ets`（不引入任何 SDK 或第三方模块，必须被实际 UI 使用），导出 `TodoItem`、`TodoFilter`、`TodoModel`（items/add/toggle/remove/visible/serialize/restore）。
- 标题校验规则：拒绝纯空白标题；trim 后最多 80 个字符；支持中文与重复标题。条目 ID 唯一且稳定，restore 后新增 ID 不与已恢复 ID 碰撞。
- 使用 ArkData Preferences 真实存储：每次变更 put 后 `await flush`；应用重启后恢复状态；保存失败时向用户显示错误；避免并发保存相互覆盖。
- UI 使用 @State 驱动刷新；读取 Preferences 完成前保持 loading 状态，加载完成后才允许新增。
- 业务代码不超过四个 .ets 文件；不修改构建配置与既有 EntryAbility；不引入通知、网络、账号能力。

## Capabilities

### New Capabilities

- `todo-item-management`: 待办条目的新增（标题校验、80 字符上限、中文与重复标题）、完成/恢复切换、删除，以及 ID 的唯一性与稳定性。
- `todo-filter-stats`: 全部/未完成/已完成筛选与数量统计的展示行为。
- `todo-persistence`: 基于 ArkData Preferences 的持久化（put 后 await flush）、启动恢复、保存失败提示与并发保存保护。

### Modified Capabilities

（无——项目尚无既有 capability 规范。）

## Impact

- 受影响代码：仅 `app/` 目录（新增 `entry/src/main/ets/model/TodoModel.ets`、页面/存储相关最多共 4 个业务 .ets 文件）。
- 依赖 API：ArkTS（纯逻辑与 @State 状态管理）、ArkData `@kit.ArkData` preferences（getPreferences/put/flush）、既有 ArkUI 基础组件；SDK API 21。
- 不修改：构建配置、既有 EntryAbility、`.plugins`、`.runtime-corrector`、`openspec/config.yaml`、`app/requirements.md`。
- 构建与验收由外部实验程序执行；本变更只产出规范文档，不声称已测试。
