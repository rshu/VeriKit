---
name: graphics-accelerate-kit
description: 为 HarmonyOS 上高性能游戏和图形密集型应用提供图形渲染加速、游戏资源下载加速和游戏启动加速服务，全面提升图形处理性能和用户体验。
---

## 功能说明

Graphics Accelerate Kit（图形加速服务）是集成了先进的图形渲染加速和资源管理优化的综合解决方案，旨在通过软硬件协同优化，全面提升图形处理相关应用的性能和用户体验。该服务主要面向游戏、AR、VR、UI交互渲染、3D动效等场景，已构建三大核心服务：游戏渲染加速服务、游戏资源加速服务和游戏启动加速服务。

游戏渲染加速服务帮助游戏应用快速构建超帧（Frame Generation，含内插和外插模式）、ABR（自适应稳态渲染）、OpenGTX（动态帧率/刷新率调整）等渲染加速能力，解决游戏运行不流畅、卡顿掉帧、发热发烫等体验问题。超帧利用MEMC技术在真实渲染帧间高效插入预测帧，ABR通过感知游戏和设备状态自适应调整分辨率，OpenGTX实时感知渲染状态自适应调整帧率和频率。

游戏资源加速服务通过后台任务调度和预加载技术实现资源包的高效后台更新，降低游戏启动等待时间，避免因资源包更新导致玩家流失。游戏启动加速服务基于游戏内存镜像精准恢复技术实现游戏秒级启动，无需再经过漫长的加载过程。本Kit支持 OpenGL ES 和 Vulkan 两种图形 API 平台，适用于 Phone、Tablet、TV、PC/2in1 设备。

## 使用场景

当您的游戏应用需要提升渲染性能、解决卡顿掉帧问题时，可使用游戏渲染加速服务的超帧、ABR、OpenGTX能力。当需要实现游戏资源包的静默后台下载和高效更新时，可使用游戏资源加速服务。当希望实现游戏冷启动秒级打开时，可接入游戏启动加速服务。

本Kit适用于各种游戏类型，从休闲游戏到重度GPU渲染的大型3D游戏均可受益，也适用于使用Unity等游戏引擎开发的应用。

## 典型场景

- 如何为OpenGL ES平台的游戏接入超帧内插或外插模式以提升帧率？
- 如何为Vulkan平台的游戏接入超帧增强模式并使用运动估计能力？
- 如何开发ABR自适应稳态渲染功能，根据设备状态动态调整分辨率？
- 如何接入OpenGTX动态帧率调整能力，降低游戏功耗？
- 如何使用ExtensionAbility实现游戏资源包的后台托管下载？
- 如何实现游戏前台下载资源包，并支持切后台接续下载？
- 如何实现游戏秒级启动（快速启动）功能？
- 超帧外插模式下运动物体边缘出现拖影如何排查和解决？
- 集成ABR后Native纹理内容为空或渲染异常如何处理？
- 游戏秒级启动后出现闪退、黑屏、无法热更等问题如何解决？

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### Kit 简介

- [Graphics Accelerate Kit简介](references/Graphics Accelerate Kit简介.md) - Kit的整体介绍、三大核心服务说明及约束限制
- [Kit支持的设备类型有哪些？](references/Kit支持的设备类型有哪些？.md) - Kit支持的设备类型说明

### 业务概述

- [业务概述-1](references/业务概述-1.md) - 游戏渲染加速服务的业务概述，包括超帧、ABR、OpenGTX能力介绍
- [业务概述-2](references/业务概述-2.md) - 游戏资源加速服务的业务概述，包括后台下载和前台接续下载场景
- [业务概述](references/业务概述.md) - 游戏启动加速（秒级启动）服务的业务概述

### 超帧概述

- [概述](references/概述.md) - AI超帧能力介绍
- [概述-1](references/概述-1.md) - 超帧内插模式原理说明
- [概述-2](references/概述-2.md) - 超帧外插模式原理说明
- [概述-3](references/概述-3.md) - 系统送显模式说明
- [概述-4](references/概述-4.md) - Vulkan平台增强模式运动估计及顶点标记方法

### 开发准备

- [开发准备](references/开发准备.md) - 游戏启动加速服务的开发准备，包括申请秒级启动开放能力
- [开发准备-1](references/开发准备-1.md) - 游戏资源加速服务的开发准备，包括配置网络权限等

### ABR 功能开发

- [ABR功能开发](references/ABR功能开发.md) - ABR自适应稳态渲染功能的完整开发流程

### OpenGTX 功能开发

- [OpenGTX功能开发](references/OpenGTX功能开发.md) - OpenGTX动态帧率调整功能的开发指导

### OpenGL ES 平台超帧开发

- [OpenGL ES平台](references/OpenGL ES平台.md) - OpenGL ES平台超帧开发概述
- [OpenGL ES平台-1](references/OpenGL ES平台-1.md) - OpenGL ES平台超帧内插模式开发指导
- [OpenGL ES平台-2](references/OpenGL ES平台-2.md) - OpenGL ES平台超帧外插模式开发指导
- [OpenGL ES平台-3](references/OpenGL ES平台-3.md) - OpenGL ES平台系统送显模式开发指导

### Vulkan 平台超帧开发

