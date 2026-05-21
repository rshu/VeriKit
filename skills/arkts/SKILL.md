---
name: arkts
description: ArkTS是HarmonyOS应用开发的主要编程语言，基于TypeScript扩展了增强并发能力（TaskPool、Worker、Sendable）、基础类库、字节码编译、代码混淆（ArkGuard）及模块加载能力。
---

## 功能说明

ArkTS是HarmonyOS应用开发的官方高级语言，基于TypeScript生态扩展，保持了TS的基本风格，同时通过规范定义强化开发期静态检查和分析，提升代码健壮性，并实现更好的程序执行稳定性和性能。ArkTS基础类库增强了语言的基础功能，提供高精度浮点运算、二进制Buffer、XML生成解析转换、JSON扩展库（ASON）、多种容器库（线性容器和非线性容器）等能力，协助开发者简化开发工作。

并发编程是ArkTS的核心增强能力。ArkTS提供异步并发（Promise和async/await）和多线程并发两种处理策略。多线程方面提供TaskPool和Worker两种API：TaskPool适用于独立的耗时任务、多个耗时任务并发执行等场景；Worker适用于常驻任务、需要与宿主线程即时消息通信的场景。ArkTS进一步提出Sendable概念，支持对象在并发实例间的引用传递，包含Sendable对象、共享模块、共享容器、异步锁、异步等待等机制，大幅提升ArkTS对象在并发实例间的通信性能。

方舟编译运行时（ArkCompiler）是ArkTS的运行基础，包含编译工具链（将ArkTS编译为方舟字节码）和运行时两部分。方舟字节码有独立的文件格式和函数命名规则。ArkGuard提供源码混淆和字节码混淆两层代码保护能力，防止应用代码被逆向分析。模块加载方面，支持延迟加载（lazy import）、动态加载、静态和动态方式加载Native模块、基于Node-API加载模块等多种加载策略，并支持模块加载副作用的优化。

## 使用场景

当开发HarmonyOS应用时，ArkTS是必须使用的编程语言。无论是UI开发、业务逻辑编写还是系统能力调用，都需要使用ArkTS语言。当应用中存在耗时任务（CPU密集型、I/O密集型）需要避免阻塞UI主线程时，请使用TaskPool或Worker进行多线程并发处理。当需要在线程间高效传递数据时，请使用Sendable对象和共享容器。

当需要对应用代码进行混淆保护以防止逆向工程时，请使用ArkGuard的源码混淆或字节码混淆能力。当需要优化应用的启动性能和模块加载效率时，请使用延迟加载和动态加载能力。当需要进行ArkTS与C/C++的跨语言交互时，请使用Node-API或静态/动态加载Native模块的方式。

## 典型场景

- 如何选择TaskPool和Worker进行多线程并发开发
- 如何使用Sendable对象实现线程间高性能数据传递
- 如何使用异步锁和异步等待解决并发场景下的数据同步问题
- 如何使用ArkGuard进行源码混淆和字节码混淆保护应用代码
- 如何使用延迟加载（lazy import）优化应用启动性能
- 如何实现ArkTS与C/C++的跨语言交互和Native模块加载
- 如何使用XML/JSON/ASON进行数据解析与生成
- 如何使用容器类库（线性容器、非线性容器）管理数据
- 如何排查TaskPool任务不执行等并发常见问题
- 如何使用方舟字节码和Disassembler反汇编工具进行调试分析

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### 简介与概述

- [ArkTS简介](references/ArkTS简介.md) - 介绍ArkTS语言的定位、特性和与TypeScript的关系
- [ArkTS跨语言交互](references/ArkTS跨语言交互.md) - 说明ArkTS与C/C++等语言的跨语言交互机制
- [ArkTS基础类库概述](references/ArkTS基础类库概述.md) - 概述ArkTS基础类库的功能和使用场景

### 并发编程

- [并发概述](references/并发概述.md) - 介绍并发编程的基本概念、API选择策略和适用场景
- [异步并发 (Promise和async_await)](references/异步并发 (Promise和async_await).md) - 说明如何使用Promise和async/await进行异步并发编程
- [多线程并发概述](references/多线程并发概述.md) - 介绍多线程并发的基本概念和API选择
- [TaskPool简介](references/TaskPool简介.md) - 介绍TaskPool并发API的基本概念和特性
- [Worker简介](references/Worker简介.md) - 介绍Worker并发API的基本概念和特性
- [TaskPool和Worker的对比 (TaskPool和Worker)](references/TaskPool和Worker的对比 (TaskPool和Worker).md) - 对比TaskPool和Worker的特性帮助开发者选择合适的并发API
- [应用多线程开发概述](references/应用多线程开发概述.md) - 概述应用多线程开发的整体策略和最佳实践
- [并发常见问题](references/并发常见问题.md) - 汇总并发编程中的常见问题及排查方法

### 并发场景与开发指导

- [耗时任务并发场景简介](references/耗时任务并发场景简介.md) - 介绍耗时任务并发场景的分类和特点
- [长时任务并发场景简介](references/长时任务并发场景简介.md) - 介绍长时任务并发场景的特点和适用情况
- [常驻任务并发场景简介](references/常驻任务并发场景简介.md) - 介绍常驻任务并发场景的特点和适用情况
- [CPU密集型任务开发指导 (TaskPool和Worker)](references/CPU密集型任务开发指导 (TaskPool和Worker).md) - 指导如何使用TaskPool和Worker处理CPU密集型任务
- [I_O密集型任务开发指导 (TaskPool)](references/I_O密集型任务开发指导 (TaskPool).md) - 指导如何使用TaskPool处理I/O密集型任务
- [同步任务开发指导 (TaskPool和Worker)](references/同步任务开发指导 (TaskPool和Worker).md) - 指导如何使用TaskPool和Worker处理同步任务
- [长时任务开发指导（TaskPool）](references/长时任务开发指导（TaskPool）.md) - 指导如何使用TaskPool开发长时任务
- [常驻任务开发指导（Worker）](references/常驻任务开发指导（Worker）.md) - 指导如何使用Worker开发常驻任务

### 并发高级场景

- [使用TaskPool执行独立的耗时任务](references/使用TaskPool执行独立的耗时任务.md) - 说明如何使用TaskPool执行单个独立的耗时任务
- [使用TaskPool执行多个耗时任务](references/使用TaskPool执行多个耗时任务.md) - 说明如何使用TaskPool并发执行多个耗时任务
- [TaskPool指定任务并发度场景](references/TaskPool指定任务并发度场景.md) - 说明如何指定TaskPool任务的并发度
- [多线程取消TaskPool任务场景](references/多线程取消TaskPool任务场景.md) - 说明如何在多线程场景中取消TaskPool任务
- [Worker常驻线程通过TaskPool进行多任务并发处理](references/Worker常驻线程通过TaskPool进行多任务并发处理.md) - 说明Worker常驻线程如何配合TaskPool进行多任务并发处理
- [TaskPool任务与宿主线程通信](references/TaskPool任务与宿主线程通信.md) - 说明TaskPool任务如何与宿主线程进行通信
- [Worker和宿主线程的即时消息通信](references/Worker和宿主线程的即时消息通信.md) - 说明Worker如何与宿主线程进行即时消息通信
- [Worker同步调用宿主线程的接口](references/Worker同步调用宿主线程的接口.md) - 说明Worker如何同步调用宿主线程的接口
- [多级Worker间高性能消息通信](references/多级Worker间高性能消息通信.md) - 说明多级Worker之间如何进行高性能消息通信

### Sendable并发对象

- [Sendable对象简介](references/Sendable对象简介.md) - 介绍Sendable对象的基本概念和设计目标
- [Sendable使用规则与约束](references/Sendable使用规则与约束.md) - 说明Sendable对象的使用规则和约束条件
- [Sendable使用场景](references/Sendable使用场景.md) - 介绍Sendable对象的典型使用场景
- [Sendable对象冻结](references/Sendable对象冻结.md) - 说明Sendable对象的冻结机制和使用方法
- [异步锁](references/异步锁.md) - 说明异步锁的使用方法和适用场景
- [异步等待](references/异步等待.md) - 说明异步等待机制的使用方法
- [共享模块](references/共享模块.md) - 说明共享模块的概念和使用方法
- [共享容器](references/共享容器.md) - 说明共享容器的类型和使用方法
- [C++线程间数据共享场景](references/C++线程间数据共享场景.md) - 说明C++线程间数据共享的开发场景

