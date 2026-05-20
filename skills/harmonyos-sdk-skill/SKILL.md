---
name: harmonyos-sdk-skill
description: HarmonyOS SDK 全部100个Kit技能的总索引和导航中心，按17个功能领域分类。当需要查找某个HarmonyOS开发任务应使用哪个Kit时，加载本技能进行发现和导航。
---

## 功能说明

本技能是 HarmonyOS SDK 全部 100 个 Kit 服务的总索引和导航中心。它将所有 Kit 按功能领域划分为 17 大类，每个 Kit 提供关键词索引和简要说明，帮助你快速定位到正确的 Kit 技能文档。

每个子 Kit 的 SKILL.md 文件中包含该 Kit 的完整功能描述（What I do）、使用场景（When to use me）、典型开发场景（Typical Scenarios）以及详细的参考文档索引（References）。子 Kit 的 references 目录下存放了完整的开发参考文档。

当你需要了解某个 HarmonyOS 开发领域时，先在本索引中找到对应的分类和 Kit，然后通过相对路径加载该 Kit 的 SKILL.md 获取详细信息。

## 使用场景

当你接到一个 HarmonyOS 开发任务，但不确定应该使用哪个 Kit 或哪个 API 时，请先加载本技能。通过关键词搜索或按分类浏览，快速找到对应的 Kit。例如：

- 用户问"如何播放音频"→ 音频相关 → audio-kit
- 用户问"如何实现应用间跳转"→ 应用框架 → ability-kit
- 用户问"如何加密数据"→ 安全认证 → crypto-architecture-kit
- 用户问"如何实现推送通知"→ 推送通知 → push-kit
- 用户问"如何使用地图"→ 位置地图 → map-kit

找到目标 Kit 后，**请加载对应的 SKILL.md 文件**，而非本索引。每个 Kit 的 SKILL.md 中有详细的使用指导和参考文档索引，可以根据具体问题选择性加载 references 中的文档。

## 使用指南

**重要提示：** 本索引仅用于发现和导航到具体的 Kit 技能。找到目标 Kit 后，请通过相对路径加载对应的 SKILL.md 文件。在加载子 Kit 的 SKILL.md 后，同样不要一次性加载其 references 下的所有文件，而是根据用户的具体问题，仅读取相关的参考文档。

## 分类索引

### 1. 应用框架与编程（8）

应用生命周期管理、UI 开发范式、Web 能力、编程语言、进程通信、并发调度、后台任务等核心框架能力。

| Kit | 关键词 |
|-----|--------|
| [ability-kit](../skills/ability-kit/SKILL.md) | 应用模型、UIAbility、AbilityStage、FA模型、Stage模型、应用生命周期、组件启动、Want、跨设备迁移、Deep Linking、意图框架 |
| [arkts](../skills/arkts/SKILL.md) | ArkTS、方舟语言、并发、Sendable、字节码、代码混淆、TypeScript、TaskPool、Worker |
| [arkui](../skills/arkui/SKILL.md) | ArkUI、声明式UI、自定义组件、状态管理V1/V2、布局、动画、手势、Navigation、自定义渲染、画中画 |
| [arkweb](../skills/arkweb/SKILL.md) | Web组件、网页加载、JavaScript交互、Web安全、Web渲染、Cookie、HTTP拦截 |
| [form-kit](../skills/form-kit/SKILL.md) | 服务卡片、桌面卡片、锁屏卡片、ArkTS卡片、互动卡片、Widget |
| [ipc-kit](../skills/ipc-kit/SKILL.md) | 进程间通信、IPC、RPC、跨进程、跨设备通信、序列化 |
| [function-flow-runtime-kit](../skills/function-flow-runtime-kit/SKILL.md) | FFRT、任务并发、串行队列、并行队列、任务图、Job Partner |
| [background-tasks-kit](../skills/background-tasks-kit/SKILL.md) | 后台任务、长时任务、短时任务、延迟任务、后台提醒、AgentReminder |

### 2. 数据管理与存储（6）

数据持久化、文件管理、数据保护、资产存储、预览等数据相关能力。

