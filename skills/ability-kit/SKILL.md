---
name: ability-kit
description: Ability Kit提供HarmonyOS核心应用模型，支持应用生命周期管理、UIAbility与ServiceAbility组件、基于Want和Deep Linking的应用间跳转、意图框架、跨端协同和多窗口能力，兼容Stage模型和FA模型两种开发范式。
---

## 功能说明

Ability Kit（程序框架服务）是HarmonyOS应用程序开发和运行的核心框架，提供了完整的应用模型。开发者可以基于该框架实现不同类型的应用组件（UIAbility、ServiceAbility、PageAbility、DataAbility等），高效完成应用生命周期管理、组件间交互、进程线程管理等业务逻辑，无需关注底层实现细节。Ability Kit支持Stage模型和FA模型两种开发范式，其中Stage模型实现了UI与业务逻辑分离，支持应用组件级的跨端迁移和多端协同，适用于多设备和多窗口形态。

Ability Kit提供了强大的意图框架能力，支持通过配置文件或装饰器开发意图，实现拉起金融、邮件、航班、快递、导航、图片编辑等指定类型的应用。应用间跳转支持Deep Linking和App Linking两种方式，满足不同场景下的跨应用协作需求。Want作为信息传递载体，支持显式Want和隐式Want两种匹配规则，灵活实现组件间的数据传递与启动控制。

在进程与线程管理方面，Ability Kit提供了清晰的进程模型和线程模型，支持多进程架构和任务管理。应用启动框架（AppStartup）帮助开发者优化应用启动性能，应用上下文（Context）机制统一了资源访问和环境变量管理。此外还提供了权限申请、应用异常退出原因获取、UIAbility备份恢复、Native子进程管理等基础能力。

Stage模型作为推荐的开发范式，提供了UIAbility、ExtensionAbility（包括AppServiceExtensionAbility、EmbeddedUIExtensionAbility等）等丰富的组件类型。UIAbility组件支持多种启动模式（singleton、multiton、specified），具备完整的生命周期管理（Create、WindowStageCreate、Foreground、Background、Destroy），并能与UI层实现双向数据同步。

FA模型作为兼容性开发范式，提供了PageAbility、ServiceAbility、DataAbility三种组件类型，分别用于页面展示、后台服务和数据访问场景。DataAbility组件支持权限控制和跨应用数据共享，ServiceAbility支持启动和连接两种使用方式。

## 使用场景

当开发者需要构建HarmonyOS应用程序时，Ability Kit是必不可少的框架。无论你是开发简单的单页面应用还是复杂的多组件协作应用，都需要通过Ability Kit定义应用模型、管理组件生命周期和配置应用权限。如果你需要实现UIAbility组件的开发、页面间导航或应用间跳转，应使用Ability Kit提供的Stage模型和Want机制。

当开发者需要实现跨应用协作或拉起指定类型应用时，应使用Ability Kit的意图框架和应用链接能力。例如需要拉起金融类、邮件类、航班类、快递类、导航类或图片编辑类应用时，可以通过startAbilityByType接口实现。如果你需要实现Deep Linking或App Linking跳转，或者需要通过意图框架接入标准意图，Ability Kit提供了完整的开发指导。

当开发者需要实现多端协同、跨设备迁移或应用启动优化时，Ability Kit提供了Call调用、应用启动框架AppStartup、应用预加载等能力。如果你需要管理Native子进程、获取应用异常退出原因、或进行应用备份恢复，也应当使用Ability Kit的相关能力。

## 典型场景

- 如何创建和管理UIAbility组件的生命周期（Create、Foreground、Background、Destroy）
- 如何使用Want实现应用间跳转和组件间数据传递
- 如何通过Deep Linking和App Linking实现跨应用跳转
- 如何使用startAbilityByType拉起金融、邮件、航班、快递、导航、图片编辑等指定类型应用
- 如何使用Stage模型和FA模型开发应用，两者有什么区别
- 如何通过意图框架（配置文件或装饰器方式）开发意图并接入标准意图
- 如何使用应用启动框架AppStartup优化应用启动性能
- 如何创建和管理ServiceAbility、DataAbility、PageAbility等FA模型组件
- 如何通过Call调用实现多端协同和跨设备迁移
- 如何申请运行时权限、获取应用异常退出原因、管理Native子进程

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### Kit简介与术语

- [Ability Kit简介](references/Ability Kit简介.md) - 介绍Ability Kit的能力范围、使用场景和核心特征，包括应用模型、组件类型和开发范式的总体说明
- [Ability Kit术语](references/Ability Kit术语.md) - 解释Ability Kit开发中涉及的关键术语，包括UIAbility、ExtensionAbility、Stage模型、FA模型、Want等概念的定义和含义

### 应用模型与配置

- [应用模型](references/应用模型.md) - 介绍HarmonyOS应用模型的整体架构，包括Stage模型和FA模型两种开发范式的对比和适用场景
- [应用/组件级配置](references/应用_组件级配置-1.md) - 详细说明Stage模型下应用级和组件级的配置方法，包括module.json5配置文件中各字段的含义和使用规范
- [应用/组件级配置](references/应用_组件级配置.md) - 详细说明FA模型下应用级和组件级的配置方法，包括config.json配置文件的编写规范
- [应用上下文Context](references/应用上下文Context.md) - 介绍应用上下文Context的概念、获取方式和使用方法，包括资源管理、文件访问和环境变量等能力
- [进程模型概述](references/进程模型概述.md) - 介绍HarmonyOS应用的进程模型架构，包括主进程、渲染进程和子进程的概念及运行机制
- [进程模型](references/进程模型.md) - 详细说明进程模型的运行机制，包括进程创建、进程间通信和多进程场景下的开发注意事项

### Stage模型开发

- [Stage模型开发概述](references/Stage模型开发概述.md) - 介绍Stage模型的开发理念、核心概念和整体架构，帮助开发者理解Stage模型的设计思想和优势
- [Stage模型应用配置文件](references/Stage模型应用配置文件.md) - 说明Stage模型应用配置文件app.json5和module.json5的结构、字段定义和配置方法
- [线程模型](references/线程模型.md) - 详细介绍Stage模型下的线程模型，包括主线程、TaskPool线程和Worker线程的使用场景和开发指导
- [组件启动规则（Stage模型）](references/组件启动规则（Stage模型）.md) - 说明Stage模型下应用组件的启动规则和权限要求，包括同应用和跨应用组件启动的约束条件

### UIAbility组件

- [UIAbility组件概述](references/UIAbility组件概述.md) - 介绍UIAbility组件的基本概念、设计理念和在Stage模型中的核心地位
- [UIAbility组件基本用法](references/UIAbility组件基本用法.md) - 详细说明UIAbility组件的创建方法、基本使用流程和开发步骤，包括如何实现一个简单的UIAbility
- [UIAbility组件生命周期](references/UIAbility组件生命周期.md) - 介绍UIAbility组件的完整生命周期流程，包括Create、WindowStageCreate、Foreground、Background、Destroy等回调的使用
- [UIAbility组件启动模式](references/UIAbility组件启动模式.md) - 说明UIAbility组件支持的三种启动模式（singleton、multiton、specified）的配置方法和使用场景
- [UIAbility组件与UI的数据同步](references/UIAbility组件与UI的数据同步.md) - 介绍UIAbility组件与UI层之间的数据同步机制，包括EventHub和AppStorage等方式
- [UIAbility备份恢复](references/UIAbility备份恢复.md) - 说明UIAbility组件的备份和恢复能力，帮助应用实现数据保护和灾难恢复功能
- [启动应用内的UIAbility组件](references/启动应用内的UIAbility组件.md) - 介绍在同一应用内启动UIAbility组件的方法，包括通过Want传递参数和获取返回结果
- [AbilityStage组件管理器](references/AbilityStage组件管理器.md) - 介绍AbilityStage组件管理器的概念和使用方法，包括HAP加载时的回调处理
- [使用AppServiceExtensionAbility组件实现后台服务](references/使用AppServiceExtensionAbility组件实现后台服务.md) - 说明如何使用AppServiceExtensionAbility扩展组件实现后台长时运行的服务能力
- [EmbeddedUIExtensionAbility](references/EmbeddedUIExtensionAbility.md) - 介绍嵌入式UI扩展能力的使用方法，支持将其他应用的UI界面嵌入到当前应用中显示