### 线程间通信

- [ArkTS线程间通信概述](references/ArkTS线程间通信概述.md) - 概述ArkTS线程间通信的机制和方式
- [线程间通信对象概述](references/线程间通信对象概述.md) - 概述线程间通信支持的对象类型
- [普通对象](references/普通对象.md) - 说明普通对象在线程间通信中的传输方式
- [ArrayBuffer对象](references/ArrayBuffer对象.md) - 说明ArrayBuffer对象在线程间通信中的传输方式
- [SharedArrayBuffer对象](references/SharedArrayBuffer对象.md) - 说明SharedArrayBuffer对象在线程间通信中的使用方法
- [容器类对象](references/容器类对象.md) - 说明容器类对象在线程间通信中的传输方式
- [Transferable对象（NativeBinding对象）](references/Transferable对象（NativeBinding对象）.md) - 说明Transferable对象的线程间传输机制
- [自定义Native Transferable对象的多线程操作场景](references/自定义Native Transferable对象的多线程操作场景.md) - 说明自定义Native Transferable对象的多线程操作方法
- [自定义Native Sendable对象的多线程操作场景](references/自定义Native Sendable对象的多线程操作场景.md) - 说明自定义Native Sendable对象的多线程操作方法

### 高级应用场景

- [获取最近访问列表场景](references/获取最近访问列表场景.md) - 说明获取最近访问列表的并发开发实践
- [批量数据写数据库场景](references/批量数据写数据库场景.md) - 说明批量数据写数据库的并发开发实践
- [全局配置项功能场景](references/全局配置项功能场景.md) - 说明全局配置项功能的并发开发实践
- [业务模块并发加载场景](references/业务模块并发加载场景.md) - 说明业务模块并发加载的开发实践
- [ArkUI瀑布流渲染场景](references/ArkUI瀑布流渲染场景.md) - 说明ArkUI瀑布流渲染的并发优化实践
- [ArkUI数据更新场景](references/ArkUI数据更新场景.md) - 说明ArkUI数据更新的并发优化实践

### 模块加载

- [模块化运行简介](references/模块化运行简介.md) - 介绍模块化运行机制的基本概念
- [模块加载副作用及优化](references/模块加载副作用及优化.md) - 说明模块加载副作用的概念和优化方法
- [延迟加载（lazy import）](references/延迟加载（lazy import）.md) - 说明模块延迟加载的使用方法和优化效果
- [动态加载](references/动态加载.md) - 说明模块动态加载的使用方法
- [静态方式加载Native模块](references/静态方式加载Native模块.md) - 说明如何以静态方式加载Native模块
- [基于Node-API加载模块](references/基于Node-API加载模块.md) - 说明如何基于Node-API加载模块
- [同步方式动态加载Native模块](references/同步方式动态加载Native模块.md) - 说明如何以同步方式动态加载Native模块

### 方舟字节码

- [方舟字节码概述](references/方舟字节码概述.md) - 介绍方舟字节码的基本概念和作用
- [方舟字节码基本原理](references/方舟字节码基本原理.md) - 说明方舟字节码的基本原理和运行机制
- [方舟字节码文件格式](references/方舟字节码文件格式.md) - 说明方舟字节码文件的格式规范
- [方舟字节码函数命名规则](references/方舟字节码函数命名规则.md) - 说明方舟字节码中函数的命名规则
- [方舟字节码生成常见问题](references/方舟字节码生成常见问题.md) - 汇总方舟字节码生成过程中的常见问题
- [编译期自定义修改方舟字节码](references/编译期自定义修改方舟字节码.md) - 说明如何在编译期自定义修改方舟字节码

### ArkGuard源码混淆

- [ArkGuard源码混淆工具概述](references/ArkGuard源码混淆工具概述.md) - 介绍ArkGuard源码混淆工具的功能和特性
- [ArkGuard混淆原理及功能](references/ArkGuard混淆原理及功能.md) - 说明ArkGuard源码混淆的工作原理和支持的功能
- [ArkGuard混淆开启指南](references/ArkGuard混淆开启指南.md) - 指导如何开启ArkGuard源码混淆
- [ArkGuard混淆常见问题](references/ArkGuard混淆常见问题.md) - 汇总ArkGuard源码混淆的常见问题及解决方法
- [不同包类型的源码混淆建议](references/不同包类型的源码混淆建议.md) - 针对不同包类型给出源码混淆的配置建议

### ArkGuard字节码混淆

- [ArkGuard字节码混淆工具概述](references/ArkGuard字节码混淆工具概述.md) - 介绍ArkGuard字节码混淆工具的功能和特性
- [ArkGuard字节码混淆原理及功能](references/ArkGuard字节码混淆原理及功能.md) - 说明ArkGuard字节码混淆的工作原理和支持的功能
- [ArkGuard字节码混淆开启指南](references/ArkGuard字节码混淆开启指南.md) - 指导如何开启ArkGuard字节码混淆
- [ArkGuard字节码混淆常见问题](references/ArkGuard字节码混淆常见问题.md) - 汇总ArkGuard字节码混淆的常见问题及解决方法
- [不同包类型的字节码混淆建议](references/不同包类型的字节码混淆建议.md) - 针对不同包类型给出字节码混淆的配置建议

### 编译工具链

- [ArkTS编译工具链概述](references/ArkTS编译工具链概述.md) - 概述ArkTS编译工具链的组成和功能
- [在build-profile.json5中配置arkOptions](references/在build-profile.json5中配置arkOptions.md) - 说明如何在构建配置文件中配置arkOptions编译选项
- [Disassembler反汇编工具](references/Disassembler反汇编工具.md) - 介绍Disassembler反汇编工具的使用方法

### 运行时

- [ArkTS运行时概述](references/ArkTS运行时概述.md) - 概述ArkTS运行时的组成和功能
- [ArkTS运行时常见问题](references/ArkTS运行时常见问题.md) - 汇总ArkTS运行时的常见问题及解决方法
- [GC垃圾回收](references/GC垃圾回收.md) - 说明ArkTS的垃圾回收机制和工作原理

### 基础类库

