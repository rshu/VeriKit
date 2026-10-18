# TodoList 隔离实验运行说明

从仓库根目录运行，使用尚未存在的新实验目录，保留以往证据。结果保存在被 Git 忽略的 `experiments/runs/`。
脚本面向本机 macOS：宿主 `/opt/homebrew/lib/node_modules/openclaw`，DevEco Studio `/Volumes/PortableSSD/Applications/DevEco-Studio.app/Contents`，系统镜像 `/Users/id02271616/Library/Huawei/Sdk`。其他机器需调整路径；真实模型运行器 `todolist-live.mjs` 支持 `VK_HOST_ROOT`，原生宿主对照脚本使用上述固定路径。

## 本地检查

```sh
npm run build:plugins
node scripts/experiments/todolist-fixture.mjs experiments/runs/new-todo
node scripts/experiments/todolist-native-controls.mjs experiments/runs/new-todo native-controls.json
mkdir -p experiments/runs/new-reference/workspace
cp -R examples/harmonyos-todolist experiments/runs/new-reference/workspace/app
node scripts/experiments/todolist-acceptance.mjs experiments/runs/new-reference
node scripts/experiments/todolist-build.mjs experiments/runs/new-reference
```

宿主对照使用真实加载器、会话 SDK、钩子、原生写入工具，无模型调用。故障只替换实验插件副本的 CLI，finally 恢复字节。业务验收需 Node 26 的类型去除接口，直接执行实际纯 ArkTS 模型。构建使用预装工具和独立缓存，无下载。

专用模拟器保持运行期间，在另一个终端执行设备验收：

```sh
node scripts/experiments/todolist-emulator.mjs experiments/runs/new-todo
node scripts/experiments/todolist-device.mjs experiments/runs/new-reference
```

模拟器使用新数据目录、端口 13017，30 分钟后自动关闭，不要同时启动两次。设备测试仅操作 `com.verikit.experiment.*` 应用。默认不清理应用数据，重复执行前应确认处于初始状态；显式传入 `--reset-app` 会先卸载该合成应用再安装，保留其他应用数据。

首次输入法协议默认只选择取消/退出并记录 BLOCKED。只有取得用户明确授权后，才可传入 `--allow-basic-input` 选择“同意基本模式”，随后选择普通 26 键布局并完成设置。它不会选择全量模式。验收不能将其余未运行操作判定为通过。

## 真实模型续跑

真实调用会向 `https://open.bigmodel.cn/api/anthropic` 发送合成内容，必须先取得目的地及数据范围的授权；本次对话已取得。脚本从日常 OpenClaw 配置解析选定模型，密钥只进入子进程环境，不修改日常配置，不把 `.env` 或配置内容加入模型提示。其他服务或项目不能默认复用此授权。

临时凭据可通过 `VK_EXPERIMENT_MODEL_KEY` 环境变量覆盖，不必修改日常配置。
`todolist-credential-runner.mjs <新根目录> main [其他阶段...]` 支持隐藏终端输入：
等待 READY 后，在标准输入提供主、备用凭据的 JSON 数组及换行。
它只在内存和子进程环境持有凭据，先用合成短消息验证同一服务，成功后才启动实验。
不要将凭据写入命令参数、脚本、报告或版本库。

```sh
node scripts/experiments/todolist-live.mjs experiments/runs/new-live main
node scripts/experiments/todolist-evidence.mjs experiments/runs/new-live
node scripts/experiments/todolist-read-proof.mjs experiments/runs/new-live
```

`main` 固定发送菜单、已选 Kit 后实现、手动工具、冲突、无关请求。失败会停止当前阶段并清理 Gateway；先修正根因再继续。其他阶段为 `no-injection`、`monitor-off`、`denied`、`disabled`、`broken`、`timeout`，以第二个位置参数传入阶段名，最后重新生成 evidence。`repair` 从根目录 `repair-request.txt` 读取外部验收反馈，沿用原开发会话。

观察插件记录真实模型输入、工具顺序、结果与完成状态。401 或未完成轮次不会因“没有写文件”判为遵从规则。菜单与冲突回答仍需人工阅读，自动关键字检查只作初步判断。模型生成后，对其自己的根目录执行业务、编译、设备验收，不能用参考应用结果替代。