- [Vulkan平台](references/Vulkan平台.md) - Vulkan平台超帧开发概述
- [Vulkan平台-1](references/Vulkan平台-1.md) - Vulkan平台超帧内插模式开发指导
- [Vulkan平台-2](references/Vulkan平台-2.md) - Vulkan平台超帧外插模式开发指导
- [Vulkan平台-3](references/Vulkan平台-3.md) - Vulkan平台系统送显模式开发指导
- [Vulkan平台-4](references/Vulkan平台-4.md) - Vulkan平台增强模式开发指导

### 游戏资源加速服务 - 功能开发

- [发布资源包下载任务](references/发布资源包下载任务.md) - 发布资源包下载任务的开发指导
- [应用前台下载资源包](references/应用前台下载资源包.md) - 应用前台下载资源包的开发指导
- [系统后台切应用前台接续下载资源包](references/系统后台切应用前台接续下载资源包.md) - 系统后台切前台接续下载资源包的开发指导
- [查看资源包分发数据](references/查看资源包分发数据.md) - 查看资源包分发数据的开发指导
- [extension系统托管下载](references/extension系统托管下载.md) - ExtensionAbility系统托管下载方式
- [extension协同下载](references/extension协同下载.md) - ExtensionAbility协同下载方式

### 游戏启动加速服务

- [实现游戏启动加速](references/实现游戏启动加速.md) - 游戏秒级启动的完整开发流程

### 常见问题

