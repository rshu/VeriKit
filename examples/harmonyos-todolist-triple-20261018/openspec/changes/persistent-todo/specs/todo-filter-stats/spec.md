## ADDED Requirements

### Requirement: 筛选视图
系统 SHALL 提供三个筛选控件 `filter-all`、`filter-active`、`filter-completed`。`TodoModel.visible(filter)` MUST 按当前筛选返回条目：`all` 返回全部条目；`active` 仅返回 completed 为 false 的条目；`completed` 仅返回 completed 为 true 的条目。UI 列表 MUST 展示 `visible` 的结果，且 MUST 与 `TodoModel.items` 保持一致驱动。

#### Scenario: 全部筛选
- **WHEN** 存在已完成与未完成条目，用户点击 filter-all
- **THEN** 列表展示全部条目

#### Scenario: 未完成筛选
- **WHEN** 存在已完成与未完成条目，用户点击 filter-active
- **THEN** 列表仅展示 completed 为 false 的条目

#### Scenario: 已完成筛选
- **WHEN** 存在已完成与未完成条目，用户点击 filter-completed
- **THEN** 列表仅展示 completed 为 true 的条目

#### Scenario: 空筛选视图
- **WHEN** 当前筛选下没有任何匹配条目
- **THEN** 列表为空且不报错，切换到其他筛选后正常展示

### Requirement: 数量统计
系统 SHALL 展示数量统计：全部条目数与未完成条目数 MUST 随 add、toggle、remove 操作即时更新，且 MUST 与 TodoModel 内部状态一致。

#### Scenario: 统计随操作更新
- **WHEN** 用户添加、完成或删除条目
- **THEN** 数量统计立即反映最新状态（例如 3 条中 1 条未完成 → 完成其中 1 条未完成项后未完成数变为 0 → 删除 1 条后总数变为 2）
