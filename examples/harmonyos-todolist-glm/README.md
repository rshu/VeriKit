# GLM 实验生成的鸿蒙 TodoList

由真实 OpenClaw 2026.7.1-2 会话调用 GLM glm-5.3-flash 生成，经一次实际 SDK 验收反馈后由同一模型修复。业务代码未由本地参考实现替换。

目标 HarmonyOS 6.0.1 API 21，包名 com.verikit.experiment.todolist。包含中文新增、完成与恢复、删除、三种筛选、数量统计及 ArkData Preferences 串行保存；读取失败会阻止新增并允许重试。

实际结果：纯业务 **11/11**、SDK 编译成功、专用模拟器设备验收 **11/11**，包括两次进程重启后的持久化恢复。仍有 getContext 弃用等编译警告。unsigned HAP 已在模拟器安装；实体设备需自己的开发签名，未测试发布签名。

模型首次漏读 ArkTS 参考文件，修复轮补读。模型流程保留 **17/18**，不将补读改记为首次通过。详见[完整实验报告](../../docs/experiments/harmonyos-todolist-status.md)。

业务文件位于 entry/src/main/ets：

- model/TodoModel.ets：实际被 UI 使用的纯逻辑模型。
- model/TodoStorage.ets：真实 Preferences 保存队列。
- pages/Index.ets：实际 ArkUI 页面。

DevEco Studio 可直接打开本目录；隔离构建和设备复现见[运行说明](../../scripts/experiments/README.md)。