- [XML概述](references/XML概述.md) - 概述XML功能模块的能力范围
- [XML解析](references/XML解析.md) - 说明如何进行XML数据解析
- [XML生成](references/XML生成.md) - 说明如何生成XML数据
- [XML转换](references/XML转换.md) - 说明如何进行XML数据转换
- [ASON解析与生成](references/ASON解析与生成.md) - 说明ASON（ArkTS JSON扩展）的解析与生成方法
- [JSON扩展库](references/JSON扩展库.md) - 介绍JSON扩展库的功能和使用方法
- [Buffer与FastBuffer](references/Buffer与FastBuffer.md) - 说明Buffer和FastBuffer的使用方法和区别
- [容器类库概述](references/容器类库概述.md) - 概述容器类库的功能和分类
- [线性容器](references/线性容器.md) - 说明线性容器的类型和使用方法
- [非线性容器](references/非线性容器.md) - 说明非线性容器的类型和使用方法
- [基础库常见问题](references/基础库常见问题.md) - 汇总基础类库使用中的常见问题及解决方法

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `92` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **ASON解析与生成** — ASON工具 与JS提供的JSON工具类似，JSON用于进行JS对象的序列化（stringify）、反序列化（parse）。ASON则提供了 Sendable对象 的序列化、反序列化能力。使用ASON.stringify方法可将对象转换为字符串，使用ASON.parse方法可将字符串转换为Sendable对象，从而实现对象在并发任务间的高性能引用传递。 AS… [`references/ASON解析与生成.md`](<references/ASON解析与生成.md>)
- **ArkGuard字节码混淆原理及功能** — #### 混淆生效范围 #### 适用语言 ArkGuard支持ArkTS/TS/JS语言，JSON仅支持文件名混淆，不支持C/C++、资源文件等。 #### 混淆能力 ArkGuard提供的是 **面向方舟字节码的基础名称混淆** ：在可选规则下，对 **类、接口、枚举、函数、类成员方法、变量、对象属性名、源文件名** 等标识符进行重命名，并可通过保留选项… [`references/ArkGuard字节码混淆原理及功能.md`](<references/ArkGuard字节码混淆原理及功能.md>)
- **ArkGuard字节码混淆工具概述** — 从API version 20开始，ArkGuard提供了基础字节码混淆能力，将代码中的函数名、类名、文件名等名字变成简短无意义的名字，提高通过阅读代码猜测其用途的难度。由于标识符名称缩短，通过混淆可以有效降低包大小。 **适用场景** ：适用于对 **安全性与防逆向** 有较高要求的项目，尤其是涉及 **敏感业务逻辑** 、关键算法或专有接口实现的应用程序… [`references/ArkGuard字节码混淆工具概述.md`](<references/ArkGuard字节码混淆工具概述.md>)
- **ArkGuard字节码混淆常见问题** — **json文件** 字节码混淆在开启-enable-filename-obfuscation混淆项后，json文件名会参与混淆。 #### 混淆选项差异 1. 字节码混淆开关，默认关闭，在开启混淆功能后，需要额外在模块目录下obfuscation-rules.txt文件中配置-enable-bytecode-obfuscation 、-enable-byt… [`references/ArkGuard字节码混淆常见问题.md`](<references/ArkGuard字节码混淆常见问题.md>)
- **ArkGuard字节码混淆开启指南** — 为了避免后续修改代码影响现网问题分析定位，建议开发者在版本发布时，本地备份build/default/cache/default/default@XXXCompileArkTS/esmodule/release/obfuscation 路径下的全部内容； 有条件的可以直接备份release目录。 #### 字节码混淆开启步骤 #### 约束与限制 字节码混淆… [`references/ArkGuard字节码混淆开启指南.md`](<references/ArkGuard字节码混淆开启指南.md>)
- **ArkGuard混淆原理及功能** — #### 混淆能力范围 #### 适用语言 ArkGuard支持ArkTS、TS和JS语言，不支持C/C++、JSON、资源文件等。 #### 混淆能力 ArkGuard支持名称混淆、代码压缩和注释删除的基础混淆功能，不支持控制流混淆、数据混淆等高级混淆功能。 名称混淆主要提供 **名称重命名** 和 **配置保留白名单** 的能力。 #### 混淆能力局限… [`references/ArkGuard混淆原理及功能.md`](<references/ArkGuard混淆原理及功能.md>)
- **ArkGuard混淆常见问题** — 1. 在obfuscation-rules.txt中配置-disable-obfuscation选项关闭混淆，确认问题是否由混淆引起。 2. 1. -enable-toplevel-obfuscation 为顶层作用域名称混淆开关。 2. -enable-property-obfuscation 为属性混淆开关。配置白名单的主要场景包括网络数据访问、json… [`references/ArkGuard混淆常见问题.md`](<references/ArkGuard混淆常见问题.md>)
- **ArkGuard混淆开启指南** — 系统已集成源码混淆功能，开发者可通过以下方式在DevEco Studio中启用。 - 开启混淆开关 在本模块build-profile.json5配置文件中的arkOptions.obfuscation.ruleOptions字段中，通过enable字段配置是否开启混淆。 "arkOptions": { "obfuscation": { "ruleOptio… [`references/ArkGuard混淆开启指南.md`](<references/ArkGuard混淆开启指南.md>)
- **ArkGuard源码混淆工具概述** — ArkGuard是一款源码混淆工具，提供基础混淆功能。它将代码中的变量名、函数名、类名、文件名等替换为简短无意义的标识符，增加通过阅读代码推测其功能的难度。混淆后，工程源码中的元素名称简化，有助于减小程序包的体积。 本章节介绍ArkGuard源码混淆工具的使用方法和特点，帮助开发者高效利用ArkGuard进行源码混淆，提升代码复杂度，增加逆向工程难度。 - … [`references/ArkGuard源码混淆工具概述.md`](<references/ArkGuard源码混淆工具概述.md>)
- **ArkTS基础类库概述** — ArkTS基础类库是一个功能齐全的API集合，设计了一系列关键且实用的功能模块。 ArkTS基础类库主要提供了 XML生成解析转换 、 二进制Buffer 、 多种容器类库 、 URL字符串解析 和 高精度浮点计算 等能力，简化开发工作，提升开发效率。 [`references/ArkTS基础类库概述.md`](<references/ArkTS基础类库概述.md>)
- **ArkTS简介** — ArkTS是HarmonyOS应用开发的官方高级语言。 ArkTS在 TypeScript （简称TS）生态基础上做了进一步扩展，保持了TS的基本风格，同时通过规范定义强化开发期静态检查和分析，提升代码健壮性，并实现更好的程序执行稳定性和性能。对比标准TS的差异可以参考 从TypeScript到ArkTS的适配规则 。ArkTS同时也支持与TS/JavaSc… [`references/ArkTS简介.md`](<references/ArkTS简介.md>)
- **ArkTS线程间通信概述** — 线程间通信指并发多线程间的数据交换行为。由于ArkTS语言兼容TS/JS，其运行时实现与其它JS引擎一样，采用基于Actor内存隔离的并发模型。 在ArkTS线程间通信中，不同数据对象的行为存在差异。例如，普通JS对象、ArrayBuffer对象和SharedArrayBuffer对象在跨线程时的处理方式不同，涉及序列化、反序列化、数据转移和数据共享等操作。… [`references/ArkTS线程间通信概述.md`](<references/ArkTS线程间通信概述.md>)
- **ArkTS编译工具链概述** — ArkTS SDK提供了一套完整的编译工具链，以支持ArkTS的应用编译，通过集成至 Hvigor 编译任务的编排工具上，实现将应用的ArkTS/TS/JS源码编译生成方舟字节码文件（*.abc）。 编译工具链在编译过程中首先执行语法转换，包括语法检查和UI转换。为确保源码安全，编译工具链使用 ArkGuard源码混淆工具 对源码进行混淆操作。在字节码落盘之… [`references/ArkTS编译工具链概述.md`](<references/ArkTS编译工具链概述.md>)
- **ArkTS跨语言交互** — 除了支持使用ArkTS开发外，开发者还可以通过Node-API实现ArkTS与C/C++(Native)的跨语言交互能力。 HarmonyOS的Node-API是基于Node.js社区版本的扩展实现，但与原生Node-API并不完全兼容。 开发者可参考 使用Node-API进行跨语言开发流程 ，基于 Node-API支持的数据类型 和 Node-API接口 … [`references/ArkTS跨语言交互.md`](<references/ArkTS跨语言交互.md>)
- **ArkTS运行时常见问题** — 如果使用正则运算时结果与期望不符，请检查以下场景。 #### 正则运算对于\b处理与预期不一致 let str = '\u2642'; let res = str.replace(/\b/g, '/'); console.info('res = ' + res); // 期望输出: res = ♂ // 实际输出: res = /♂/ 规避方案：暂无。 正则… [`references/ArkTS运行时常见问题.md`](<references/ArkTS运行时常见问题.md>)
- **ArkTS运行时概述** — ArkTS运行时是HarmonyOS上应用的默认语言运行时，支持ArkTS、TS和JS语言的字节码及相关标准库。它提供解释器、AOT和JIT高效执行方式，并通过 Node-API 实现完善的跨语言调用接口，支持多语言混合开发。 ArkTS Runtime主要由四个子系统组成： - **Core Subsystem** ：主要由与语言无关的基础运行库组成，其中… [`references/ArkTS运行时概述.md`](<references/ArkTS运行时概述.md>)
- **ArkUI数据更新场景** — 当需要网络下载或者本地生成的数据需要发送到UI线程进行展示时，由于ArkUI的标注和 @Sendable装饰器 不能同时修饰变量和对象，因此需要使用 makeObserved 在ArkUI中导入可观测的Sendable共享数据。 本示例说明以下场景： - makeObserved在传入@Sendable类型的数据后有观测能力，且其变化可以触发UI更新。 - … [`references/ArkUI数据更新场景.md`](<references/ArkUI数据更新场景.md>)
- **ArkUI瀑布流渲染场景** — 此处提供使用任务池 TaskPool 提升 WaterFlow瀑布流 渲染性能的开发指导。UI线程查询数据库数据，并将数据渲染到瀑布流组件，数据过大时会导致UI线程长时间等待，影响用户体验。因此，我们可以将数据查询操作放到子线程中，并通过TaskPool的接口返回数据给UI线程。 本示例说明以下场景： - 模拟子线程读取数据库数据并返回给UI线程。 - UI… [`references/ArkUI瀑布流渲染场景.md`](<references/ArkUI瀑布流渲染场景.md>)
- **ArrayBuffer对象** — ArrayBuffer包含两部分：底层存储数据的Native内存区域，以及封装操作的JS对象壳。JS对象壳分配在虚拟机的本地堆（LocalHeap）中。跨线程传递时，JS对象壳需要序列化和反序列化拷贝传递，而Native内存区域可以通过拷贝或转移的方式传递。 Native内存使用拷贝方式（递归遍历）传输时，传输后两个线程可以独立访问ArrayBuffer。此… [`references/ArrayBuffer对象.md`](<references/ArrayBuffer对象.md>)
- **Buffer与FastBuffer** — Buffer和FastBuffer模块将内存区域抽象为可读写、修改的逻辑对象，提供高效的二进制数据处理接口。每个Buffer实例是连续的字节序列，支持创建自定义大小的内存块，用于存储和操作序列化后的数据。 Buffer和FastBuffer模块的主要应用场景包括： 1. **大数据传输** ：传输大量数据，如二进制文件、数据库记录或网络报文时，使用Buffe… [`references/Buffer与FastBuffer.md`](<references/Buffer与FastBuffer.md>)
- **C++线程间数据共享场景** — 在C++层进行多线程并发计算时，需要在每个C++线程上创建ArkTS执行环境，直接调用API。这样可以避免在非UI主线程回调时等待UI主线程的API调用结果。同时，还需要在C++线程之间共享和操作Sendable对象。 为了支持此类场景，C++线程需要能够创建并调用ArkTS，同时支持对Sendable对象进行多线程共享和操作。 #### 在C++线程上调用… [`references/C++线程间数据共享场景.md`](<references/C++线程间数据共享场景.md>)
- **CPU密集型任务开发指导 (TaskPool和Worker)** — CPU密集型任务是指需要占用系统资源进行大量计算的任务，这类任务需要长时间运行，会阻塞线程中其他事件的处理，因此不适合在UI主线程中执行。例如图像处理、视频编码、数据分析等。 基于多线程并发机制处理CPU密集型任务可以提高CPU利用率，提升应用程序响应速度。 当任务不需要长时间（3分钟）占用后台线程，而是一个个独立的任务时，推荐使用TaskPool，反之推荐… [`references/CPU密集型任务开发指导 (TaskPool和Worker).md`](<references/CPU密集型任务开发指导 (TaskPool和Worker).md>)
- **Disassembler反汇编工具** — Disassembler是ArkTS反汇编工具。如果需要分析方舟字节码文件（*.abc）相关问题，开发者可以使用Disassembler将方舟字节码文件反编译为可读的汇编指令。 工具随DevEco Studio SDK发布。以Windows平台为例，Disassembler工具位于DevEco Studio/sdk/default/openharmony/t… [`references/Disassembler反汇编工具.md`](<references/Disassembler反汇编工具.md>)
- **GC垃圾回收** — GC（全称 Garbage Collection），即垃圾回收。在计算机领域，GC是指识别并释放内存中的不再使用的对象，以回收内存空间。目前广泛使用的编程语言实现的GC算法主要分为两大类：引用计数和对象追踪（即Tracing GC）。 #### GC算法简述 #### GC的类型 **引用计数** 当对象B指向对象A时，A的引用计数加1；当该指向断开时，A的… [`references/GC垃圾回收.md`](<references/GC垃圾回收.md>)
- **I/O密集型任务开发指导 (TaskPool)** — 使用异步并发可以解决单次I/O任务阻塞的问题。对于I/O密集型任务，若线程中的其他任务仍可能被阻塞，建议采用多线程并发来处理。 I/O密集型任务的性能关键在于I/O操作的速度和效率，而非CPU的处理能力。这类任务需要频繁进行磁盘读写和网络通信。此处通过频繁读写系统文件来模拟I/O密集型并发任务的处理。 1. 定义并发函数，内部密集调用I/O能力。 impor… [`references/I_O密集型任务开发指导 (TaskPool).md`](<references/I_O密集型任务开发指导 (TaskPool).md>)
- **JSON扩展库** — 该库扩展了原生JSON功能，提供了额外的错误处理、循环引用检测、BigInt处理以及对不同输入类型的严格检查。代码中底层依赖于原生JSON.parse和JSON.stringify，但在此基础上加入了多种自定义逻辑并提供额外的has和remove接口，具体可见 @arkts.json 。 JSON扩展库主要适用于以下场景： - 需要处理BigInt的JSON… [`references/JSON扩展库.md`](<references/JSON扩展库.md>)
- **Sendable使用场景** — Sendable对象在不同并发实例间默认采用引用传递，这种方式比序列化更高效，且不会丢失类成员方法。因此，Sendable能够解决两个关键场景的问题： - 跨并发实例传输大数据（例如达到100KB以上的数据）。 - 跨并发实例传递带方法的class实例对象。 #### 跨并发实例传输大数据场景 由于跨并发实例序列化的开销随数据量线性增长，因此当传输数据量较大… [`references/Sendable使用场景.md`](<references/Sendable使用场景.md>)
- **Sendable使用规则与约束** — Sendable对象的布局和原型链不可变，而非Sendable对象可以通过特殊方式修改布局。因此，不允许互相继承。这里的类不包含变量，Sendable类不能继承自变量。 **正例：** @Sendable class A { constructor() { } } @Sendable class B extends A { constructor() { s… [`references/Sendable使用规则与约束.md`](<references/Sendable使用规则与约束.md>)
- **Sendable对象冻结** — Sendable对象支持冻结操作。冻结后，对象变为只读，不能修改属性。因此，多个并发实例间访问时无需加锁。可以通过调用 Object.freeze 接口冻结对象。 不支持在.ets文件中使用Object.freeze接口。 #### 使用示例 1. 提供ts文件封装Object.freeze方法。 // helper.ts export function f… [`references/Sendable对象冻结.md`](<references/Sendable对象冻结.md>)
- **Sendable对象简介** — 在传统JS引擎中，要优化对象的并发通信开销，唯一的方法是将实现下沉到Native侧，通过 Transferable对象 的转移或共享来降低开销。然而，开发者仍有大量对象并发通信的需求，这个问题在业界JS引擎中尚未解决。 ArkTS提供了Sendable对象类型，它是一种可在ArkTS并发实例间安全共享和传递的数据类型，它支持引用传递来减少通信成本。 Send… [`references/Sendable对象简介.md`](<references/Sendable对象简介.md>)
- **SharedArrayBuffer对象** — SharedArrayBuffer内部包含一块Native内存，其JS对象壳被分配在虚拟机本地堆（LocalHeap）。支持跨并发实例间共享Native内存，但是对共享Native内存的访问及修改需要采用Atomics类，防止数据竞争。SharedArrayBuffer可用于多个并发实例间的状态或数据共享。通信过程如下图所示： #### 使用示例 使用Tas… [`references/SharedArrayBuffer对象.md`](<references/SharedArrayBuffer对象.md>)
- **TaskPool任务与宿主线程通信** — 如果Task不仅需要返回最终执行结果，还需定时通知宿主线程状态和数据变化，或分段返回大量数据（如从数据库读取大量数据），可按以下方式实现。 下面以多个图片加载任务结果实时返回为例说明。 1. 实现接收Task消息的方法。 import { taskpool } from '@kit.ArkTS'; import { IconItemSource } from… [`references/TaskPool任务与宿主线程通信.md`](<references/TaskPool任务与宿主线程通信.md>)
- **TaskPool和Worker的对比 (TaskPool和Worker)** — TaskPool和Worker的作用是为应用程序提供多线程运行环境，用于处理耗时计算任务或其他密集型任务，避免任务阻塞宿主线程，提高系统性能和资源利用率。 本文将从 实现特点 和 适用场景 两个方面比较TaskPool与Worker。 #### 实现特点对比 **表1** TaskPool和Worker的实现特点对比 #### 适用场景对比 TaskPool… [`references/TaskPool和Worker的对比 (TaskPool和Worker).md`](<references/TaskPool和Worker的对比 (TaskPool和Worker).md>)
- **TaskPool指定任务并发度场景** — TaskPool支持使用异步队列来控制任务的并发度，能有效避免资源过载，减少任务阻塞，适用于网络请求、视频流处理和数据库操作等场景。 此处提供使用TaskPool创建 异步队列 的开发指导，以相机预览流采集数据处理的功能为例。 由于处理过程是一个频繁且耗时的任务，当相机采集速度过快时，将丢弃之前的采集数据，仅保留最新的一帧数据进行处理。 1. 导入需要用到的… [`references/TaskPool指定任务并发度场景.md`](<references/TaskPool指定任务并发度场景.md>)
- **TaskPool简介** — TaskPool为应用程序提供多线程环境，降低资源消耗并提高系统性能。无需管理线程生命周期。具体接口信息及使用方法，请参见 TaskPool 。 #### TaskPool运作机制 TaskPool运作机制示意图 TaskPool支持在宿主线程提交任务到任务队列，系统选择合适的工作线程执行任务，并将结果返回给宿主线程。接口易用，支持任务执行、取消和指定优先级… [`references/TaskPool简介.md`](<references/TaskPool简介.md>)
- **Transferable对象（NativeBinding对象）** — Transferable对象，也称为NativeBinding对象，是指绑定C++对象的JS对象，其主要功能由C++提供，JS对象壳则分配在虚拟机的本地堆（LocalHeap）中。跨线程传输时复用同一个C++对象，相比JS对象的拷贝模式，传输效率更高。因此，可共享或转移的NativeBinding对象被称为Transferable对象。开发者可以自定义Tra… [`references/Transferable对象（NativeBinding对象）.md`](<references/Transferable对象（NativeBinding对象）.md>)
- **Worker同步调用宿主线程的接口** — 如果一个接口已在宿主线程中实现，Worker可以通过以下方式调用该接口。 以下示例展示了Worker同步调用宿主线程接口的方法，创建worker的方法可参考 创建worker的注意事项 。 1. 首先，在宿主线程实现需要调用的接口，并创建Worker对象，在Worker对象上注册需要调用的对象。 import worker from '@ohos.worke… [`references/Worker同步调用宿主线程的接口.md`](<references/Worker同步调用宿主线程的接口.md>)
- **Worker和宿主线程的即时消息通信** — 在ArkTS中，Worker相对于Taskpool存在一定的差异性，有数量限制但是可以长时间存在。一个 Worker 中可能会执行多个不同的任务，每个任务的执行时长或返回结果可能都不同，宿主线程需要根据情况调用Worker中的不同方法，Worker则需要及时地将结果返回给宿主线程。 下面以Worker响应"hello world"请求为例说明。 1. 首先，… [`references/Worker和宿主线程的即时消息通信.md`](<references/Worker和宿主线程的即时消息通信.md>)
- **Worker常驻线程通过TaskPool进行多任务并发处理** — ArkTS应用开发过程中，可以选择TaskPool或Worker线程进行多任务并发处理，也可以两种并发能力都选择。 本示例将说明在Worker线程中通过TaskPool执行并发任务。 1. 在主线程中创建Worker线程并发送消息。 // workerAndTaskpool.ets import { MessageEvents, worker } from … [`references/Worker常驻线程通过TaskPool进行多任务并发处理.md`](<references/Worker常驻线程通过TaskPool进行多任务并发处理.md>)
- **Worker简介** — Worker的主要作用是为应用程序提供一个多线程的运行环境，实现应用程序执行过程与宿主线程分离。通过在后台线程运行脚本处理耗时操作，避免计算密集型或高延迟任务阻塞宿主线程。具体接口信息及使用方法详情请见 Worker 。 #### Worker运作机制 **图1** Worker运作机制示意图 创建Worker的线程称为宿主线程（不局限于主线程，Worker… [`references/Worker简介.md`](<references/Worker简介.md>)
- **XML概述** — XML（可扩展标记语言）是一种用于描述数据的标记语言，提供通用的数据传输和存储方式。XML不预定义标记，因此更加灵活，适用于广泛的应用领域。 XML文档由元素（element）、属性（attribute）和内容（content）组成。 - 元素指的是标记对，包含文本、属性或其他元素。 - 属性提供了有关元素的其他信息。 - 内容则是元素包含的数据或子元素。 … [`references/XML概述.md`](<references/XML概述.md>)
- **XML生成** — XML可以作为数据交换格式，被各种系统和应用程序支持。例如Web服务，可以将结构化数据以XML格式进行传递。 XML还可以作为消息传递格式，用于分布式系统中不同节点的通信。 #### 注意事项 - XML标签必须成对出现，生成开始标签就要生成结束标签。 - XML标签对大小写敏感，开始标签与结束标签大小写要一致。 #### 开发步骤 XML模块提供XmlSe… [`references/XML生成.md`](<references/XML生成.md>)
- **XML解析** — 对于以XML作为载体传递的数据，实际使用中需要对相关的元素进行解析，一般包括 解析XML标签和标签值 、 解析XML属性和属性值 、 解析XML事件类型和元素信息 三类操作。如在Web服务中，XML是SOAP（Simple Object Access Protocol）协议的基础，SOAP消息通常以XML格式封装，包含请求和响应参数，通过解析这些XML消息，… [`references/XML解析.md`](<references/XML解析.md>)
- **XML转换** — 将XML文本转换为JavaScript对象，便于处理和操作数据，适用于JavaScript应用程序。 语言基础类库提供ConvertXML类，将XML文本转换为JavaScript对象，输入为待转换的XML字符串及转换选项，输出为转换后的JavaScript对象。具体转换选项可见 API参考@ohos.convertxml 。 #### 注意事项 XML解析… [`references/XML转换.md`](<references/XML转换.md>)
- **不同包类型的字节码混淆建议** — 由于不同包类型的用途及构建流程的差异，开发者对不同包类型使用混淆有不同的注意事项。本文对 HAP 、 HAR 和 HSP 三种包类型分别提供建议，帮助开发者高效使用混淆。 为了对混淆在不同包类型下的行为有更清晰的理解，建议开发者在对不同包类型进行配置前，充分了解混淆原理及混淆开启流程，并优先阅读 Stage模型应用程序包结构 （了解不同包类型之间的差异点）。… [`references/不同包类型的字节码混淆建议.md`](<references/不同包类型的字节码混淆建议.md>)
- **不同包类型的源码混淆建议** — 不同包类型的用途和构建流程存在差异，对不同包类型使用混淆时，开发者需要注意不同事项。本文针对 HAP 、 HAR 和 HSP 三种包类型，分别提供混淆建议，帮助开发者高效使用混淆。简要对应关系如下： **HAP** 为应用安装与运行的功能模块，适用于 **应用端功能开发与发布** ； **HAR** 为静态共享包，适用于 **组件化、能力沉淀与多模块/多工程… [`references/不同包类型的源码混淆建议.md`](<references/不同包类型的源码混淆建议.md>)
- **业务模块并发加载场景** — 在应用启动时，多个业务模块需要加载，例如地图应用中的定位、打车、导航等模块。如果全部在UI主线程初始化，会严重影响应用冷启动时间。此时，应在不同子线程中并行加载这些模块，以降低启动耗时。 通过使用ArkTS提供的TaskPool能力，可以将不同的业务初始化任务移到子线程中。业务模块可通过下沉C++实现为 NativeBinding对象 或在ArkTS层定义为… [`references/业务模块并发加载场景.md`](<references/业务模块并发加载场景.md>)
- **使用TaskPool执行多个耗时任务** — 多个任务同时执行时，由于任务复杂度不同，执行时间和返回数据的时间也会不同。如果宿主线程需要所有任务执行完毕的数据，可以通过 TaskGroup 的方式实现。 除了以上情况，如果需要处理的数据量较大，例如一个列表中有10000条数据，将这些数据放在一个Task中处理会非常耗时。那么就可以将原始数据拆分成多个子列表，为每个子列表分配一个独立的Task执行，等待全… [`references/使用TaskPool执行多个耗时任务.md`](<references/使用TaskPool执行多个耗时任务.md>)
- **使用TaskPool执行独立的耗时任务** — 对于独立运行的耗时任务，任务完成后将结果返回给宿主线程。可采用以下方式实现。 下面通过图片加载来说明。 1. 实现子线程需要执行的任务。 export class IconItemSource { image: string | Resource = ''; text: string | Resource = ''; constructor(image: s… [`references/使用TaskPool执行独立的耗时任务.md`](<references/使用TaskPool执行独立的耗时任务.md>)
- **全局配置项功能场景** — 对于需要使用进程单例的场景，例如不同并发实例间需要数据保持一致的全局配置项功能，可以采用 共享模块 来实现。 以下示例展示了只有在Wi-Fi打开且用户登录的情况下才能进行下载的功能，具体步骤如下。 1. 编写全局配置文件。 import { ArkTSUtils } from '@kit.ArkTS'; 'use shared' @Sendable clas… [`references/全局配置项功能场景.md`](<references/全局配置项功能场景.md>)
- **共享容器** — ArkTS共享容器（ @arkts.collections (ArkTS容器集) ）是一种在并发实例间共享传输的容器类，用于并发场景下的高性能数据传递。它的功能与ECMAScript 262规范定义的容器类似，但存在部分差异，具体可见 共享容器与原生API方法的行为差异对比 。 ArkTS共享容器在多个并发实例间传递时，默认采用引用传递，允许多个并发实例操作… [`references/共享容器.md`](<references/共享容器.md>)
- **共享模块** — 共享模块是进程内只会加载一次的模块，使用"use shared"这一指令来标记一个模块是否为共享模块。 非共享模块在同一线程内只加载一次，而在不同线程中会多次加载，每个线程都会生成新的模块对象。因此，目前只能使用共享模块实现进程单例。 #### 约束限制 - "use shared"需要与"use strict"一样写在ArkTS文件顶层，写在import语… [`references/共享模块.md`](<references/共享模块.md>)
- **动态加载** — 动态import支持条件延迟加载，支持部分反射功能，可以提升页面的加载速度；动态import支持加载HSP模块/HAR模块/OHPM包/Native库等，并且HAR模块之间可通过变量动态import来访问彼此导出的内容，可避免编译期强依赖，实现模块解耦。 #### 技术适用场景介绍 应用开发的有些场景中，如果希望根据条件导入模块或者按需导入模块，可以使用动态… [`references/动态加载.md`](<references/动态加载.md>)
- **同步任务开发指导 (TaskPool和Worker)** — 同步任务用于在多个线程间协调执行，确保任务按特定顺序和规则进行（如使用锁防止数据竞争）。 同步任务的实现需要考虑多个线程之间的协作和同步，以确保数据的正确性和程序的正确执行。 当同步任务之间相对独立时，推荐使用TaskPool，例如一系列导入的静态方法或单例实现的方法。如果同步任务之间有关联性，则需要使用Worker。 #### 使用TaskPool处理同步… [`references/同步任务开发指导 (TaskPool和Worker).md`](<references/同步任务开发指导 (TaskPool和Worker).md>)
- **同步方式动态加载Native模块** — loadNativeModule接口 用于同步动态加载Native模块，目的是按需加载所需要的模块。使用该接口会增加加载so文件的时间，开发者需评估其对功能的影响。 #### 函数说明 loadNativeModule(moduleName: string): Object; loadNativeModule加载的模块名是指依赖方oh-package.jso… [`references/同步方式动态加载Native模块.md`](<references/同步方式动态加载Native模块.md>)
- **在build-profile.json5中配置arkOptions** — arkOptions主要提供ArkTS编译相关配置，当前文档介绍arkOptions中types配置类型、maxFlowDepth配置控制流分析最大深度等，arkOptions中的其他配置项请参考 build-profile.json5 。 #### types #### types配置文件标签说明 arkOptions的types字段配置文件标签说明： #… [`references/在build-profile.json5中配置arkOptions.md`](<references/在build-profile.json5中配置arkOptions.md>)
- **基于Node-API加载模块** — Node-API中有多种方式支持开发者在C++侧加载工程内模块及文件。推荐使用napi_load_module_with_info接口。 #### napi_load_module_with_info 在主线程或子线程内加载hap/hsp/har/native模块，使用时必须标记所加载的包的信息，支持多种场景。 具体参考： napi_load_module_… [`references/基于Node-API加载模块.md`](<references/基于Node-API加载模块.md>)
- **基础库常见问题** — 由于ArkTS侧提供的XML解析接口暂不支持流式解析模式，建议通过Native工程调用第三方C/C++库来实现。推荐使用 **libxml2** 库，该库具有成熟稳定、性能优越的特点，能够支持SAX等流式解析方式，有效降低内存占用。 具体实施步骤如下： 1. **创建Native工程**：在HarmonyOS项目中创建C++模块。 2. **集成libxml… [`references/基础库常见问题.md`](<references/基础库常见问题.md>)
- **多级Worker间高性能消息通信** — 多级 Worker （即通过父Worker创建子Worker的机制形成层级线程关系）间通信是一种常见的需求，由于Worker线程生命周期由用户自行管理，因此需要注意多级Worker生命周期的正确管理，建议开发者确保销毁父Worker前先销毁所有子Worker。 本文介绍如何在多级Worker间实现高性能消息通信。高性能消息通信的关键在于 Sendable对象… [`references/多级Worker间高性能消息通信.md`](<references/多级Worker间高性能消息通信.md>)
- **多线程取消TaskPool任务场景** — 由于任务池 TaskPool 的任务对象 Task 不支持跨线程传递，无法在子线程中直接取消任务。从 API version 18 开始，Task新增了 任务ID 属性，支持通过任务ID在子线程中取消任务。开发者可将已创建任务的任务ID存储在 Sendable对象 中，需要取消任务时，通过Sendable对象在子线程中取消任务。详情可参考以下示例。 1. 定… [`references/多线程取消TaskPool任务场景.md`](<references/多线程取消TaskPool任务场景.md>)
- **多线程并发概述** — 多线程并发是指在单个程序中同时运行多个线程，通过并行或交替执行任务来提升性能和资源利用率的编程模型。在ArkTS应用开发中，多线程并发适用于多种业务场景，常见的业务场景主要分为以下三类，更详细的使用请参考 **应用多线程开发实践案例** 。 - 业务逻辑包含大量计算或频繁的I/O读写等需要长时间执行的任务，例如图片和视频的编解码、文件的压缩与解压缩、数据库操… [`references/多线程并发概述.md`](<references/多线程并发概述.md>)
- **容器类对象** — 容器类对象在跨线程传递时，可通过序列化的机制，确保跨线程间的数据一致，从而实现跨线程数据传递。 目前支持序列化的容器类对象包括 TreeSet ，容器类对象中的成员必须是序列化支持的类型，目前序列化支持类型可以参考 线程间通信对象概述 中的相关对象。 - 从HarmonyOS 6.1.0开始，支持使用TreeSet容器类对象实现跨线程数据传递。 - 容器类对… [`references/容器类对象.md`](<references/容器类对象.md>)
- **容器类库概述** — 容器类库用于存储各种数据类型的元素，提供一系列处理数据的方法，作为纯数据结构容器具备高效处理特性。 容器类使用静态语言实现，限制了存储位置和属性，不支持自定义属性和方法，确保每种类型的数据在实现其功能的过程中避免冗余逻辑，从而实现高效的数据访问，提升应用性能。 当前提供了线性和非线性两类容器。 线性容器 和 非线性容器 均非多线程安全的。 [`references/容器类库概述.md`](<references/容器类库概述.md>)
- **常驻任务并发场景简介** — 在应用业务实现中，对于耗时较长（超过3分钟）且并发量较小的常驻任务，建议使用Worker在后台线程中执行这些操作，以避免阻塞UI主线程，防止出现丢帧、卡顿等影响用户体验的问题。 常驻任务是指相比于短时任务，时间更长的任务，可能跟UI主线程生命周期一致。相比于长时任务，常驻任务更倾向于跟线程绑定的任务，单次运行时间更长（比如超过3分钟）。 对于常驻任务，较为常… [`references/常驻任务并发场景简介.md`](<references/常驻任务并发场景简介.md>)
- **常驻任务开发指导（Worker）** — 提供使用Worker进行常驻任务的开发指导。Worker将持续执行任务，直到宿主线程发送终止指令。 开发过程和示例如下： 1. DevEco Studio支持一键生成Worker，在对应的{moduleName}目录下任意位置，单击鼠标右键 > New > Worker，即可自动生成Worker的模板文件及配置信息。本文以创建“Worker”为例。 此外，还… [`references/常驻任务开发指导（Worker）.md`](<references/常驻任务开发指导（Worker）.md>)
- **并发常见问题** — 开发者发现TaskPool任务不执行时，可按照以下步骤快速定位。 1. **taskpool.execute接口是否调用** 。 taskpool.execute被调用时，Hilog会打印TaskPool调用态日志（Task Allocation: taskId:）。 如果发现没有该维测日志表明taskpool.execute实际未调用，应用需排查taskp… [`references/并发常见问题.md`](<references/并发常见问题.md>)
- **并发概述** — 并发指在同一时间内，多个任务同时执行。在多核设备上，任务可以在不同CPU上并行执行。对于单核设备，尽管多个任务不会同时执行，但CPU会在某个任务休眠或进行I/O操作时切换任务，调度其他任务，提高CPU的资源利用率。 为了提升应用的响应速度和帧率，避免耗时任务影响UI主线程，ArkTS提供了异步并发和多线程并发两种处理策略。 - 异步并发是指异步代码在执行到一… [`references/并发概述.md`](<references/并发概述.md>)
- **应用多线程开发概述** — 在ArkTS应用开发中，不同业务场景需要不同的并发能力和任务类型。 常见的业务场景分为三种并发任务： 耗时任务 ：业务逻辑包含较大计算量或多次I/O读写等需要长时间执行的任务。 长时任务 ：业务逻辑包含监听或定期采集数据等需要长时间保持运行的任务。 常驻任务 ：业务逻辑跟随主线程生命周期或与主线程绑定的任务。 不同任务类型可以进一步细分，例如，典型的耗时任务… [`references/应用多线程开发概述.md`](<references/应用多线程开发概述.md>)
- **延迟加载（lazy import）** — 随着应用程序功能的扩展，冷启动时间显著增加，主要是因为启动初期加载了大量未实际执行的模块。这不仅延长了应用的初始化时间，还浪费了资源。需要精简加载流程，剔除非必需的文件执行，优化冷启动性能，确保用户体验流畅。 - 延迟加载特性在API 12版本开始支持。 - 开发者如需在API 12上使用lazy import语法，需在工程中配置"compatibleSdk… [`references/延迟加载（lazy import）.md`](<references/延迟加载（lazy import）.md>)
- **异步并发 (Promise和async/await)** — Promise和async/await是标准的JS异步语法，提供异步并发能力。异步代码执行时会被挂起，在异步操作完成后恢复执行，确保同一时间只有一段代码在运行。以下是典型的异步并发使用场景： - I/O 非阻塞操作：网络请求、文件读写、定时器等。 - 任务轻量且无 CPU 阻塞：单次任务执行时间短。 - 逻辑依赖清晰：任务有明确的顺序或并行关系。 异步并发是… [`references/异步并发 (Promise和async_await).md`](<references/异步并发 (Promise和async_await).md>)
- **异步等待** — ArkTS引入了异步任务的等待和唤醒能力，以解决多线程任务时序控制问题。异步任务通过 ConditionVariable 对象实现等待和唤醒机制，该对象支持跨线程引用传递。 ArkTS语言支持异步操作，现已增加异步任务的等待和唤醒功能。当异步任务收到唤醒通知或等待超时后，将继续执行。 使用异步方法需标记为async，调用时需用await修饰，确保时序正确。 … [`references/异步等待.md`](<references/异步等待.md>)
- **异步锁** — 为了解决多线程并发实例间的数据竞争问题，ArkTS引入了异步锁能力。异步锁可能会被类对象持有，因此为了更方便地在并发实例间获取同一个异步锁对象， AsyncLock对象 支持跨线程引用传递。 由于ArkTS语言支持异步操作，阻塞锁容易产生死锁问题，因此在ArkTS中仅支持异步锁（非阻塞式锁）。同时，异步锁还可以用于保证单线程内的异步任务时序一致性，防止因异步… [`references/异步锁.md`](<references/异步锁.md>)
- **批量数据写数据库场景** — 对于需要频繁数据库操作的场景，由于读写数据库存在耗时，因此推荐在子线程中操作，避免阻塞UI线程。 通过ArkTS提供的TaskPool能力，可以将数据库操作任务移到子线程中，实现如下。 1. 创建多个子任务，支持数据库的创建、插入、查询和清除等操作。 2. UI主线程发起数据库操作请求，在子线程中完成数据库的增删改查等操作。 import { relatio… [`references/批量数据写数据库场景.md`](<references/批量数据写数据库场景.md>)
- **方舟字节码函数命名规则** — 本文介绍字节码文件中 Method 的name_off字段指向的字符串的命名规则，该命名规则从方舟字节码文件版本12.0.4.0开始生效。 #### 入口函数 模块加载时被执行的函数，名称固定为func_main_0。 #### 非入口函数 其他函数在字节码文件中的名称结构如下： #前缀#原函数名 下面的章节将会详细介绍前缀和原函数名。 #### 前缀 前缀… [`references/方舟字节码函数命名规则.md`](<references/方舟字节码函数命名规则.md>)
- **方舟字节码基本原理** — 方舟字节码（Ark Bytecode）是由方舟编译器编译ArkTS/TS/JS生成的，提供给方舟运行时解释执行的二进制文件。方舟字节码中的主要内容是方舟字节码指令。 本文旨在介绍方舟字节码指令相关的设计，将在后续章节中对构成指令的重要概念和具体的指令格式及含义进行说明，帮助开发者了解方舟字节码指令，指导开发者进行指令相关的特性开发工作。 一条方舟字节码指令，… [`references/方舟字节码基本原理.md`](<references/方舟字节码基本原理.md>)
- **方舟字节码文件格式** — 本文详细介绍了方舟字节码文件的格式，旨在帮助开发者深入理解字节码文件的组成结构，以指导字节码的分析和修改。 #### 约束 本文内容基于方舟字节码版本号12.0.6.0（版本号为方舟编译器内部保留字段，开发者无需关注，仅供准确对照之用）。 #### 字节码文件数据类型 方舟字节码使用了多种基础和复合数据类型，以下为常见类型的定义和说明。 #### 整型 ##… [`references/方舟字节码文件格式.md`](<references/方舟字节码文件格式.md>)
- **方舟字节码概述** — 方舟字节码文件是ArkTS/TS/JS源码编译后的二进制产物。本章节介绍方舟字节码文件的各个部分，以帮助开发者深入了解字节码文件内容，进行字节码的分析和修改。 - 方舟字节码文件格式：介绍字节码文件中包含的各个部分的结构信息，以及各种结构的存储方式和映射关系。 - 方舟字节码基本原理：介绍字节码中构成指令的重要概念和具体的指令格式及含义，帮助开发者了解方舟字… [`references/方舟字节码概述.md`](<references/方舟字节码概述.md>)
- **方舟字节码生成常见问题** — 在ArkTS工程的构建流程中，方舟字节码（*.abc）的生成由工具链中的es2abc编译器组件完成。 在Hvigor构建任务中，es2abc编译器会被自动调用，用于将TypeScript/JavaScript源代码转换为方舟虚拟机能够执行的字节码文件（*.abc）。这些生成的文件随后被打包进HAP/HAR/HSP中，并由系统加载。 本FAQ汇总了字节码生成在… [`references/方舟字节码生成常见问题.md`](<references/方舟字节码生成常见问题.md>)
- **普通对象** — 普通对象跨线程时通过拷贝（序列化）形式传递，两个线程的对象内容一致，但指向各自线程的隔离内存区间，被分配在各自线程的虚拟机本地堆（LocalHeap）。序列化支持类型包括：除Symbol之外的基础类型、Date、String、RegExp、Array、Map、Set、Object（仅限简单对象，比如通过"{}"或者"new Object"创建，普通对象仅支持… [`references/普通对象.md`](<references/普通对象.md>)
- **模块加载副作用及优化** — 当使用 ArkTS模块化 时，模块的加载和执行可能会引发 **副作用** 。副作用是指在模块导入时除了导出功能或对象之外，额外的行为或状态变化， **这些行为可能影响程序的其他部分，并导致产生非预期的顶层代码执行、全局状态变化、原型链修改、导入内容未定义等问题** 。 #### ArkTS模块化导致副作用的场景及优化方式 #### 模块执行顶层代码 **副作… [`references/模块加载副作用及优化.md`](<references/模块加载副作用及优化.md>)
- **模块化运行简介** — 为了解决大型或复杂应用开发过程中，部分代码编译时被多次拷贝导致包体积增大、文件依赖、代码与资源共享困难以及单例和全局变量污染等问题，ArkTS支持应用模块化编译、打包和运行，简化代码的编写与维护。 模块化是将ArkTS/TS/JS模块（一个文件对应一个模块）以及so模块通过编译工具或运行时机制将这些 模块加载 、解析、组合并执行的过程。 ArkTS支持的模块… [`references/模块化运行简介.md`](<references/模块化运行简介.md>)
- **线性容器** — 线性容器实现能按顺序访问的数据结构，其底层主要通过数组实现，包括ArrayList、Vector、List、LinkedList、Deque、Queue和Stack。 线性容器优化了数据访问速度，运行时（Runtime）通过一条字节码指令即可完成增、删、改、查等操作。 #### 各线性容器类型特征对比 #### ArrayList ArrayList 即动态… [`references/线性容器.md`](<references/线性容器.md>)
- **线程间通信对象概述** — 在多线程并发场景中，例如通过TaskPool或Worker创建后台线程，不同线程间需要进行数据交互。由于线程间内存隔离，线程间通信对象必须通过序列化实现值拷贝或内存共享。 - 单次序列化传输的数据量大小限制为16MB。 - 序列化不支持使用@State装饰器、@Prop装饰器、@Link装饰器等装饰器修饰的复杂类型。 目前ArkTS支持线程间通信的对象有以下… [`references/线程间通信对象概述.md`](<references/线程间通信对象概述.md>)
- **编译期自定义修改方舟字节码** — 如果开发者希望自定义修改方舟字节码文件的内容，可以使用ArkTS编译工具链提供的方法自定义修改方舟字节码文件。 #### 能力配置说明 准备一个操作方舟字节码文件的动态库文件，在工程的配置文件build-profile.json5中 配置编译选项transformLib ，选项值为这个动态库的路径，编译器会在指定时机加载该动态库，并执行其中指定的Transf… [`references/编译期自定义修改方舟字节码.md`](<references/编译期自定义修改方舟字节码.md>)
- **耗时任务并发场景简介** — 耗时任务是指需要较长时间执行的任务，如果在UI主线程执行，可能导致应用卡顿、掉帧或响应延迟。典型的耗时任务包括CPU密集型任务、I/O密集型任务和同步任务。 常见的业务场景分类如下： [`references/耗时任务并发场景简介.md`](<references/耗时任务并发场景简介.md>)
- **自定义Native Sendable对象的多线程操作场景** — ArkTS支持开发者自定义Native Sendable对象，Sendable对象提供了并发实例间高效的通信能力，即引用传递，适用于开发者自定义大对象需要线程间通信的场景，例如子线程读取数据库数据并返回给宿主线程。 本示例将详细说明如何使用自定义Native Sendable对象实现并发实例间数据共享。 1. 接口声明中自定义Sendable类。 // In… [`references/自定义Native Sendable对象的多线程操作场景.md`](<references/自定义Native Sendable对象的多线程操作场景.md>)
- **自定义Native Transferable对象的多线程操作场景** — 在ArkTS应用开发中，有很多场景需要将ArkTS对象与Native对象进行绑定。ArkTS对象将数据写入Native对象，Native对象再将数据写入目的地。例如，将ArkTS对象中的数据写入C++数据库场景。 Native Transferable对象有两种模式：共享模式和转移模式。本示例将详细说明如何实现这两种模式。 1. Native实现各项功能。 … [`references/自定义Native Transferable对象的多线程操作场景.md`](<references/自定义Native Transferable对象的多线程操作场景.md>)
- **获取最近访问列表场景** — 为了快速访问最近使用的 Sendable 对象，从API version 18开始，ArkTS引入了 SendableLruCache 。开发者可以通过向SendableLruCache实例中添加、删除和获取Sendable对象，实现快速访问最近使用的Sendable对象。本文提供使用SendableLruCache实现获取最近使用列表的开发指导，以书架为例… [`references/获取最近访问列表场景.md`](<references/获取最近访问列表场景.md>)
- **长时任务并发场景简介** — 在应用业务实现过程中，需要较长时间不定时运行的任务称为长时任务。如果在UI主线程中执行这些长时任务，会阻塞UI业务，导致卡顿和丢帧等问题，影响用户体验。因此，通常需要将这些独立的长时任务放到单独的子线程中执行。 典型的长时任务场景如下所示： 上述业务场景均为独立的长时任务，任务执行周期长，与外部交互简单。将这些任务分发至后台线程执行后，可根据需求适时获取其执… [`references/长时任务并发场景简介.md`](<references/长时任务并发场景简介.md>)
- **长时任务开发指导（TaskPool）** — 此处提供使用TaskPool进行长时任务的开发指导，以定期采集传感器数据为例。 #### 使用TaskPool进行传感器数据监听 1. 导入所需的模块。 // Index.ets import { sensor } from '@kit.SensorServiceKit'; import { taskpool } from '@kit.ArkTS'; imp… [`references/长时任务开发指导（TaskPool）.md`](<references/长时任务开发指导（TaskPool）.md>)
- **静态方式加载Native模块** — 在ES6(ECMAScript 6.0)模块设计中，使用import语法加载其他文件导出的内容是ECMA规范所定义的语法规则。为支持开发者使用该功能导入Native模块（so）导出的内容，ArkTS进行了相关适配，并提供了以下几种支持写法。 #### 直接导入 在Native模块的index.d.ts文件中导出，并在文件内直接导入。 #### 具名导入 //… [`references/静态方式加载Native模块.md`](<references/静态方式加载Native模块.md>)
- **非线性容器** — 非线性容器实现能快速查找的数据结构，其底层通过hash或者红黑树实现，包括HashMap、HashSet、TreeMap、TreeSet、LightWeightMap、LightWeightSet、PlainArray七种。非线性容器中的key及value的类型均满足ECMA标准。 #### 各非线性容器类型特征对比 #### HashMap HashMap… [`references/非线性容器.md`](<references/非线性容器.md>)
