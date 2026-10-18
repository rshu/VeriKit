# GLM 生成的鸿蒙 TodoList（2026-10-18）

真实 OpenClaw 2026.7.1-2 调用 GLM glm-5.3-flash 生成，经三轮实际反馈修复。业务源码均由模型原生工具写入，没有替换为参考应用。前两轮修复因无变化 edit 触发宿主终止，记录保留。

本次首次代码工具调用前，已完整读回 arkdata、arkts 的 SKILL.md、Preferences 参考和 Promise/async-await 参考，并通过原生 transcript、顺序和全文哈希核对。

实际结果：插件流程 **18/18**，纯业务 **11/11**，真实 API 21 SDK 编译成功，专用模拟器 **11/11**，包括两次进程重启恢复。源码使用 ArkUI、ArkData Preferences 串行保存，支持中文新增、完成/恢复、删除、三种筛选及数量统计；读取失败时阻止变更并允许重试。

业务文件：

- entry/src/main/ets/model/TodoModel.ets：纯逻辑与序列化。
- entry/src/main/ets/model/TodoStore.ets：Preferences 与保存队列。
- entry/src/main/ets/pages/Index.ets：实际 ArkUI 页面。

包名 com.verikit.experiment.todolist，HarmonyOS 6.0.1 API 21。DevEco Studio 可打开本目录。生成的是 unsigned HAP，仍有 getContext 弃用等警告，未测试实体设备或发布签名。

详见[完整实验报告](../../docs/experiments/harmonyos-todolist-status.md)和[复现说明](../../scripts/experiments/README.md)。构建缓存、探针文件和安装包未复制到此源码归档。
