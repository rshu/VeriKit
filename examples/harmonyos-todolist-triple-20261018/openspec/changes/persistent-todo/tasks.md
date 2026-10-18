## 1. 纯逻辑模型（业务实现）

- [x] 1.1 创建 `app/entry/src/main/ets/model/TodoModel.ets`：导出 `interface TodoItem { id: string; title: string; completed: boolean }` 与 `export type TodoFilter = 'all' | 'active' | 'completed'`，不引入任何 SDK 或第三方模块
- [x] 1.2 实现 `TodoModel.add(title)`：trim 后为空或长度超 80 字符返回 false；合法（含中文、重复标题）追加并返回 true，id 唯一
- [x] 1.3 实现 `toggle(id)`、`remove(id)`、`visible(filter)`（all/active/completed 三种筛选语义）
- [x] 1.4 实现 `serialize()` 与 `restore(json)`：restore 恢复各条 id 与状态，记录 id 基线保证恢复后新增 id 不碰撞；解析失败或非法条目安全处理

## 2. 持久化存储助手（业务实现）

- [x] 2.1 创建存储助手（ability context 获取 `@kit.ArkData` preferences 实例）：`load()` 读取已保存 JSON 字符串，无数据返回空
- [x] 2.2 实现 `save(json)`：put 后 `await flush`；用 promise 链串行化多次保存，避免并发覆盖；put/flush 失败时向外报告错误（供 UI 显示），不中断后续保存

## 3. 单页面 UI（业务实现）

- [x] 3.1 创建/改造单页面：@State 管理 items/filter/loading/saveError，`aboutToAppear` 中 await 加载并 restore，loading 期间禁止新增；UI 实际使用 TodoModel
- [x] 3.2 实现输入与添加：`todo-input`、`add-button`（稳定 id），非法输入不追加并反馈
- [x] 3.3 实现列表渲染与行操作：`todo-row-<id>`、`toggle-<id>`、`delete-<id>`（稳定 id），操作后 @State 刷新并触发保存
- [x] 3.4 实现筛选与统计：`filter-all`、`filter-active`、`filter-completed`（稳定 id），展示全部数与未完成数并随操作即时更新
- [x] 3.5 实现保存失败错误提示显示；确认业务 .ets 文件总数 ≤4，未改动构建配置与 EntryAbility

## 4. 外部构建与 SDK 验收（由外部实验程序执行，本阶段不执行、不勾选）

- [x] 4.1 外部执行 hvigor 构建：ArkTS 编译通过（API 21），无未使用/未声明引用
- [x] 4.2 外部验证应用可安装启动：Preferences 加载完成后从 loading 进入可用状态

## 5. 外部功能验收（由外部实验程序在模拟器/设备执行，本阶段不执行、不勾选）

- [x] 5.1 验证添加：合法中文/重复标题添加成功；空白与 >80 字符标题被拒绝
- [x] 5.2 验证切换与删除：toggle 完成状态翻转、delete 移除条目，id 稳定
- [x] 5.3 验证筛选与统计：三个筛选视图与数量统计随操作即时正确更新
- [x] 5.4 验证持久化与恢复：变更后重启应用恢复条目（id 与完成状态一致）；快速连续变更后落盘为最终状态；保存失败时出现错误提示
