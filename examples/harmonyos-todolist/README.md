# 鸿蒙 TodoList 参考应用

真实 HarmonyOS Stage / ArkUI / ArkTS 工程，目标 HarmonyOS 6.0.1 API 21。
独立包名 `com.verikit.experiment.todolistreference`，ArkData Preferences 本地保存。

包含新增、完成与恢复、删除、三种筛选、数量统计、中文和重复标题、空白拒绝及 80 字符限制。保存串行执行 `put` 和 `flush`，读取与保存失败显示错误并支持重试。

这是本地参考实现。GLM 真实会话因 HTTP 401 未生成业务代码，不得把它记作模型生成结果。
实际业务检查 11/11、SDK 编译、设备检查 11/11 通过。初始输入法协议阻断已在用户明确授权基本模式后解除；真实 Preferences 保存及两次进程重启恢复均已验证。
详见[实验报告](../../docs/experiments/harmonyos-todolist-status.md)。

可使用 DevEco Studio 打开本目录。工程没有签名材料，实体设备需使用自己的开发签名。
也可按[运行说明](../../scripts/experiments/README.md)复制到新隔离目录后编译验收。

- `pages/Index.ets`：真实 ArkUI 页面与状态刷新。
- `model/TodoModel.ets`：被页面实际使用的纯业务逻辑。
- `storage/TodoStorage.ets`：真实 Preferences 存储与保存队列。

以上三个文件均位于 `entry/src/main/ets/`。
