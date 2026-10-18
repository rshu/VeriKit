## ADDED Requirements

### Requirement: Preferences 真实持久化
应用 MUST 使用 ArkData Preferences（`@kit.ArkData`）真实持久化待办数据。每次条目变更（新增、切换、删除）后，应用 MUST 以 `TodoModel.serialize()` 的格式将数据写入 Preferences，并且 MUST 在 put 之后 `await flush` 完成。持久化逻辑 MUST 通过 ability context 获取 Preferences 实例，不使用浏览器 DOM、localStorage 或任何第三方存储。

#### Scenario: 变更后落盘
- **WHEN** 用户完成任意一次新增、切换或删除操作
- **THEN** 应用以 serialize() 结果执行 put，随后 await flush，flush 成功完成后无错误提示

#### Scenario: 序列化格式可往返
- **WHEN** 应用以 serialize() 输出保存后，再用同一格式执行 restore
- **THEN** 各条目的 id、title、completed 完整恢复

### Requirement: 启动恢复
应用启动时 MUST 在渲染可用列表前从 Preferences 读取已保存数据并执行 `TodoModel.restore`。读取完成前 UI MUST 处于 loading 状态且禁止新增；读取完成后 loading 消失，用户方可新增条目。无历史数据时 MUST 以空列表正常进入可用状态。

#### Scenario: 有历史数据时恢复
- **WHEN** Preferences 中存在上次保存的序列化数据，应用重新启动
- **THEN** loading 结束后列表展示与关闭前一致的条目（含 id 与完成状态）

#### Scenario: 无历史数据时首次启动
- **WHEN** Preferences 中不存在任何已保存数据，应用首次启动
- **THEN** loading 结束后展示空列表，用户可以直接新增条目

#### Scenario: 加载完成前禁止新增
- **WHEN** Preferences 尚未读取完成
- **THEN** UI 保持 loading 状态，add-button 不产生新增效果

### Requirement: 保存失败提示
当 put 或 flush 失败时，应用 MUST 向用户显示保存错误提示；失败 MUST NOT 被静默吞掉，内存中的条目状态 MUST 保持用户最后一次操作的结果。

#### Scenario: flush 失败提示
- **WHEN** 某次变更的 put 或 flush 抛出错误
- **THEN** UI 显示保存失败错误提示，用户仍可见刚才的操作结果

### Requirement: 并发保存保护
应用 MUST 保证多次快速变更不会产生并发保存相互覆盖：保存操作 MUST 串行化（例如保存队列或上一次保存完成前的挂起标记），确保最终落盘数据为最后一次操作后的 serialize() 结果。

#### Scenario: 快速连续变更
- **WHEN** 用户在很短时间内连续执行多次变更（如连续添加或连续切换）
- **THEN** 各次保存按顺序串行执行，最终 Preferences 中的数据等于最后一次变更后的 serialize() 结果，无中间状态覆盖最终值