| Kit | 关键词 |
|-----|--------|
| [arkdata](../skills/arkdata/SKILL.md) | 数据管理、Preferences、KV存储、关系型数据库、向量数据库、数据共享、UDMF、跨设备同步 |
| [asset-store-kit](../skills/asset-store-kit/SKILL.md) | 关键资产存储、密码存储、Token存储、安全存储、敏感数据 |
| [core-file-kit](../skills/core-file-kit/SKILL.md) | 文件管理、应用文件、用户文件、数据备份恢复、分布式文件、云文件同步 |
| [file-manager-service-kit](../skills/file-manager-service-kit/SKILL.md) | 文件管理服务、回收站、文件图标、文件快捷方式 |
| [data-protection-kit](../skills/data-protection-kit/SKILL.md) | 数据防泄漏、DLP、文件加密、权限管理、加密分享 |
| [preview-kit](../skills/preview-kit/SKILL.md) | 文件预览、文件加速打开、缓存加速 |

### 3. 图形渲染与3D（6）

2D/3D图形绘制、AR能力、GPU加速、空间建模等图形相关能力。

| Kit | 关键词 |
|-----|--------|
| [arkgraphics-2d](../skills/arkgraphics-2d/SKILL.md) | 2D图形、自定义绘制、Canvas、文字渲染、图片效果、可变帧率 |
| [arkgraphics-3d](../skills/arkgraphics-3d/SKILL.md) | 3D引擎、3D场景、glTF、材质、Shader、光照、3D模型、ArkGraphics Editor |
| [ar-engine](../skills/ar-engine/SKILL.md) | AR、增强现实、运动跟踪、平面检测、人脸跟踪、人体跟踪、图像跟踪 |
| [graphics-accelerate-kit](../skills/graphics-accelerate-kit/SKILL.md) | 图形加速、超帧、插帧、游戏渲染、资源包下载、游戏启动加速 |
| [xengine-kit](../skills/xengine-kit/SKILL.md) | GPU加速、AI超分、自适应VRS、光线追踪、GPU排序 |
| [spatial-recon-kit](../skills/spatial-recon-kit/SKILL.md) | 空间建模、3D高斯溅射、滤镜效果、三维重建 |

### 4. AI与智能计算（12）

语音、视觉、NLP、机器学习推理、意图框架、RAG、智能体等 AI 能力。

| Kit | 关键词 |
|-----|--------|
| [cann-kit](../skills/cann-kit/SKILL.md) | CANN、异构计算、AscendC、算子开发、模型推理、模型训练、麒麟芯片、GE图 |
| [mindspore-lite-kit](../skills/mindspore-lite-kit/SKILL.md) | MindSpore、昇思、端侧推理、端侧训练、模型转换、轻量AI |
| [neural-network-runtime-kit](../skills/neural-network-runtime-kit/SKILL.md) | NN Runtime、跨芯片推理、AI推理运行时、硬件加速 |
| [core-speech-kit](../skills/core-speech-kit/SKILL.md) | 基础语音、TTS、语音识别、离线语音、文字转语音 |
| [core-vision-kit](../skills/core-vision-kit/SKILL.md) | 基础视觉、OCR、文字识别、人脸检测、人脸比对、主体分割、骨架检测 |
| [natural-language-kit](../skills/natural-language-kit/SKILL.md) | 自然语言理解、文本分词、实体提取、NLP |
| [speech-kit](../skills/speech-kit/SKILL.md) | 场景化语音、语音朗读、AI字幕、字幕控制 |
| [vision-kit](../skills/vision-kit/SKILL.md) | 场景化视觉、人脸活体检测、证件识别、文档扫描、AI图像分析 |
| [multimodal-awareness-kit](../skills/multimodal-awareness-kit/SKILL.md) | 多模态感知、活动检测、用户状态、设备状态、记忆绑定 |
| [data-augmentation-kit](../skills/data-augmentation-kit/SKILL.md) | 知识库、智能检索、RAG、检索增强生成、端侧大模型、LLM问答 |
| [intents-kit](../skills/intents-kit/SKILL.md) | 意图框架、智能分发、智能调用、Celia、技能分发、面板卡片 |
| [agent-framework-kit](../skills/agent-framework-kit/SKILL.md) | 智能体框架、AI Agent、Function组件、应用+智能体 |