### FA模型开发

- [FA模型开发概述](references/FA模型开发概述.md) - 介绍FA模型的设计理念、核心概念和整体架构，帮助开发者理解FA模型与Stage模型的区别
- [FA模型应用配置文件](references/FA模型应用配置文件.md) - 说明FA模型应用配置文件config.json的结构、字段定义和配置方法
- [FA模型的Context](references/FA模型的Context.md) - 介绍FA模型下应用上下文Context的获取方式和使用方法
- [线程模型](references/线程模型-1.md) - 详细介绍FA模型下的线程模型，包括主线程和Worker线程的使用场景和开发注意事项
- [组件启动规则（FA模型）](references/组件启动规则（FA模型）.md) - 说明FA模型下应用组件的启动规则和权限要求，包括同应用和跨应用组件启动的约束条件

### PageAbility组件

- [PageAbility组件概述](references/PageAbility组件概述.md) - 介绍PageAbility组件的基本概念、设计理念和在FA模型中的核心地位
- [创建PageAbility](references/创建PageAbility.md) - 详细说明如何创建一个PageAbility组件，包括代码实现和配置文件的编写方法
- [PageAbility组件配置](references/PageAbility组件配置.md) - 介绍PageAbility组件在config.json中的配置方法，包括各项属性的含义和使用规范
- [PageAbility的生命周期](references/PageAbility的生命周期.md) - 说明PageAbility组件的完整生命周期流程，包括Initialize、Active、Inactive、Background等回调的使用
- [PageAbility的启动模式](references/PageAbility的启动模式.md) - 介绍PageAbility组件支持的启动模式，包括单实例和多实例模式的配置方法
- [启动本地PageAbility](references/启动本地PageAbility.md) - 介绍启动同一应用内PageAbility组件的方法，包括参数传递和返回结果处理
- [启动指定页面](references/启动指定页面.md) - 说明如何启动PageAbility中的指定页面，实现精确的页面导航
- [启动远程PageAbility](references/启动远程PageAbility.md) - 介绍跨应用启动PageAbility组件的方法，包括跨设备启动的实现方式
- [停止PageAbility](references/停止PageAbility.md) - 说明如何正确停止PageAbility组件，包括资源释放和生命周期管理

### ServiceAbility组件

- [ServiceAbility组件概述](references/ServiceAbility组件概述.md) - 介绍ServiceAbility组件的基本概念和适用场景，用于实现后台服务和长时任务
- [创建ServiceAbility](references/创建ServiceAbility.md) - 详细说明如何创建一个ServiceAbility组件，包括代码实现和配置方法
- [ServiceAbility组件配置](references/ServiceAbility组件配置.md) - 介绍ServiceAbility组件在config.json中的配置方法，包括各项属性的含义
- [ServiceAbility的生命周期](references/ServiceAbility的生命周期.md) - 说明ServiceAbility组件的生命周期管理，包括Connect和Disconnect回调的处理
- [启动ServiceAbility](references/启动ServiceAbility.md) - 介绍通过startAbility方式启动ServiceAbility的方法和使用场景
- [连接ServiceAbility](references/连接ServiceAbility.md) - 介绍通过connectAbility方式连接ServiceAbility的方法，实现跨组件的服务调用和数据交互

### DataAbility组件

- [DataAbility组件概述](references/DataAbility组件概述.md) - 介绍DataAbility组件的基本概念，用于实现跨应用的数据共享和访问
- [创建DataAbility](references/创建DataAbility.md) - 详细说明如何创建一个DataAbility组件，包括数据操作接口的实现方法
- [DataAbility组件配置](references/DataAbility组件配置.md) - 介绍DataAbility组件在config.json中的配置方法，包括数据访问路径和权限声明
- [DataAbility的生命周期](references/DataAbility的生命周期.md) - 说明DataAbility组件的生命周期管理，包括初始化和数据操作的回调处理
- [DataAbility权限控制](references/DataAbility权限控制.md) - 介绍DataAbility组件的权限控制机制，包括读写权限的配置和跨应用访问的安全策略
- [启动DataAbility](references/启动DataAbility.md) - 介绍启动DataAbility组件的方法和使用场景
- [访问DataAbility](references/访问DataAbility.md) - 详细说明如何通过DataAbilityHelper访问其他应用的DataAbility，实现跨应用数据读写

### Want与应用间跳转

- [Want概述](references/Want概述.md) - 介绍Want作为信息传递载体的基本概念、属性和使用场景
- [信息传递载体Want](references/信息传递载体Want.md) - 详细说明Want的完整属性定义和使用方法，包括显式Want和隐式Want的构造方式
- [显式Want与隐式Want匹配规则](references/显式Want与隐式Want匹配规则.md) - 说明显式Want和隐式Want的匹配规则和优先级，帮助开发者正确使用Want实现组件启动
- [常见action与entities（不推荐使用）](references/常见action与entities（不推荐使用）.md) - 列出系统中常见的action和entities定义及其使用说明（已不推荐使用，建议迁移到应用链接方式）
- [使用显式Want启动应用组件](references/使用显式Want启动应用组件.md) - 介绍如何通过显式Want精确定位并启动目标应用组件的方法和开发步骤
- [应用间跳转概述](references/应用间跳转概述.md) - 介绍HarmonyOS应用间跳转的总体架构，包括Deep Linking和App Linking两种方式的对比
- [应用链接说明](references/应用链接说明.md) - 详细说明应用链接（App Linking）的概念、配置方法和使用规范
- [使用Deep Linking实现应用间跳转](references/使用Deep Linking实现应用间跳转.md) - 介绍通过Deep Linking实现应用间跳转的完整开发流程，包括链接配置和跳转实现
- [使用App Linking实现应用间跳转](references/使用App Linking实现应用间跳转.md) - 介绍通过App Linking实现应用间跳转的完整开发流程，包括链接验证和跳转规则
- [跳转规则](references/跳转规则.md) - 说明应用间跳转的优先级规则和匹配逻辑，包括Deep Linking和App Linking的优先级判断
- [获取目标应用的URL信息](references/获取目标应用的URL信息.md) - 介绍如何获取目标应用支持的URL信息，用于构建正确的应用链接
- [（可选）使用canOpenLink判断应用是否可访问](references/（可选）使用canOpenLink判断应用是否可访问.md) - 说明如何使用canOpenLink接口判断目标应用链接的可达性，优化跳转体验
- [显式Want跳转切换应用链接跳转适配指导](references/显式Want跳转切换应用链接跳转适配指导.md) - 提供从显式Want跳转方式迁移到应用链接跳转方式的适配指导和最佳实践

### 拉起指定应用

