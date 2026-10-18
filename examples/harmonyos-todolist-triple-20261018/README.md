# 三组件真实实验的鸿蒙 TodoList

真实 OpenClaw 2026.7.1-2 同时启用官方 OpenSpec 1.3.1 Skills/CLI、当前 VeriKit 和未修改的 Runtime Corrector，使用真实 GLM-5.3-Flash 从空模板生成规范、应用与修复。业务代码全部来自模型原生工具；本地程序只做独立验收、受控故障和归档。

首次应用代码写入前完整读取了 OpenSpec apply Skill、规范上下文、arkdata/arkts Skill 入口及各一篇相关参考。最终纯逻辑 11/11、异常恢复 3/3、真实 API 21 编译、基础设备 12/12、扩展设备 4/4 通过；真实 Preferences 保存失败提示和后续保存恢复也通过。OpenSpec 任务完成 17/17，未归档。

首次实现写入超出实验路径范围的 store/ 文件，RC 判为 DEVIATION，跟进回合被取消；之后依据真实反馈由同一模型移动到 model/。这些历史没有改成通过。保存故障通过在专用模拟器中建立备份路径冲突实现，没有更改本目录代码或 SDK。

可用 DevEco Studio 打开本目录。包名 `com.verikit.experiment.openspectodo`；源码与实际安装的 HAP 对应。仅复制源码、合成工程配置与规范，不含依赖、缓存、HAP、密钥或原始模型会话。仍有 getContext 弃用等编译警告，未验证实体设备和发布签名；读取失败保护只做源码审阅。

详见[实验报告](../../docs/experiments/triple-harmonyos-20261018.md)、[源码归档证明](../../docs/experiments/evidence/20261018-triple/application-archive-proof.json)与[复现步骤](../../scripts/experiments/README.md)。
