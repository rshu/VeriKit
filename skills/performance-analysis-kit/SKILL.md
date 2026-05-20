---
name: performance-analysis-kit
description: Performance Analysis Kit 提供应用事件打点、链路跟踪、故障检测、性能监控及调试工具，用于提升HarmonyOS应用质量。当调试崩溃、分析性能瓶颈、监控应用健康状态、记录事件或使用HiLog、HiTraceMeter、hdc等DFX工具时使用本技能。
---

## 功能说明

Performance Analysis Kit（性能分析服务）为开发者提供应用事件、日志、跟踪分析工具，可观测应用运行时状态，用于行为分析、故障分析、安全分析和统计分析，帮助开发者持续改进应用体验。该Kit承载着HarmonyOS DFX子系统面向应用开发者提供的提升应用质量的全部能力。

Performance Analysis Kit提供全面的故障检测能力，包括JS Crash（进程崩溃）、Cpp Crash（C++崩溃）、AppFreeze（应用冻屏）、Resource Leak（资源泄漏）、App Killed（应用终止）、AddrSanitizer（地址越界）和任务超时检测。同时提供功耗检测（CPU高负载）、性能检测（启动耗时、滑动丢帧）等运行时质量监控能力。

在开发调试方面，提供HiLog日志打印、HiAppEvent事件订阅（应用事件和系统事件）、HiTraceMeter性能跟踪、HiTraceChain分布式调用链跟踪、HiChecker检测模式、HiDebug系统调试信息获取、HiCollie业务线程超时检测、错误管理与应用恢复等能力。还提供hdc、hilog、hitrace、hiperf等调试命令工具。所有核心能力均提供ArkTS和C/C++两套开发接口。

## 使用场景

当应用出现崩溃、冻屏、资源泄漏等稳定性问题时使用本Kit的故障检测能力。通过订阅各类系统事件（崩溃事件、冻屏事件、资源泄漏事件等），开发者可以获取故障现场信息，精准定位问题根因。

当需要进行性能优化、功耗分析或运行时监控时使用本Kit。HiTraceMeter可用于性能追踪分析，HiLog用于流水日志记录，HiAppEvent用于事件打点和上报，方便构建端侧APM系统进行线上质量监控。

## 典型场景

- 如何使用HiLog打印和管理应用日志？
- 如何检测和订阅应用崩溃事件（JS Crash、Cpp Crash）？
- 如何检测应用冻屏（AppFreeze）和资源泄漏问题？
- 如何使用HiTraceMeter进行性能跟踪分析？
- 如何使用HiTraceChain实现跨线程/跨进程调用链跟踪？
- 如何订阅系统事件（启动耗时、滑动丢帧、CPU高负载等）？
- 如何使用HiChecker检测线程耗时和资源泄漏？
- 如何使用HiCollie监控业务线程卡死卡顿？
- 如何实现应用的错误管理和自动恢复？
- 如何使用hdc、hilog、hitrace等调试命令工具？

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### 概述

- [Performance Analysis Kit简介](references/Performance Analysis Kit简介.md) - Kit整体介绍，包括使用场景、能力范围和亮点特征
- [Performance Analysis Kit术语](references/Performance Analysis Kit术语.md) - 日志版本、稳定性、崩溃类型等术语解释
- [简介](references/简介.md) - 故障检测的整体概述，包括各类故障场景介绍

### 故障检测

- [JS Crash（进程崩溃）检测](references/JS Crash（进程崩溃）检测.md) - JS/ArkTS代码异常导致的崩溃检测
- [Cpp Crash（进程崩溃）检测](references/Cpp Crash（进程崩溃）检测.md) - C++代码崩溃信号导致的崩溃检测
- [Resource Leak（资源泄漏）检测](references/Resource Leak（资源泄漏）检测.md) - 应用资源泄漏检测说明
- [AppFreeze（应用冻屏）检测](references/AppFreeze（应用冻屏）检测.md) - 应用无响应或卡死检测说明
- [App Killed（应用终止）检测](references/App Killed（应用终止）检测.md) - 应用进程被系统终止检测说明
- [AddrSanitizer（地址越界）检测](references/AddrSanitizer（地址越界）检测.md) - 非法地址访问检测说明
- [任务超时检测](references/任务超时检测.md) - 任务执行超时检测说明

### 事件订阅（HiAppEvent）

- [事件订阅简介](references/事件订阅简介.md) - HiAppEvent的应用事件和系统事件介绍及三种订阅方式
- [事件订阅（ArkTS）](references/事件订阅（ArkTS）.md) - ArkTS接口的事件订阅开发指导
- [事件订阅（C_C++）](references/事件订阅（C_C++）.md) - C/C++接口的事件订阅开发指导
- [HiAppEvent介绍](references/HiAppEvent介绍.md) - HiAppEvent的功能介绍
- [HiAppEvent常见问题](references/HiAppEvent常见问题.md) - HiAppEvent常见问题解答
- [使用FaultLogExtensionAbility订阅事件](references/使用FaultLogExtensionAbility订阅事件.md) - 通过ExtensionAbility订阅故障事件

### 系统事件订阅

