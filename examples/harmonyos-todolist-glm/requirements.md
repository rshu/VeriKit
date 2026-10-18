# 实验应用需求
真实 HarmonyOS Stage ArkTS 应用，已有空工程及 EntryAbility，使用 SDK API 21。
仅修改 app 目录，不修改 .plugins。新增、完成/恢复、删除、全部/未完成/已完成筛选、数量统计。
拒绝纯空白标题；trim 后最多 80 个字符；支持中文及重复标题。ID 唯一稳定。
使用 ArkData Preferences 真实存储，每次变更 put 后 await flush；恢复状态；保存失败显示错误。避免并发保存覆盖。
单页面 UI，元素提供稳定 id: todo-input, add-button, filter-all, filter-active, filter-completed, todo-row-<id>, toggle-<id>, delete-<id>。
使用独立纯逻辑文件 entry/src/main/ets/model/TodoModel.ets，不引入任何 SDK 或第三方模块，必须被实际 UI 使用。
导出 interface TodoItem { id: string; title: string; completed: boolean }，export type TodoFilter = 'all' | 'active' | 'completed'。
导出 class TodoModel，公开 items: TodoItem[]（初始空）。方法 add(title: string): boolean（非法返回 false，合法追加返回 true），toggle(id: string): void，remove(id: string): void，visible(filter: TodoFilter): TodoItem[]，serialize(): string，restore(json: string): void。
restore 使用 serialize 的格式，恢复各条 ID 与状态，之后新增 ID 不碰撞。不要使用浏览器 DOM 或 localStorage。
UI 用 ArkUI @State 触发刷新；读取 Preferences 前保持 loading，加载完可新增。业务文件最多四个 .ets 文件即可。
不要增加通知、网络、账号；不要编辑构建配置或已有 EntryAbility。构建与验收由外部实验程序执行，不要声称已经测试。