- [拉起指定应用概述](references/拉起指定应用概述.md) - 介绍拉起指定类型应用的总体方案和使用场景，包括startAbilityByType接口的设计思路
- [拉起指定类型的应用概述](references/拉起指定类型的应用概述.md) - 概述支持拉起的各类应用类型，包括金融、邮件、航班、快递、导航和图片编辑等
- [拉起金融类应用（startAbilityByType）](references/拉起金融类应用（startAbilityByType）.md) - 介绍如何使用startAbilityByType接口拉起金融类应用，实现支付、转账等金融场景的跳转
- [拉起邮件类应用（startAbilityByType）](references/拉起邮件类应用（startAbilityByType）.md) - 介绍如何使用startAbilityByType接口拉起邮件类应用，实现邮件发送和查看功能
- [拉起邮件类应用（mailto方式）](references/拉起邮件类应用（mailto方式）.md) - 介绍通过mailto协议方式拉起邮件应用的方法，适用于简单的邮件发送场景
- [拉起航班类应用（startAbilityByType）](references/拉起航班类应用（startAbilityByType）.md) - 介绍如何使用startAbilityByType接口拉起航班类应用，实现航班查询和预订功能
- [拉起文件处理类应用（startAbility）](references/拉起文件处理类应用（startAbility）.md) - 介绍如何使用startAbility接口拉起文件处理类应用，实现文件打开、编辑和分享功能
- [拉起快递类应用（startAbilityByType）](references/拉起快递类应用（startAbilityByType）.md) - 介绍如何使用startAbilityByType接口拉起快递类应用，实现快递查询和物流追踪功能
- [拉起导航类应用（startAbilityByType）](references/拉起导航类应用（startAbilityByType）.md) - 介绍如何使用startAbilityByType接口拉起导航类应用，实现路线规划和导航跳转
- [拉起图片编辑类应用（startAbilityByType）](references/拉起图片编辑类应用（startAbilityByType）.md) - 介绍如何使用startAbilityByType接口拉起图片编辑类应用，实现图片裁剪、滤镜等编辑功能
- [拉起系统应用](references/拉起系统应用.md) - 介绍如何拉起系统内置应用，包括拨号、短信、浏览器等系统应用的调用方法

### 意图框架

- [意图框架概述](references/意图框架概述.md) - 介绍HarmonyOS意图框架的设计理念、整体架构和核心概念，帮助开发者理解意图驱动开发的思想
- [意图开发概述](references/意图开发概述.md) - 概述意图开发的两种方式（配置文件和装饰器），包括开发流程和基本步骤
- [使用配置文件开发意图](references/使用配置文件开发意图.md) - 详细说明如何通过配置文件方式开发意图，包括意图定义、参数配置和关联规则的编写方法
- [使用装饰器开发意图](references/使用装饰器开发意图.md) - 详细说明如何通过装饰器方式开发意图，包括注解使用和意图函数的定义方法
- [调试意图](references/调试意图.md) - 介绍意图开发的调试方法和工具，帮助开发者排查意图匹配和执行过程中的问题
- [附录：标准意图接入规范](references/附录：标准意图接入规范.md) - 提供标准意图接入的完整规范说明，包括意图命名规范、参数定义规范和接入流程

### 多端协同与其他能力