- [崩溃事件介绍](references/崩溃事件介绍.md) - 崩溃系统事件的检测原理和参数说明
- [订阅崩溃事件（ArkTS）](references/订阅崩溃事件（ArkTS）.md) - ArkTS接口订阅崩溃事件
- [订阅崩溃事件（C_C++）](references/订阅崩溃事件（C_C++）.md) - C/C++接口订阅崩溃事件
- [应用冻屏事件介绍](references/应用冻屏事件介绍.md) - 应用冻屏事件的检测原理
- [订阅应用冻屏事件（ArkTS）](references/订阅应用冻屏事件（ArkTS）.md) - ArkTS接口订阅冻屏事件
- [订阅应用冻屏事件（C_C++）](references/订阅应用冻屏事件（C_C++）.md) - C/C++接口订阅冻屏事件
- [资源泄漏事件介绍](references/资源泄漏事件介绍.md) - 资源泄漏事件的检测原理
- [订阅资源泄漏事件（ArkTS）](references/订阅资源泄漏事件（ArkTS）.md) - ArkTS接口订阅资源泄漏事件
- [订阅资源泄漏事件（C_C++）](references/订阅资源泄漏事件（C_C++）.md) - C/C++接口订阅资源泄漏事件
- [地址越界事件介绍](references/地址越界事件介绍.md) - 地址越界事件的检测原理
- [订阅地址越界事件（ArkTS）](references/订阅地址越界事件（ArkTS）.md) - ArkTS接口订阅地址越界事件
- [订阅地址越界事件（C_C++）](references/订阅地址越界事件（C_C++）.md) - C/C++接口订阅地址越界事件
- [应用终止事件介绍](references/应用终止事件介绍.md) - 应用终止事件的检测原理
- [订阅应用终止事件（ArkTS）](references/订阅应用终止事件（ArkTS）.md) - ArkTS接口订阅应用终止事件
- [订阅应用终止事件（C_C++）](references/订阅应用终止事件（C_C++）.md) - C/C++接口订阅应用终止事件
- [主线程超时事件介绍](references/主线程超时事件介绍.md) - 主线程超时事件的检测原理
- [订阅主线程超时事件（ArkTS）](references/订阅主线程超时事件（ArkTS）.md) - ArkTS接口订阅主线程超时事件
- [订阅主线程超时事件（C_C++）](references/订阅主线程超时事件（C_C++）.md) - C/C++接口订阅主线程超时事件
- [任务执行超时事件介绍](references/任务执行超时事件介绍.md) - 任务执行超时事件的检测原理
- [订阅任务执行超时事件（ArkTS）](references/订阅任务执行超时事件（ArkTS）.md) - ArkTS接口订阅任务执行超时事件
- [订阅任务执行超时事件（C_C++）](references/订阅任务执行超时事件（C_C++）.md) - C/C++接口订阅任务执行超时事件
- [启动耗时事件介绍](references/启动耗时事件介绍.md) - 应用启动耗时事件的检测原理
- [订阅启动耗时事件（ArkTS）](references/订阅启动耗时事件（ArkTS）.md) - ArkTS接口订阅启动耗时事件
- [滑动丢帧事件介绍](references/滑动丢帧事件介绍.md) - 滑动丢帧事件的检测原理
- [订阅滑动丢帧事件（ArkTS）](references/订阅滑动丢帧事件（ArkTS）.md) - ArkTS接口订阅滑动丢帧事件
- [CPU高负载事件介绍](references/CPU高负载事件介绍.md) - CPU高负载事件的检测原理
- [订阅CPU高负载事件（ArkTS）](references/订阅CPU高负载事件（ArkTS）.md) - ArkTS接口订阅CPU高负载事件
- [音频卡顿事件介绍](references/音频卡顿事件介绍.md) - 音频卡顿事件的检测原理
- [订阅音频卡顿事件（ArkTS）](references/订阅音频卡顿事件（ArkTS）.md) - ArkTS接口订阅音频卡顿事件
- [订阅音频卡顿事件（C_C++）](references/订阅音频卡顿事件（C_C++）.md) - C/C++接口订阅音频卡顿事件
- [ArkWeb抛滑丢帧事件介绍](references/ArkWeb抛滑丢帧事件介绍.md) - ArkWeb抛滑丢帧事件的检测原理
- [订阅ArkWeb抛滑丢帧事件（ArkTS）](references/订阅ArkWeb抛滑丢帧事件（ArkTS）.md) - ArkTS接口订阅ArkWeb丢帧事件
- [24h功耗器件分解统计事件介绍](references/24h功耗器件分解统计事件介绍.md) - 功耗器件分解统计事件的检测原理
- [订阅24h功耗器件分解统计事件（ArkTS）](references/订阅24h功耗器件分解统计事件（ArkTS）.md) - ArkTS接口订阅功耗统计事件

### 性能与功耗检测

- [性能检测](references/性能检测.md) - 应用性能异常检测概述
- [功耗检测](references/功耗检测.md) - 应用功耗异常检测概述

### 日志（HiLog）

- [使用HiLog打印日志（ArkTS）](references/使用HiLog打印日志（ArkTS）.md) - ArkTS接口流水日志打印开发指导
- [使用HiLog打印日志（C_C++）](references/使用HiLog打印日志（C_C++）.md) - C/C++接口流水日志打印开发指导

### 性能跟踪（HiTraceMeter）

- [HiTraceMeter介绍](references/HiTraceMeter介绍.md) - HiTraceMeter性能跟踪功能介绍
- [使用HiTraceMeter跟踪性能（ArkTS）](references/使用HiTraceMeter跟踪性能（ArkTS）.md) - ArkTS接口性能跟踪开发指导
- [使用HiTraceMeter跟踪性能（C_C++）](references/使用HiTraceMeter跟踪性能（C_C++）.md) - C/C++接口性能跟踪开发指导
- [查看HiTraceMeter日志](references/查看HiTraceMeter日志.md) - HiTraceMeter日志查看方法

### 分布式调用链跟踪（HiTraceChain）

- [HiTraceChain介绍](references/HiTraceChain介绍.md) - HiTraceChain跨线程/跨进程跟踪功能介绍
- [使用HiTraceChain打点（ArkTS）](references/使用HiTraceChain打点（ArkTS）.md) - ArkTS接口调用链打点开发指导
- [使用HiTraceChain打点（C_C++）](references/使用HiTraceChain打点（C_C++）.md) - C/C++接口调用链打点开发指导

### 调试信息与检测

- [HiDebug能力概述](references/HiDebug能力概述.md) - HiDebug获取应用和系统资源使用情况的能力介绍
- [HiDebug接口使用示例(ArkTS)](references/HiDebug接口使用示例(ArkTS).md) - ArkTS接口HiDebug使用示例
- [HiDebug接口使用示例(C_C++)](references/HiDebug接口使用示例(C_C++).md) - C/C++接口HiDebug使用示例
- [使用HiChecker检测问题（ArkTS）](references/使用HiChecker检测问题（ArkTS）.md) - HiChecker检测线程耗时和资源泄漏问题
- [使用HiCollie监控函数执行时间超长问题（C_C++）](references/使用HiCollie监控函数执行时间超长问题（C_C++）.md) - HiCollie监控函数超时
- [使用HiCollie检测业务线程卡死卡顿问题（C_C++）](references/使用HiCollie检测业务线程卡死卡顿问题（C_C++）.md) - HiCollie检测线程卡死卡顿

### 错误管理与恢复

- [错误管理开发指导](references/错误管理开发指导.md) - 捕获应用运行时异常的能力
- [应用恢复开发指导](references/应用恢复开发指导.md) - 应用非预期退出后的状态和数据自恢复

### 调试命令工具

