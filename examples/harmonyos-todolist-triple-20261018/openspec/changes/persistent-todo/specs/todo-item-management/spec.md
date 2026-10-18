## ADDED Requirements

### Requirement: 添加待办条目
系统 SHALL 提供添加待办条目的能力：用户在 `todo-input` 输入标题后点击 `add-button`，系统 MUST 将条目追加到列表末尾。标题校验规则 MUST 由纯逻辑 `TodoModel.add` 执行：输入 trim 后为空 SHALL 返回 `false` 且不追加；trim 后长度超过 80 个字符 SHALL 返回 `false` 且不追加；合法标题（含中文、与既有条目重复的标题）SHALL 返回 `true` 并追加。

#### Scenario: 合法标题添加成功
- **WHEN** 用户在 todo-input 输入非空白标题（trim 后不超过 80 字符，例如中文标题"买牛奶"）并点击 add-button
- **THEN** TodoModel.add 返回 true，条目以唯一 id 追加到 items 末尾，列表出现新行 `todo-row-<id>`

#### Scenario: 空白标题被拒绝
- **WHEN** 用户在 todo-input 输入纯空白字符（如空格、全角空格、制表符）或空字符串并点击 add-button
- **THEN** TodoModel.add 返回 false，items 不变，不产生任何新条目

#### Scenario: 超长标题被拒绝
- **WHEN** 用户输入 trim 后超过 80 个字符的标题并点击 add-button
- **THEN** TodoModel.add 返回 false，items 不变

#### Scenario: 重复与中文标题允许
- **WHEN** 已存在标题"买牛奶"的条目，用户再次输入"买牛奶"并点击 add-button
- **THEN** TodoModel.add 返回 true，两条标题相同的条目同时存在且 id 不同

### Requirement: 完成与恢复切换
系统 SHALL 允许用户通过每行的 `toggle-<id>` 控件切换条目的 completed 状态：未完成变已完成、已完成恢复为未完成。切换 MUST 只影响目标 id 对应条目。

#### Scenario: 切换为已完成
- **WHEN** 用户点击某条 todo-row-<id> 内的 toggle-<id>
- **THEN** 该条目的 completed 由 false 变为 true，其他条目状态不变

#### Scenario: 再次切换恢复未完成
- **WHEN** 用户对已完成条目再次点击同一 toggle-<id>
- **THEN** 该条目的 completed 恢复为 false

### Requirement: 删除待办条目
系统 SHALL 允许用户通过每行的 `delete-<id>` 控件删除该条目，被删条目 MUST 从 items 中移除且不再出现在任何筛选视图中。

#### Scenario: 删除条目
- **WHEN** 用户点击某条 todo-row-<id> 内的 delete-<id>
- **THEN** 该条目从列表移除，`todo-row-<id>` 不再渲染

### Requirement: 条目 ID 唯一且稳定
系统 MUST 为每个条目分配 string 类型的唯一 id；同一 id 在应用生命周期内 MUST 始终指向同一条目。`restore` 恢复的条目 MUST 保留其原 id；恢复之后新增条目的 id MUST NOT 与任何已恢复 id 碰撞。

#### Scenario: 恢复后新增不碰撞
- **WHEN** TodoModel.restore 恢复了含 id "t3" 的序列化数据，随后用户连续添加新条目
- **THEN** 新增条目的 id 均不等于 "t3"，也不与任何其他既有 id 重复

#### Scenario: 多次操作后 id 稳定
- **WHEN** 同一条目经历 toggle、筛选视图切换等操作
- **THEN** 该条目的 id 保持不变，`todo-row-<id>`、`toggle-<id>`、`delete-<id>` 引用一致
