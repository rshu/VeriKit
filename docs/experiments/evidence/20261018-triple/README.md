# 三组件实验精选证据

主报告：[OpenSpec + VeriKit + Runtime Corrector](../../triple-harmonyos-20261018.md)。

- `triple-summary.json`：实际宿主、模型调用、官方 CLI、产物审阅、Stop 回执、Kit 指导过滤及结果汇总。
- `read-before-code-proof.json`、`openspec-read-before-code-proof.json`：原生返回全文与写码顺序核对。
- `spec-gate.json`、`controlled-design-drift.json`：规范先行及受控冲突；严格结构校验未替代语义审阅。
- `independent-acceptance.json`、`sdk-source-binding.json`：实际业务、SDK、设备及源码/HAP 一致性。
- `device-storage-fault.json`、`storage-failure.png`：真实保存失败、撤除故障和重启恢复。
- `rc-receipts-develop-1.json`：历史 DEVIATION 与取消的跟进；不改成通过。
- `rc-receipts-finalize-1.json`、`finalization-proof.json`：最终 PASS，模型实际读取冻结证据且仅改 tasks。
- `setup-failure.json`、`device-extra-input-fixture-failure.json`、`storage-preparation-history.json`：接线和测试夹具准备失败。
- `application-archive-proof.json`、`specification-archive-proof.json`：实际应用和规范归档指纹。
- `cleanup.json`：原配置、RC 仓库与全局 OpenSpec 未变；所有跟踪进程和端口退出。模拟器请求 SIGTERM 后实际记录 SIGABRT，按实保留。
- `openspec-full-integrity.json`：2265 个普通文件均匹配官方安装源；本轮未调用的 yaml 可执行链接仍指向安装源，后续 setup 已修正链接复制方式。

完整原生转录、SDK 缓存、HAP、依赖和原始目录留在被忽略的 experiments/runs 中，不复制到这里。没有密钥、认证头或完整模型请求。辅助脚本经过修订，早期失败由当时命令和输出作证；首次 Kit 阅读审计使用开发前冻结的脚本。

`sha256-manifest.json` 列出本目录除清单自身以外的文件哈希，用于核对精选快照，不能替代原始运行记录。