- [超帧和ABR支持的图形API有哪些？](references/超帧和ABR支持的图形API有哪些？.md) - 超帧和ABR支持的图形API列表
- [开启超帧外插模式后运动物体边缘出现严重拖影现象，可能的原因是什么？](references/开启超帧外插模式后运动物体边缘出现严重拖影现象，可能的原因是什么？.md) - 超帧外插模式拖影问题排查
- [哪些特征的Buffer适合使能ABR？](references/哪些特征的Buffer适合使能ABR？.md) - 适合使能ABR的Buffer特征说明
- [集成ABR后，从游戏引擎获取到的Native纹理内容为空，该如何解决_](references/集成ABR后，从游戏引擎获取到的Native纹理内容为空，该如何解决_.md) - ABR集成后纹理内容为空的问题排查
- [ABR进行Buffer分辨率调整引起其他Pass渲染效果异常，该如何解决？](references/ABR进行Buffer分辨率调整引起其他Pass渲染效果异常，该如何解决？.md) - ABR分辨率调整导致渲染异常的问题排查
- [集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。](references/集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。.md) - 未配置网络权限导致功能未生效的问题
- [集成游戏资源加速ExtensionAbility方法，未配置游戏资源加速ExtensionAbility组件类型信息，导致功能未生效。](references/集成游戏资源加速ExtensionAbility方法，未配置游戏资源加速ExtensionAbility组件类型信息，导致功能未生效。.md) - 未配置组件类型信息导致功能未生效的问题
- [接入资源包后台下载功能后如何使用指定测试设备进行自测？](references/接入资源包后台下载功能后如何使用指定测试设备进行自测？.md) - 资源包后台下载功能自测方法
- [若开发者在游戏中使用Unity Addressables资源管理框架，如何集成游戏资源包后台下载功能？](references/若开发者在游戏中使用Unity Addressables资源管理框架，如何集成游戏资源包后台下载功能？.md) - Unity Addressables框架集成资源包下载
- [上传至华为CDN的资源包文件支持哪些格式类型？](references/上传至华为CDN的资源包文件支持哪些格式类型？.md) - 华为CDN支持的资源包文件格式
- [如何解析华为CDN场景下manifestUrl对应的xml文件？](references/如何解析华为CDN场景下manifestUrl对应的xml文件？.md) - 华为CDN manifestUrl xml文件解析方法
- [是否可以仅接入下载ExtensionAbility，而不改写原先在游戏引擎内部的下载逻辑或下载中间件？](references/是否可以仅接入下载ExtensionAbility，而不改写原先在游戏引擎内部的下载逻辑或下载中间件？.md) - 仅接入下载ExtensionAbility的可行性
- [是否可以申请长时任务，在游戏前台下载资源包过程中切后台时免冻结并继续下载资源包？](references/是否可以申请长时任务，在游戏前台下载资源包过程中切后台时免冻结并继续下载资源包？.md) - 切后台继续下载资源包的可行性
- [是否可以终止已发布的下载任务，例如游戏出现问题时是否能够及时关闭？](references/是否可以终止已发布的下载任务，例如游戏出现问题时是否能够及时关闭？.md) - 终止下载任务的可行性
- [快速启动的游戏存在三方SDK功能异常，应该如何排查？](references/快速启动的游戏存在三方SDK功能异常，应该如何排查？.md) - 快速启动后三方SDK功能异常的排查方法
- [秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？](references/秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？.md) - 秒级启动后UIContent空指针异常排查
- [通过加载内存镜像启动的游戏会全屏显示来电提醒，应该如何避免？](references/通过加载内存镜像启动的游戏会全屏显示来电提醒，应该如何避免？.md) - 内存镜像启动后来电提醒全屏的问题
- [游戏出现卡死后，应该如何避免下一次秒启后还是卡死场景？](references/游戏出现卡死后，应该如何避免下一次秒启后还是卡死场景？.md) - 游戏卡死后秒启场景的处理方法
- [游戏调用UnityEngine.Application.Quit侧滑退出时出现黑屏现象，应该如何避免？](references/游戏调用UnityEngine.Application.Quit侧滑退出时出现黑屏现象，应该如何避免？.md) - Unity侧滑退出黑屏问题排查
- [游戏接入秒级启动后无法热更应该如何处理？](references/游戏接入秒级启动后无法热更应该如何处理？.md) - 秒级启动后无法热更的问题处理
- [游戏秒级启动场景中闪屏播放与游戏音频恢复不同步，应该如何解决？](references/游戏秒级启动场景中闪屏播放与游戏音频恢复不同步，应该如何解决？.md) - 闪屏与音频不同步的问题解决
- [游戏上划退出后，场景切换阶段存在振动，应该如何避免？](references/游戏上划退出后，场景切换阶段存在振动，应该如何避免？.md) - 场景切换阶段振动的避免方法
- [游戏因未实现防沉迷提醒提审被拒，应该如何解决？](references/游戏因未实现防沉迷提醒提审被拒，应该如何解决？.md) - 防沉迷提醒提审被拒的解决方法
- [游戏资源加速ExtensionAbility方法中使用static静态变量为什么不生效？](references/游戏资源加速ExtensionAbility方法中使用static静态变量为什么不生效？.md) - ExtensionAbility中static变量不生效的原因
- [日志中频繁打印BusinessError_ The Worker instance is not running, maybe worker is terminated when PostMessage错误信息，应该如何排查？](references/日志中频繁打印BusinessError_ The Worker instance is not running, maybe worker is terminated when PostMessage错误信息，应该如何排查？.md) - Worker实例错误日志排查方法

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `55` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **ABR功能开发** — 基于相机运动感知策略的ABR主要业务流程如下： 1. 用户进入ABR适用的游戏场景。 2. 游戏应用调用 HMS_ABR_CreateContext 接口并指定图形API类型，创建ABR上下文实例。 3. 游戏应用调用 HMS_ABR_SetTargetFps 接口初始化ABR实例，配置目标帧率属性，ABR结合目标帧率属性实时感知GPU负载状态。 4. 游戏… [`references/ABR功能开发.md`](<references/ABR功能开发.md>)
- **ABR进行Buffer分辨率调整引起其他Pass渲染效果异常，该如何解决？** — **现象描述** 以团结引擎URP管线为例，ABR对DrawOpaqueObjects绑定的Buffer进行分辨率调整时会引起SSAO shadow效果异常。 **原因分析** 通过上述URP管线可以看到，SSAO在渲染管线中是一个“前处理”，SSAO输出的图像会作为DrawOpaqueObjects的输入。当ABR对DrawOpaqueObjects绑定的… [`references/ABR进行Buffer分辨率调整引起其他Pass渲染效果异常，该如何解决？.md`](<references/ABR进行Buffer分辨率调整引起其他Pass渲染效果异常，该如何解决？.md>)
- **Graphics Accelerate Kit简介** — Graphics Accelerate Kit（图形加速服务）是集成了先进的图形渲染加速和资源管理优化的综合解决方案，旨在通过软硬件协同优化，全面提升图形处理相关应用的性能和用户体验。该服务的应用场景包括游戏、AR、VR、UI交互渲染、3D动效等。其中，游戏作为端侧典型的重负载GPU渲染场景。本Kit已构建三大核心服务：游戏渲染加速服务、游戏资源加速服务、游… [`references/Graphics Accelerate Kit简介.md`](<references/Graphics Accelerate Kit简介.md>)
- **Kit支持的设备类型有哪些？** — Kit支持的设备类型请参见 支持的设备 。同时，您可以通过调用 canIUse() 接口并传入 SystemCapability.GraphicsGame.RenderAccelerate 进行设备类型适配查询。 [`references/Kit支持的设备类型有哪些？.md`](<references/Kit支持的设备类型有哪些？.md>)
- **OpenGL ES平台** — 基于OpenGL ES图形API平台，超帧外插模式的主要业务流程如下： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_GLES 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需进入步骤5到步骤8的真实帧、预测帧交替渲染送显的循环流程，只需逐帧对场景进行渲染送显即可。 3. 游戏应用调用接口配置超帧实… [`references/OpenGL ES平台-1.md`](<references/OpenGL ES平台-1.md>)
- **OpenGL ES平台** — 基于OpenGL ES图形API平台，系统送显模式的主要业务流程如下： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_GLES 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需在步骤6提供当前帧信息，只需逐帧对场景进行渲染送显即可。 3. 游戏应用调用接口配置超帧实例属性。包括调用 HMS_FG_S… [`references/OpenGL ES平台-2.md`](<references/OpenGL ES平台-2.md>)
- **OpenGL ES平台** — 基于OpenGL ES图形API平台，超帧顶点标记的主要业务流程如下： - 增强模式运动估计原理 开发阶段，开发者需要使用系统的图形驱动库提供的OpenGL ES接口，在期望被标记的物体绘制前后添加上开始标记指令和结束标记指令。运行阶段，基于OpenGL ES的Transform Feedback（变换反馈）特性，被标记的所有Draw Call处理的顶点数据… [`references/OpenGL ES平台-3.md`](<references/OpenGL ES平台-3.md>)
- **OpenGL ES平台** — 基于OpenGL ES图形API平台，超帧内插模式的主要业务流程如下： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_GLES 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需进入步骤5到步骤9的预测帧、真实帧交替渲染送显的循环流程，只需逐帧对场景进行渲染送显即可。 3. 游戏应用调用接口配置超帧实… [`references/OpenGL ES平台.md`](<references/OpenGL ES平台.md>)
- **OpenGTX功能开发** — OpenGTX是GPU Turbo X的开放式入口，根据游戏开发者主动提供的游戏过程中的关键信息，使能LTPO（动态帧率/刷新率）等游戏加速方案，助力游戏开发者打造高画质、高流畅、低功耗极致体验。LTPO通过动态感知游戏渲染状态、游戏场景、设备状态等关键信息，动态调整游戏的帧率/刷新率以及设备的SOC/DDR频率。 #### 业务流程 LTPO的主要业务流程… [`references/OpenGTX功能开发.md`](<references/OpenGTX功能开发.md>)
- **Vulkan平台** — 基于Vulkan图形API平台，超帧内插模式的主要业务流程如下： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_VK 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需进入步骤6到步骤10的预测帧、真实帧交替渲染送显的循环流程，只需逐帧对场景进行渲染送显即可。 3. 游戏应用调用接口配置超帧实例属性。… [`references/Vulkan平台-1.md`](<references/Vulkan平台-1.md>)
- **Vulkan平台** — 基于Vulkan图形API平台，超帧外插模式的主要业务流程如下： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_VK 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需进入步骤6到步骤9的真实帧、预测帧交替渲染送显的循环流程，只需逐帧对场景进行渲染送显即可。 3. 游戏应用调用接口配置超帧实例属性。包… [`references/Vulkan平台-2.md`](<references/Vulkan平台-2.md>)
- **Vulkan平台** — 基于Vulkan图形API平台，系统送显模式的主要业务流程如下： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_VK 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需在步骤6提供当前帧信息，只需逐帧对场景进行渲染送显即可。 3. 游戏应用调用接口配置超帧实例属性。包括调用 HMS_FG_SetAlg… [`references/Vulkan平台-3.md`](<references/Vulkan平台-3.md>)
- **Vulkan平台** — 基于Vulkan图形API平台，超帧顶点标记的主要业务流程如下： - 增强模式运动估计原理 开发阶段，开发者需要使用系统的图形驱动库提供的Vulkan接口，在期望被标记的物体绘制前后添加上开始标记指令和结束标记指令。运行阶段，基于Vulkan的Transform Feedback（变换反馈）特性，被标记的所有Draw Call处理的顶点数据将被缓存，再通过顶… [`references/Vulkan平台-4.md`](<references/Vulkan平台-4.md>)
- **Vulkan平台** — AI超帧调用流程上依赖系统送显模式功能，但与基本的系统送显模式相比，无需调用新方法，只需要在传输帧信息的时候不传输深度信息即可。 下面是基于Vulkan图形API平台，集成AI超帧的主要业务流程： 1. 用户进入超帧适用的游戏场景。 2. 游戏应用调用 HMS_FG_CreateContext_VK 接口创建超帧上下文实例。如超帧上下文实例创建失败，则无需在… [`references/Vulkan平台.md`](<references/Vulkan平台.md>)
- **extension协同下载** — 从5.1.1(19)版本开始，新增extension协同下载。 用户在应用市场安装游戏后、或更新游戏后、设备满足闲时条件时，在游戏未启动状态下，若检测到该游戏有资源包需要更新，可使用 **应用自身下载器** 自动下载资源包。 #### 业务流程 1. 用户在应用市场安装游戏后、用户在应用市场更新游戏后、系统检测到用户设备符合闲时条件时，游戏资源加速服务开启资… [`references/extension协同下载.md`](<references/extension协同下载.md>)
- **extension系统托管下载** — 用户在应用市场安装游戏后、或更新游戏后、设备满足闲时条件时，在游戏未启动状态下，若检测到该游戏有资源包需要更新，将使用 **系统下载器** （游戏资源加速服务）自动下载资源包。 #### 业务流程 1. 用户在应用市场安装游戏后、用户在应用市场更新游戏后、系统检测到用户设备符合闲时条件时，游戏资源加速服务开启资源包后台下载。 2. 游戏资源加速服务从AppG… [`references/extension系统托管下载.md`](<references/extension系统托管下载.md>)
- **上传至华为CDN的资源包文件支持哪些格式类型？** — 华为CDN场景下，游戏资源包支持的格式类型如下： [`references/上传至华为CDN的资源包文件支持哪些格式类型？.md`](<references/上传至华为CDN的资源包文件支持哪些格式类型？.md>)
- **业务概述** — 游戏渲染加速服务支持Phone、Tablet设备，并且从6.1.0(23)版本开始，新增支持TV设备。 #### 亮点/特征 - **稳定帧率，减少卡顿、掉帧现象** 游戏应用集成超帧、ABR后，在无画质损耗的基础上，可有效稳定或提升游戏运行帧率，减少卡顿和掉帧现象，使游戏运行更加稳定、流畅。集成OpenGTX后，通过感知游戏场景、设备状态等关键信息，动态调… [`references/业务概述-1.md`](<references/业务概述-1.md>)
- **业务概述** — 从5.1.0(18)版本开始，新增资源包后台下载。 资源包后台下载是将资源文件（例如关卡包、3D角色模型、纹理等）静默下载到用户设备中，减少游戏启动后等待资源包下载的时间，解决游戏启动慢的问题，为用户提供即开即玩的游戏体验。 #### 主要功能 #### 系统后台下载资源包 - 场景一 用户在应用市场安装游戏后、或在应用市场更新游戏后，在游戏未启动状态下，若… [`references/业务概述-2.md`](<references/业务概述-2.md>)
- **业务概述** — 秒级启动是在游戏退出时，开发者先切换场景，系统再自动为该场景制作内存镜像。在该游戏下一次无资源更新冷启动时，可以直接进入内存镜像界面，实现游戏的秒开秒进，无需再经过漫长的加载过程。 #### 约束与限制 秒级启动自6.0.0(20)版本起支持Phone、Tablet设备，并在6.1.0(23) 版本中新增对PC/2in1设备的支持。 #### 基本概念 ##… [`references/业务概述.md`](<references/业务概述.md>)
- **发布资源包下载任务** — 在AppGallery Connect支持创建“使用华为CDN”或“使用三方CDN”的游戏资源包下载任务。 #### 前提条件 - 已准备好游戏资源包并加密，且自行保证游戏资源包的可用性。资源包支持的格式请参见 上传至华为CDN的资源包文件支持哪些格式类型 。 - 游戏资源包支持使用三方CDN或托管至华为CDN。若使用三方CDN，请提前将资源包上传至三方CD… [`references/发布资源包下载任务.md`](<references/发布资源包下载任务.md>)
- **哪些特征的Buffer适合使能ABR？** — - 着色器处理耗时较高的Buffer。 - 对于具有较高原始分辨率的Buffer（例如1280x720像素及以上），推荐考虑启用ABR以优化资源分配。 [`references/哪些特征的Buffer适合使能ABR？.md`](<references/哪些特征的Buffer适合使能ABR？.md>)
- **如何解析华为CDN场景下manifestUrl对应的xml文件？** — 推荐使用 @ifbear/fast-xml-parser 。 执行如下命令行，安装依赖。 To use as package dependency $ ohpm install @ifbear/fast-xml-parser 示例代码： const { XMLParser, XMLBuilder, XMLValidator} = require("fast-… [`references/如何解析华为CDN场景下manifestUrl对应的xml文件？.md`](<references/如何解析华为CDN场景下manifestUrl对应的xml文件？.md>)
- **实现游戏启动加速** — 1. 用户启动游戏。 2. 游戏在onCreate生命周期中调用 setSupportedProcessCache 接口，设置游戏支持缓存后快速启动。 部分机型不支持设置进程资源的缓存，因此在调用 setSupportedProcessCache 接口时需加try catch捕获异常。 3. 用户上划退出游戏。 4. 在onWindowStageWillDe… [`references/实现游戏启动加速.md`](<references/实现游戏启动加速.md>)
- **应用前台下载资源包** — 启动游戏后，为游戏提供管理、创建资源包下载任务功能。 #### 业务流程 1. 用户打开游戏App。 2. 游戏调用 fetchManifestUrl 方法，从游戏资源加速服务获取manifestUrl资源清单。 3. 游戏根据manifestUrl获取资源包下载任务列表。若manifestUrl不为空，游戏从华为CDN获取资源包下载任务列表，若manife… [`references/应用前台下载资源包.md`](<references/应用前台下载资源包.md>)
- **开发准备** — 请先参考 应用开发准备 完成基本准备工作，再继续以下开发准备项。 #### 配置网络权限 在“src/main/module.json5”的requestPermissions层级中添加网络权限。 { "module": { // ... "requestPermissions": [ { "name": "ohos.permission.INTERNET"… [`references/开发准备-1.md`](<references/开发准备-1.md>)
- **开发准备** — 请先参考 应用开发准备 完成基本准备工作，再继续以下开发准备项。 #### 申请秒级启动开放能力 基于安全考虑，系统侧对秒级启动功能做了权限保护处理，使用相关接口开发者需先提交“秒级启动”能力开关的申请，在申请通过后，再使用该能力开关。 1. 登录 AppGallery Connect ，选择“开发与服务”。 2. 在项目列表选择项目，并在应用列表下选择需要… [`references/开发准备.md`](<references/开发准备.md>)
- **开启超帧外插模式后运动物体边缘出现严重拖影现象，可能的原因是什么？** — 由于外插模式需要标记模板缓冲（Stencil Buffer）的第8位用于区分静态物体和动态物体，即静态物体模板值第8位标记成0，动态物体模板值第8位标记成1，模板缓冲的低7位模板值开发者可自行设置。如果标记错误或漏标记，可能会在动态物体边缘产生严重的拖影现象。 **现象描述** Demo中运动角色出现头身分离等严重拖影现象，角色头部向右偏。 **原因分析**… [`references/开启超帧外插模式后运动物体边缘出现严重拖影现象，可能的原因是什么？.md`](<references/开启超帧外插模式后运动物体边缘出现严重拖影现象，可能的原因是什么？.md>)
- **快速启动的游戏存在三方SDK功能异常，应该如何排查？** — 在秒级启动使能后，如果用户对游戏进行上滑移除操作，系统会对游戏进程进行深度冻结和内存换出。此时游戏进程、 ArkTS Runtime 、 AbilityStage 均不会被销毁，只有 UIAbility 会经历完整的创建到销毁生命周期。因此，由ArkTS定义的全局变量、静态变量、 AppStorage 变量、globalThis变量以及单例对象等都不会被销毁… [`references/快速启动的游戏存在三方SDK功能异常，应该如何排查？.md`](<references/快速启动的游戏存在三方SDK功能异常，应该如何排查？.md>)
- **接入资源包后台下载功能后如何使用指定测试设备进行自测？** — 在AppGallery Connect正式发布资源包下载任务前，可以指定测试设备进行本地自测，具体操作请参见 测试下载功能 。在测试设备上测试下载功能符合预期效果后，再正式发布资源包下载任务。 [`references/接入资源包后台下载功能后如何使用指定测试设备进行自测？.md`](<references/接入资源包后台下载功能后如何使用指定测试设备进行自测？.md>)
- **日志中频繁打印BusinessError: The Worker instance is not running, maybe worker is terminated when PostMessage错误信息，应该如何排查？** — 该错误通常是由于Worker线程崩溃或被终止导致。 开发者可在日志中进一步查找worker.onerror相关日志，确认Worker线程崩溃时的具体异常信息。 TuanjieMainWorker Error TypeError: undefined is not callable entry|entry|1.0.0|src/main/ets/workers/… [`references/日志中频繁打印BusinessError_ The Worker instance is not running, maybe worker is terminated when PostMessage错误信息，应该如何排查？.md`](<references/日志中频繁打印BusinessError_ The Worker instance is not running, maybe worker is terminated when PostMessage错误信息，应该如何排查？.md>)
- **是否可以仅接入下载ExtensionAbility，而不改写原先在游戏引擎内部的下载逻辑或下载中间件？** — 可以，支持仅接入下载ExtensionAbility。 但建议在应用进入前台时，通过 removeAllAssetDownloadTasks 移除系统中的所有下载任务，对于已完成下载的任务可以复用，避免重复下载。对于未完成下载的任务建议使用应用自身下载器进行重新下载。 [`references/是否可以仅接入下载ExtensionAbility，而不改写原先在游戏引擎内部的下载逻辑或下载中间件？.md`](<references/是否可以仅接入下载ExtensionAbility，而不改写原先在游戏引擎内部的下载逻辑或下载中间件？.md>)
- **是否可以申请长时任务，在游戏前台下载资源包过程中切后台时免冻结并继续下载资源包？** — 可以。 游戏可以申请 dataTransfer类型的长时任务 ，在游戏前台切后台后，游戏可以保持免冻结并继续下载资源包。 [`references/是否可以申请长时任务，在游戏前台下载资源包过程中切后台时免冻结并继续下载资源包？.md`](<references/是否可以申请长时任务，在游戏前台下载资源包过程中切后台时免冻结并继续下载资源包？.md>)
- **是否可以终止已发布的下载任务，例如游戏出现问题时是否能够及时关闭？** — 能够及时关闭。 若在发布下载任务后发现资源包存在问题，可以前往AppGallery Connect终止资源包下载任务，具体操作请参见 发布下载任务 。下载任务终止后，在安装游戏后/大版本更新后/设备满足闲时条件时，均不再拉起该应用的ExtensionAbility进行资源包后台下载。 [`references/是否可以终止已发布的下载任务，例如游戏出现问题时是否能够及时关闭？.md`](<references/是否可以终止已发布的下载任务，例如游戏出现问题时是否能够及时关闭？.md>)
- **查看资源包分发数据** — 资源包下载任务正式发布后，开发者可以前往AppGallery Connect查看资源包分发情况。 1. 登录 AppGallery Connect ，点击“分析”，在应用列表中选择对应的游戏。 2. 选择“分发分析 > 资源包后台下载分析”，在页面右侧切换“资源包版本”和“日期”为展示依据查看资源包下载数据。 [`references/查看资源包分发数据.md`](<references/查看资源包分发数据.md>)
- **概述** — 超帧内插模式是利用相邻两个真实渲染帧进行超帧计算生成中间的预测帧，即利用第N-1帧和第N帧真实渲染帧预测第N-0.5帧预测帧，如下图所示。由于中间预测帧的像素点通常能在前后两帧中找到对应位置，因此内插模式的预测帧效果较外插模式更优。由于第N帧真实渲染帧需要等待第N-0.5帧预测帧生成并送显后才能最终送显，因此会新增1~2帧的响应时延。 [`references/概述-1.md`](<references/概述-1.md>)
- **概述** — 超帧外插模式是利用相邻两个真实渲染帧进行超帧计算并生成未来一帧预测帧，即利用第N-1帧、第N帧真实帧预测第N+0.5帧预测帧，如下图所示。由于外插模式不改变渲染时间线和显示时间线的帧间顺序，因此不会导致响应时延的增加。但由于外插模式预测的是未来帧画面，当发生场景画面帧间差异大、相机或物体运动方向突变时，在预测帧的画面边缘和物体边缘容易出现拖影和模糊现象。 [`references/概述-2.md`](<references/概述-2.md>)
- **概述** — 从5.1.0(18)版本开始，新增支持系统送显模式。 系统送显模式是相较于游戏送显模式，能减少开发者集成复杂度的方案。在游戏送显模式下，系统完成预测后需要游戏应用主动调用图形API来完成预测帧的送显。 系统送显模式下游戏虽仍需要触发插帧任务，但不再需要负责预测帧送显，系统会完成送显。当前系统送显模式仅支持内插模式。 [`references/概述-3.md`](<references/概述-3.md>)
- **概述** — 从6.0.0(20)版本开始，新增支持顶点标记的Vulkan平台能力。 超帧提供两种运动估计模式供开发者选择：分别为基础模式和增强模式。其中增强模式需要对绘制顶点的Draw Call命令进行额外的标记，在相机和物体快速运动的游戏场景超帧效果较基础模式更优，能够有效改善拖影问题。本章主要介绍增强模式的运动估计原理及顶点标记方法。 Draw Call：指图形驱动… [`references/概述-4.md`](<references/概述-4.md>)
- **概述** — 从6.0.0(20)版本开始，新增支持AI超帧能力。 AI超帧主要利用了设备上的NPU执行模型推理，大幅降低GPU上的负载从而降低渲染的功耗。此外，AI超帧相比传统超帧算法在大幅运动和非线性运动场景的预测效果上也有明显优势。 [`references/概述.md`](<references/概述.md>)
- **游戏上划退出后，场景切换阶段存在振动，应该如何避免？** — 开发步骤如下： 1. 通过globalThis定义全局作用域的变量isCacheStatus，在onCreate生命周期函数中赋值false， isLaunchMirrorEnabled 接口返回true时赋值true。 2. 在函数 startVibration 前增加isCacheStatus校验，若当前处于缓存态，则不进行振动操作。 以团结工程为例，修… [`references/游戏上划退出后，场景切换阶段存在振动，应该如何避免？.md`](<references/游戏上划退出后，场景切换阶段存在振动，应该如何避免？.md>)
- **游戏出现卡死后，应该如何避免下一次秒启后还是卡死场景？** — 建议游戏上划退出后进行场景切换操作，若场景切换失败或场景切换超时（5s）则设置游戏不支持缓存后快速启动。 以团结工程为例，修改如下： import { launchAcceleration } from '@kit.GraphicsAccelerateKit'; import { BusinessError } from '@kit.BasicService… [`references/游戏出现卡死后，应该如何避免下一次秒启后还是卡死场景？.md`](<references/游戏出现卡死后，应该如何避免下一次秒启后还是卡死场景？.md>)
- **游戏因未实现防沉迷提醒提审被拒，应该如何解决？** — 根据应用上架审核规则，建议游戏在秒级启动场景下增加游戏健康公告提示页（如健康游戏提示或防沉迷提醒），在展示完成后再进入秒级启动恢复的内存镜像界面，以确保用户能够正常看到相关提示信息，详细操作可参考 示例工程 。 [`references/游戏因未实现防沉迷提醒提审被拒，应该如何解决？.md`](<references/游戏因未实现防沉迷提醒提审被拒，应该如何解决？.md>)
- **游戏接入秒级启动后无法热更应该如何处理？** — **问题原因** ：秒级启动是基于游戏上次退出的状态下进行的镜像恢复，因此往往会跳过游戏引擎启动过程中的一些场景，例如游戏资源加载和游戏资源更新环节。 **解决方案** ：可类比游戏长时间挂后台，再切回前台场景。 1. 若游戏存在游戏内热更检测逻辑，可在游戏中特定事件或定期检测远端热更资源更新，若存在更新则弹出模态窗口提示用户有热更资源，强制玩家退出。 2.… [`references/游戏接入秒级启动后无法热更应该如何处理？.md`](<references/游戏接入秒级启动后无法热更应该如何处理？.md>)
- **游戏秒级启动场景中闪屏播放与游戏音频恢复不同步，应该如何解决？** — 在游戏秒级启动场景中，进入前台后，系统会立即恢复引擎（resume），游戏内部音频也会被同时恢复，若此时ArkTS层仍在播放闪屏动画，则导致“画面仍在闪屏，声音提前播放”的不同步问题。 为解决上述问题，我们提供两种可选方案： - **方案一** ：基于闪屏播放完成标识控制引擎恢复 在游戏启动初期设置splashScreenFinishFlag=false，表… [`references/游戏秒级启动场景中闪屏播放与游戏音频恢复不同步，应该如何解决？.md`](<references/游戏秒级启动场景中闪屏播放与游戏音频恢复不同步，应该如何解决？.md>)
- **游戏调用UnityEngine.Application.Quit侧滑退出时出现黑屏现象，应该如何避免？** — 需根据“退出后是否希望继续使用 **秒级启动** 能力”选择不同的退出策略： 1. **希望下次启动仍支持秒级启动** 在侧滑退出场景下，应调用 terminateSelf 实现退出，确保进程状态可被系统正确保留，避免出现黑屏问题。 2. **不希望下次启动使用秒级启动** 在侧滑退出场景下，应调用 killAllProcesses 实现强制退出，彻底清理进… [`references/游戏调用UnityEngine.Application.Quit侧滑退出时出现黑屏现象，应该如何避免？.md`](<references/游戏调用UnityEngine.Application.Quit侧滑退出时出现黑屏现象，应该如何避免？.md>)
- **游戏资源加速ExtensionAbility方法中使用static静态变量为什么不生效？** — 资源加速ExtensionAbility的进程可能会切换，避免在ExtensionAbility方法使用应用自身的上下文变量，例如类成员变量、全局static静态变量。 若想在资源加速ExtensionAbility方法中共享变量，应使用 数据持久化技术 ，在不同方法中共享变量。 [`references/游戏资源加速ExtensionAbility方法中使用static静态变量为什么不生效？.md`](<references/游戏资源加速ExtensionAbility方法中使用static静态变量为什么不生效？.md>)
- **秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？** — 该报错通常是由于游戏在秒级启动后未重新获取并更新 UIAbilityContext ，导致后续逻辑仍使用旧的Context对象。当 UIAbility 被重新创建时，如果相关模块或三方SDK继续使用旧的UIAbilityContext，可能会导致接口调用异常、资源访问失败或SDK功能异常。 排查要点： 1. 游戏启动后进入onCreate生命周期时，是否重新… [`references/秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？.md`](<references/秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？.md>)
- **系统后台切应用前台接续下载资源包** — 系统后台静默下载过程中启动游戏，应用前台将接管系统后台下载任务，资源包下载任务将在应用前台接续执行。 #### 业务流程 1. 用户在应用市场安装游戏后、用户在应用市场更新游戏后、系统检测到用户设备符合闲时条件时，游戏资源加速服务开启资源包后台下载。 2. 游戏资源加速服务携带manifestUrl资源清单，向资源加速ExtensionAbility获取资源… [`references/系统后台切应用前台接续下载资源包.md`](<references/系统后台切应用前台接续下载资源包.md>)
- **若开发者在游戏中使用Unity Addressables资源管理框架，如何集成游戏资源包后台下载功能？** — Addressables资源加载机制是根据Addressables的缓存文件判定资源包是否已下载，若未下载再通过游戏资源包后台下载功能把资源文件下载到Addressables的缓存目录下。集成步骤如下： - 在游戏资源包下载的 onDownloadContentRequest 生命周期函数中： 1. 下载远端服务器上的Addressables的资源索引has… [`references/若开发者在游戏中使用Unity Addressables资源管理框架，如何集成游戏资源包后台下载功能？.md`](<references/若开发者在游戏中使用Unity Addressables资源管理框架，如何集成游戏资源包后台下载功能？.md>)
- **超帧和ABR支持的图形API有哪些？** — 目前超帧接口支持OpenGL ES和Vulkan图形API平台。ABR接口仅支持OpenGL ES图形API平台，暂不支持Vulkan平台。 [`references/超帧和ABR支持的图形API有哪些？.md`](<references/超帧和ABR支持的图形API有哪些？.md>)
- **通过加载内存镜像启动的游戏会全屏显示来电提醒，应该如何避免？** — 没有通过加载内存镜像启动的游戏，用户在游戏期间来电，来电提醒悬浮在手机正上方。 通过加载内存镜像启动的游戏，用户在游戏期间来电，游戏画面会被切至后台，当前来电提醒会被全屏显示，这影响了用户的游戏体验。 开发者应在onWindowStageCreate生命周期中调用 setWindowSystemBarEnable ，隐藏状态栏和导航栏，确保快速启动的游戏在来… [`references/通过加载内存镜像启动的游戏会全屏显示来电提醒，应该如何避免？.md`](<references/通过加载内存镜像启动的游戏会全屏显示来电提醒，应该如何避免？.md>)
- **集成ABR后，从游戏引擎获取到的Native纹理内容为空，该如何解决?** — **现象描述** 以团结引擎为例，游戏应用集成ABR，在游戏引擎中通过GetNativeTexturePtr获取Buffer关联的纹理，获取到的纹理内容为空。 **原因分析** 由于ABR对Buffer进行了自适应分辨率调整，并对ABR自适应缩放后的GLES纹理进行绘制，因而原始分辨率的GLES纹理中没有内容。 **处理步骤** 为解决此问题，需要通过 HM… [`references/集成ABR后，从游戏引擎获取到的Native纹理内容为空，该如何解决_.md`](<references/集成ABR后，从游戏引擎获取到的Native纹理内容为空，该如何解决_.md>)
- **集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。** — 未配置网络权限将出现如下异常日志： ohos.permission.INTERNET check failed 请开发者在“src/main/module.json5”的requestPermissions层级中添加网络权限。 { "module": { // ... "requestPermissions": [ { "name": "ohos.permi… [`references/集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。.md`](<references/集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。.md>)
- **集成游戏资源加速ExtensionAbility方法，未配置游戏资源加速ExtensionAbility组件类型信息，导致功能未生效。** — 未配置游戏资源加速ExtensionAbility组件类型信息将出现如下异常日志： bundle[xxx] do not have Asset Acceleration Extension Ability. 请开发者在“src/main/module.json5”的extensionAbilities层级中添加资源加速ExtensionAbility信息。 … [`references/集成游戏资源加速ExtensionAbility方法，未配置游戏资源加速ExtensionAbility组件类型信息，导致功能未生效。.md`](<references/集成游戏资源加速ExtensionAbility方法，未配置游戏资源加速ExtensionAbility组件类型信息，导致功能未生效。.md>)