- [通过Call调用实现多端协同](references/通过Call调用实现多端协同.md) - 介绍如何通过Call调用机制实现多设备间的协同操作，包括跨设备组件调用和数据传递
- [申请授权](references/申请授权.md) - 介绍应用运行时权限的申请方法，包括权限声明、动态申请和用户授权流程
- [获取应用异常退出原因](references/获取应用异常退出原因.md) - 说明如何获取应用异常退出的原因信息，帮助开发者定位和修复崩溃问题
- [获取/设置环境变量](references/获取_设置环境变量.md) - 介绍应用环境变量的获取和设置方法，用于管理应用运行环境的配置参数
- [应用预加载](references/应用预加载.md) - 介绍应用预加载功能，通过提前加载资源来优化应用启动速度和用户体验
- [应用启动框架AppStartup](references/应用启动框架AppStartup.md) - 详细说明AppStartup框架的使用方法，帮助开发者优化应用启动流程和初始化任务管理
- [窗口属性](references/窗口属性.md) - 介绍窗口属性的配置方法，包括窗口尺寸、位置、亮度等属性的设置和获取
- [创建/终止Native子进程（C/C++）](references/创建_终止Native子进程（C_C++）.md) - 介绍如何通过C/C++接口创建和终止Native子进程，实现多进程架构下的任务处理
- [获取Native子进程退出信息](references/获取Native子进程退出信息.md) - 说明如何获取Native子进程的退出状态和退出原因信息，用于进程生命周期管理

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `87` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **Ability Kit术语** — AbilityStage 是一个 Module 级别的组件管理器。 #### ArkTS子进程 ArkTS子进程是指启动后系统默认创建ArkTS运行时环境的应用子进程。 #### App Linking App Linking是一种实现应用间跳转的技术，通过系统传入的uri信息（HTTPS链接）将用户引导至目标应用中的特定内容。无论目标应用是否已安装，用户都… [`references/Ability Kit术语.md`](<references/Ability Kit术语.md>)
- **Ability Kit简介** — Ability Kit（程序框架服务）提供了应用程序开发和运行的应用模型。开发者可以基于应用模型，实现不同类型的应用组件，更加简单高效地完成应用生命周期管理、组件间交互、进程线程管理等业务逻辑，无需关注底层实现细节。 #### 使用场景 - 应用的多Module开发：应用可通过不同类型的Module（HAP、HAR、HSP）来实现应用的功能开发。其中，HAP… [`references/Ability Kit简介.md`](<references/Ability Kit简介.md>)
- **AbilityStage组件管理器** — AbilityStage 是一个 Module 级别的组件管理器，应用的 HAP 在首次加载时会创建一个AbilityStage实例，可以对该Module进行初始化等操作。AbilityStage与HAP一一对应，即每个HAP拥有一个AbilityStage实例。 AbilityStage拥有 onCreate() 、 onDestroy() 生命周期回调和… [`references/AbilityStage组件管理器.md`](<references/AbilityStage组件管理器.md>)
- **DataAbility权限控制** — DataAbility提供数据服务，并不是所有的Ability都有权限读写它，DataAbility有一套权限控制机制来保证数据安全。分为静态权限控制和动态权限控制两部分。 #### 静态权限控制 DataAbility作为服务端，在被拉起的时候，会根据config.json里面配置的权限来进行校验，有"readPermission"、"writePermi… [`references/DataAbility权限控制.md`](<references/DataAbility权限控制.md>)
- **DataAbility的生命周期** — 应用开发者可以根据业务场景实现data.js/data.ets中的生命周期相关接口。DataAbility生命周期接口说明见下表。 **表1** DataAbility相关生命周期API功能介绍 [`references/DataAbility的生命周期.md`](<references/DataAbility的生命周期.md>)
- **DataAbility组件概述** — DataAbility，即"使用Data模板的Ability"，主要用于对外部提供统一的数据访问对象，不提供用户交互界面。DataAbility可由PageAbility、ServiceAbility或其他应用启动，即使用户切换到其他应用，DataAbility仍将在后台继续运行。 使用DataAbility有助于应用管理其自身和其他应用存储数据的访问，并提… [`references/DataAbility组件概述.md`](<references/DataAbility组件概述.md>)
- **DataAbility组件配置** — DataAbility的提供方和使用方都通过URI（Uniform Resource Identifier）来标识一个具体的数据，例如数据库中的某个表或磁盘上的某个文件。此处的URI仍基于URI通用标准，格式如下： - scheme：协议方案名，固定为"dataability"，代表Data Ability所使用的协议类型。 - authority：设备ID… [`references/DataAbility组件配置.md`](<references/DataAbility组件配置.md>)
- **EmbeddedUIExtensionAbility** — EmbeddedUIExtensionAbility 是EMBEDDED_UI类型的 ExtensionAbility 组件，提供了跨进程界面嵌入的能力。 EmbeddedUIExtensionAbility需要和 EmbeddedComponent 一起配合使用，开发者可以在 UIAbility 的页面中通过EmbeddedComponent嵌入本应用的E… [`references/EmbeddedUIExtensionAbility.md`](<references/EmbeddedUIExtensionAbility.md>)
- **FA模型应用配置文件** — 应用配置文件中包含应用配置信息、应用组件信息、权限信息、开发者自定义信息等，这些信息在编译构建、分发和运行阶段分别提供给编译工具、应用市场和操作系统使用。 在基于 FA模型 开发的应用项目代码下，均包含一个config.json配置文件，常用配置项请参见 应用/组件级配置 。对于这两种配置文件的更多介绍，请参见 应用配置文件概述(FA模型) 。 [`references/FA模型应用配置文件.md`](<references/FA模型应用配置文件.md>)
- **FA模型开发概述** — 基于 FA模型 开发应用时，在应用模型部分，涉及如下开发过程。 **表1** FA模型开发流程 [`references/FA模型开发概述.md`](<references/FA模型开发概述.md>)
- **FA模型的Context** — FA模型 下只有一个Context。Context中的所有功能都是通过方法来提供的，它提供了一些featureAbility中不存在的方法，相当于featureAbility的一个扩展和补全。 #### 接口说明 FA模型下使用Context，需要通过featureAbility下的接口getContext来获取，而在此之前，需要先导入对应的包： impor… [`references/FA模型的Context.md`](<references/FA模型的Context.md>)
- **PageAbility的启动模式** — 启动模式对应PageAbility被启动时的行为，支持单实例模式、多实例模式两种启动模式。 **表1** PageAbility的启动模式 开发者可在config.json配置文件中通过“launchType”配置启动模式。示例如下： { "module": { ... "abilities": [ { // singleton: 单实例模式 // mult… [`references/PageAbility的启动模式.md`](<references/PageAbility的启动模式.md>)
- **PageAbility的生命周期** — PageAbility生命周期是PageAbility被调度到INACTIVE、ACTIVE、BACKGROUND等各个状态的统称。PageAbility生命周期流转及状态说明如图1、表1所示。 **图1** PageAbility生命周期流转 **表1** PageAbility生命周期状态说明 开发者可以在app.js/app.ets中实现生命周期相关回… [`references/PageAbility的生命周期.md`](<references/PageAbility的生命周期.md>)
- **PageAbility组件概述** — PageAbility是包含UI、提供展示UI能力的应用组件，主要用于与用户交互。 开发者通过DevEco Studio开发平台创建PageAbility时，DevEco Studio会自动创建相关模板代码。PageAbility相关能力通过单独的featureAbility实现，生命周期相关回调则通过app.js/app.ets中各个回调函数实现。 [`references/PageAbility组件概述.md`](<references/PageAbility组件概述.md>)
- **PageAbility组件配置** — PageAbility的相关配置在config.json配置文件的"module"对象的"abilities"对象中，"icon"属性表示Ability图标资源文件的索引，"label"属性表示Ability对用户显示的名称，"skills"属性表示Ability能够接收的want的特征。 **表1** PageAbility部分配置项说明 [`references/PageAbility组件配置.md`](<references/PageAbility组件配置.md>)
- **ServiceAbility的生命周期** — 开发者可以根据业务场景实现service.js/service.ets中的生命周期相关接口。ServiceAbility生命周期接口说明见下表。 **表1** ServiceAbility生命周期接口说明 [`references/ServiceAbility的生命周期.md`](<references/ServiceAbility的生命周期.md>)
- **ServiceAbility组件概述** — ServiceAbility，即"基于Service模板的Ability"，主要用于后台运行任务（如执行音乐播放、文件下载等），不提供用户交互界面。ServiceAbility可由其他应用或PageAbility启动，即使用户切换到其他应用，ServiceAbility仍将在后台继续运行。 [`references/ServiceAbility组件概述.md`](<references/ServiceAbility组件概述.md>)
- **ServiceAbility组件配置** — 与PageAbility类似，ServiceAbility的相关配置在config.json配置文件的"module"对象的"abilities"对象中，与PageAbility的区别在于"type"属性及"backgroundModes"属性。 **表1** ServiceAbility部分配置项说明 ServiceAbility支持的配置项及详细说明详见… [`references/ServiceAbility组件配置.md`](<references/ServiceAbility组件配置.md>)
- **Stage模型应用配置文件** — 应用配置文件中包含应用配置信息、应用组件信息、权限信息、开发者自定义信息等，这些信息在编译构建、分发和运行阶段分别提供给编译工具、应用市场和操作系统使用。 在基于 Stage模型 开发的应用项目代码下，均包含app.json5（一个）和module.json5（一个或多个）两种配置文件，常用配置项请参见 应用/组件级配置 。对于这两种配置文件的更多介绍，请参… [`references/Stage模型应用配置文件.md`](<references/Stage模型应用配置文件.md>)
- **Stage模型开发概述** — 下图展示了 Stage模型 中的基本概念。 **图1** Stage模型概念图 - AbilityStage 每个Entry类型或者Feature类型的 HAP 在运行期都有一个AbilityStage实例，当 HAP 中的代码首次被加载到进程中的时候，系统会先创建AbilityStage实例。 - UIAbility组件 和 ExtensionAbilit… [`references/Stage模型开发概述.md`](<references/Stage模型开发概述.md>)
- **UIAbility备份恢复** — 当应用后台运行时，可能由于系统资源管控等原因导致应用关闭、进程退出，应用直接退出可能会导致用户数据丢失。如果应用在 UIAbilityContext 中启用了 UIAbility 备份恢复功能，并对临时数据进行保存，则可以在应用退出后的下一次启动时恢复先前的状态和数据（包括应用的页面栈以及 onSaveState 接口中保存的数据），从而保证用户体验的连贯性… [`references/UIAbility备份恢复.md`](<references/UIAbility备份恢复.md>)
- **UIAbility组件与UI的数据同步** — 基于当前的应用模型，可以通过以下几种方式来实现 UIAbility 组件与UI之间的数据同步。 - 使用EventHub进行数据通信：在基类Context中提供了EventHub对象，可以通过发布订阅方式来实现事件的传递。在事件传递前，订阅者需要先进行订阅，当发布者发布事件时，订阅者将接收到事件并进行相应处理。 - 使用AppStorage/LocalSto… [`references/UIAbility组件与UI的数据同步.md`](<references/UIAbility组件与UI的数据同步.md>)
- **UIAbility组件启动模式** — UIAbility 的启动模式是指UIAbility实例在启动时的不同呈现状态。针对不同的业务场景，系统提供了三种启动模式： - singleton（单实例模式） - multiton（多实例模式） - specified（指定实例模式） standard是multiton的曾用名，效果与多实例模式一致。 #### singleton启动模式 singlet… [`references/UIAbility组件启动模式.md`](<references/UIAbility组件启动模式.md>)
- **UIAbility组件基本用法** — 本文主要介绍 UIAbility 组件的基本用法，包括： - 指定UIAbility的启动页面。 - 获取UIAbility的上下文UIAbilityContext。 - 获取UIAbility拉起方的信息。 #### 指定UIAbility的启动页面 应用中的 UIAbility 在启动过程中，需要指定启动页面，否则应用启动后会因为没有默认加载页面而导致白… [`references/UIAbility组件基本用法.md`](<references/UIAbility组件基本用法.md>)
- **UIAbility组件概述** — UIAbility 组件是一种包含UI的应用组件，主要用于和用户交互。例如，图库类应用可以在UIAbility组件中展示图片瀑布流。 UIAbility的设计理念： 1. 支持应用组件级的跨端迁移和多端协同。 2. 支持多设备和多窗口形态。 UIAbility划分原则与建议： UIAbility组件是系统调度的基本单元，为应用提供绘制界面的窗口。一个应用可以… [`references/UIAbility组件概述.md`](<references/UIAbility组件概述.md>)
- **UIAbility组件生命周期** — 当用户在执行应用启动、应用前后台切换、应用退出等操作时，系统会触发相关应用组件的生命周期回调。其中，UIAbility组件的核心生命周期回调包括 onCreate 、 onForeground 、 onBackground 、 onDestroy 。作为一种包含UI的应用组件，UIAbility的生命周期不可避免地与 WindowStage 的生命周期存在关… [`references/UIAbility组件生命周期.md`](<references/UIAbility组件生命周期.md>)
- **Want概述** — Want 是一种对象，用于在应用组件之间传递信息。 其中，一种常见的使用场景是作为 startAbility() 方法的参数。例如，当UIAbilityA需要启动UIAbilityB并向UIAbilityB传递一些数据时，可以使用Want作为一个载体，将数据传递给UIAbilityB。 **图1** Want用法示意 #### Want的类型 - **显式W… [`references/Want概述.md`](<references/Want概述.md>)
- **使用App Linking实现应用间跳转** — 请参考 App Linking Kit 中的 通过App Linking应用链接拉起指定应用 章节，实现应用间跳转。 [`references/使用App Linking实现应用间跳转.md`](<references/使用App Linking实现应用间跳转.md>)
- **使用AppServiceExtensionAbility组件实现后台服务** — 从API version 20开始，支持开发者使用 AppServiceExtensionAbility 组件，为应用提供后台服务能力，其他三方应用可通过启动或连接该AppServiceExtensionAbility组件获取相应的服务。 例如，企业部署的数据防泄漏 (DLP) 软件需要能够长期无界面运行，持续监听文件操作、网络流量，并拦截违规行为，可以使用… [`references/使用AppServiceExtensionAbility组件实现后台服务.md`](<references/使用AppServiceExtensionAbility组件实现后台服务.md>)
- **使用Deep Linking实现应用间跳转** — 采用Deep Linking进行跳转时，系统会根据接口中传入的uri信息，在本地已安装的应用中寻找到符合条件的应用并进行拉起。当匹配到多个应用时，会拉起应用选择框。 #### 实现原理 Deep Linking基于隐式Want匹配机制中的uri匹配来查询、拉起目标应用。隐式Want的uri匹配规则详见 uri匹配规则 。 #### 目标应用操作指导 ####… [`references/使用Deep Linking实现应用间跳转.md`](<references/使用Deep Linking实现应用间跳转.md>)
- **使用显式Want启动应用组件** — 在应用使用场景中，当用户在应用内点击某个按钮时，经常需要拉起指定UIAbility组件来完成某些特定任务。在启动UIAbility时，指定了abilityName和bundleName参数，可以使用显式Want方式启动UIAbility。 针对应用的特定任务，用户需要通过点击应用内的按钮来启动指定的UIAbility组件。在启动UIAbility时，需要提供… [`references/使用显式Want启动应用组件.md`](<references/使用显式Want启动应用组件.md>)
- **使用装饰器开发意图** — 从 API version 20开始，支持通过装饰器开发意图，支持将现有功能通过装饰器快速集成至系统入口。典型场景介绍如下。 #### 运行机制 #### 开发步骤 本章节以通过@InsightIntentEntry开发标准意图和自定义意图举例，其他装饰器开发标准意图和自定义意图与@InsightIntentEntry相似，可以结合API参考开发其他类型的意… [`references/使用装饰器开发意图.md`](<references/使用装饰器开发意图.md>)
- **使用配置文件开发意图** — 从API version 11及以上版本，支持通过配置文件开发意图。主要包含两个环节： 1. 通过 insight_intent.json配置文件 定义意图，声明意图执行器的代码路径、绑定的Ability组件等意图信息。 2. 通过 InsightIntentExecutor 实现意图执行逻辑。 不同Ability组件类型需要配置的字段与需要实现的意图执行器… [`references/使用配置文件开发意图.md`](<references/使用配置文件开发意图.md>)
- **信息传递载体Want** — 请参见 Stage模型 的" 信息传递载体Want "。 [`references/信息传递载体Want.md`](<references/信息传递载体Want.md>)
- **停止PageAbility** — 停止PageAbility通过featureAbility中的terminateSelf接口实现。 **表1** featureAbility接口说明 如下示例展示了停止Ability的方法。 import featureAbility from '@ohos.ability.featureAbility'; import hilog from '@ohos… [`references/停止PageAbility.md`](<references/停止PageAbility.md>)
- **创建DataAbility** — 实现DataAbility中Insert、Query、Update、Delete接口的业务内容。保证能够满足数据库存储业务的基本需求。BatchInsert与ExecuteBatch接口已经在系统中实现遍历逻辑，依赖Insert、Query、Update、Delete接口逻辑，来实现数据的批量处理。 创建DataAbility的代码示例如下： import … [`references/创建DataAbility.md`](<references/创建DataAbility.md>)
- **创建PageAbility** — 通过DevEco Studio开发平台创建PageAbility时，DevEco Studio会在app.js/app.ets中默认生成onCreate()和onDestroy()方法，其他方法需要开发者自行实现。接口说明参见 PageAbility的生命周期 ，创建PageAbility示例如下： import featureAbility from '@… [`references/创建PageAbility.md`](<references/创建PageAbility.md>)
- **创建ServiceAbility** — 1. 创建ServiceAbility。 通过DevEco Studio开发平台创建ServiceAbility时，DevEco Studio会默认生成onStart、onStop、onCommand方法，其他方法需要开发者自行实现，接口说明参见前述章节。开发者也可以添加其他Ability请求与ServiceAbility交互时的处理方法，示例如下： imp… [`references/创建ServiceAbility.md`](<references/创建ServiceAbility.md>)
- **创建/终止Native子进程（C/C++）** — 本模块提供了两种创建 Native子进程 的方式，以及一种终止子进程的方式。 - 创建支持IPC通信的Native子进程：创建子进程，并在父子进程间建立IPC通道，适用于父子进程需要IPC通信的场景。对IPCKit存在依赖。 - 创建支持参数传递的Native子进程：创建子进程，并传递字符串和fd句柄参数到子进程。适用于需要传递参数到子进程的场景。 - 终止… [`references/创建_终止Native子进程（C_C++）.md`](<references/创建_终止Native子进程（C_C++）.md>)
- **启动DataAbility** — 启动DataAbility会获取一个工具接口类对象（DataAbilityHelper）。启动DataAbility的示例代码如下： import featureAbility from '@ohos.ability.featureAbility'; import ability from '@ohos.ability.ability'; let uri: … [`references/启动DataAbility.md`](<references/启动DataAbility.md>)
- **启动ServiceAbility** — ServiceAbility的启动与其他Ability并无区别，应用开发者可以在PageAbility中通过featureAbility的startAbility接口拉起ServiceAbility，在ServiceAbility中通过particleAbility的startAbility接口拉起ServiceAbility。ServiceAbility的… [`references/启动ServiceAbility.md`](<references/启动ServiceAbility.md>)
- **启动应用内的UIAbility组件** — UIAbility 是系统调度的最小单元。在设备内的功能模块之间跳转时，会涉及到启动特定的UIAbility，包括应用内的其他UIAbility、或者其他应用的UIAbility（例如启动三方支付UIAbility）。 本文主要介绍启动应用内的UIAbility组件的方式。应用间的组件跳转详见 应用间跳转 。 - 启动应用内的UIAbility - 启动应用… [`references/启动应用内的UIAbility组件.md`](<references/启动应用内的UIAbility组件.md>)
- **启动指定页面** — 当PageAbility的启动模式设置为单例时（具体设置方法和典型场景示例见 PageAbility的启动模式 ，缺省情况下是单实例模式），若PageAbility已被拉起，再次启动PageAbility会触发onNewWant回调（即非首次拉起）。开发者可以通过Want传递启动参数，例如开发者希望指定页面启动PageAbility，可以通过Want中的pa… [`references/启动指定页面.md`](<references/启动指定页面.md>)
- **启动本地PageAbility** — PageAbility相关的能力通过featureAbility提供，启动本地Ability通过featureAbility中的startAbility接口实现。 **表1** featureAbility接口说明 如下示例通过startAbility显式启动PageAbility。启动Ability的参数包含want，关于want的说明详见 对象间信息传递… [`references/启动本地PageAbility.md`](<references/启动本地PageAbility.md>)
- **常见action与entities（不推荐使用）** — 由于action/entity被泛化使用，系统对应用声明action/entity的行为缺少管控，恶意应用虚假声明，抢占流量，导致跳转后功能不可用。后续系统会逐步废弃非必要action/entity，建议通过 指定类型的方式拉起应用 。 **action** ：表示调用方要执行的通用操作（如查看、分享、应用详情）。在隐式 Want 中，您可定义该字段，配合u… [`references/常见action与entities（不推荐使用）.md`](<references/常见action与entities（不推荐使用）.md>)
- **应用/组件级配置** — 在开发应用时，需要配置应用的一些标签，例如应用的包名、图标等标识特征的属性。本文描述了在开发应用需要配置的一些关键标签。 #### 应用包名配置 应用需要在工程的AppScope目录下的 app.json5配置文件 中配置bundleName标签，该标签用于标识应用的唯一性。推荐采用反域名形式命名（如com.example.demo，建议第一级为域名后缀co… [`references/应用_组件级配置-1.md`](<references/应用_组件级配置-1.md>)
- **应用/组件级配置** — 开发者在开发应用时，需要配置应用的一些标签，例如应用的Bundle名称、图标等标识特征的属性。这一章节描述了开发者在开发应用时需要配置的一些关键标签。 #### 应用包名配置 应用包名需在config.json文件中app标签下配置bundleName字段，该字段用于指定应用的包名，需保证唯一性。包名是由字母、数字、下划线（_）和点号（.）组成的字符串，必须… [`references/应用_组件级配置.md`](<references/应用_组件级配置.md>)
- **应用上下文Context** — Context 是应用中对象的上下文，其提供了应用的一些基础信息，例如 resourceManager （资源管理）、 applicationInfo （当前应用信息）、 area （文件分区）等。 #### 不同类型Context的对比 UIAbility 组件和各种 ExtensionAbility 派生类组件都有各自不同的Context类。分别有基类C… [`references/应用上下文Context.md`](<references/应用上下文Context.md>)
- **应用启动框架AppStartup** — 应用启动时通常需要执行一系列初始化启动任务，如果将启动任务都放在 HAP 的 UIAbility 组件的 onCreate 生命周期中，那么只能在主线程中依次执行，不但影响应用的启动速度，而且当启动任务过多时，任务之间复杂的依赖关系还会使得代码难以维护。 AppStartup提供了一种简单高效的应用启动方式，可以支持任务的异步启动，加快应用启动速度。同时，通… [`references/应用启动框架AppStartup.md`](<references/应用启动框架AppStartup.md>)
- **应用模型** — 应用模型是系统为开发者提供的应用程序所需能力的抽象提炼，它提供了应用程序必备的组件和运行机制。有了应用模型，开发者可以基于一套统一的模型进行应用开发，使应用开发更简单、高效。 应用模型的构成要素包括： 1. 应用组件 应用组件是应用的基本组成单位和运行入口。 在用户启动、使用和退出应用的过程中，应用组件会在不同的状态间切换，这些状态称为 应用组件的生命周期 … [`references/应用模型.md`](<references/应用模型.md>)
- **应用链接说明** — 当在 module.json5 文件的 skills字段 中声明uris时，主要包含如下字段。 - scheme：协议名称。常见的取值有http、https、file、ftp等，也可以自定义。 - host：域名或IP地址。例如域名developer.huawei.com或IP地址127.0.0.1。 - port：端口号。例如developer.huawe… [`references/应用链接说明.md`](<references/应用链接说明.md>)
- **应用间跳转概述** — 应用跳转是指从一个应用跳转至另外一个应用，传递相应的数据、执行特定的功能。通过应用跳转可以满足用户更为真实丰富的场景诉求、提升交互体验的便捷性和流畅性。 #### 应用场景 应用间跳转在社交分享、推广营销等场景广泛使用。举例如下： - **社交分享：**在社交软件中分享位置链接、美食推荐链接、购物链接、游戏链接等，可以通过该链接快速跳转到匹配的导航App、美… [`references/应用间跳转概述.md`](<references/应用间跳转概述.md>)
- **应用预加载** — 从API version 20开始，提供应用预加载机制。该机制会根据用户的使用习惯，在系统资源充足时提前加载应用至特定阶段。当用户启动应用时，由于此前已完成了应用的部分加载，所需的启动时间会缩短，有助于提升用户体验和应用竞争力。 该机制尤其适用于因加载大量资源而启动耗时较长的应用，例如大型游戏应用和大型办公应用。 #### 约束限制 - 当前仅支持2in1设… [`references/应用预加载.md`](<references/应用预加载.md>)
- **意图开发概述** — 开发者可以通过如下两种方式来定义意图： #### 接入标准意图 当应用功能符合系统预定义的标准意图时（例如播放音乐、导航等），开发者可直接接入标准意图，避免重复定义规范。 当前发布的标准意图规范参见 附录：标准意图接入规范 。 每个意图均包含如下几个要素。 - 意图名称：意图的唯一标识。 - 意图版本：意图的兼容性控制。 - 参数类型定义：统一的意图参数格式… [`references/意图开发概述.md`](<references/意图开发概述.md>)
- **意图框架概述** — 开发者可以通过意图框架提供的意图开发功能，将应用功能以“意图”形式集成至系统入口。用户通过系统入口（如语音助手、智能推荐卡片）触发意图执行，即可便捷使用应用提供的功能。 例如，开发者将出行导航功能接入意图框架后，用户可通过自然语言指令（如“骑行导航到公司”）触发系统入口，系统解析指令并调用对应意图，实现出行导航的目的。 目前最常用的系统入口是小艺建议，通过小… [`references/意图框架概述.md`](<references/意图框架概述.md>)
- **拉起图片编辑类应用（startAbilityByType）** — 当应用自身不具备图片编辑能力、但存在图片编辑的场景时，可以通过startAbilityByType拉起图片编辑类应用扩展面板，由对应的应用完成图片编辑操作。图片编辑类应用可以通过PhotoEditorExtensionAbility实现图片编辑页面，并将该页面注册到图片编辑面板，从而将图片编辑能力开放给其他应用。 流程示意图如下： 例如：用户在图库App中选… [`references/拉起图片编辑类应用（startAbilityByType）.md`](<references/拉起图片编辑类应用（startAbilityByType）.md>)
- **拉起导航类应用（startAbilityByType）** — 本章节介绍如何拉起导航类应用扩展面板。 #### 导航类应用扩展面板参数说明 startAbilityByType接口中type字段为navigation，支持路线规划、导航、位置搜索三种意图场景，对应的wantParam参数如下： 本文中的经纬度均采用GCJ-02坐标系统。 - 路线规划场景 - 导航场景 - 位置搜索场景 #### 拉起方开发步骤 1. … [`references/拉起导航类应用（startAbilityByType）.md`](<references/拉起导航类应用（startAbilityByType）.md>)
- **拉起快递类应用（startAbilityByType）** — 本章节介绍如何拉起快递类应用扩展面板。 例如，在消息类App中，用户收到快递单号，应用能够识别快递单号信息并提供快递查询的链接。用户点击链接后，应用将通过调用 UIAbilityContext.startAbilityByType 或 UIExtensionContentSession.startAbilityByType 接口，拉起快递类应用的扩展面板。面… [`references/拉起快递类应用（startAbilityByType）.md`](<references/拉起快递类应用（startAbilityByType）.md>)
- **拉起指定应用概述** — 本章节主要介绍如何通过应用链接跳转的方式拉起指定应用。 从API 12开始，已不再推荐三方应用使用指定Ability方式（即显式Want）拉起其他应用。关于如何从指定Ability方式切换到指定 应用链接 方式，详见 显式Want跳转切换应用链接跳转适配指导 。 #### 应用链接 应用链接是指可以将用户引导至应用内特定位置或相关网页的URL，常见的格式如下… [`references/拉起指定应用概述.md`](<references/拉起指定应用概述.md>)
- **拉起指定类型的应用概述** — 本章节主要介绍拉起方应用如何通过指定应用类型、而非某个具体的应用，来实现应用跳转。通常有以下几种方式： - 通过startAbilityByType接口拉起垂类应用选择框：调用startAbilityByType接口拉起对应的垂类应用选择框（目前支持拉起导航、金融、邮件、航班、快递类应用）。选择框中将展示已接入的垂类应用，由用户选择打开指定的目标应用。 - … [`references/拉起指定类型的应用概述.md`](<references/拉起指定类型的应用概述.md>)
- **拉起文件处理类应用（startAbility）** — 开发者可以通过调用 startAbility 接口，由系统从已安装的应用中寻找符合要求的应用，打开特定文件。 例如，在浏览器应用中下载PDF文件，可以调用此接口选择文件处理应用打开此PDF文件。开发者需要在请求中设置待打开文件的URI路径（ uri ）、文件格式（ type ）等字段，以便系统能够识别，直接拉起文件打开应用或弹出一个选择框，让用户选择合适的应… [`references/拉起文件处理类应用（startAbility）.md`](<references/拉起文件处理类应用（startAbility）.md>)
- **拉起系统应用** — 本章节介绍拉起系统应用的方式，以及支持跳转系统应用的能力清单。 #### 拉起系统应用的方式 拉起系统应用除了使用前面章节介绍的方式（比如使用openLink拉起指定应用、使用startAbilityByType指定类型的应用），还可以采用如下方式。 - **使用系统Picker组件** 相机、文件管理、联系人等系统应用提供了系统Picker组件，支持开发者… [`references/拉起系统应用.md`](<references/拉起系统应用.md>)
- **拉起航班类应用（startAbilityByType）** — 本章节介绍如何拉起航班类应用扩展面板。 例如，在行程安排类App中，当用户记录了某次行程的航班号，应用能够识别航班号信息并提供航班动态查询的链接。用户点击链接后，应用将通过调用 UIAbilityContext.startAbilityByType 或 UIExtensionContentSession.startAbilityByType 接口，拉起航班类… [`references/拉起航班类应用（startAbilityByType）.md`](<references/拉起航班类应用（startAbilityByType）.md>)
- **拉起邮件类应用（mailto方式）** — 通过mailto电子邮件协议，可以创建指向电子邮件地址的超链接，方便用户通过网页或应用中的超链接直接跳转电子邮件应用。同时，支持在mailto:的相关字段中定义邮件的收件人、主题、正文内容等，节省用户编辑邮件的时间。 常见的应用场景举例如下： - - 用户在购物网站浏览产品页面时，看到“联系我们”按钮，点击后会拉起默认邮件客户端。收件人自动填写为客服邮箱，邮… [`references/拉起邮件类应用（mailto方式）.md`](<references/拉起邮件类应用（mailto方式）.md>)
- **拉起邮件类应用（startAbilityByType）** — 本章节介绍如何拉起邮件类应用扩展面板。 如果拉起方的参数为mailto协议字符串，可以 使用mailto方式拉起邮件应用 。邮件应用会解析收到的mailto协议字符串，并填充发件人、收件人、邮件内容等信息。 #### 邮件类应用扩展面板参数说明 startAbilityByType接口中type字段为mail，对应的wantParam参数： - 邮件类应用扩… [`references/拉起邮件类应用（startAbilityByType）.md`](<references/拉起邮件类应用（startAbilityByType）.md>)
- **拉起金融类应用（startAbilityByType）** — 本章节介绍如何拉起金融类应用扩展面板。 #### 金融类应用扩展面板参数说明 startAbilityByType接口中type字段为finance，对应的wantParam参数： #### 拉起方开发步骤 1. 导入相关模块。 import { common } from '@kit.AbilityKit'; 2. 构造接口参数并调用startAbilit… [`references/拉起金融类应用（startAbilityByType）.md`](<references/拉起金融类应用（startAbilityByType）.md>)
- **显式Want与隐式Want匹配规则** — 在启动目标应用组件时，会通过显式 Want 或者隐式 Want 进行目标应用组件的匹配，这里说的匹配规则就是调用方传入的 want 参数中设置的参数如何与目标应用组件声明的配置文件进行匹配。 #### 显式Want匹配原理 显式 Want 匹配原理如下表所示。 #### 隐式Want匹配原理 隐式 Want 匹配原理如下表所示。 从隐式Want的定义，可得知… [`references/显式Want与隐式Want匹配规则.md`](<references/显式Want与隐式Want匹配规则.md>)
- **显式Want跳转切换应用链接跳转适配指导** — 从API 12开始，已不再推荐三方应用使用指定Ability方式（即显式Want）拉起其他应用，推荐通过指定 应用链接 的方式来实现。 本章节介绍如何从显式Want跳转切换到应用链接跳转。 #### 启动其他应用的UIAbility 1. 将待跳转的应用安装到设备，在其对应UIAbility的 module.json5配置文件 中配置skills标签的ent… [`references/显式Want跳转切换应用链接跳转适配指导.md`](<references/显式Want跳转切换应用链接跳转适配指导.md>)
- **申请授权** — 应用需要获取用户的隐私信息或使用系统能力时，例如获取位置信息、使用相机拍摄照片或录制视频等，需要向用户申请授权。 在开发过程中，开发者首先需要明确涉及的敏感权限，并在config.json中声明这些权限。然后在运行时通过requestPermissionsFromUser接口，以动态弹窗的方式向用户申请授权。 在config.json声明需要的权限，在mod… [`references/申请授权.md`](<references/申请授权.md>)
- **窗口属性** — 具体获取窗口实例、设置窗口属性的接口描述及示例见 接口文档 。 [`references/窗口属性.md`](<references/窗口属性.md>)
- **线程模型** — 线程是操作系统进行运算调度的基本单位，是 进程 中的执行流，共享进程的资源。一个进程可以包含多个线程。 #### 线程类型 Stage模型 下的线程主要有如下三类： - - 执行UI绘制。 - 管理主线程的ArkTS引擎实例，使多个UIAbility组件能够运行在其之上。 - 管理其他线程的ArkTS引擎实例，例如使用TaskPool（任务池）创建任务或取消… [`references/线程模型-1.md`](<references/线程模型-1.md>)
- **线程模型** — FA模型 下的线程主要有如下三类： - 主线程： 负责管理其他线程。 - Ability线程： - 每个Ability一个线程。 - 输入事件分发。 - UI绘制。 - 应用代码回调（事件处理，生命周期）。 - 接收Worker发送的消息。 - Worker线程： 执行耗时操作。 基于当前的线程模型，不同的业务功能运行在不同的线程上，业务功能的交互就需要线程… [`references/线程模型.md`](<references/线程模型.md>)
- **组件启动规则（FA模型）** — 启动组件是指一切启动或连接应用组件的行为： - 启动PageAbility、ServiceAbility，如使用startAbility()等相关接口。 - 连接ServiceAbility、DataAbility，如使用connectAbility()、acquireDataAbilityHelper()等相关接口。 为了保证用户具有更好的使用体验，对以下… [`references/组件启动规则（FA模型）.md`](<references/组件启动规则（FA模型）.md>)
- **组件启动规则（Stage模型）** — 启动组件是指一切启动或连接应用组件的行为： - 启动 UIAbility 、ServiceExtensionAbility、DataShareExtensionAbility，如使用 startAbility() 、startServiceExtensionAbility()、 startAbilityByCall() 、 openLink() 等相关接口。… [`references/组件启动规则（Stage模型）.md`](<references/组件启动规则（Stage模型）.md>)
- **获取Native子进程退出信息** — 从API version 20开始，支持父进程通过注册回调函数监听子进程，获取子进程异常退出信息，以便父进程做后续优化处理。这里支持监听的子进程必须为 OH_Ability_StartNativeChildProcess 、 OH_Ability_StartNativeChildProcessWithConfigs 或 startNativeChildPro… [`references/获取Native子进程退出信息.md`](<references/获取Native子进程退出信息.md>)
- **获取/设置环境变量** — 环境变量涵盖了所有可能影响应用运行时的环境配置信息，包括应用可指定的内部环境变量（字体大小、外观、语言等）和应用可感知的外部环境变量（屏幕方向等）。 通常条件下，环境变量会跟随系统设置变化。 #### 使用场景 #### 获取环境变量 开发者可以使用 getConfigurationSync 主动获取当前 环境变量 ，包括深浅色模式、屏幕方向、语言地区、屏幕… [`references/获取_设置环境变量.md`](<references/获取_设置环境变量.md>)
- **获取应用异常退出原因** — 当应用异常退出后再次启动时，开发者往往需要获取上次异常退出的具体原因和当时的应用状态信息，比如应用内存占用的rss、pss值、上次应用退出的时间等等。通过UIAbility和UIExtensionAbility的OnCreate生命周期函数中的launchParam参数，开发者可以获取到相关信息，并将其应用于应用体验的分析改进，从而调整业务逻辑、提高应用的存… [`references/获取应用异常退出原因.md`](<references/获取应用异常退出原因.md>)
- **获取目标应用的URL信息** — 开发者在使用 UIAbilityContext.openLink 接口拉起目标应用时，需要传入目标应用的URL信息。本章节主要介绍如何获取目标应用的URL信息。 假设目标应用的UIAbility的 module.json5 配置信息如下： { "name": "EntryAbility", "srcEntry": "./ets/entryability/En… [`references/获取目标应用的URL信息.md`](<references/获取目标应用的URL信息.md>)
- **访问DataAbility** — 访问DataAbility需导入基础依赖包，以及获取与DataAbility子模块通信的URI字符串。 其中，基础依赖包包括： - @ohos.ability.featureAbility - @ohos.data.dataAbility 访问DataAbility的示例代码如下： 1. 创建工具接口类对象。 import featureAbility fr… [`references/访问DataAbility.md`](<references/访问DataAbility.md>)
- **调试意图** — 意图框架提供了一个意图调试工具，便于接入意图框架后进行意图调试。该工具支持查询意图、执行意图。 #### 约束限制 仅支持在手机上进行意图调试，且对应的API版本不低于20。 #### 功能接入 1. 开启意图调试能力。 1. 打开设备的“设置”应用。 2. 选择“系统”菜单。 3. 选择“开发者选项”菜单。 4. 选择“意图框架调试”菜单，开启该功能开关。… [`references/调试意图.md`](<references/调试意图.md>)
- **跳转规则** — 一般情况下，应用中的界面跳转由用户触发，应用本身通过startAbility启动跳转其他界面。 PageAbility作为可见Ability，可以通过startAbility启动有界面的且对外可见的Ability。 应用可通过在config.json中设置"abilities"中的"visible"属性设置Ability是否可由其他应用的组件启动，"visi… [`references/跳转规则.md`](<references/跳转规则.md>)
- **进程模型** — 进程是系统进行资源分配的基本单位，是操作系统结构的基础。下面从一个应用的全局视角来看下系统的进程模型和线程模型。 #### 进程模型 #### 基本进程类型 开发者开发一个复杂功能的应用，包含多个 UIAbility 组件和多个ExtensionAbility组件，ExtensionAbility如图1中的 FormExtensionAbility 和 Sh… [`references/进程模型.md`](<references/进程模型.md>)
- **进程模型概述** — 系统的进程模型如下图所示： - 应用中（同一包名）的所有PageAbility、ServiceAbility、DataAbility、FormAbility运行在同一个独立进程中，即图中绿色部分的“Main Process”。 - WebView拥有独立的渲染进程，即图中黄色部分的“Render Process”。 **图1** 进程模型示意图 基于当前的进… [`references/进程模型概述.md`](<references/进程模型概述.md>)
- **连接ServiceAbility** — 如果ServiceAbility需要与PageAbility或其他应用的ServiceAbility进行交互，则须创建用于连接的Connection。ServiceAbility支持其他Ability通过 connectAbility() 方法与其进行连接。PageAbility的connectAbility()方法定义在 featureAbility 中，… [`references/连接ServiceAbility.md`](<references/连接ServiceAbility.md>)
- **通过Call调用实现多端协同** — Call调用是 UIAbility 能力的扩展，它为UIAbility提供一种能够被外部调用并与外部进行通信的能力。Call调用支持前台与后台两种启动方式，使UIAbility既能被拉起到前台展示UI，也可以在后台被创建并运行。通过建立跨进程通信（IPC）链路，它在调用方与被调用方间构建起数据通道。当在分布式场景下使用时，Call调用可以跨设备发起，使得一个… [`references/通过Call调用实现多端协同.md`](<references/通过Call调用实现多端协同.md>)
- **附录：标准意图接入规范** — 播放视频操作，支持指定视频实体、分集信息等参数，并返回播放结果状态。 **意图名称** ：PlayVideo **起始版本** ：1.0.1 **参数** ： **返回值** ： #### 播放歌单 播放指定歌单的音乐内容，支持按场景、城市等条件筛选，并返回播放结果状态。 **意图名称** ：PlayMusicList **起始版本** ：1.0.2 **参… [`references/附录：标准意图接入规范.md`](<references/附录：标准意图接入规范.md>)
- **（可选）使用canOpenLink判断应用是否可访问** — 在应用A想要拉起应用B的场景中，应用A可先调用canOpenLink接口判断应用B是否可访问，如果可访问，再拉起应用B。 canOpenLink接口不支持判断以App Linking方式跳转的目标应用是否可访问。 #### 约束限制 在entry模块的module.json5文件中的 querySchemes 字段中，从API version 21开始，最多… [`references/（可选）使用canOpenLink判断应用是否可访问.md`](<references/（可选）使用canOpenLink判断应用是否可访问.md>)