`todolist-read-proof.mjs` 直接检查该隔离会话的原生 transcript，并关联实际
toolCallId、读取返回、首次代码调用及文件哈希。它逐段对照文档原文，计算
首次写入前的覆盖范围，要求所选 arkdata、arkts 的完整入口说明及各至少
一篇完整参考均已返回。observer 钩子会缩短长文本，不能用其简略返回代替
此内容核对。原始 transcript 和首次失败记录均保留；修复轮补读不计入首次通过。
运行器在初次开发后自动保存原生 transcript 为根目录的 `native-main-initial.jsonl`，
已有快照不会覆盖。审计优先使用它，避免后续修复触发会话整理后找错 transcript。首次冻结的
审计版本和结果须保留；当前输出同时记录审计脚本哈希与首次冻结哈希。
凭据运行器将连通性检查追加到 `provider-connectivity-history.jsonl`，同时
保留最新摘要；这些记录不包含凭据。

宿主会对排队的后续输入发送无正文 final 回执；脚本必须忽略该回执、跟踪实际 runId，并等待 `agent.wait` 排空，避免提前结束开发轮。没有真实 `llm_input` 的宿主配置提示不算模型完成。

GLM-5.3-Flash 的推理无法关闭，未指定档位时默认 max（[官方模型说明](https://huggingface.co/zai-org/GLM-5.3-Flash)）。实验在独立配置中声明实际推理能力，使用原生 provider 包装接口设置 `reasoning_effort: low` 与 `output_config.effort: low`，保留 enabled 推理；`provider_request` 记录实际设置。该适配仅改变本次模型调用参数，不改写 VeriKit 路由或模型响应，也不修改已安装的宿主代码。

## VeriKit 与 Runtime Corrector 联合实验

`joint-harmonyos-live.mjs <新根目录> develop` 从空工程开发，在同一个隔离
OpenClaw 中加载两个插件；RC 包从只读的 `runtime-corrector-toy` 源码构建到
实验目录，不运行或写入其源码仓库的构建产物。主助手与 RC 审阅员均使用真实
GLM，各自保持独立原生会话。RC 项目显式启用需求提取与 Stop 纠偏，其他 RC
功能开关关闭，不能据此宣称覆盖了 RC 的全部功能。

已有本次授权凭据可用 `joint-harmonyos-credential-runner.mjs <根目录> develop`
通过隐藏标准输入传入；凭据仍只保存在内存和子进程环境中。`challenge` 与
`repair` 续用已有隔离工程及会话，不创建或替换日常配置。

1. 开发完成后，使用原来的全文读取审计、纯业务检查和 SDK 构建脚本独立核对。
2. `joint-harmonyos-fault.mjs <根目录>` 只在生成的应用中把实际标题长度上限
   80 改为 800，保存前后原文与哈希，拒绝重复注入。先运行独立业务检查保留
   10/11 的负例，再运行 `challenge`。第一轮模型仅添加无业务作用的检查点
   注释，触发原生编辑终审，保留错误；随后等待真实 RC 反馈、原生宿主修复及
   再次终审。该对照验证纠偏闭环，不代表自然缺陷率或相对模型单独开发的收益。
3. `repair` 从根目录 `repair-request.txt` 读取独立编译/设备验收反馈，宿主自行
   修改实际代码。此类修复必须标明由外部验收触发，不能归功于 RC 自动发现。
4. 专用模拟器运行期间，`joint-harmonyos-device.mjs <根目录> --allow-basic-input`
   验证 12 项真实界面操作，含数量统计。完成状态接受实际 Checkbox 状态或
   当前应用使用的 ✓/○ 文字；不会要求需求中未规定的控件类型。已有数据重跑
   时可用 `--reset-app` 仅卸载该合成应用；首先归档原有失败结果及布局目录。
5. `joint-harmonyos-audit.mjs <根目录>` 汇总原生会话、评审回执、反馈读取、
   业务/构建/设备与源码指纹。报告会明确保留语义 PASS 与独立验收失败的差异。

联合运行器单独等待后台 Stop 和有回执的续作结束，主助手返回 final 不等于
终审完成。内部评审会话不再收到自动 VeriKit Kit 选择提示；原业务会话中的
RC 修复继续保留路由。原始运行、失败轮次及控制注入保存在忽略的实验目录，
精选审计证据另行归档，不发布密钥、缓存或完整原始会话。

## OpenSpec、VeriKit 与 RC 三组件实验

使用官方 `@fission-ai/openspec@1.3.1` 原版 Skills 与 CLI。该版本没有原生
OpenClaw adapter；`triple-openspec-bridge.mjs` 只把固定参数交给原版 CLI，
没有实现替代的 OpenSpec 生成器。配置和完整安装副本在新实验根目录，
不更改全局安装。RC 仍从上述只读仓库构建到隔离副本。

1. `triple-harmonyos-setup.mjs <全新根目录>` 复制合成模板及官方安装，关闭
   遥测，生成原版 Claude Skills，再通过 OpenClaw `skills.load.extraDirs`
   加载。相对符号链接保持原样。宿主必须为 2026.7.1-2。
2. `triple-harmonyos-credential-runner.mjs <根目录> specify` 通过隐藏标准
   输入接收已批准目的地的凭据，只在内存使用。后续阶段同样使用这个运行器。
   实际读取官方 propose Skill，完成 proposal、三份 specs、design、tasks；
   不写应用代码，等待真实 RC 后台审阅收敛。
3. 用 `triple-harmonyos-validate.mjs <根目录> initial` 外部执行原版严格
   校验。独立审阅需求与规范，发现的问题写入根目录 `spec-feedback.txt`，
   明确外部发现的归因，不能伪装成 RC 检出。
4. `triple-harmonyos-drift.mjs <根目录>` 注入一次可追踪的 design 持久化
   冲突，保存原文和前后校验。随后运行 `drift`：真实 runtime_corrector
   检查先于编辑，宿主依据诊断修复。原需求和持久化 specs 不得放宽。
5. 待 RC 收敛后，再运行外部 validator（标签 `post-drift`），以及
   `triple-harmonyos-spec-gate.mjs <根目录>`；后者保存规范原文快照、
   需求映射和哈希。`develop` 没有通过该门槛就拒绝开始。
6. 运行 `develop`，使用新原生会话。模型必须先读官方 apply Skill、CLI
   返回的所有上下文及所选 Kit 文档，再写实际应用。实现任务可勾选，
   外部任务保持未勾选。读取证明分别使用 `triple-harmonyos-read-proof.mjs`
   和 `triple-harmonyos-openspec-read-proof.mjs`，不能只看路径。
7. 执行 `todolist-acceptance.mjs`、`triple-harmonyos-model-edge.mjs` 和
   `triple-harmonyos-build.mjs`。构建包装器保存每次日志、源码前后哈希
   与实际 HAP 哈希。真实问题写入 `repair-request.txt` 后运行 `repair`，
   不由本地替换模型业务代码；历史偏离和 RC 失败照实保留。
8. 在专用 `todolist-emulator.mjs` 实例中依次运行
   `triple-harmonyos-device.mjs <根目录> --allow-basic-input`、
   `triple-harmonyos-extra-device.mjs <根目录>`、
   `triple-harmonyos-storage-fault.mjs <根目录>`。
   基本模式须有该用户的既有授权。已有数据重跑基础流程可加 `--reset-app`，
   但先归档旧结果。扩展/故障脚本拒绝覆盖先前结果。
9. 存储故障仅在合成应用调试沙箱中创建空的 `todoStore.bak` 目录，
   阻断原生备份路径，随后只删除该空目录；原数据不移动、不替换。
   核对真实错误提示、保存队列恢复和重启状态。命令返回成功不代表操作
   生效：HDC shell 可能把错误写入 stdout，类型核对必须严格匹配。
10. `triple-harmonyos-independent.mjs <根目录>` 汇总真实验收并核对
    源码/HAP/设备一致性；只有全部通过才把冻结证据交入模型工作区。
    `finalize` 只允许模型读取证据和更新 tasks，不得修改代码、规范或证据。
    之后外部 validator 使用 `final` 标签，区分 artifacts ready 与
    tasks all_done；本实验没有执行 archive。
11. `triple-harmonyos-audit.mjs <根目录>` 汇总官方 Skill/CLI 指纹、实际
    调用、设计语义审阅、Stop 回执、私有会话过滤和独立验收。
    最后核对所有原配置、RC 仓库、已记录进程和端口，再归档精选证据。

本轮辅助夹具经失败后有修订，不能把最终脚本哈希当作每次旧运行的版本。
首次真实读取审计在开始开发前冻结且没有更改判据；原生转录保存实际内容。
官方 Skill/CLI 能共存不代表开销很小，本次提高了 Skills 提示上限且观察到
上下文整理、额外真实审阅请求和分钟级等待。完整结果及失败归因见
[三组件报告](../../docs/experiments/triple-harmonyos-20261018.md)。