- [hdc](references/hdc.md) - HarmonyOS设备连接器命令工具
- [hilog](references/hilog.md) - 日志查询命令工具
- [hilogtool](references/hilogtool.md) - 日志工具命令
- [hitrace](references/hitrace.md) - 跟踪采集命令工具
- [hiperf](references/hiperf.md) - 性能采样命令工具
- [hiprofiler](references/hiprofiler.md) - 性能分析命令工具
- [hidumper](references/hidumper.md) - 系统信息导出命令工具
- [uinput](references/uinput.md) - 输入事件注入命令工具
- [PrivacyManagerService](references/PrivacyManagerService.md) - 隐私管理服务

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `78` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **24h功耗器件分解统计事件介绍** — 24h功耗器件分解统计事件用于统计应用在一天内的耗电统计信息，包含前后台使用时长以及耗电分解信息，每日0点统计应用耗电数据并上报。 如需了解如何使用HiAppEvent提供订阅24h功耗器件分解统计事件，请参考以下文档。目前仅提供ArkTS接口。 - 订阅24h功耗器件分解统计事件（ArkTS） ![](https://contentcenter-vali-… [`references/24h功耗器件分解统计事件介绍.md`](<references/24h功耗器件分解统计事件介绍.md>)
- **AddrSanitizer（地址越界）检测** — 地址越界问题是指访问了不合法的地址，导致程序运行出现异常，通常表现为应用崩溃（Crash），其故障原因为释放后使用（use after free）、重复释放（double-free）、栈溢出（stack-overflow）、堆溢出（heap-overflow）等。由于应用崩溃日志信息有限且非崩溃第一现场，地址越界问题定位较为困难，一般依赖ASan、HWASa… [`references/AddrSanitizer（地址越界）检测.md`](<references/AddrSanitizer（地址越界）检测.md>)
- **App Killed（应用终止）检测** — 应用闪退指应用在使用过程中突然异常终止。当应用行为异常，比如消耗过多CPU、内存等系统资源时，系统为了保持整机健康状态，会按照规则挑选应用进行管控，通常通过服务进程向应用发送SIGKILL信号（信号值是9）来实施终止的。操作系统对SIGKILL的默认行为是不生成栈日志等维测信息的，导致应用闪退时faultlogger中无日志。 #### 基本概念 应用退出通… [`references/App Killed（应用终止）检测.md`](<references/App Killed（应用终止）检测.md>)
- **AppFreeze（应用冻屏）检测** — 用户在使用应用时，如果出现点击无反应或应用无响应等情况，并且持续时间超过一定限制，就会被定义为应用冻屏（AppFreeze），即应用无响应。系统会检测应用无响应，并生成AppFreeze日志，供应用开发者分析。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_sc… [`references/AppFreeze（应用冻屏）检测.md`](<references/AppFreeze（应用冻屏）检测.md>)
- **ArkWeb抛滑丢帧事件介绍** — ArkWeb 提供了Web组件，用于在应用程序中显示Web页面内容，为开发者提供了丰富的控制Web页面能力。页面滑动一般分为两个阶段：拖滑和抛滑。拖滑指触摸屏幕时的滑动。抛滑指在手指离开屏幕后，页面仍以一定速度滑动。从API version 23开始，支持订阅ArkWeb抛滑丢帧事件，用户在使用应用时滑动web页面，如果出现抛滑丢帧且卡顿持续时间超过50ms… [`references/ArkWeb抛滑丢帧事件介绍.md`](<references/ArkWeb抛滑丢帧事件介绍.md>)
- **CPU高负载事件介绍** — CPU高负载事件用于检测应用在前台或后台时，应用相关的进程使用CPU资源超过系统的门限，导致手机发热等问题。 CPU高负载事件包含以下3类： 1. 前台CPU高负载异常：5分钟内应用平均负载大于30%。 2. 后台CPU高负载异常：5分钟内应用平均负载大于10%。 3. 线程CPU高负载异常：1分钟内单线程平均负载大于70%。 如需了解如何使用HiAppEv… [`references/CPU高负载事件介绍.md`](<references/CPU高负载事件介绍.md>)
- **Cpp Crash（进程崩溃）检测** — 进程发生崩溃后，系统首先感知到崩溃，然后抓取崩溃相关的信息，最后生成崩溃日志并上报崩溃事件，为开发者提供详细的维测日志以辅助故障定位。本文分为基本概念、实现原理、约束与限制、日志获取、日志规格五个小节介绍系统提供的CppCrash检测方法。开发者如果想进一步了解如何分析CppCrash问题，请参见 CppCrash类问题分析方法 。 #### 基本概念 - … [`references/Cpp Crash（进程崩溃）检测.md`](<references/Cpp Crash（进程崩溃）检测.md>)
- **HiAppEvent介绍** — HiAppEvent是系统为应用开发者提供的事件订阅和事件打点机制，支持记录应用运行过程中的故障、统计、安全和行为事件，帮助开发者定位问题、分析应用运行情况，统计访问量、用户活跃度、操作习惯以及其他影响用户使用产品的关键因素。 #### 基本概念 **打点** ：记录用户操作引起的变化，提供业务数据信息，供开发、产品、运维分析。 - 事件领域：标识事件的领域… [`references/HiAppEvent介绍.md`](<references/HiAppEvent介绍.md>)
- **HiAppEvent常见问题** — **问题现象** 在开发调试阶段，崩溃、应用冻屏等故障发生后，无法在DevEco Studio的HiLog窗口中获取已通过HiAppEvent订阅的事件内容。 **可能的原因&解决措施** 发生崩溃、应用冻屏等故障后，应用已退出。 解决办法：再次启动应用，查看相应的事件内容。 #### 无法获取external_log日志文件 **问题现象** Hilog中… [`references/HiAppEvent常见问题.md`](<references/HiAppEvent常见问题.md>)
- **HiDebug接口使用示例(ArkTS)** — HiDebug ArkTS接口功能独立，需要获取调试信息时直接调用。具体调用方式请参考 @ohos.hidebug 中的示例。 #### 开发示例 本文以获取系统CPU使用率为例，展示如何调用HiDebug ArkTS接口。 1. 使用DevEco Studio新建工程，选择“Empty Ability”。 2. 在Project窗口单击entry > sr… [`references/HiDebug接口使用示例(ArkTS).md`](<references/HiDebug接口使用示例(ArkTS).md>)
- **HiDebug接口使用示例(C/C++)** — HiDebug C/C++接口功能独立，需要获取调试信息时直接调用。具体调用示例请参考下文。 #### 通用开发示例 下文展示如何在应用内使用HiDebug NDK接口以进行线程栈回溯，且获取进程内线程的CPU使用率： 步骤一：创建项目 1. 使用DevEco Studio新建一个Native C++工程，并新增文件“test_backtrace.cpp”与… [`references/HiDebug接口使用示例(C_C++).md`](<references/HiDebug接口使用示例(C_C++).md>)
- **HiDebug能力概述** — HiDebug可用于获取系统或应用进程的内存、CPU和GPU等数据，以及开启进程Trace采集。 本文介绍HiDebug模块中的ArkTS和C/C++接口，并按接口能力分类。 接口详情可查看 @ohos.hidebug 及 hidebug.h 。 #### 约束限制 该模块的接口调用较为耗时，部分接口调用时长可达秒级，导致调用线程卡顿。且基于HiDebug模… [`references/HiDebug能力概述.md`](<references/HiDebug能力概述.md>)
- **HiTraceChain介绍** — HiTraceChain是基于分布式跟踪调用链思想，在端侧业务流程（涉及跨线程、跨进程、跨设备）中的一种轻量级分布式跟踪的实现。HiTraceChain在业务流程中生成和传递唯一跟踪标识，在业务流程输出的各类信息中（包括HiTraceMeter打点、应用事件、hilog日志等）记录该跟踪标识。在调试、问题定位的过程中，开发者可以通过该唯一跟踪标识将本次业务流… [`references/HiTraceChain介绍.md`](<references/HiTraceChain介绍.md>)
- **HiTraceMeter介绍** — 本文介绍HiTraceMeter接口的使用方法。开发者可以在代码中调用HiTraceMeter接口进行trace打点，然后可使用 hitrace 命令行工具或者 hidebug 提供的trace采集接口，获取程序运行时产生的打点信息，了解程序运行的进程、线程、时间戳、CPU等信息，以帮助开发者进行问题分析和性能调优。 HiTraceMeter提供ArkTS和… [`references/HiTraceMeter介绍.md`](<references/HiTraceMeter介绍.md>)
- **JS Crash（进程崩溃）检测** — 在ArkTS应用中，Crash（崩溃）检测是一项重要的监控能力，它可以帮助开发者及时发现和修复应用中的问题。 #### 检测原理 方舟运行时捕获进程异常。生成故障日志的流程如下： 1. 当代码执行时，未捕获的异常或错误导致应用崩溃，方舟运行时将捕获这些异常。 2. 方舟运行时收集故障信息，并将其上报给维测进程Hiview。 3. 维测进程Hiview补充仅其… [`references/JS Crash（进程崩溃）检测.md`](<references/JS Crash（进程崩溃）检测.md>)
- **Performance Analysis Kit术语** — Log版本是指在系统中开启了日志记录功能的系统版本。这种版本会记录系统运行时的各种信息，包括应用程序的运行情况、系统错误信息、调试信息等等。这些信息可以通过hdc工具或者第三方应用程序查看和分析，有助于开发者进行调试和优化。 在设备中， 点击 “设置”->搜索关键字“关于本机”->“软件版本”进行查看，log版本会以“log”结尾。如：BRA-AL00 5.… [`references/Performance Analysis Kit术语.md`](<references/Performance Analysis Kit术语.md>)
- **Performance Analysis Kit简介** — Performance Analysis Kit（性能分析服务）为开发者提供应用事件、日志、跟踪分析工具，可观测应用运行时状态，用于行为分析、故障分析、安全分析、统计分析，帮助开发者持续改进应用体验。 Performance Analysis Kit承载着HarmonyOS DFX子系统面向应用开发者提供的提升应用质量能力集合，详见 应用质量概览 。 ###… [`references/Performance Analysis Kit简介.md`](<references/Performance Analysis Kit简介.md>)
- **PrivacyManagerService** — PrivacyManagerService是访问控制基于 hidumper 增强开发的命令行能力，可显示访问控制基础信息，获取敏感权限使用记录。 #### 环境准备 根据hidumper工具指导，完成 环境准备 。 #### 获取帮助信息 如果需要查看帮助信息，可以通过下列命令实现。 hidumper -s PrivacyManagerService -a … [`references/PrivacyManagerService.md`](<references/PrivacyManagerService.md>)
- **Resource Leak（资源泄漏）检测** — 资源泄漏是指句柄、线程或内存等资源，在应用运行过程中没有被正确释放，导致资源被长期占用且无法被其他应用使用，如果某一类资源耗尽，系统可能出现卡死或重启等异常情况。为了应对资源泄漏问题，系统会提供资源泄漏检测、判决、维测日志抓取、日志上报的能力，为开发者提供详细的维测日志以辅助故障定位。本文将主要介绍 资源泄漏检测能力 以及 资源泄漏日志的规格 。 #### … [`references/Resource Leak（资源泄漏）检测.md`](<references/Resource Leak（资源泄漏）检测.md>)
- **hdc** — hdc（HarmonyOS Device Connector）是提供给开发人员的命令行调试工具，用于与设备进行交互调试、数据传输、日志查看以及应用安装等操作。该工具支持在Windows/Linux/MacOS系统上运行，为开发者提供高效，便捷的设备调试能力。 hdc包含三部分： **客户端（client）** ：运行在电脑端的进程，开发者在执行hdc命令时启… [`references/hdc.md`](<references/hdc.md>)
- **hidumper** — HiDumper是用于统一系统信息导出的命令行工具，支持分析CPU、内存、存储等系统资源使用情况，查询系统服务运行情况，定位资源使用异常、通信等相关问题。 针对HiDumper所支撑的使用场景，本章节将介绍其查询内存信息、查询CPU使用情况、查询系统能力、查询进程信息、查询存储信息、查询系统信息等基础功能，以及系统故障日志获取，进程间通信记录导出，导出信息支… [`references/hidumper.md`](<references/hidumper.md>)
- **hilog** — HiLog日志系统，提供给系统框架、服务、以及应用，用于打印日志，记录用户操作、系统运行状态等。开发者可以通过hilog命令行查询相关日志信息。 #### 环境要求 - 根据hdc命令行工具指导，完成 环境准备 。 - 确保设备已正常连接，并执行hdc shell。 #### hilog概述 #### hilog日志生成 业务代码中，如果调用了HiLog接口… [`references/hilog.md`](<references/hilog.md>)
- **hilogtool** — 当前hilog日志为编码后二进制形式保存的gz格式文件，开发者从设备/data/log/hilog路径下导出后无法直接解压查看，需要使用hilogtool工具进行解析，将转换为明文hilog日志。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100… [`references/hilogtool.md`](<references/hilogtool.md>)
- **hiperf** — hiperf是一款集成多种性能分析功能的命令行工具，可用于分析系统性能瓶颈、定位软件热点及优化代码效率，支持采集和统计程序运行时的性能数据。 开发者可以通过 Deveco Studio 或 SmartPerf 使用hiperf采集函数的调用栈，获取调用栈上各层函数的执行时间，通过泳道图等方式查看调用链信息进而进行性能分析，具体使用方式参考 通过Deveco … [`references/hiperf.md`](<references/hiperf.md>)
- **hiprofiler** — HiProfiler调优组件旨在为开发者提供一系列调优能力，可以用来帮助分析内存、性能等问题。 整体架构包括PC端和设备端。主体部分是PC端的数据展示页面和设备端的性能调优服务。PC端和设备端服务采用C/S模型，PC端的调优数据在 DevEco Studio 和 Smartperf 网页中展示。设备端程序运行在系统环境中，包含多个部分，其中hiprofile… [`references/hiprofiler.md`](<references/hiprofiler.md>)
- **hitrace** — hitrace命令行工具提供trace信息采集能力，支持采集系统提供的打点和开发者使用 HitraceMeter接口 在应用中设置的打点。该工具支持多种方式采集文本格式或二进制格式的trace信息，帮助开发者观测程序运行情况和定位故障问题。 #### 环境要求 - 根据hdc命令行工具指导，完成 hdc环境准备 。 - 确保设备已正常连接，并执行hdc sh… [`references/hitrace.md`](<references/hitrace.md>)
- **uinput** — uinput 可模拟用户操作，例如鼠标、键盘、触控板等设备，适用于稳定性等压力测试。 #### 环境要求 - 根据hdc命令行工具指导，完成 环境准备 。 - 确保设备已成功连接，并执行hdc shell。 #### uinput功能 **用法** uinput <option> <command> <arg> ... **支持能力** ![](https:… [`references/uinput.md`](<references/uinput.md>)
- **主线程超时事件介绍** — 当应用的主线程执行耗时任务时，开发者会感知到应用卡顿，但卡顿时间未达到系统设定的 应用冻屏 时间限制，因此不会生成故障日志。为了更好地定位和分析问题，开发者可以查看 主线程超时事件检测原理 ，根据生成的 主线程超时事件日志规格 ，分析主线程任务的执行情况。 本文面向开发者介绍主线程超时检测原理，以及各字段的含义和规格。如需了解如何使用HiAppEvent接口… [`references/主线程超时事件介绍.md`](<references/主线程超时事件介绍.md>)
- **事件订阅简介** — HiAppEvent能够订阅应用事件和系统事件。 #### 应用事件 应用事件由开发者自行定义，例如点击按钮。应用事件的事件参数对象params包含的字段来源于应用，由开发者通过打点接口 write 自定义配置。具体字段含义根据开发者需求确定。 #### 系统事件 系统事件是指应用运行期间发生的性能、功耗、稳定性等问题。系统事件的事件参数对象params包含… [`references/事件订阅简介.md`](<references/事件订阅简介.md>)
- **事件订阅（ArkTS）** — HiAppEvent提供了事件订阅接口，用于获取应用的事件。 #### 接口说明 API接口使用说明，包括参数使用限制和具体取值范围。请参考 @ohos.hiviewdfx.hiAppEvent 。 **订阅接口功能介绍** ： ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAl… [`references/事件订阅（ArkTS）.md`](<references/事件订阅（ArkTS）.md>)
- **事件订阅（C/C++）** — HiAppEvent提供了事件订阅接口，用于订阅并接收应用产生的事件。 #### 接口说明 API接口的使用说明，包括参数使用限制和取值范围，请参考 hiappevent.h 。 **订阅接口功能介绍** ： **打点接口功能介绍** ： #### 事件订阅开发指导 以订阅崩溃事件（系统事件）和按钮点击事件（应用事件）为例，说明开发步骤。 #### 步骤一：… [`references/事件订阅（C_C++）.md`](<references/事件订阅（C_C++）.md>)
- **任务执行超时事件介绍** — 任务执行超时指要监控的业务代码逻辑执行时长超过业务逻辑预期时间。为了更好地定位和分析问题，开发者可以利用 任务执行超时检测 机制，根据生成的 日志规格 ，主动分析任务执行超时的执行情况。 本文面向开发者介绍任务执行超时检测原理，以及各字段的含义和规格。如需了解如何使用HiAppEvent接口订阅任务执行超时事件，请参考以下文档。目前提供ArkTS和C/C++… [`references/任务执行超时事件介绍.md`](<references/任务执行超时事件介绍.md>)
- **任务超时检测** — 开发者在开发应用时，某一段业务逻辑期望执行一定时间，如果该业务逻辑执行时长超过预期时间，即为任务超时。 任务超时检测主要包括主线程超时检测和任务执行超时检测，二者均可使用HiCollie实现自定义时长来对开发者选择的业务逻辑进行主动检测，主线程超时也可采用默认时长进行检测。详见： HiCollie使用指导 。 ![](https://contentcente… [`references/任务超时检测.md`](<references/任务超时检测.md>)
- **使用FaultLogExtensionAbility订阅事件** — 从API version 21开始，可以在FaultLogExtensionAbility中使用HiAppEvent事件订阅接口，实现应用故障事件（仅包括 崩溃事件 和 应用冻屏事件 ）的延迟通知。应用因崩溃或冻屏退出后，无法启动或长时间未启动的场景下，可以不依赖应用启动实现故障事件信息的订阅回调。FaultLogExtensionAbility仅用于补充处… [`references/使用FaultLogExtensionAbility订阅事件.md`](<references/使用FaultLogExtensionAbility订阅事件.md>)
- **使用HiChecker检测问题（ArkTS）** — HiChecker可以作为应用开发阶段使用的检测能力，用于检测代码运行过程中部分易忽略的问题，如应用线程出现耗时调用、应用进程中元能力资源泄露等问题。开发者可以通过日志记录或进程crash等形式查看具体问题并进行修改，提升应用的使用体验。 #### 基本概念 **规则常量** ：HiChecker使用常量来表示已有的告警规则或者检测规则，一个常量表示一种规则… [`references/使用HiChecker检测问题（ArkTS）.md`](<references/使用HiChecker检测问题（ArkTS）.md>)
- **使用HiCollie检测业务线程卡死卡顿问题（C/C++）** — 用户在使用应用时，如果出现点击无反应或应用无响应等情况，并且持续时间超过一定限制，就会被定义为 应用冻屏 。本文面向开发者介绍HiCollie模块对外提供检测业务线程卡死、卡顿，以及上报卡死事件的能力。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_… [`references/使用HiCollie检测业务线程卡死卡顿问题（C_C++）.md`](<references/使用HiCollie检测业务线程卡死卡顿问题（C_C++）.md>)
- **使用HiCollie监控函数执行时间超长问题（C/C++）** — 任务执行超时指要监控的业务代码逻辑执行时长超过业务逻辑预期时间。本文面向开发者介绍HiCollie模块对外提供函数执行时间超长的检测能力。 #### 接口说明 - API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 HiCollie 。 - 函数执行时间超长故障日志以syswarning-开头，生成在“设备/data/log/warninglog… [`references/使用HiCollie监控函数执行时间超长问题（C_C++）.md`](<references/使用HiCollie监控函数执行时间超长问题（C_C++）.md>)
- **使用HiLog打印日志（ArkTS）** — 在应用开发过程中，可在关键代码处输出日志信息。在运行应用后，通过查看日志信息来分析应用执行情况（如应用是否正常运行、代码运行时序、运行逻辑分支是否正常等）。 系统提供不同的API供开发者调用并输出日志信息，即HiLog与Console。两个API在使用时略有差异，本文重点介绍HiLog的用法，Console的具体用法可查看API参考 Console 。 ##… [`references/使用HiLog打印日志（ArkTS）.md`](<references/使用HiLog打印日志（ArkTS）.md>)
- **使用HiLog打印日志（C/C++）** — 在应用开发过程中，可在关键代码处输出日志信息。在运行应用后，通过查看日志信息来分析应用执行情况（如应用是否正常运行、代码运行时序、运行逻辑分支是否正常等）。 HiLog日志系统，提供给系统框架、服务、以及应用，用于打印日志，记录用户操作、系统运行状态等。 #### 接口说明 HiLog中定义了DEBUG、INFO、WARN、ERROR、FATAL五种日志级别… [`references/使用HiLog打印日志（C_C++）.md`](<references/使用HiLog打印日志（C_C++）.md>)
- **使用HiTraceChain打点（ArkTS）** — 分布式跟踪接口由HiTraceChain模块提供，详细API请参考 @ohos.hiTraceChain (分布式跟踪) 。 #### 开发步骤 HiTraceChain在ArkTS中的使用方法参考以下示例，开发者可参考 约束与限制 ，了解常见的支持与不支持HiTraceChain自动传递的机制。 #### async/await和promise/then异… [`references/使用HiTraceChain打点（ArkTS）.md`](<references/使用HiTraceChain打点（ArkTS）.md>)
- **使用HiTraceChain打点（C/C++）** — 分布式跟踪接口由HiTraceChain模块提供，详细API请参考 trace.h 。 下表所示的接口提供基本的分布式跟踪功能，ArkTS中也有相应的接口。 下表所示的接口提供对HiTraceId的一些拓展操作，这些接口仅在C/C++中提供。 #### 开发步骤 std::thread不支持自动传递HiTraceId，开发示例展示了该场景下分布式跟踪的使用方… [`references/使用HiTraceChain打点（C_C++）.md`](<references/使用HiTraceChain打点（C_C++）.md>)
- **使用HiTraceMeter跟踪性能（ArkTS）** — HiTraceMeter提供系统性能打点接口。开发者在关键代码位置调用这些API，能够有效跟踪进程轨迹，查看系统和应用性能。 #### 接口说明 性能打点跟踪接口由HiTraceMeter模块提供，详细API请参考 @ohos.hiTraceMeter (性能打点) 。 ![](https://contentcenter-vali-drcn.dbankcdn… [`references/使用HiTraceMeter跟踪性能（ArkTS）.md`](<references/使用HiTraceMeter跟踪性能（ArkTS）.md>)
- **使用HiTraceMeter跟踪性能（C/C++）** — HiTraceMeter提供系统性能打点接口。开发者在关键代码位置调用这些API，能够有效跟踪进程轨迹，查看系统和应用性能。 #### 接口说明 性能打点跟踪接口由HiTraceMeter模块提供，详细API请参考 trace.h 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/Develope… [`references/使用HiTraceMeter跟踪性能（C_C++）.md`](<references/使用HiTraceMeter跟踪性能（C_C++）.md>)
- **功耗检测** — 功耗检测主要提供CPU高负载检测，可以通过订阅相关事件实现检测。 如需了解如何使用HiAppEvent提供订阅CPU高负载事件，请参考以下文档。目前仅提供ArkTS接口。 - 订阅CPU高负载事件（ArkTS） #### 实现原理 系统会周期性及在特定条件（如前后台切换）下，采集三方应用在CPU上的运行时间，并每5分钟统计一次前5分钟的平均负载。若负载超过设… [`references/功耗检测.md`](<references/功耗检测.md>)
- **启动耗时事件介绍** — 用户在使用应用时，如果出现点击应用后启动缓慢的情况，并且整个过程超过了一定的时间，就会被定义为启动耗时事件。系统会采集相关流程耗时，并生成HiappEvent事件，供应用开发者分析。 如何使用HiAppEvent提供订阅启动耗时事件的接口可参见以下文档： - 订阅启动耗时事件（ArkTS） ![](https://contentcenter-vali-drc… [`references/启动耗时事件介绍.md`](<references/启动耗时事件介绍.md>)
- **地址越界事件介绍** — 地址越界问题是指访问了不合法的地址，导致程序运行出现异常，通常表现为应用崩溃。 开发者可通过HiAppEvent接口订阅地址越界事件，请参考以下文档。目前提供ArkTS和C/C++两种接口，按需选择。 - 订阅地址越界事件（ArkTS） - 订阅地址越界事件（C/C++） ![](https://contentcenter-vali-drcn.dbankcd… [`references/地址越界事件介绍.md`](<references/地址越界事件介绍.md>)
- **崩溃事件介绍** — 崩溃是指应用进程非预期退出，以下两种场景会生成崩溃事件： 1. Native代码未处理 崩溃信号 时，会生成NativeCrash类型崩溃事件。 2. ArkTS/JS代码未处理异常时，会生成JsError类型崩溃事件。 本文面向开发者介绍崩溃事件检测原理，以及各字段的含义和规格。如需了解如何使用HiAppEvent接口订阅系统崩溃事件，请参考以下文档。目前… [`references/崩溃事件介绍.md`](<references/崩溃事件介绍.md>)
- **应用冻屏事件介绍** — 用户在使用应用时，如果出现点击无反应或应用无响应等情况，并且持续时间超过一定限制，就会被定义为应用冻屏，也被称为应用无响应。为了应对应用冻屏问题，系统会提供应用冻屏检测、维测日志抓取、日志上报的能力，为开发者提供详细的维测日志以辅助故障定位。 本文面向开发者介绍AppFreeze（应用冻屏）检测原理，以及各字段的含义和规格。如需了解如何使用HiAppEven… [`references/应用冻屏事件介绍.md`](<references/应用冻屏事件介绍.md>)
- **应用恢复开发指导** — 应用在运行中不可避免会产生一些非预期的行为，如运行时抛出未处理的异常和错误，违反框架的调用/运行约束等。 系统默认对异常的处理方式为进程退出，如果应用使用过程中产生了用户数据，直接退出可能会导致用户工作中断，数据丢失。 如果应用在 AbilityStage 中使能 应用恢复功能 ，并对临时数据进行保存，应用非预期退出后的下一次启动会恢复先前的状态和数据，给用… [`references/应用恢复开发指导.md`](<references/应用恢复开发指导.md>)
- **应用终止事件介绍** — 从API version 20开始，HiAppEvent提供接口用于订阅应用终止事件。 应用终止是指应用程序被系统强制退出的一种现象。与应用崩溃不同，终止并非源于应用自身业务代码的异常，而是主要归因于系统基于资源管控策略而对应用实施的终止行为。 HiAppEvent提供接口用于订阅应用终止事件。 - 订阅应用终止事件（ArkTS） - 订阅应用终止事件（C/… [`references/应用终止事件介绍.md`](<references/应用终止事件介绍.md>)
- **性能检测** — 启动耗时事件是用于度量应用启动过程在系统可感知阶段耗时的事件，主要是针对用户可感知的应用启动过程进行性能度量，包括桌面启动、状态栏启动、最近任务列表启动等场景。开发者订阅此事件可以获取到启动过程中关键阶段耗时。 #### 实现原理 启动事件统计时间起点为用户点击屏幕，默认结束点为启动动效完成，使用者可调用 reportDrawCompleted 接口根据实际… [`references/性能检测.md`](<references/性能检测.md>)
- **查看HiTraceMeter日志** — 使用DevEco Studio Profiler工具可以可视化展示HiTraceMeter日志内容，分析应用或服务的CPU使用率和线程运行状态，查看指定时间段内程序在CPU上的执行耗时。具体使用指导请参考 CPU活动分析 。 #### 通过命令行工具查看 1. 根据hdc命令行工具指导，完成 hdc环境准备 ，确保可以使用“hdc shell”命令正常连接设… [`references/查看HiTraceMeter日志.md`](<references/查看HiTraceMeter日志.md>)
- **滑动丢帧事件介绍** — 用户在使用应用时，如果出现滑动列表丢帧的情况，并且持续时间超过一定限制，就会被定义为滑动卡顿，并生成HiAppEvent日志，供应用开发者分析。 如何使用HiAppEvent提供订阅滑动丢帧事件的接口可参见以下文档： - 订阅滑动丢帧事件（ArkTS） ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2… [`references/滑动丢帧事件介绍.md`](<references/滑动丢帧事件介绍.md>)
- **简介** — 基于 Performance Analysis Kit（性能分析服务），为开发者提供了完善的故障检测、异常处理等能力。由于故障种类繁多，产品和软件业务不同，故障的原因和表现也千差万别，从而导致应用的稳定性发生劣化，严重影响应用开发效率、交付成本以及用户体验。因此需要开发者通过开发态和运行态的故障管理设计来提升版本质量，包括故障检测、故障分析、定位、恢复、质量… [`references/简介.md`](<references/简介.md>)
- **订阅24h功耗器件分解统计事件（ArkTS）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent (应用事件打点)ArkTS API文档 。 #### 开发步骤 以实现对应用内多线程执行耗时操作生成的24h功耗器件分解统计事件订阅为例，说明开发步骤。 1. 编辑工程中的“entry > src > main > ets > entryab… [`references/订阅24h功耗器件分解统计事件（ArkTS）.md`](<references/订阅24h功耗器件分解统计事件（ArkTS）.md>)
- **订阅ArkWeb抛滑丢帧事件（ArkTS）** — 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅ArkWeb抛滑丢帧事件。接口的详细使用说明（参数限制、取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 #### 接口说明 #### 开发步骤 以订阅ArkWeb抛滑丢帧事件为例，说明开发步骤。 1. 在DevEco Studio中新建工程，选择“Empty Abili… [`references/订阅ArkWeb抛滑丢帧事件（ArkTS）.md`](<references/订阅ArkWeb抛滑丢帧事件（ArkTS）.md>)
- **订阅CPU高负载事件（ArkTS）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent (应用事件打点)ArkTS API文档 。 #### 开发步骤 以实现应用内多线程执行死循环生成的CPU高负载事件订阅为例，说明开发步骤。 1. 新建一个ArkTS应用工程，编辑工程中的“entry > src > main > ets > … [`references/订阅CPU高负载事件（ArkTS）.md`](<references/订阅CPU高负载事件（ArkTS）.md>)
- **订阅主线程超时事件（ArkTS）** — 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅主线程超时事件。接口的详细使用说明（参数限制、取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 #### 接口说明 #### 开发步骤 #### 添加事件观察者 以主线程超时事件订阅为例，说明开发步骤。 1. 新建一个ArkTS应用工程，编辑工程中的“entry > sr… [`references/订阅主线程超时事件（ArkTS）.md`](<references/订阅主线程超时事件（ArkTS）.md>)
- **订阅主线程超时事件（C/C++）** — 本文介绍如何使用HiAppEvent提供的C/C++接口订阅主线程超时事件。接口的详细使用说明（参数限制、取值范围等）请参考 hiappevent.h 。 #### 接口说明 #### 开发步骤 #### 添加事件观察者 1. 获取该示例工程依赖的jsoncpp文件，从 三方开源库jsoncpp代码仓 下载源码的压缩包，并按照README的 **Amalga… [`references/订阅主线程超时事件（C_C++）.md`](<references/订阅主线程超时事件（C_C++）.md>)
- **订阅任务执行超时事件（ArkTS）** — 从API version 21开始，支持arkTS接口订阅任务执行超时事件。 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅任务执行超时事件。接口的详细使用说明（参数限制、取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 #### 接口说明 #### 开发步骤 #### 添加事件观察者 为确保开发阶段顺利接收事件回调… [`references/订阅任务执行超时事件（ArkTS）.md`](<references/订阅任务执行超时事件（ArkTS）.md>)
- **订阅任务执行超时事件（C/C++）** — 本文介绍如何使用HiAppEvent提供的C/C++接口订阅任务执行超时事件。接口的详细使用说明（参数限制、取值范围等）请参考 hiappevent.h 。 #### 接口说明 #### 开发步骤 #### 添加事件观察者 以实现对用户点击按钮触发卡顿场景生成的卡顿事件订阅为例，说明开发步骤。 1. 获取该示例工程依赖的jsoncpp文件，打开链接 HiAp… [`references/订阅任务执行超时事件（C_C++）.md`](<references/订阅任务执行超时事件（C_C++）.md>)
- **订阅启动耗时事件（ArkTS）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent (应用事件打点)ArkTS API文档 。 #### 开发步骤 以实现对用户运行应用工程生成的启动耗时事件订阅为例，说明开发步骤。 1. 编辑工程中的“entry > src > main > ets > entryability > Ent… [`references/订阅启动耗时事件（ArkTS）.md`](<references/订阅启动耗时事件（ArkTS）.md>)
- **订阅地址越界事件（ArkTS）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 #### 开发步骤 以实现对写数组越界场景生成的地址越界事件订阅为例，说明开发步骤。 #### 步骤一：新建工程 1. 新建Native C++工程，目录结构如下： entry: src: main: cpp: - types: libe… [`references/订阅地址越界事件（ArkTS）.md`](<references/订阅地址越界事件（ArkTS）.md>)
- **订阅地址越界事件（C/C++）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 hiappevent.h 。 **订阅接口功能介绍** ： #### 开发步骤 以实现对写数组越界场景生成的地址越界事件订阅为例，说明开发步骤。 #### 步骤一：新建工程 1. 参考 三方开源库jsoncpp代码仓 README中 **Using JsonCpp in your project… [`references/订阅地址越界事件（C_C++）.md`](<references/订阅地址越界事件（C_C++）.md>)
- **订阅崩溃事件（ArkTS）** — 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅应用崩溃事件。接口的详细使用说明（参数限制、取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3… [`references/订阅崩溃事件（ArkTS）.md`](<references/订阅崩溃事件（ArkTS）.md>)
- **订阅崩溃事件（C/C++）** — 本文介绍如何使用HiAppEvent提供的C/C++接口订阅应用崩溃事件。详细使用说明请参考 hiappevent.h 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/vkV8FFzURcWZAkhM_QYAKA/note_… [`references/订阅崩溃事件（C_C++）.md`](<references/订阅崩溃事件（C_C++）.md>)
- **订阅应用冻屏事件（ArkTS）** — 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅应用冻屏事件。接口的详细使用说明（参数限制、取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 #### 接口说明 #### 开发步骤 #### 添加事件观察者 以订阅应用冻屏事件为例，说明开发步骤。 1. 新建一个ArkTS应用工程，编辑工程中的“entry > src … [`references/订阅应用冻屏事件（ArkTS）.md`](<references/订阅应用冻屏事件（ArkTS）.md>)
- **订阅应用冻屏事件（C/C++）** — 本文介绍如何使用HiAppEvent提供的C/C++接口订阅应用冻屏事件。接口的详细使用说明（参数限制、取值范围等）请参考 hiappevent.h 。 #### 接口说明 #### 开发步骤 #### 添加事件观察者 以订阅应用冻屏事件为例，说明开发步骤。 1. 获取该示例工程依赖的jsoncpp文件，从 三方开源库jsoncpp代码仓 下载源码的压缩包，… [`references/订阅应用冻屏事件（C_C++）.md`](<references/订阅应用冻屏事件（C_C++）.md>)
- **订阅应用终止事件（ArkTS）** — 请参考 应用终止事件介绍 。 #### 接口说明 API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent (应用事件打点) 。 #### 开发步骤 为确保开发阶段顺利接收事件回调，建议采用以下方案：创建新的Native C++工程，在ArkTs代码中实现订阅，搭配C++代码的故障注入代码构造故障以… [`references/订阅应用终止事件（ArkTS）.md`](<references/订阅应用终止事件（ArkTS）.md>)
- **订阅应用终止事件（C/C++）** — 请参考 应用终止事件介绍 。 #### 接口说明 API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 HiAppEvent 。 **订阅接口功能介绍：** #### 开发步骤 1. 新建Native C++工程，并将jsoncpp导入到新建工程内，目录结构如下： entry: src: main: cpp: - json: - json.h - … [`references/订阅应用终止事件（C_C++）.md`](<references/订阅应用终止事件（C_C++）.md>)
- **订阅滑动丢帧事件（ArkTS）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent (应用事件打点)ArkTS API文档 。 #### 开发步骤 以实现对用户滑动列表触发丢帧生成的滑动丢帧事件订阅为例，说明开发步骤。 1. 编辑工程中的“entry > src > main > ets > entryability > E… [`references/订阅滑动丢帧事件（ArkTS）.md`](<references/订阅滑动丢帧事件（ArkTS）.md>)
- **订阅资源泄漏事件（ArkTS）** — 本文介绍如何使用HiAppEvent提供的ArkTS接口订阅资源泄漏事件。接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent 。 #### 自定义参数设置接口描述 #### 自定义配置设置接口描述 #### 接口描述 #### 开发步骤 以订阅发生内存泄漏场景生成的资源泄漏事件为例，说明开发步骤。 … [`references/订阅资源泄漏事件（ArkTS）.md`](<references/订阅资源泄漏事件（ArkTS）.md>)
- **订阅资源泄漏事件（C/C++）** — 本文介绍如何使用HiAppEvent提供的C/C++接口订阅资源泄漏事件。API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 hiappevent.h 。 **订阅接口功能介绍** ： #### 开发步骤 #### 步骤一：新建工程 1. 获取该示例工程依赖的jsoncpp文件，从 三方开源库jsoncpp代码仓 下载源码的压缩包，并按照READ… [`references/订阅资源泄漏事件（C_C++）.md`](<references/订阅资源泄漏事件（C_C++）.md>)
- **订阅音频卡顿事件（ArkTS）** — API接口的具体使用说明（参数使用限制、具体取值范围等）请参考 @ohos.hiviewdfx.hiAppEvent (应用事件打点)ArkTS API文档 。 #### 开发步骤 以实现对应用音频播放触发丢帧生成的音频卡顿事件订阅为例，说明开发步骤。 1. 编辑工程中的“entry > src > main > ets > entryability > E… [`references/订阅音频卡顿事件（ArkTS）.md`](<references/订阅音频卡顿事件（ArkTS）.md>)
- **订阅音频卡顿事件（C/C++）** — 本文介绍如何使用HiAppEvent提供的C/C++接口订阅音频卡顿事件。详细使用说明请参考 HiAppEvent C API文档 。 #### 开发步骤 1. 获取示例工程的依赖项jsoncpp。 参考 三方开源库jsoncpp代码仓 README中 **Amalgamated source** 部分，获取jsoncpp.cpp、json.h和json-f… [`references/订阅音频卡顿事件（C_C++）.md`](<references/订阅音频卡顿事件（C_C++）.md>)
- **资源泄漏事件介绍** — 资源泄漏是指句柄、线程或内存等资源在应用运行过程中未被正确释放，导致资源长期占用且无法被其他应用使用。如果某一类资源耗尽，系统可能出现卡死或重启等异常情况。 本文面向开发者介绍资源泄漏事件各字段的含义和规格。如需了解如何使用HiAppEvent接口订阅系统资源泄漏事件，请参考以下文档。目前提供ArkTs和C/C++两种接口。 - 订阅资源泄漏事件（ArkTS… [`references/资源泄漏事件介绍.md`](<references/资源泄漏事件介绍.md>)
- **错误管理开发指导** — 当应用的代码存在规范问题或错误时，会在运行中产生异常和错误，如应用未捕获异常等。在错误产生后，应用会异常退出。错误日志通常会保存在用户本地存储设备中，不方便开发者定位问题。所以，应用开发者可以使用错误管理的接口，在应用退出前，及时将相关错误及日志上报到开发者的服务平台来定位问题。 使用errorManager接口监听异常和错误后，应用不会退出，建议在回调函数… [`references/错误管理开发指导.md`](<references/错误管理开发指导.md>)
- **音频卡顿事件介绍** — 从API version 21开始，支持订阅音频卡顿事件。音频卡顿事件是指音频流卡顿导致的音频播放不流畅，音频卡顿发生场景可以分为应用进程问题卡顿、系统问题卡顿。当出现音频长时间无数据时被定义为音频卡顿事件，并生成HiAppEvent日志，供应用开发者分析。如何使用HiAppEvent订阅音频卡顿事件可参见以下文档： - 订阅音频卡顿事件（ArkTS） - … [`references/音频卡顿事件介绍.md`](<references/音频卡顿事件介绍.md>)
