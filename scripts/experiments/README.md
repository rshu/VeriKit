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