### 5. 媒体与音视频（8）

音频、视频、相机、图片处理、媒体文件管理等媒体能力。

| Kit | 关键词 |
|-----|--------|
| [audio-kit](../skills/audio-kit/SKILL.md) | 音频、AudioRenderer、OHAudio、OpenSL ES、音频录制、音量管理、音频会话、空间音频 |
| [avcodec-kit](../skills/avcodec-kit/SKILL.md) | 音视频编解码、视频编码、视频解码、封装、解封装、HDR |
| [avsession-kit](../skills/avsession-kit/SKILL.md) | 音视频播控、媒体会话、投播、后台播放、播控中心 |
| [camera-kit](../skills/camera-kit/SKILL.md) | 相机、拍照、录像、预览、闪光灯、焦距、 hdr |
| [image-kit](../skills/image-kit/SKILL.md) | 图片处理、图片编解码、图片编辑、EXIF、HDR、ImageProcessing |
| [media-kit](../skills/media-kit/SKILL.md) | 媒体、音视频播放、录制、录屏、转码、视频处理 |
| [media-library-kit](../skills/media-library-kit/SKILL.md) | 媒体库、相册管理、照片管理、视频管理、Picker、媒体文件 |
| [ringtone-kit](../skills/ringtone-kit/SKILL.md) | 铃声、铃声设置、来电铃声、通知铃声、双卡铃声 |

### 6. 网络与通信（7）

HTTP、WebSocket、蓝牙、WLAN、NFC、蜂窝网络等通信能力。

| Kit | 关键词 |
|-----|--------|
| [network-kit](../skills/network-kit/SKILL.md) | HTTP、WebSocket、Socket、DNS、VPN、MDNS、防火墙、流量统计 |
| [network-boost-kit](../skills/network-boost-kit/SKILL.md) | 网络加速、多路传输、连接切换、网络质量评估、弱网感知 |
| [remote-communication-kit](../skills/remote-communication-kit/SKILL.md) | HTTP请求定制、URPC、远程过程调用 |
| [connectivity-kit](../skills/connectivity-kit/SKILL.md) | 蓝牙、BLE、WLAN、NFC、短距通信、设备发现 |
| [nearlink-kit](../skills/nearlink-kit/SKILL.md) | 星闪、SparkLink、短距通信、设备发现 |
| [telephony-kit](../skills/telephony-kit/SKILL.md) | 蜂窝通信、电话、短信、SIM卡、移动数据 |
| [call-service-kit](../skills/call-service-kit/SKILL.md) | 通话服务、来电显示、去电、通话UI、企业来电 |

### 7. 安全与认证（7）

加密解密、证书管理、密钥管理、用户认证、DRM、设备安全等安全能力。

| Kit | 关键词 |
|-----|--------|
| [crypto-architecture-kit](../skills/crypto-architecture-kit/SKILL.md) | 加解密、AES、RSA、签名、验签、哈希、HMAC、安全随机数、密钥派生 |
| [device-certificate-kit](../skills/device-certificate-kit/SKILL.md) | 设备证书、证书解析、X.509、证书链验证、凭证管理 |
| [device-security-kit](../skills/device-security-kit/SKILL.md) | 设备安全、设备认证、安全检测、可信认证、反欺诈、隐私保护 |
| [universal-keystore-kit](../skills/universal-keystore-kit/SKILL.md) | 密钥管理、密钥生成、密钥导入导出、密钥协商、密钥认证、访问控制 |
| [user-authentication-kit](../skills/user-authentication-kit/SKILL.md) | 用户认证、锁屏PIN、人脸识别、指纹认证、凭据管理 |
| [online-authentication-kit](../skills/online-authentication-kit/SKILL.md) | 在线认证、FIDO、Passkey、无密码认证、生物识别、IFAA |
| [drm-kit](../skills/drm-kit/SKILL.md) | 数字版权管理、DRM、内容加密、许可证管理 |

### 8. 位置与地图（2）

定位、地理围栏、地图展示、POI搜索、路线规划等位置服务。

| Kit | 关键词 |
|-----|--------|
| [location-kit](../skills/location-kit/SKILL.md) | 定位、GNSS、地理围栏、逆地理编码、位置追踪 |
| [map-kit](../skills/map-kit/SKILL.md) | 地图、地图展示、标记、覆盖物、POI搜索、路线规划、地理编码 |

### 9. 设备与硬件交互（7）

传感器、输入法、手写笔、驱动开发、游戏外设、机械设备等硬件相关能力。

| Kit | 关键词 |
|-----|--------|
| [sensor-service-kit](../skills/sensor-service-kit/SKILL.md) | 传感器、加速度、陀螺仪、振动控制、动态传感器 |
| [input-kit](../skills/input-kit/SKILL.md) | 多模输入、触摸、鼠标、键盘、光标管理、输入事件分发 |
| [ime-kit](../skills/ime-kit/SKILL.md) | 输入法、IME框架、文本输入、键盘、输入法应用 |
| [pen-kit](../skills/pen-kit/SKILL.md) | 手写笔、触控笔、笔刷效果、压感、即时形状识别、全局取色 |
| [driver-development-kit](../skills/driver-development-kit/SKILL.md) | 驱动开发、USB驱动、HID驱动、串口驱动、外设驱动 |
| [game-controller-kit](../skills/game-controller-kit/SKILL.md) | 游戏手柄、游戏控制器、手柄输入、外设连接 |
| [mechanic-kit](../skills/mechanic-kit/SKILL.md) | 机械设备、云台控制、目标跟踪、精密控制 |

### 10. 账号、支付与钱包（5）

华为账号登录、联系人管理、应用内支付、鸿蒙支付、钱包服务等身份与支付能力。

| Kit | 关键词 |
|-----|--------|
| [account-kit](../skills/account-kit/SKILL.md) | 华为账号、一键登录、静默登录、UnionID、OpenID、用户信息、未成年人模式 |
| [contacts-kit](../skills/contacts-kit/SKILL.md) | 联系人、通讯录、联系人选择器、联系人增删改查 |
| [iap-kit](../skills/iap-kit/SKILL.md) | 应用内支付、IAP、消耗品、非消耗品、订阅、数字商品 |
| [payment-kit](../skills/payment-kit/SKILL.md) | 鸿蒙支付、数字货币、身份核验、营销服务 |
| [wallet-kit](../skills/wallet-kit/SKILL.md) | 钱包、数字车钥匙、公交卡、NFC、蓝牙控车 |

### 11. 推送与通知（3）

消息推送、本地通知、实况窗状态展示等消息通知能力。

| Kit | 关键词 |
|-----|--------|
| [push-kit](../skills/push-kit/SKILL.md) | 推送、消息推送、通知推送、VoIP、实时活动、卡片更新 |
| [notification-kit](../skills/notification-kit/SKILL.md) | 通知、本地通知、角标、进度条通知、跨设备通知 |
| [live-view-kit](../skills/live-view-kit/SKILL.md) | 实况窗、锁屏状态、通知中心、实时状态展示 |

### 12. 应用生态与服务（7）

应用市场、应用链接、广告、游戏服务、分享、扫码、融合场景等应用生态能力。

| Kit | 关键词 |
|-----|--------|
| [appgallery-kit](../skills/appgallery-kit/SKILL.md) | 应用市场、数字商品、应用推荐、按需分发、应用归因 |
| [app-linking-kit](../skills/app-linking-kit/SKILL.md) | 应用链接、延时链接、通用链接、AppGallery跳转 |
| [ads-kit](../skills/ads-kit/SKILL.md) | 广告、Banner广告、插屏广告、激励广告、开屏广告、原生广告、OAID |
| [game-service-kit](../skills/game-service-kit/SKILL.md) | 游戏服务、游戏登录、防沉迷、游戏支付、场景感知 |
| [share-kit](../skills/share-kit/SKILL.md) | 分享、跨应用分享、跨设备分享、文字分享、图片分享 |
| [scan-kit](../skills/scan-kit/SKILL.md) | 扫码、条码、二维码、二维码生成、AI扫码 |
| [scenario-fusion-kit](../skills/scenario-fusion-kit/SKILL.md) | 融合场景、智能表单、按钮交互、系统API访问 |

### 13. 文档与阅读（2）

PDF处理、电子书解析、阅读交互等文档能力。

| Kit | 关键词 |
|-----|--------|
| [pdf-kit](../skills/pdf-kit/SKILL.md) | PDF、PDF加载、PDF编辑、PDF预览、PDF注释、PDF转换 |
| [reader-kit](../skills/reader-kit/SKILL.md) | 阅读器、电子书、epub、txt、排版、阅读交互 |

### 14. 云服务与分布式（3）

Serverless云开发、跨设备协同、分布式管理等云端与分布式能力。

| Kit | 关键词 |
|-----|--------|
| [cloud-foundation-kit](../skills/cloud-foundation-kit/SKILL.md) | 云开发、Serverless、云函数、云数据库、云存储 |
| [distributed-service-kit](../skills/distributed-service-kit/SKILL.md) | 分布式、跨设备、设备管理、UIAbility连接、多设备协同 |
| [service-collaboration-kit](../skills/service-collaboration-kit/SKILL.md) | 协同服务、跨设备相机、跨设备扫码、跨设备图库 |

### 15. 企业管理（3）

企业数字空间、企业数据保护、设备管理等企业级管控能力。

| Kit | 关键词 |
|-----|--------|
| [enterprise-space-kit](../skills/enterprise-space-kit/SKILL.md) | 企业空间、工作空间、策略配置、文件传输审计、数据访问控制 |
| [enterprise-data-guard-kit](../skills/enterprise-data-guard-kit/SKILL.md) | 企业数据保护、文件分类、安全策略、水印、恢复密钥 |
| [mdm-kit](../skills/mdm-kit/SKILL.md) | 企业设备管理、MDM、设备管控、策略管理、应用管理 |

### 16. 系统服务与工具（11）

剪贴板、无障碍、国际化、测试、性能分析、日历、天气、UI设计等系统基础服务。

| Kit | 关键词 |
|-----|--------|
| [basic-services-kit](../skills/basic-services-kit/SKILL.md) | 基础服务、剪贴板、文件上传下载、压缩、打印、USB管理 |
| [accessibility-kit](../skills/accessibility-kit/SKILL.md) | 无障碍、屏幕朗读、焦点管理、辅助功能、包容性设计 |
| [localization-kit](../skills/localization-kit/SKILL.md) | 国际化、本地化、I18n、L10n、多语言、区域设置 |
| [test-kit](../skills/test-kit/SKILL.md) | 测试框架、单元测试、UI测试、性能测试、自动化测试 |
| [performance-analysis-kit](../skills/performance-analysis-kit/SKILL.md) | 性能分析、HiAppEvent、故障检测、性能监控、调试工具、hilog |
| [calendar-kit](../skills/calendar-kit/SKILL.md) | 日历、日程管理、日历账户、事件管理 |
| [weather-service-kit](../skills/weather-service-kit/SKILL.md) | 天气、天气预报、分钟级降水、天气预警、天文数据 |
| [ui-design-kit](../skills/ui-design-kit/SKILL.md) | UI设计、设计系统、光照效果、图标处理、多窗口 |
| [screen-time-guard-kit](../skills/screen-time-guard-kit/SKILL.md) | 屏幕时间、应用限制、守护策略、家长控制 |
| [desktop-extension-kit](../skills/desktop-extension-kit/SKILL.md) | 桌面拓展、状态栏、快捷栏、PC桌面、2in1设备 |
| [fast-kit](../skills/fast-kit/SKILL.md) | 算法加速、Segment Map、矩形划分、高性能数据结构 |

### 17. 健康、穿戴与车载（3）

运动健康数据、穿戴设备通信、车载服务。

| Kit | 关键词 |
|-----|--------|
| [health-service-kit](../skills/health-service-kit/SKILL.md) | 运动健康、健康数据、锻炼记录、实时运动、健康指标 |
| [wear-engine-kit](../skills/wear-engine-kit/SKILL.md) | 穿戴设备、手表通信、消息推送、传感器数据、设备状态 |
| [car-kit](../skills/car-kit/SKILL.md) | 车载、导航转移、应用共享、手机车机互联 |
