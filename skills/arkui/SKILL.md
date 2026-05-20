---
name: arkui
description: ArkUI为HarmonyOS提供完整的UI框架，包括声明式和类Web开发范式、丰富的组件、布局、动画、状态管理（V1/V2）、自定义渲染、Navigation路由以及NDK构建UI能力。
---

## 功能说明

ArkUI（方舟UI框架）为应用的UI开发提供完整的基础设施，包括简洁的UI语法、丰富的UI功能（组件、布局、动画以及交互事件）以及实时界面预览工具。框架支持两种开发范式：基于ArkTS的声明式开发范式（推荐）和兼容JS的类Web开发范式。声明式开发范式从组件、动画和状态管理三个维度提供UI绘制能力，适用于复杂应用的高效开发。

状态管理是ArkUI的核心机制，分为V1和V2两个版本。V1提供@State、@Prop、@Link、@Provide/@Consume、@Observed/@ObjectLink等装饰器管理组件级和应用级状态；V2提供@Local、@Param、@Event、@Monitor、@ObservedV2/@Trace、@Provider/@Consumer等增强装饰器，推荐新应用直接使用V2版本。全局状态管理支持AppStorage/AppStorageV2（应用全局）、LocalStorage（页面级）和PersistentStorage/PersistenceV2（持久化）。框架还支持MVVM模式、自定义组件生命周期管理、组件冻结、渲染控制（ForEach、LazyForEach、Repeat、if/else）等高级能力。

ArkUI提供丰富的UI组件和布局能力，包括线性布局（Row/Column）、层叠布局（Stack）、弹性布局（Flex）、相对布局（RelativeContainer）、栅格布局（GridRow/GridCol）等布局系统，以及List、Grid、Swiper、WaterFlow、Tabs等容器组件。动画系统涵盖属性动画、帧动画、转场动画、粒子动画、弹簧曲线等。交互方面支持手势事件（触屏、鼠标、键盘、触控板、表冠、游戏手柄）、拖拽、焦点处理等。高级能力包括Navigation路由、自定义组件/节点/渲染、NDK构建UI、画中画、智慧多窗、嵌入式组件、无障碍、国际化、窗口和屏幕管理等。

## 使用场景

开发HarmonyOS应用的UI界面时，请使用ArkUI框架。对于新项目，推荐使用声明式开发范式（ArkTS语言）。当需要构建动态交互界面时，请使用状态管理装饰器（V1或V2）驱动UI更新。当需要页面导航和路由管理时，请使用Navigation组件替代Router。当需要实现自定义绘制效果时，可使用Canvas组件或自定义渲染节点（RenderNode）。

当标准组件无法满足需求时，请使用自定义能力：自定义组件、自定义节点（FrameNode、BuilderNode、RenderNode）、自定义绘制修改器（DrawModifier）、属性修改器（AttributeModifier）等。当需要使用C/C++构建UI时，请使用NDK接口。当应用需要适配深浅色、多语言、智慧多窗、折叠屏等场景时，请使用对应的适配和主题换肤能力。

## 典型场景

- 如何选择状态管理方案（V1与V2的区别、装饰器选型）
- 如何使用Navigation实现页面路由和导航管理
- 如何使用@State、@Link、@Prop等装饰器实现父子组件数据同步
- 如何实现属性动画、帧动画、转场动画和弹簧动画效果
- 如何使用List、Grid、WaterFlow等容器组件实现列表和网格布局
- 如何使用自定义组件、自定义节点和自定义渲染实现复杂UI需求
- 如何处理手势事件冲突和实现多层级手势交互
- 如何实现应用沉浸式效果和窗口管理
- 如何进行V1到V2状态管理的迁移
- 如何使用NDK接口在C/C++中构建UI界面

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### Kit简介与概述

- [ArkUI简介](references/ArkUI简介.md) - 介绍ArkUI框架的整体架构、两种开发范式和分层API选型建议
- [ArkUI术语](references/ArkUI术语.md) - 解释ArkUI开发中涉及的专业术语
- [UI开发（ArkTS声明式开发范式）概述](references/UI开发（ArkTS声明式开发范式）概述.md) - 概述ArkTS声明式开发范式的基本概念和开发流程
- [UI开发 (兼容JS的类Web开发范式)概述](references/UI开发 (兼容JS的类Web开发范式)概述.md) - 概述兼容JS的类Web开发范式的基本概念
- [组件介绍](references/组件介绍.md) - 介绍ArkUI提供的UI组件体系
- [基本语法概述](references/基本语法概述.md) - 概述ArkTS声明式UI的基本语法
- [基础知识](references/基础知识.md) - 介绍ArkUI开发所需的基础知识
- [文件组织](references/文件组织.md) - 说明ArkUI应用的文件组织方式
- [声明式UI描述](references/声明式UI描述.md) - 说明声明式UI的描述语法

### 状态管理V2（装饰器）

- [@Local装饰器：组件内部状态](references/@Local装饰器：组件内部状态.md) - 说明V2版本@Local装饰器的用法，用于管理组件内部状态
- [@Param：组件外部输入](references/@Param：组件外部输入.md) - 说明V2版本@Param装饰器的用法，用于接收组件外部输入参数
- [@Event装饰器：规范组件输出](references/@Event装饰器：规范组件输出.md) - 说明V2版本@Event装饰器的用法，用于规范组件输出事件
- [@Once：初始化同步一次](references/@Once：初始化同步一次.md) - 说明V2版本@Once装饰器的用法，实现初始化时同步一次
- [@Monitor装饰器：状态变量修改异步监听](references/@Monitor装饰器：状态变量修改异步监听.md) - 说明V2版本@Monitor装饰器的用法，用于异步监听状态变量修改
- [@Computed装饰器：计算属性](references/@Computed装饰器：计算属性.md) - 说明V2版本@Computed装饰器的用法，用于定义计算属性
- [@ObservedV2装饰器和@Trace装饰器：类属性变化观测](references/@ObservedV2装饰器和@Trace装饰器：类属性变化观测.md) - 说明V2版本@ObservedV2和@Trace装饰器的用法，用于观测类属性变化
- [@Type装饰器：标记类属性的类型](references/@Type装饰器：标记类属性的类型.md) - 说明V2版本@Type装饰器的用法，用于标记类属性的类型信息
- [@Provider装饰器和@Consumer装饰器：跨组件层级双向同步](references/@Provider装饰器和@Consumer装饰器：跨组件层级双向同步.md) - 说明V2版本@Provider和@Consumer装饰器的用法，实现跨组件层级双向同步
- [@SyncMonitor装饰器：状态变量修改同步监听](references/@SyncMonitor装饰器：状态变量修改同步监听.md) - 说明V2版本@SyncMonitor装饰器的用法，用于同步监听状态变量修改
- [@Env：环境变量](references/@Env：环境变量.md) - 说明V2版本@Env装饰器的用法，用于注入环境变量
- [@ReusableV2装饰器：V2组件复用](references/@ReusableV2装饰器：V2组件复用.md) - 说明V2版本@ReusableV2装饰器的用法，用于实现V2组件复用

### 状态管理V1（装饰器）

- [@State装饰器：组件内状态](references/@State装饰器：组件内状态.md) - 说明V1版本@State装饰器的用法，用于管理组件内状态
- [@Prop装饰器：父子单向同步](references/@Prop装饰器：父子单向同步.md) - 说明V1版本@Prop装饰器的用法，实现父子组件单向数据同步
- [@Link装饰器：父子双向同步](references/@Link装饰器：父子双向同步.md) - 说明V1版本@Link装饰器的用法，实现父子组件双向数据同步
- [@Provide装饰器和@Consume装饰器：与后代组件双向同步](references/@Provide装饰器和@Consume装饰器：与后代组件双向同步.md) - 说明V1版本@Provide和@Consume装饰器的用法，实现与后代组件双向同步
- [@Observed装饰器和@ObjectLink装饰器：嵌套类对象属性变化](references/@Observed装饰器和@ObjectLink装饰器：嵌套类对象属性变化.md) - 说明V1版本@Observed和@ObjectLink装饰器的用法，用于观测嵌套类对象属性变化
- [@Watch装饰器：状态变量更改通知](references/@Watch装饰器：状态变量更改通知.md) - 说明V1版本@Watch装饰器的用法，用于监听状态变量更改并发出通知
- [@Track装饰器：class对象属性级更新](references/@Track装饰器：class对象属性级更新.md) - 说明V1版本@Track装饰器的用法，实现class对象属性级别的更新
- [@Require装饰器：校验构造传参](references/@Require装饰器：校验构造传参.md) - 说明@Require装饰器的用法，用于校验组件构造时的必传参数
- [@Reusable装饰器：V1组件复用](references/@Reusable装饰器：V1组件复用.md) - 说明V1版本@Reusable装饰器的用法，用于实现V1组件复用

### 全局状态管理

- [AppStorage：应用全局的UI状态存储](references/AppStorage：应用全局的UI状态存储.md) - 说明V1版本AppStorage的用法，实现应用全局UI状态存储
- [AppStorageV2_ 应用全局UI状态存储](references/AppStorageV2_ 应用全局UI状态存储.md) - 说明V2版本AppStorageV2的用法，实现应用全局UI状态存储
- [LocalStorage：页面级UI状态存储](references/LocalStorage：页面级UI状态存储.md) - 说明LocalStorage的用法，实现页面级UI状态存储
- [PersistentStorage：持久化存储UI状态](references/PersistentStorage：持久化存储UI状态.md) - 说明V1版本PersistentStorage的用法，实现UI状态的持久化存储
- [PersistenceV2_ 持久化存储UI状态](references/PersistenceV2_ 持久化存储UI状态.md) - 说明V2版本PersistenceV2的用法，实现UI状态的持久化存储
- [Environment：设备环境查询](references/Environment：设备环境查询.md) - 说明Environment的用法，用于查询设备环境参数

### 状态管理框架与迁移

- [MVVM模式（V1）](references/MVVM模式（V1）.md) - 说明V1版本的MVVM模式工作机制
- [MVVM模式（V2）](references/MVVM模式（V2）.md) - 说明V2版本的MVVM模式工作机制
- [状态管理概述](references/状态管理概述.md) - 概述ArkUI状态管理的整体架构和V1/V2版本介绍
- [状态管理术语](references/状态管理术语.md) - 解释状态管理相关的专业术语
- [状态管理原理介绍](references/状态管理原理介绍.md) - 介绍状态管理的工作原理和内部机制
- [管理应用拥有的状态概述](references/管理应用拥有的状态概述.md) - 概述应用级状态管理的整体方案
- [V1-V2迁移概述](references/V1-V2迁移概述.md) - 概述从状态管理V1迁移到V2的整体方案
- [状态管理V1和V2更新机制差异](references/状态管理V1和V2更新机制差异.md) - 对比状态管理V1和V2的更新机制差异
- [状态管理V1和V2混用指导（API version 19及之后）](references/状态管理V1和V2混用指导（API version 19及之后）.md) - 指导在API version 19及之后版本中混用V1和V2状态管理
- [状态管理V1和V2混用指导（API version 19前）](references/状态管理V1和V2混用指导（API version 19前）.md) - 指导在API version 19之前版本中混用V1和V2状态管理
- [应用内状态变量迁移](references/应用内状态变量迁移.md) - 指导应用内状态变量从V1迁移到V2
- [组件内状态变量迁移](references/组件内状态变量迁移.md) - 指导组件内状态变量从V1迁移到V2
- [数据对象状态变量迁移](references/数据对象状态变量迁移.md) - 指导数据对象状态变量从V1迁移到V2
- [内置对象的迁移](references/内置对象的迁移.md) - 指导内置对象从V1迁移到V2
- [组件复用迁移](references/组件复用迁移.md) - 指导组件复用机制从V1迁移到V2
- [渲染控制概述](references/渲染控制概述.md) - 概述渲染控制的机制和能力
- [循环渲染迁移](references/循环渲染迁移.md) - 指导循环渲染从ForEach/LazyForEach迁移到Repeat
- [AnimateTo使用迁移](references/AnimateTo使用迁移.md) - 指导AnimateTo的使用迁移方法
- [状态变量改变不触发组件刷新问题常用定位方法](references/状态变量改变不触发组件刷新问题常用定位方法.md) - 提供状态变量改变但不触发组件刷新问题的常用定位方法
- [应用内状态管理和其他常见问题](references/应用内状态管理和其他常见问题.md) - 汇总应用内状态管理的常见问题及解决方法
- [组件内状态管理常见问题](references/组件内状态管理常见问题.md) - 汇总组件内状态管理的常见问题及解决方法
- [数据对象状态管理常见问题](references/数据对象状态管理常见问题.md) - 汇总数据对象状态管理的常见问题及解决方法

### 状态管理工具接口

- [makeObserved接口：将非观察数据变为可观察数据](references/makeObserved接口：将非观察数据变为可观察数据.md) - 说明makeObserved接口的用法，将非观察数据变为可观察数据
- [getTarget接口：获取状态管理框架代理前的原始对象](references/getTarget接口：获取状态管理框架代理前的原始对象.md) - 说明getTarget接口的用法，获取代理前的原始对象
- [canBeObserved接口：判断对象是否可被观察](references/canBeObserved接口：判断对象是否可被观察.md) - 说明canBeObserved接口的用法，判断对象是否可被观察
- [applySync_flushUpdates_flushUIUpdates接口：同步刷新](references/applySync_flushUpdates_flushUIUpdates接口：同步刷新.md) - 说明同步刷新相关接口的用法
- [addMonitor_clearMonitor接口：动态添加_取消监听](references/addMonitor_clearMonitor接口：动态添加_取消监听.md) - 说明动态添加和取消监听接口的用法
- [!!语法：双向绑定](references/!!语法：双向绑定.md) - 说明!!双向绑定语法的用法
- [$$语法：系统组件双向同步](references/$$语法：系统组件双向同步.md) - 说明$$系统组件双向同步语法的用法
- [UI装饰器总览](references/UI装饰器总览.md) - 总览ArkUI提供的所有UI装饰器

### 自定义构建函数与样式

- [@Builder装饰器：自定义构建函数](references/@Builder装饰器：自定义构建函数.md) - 说明@Builder装饰器的用法，用于定义自定义构建函数
- [@BuilderParam装饰器：引用@Builder函数](references/@BuilderParam装饰器：引用@Builder函数.md) - 说明@BuilderParam装饰器的用法，用于引用@Builder函数
- [@LocalBuilder装饰器： 维持组件关系](references/@LocalBuilder装饰器： 维持组件关系.md) - 说明@LocalBuilder装饰器的用法，维持组件关系
- [@Styles装饰器：定义组件重用样式](references/@Styles装饰器：定义组件重用样式.md) - 说明@Styles装饰器的用法，用于定义可复用的组件样式
- [@Extend装饰器：定义扩展组件样式](references/@Extend装饰器：定义扩展组件样式.md) - 说明@Extend装饰器的用法，用于定义扩展组件样式
- [@AnimatableExtend装饰器：定义可动画属性](references/@AnimatableExtend装饰器：定义可动画属性.md) - 说明@AnimatableExtend装饰器的用法，用于定义可动画属性
- [stateStyles：多态样式](references/stateStyles：多态样式.md) - 说明stateStyles多态样式的用法
- [mutableBuilder：实现全局@Builder动态更新](references/mutableBuilder：实现全局@Builder动态更新.md) - 说明mutableBuilder的用法，实现全局@Builder动态更新
- [wrapBuilder：封装全局@Builder](references/wrapBuilder：封装全局@Builder.md) - 说明wrapBuilder的用法，用于封装全局@Builder

### Navigation路由

- [组件导航和页面路由概述](references/组件导航和页面路由概述.md) - 概述组件导航和页面路由的整体方案
- [Navigation基础架构介绍](references/Navigation基础架构介绍.md) - 介绍Navigation组件的基础架构设计
- [Navigation页面路由](references/Navigation页面路由.md) - 说明Navigation页面路由的开发方法
- [Navigation子页面](references/Navigation子页面.md) - 说明Navigation子页面的管理方法
- [Navigation分栏开发](references/Navigation分栏开发.md) - 说明Navigation分栏模式的开发方法
- [Navigation跨包路由](references/Navigation跨包路由.md) - 说明Navigation跨包路由的实现方法
- [Navigation转场动画](references/Navigation转场动画.md) - 说明Navigation转场动画的实现方法
- [Navigation动画常见问题](references/Navigation动画常见问题.md) - 汇总Navigation动画的常见问题及解决方法
- [Router切换Navigation](references/Router切换Navigation.md) - 指导如何从Router迁移到Navigation
- [页面路由](references/页面路由.md) - 说明页面路由的开发方法
- [页面路由 (@ohos.router)(不推荐)](references/页面路由 (@ohos.router)(不推荐).md) - 说明Router页面路由的用法（不推荐，建议使用Navigation）
- [页面转场动画 (不推荐)](references/页面转场动画 (不推荐).md) - 说明页面转场动画的用法（不推荐）

### 渲染控制

- [ForEach：循环渲染](references/ForEach：循环渲染.md) - 说明ForEach循环渲染的用法
- [LazyForEach：数据懒加载](references/LazyForEach：数据懒加载.md) - 说明LazyForEach数据懒加载的用法
- [Repeat：可复用的循环渲染](references/Repeat：可复用的循环渲染.md) - 说明Repeat可复用循环渲染的用法
- [if_else：条件渲染](references/if_else：条件渲染.md) - 说明if/else条件渲染的用法
- [ContentSlot：混合开发](references/ContentSlot：混合开发.md) - 说明ContentSlot混合开发的用法

### 布局

- [布局概述](references/布局概述.md) - 概述ArkUI提供的布局系统
- [布局说明](references/布局说明.md) - 说明各布局方式的特点和选型建议
- [线性布局 (Row_Column)](references/线性布局 (Row_Column).md) - 说明线性布局Row和Column的用法
- [层叠布局 (Stack)](references/层叠布局 (Stack).md) - 说明层叠布局Stack的用法
- [弹性布局 (Flex)](references/弹性布局 (Flex).md) - 说明弹性布局Flex的用法
- [相对布局 (RelativeContainer)](references/相对布局 (RelativeContainer).md) - 说明相对布局RelativeContainer的用法
- [栅格布局](references/栅格布局.md) - 说明栅格布局的概念和原理
- [栅格布局 (GridRow_GridCol)](references/栅格布局 (GridRow_GridCol).md) - 说明栅格布局GridRow和GridCol的用法
- [检查页面布局](references/检查页面布局.md) - 说明如何检查页面布局效果

### 列表与网格

- [列表与网格概述](references/列表与网格概述.md) - 概述列表和网格组件的功能特点
- [创建列表 (List)](references/创建列表 (List).md) - 说明如何创建List列表组件
- [使用列表](references/使用列表.md) - 说明列表组件的使用方法
- [创建网格 (Grid_GridItem)](references/创建网格 (Grid_GridItem).md) - 说明如何创建Grid网格组件
- [使用网格](references/使用网格.md) - 说明网格组件的使用方法
- [创建轮播 (Swiper)](references/创建轮播 (Swiper).md) - 说明如何创建Swiper轮播组件
- [创建瀑布流（WaterFlow）](references/创建瀑布流（WaterFlow）.md) - 说明如何创建WaterFlow瀑布流组件
- [使用瀑布流](references/使用瀑布流.md) - 说明瀑布流组件的使用方法

### 组件 - 按钮、文本、输入

- [按钮 (Button)](references/按钮 (Button).md) - 说明Button按钮组件的用法
- [切换按钮 (Toggle)](references/切换按钮 (Toggle).md) - 说明Toggle切换按钮的用法
- [单选框 (Radio)](references/单选框 (Radio).md) - 说明Radio单选框的用法
- [进度条 (Progress)](references/进度条 (Progress).md) - 说明Progress进度条的用法
- [选项卡 (Tabs)](references/选项卡 (Tabs).md) - 说明Tabs选项卡的用法
- [文本显示 (Text_Span)](references/文本显示 (Text_Span).md) - 说明Text和Span文本显示组件的用法
- [文本输入 (TextInput_TextArea_Search)](references/文本输入 (TextInput_TextArea_Search).md) - 说明TextInput、TextArea和Search文本输入组件的用法
- [富文本编辑（RichEditor）](references/富文本编辑（RichEditor）.md) - 说明RichEditor富文本编辑组件的用法
- [文本概述](references/文本概述.md) - 概述文本组件的功能和分类
- [属性字符串（StyledString_MutableStyledString）](references/属性字符串（StyledString_MutableStyledString）.md) - 说明StyledString和MutableStyledString属性字符串的用法
- [Text组件的文本绘制与显示](references/Text组件的文本绘制与显示.md) - 说明Text组件的文本绘制与显示原理
- [使用文本常见问题](references/使用文本常见问题.md) - 汇总文本使用中的常见问题及解决方法
- [添加标题行和文本区域](references/添加标题行和文本区域.md) - 说明如何添加标题行和文本区域
- [添加留言区域](references/添加留言区域.md) - 说明如何添加留言区域
- [表单与选择组件概述](references/表单与选择组件概述.md) - 概述表单和选择类组件
- [按钮与选择组件常见问题](references/按钮与选择组件常见问题.md) - 汇总按钮与选择组件的常见问题及解决方法

### 组件 - 图片、视频、图形

- [显示图片 (Image)](references/显示图片 (Image).md) - 说明Image图片显示组件的用法
- [添加图片区域](references/添加图片区域.md) - 说明如何添加图片区域
- [视频播放 (Video)](references/视频播放 (Video).md) - 说明Video视频播放组件的用法
- [图标小符号 (SymbolGlyph_SymbolSpan)](references/图标小符号 (SymbolGlyph_SymbolSpan).md) - 说明SymbolGlyph和SymbolSpan图标小符号的用法
- [图文混排](references/图文混排.md) - 说明图文混排能力的用法

### 组件 - 画布与绘制

- [使用画布绘制自定义图形 (Canvas)](references/使用画布绘制自定义图形 (Canvas).md) - 说明如何使用Canvas画布绘制自定义图形
- [Canvas对象](references/Canvas对象.md) - 说明Canvas对象的属性和方法
- [CanvasRenderingContext2D对象](references/CanvasRenderingContext2D对象.md) - 说明CanvasRenderingContext2D对象的属性和方法
- [OffscreenCanvasRenderingContext2D对象](references/OffscreenCanvasRenderingContext2D对象.md) - 说明OffscreenCanvasRenderingContext2D对象的属性和方法
- [Path2D对象](references/Path2D对象.md) - 说明Path2D对象的属性和方法
- [几何图形绘制概述](references/几何图形绘制概述.md) - 概述几何图形绘制的能力
- [绘制几何图形 (Shape)](references/绘制几何图形 (Shape).md) - 说明Shape几何图形绘制组件的用法
- [绘制路径](references/绘制路径.md) - 说明路径绘制的方法
- [绘制图形](references/绘制图形.md) - 说明图形绘制的方法
- [绘制文本](references/绘制文本.md) - 说明文本绘制的方法
- [使用WebGL绘制图形](references/使用WebGL绘制图形.md) - 说明如何使用WebGL绘制图形

### 组件 - 弹窗与菜单

- [弹窗概述](references/弹窗概述.md) - 概述弹窗组件的功能和分类
- [弹出框概述](references/弹出框概述.md) - 概述弹出框的功能和分类
- [弹出框层级管理](references/弹出框层级管理.md) - 说明弹出框的层级管理机制
- [弹出框焦点策略](references/弹出框焦点策略.md) - 说明弹出框的焦点策略
- [弹出框控制器](references/弹出框控制器.md) - 说明弹出框控制器的用法
- [弹出框蒙层控制](references/弹出框蒙层控制.md) - 说明弹出框蒙层的控制方法
- [基础自定义弹出框 (CustomDialog)](references/基础自定义弹出框 (CustomDialog).md) - 说明CustomDialog自定义弹出框的用法
- [固定样式弹出框](references/固定样式弹出框.md) - 说明固定样式弹出框的用法
- [构建弹窗](references/构建弹窗.md) - 说明如何构建自定义弹窗
- [页面级弹出框](references/页面级弹出框.md) - 说明页面级弹出框的用法
- [不依赖UI组件的全局自定义弹出框 (openCustomDialog)](references/不依赖UI组件的全局自定义弹出框 (openCustomDialog).md) - 说明不依赖UI组件的全局自定义弹出框的用法
- [气泡提示概述](references/气泡提示概述.md) - 概述气泡提示的功能和分类
- [气泡提示（Popup）](references/气泡提示（Popup）.md) - 说明Popup气泡提示的用法
- [不依赖UI组件的全局气泡提示 (openPopup)](references/不依赖UI组件的全局气泡提示 (openPopup).md) - 说明不依赖UI组件的全局气泡提示的用法
- [即时反馈（Toast）](references/即时反馈（Toast）.md) - 说明Toast即时反馈的用法
- [菜单概述](references/菜单概述.md) - 概述菜单的功能和分类
- [菜单控制（Menu）](references/菜单控制（Menu）.md) - 说明Menu菜单控制的用法
- [不依赖UI组件的全局菜单 (openMenu)](references/不依赖UI组件的全局菜单 (openMenu).md) - 说明不依赖UI组件的全局菜单的用法
- [弹窗组件常见问题](references/弹窗组件常见问题.md) - 汇总弹窗组件的常见问题及解决方法

### 组件 - 模态页面

- [绑定模态页面概述](references/绑定模态页面概述.md) - 概述模态页面的功能和分类
- [绑定半模态页面（bindSheet）](references/绑定半模态页面（bindSheet）.md) - 说明半模态页面bindSheet的用法
- [绑定全模态页面（bindContentCover）](references/绑定全模态页面（bindContentCover）.md) - 说明全模态页面bindContentCover的用法
- [模态转场](references/模态转场.md) - 说明模态转场动画的实现方法

### 组件 - 其他

- [添加容器](references/添加容器.md) - 说明如何添加容器组件
- [添加交互](references/添加交互.md) - 说明如何添加交互功能
- [感知组件可见性](references/感知组件可见性.md) - 说明如何感知组件的可见性变化
- [形状裁剪（clipShape）](references/形状裁剪（clipShape）.md) - 说明clipShape形状裁剪的用法
- [设置浮层（OverlayManager）](references/设置浮层（OverlayManager）.md) - 说明OverlayManager浮层设置的用法
- [使用组件截图（ComponentSnapshot）](references/使用组件截图（ComponentSnapshot）.md) - 说明ComponentSnapshot组件截图的用法
- [粒子动画](references/粒子动画.md) - 说明粒子动画的实现方法
- [媒体查询 (@ohos.mediaquery)](references/媒体查询 (@ohos.mediaquery).md) - 说明媒体查询的用法
- [全屏启动元服务组件（FullScreenLaunchComponent）](references/全屏启动元服务组件（FullScreenLaunchComponent）.md) - 说明FullScreenLaunchComponent全屏启动元服务组件的用法
- [旋转屏动画](references/旋转屏动画.md) - 说明旋转屏动画的实现方法

### 自定义组件

- [创建自定义组件](references/创建自定义组件.md) - 说明如何创建自定义组件
- [构建自定义组件](references/构建自定义组件.md) - 说明如何构建自定义组件
- [自定义组件](references/自定义组件.md) - 说明自定义组件的概念和用法
- [自定义组合](references/自定义组合.md) - 说明自定义组合的实现方法
- [自定义组件成员属性访问限定符使用限制](references/自定义组件成员属性访问限定符使用限制.md) - 说明自定义组件成员属性访问限定符的使用限制
- [自定义组件的自定义布局](references/自定义组件的自定义布局.md) - 说明自定义组件自定义布局的实现方法
- [自定义组件生命周期](references/自定义组件生命周期.md) - 说明自定义组件的生命周期管理
- [自定义组件生命周期（推荐）](references/自定义组件生命周期（推荐）.md) - 说明推荐的自定义组件生命周期管理方式
- [自定义组件冻结功能（V1）](references/自定义组件冻结功能（V1）.md) - 说明V1版本自定义组件冻结功能的用法
- [自定义组件冻结功能（V2）](references/自定义组件冻结功能（V2）.md) - 说明V2版本自定义组件冻结功能的用法
- [生命周期](references/生命周期.md) - 说明应用和组件的生命周期机制
- [自定义能力概述](references/自定义能力概述.md) - 概述ArkUI的自定义能力体系
- [自定义扩展能力概述](references/自定义扩展能力概述.md) - 概述自定义扩展能力的体系
- [组件扩展概述](references/组件扩展概述.md) - 概述组件扩展的能力

### 自定义节点与渲染

- [自定义节点概述](references/自定义节点概述.md) - 概述自定义节点的能力和分类
- [自定义节点常见问题](references/自定义节点常见问题.md) - 汇总自定义节点的常见问题及解决方法
- [查询和操作自定义节点](references/查询和操作自定义节点.md) - 说明如何查询和操作自定义节点
- [设置自定义节点跨语言属性](references/设置自定义节点跨语言属性.md) - 说明如何设置自定义节点的跨语言属性
- [自定义占位节点](references/自定义占位节点.md) - 说明自定义占位节点的用法
- [自定义声明式节点 (BuilderNode)](references/自定义声明式节点 (BuilderNode).md) - 说明BuilderNode声明式节点的用法
- [自定义组件节点 (FrameNode)](references/自定义组件节点 (FrameNode).md) - 说明FrameNode组件节点的用法
- [构建渲染节点](references/构建渲染节点.md) - 说明如何构建渲染节点
- [自定义渲染节点 (RenderNode)](references/自定义渲染节点 (RenderNode).md) - 说明RenderNode渲染节点的用法
- [自定义渲染 (XComponent)](references/自定义渲染 (XComponent).md) - 说明XComponent自定义渲染的用法
- [命令式节点常见问题](references/命令式节点常见问题.md) - 汇总命令式节点的常见问题及解决方法

### 自定义样式与修改器

- [自定义绘制](references/自定义绘制.md) - 概述自定义绘制的能力
- [自定义绘制修改器 (DrawModifier)](references/自定义绘制修改器 (DrawModifier).md) - 说明DrawModifier绘制修改器的用法
- [属性修改器 (AttributeModifier)](references/属性修改器 (AttributeModifier).md) - 说明AttributeModifier属性修改器的用法
- [属性更新器 (AttributeUpdater)](references/属性更新器 (AttributeUpdater).md) - 说明AttributeUpdater属性更新器的用法
- [内容修改器 (ContentModifier)](references/内容修改器 (ContentModifier).md) - 说明ContentModifier内容修改器的用法
- [自定义属性动画](references/自定义属性动画.md) - 说明自定义属性动画的实现方法

### 动画

- [动画概述](references/动画概述.md) - 概述ArkUI动画系统的整体架构
- [动画](references/动画.md) - 说明动画功能的基本概念
- [动画动效](references/动画动效.md) - 说明动画动效的实现方法
- [动画曲线概述](references/动画曲线概述.md) - 概述动画曲线的分类和特点
- [传统曲线](references/传统曲线.md) - 说明传统动画曲线的用法
- [弹簧曲线](references/弹簧曲线.md) - 说明弹簧动画曲线的用法
- [动画衔接](references/动画衔接.md) - 说明动画衔接的实现方法
- [动画帧](references/动画帧.md) - 说明动画帧的概念和用法
- [属性动画概述](references/属性动画概述.md) - 概述属性动画的能力
- [属性样式动画](references/属性样式动画.md) - 说明属性样式动画的实现方法
- [实现属性动画](references/实现属性动画.md) - 说明如何实现属性动画效果
- [使用动画](references/使用动画.md) - 说明动画的使用方法
- [组件动画](references/组件动画.md) - 说明组件动画的实现方法
- [组件动画-1](references/组件动画-1.md) - 说明更多组件动画的实现方法
- [转场动画概述](references/转场动画概述.md) - 概述转场动画的能力和分类
- [出现_消失转场](references/出现_消失转场.md) - 说明出现和消失转场动画的实现方法
- [共享元素转场 (一镜到底)](references/共享元素转场 (一镜到底).md) - 说明共享元素转场（一镜到底）的实现方法
- [帧动画（ohos.animator）](references/帧动画（ohos.animator）.md) - 说明帧动画animator的用法
- [阴影](references/阴影.md) - 说明阴影效果的实现方法
- [模糊](references/模糊.md) - 说明模糊效果的实现方法
- [色彩](references/色彩.md) - 说明色彩系统的使用方法

### 手势与交互

- [交互基础机制说明](references/交互基础机制说明.md) - 说明交互的基础机制
- [交互响应概述](references/交互响应概述.md) - 概述交互响应的机制
- [绑定手势方法](references/绑定手势方法.md) - 说明绑定手势的方法
- [绑定手势事件](references/绑定手势事件.md) - 说明绑定手势事件的方法
- [单一手势](references/单一手势.md) - 说明单一手势的类型和用法
- [组合手势](references/组合手势.md) - 说明组合手势的实现方法
- [手势冲突处理](references/手势冲突处理.md) - 说明手势冲突的处理方法
- [手势事件](references/手势事件.md) - 说明手势事件的处理机制
- [多层级手势事件](references/多层级手势事件.md) - 说明多层级手势事件的处理方法
- [监听组件事件](references/监听组件事件.md) - 说明如何监听组件事件
- [监听输入框事件](references/监听输入框事件.md) - 说明如何监听输入框事件
- [监听组件布局和绘制送显事件](references/监听组件布局和绘制送显事件.md) - 说明如何监听组件布局和绘制送显事件
- [拖拽事件](references/拖拽事件.md) - 说明拖拽事件的处理方法
- [支持统一拖拽](references/支持统一拖拽.md) - 说明统一拖拽的实现方法
- [支持焦点处理](references/支持焦点处理.md) - 说明焦点处理的实现方法
- [动态属性设置常见问题](references/动态属性设置常见问题.md) - 汇总动态属性设置的常见问题及解决方法

### 输入事件

- [支持触屏输入事件](references/支持触屏输入事件.md) - 说明触屏输入事件的处理方法
- [支持鼠标输入事件](references/支持鼠标输入事件.md) - 说明鼠标输入事件的处理方法
- [支持键盘输入事件](references/支持键盘输入事件.md) - 说明键盘输入事件的处理方法
- [支持触控板输入事件](references/支持触控板输入事件.md) - 说明触控板输入事件的处理方法
- [支持表冠输入事件](references/支持表冠输入事件.md) - 说明表冠输入事件的处理方法
- [支持游戏手柄输入事件](references/支持游戏手柄输入事件.md) - 说明游戏手柄输入事件的处理方法
- [支持适老化](references/支持适老化.md) - 说明适老化支持的开发方法

### 窗口管理

- [窗口开发概述](references/窗口开发概述.md) - 概述窗口开发的功能和流程
- [窗口开发术语](references/窗口开发术语.md) - 解释窗口开发中的专业术语
- [窗口开发常见问题](references/窗口开发常见问题.md) - 汇总窗口开发的常见问题及解决方法
- [窗口旋转](references/窗口旋转.md) - 说明窗口旋转的处理方法
- [窗口元数据配置](references/窗口元数据配置.md) - 说明窗口元数据的配置方法
- [管理应用窗口（Stage模型）](references/管理应用窗口（Stage模型）.md) - 说明Stage模型下的应用窗口管理方法
- [管理应用窗口（FA模型）](references/管理应用窗口（FA模型）.md) - 说明FA模型下的应用窗口管理方法
- [开发应用沉浸式效果](references/开发应用沉浸式效果.md) - 说明应用沉浸式效果的开发方法
- [管理软键盘](references/管理软键盘.md) - 说明软键盘的管理方法

### 屏幕管理

- [屏幕管理简介](references/屏幕管理简介.md) - 介绍屏幕管理的基本概念
- [屏幕管理开发术语](references/屏幕管理开发术语.md) - 解释屏幕管理开发中的专业术语
- [屏幕开发常见问题](references/屏幕开发常见问题.md) - 汇总屏幕开发的常见问题及解决方法
- [使用Display实现屏幕属性查询及状态监听 (ArkTS)](references/使用Display实现屏幕属性查询及状态监听 (ArkTS).md) - 说明如何使用ArkTS Display接口实现屏幕属性查询及状态监听
- [使用OH_DisplayManager实现屏幕基础信息查询和状态监听 (C_C++)](references/使用OH_DisplayManager实现屏幕基础信息查询和状态监听 (C_C++).md) - 说明如何使用C/C++ OH_DisplayManager接口实现屏幕基础信息查询和状态监听

### 画中画

- [画中画开发概述](references/画中画开发概述.md) - 概述画中画开发的功能和流程
- [画中画常见问题](references/画中画常见问题.md) - 汇总画中画开发的常见问题及解决方法
- [使用XComponent实现画中画功能开发（ArkTS）](references/使用XComponent实现画中画功能开发（ArkTS）.md) - 说明如何使用ArkTS XComponent实现画中画功能
- [使用typeNode实现画中画功能开发（ArkTS）](references/使用typeNode实现画中画功能开发（ArkTS）.md) - 说明如何使用ArkTS typeNode实现画中画功能
- [使用NDK接口实现画中画功能开发（C_C++）](references/使用NDK接口实现画中画功能开发（C_C++）.md) - 说明如何使用C/C++ NDK接口实现画中画功能

### 智慧多窗

- [智慧多窗简介](references/智慧多窗简介.md) - 介绍智慧多窗的基本概念
- [应用声明支持智慧多窗](references/应用声明支持智慧多窗.md) - 说明应用如何声明支持智慧多窗
- [应用布局适配智慧多窗](references/应用布局适配智慧多窗.md) - 说明应用布局如何适配智慧多窗
- [顶部窗口控制条避让适配智慧多窗](references/顶部窗口控制条避让适配智慧多窗.md) - 说明如何进行顶部窗口控制条避让适配

### 应用主题与资源

- [设置应用内主题换肤](references/设置应用内主题换肤.md) - 说明应用内主题换肤的实现方法
- [应用深浅色适配](references/应用深浅色适配.md) - 说明应用深浅色适配的实现方法
- [资源限定与访问](references/资源限定与访问.md) - 说明资源限定与访问的方法

### 国际化与无障碍

- [UI国际化](references/UI国际化.md) - 说明UI国际化的开发方法
- [多语言支持](references/多语言支持.md) - 说明多语言支持的实现方法
- [无障碍开发指导](references/无障碍开发指导.md) - 指导无障碍功能的开发
- [通过自绘制接入无障碍](references/通过自绘制接入无障碍.md) - 说明如何通过自绘制方式接入无障碍

### 启动页

- [应用启动页简介](references/应用启动页简介.md) - 介绍应用启动页的基本概念
- [配置应用启动页](references/配置应用启动页.md) - 说明应用启动页的配置方法
- [启动页资源分类配置](references/启动页资源分类配置.md) - 说明启动页资源的分类配置方法

### 嵌入式组件

- [同应用进程嵌入式组件 (EmbeddedComponent)](references/同应用进程嵌入式组件 (EmbeddedComponent).md) - 说明同应用进程嵌入式组件EmbeddedComponent的用法
- [通过EmbeddedComponent拉起EmbeddedUIExtensionAbility](references/通过EmbeddedComponent拉起EmbeddedUIExtensionAbility.md) - 说明如何通过EmbeddedComponent拉起EmbeddedUIExtensionAbility
- [嵌入ArkTS组件](references/嵌入ArkTS组件.md) - 说明嵌入ArkTS组件的方法
- [接入ArkTS页面](references/接入ArkTS页面.md) - 说明接入ArkTS页面的方法

### 圆形屏幕组件

- [创建弧形轮播 (ArcSwiper)（圆形屏幕推荐使用）](references/创建弧形轮播 (ArcSwiper)（圆形屏幕推荐使用）.md) - 说明ArcSwiper弧形轮播的用法（圆形屏幕推荐使用）
- [弧形列表 (ArcList)（圆形屏幕推荐使用）](references/弧形列表 (ArcList)（圆形屏幕推荐使用）.md) - 说明ArcList弧形列表的用法（圆形屏幕推荐使用）
- [弧形按钮 (ArcButton)](references/弧形按钮 (ArcButton).md) - 说明ArcButton弧形按钮的用法

### 全局闪控球

- [全局闪控球开发指导](references/全局闪控球开发指导.md) - 指导全局闪控球的开发方法

### NDK开发

- [基于NDK构建UI概述](references/基于NDK构建UI概述.md) - 概述基于NDK构建UI的能力和流程
- [使用UI上下文接口操作界面（UIContext）](references/使用UI上下文接口操作界面（UIContext）.md) - 说明UIContext接口的操作界面方法
- [使用多线程NDK接口并行化构建UI页面](references/使用多线程NDK接口并行化构建UI页面.md) - 说明如何使用多线程NDK接口并行化构建UI页面
- [使用WindowManager管理多模输入事件（C_C++）](references/使用WindowManager管理多模输入事件（C_C++）.md) - 说明如何使用C/C++ WindowManager管理多模输入事件
- [在NDK中保证多实例场景功能正常](references/在NDK中保证多实例场景功能正常.md) - 说明如何在NDK中保证多实例场景功能正常

### 类Web开发范式

- [JS语法参考](references/JS语法参考.md) - 提供类Web开发范式的JS语法参考
- [HML语法参考](references/HML语法参考.md) - 提供类Web开发范式的HML语法参考
- [CSS语法参考](references/CSS语法参考.md) - 提供类Web开发范式的CSS语法参考
- [js标签配置](references/js标签配置.md) - 说明js标签的配置方法
- [app.js](references/app.js.md) - 说明app.js的配置方法
- [tabs开发指导](references/tabs开发指导.md) - 指导类Web开发范式中tabs组件的开发
- [swiper开发指导](references/swiper开发指导.md) - 指导类Web开发范式中swiper组件的开发
- [stepper开发指导](references/stepper开发指导.md) - 指导类Web开发范式中stepper组件的开发
- [list开发指导](references/list开发指导.md) - 指导类Web开发范式中list组件的开发
- [form开发指导](references/form开发指导.md) - 指导类Web开发范式中form组件的开发
- [dialog开发指导](references/dialog开发指导.md) - 指导类Web开发范式中dialog组件的开发
- [toolbar开发指导](references/toolbar开发指导.md) - 指导类Web开发范式中toolbar组件的开发
- [text开发指导](references/text开发指导.md) - 指导类Web开发范式中text组件的开发
- [switch开发指导](references/switch开发指导.md) - 指导类Web开发范式中switch组件的开发
- [slider开发指导](references/slider开发指导.md) - 指导类Web开发范式中slider组件的开发
- [search开发指导](references/search开发指导.md) - 指导类Web开发范式中search组件的开发
- [rating开发指导](references/rating开发指导.md) - 指导类Web开发范式中rating组件的开发
- [qrcode开发指导](references/qrcode开发指导.md) - 指导类Web开发范式中qrcode组件的开发
- [picker开发指导](references/picker开发指导.md) - 指导类Web开发范式中picker组件的开发
- [menu开发指导](references/menu开发指导.md) - 指导类Web开发范式中menu组件的开发
- [marquee开发指导](references/marquee开发指导.md) - 指导类Web开发范式中marquee组件的开发
- [input开发指导](references/input开发指导.md) - 指导类Web开发范式中input组件的开发
- [image开发指导](references/image开发指导.md) - 指导类Web开发范式中image组件的开发
- [image-animator开发指导](references/image-animator开发指导.md) - 指导类Web开发范式中image-animator组件的开发
- [chart开发指导](references/chart开发指导.md) - 指导类Web开发范式中chart组件的开发
- [button开发指导](references/button开发指导.md) - 指导类Web开发范式中button组件的开发
- [transform样式动画](references/transform样式动画.md) - 说明类Web开发范式中transform样式动画的用法
- [svg动画](references/svg动画.md) - 说明类Web开发范式中SVG动画的用法
- [background-position样式动画](references/background-position样式动画.md) - 说明类Web开发范式中background-position样式动画的用法

### 调试与性能优化

- [UI调优](references/UI调优.md) - 提供UI性能调优的指导
- [UI高性能开发](references/UI高性能开发.md) - 指导如何进行高性能UI开发
- [UI预览](references/UI预览.md) - 说明UI预览功能的使用方法
- [UI显示异常调试](references/UI显示异常调试.md) - 指导UI显示异常的调试方法
- [UI上下文异常调试](references/UI上下文异常调试.md) - 指导UI上下文异常的调试方法
- [UI并行化常见问题](references/UI并行化常见问题.md) - 汇总UI并行化的常见问题及解决方法
- [UI稳定性故障分析概述](references/UI稳定性故障分析概述.md) - 概述UI稳定性故障的分析方法
- [UI相关应用崩溃常见问题](references/UI相关应用崩溃常见问题.md) - 汇总UI相关应用崩溃的常见问题及解决方法
- [UI相关应用无响应常见问题](references/UI相关应用无响应常见问题.md) - 汇总UI相关应用无响应的常见问题及解决方法

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `333` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **!!语法：双向绑定** — 在状态管理V1中，推荐使用 $$ 实现系统组件的双向绑定。 在状态管理V2中，推荐使用!!语法糖统一处理双向绑定。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/10/v3/eKhQuzvKRRiz95b_vgcWYQ/note_3.0-… [`references/!!语法：双向绑定.md`](<references/!!语法：双向绑定.md>)
- **$$语法：系统组件双向同步** — $$运算符为系统组件提供TS变量的引用，使得TS变量和系统组件的内部状态保持同步。 内部状态的具体含义取决于组件。例如， TextInput 组件的text参数。 #### 使用规则 - 当前$$支持基础类型变量，当该变量使用 @State 、 @Link 、 @Prop 、 @Provide 等状态管理V1装饰器装饰，或者 @Local 等状态管理V2装饰… [`references/$$语法：系统组件双向同步.md`](<references/$$语法：系统组件双向同步.md>)
- **@AnimatableExtend装饰器：定义可动画属性** — @AnimatableExtend装饰器用于自定义可动画的属性方法，在这个属性方法中修改组件不可动画的属性。在动画执行过程中，通过逐帧回调函数修改不可动画属性值，让不可动画属性也能实现动画效果。也可通过逐帧回调函数修改可动画属性的值，实现逐帧布局的效果。 - 可动画属性：如果一个属性方法在 animation 属性前调用，改变这个属性的值可以使animati… [`references/@AnimatableExtend装饰器：定义可动画属性.md`](<references/@AnimatableExtend装饰器：定义可动画属性.md>)
- **@BuilderParam装饰器：引用@Builder函数** — 当开发者创建 自定义组件 并需要为其添加特定功能（例如 页面跳转 功能）时，如果直接在组件内嵌入事件方法，会导致所有该自定义组件的实例都增加此功能。为了解决此问题，ArkUI引入了@BuilderParam装饰器。@BuilderParam用于装饰指向@Builder方法的变量，开发者可以在初始化自定义组件时，使用不同的方式（如参数修改、尾随闭包、借用箭头函… [`references/@BuilderParam装饰器：引用@Builder函数.md`](<references/@BuilderParam装饰器：引用@Builder函数.md>)
- **@Builder装饰器：自定义构建函数** — ArkUI提供轻量的UI元素复用机制@Builder，其内部UI结构固定，仅与使用方进行数据传递。开发者可将重复使用的UI元素抽象成函数，在build函数中调用。 @Builder装饰的函数也称为“自定义构建函数”。 在阅读本文档前，建议提前阅读： 基本语法概述 、 声明式UI描述 、 自定义组件-创建自定义组件 。 @Builder装饰器和 @Compon… [`references/@Builder装饰器：自定义构建函数.md`](<references/@Builder装饰器：自定义构建函数.md>)
- **@Computed装饰器：计算属性** — 当开发者使用相同的计算逻辑重复绑定在UI上时，为了防止重复计算，可以使用@Computed计算属性。计算属性中依赖的状态变量变化时，只会计算一次。这解决了UI多次重用该属性导致的重复计算和性能问题。如下面例子。 @Computed get sum() { return this.count1 + this.count2 + this.count3; } Te… [`references/@Computed装饰器：计算属性.md`](<references/@Computed装饰器：计算属性.md>)
- **@Env：环境变量** — 在多设备开发的场景中，开发者可以使用 @Env 装饰器监听系统环境变量的改变，并根据系统环境变量来进行相应的场景判断，以减少不同设备间的适配逻辑和重复开发。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/ZeyAvz-hTQe… [`references/@Env：环境变量.md`](<references/@Env：环境变量.md>)
- **@Event装饰器：规范组件输出** — 为了实现子组件向父组件要求更新@Param装饰变量的能力，开发者可以使用@Event装饰器。使用@Event装饰回调方法是一种规范，表明子组件需要传入更新数据源的回调。 @Event主要配合@Param实现数据的双向同步。在阅读本文档前，建议提前阅读： @Param 。 ![](https://contentcenter-vali-drcn.dbankcdn… [`references/@Event装饰器：规范组件输出.md`](<references/@Event装饰器：规范组件输出.md>)
- **@Extend装饰器：定义扩展组件样式** — 在前文的示例中，可以使用 @Styles 用于样式的重用，在@Styles的基础上，我们提供了@Extend，用于扩展组件样式。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/G01elUXLTainNYajGHEfKQ/no… [`references/@Extend装饰器：定义扩展组件样式.md`](<references/@Extend装饰器：定义扩展组件样式.md>)
- **@Link装饰器：父子双向同步** — 子组件中被@Link装饰的变量与其父组件中对应的数据源建立双向数据绑定。 在阅读@Link文档前，建议先熟悉 @State 的基本用法。最佳实践请参考 状态管理最佳实践 。常见问题请参考 状态管理常见问题 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_sce… [`references/@Link装饰器：父子双向同步.md`](<references/@Link装饰器：父子双向同步.md>)
- **@LocalBuilder装饰器： 维持组件关系** — 当开发者使用局部@Builder进行引用数据传递时，需要考虑组件的父子关系。然而在使用.bind(this)的方式更改函数调用上下文后，会出现组件的父子关系与状态管理的父子关系不一致的问题。为了解决这一问题，引入@LocalBuilder装饰器。@LocalBuilder拥有和局部@Builder相同的功能，且比局部@Builder能够更好的确定组件的父子关… [`references/@LocalBuilder装饰器： 维持组件关系.md`](<references/@LocalBuilder装饰器： 维持组件关系.md>)
- **@Local装饰器：组件内部状态** — 为了实现对@ComponentV2装饰的自定义组件中变量变化的观测，开发者可以使用@Local装饰器装饰变量。 在阅读本文档前，建议提前阅读： @ComponentV2 。常见问题请参考 组件内状态变量常见问题 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_… [`references/@Local装饰器：组件内部状态.md`](<references/@Local装饰器：组件内部状态.md>)
- **@Monitor装饰器：状态变量修改异步监听** — 为了增强状态管理框架对状态变量变化的监听能力，开发者可以使用@Monitor装饰器对状态变量进行监听。 @Monitor提供了对V2状态变量的监听。在阅读本文档前，建议提前阅读： @ComponentV2 ， @ObservedV2和@Trace ， @Local 。 ![](https://contentcenter-vali-drcn.dbankcdn.… [`references/@Monitor装饰器：状态变量修改异步监听.md`](<references/@Monitor装饰器：状态变量修改异步监听.md>)
- **@ObservedV2装饰器和@Trace装饰器：类属性变化观测** — 为了增强状态管理框架对类对象中属性的观测能力，开发者可以使用@ObservedV2装饰器和@Trace装饰器装饰类以及类中的属性。 @ObservedV2和@Trace提供了对嵌套类对象属性变化直接观测的能力，是状态管理V2中相对核心的能力之一。在阅读本文档前，建议提前阅读： 状态管理概述 来了解状态管理V2整体的能力架构。 ![](https://cont… [`references/@ObservedV2装饰器和@Trace装饰器：类属性变化观测.md`](<references/@ObservedV2装饰器和@Trace装饰器：类属性变化观测.md>)
- **@Observed装饰器和@ObjectLink装饰器：嵌套类对象属性变化** — 上文所述的装饰器（包括 @State 、 @Prop 、 @Link 、 @Provide和@Consume 装饰器）仅能观察到第一层的变化，但是在实际应用开发中，应用会根据开发需要，封装自己的数据模型。对于多层嵌套的情况，比如二维数组、对象数组、嵌套类场景，无法观察到第二层的属性变化。因此，为了实现对嵌套数据结构中深层属性变化的观察，引入了@Observe… [`references/@Observed装饰器和@ObjectLink装饰器：嵌套类对象属性变化.md`](<references/@Observed装饰器和@ObjectLink装饰器：嵌套类对象属性变化.md>)
- **@Once：初始化同步一次** — 想要实现仅从外部初始化一次且不接受后续同步变化的能力，可以使用@Once装饰器搭配@Param装饰器。 阅读本文档前，请先阅读 @Param 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/W-QBoqbUSamZJn93S… [`references/@Once：初始化同步一次.md`](<references/@Once：初始化同步一次.md>)
- **@Param：组件外部输入** — 为了增强子组件接受外部参数输入的能力，开发者可以使用@Param装饰器。 @Param不仅可以接受组件外部输入，还可以接受@Local的同步变化。在阅读本文档前，建议提前阅读： @Local 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_… [`references/@Param：组件外部输入.md`](<references/@Param：组件外部输入.md>)
- **@Prop装饰器：父子单向同步** — @Prop装饰的变量可以和父组件建立单向同步关系。 在阅读@Prop文档前，建议开发者首先了解 @State 的基本用法。最佳实践请参考 状态管理最佳实践 。常见问题请参考 状态管理常见问题 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_… [`references/@Prop装饰器：父子单向同步.md`](<references/@Prop装饰器：父子单向同步.md>)
- **@Provider装饰器和@Consumer装饰器：跨组件层级双向同步** — @Provider和@Consumer用于跨组件层级数据双向同步，可以使得开发者不用拘泥于组件层级。 @Provider和@Consumer属于状态管理V2装饰器，所以只能在@ComponentV2中才能使用，在@Component中使用会编译报错。 @Provider和@Consumer提供了跨组件层级数据双向同步的能力。在阅读本文档前，建议提前阅读： @… [`references/@Provider装饰器和@Consumer装饰器：跨组件层级双向同步.md`](<references/@Provider装饰器和@Consumer装饰器：跨组件层级双向同步.md>)
- **@Provide装饰器和@Consume装饰器：与后代组件双向同步** — @Provide和@Consume，应用于与后代组件的双向数据同步、状态数据在多个层级之间传递的场景。不同于上文提到的父子组件之间通过命名参数机制传递，@Provide和@Consume摆脱参数传递机制的束缚，实现跨层级传递。 其中@Provide装饰的变量是在祖先组件中，可以理解为被“提供”给后代的状态变量。@Consume装饰的变量是在后代组件中，去“消… [`references/@Provide装饰器和@Consume装饰器：与后代组件双向同步.md`](<references/@Provide装饰器和@Consume装饰器：与后代组件双向同步.md>)
- **@Require装饰器：校验构造传参** — @Require是校验@Prop、@State、@Provide、@BuilderParam、@Param和普通变量（无状态装饰器修饰的变量）是否需要构造传参的一个装饰器。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/dHy… [`references/@Require装饰器：校验构造传参.md`](<references/@Require装饰器：校验构造传参.md>)
- **@ReusableV2装饰器：V2组件复用** — 为了降低反复创建销毁自定义组件带来的性能开销，开发者可以使用@ReusableV2装饰 @ComponentV2 装饰的自定义组件，达成组件复用的效果。 在阅读本文前，建议提前阅读： @Reusable装饰器：V1组件复用 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAll… [`references/@ReusableV2装饰器：V2组件复用.md`](<references/@ReusableV2装饰器：V2组件复用.md>)
- **@Reusable装饰器：V1组件复用** — @Reusable装饰的自定义组件支持组件复用。当自定义组件从组件树上移除时，会被存入缓存池，后续在创建相同类型的组件节点时，将优先复用缓存池中的组件对象，从而避免重复创建和销毁，提升性能。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/… [`references/@Reusable装饰器：V1组件复用.md`](<references/@Reusable装饰器：V1组件复用.md>)
- **@State装饰器：组件内状态** — 被状态变量装饰器装饰的变量称为状态变量，使普通变量具备状态属性。当状态变量改变时，会触发其直接绑定的UI组件渲染更新。 在状态变量相关装饰器中，@State是最基础的装饰器，也是大部分状态变量的数据源。 在阅读@State文档前，建议开发者对状态管理框架有基本的了解。建议提前阅读： 状态管理概述 。最佳实践请参考 状态管理最佳实践 。常见问题请参考 状态管理… [`references/@State装饰器：组件内状态.md`](<references/@State装饰器：组件内状态.md>)
- **@Styles装饰器：定义组件重用样式** — 如果每个组件的样式都需要单独设置，在开发过程中会出现大量代码在进行重复样式设置，虽然可以复制粘贴，但为了代码简洁性和后续方便维护，我们推出了可以提炼公共样式进行复用的装饰器@Styles。 @Styles装饰器可以将多条样式设置提炼成一个方法，直接在组件声明的位置调用。通过@Styles装饰器可以快速定义并复用自定义样式。 ![](https://conte… [`references/@Styles装饰器：定义组件重用样式.md`](<references/@Styles装饰器：定义组件重用样式.md>)
- **@SyncMonitor装饰器：状态变量修改同步监听** — 为了增强状态管理框架对状态变量变化的监听能力，开发者可以使用@SyncMonitor装饰器对状态变量进行监听。 @SyncMonitor提供了对V2状态变量的同步监听。在阅读本文档前，建议提前阅读： @ComponentV2 ， @ObservedV2和@Trace ， @Local ， @Monitor 。 ![](https://contentcente… [`references/@SyncMonitor装饰器：状态变量修改同步监听.md`](<references/@SyncMonitor装饰器：状态变量修改同步监听.md>)
- **@Track装饰器：class对象属性级更新** — @Track应用于class对象的属性级更新。@Track装饰的属性变化时，只会触发该属性关联的UI更新。 在阅读本文档之前，建议开发者对状态管理基本观察能力有基本的了解。建议提前阅读： @State 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene… [`references/@Track装饰器：class对象属性级更新.md`](<references/@Track装饰器：class对象属性级更新.md>)
- **@Type装饰器：标记类属性的类型** — 为了实现序列化类时不丢失属性的复杂类型，开发者可以使用@Type装饰器装饰类属性。 @Type的目的是标记类属性，配合PersistenceV2使用，防止序列化时类丢失。在阅读本文档前，建议提前阅读： PersistenceV2 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/Developer… [`references/@Type装饰器：标记类属性的类型.md`](<references/@Type装饰器：标记类属性的类型.md>)
- **@Watch装饰器：状态变量更改通知** — @Watch应用于对状态变量的监听。如果开发者需要关注某个状态变量的值是否改变，可以使用@Watch为状态变量设置回调函数。 @Watch提供了状态变量的监听能力，@Watch仅能监听到可以观察到的变化。 在阅读本文档前，建议开发者对状态管理基本观察能力有基本的了解。建议提前阅读： @State 。 ![](https://contentcenter-val… [`references/@Watch装饰器：状态变量更改通知.md`](<references/@Watch装饰器：状态变量更改通知.md>)
- **AnimateTo使用迁移** — 在状态管理从V1迁移至V2的过程中， animateTo 执行动画前如需修改状态变量，可参考本文档的适配方案。 #### 执行动画前重新定义初始态场景 **V1实现代码如下：** @Entry @Component struct Index { @State w: number = 50; // 宽度 @State h: number = 50; // 高度… [`references/AnimateTo使用迁移.md`](<references/AnimateTo使用迁移.md>)
- **AppStorageV2: 应用全局UI状态存储** — 为了增强状态管理框架对应用全局UI状态变量的共享能力，开发者可以使用AppStorageV2存储应用全局UI的状态变量数据。 AppStorageV2提供应用级全局共享状态变量的能力，开发者可以通过connect绑定同一个key，进行跨ability的数据共享。 在阅读本文档前，建议提前阅读： @ComponentV2 ， @ObservedV2和@Trac… [`references/AppStorageV2_ 应用全局UI状态存储.md`](<references/AppStorageV2_ 应用全局UI状态存储.md>)
- **AppStorage：应用全局的UI状态存储** — 在阅读本文档前，建议提前阅读： 状态管理概述 ，从而对状态管理框架中AppStorage的定位有一个宏观了解。 AppStorage是与应用进程绑定的全局UI状态存储中心，由UI框架在应用启动时创建，将UI状态数据存储于运行内存，实现应用级全局状态共享。 作为应用的“中枢”，AppStorage是 持久化数据PersistentStorage 和 环境变量E… [`references/AppStorage：应用全局的UI状态存储.md`](<references/AppStorage：应用全局的UI状态存储.md>)
- **ArkUI术语** — 以组件左上角为坐标原点的坐标系，其中向右为x正轴，向下为y正轴。如果为三维坐标系，则由屏幕向外为z正轴。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1c/v3/jvo5YH_DSU-FJWs81JmP4A/zh-cn_image_00… [`references/ArkUI术语.md`](<references/ArkUI术语.md>)
- **ArkUI简介** — ArkUI（方舟UI框架）为应用的UI开发提供了完整的基础设施，包括简洁的UI语法、丰富的UI功能（组件、布局、动画以及交互事件），以及实时界面预览工具等，可以支持开发者进行可视化界面开发。 #### 基本概念 - **UI：** 即用户界面。开发者可以将应用的用户界面设计为多个功能页面 NavDestination ，页面通过栈结构管理，并通过导航容器 N… [`references/ArkUI简介.md`](<references/ArkUI简介.md>)
- **CSS语法参考** — CSS是描述 HML 页面结构的样式语言。所有组件均存在系统默认样式，也可在页面CSS样式文件中对组件、页面自定义不同的样式。请参考 通用样式 了解兼容JS的类Web开发范式支持的组件样式。 #### 尺寸单位 - 逻辑像素px（文档中以<length>表示）： - 默认屏幕具有的逻辑宽度为720px（配置见js标签配置中的window小节），实际显示时会将… [`references/CSS语法参考.md`](<references/CSS语法参考.md>)
- **CanvasRenderingContext2D对象** — 使用CanvasRenderingContext2D在Canvas画布组件上进行绘制，绘制对象可以是图形、文本、线段、图片等。具体请参考 CanvasRenderingContext2D对象 。 #### 画线段 使用moveTo和lineTo画出一条线段，当使用closePath方法时会结束当前路径形成一个封闭图形。设置quadraticCurveTo（二… [`references/CanvasRenderingContext2D对象.md`](<references/CanvasRenderingContext2D对象.md>)
- **Canvas对象** — Canvas组件提供画布，用于自定义绘制图形。具体用法请参考 CanvasRenderingContext2D对象 。 #### 创建Canvas组件 在pages/index目录下的hml文件中创建一个Canvas组件。 <!-- xxx.hml --> <div class="container"> <canvas></canvas> </div> /*… [`references/Canvas对象.md`](<references/Canvas对象.md>)
- **ContentSlot：混合开发** — 用于渲染并管理Native层使用C-API创建的组件。 支持 混合模式 开发。当容器为ArkTS组件，且子组件在Native侧创建时，推荐使用ContentSlot占位组件。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/ls… [`references/ContentSlot：混合开发.md`](<references/ContentSlot：混合开发.md>)
- **Environment：设备环境查询** — 如果开发者需要获取应用程序运行设备的环境参数（如多语言、深浅色模式等）以进行不同的场景判断，可以使用Environment设备环境查询。 Environment是ArkUI框架在应用程序启动时创建的单例对象，为 AppStorage 提供应用程序运行状态的属性。所有属性都是不可变的简单类型。 Environment提供了读取系统环境变量并将其值写入AppSt… [`references/Environment：设备环境查询.md`](<references/Environment：设备环境查询.md>)
- **ForEach：循环渲染** — ForEach接口基于数组循环渲染，需要与容器组件配合使用，且接口返回的组件应当是允许包含在ForEach父容器组件中的子组件。例如，ListItem组件要求ForEach的父容器组件必须为 List组件 。 API参数说明见： ForEach API参数说明 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn… [`references/ForEach：循环渲染.md`](<references/ForEach：循环渲染.md>)
- **HML语法参考** — HML是一套类HTML的标记语言，通过组件，事件构建出页面的内容。页面具备数据绑定、事件绑定、列表渲染、条件渲染和逻辑控制等高级能力。 #### 页面结构 <!-- xxx.hml --> <div class="item-container"> <text class="item-title">Image Show</text> <div class="i… [`references/HML语法参考.md`](<references/HML语法参考.md>)
- **JS语法参考** — JS文件用来定义HML页面的业务逻辑，支持ECMA规范的JavaScript语言。基于JavaScript语言的动态化能力，可以使应用更加富有表现力，具备更加灵活的设计能力。下面讲述JS文件的编译和运行的支持情况。 #### 语法 支持ES6语法。 - 模块声明 使用import方法引入功能模块： import router from '@ohos.rout… [`references/JS语法参考.md`](<references/JS语法参考.md>)
- **LazyForEach：数据懒加载** — 从API version 7开始，LazyForEach为开发者提供了基于数据源渲染出一系列子组件的能力。具体而言，LazyForEach从数据源中按需迭代数据，并在每次迭代时创建相应组件。当LazyForEach用于滚动容器时，框架会根据滚动容器可视区域按需创建组件，当组件滑出可视区域外时，框架会销毁并回收组件以降低内存占用。 本文档依次介绍了LazyFo… [`references/LazyForEach：数据懒加载.md`](<references/LazyForEach：数据懒加载.md>)
- **LocalStorage：页面级UI状态存储** — LocalStorage是页面级的UI状态存储，通过@Entry装饰器接收的参数可以在页面内共享同一个LocalStorage实例。LocalStorage支持UIAbility实例内多个页面间状态共享。 本文仅介绍LocalStorage使用场景和相关的装饰器：@LocalStorageProp和@LocalStorageLink。 在阅读本文档前，需要开… [`references/LocalStorage：页面级UI状态存储.md`](<references/LocalStorage：页面级UI状态存储.md>)
- **MVVM模式（V1）** — 当开发者掌握了状态管理的基本概念后，通常会尝试开发自己的应用，在应用开发初期，如果未能精心规划项目结构，随着项目扩展和复杂化，状态变量的增多将导致组件间关系变得错综复杂。此时，开发新功能可能引起连锁反应，维护成本也会增加。为此，本文旨在介绍MVVM模式以及ArkUI的UI开发模式与MVVM的关系，指导开发者如何设计项目结构，以便在产品迭代和升级时能更轻松地开… [`references/MVVM模式（V1）.md`](<references/MVVM模式（V1）.md>)
- **MVVM模式（V2）** — 在应用开发中，UI的更新需要随着数据状态的变化进行实时同步，而这种同步往往决定了应用程序的性能和用户体验。为了解决数据与UI同步的复杂性，ArkUI采用了Model-View-ViewModel（MVVM）架构模式。MVVM将应用分为Model、View和ViewModel三个核心部分，实现数据、视图与逻辑的分离。通过这种模式，UI可以随着状态的变化自动更新… [`references/MVVM模式（V2）.md`](<references/MVVM模式（V2）.md>)
- **Navigation分栏开发** — Navigation 作为一个容器组件，提供了两种布局样式：单栏布局、分栏布局。分栏布局一般适用于宽屏设备，在分栏布局下，导航栏（navBar）会固定显示， 子页面（NavDestination）通过导航控制器（NavPathStack）切换显示， 在导航栏和子页面之间有一条分割线， 可以通过分割线拖拽控制左右显示的比例。架构图详见 Navigation基础… [`references/Navigation分栏开发.md`](<references/Navigation分栏开发.md>)
- **Navigation动画常见问题** — **问题现象** 使用 NavDestinationMode.DIALOG 默认转场动画，出现如下2个问题： - 将蒙层背景色设置在页面上：pop页面的时候蒙层没有马上消失，而是等内容下滑退出后才消失。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_… [`references/Navigation动画常见问题.md`](<references/Navigation动画常见问题.md>)
- **Navigation基础架构介绍** — 导航组件（ Navigation ）主要用于实现 NavDestination 页面间的跳转，支持在不同NavDestination间传递参数，提供灵活的跳转栈操作，从而更便捷地实现对不同页面的访问和复用。 #### Navigation整体架构 Navigation组件结构较为复杂，包含几个关键概念： - Navigation：导航根视图容器，所有的导航页… [`references/Navigation基础架构介绍.md`](<references/Navigation基础架构介绍.md>)
- **Navigation子页面** — NavDestination 是Navigation子页面的根容器，用于承载子页面的特殊属性和生命周期。NavDestination可以配置独立的标题栏、菜单栏与工具栏等属性，使用方法与Navigation一致。NavDestination还支持通过mode属性设置不同的显示模式，以适应不同页面的需求。 #### 页面显示类型 NavDestination提… [`references/Navigation子页面.md`](<references/Navigation子页面.md>)
- **Navigation跨包路由** — Navigation提供 系统路由表 和 自定义路由表 两种实现方式，通过路由表的配置可以完成本包和跨包的页面跳转。 支持自定义路由表和系统路由表混用。 #### 路由表能力对比 不同路由方式适用于不同需求，易用性或可扩展性需根据项目特点权衡选择。 #### 系统路由表 系统路由表是动态路由的一种实现方式。从API version 12开始，Navigati… [`references/Navigation跨包路由.md`](<references/Navigation跨包路由.md>)
- **Navigation转场动画** — Navigation 存在默认转场动画，此外也提供了自定义转场和共享元素转场能力。 #### 系统默认转场 系统提供了多种默认转场类型，可以通过 NavDestination.systemTransition 接口实现，具体示例请参考 设置指定的NavDestination系统转场 。 ![](https://contentcenter-vali-drcn.… [`references/Navigation转场动画.md`](<references/Navigation转场动画.md>)
- **Navigation页面路由** — Navigation 路由相关操作均基于导航控制器 NavPathStack 提供的方法实现，每个Navigation都需要创建并传入一个NavPathStack对象，用于管理页面。NavPathStack主要提供了页面跳转、页面返回、页面替换、页面删除、参数获取、路由拦截等功能。 在API version 9，Navigation需要配合 NavRoute… [`references/Navigation页面路由.md`](<references/Navigation页面路由.md>)
- **OffscreenCanvasRenderingContext2D对象** — 使用OffscreenCanvas在离屏Canvas画布组件上进行绘制，绘制对象可以是矩形、文本、图片等。 离屏，即GPU在当前缓冲区以外新开辟的一个缓冲区。具体请参考 OffscreenCanvasRenderingContext2D对象 。 以下示例创建了一个OffscreenCanvas画布，再在画布上创建一个getContext2d对象，并设置fil… [`references/OffscreenCanvasRenderingContext2D对象.md`](<references/OffscreenCanvasRenderingContext2D对象.md>)
- **Path2D对象** — 路径对象，支持通过对象的接口进行路径的描述，并通过Canvas的 stroke 接口进行绘制。具体请参考 Path2D对象 。 #### 画线段 创建Path2D对象，使用多条线段组合图形。 <!-- xxx.hml --> <div class="container"> <canvas ref="canvas"></canvas> </div> /* xx… [`references/Path2D对象.md`](<references/Path2D对象.md>)
- **PersistenceV2: 持久化存储UI状态** — 为了增强状态管理框架对持久化存储UI的能力，开发者可以使用PersistenceV2存储持久化的数据。 PersistenceV2是应用程序中的可选单例对象。此对象的作用是持久化存储UI相关的数据，以确保这些属性在应用程序重新启动时的值与应用程序关闭时的值相同。 PersistenceV2提供状态变量持久化能力，开发者可以通过connect或者globalC… [`references/PersistenceV2_ 持久化存储UI状态.md`](<references/PersistenceV2_ 持久化存储UI状态.md>)
- **PersistentStorage：持久化存储UI状态** — PersistentStorage是应用程序中的可选单例对象。此对象的作用是持久化存储选定的AppStorage属性，以确保这些属性在应用程序重新启动时的值与应用程序关闭时的值相同。 PersistentStorage提供状态变量持久化的能力，但是需要注意，其持久化和读回UI的能力都需要依赖AppStorage。在阅读本文档前，建议提前阅读： AppStor… [`references/PersistentStorage：持久化存储UI状态.md`](<references/PersistentStorage：持久化存储UI状态.md>)
- **Repeat：可复用的循环渲染** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d2/v3/TjqPCb_HTR2xW97Q3bq71Q/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110844Z&HW-CC-Ex… [`references/Repeat：可复用的循环渲染.md`](<references/Repeat：可复用的循环渲染.md>)
- **Router切换Navigation** — 鉴于组件导航（ Navigation ）支持更丰富的动效、一次开发多端部署能力和更灵活的栈操作。本文主要从页面跳转、动效和生命周期等方面介绍如何从Router切换到Navigation。 #### 页面结构 Router路由的页面是一个@Entry修饰的Component，每一个页面都需要在main_page.json中声明。 // main_page.js… [`references/Router切换Navigation.md`](<references/Router切换Navigation.md>)
- **Text组件的文本绘制与显示** — 部分框架或应用具备自研的文字排版能力，在移植时，这些能力会被对接到 方舟2D图形服务的文本引擎 。为了避免开发者重复开发文本组件，Text组件提供了接口 NODE_TEXT_CONTENT_WITH_STYLED_STRING ，可以直接渲染方舟文本引擎生成的文本。 以下场景基于 接入ArkTS页面章节 ，阐述了如何创建字体引擎文本，并利用 Text组件 进… [`references/Text组件的文本绘制与显示.md`](<references/Text组件的文本绘制与显示.md>)
- **UI上下文异常调试** — 本指导主要介绍如何解决因使用无效的 UIContext 导致文本显示异常的问题。当开发者使用了已失效的UIContext对象（通常是因为对应的UI实例已被销毁），可能导致后续UI操作无效。此类问题常见于多窗口场景。从API version 12开始，该问题也见于调用 setSupportedProcessCache 打开进程缓存后快速启动的情形。 #### … [`references/UI上下文异常调试.md`](<references/UI上下文异常调试.md>)
- **UI国际化** — 本文介绍如何实现应用程序UI界面的国际化，包含资源配置和镜像布局，关于应用适配国际化的详细参考，请参考 Localization Kit（本地化开发服务） 。 #### 利用资源限定词配置国际化资源 在开发阶段，通过DevEco Studio，可以为应用在对应语言和地区的资源限定词目录下配置不同的资源，来实现UI国际化。详细介绍请参考 资源分类与访问 。 #… [`references/UI国际化.md`](<references/UI国际化.md>)
- **UI并行化常见问题** — 从API version 22开始， ArkUI_NativeAPIVariantKind 中新增ARKUI_MULTI_THREAD_NATIVE_NODE枚举。 调用 OH_ArkUI_GetModuleInterface 接口，入参传入ARKUI_MULTI_THREAD_NATIVE_NODE，可以获取多线程NDK接口集合，完整示例请参考 多线程ND… [`references/UI并行化常见问题.md`](<references/UI并行化常见问题.md>)
- **UI开发 (兼容JS的类Web开发范式)概述** — 兼容JS的类Web开发范式的方舟开发框架，采用经典的 兼容JS的类Web开发范式API 、CSS、JavaScript三段式开发方式。使用HML标签文件进行布局搭建，使用CSS文件进行样式描述，使用JavaScript文件进行逻辑处理。UI组件与数据之间通过单向数据绑定的方式建立关联，当数据发生变化时，UI界面自动触发更新。此种开发方式更接近Web前端开发者… [`references/UI开发 (兼容JS的类Web开发范式)概述.md`](<references/UI开发 (兼容JS的类Web开发范式)概述.md>)
- **UI开发（ArkTS声明式开发范式）概述** — 基于ArkTS的声明式开发范式的方舟开发框架是一套开发极简、高性能、支持跨设备的UI开发框架，提供了构建应用UI所必需的能力，主要包括： - **ArkTS** ArkTS是优选的主力应用开发语言，围绕应用开发在 TypeScript （简称TS）生态基础上做了进一步扩展。扩展能力包含声明式UI描述、自定义组件、动态扩展UI元素、状态管理和渲染控制。状态管理… [`references/UI开发（ArkTS声明式开发范式）概述.md`](<references/UI开发（ArkTS声明式开发范式）概述.md>)
- **UI显示异常调试** — 本章节主要介绍UI显示异常问题的调试方法，并结合案例讲解具体的解决步骤。 #### 定位UI显示异常问题 UI显示异常问题主要是通过分析UI布局信息来定位。当前分析UI布局主要通过getInspectorTree接口获取组件树信息，或者通过getRectangleById接口获取单个节点的信息。 **组件树** 从API version 9开始，可以使用 g… [`references/UI显示异常调试.md`](<references/UI显示异常调试.md>)
- **UI相关应用崩溃常见问题** — 本文档收集整理了一些常见的会导致应用崩溃的ArkUI API错误用法，旨在帮助开发者了解这些会导致应用崩溃问题的错误用法，从而避免在实际应用开发过程中犯类似错误。 #### OH_NativeXComponent注册的回调函数对象被提前释放 **问题现象** 应用闪退并生成如下cppcrash崩溃栈： Reason:Signal:SIGSEGV(SEGV_A… [`references/UI相关应用崩溃常见问题.md`](<references/UI相关应用崩溃常见问题.md>)
- **UI相关应用无响应常见问题** — 本文档收集整理了一些常见的会导致应用无响应的ArkUI API错误用法，旨在帮助开发者了解这些错误用法，从而避免在实际应用开发过程中犯类似错误。 #### 网络图片使用syncLoad同步下载 **问题现象** 应用无响应，系统生成相应的AppFreeze问题日志，日志中有如下主线程调用栈： #00 pc 00000000001b5904 /system/l… [`references/UI相关应用无响应常见问题.md`](<references/UI相关应用无响应常见问题.md>)
- **UI稳定性故障分析概述** — 本文档将简单介绍稳定性故障的概念与分类，并提供各类稳定性问题的参考帮助，用于指导应用开发者充分利用系统提供的调试能力和工具定位各类稳定性问题。 应用稳定性问题主要包括应用崩溃、应用无响应、应用资源泄漏等问题。性能问题不属于稳定性范畴，要了解性能相关内容可以参考 UI性能优化概览 。 #### 应用崩溃 应用崩溃有时也被称为应用闪退，指应用在运行过程中意外终止… [`references/UI稳定性故障分析概述.md`](<references/UI稳定性故障分析概述.md>)
- **UI装饰器总览** — 在声明式UI开发范式中，UI是程序状态的运行结果，状态的变化会驱动UI的刷新。ArkUI提供了一套装饰器机制，使开发者能够便捷地定义和管理状态变量，实现数据与UI的联动。 ArkUI包含的V2状态管理装饰器列表如下： ArkUI包含的V1状态管理装饰器列表如下： ArkUI包含的通用UI装饰器列表如下： [`references/UI装饰器总览.md`](<references/UI装饰器总览.md>)
- **UI调优** — 本章节主要介绍UI的dump和调优能力，用于提高开发效率和优化开发者体验。 #### 状态管理hidumper、调试与调优 为提升开发者定位状态管理问题的效率，UI提供针对状态变量的hidumper、调试与调优功能，将状态变量的黑盒信息暴露给开发者，帮助开发者深入了解状态变量和UI组件的变化过程，提升开发高性能应用的效率。 #### 状态管理hidumper… [`references/UI调优.md`](<references/UI调优.md>)
- **UI预览** — DevEco Studio为开发者提供了UI预览功能，方便查看UI效果并随时调整页面布局。预览支持页面预览和组件预览。图1中左侧图标 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/fiWdnkpIQrS-iKY_LY4J-Q/… [`references/UI预览.md`](<references/UI预览.md>)
- **UI高性能开发** — 优化应用的性能对于提升用户体验至关重要。当发现性能问题后，一般可按照以下步骤进行分析： 1. 复现问题：根据用户的反馈复现性能问题是分析的第一步，开发者可通过回访用户或在应用中增加自己的性能监测埋点来获得性能问题的发生场景和复现步骤。 2. 利用工具找到性能瓶颈点：问题复现后可使用DevEco Studio中提供的CPU Profiler工具获取问题发生过程… [`references/UI高性能开发.md`](<references/UI高性能开发.md>)
- **V1-V2迁移概述** — 在状态管理框架的迭代演进中，先后推出了 状态管理V1 （简称V1）和 状态管理V2 （简称V2）。V1侧重于组件层级的状态管理，例如，需要开发者通过 @ObjectLink 逐层拆解嵌套类以使深层次数据具备观测能力。V2则实现了能力升级，增强了对数据对象的深度观察与管理能力，例如，V2的 @Monitor 不仅能够感知变化后的数据，还能获取变化前的数据。通过… [`references/V1-V2迁移概述.md`](<references/V1-V2迁移概述.md>)
- **addMonitor/clearMonitor接口：动态添加/取消监听** — 为了动态添加或删除状态管理V2的状态变量的监听函数，开发者可以使用 addMonitor 或 clearMonitor 。 在阅读本文档前，建议提前阅读： @ObservedV2/@Trace 、 @Monitor 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAllianc… [`references/addMonitor_clearMonitor接口：动态添加_取消监听.md`](<references/addMonitor_clearMonitor接口：动态添加_取消监听.md>)
- **app.js** — 每个应用可以在app.js自定义应用级 生命周期 的实现逻辑，以下示例仅在生命周期函数中打印对应日志： // app.js export default { onCreate() { console.info('Application onCreate'); }, onDestroy() { console.info('Application onDestr… [`references/app.js.md`](<references/app.js.md>)
- **applySync/flushUpdates/flushUIUpdates接口：同步刷新** — 为了实现状态管理V2与 animateTo 等动效的同步刷新，开发者可以使用 applySync 、 flushUpdates 或 flushUIUpdates 接口。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/OnGc1… [`references/applySync_flushUpdates_flushUIUpdates接口：同步刷新.md`](<references/applySync_flushUpdates_flushUIUpdates接口：同步刷新.md>)
- **background-position样式动画** — 通过改变background-position属性（第一个值为X轴的位置，第二个值为Y轴的位置）移动背景图片位置，若背景图位置超出组件则超出部分的背景图不显示。 <!-- xxx.hml --> <div class="container"> <div class="content"></div> <div class="content1"></div> <… [`references/background-position样式动画.md`](<references/background-position样式动画.md>)
- **button开发指导** — button是按钮组件，其类型包括胶囊按钮、圆形按钮、文本按钮、弧形按钮、下载按钮。具体用法请参考 button API 。 #### 创建button组件 在pages/index目录下的hml文件中创建一个button组件。 <!-- xxx.hml --> <div class="container"> <button type="capsule" v… [`references/button开发指导.md`](<references/button开发指导.md>)
- **canBeObserved接口：判断对象是否可被观察** — 为了判断对象是否为可被观察对象和获取对象关联的组件信息，开发者可以使用 canBeObserved接口 。 在使用该接口前，建议开发者对状态管理框架有基本的了解。提前阅读： 状态管理概述 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/… [`references/canBeObserved接口：判断对象是否可被观察.md`](<references/canBeObserved接口：判断对象是否可被观察.md>)
- **chart开发指导** — chart为图表组件，用于呈现线形图、柱状图和量规图界面。具体用法请参考 chart 。 #### 创建chart组件 在pages/index目录下的hml文件中创建一个chart组件。 <!-- xxx.hml --> <div class="container"> <chart class="chart-data" type="line" option… [`references/chart开发指导.md`](<references/chart开发指导.md>)
- **dialog开发指导** — dialog组件用于创建自定义弹窗，通常用来展示用户当前需要或用户必须关注的信息或操作。具体用法请参考 dialog API 。 #### 创建dialog组件 在pages/index目录下的hml文件中创建一个dialog组件，并添加Button组件来触发dialog。dialog组件仅支持width、height、margin、margin-[left… [`references/dialog开发指导.md`](<references/dialog开发指导.md>)
- **form开发指导** — form是一个表单容器，支持容器内 Input 组件内容的提交和重置。具体用法请参考 form API 。 #### 创建form组件 在pages/index目录下的hml文件中创建一个form组件。 <!-- xxx.hml --> <div class="container"> <form style="width: 100%; height: 20%… [`references/form开发指导.md`](<references/form开发指导.md>)
- **getTarget接口：获取状态管理框架代理前的原始对象** — 为了获取状态管理框架代理前的原始对象，开发者可以使用 getTarget接口 。 在阅读本文档前，建议提前阅读： @Observed 、 @ObservedV2 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4e/v3/VxGW3GM… [`references/getTarget接口：获取状态管理框架代理前的原始对象.md`](<references/getTarget接口：获取状态管理框架代理前的原始对象.md>)
- **if/else：条件渲染** — ArkTS提供了渲染控制能力。条件渲染可根据应用状态，使用if、else和else if渲染相应的UI内容。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/95/v3/nS7O6pJoSHaHG1IZtI-B9Q/note_3.0-zh-… [`references/if_else：条件渲染.md`](<references/if_else：条件渲染.md>)
- **image-animator开发指导** — image-animator组件为图片帧动画播放器。具体用法请参考 image-animator 。 #### 创建image-animator组件 在pages/index目录下的hml文件中创建一个image-animator组件，css文件中编写组件样式，js文件中引用图片。 <!-- xxx.hml --> <div class="container… [`references/image-animator开发指导.md`](<references/image-animator开发指导.md>)
- **image开发指导** — image是图片组件，用来渲染展示图片。具体用法请参考 image 组件。 #### 创建image组件 在pages/index目录下的hml文件中创建一个image组件。 <!-- index.hml --> <div class="container"> <image style="height: 30%;" src="common/images/bg… [`references/image开发指导.md`](<references/image开发指导.md>)
- **input开发指导** — input是交互式组件，用于接收用户数据。其类型可设置为日期、多选框和按钮等。具体用法请参考 input API 。 #### 创建input组件 在pages/index目录下的hml文件中创建一个input组件。 <!-- xxx.hml --> <div class="container"> <input type="text"> Please ent… [`references/input开发指导.md`](<references/input开发指导.md>)
- **js标签配置** — js标签用于配置实例名称、页面路由和窗口样式信息。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/38/v3/1bD2C2LzSOiVZcf8_JxbNQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date… [`references/js标签配置.md`](<references/js标签配置.md>)
- **list开发指导** — list是用来显示列表的组件，包含一系列相同宽度的列表项，适合连续、多行地呈现同类数据。具体用法请参考 list API 。 #### 创建list组件 在pages/index目录下的hml文件中创建一个list组件。 <!-- xxx.hml --> <div class="container"> <list> <list-item class="lis… [`references/list开发指导.md`](<references/list开发指导.md>)
- **makeObserved接口：将非观察数据变为可观察数据** — 为了将普通不可观察数据变为可观察数据，开发者可以使用 makeObserved接口 。 makeObserved可以在@Trace无法标记的情况下使用。在阅读本文档前，建议提前阅读： @Trace 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_1… [`references/makeObserved接口：将非观察数据变为可观察数据.md`](<references/makeObserved接口：将非观察数据变为可观察数据.md>)
- **marquee开发指导** — marquee为跑马灯组件，用于展示一段单行滚动的文字。具体用法请参考 marquee 。 #### 创建marquee组件 在pages/index目录下的hml文件中创建一个marquee组件。 <!-- xxx.hml --> <div class="container"> <marquee style="width: 100%;height: 80p… [`references/marquee开发指导.md`](<references/marquee开发指导.md>)
- **menu开发指导** — 提供菜单组件，作为临时性弹出窗口，用于展示用户可执行的操作，具体用法请参考 menu 。 #### 创建menu组件 在pages/index目录下的hml文件中创建一个menu组件，添加target、type、title属性。 <!-- xxx.hml--> <div class="container"> <text class="title-text" … [`references/menu开发指导.md`](<references/menu开发指导.md>)
- **mutableBuilder：实现全局@Builder动态更新** — 当在一个自定义组件内使用多个全局 @Builder 函数实现UI的不同效果时，代码维护将变得非常困难，且页面不够整洁。此时，可以使用 wrapBuilder 封装全局@Builder。但是wrapBuilder不支持动态切换@Builder，引入 mutableBuilder 实现全局@Builder的动态切换。 ![](https://contentcen… [`references/mutableBuilder：实现全局@Builder动态更新.md`](<references/mutableBuilder：实现全局@Builder动态更新.md>)
- **picker开发指导** — picker是滑动选择器组件，类型支持普通选择器、日期选择器、时间选择器、时间日期选择器和多列文本选择器。具体用法请参考 picker 。 #### 创建picker组件 在pages/index目录下的hml文件中创建一个picker组件。 <!-- xxx.hml --> <div class="container"> <picker>picker</p… [`references/picker开发指导.md`](<references/picker开发指导.md>)
- **qrcode开发指导** — 生成并显示二维码，具体用法请参考 qrcode 。 #### 创建qrcode组件 在pages/index目录下的hml文件中创建一个qrcode组件。 <!-- xxx.hml--> <div class="container"> <qrcode value="Hello"></qrcode> </div> /* xxx.css */ .containe… [`references/qrcode开发指导.md`](<references/qrcode开发指导.md>)
- **rating开发指导** — rating是评分组件，用于展示用户对某项内容的评价等级。具体用法请参考 rating 。 #### 创建rating组件 在pages/index目录下的hml文件中创建一个rating组件。 <!-- xxx.hml --> <div class="container"> <rating></rating> </div> /* xxx.css */ .c… [`references/rating开发指导.md`](<references/rating开发指导.md>)
- **search开发指导** — 提供搜索框组件，用于提供用户搜索内容的输入区域，具体用法请参考 search 。 #### 创建search组件 在pages/index目录下的hml文件中创建一个search组件。 <!-- xxx.hml--> <div class="container"> <search></search> </div> /* xxx.css */ .contain… [`references/search开发指导.md`](<references/search开发指导.md>)
- **slider开发指导** — slider为滑动条组件，用来快速调节音量、亮度等。具体用法请参考 slider 。 #### 创建slider组件 在pages/index目录下的hml文件中创建一个slider组件。 <!-- xxx.hml --> <div class="container"> <slider></slider> </div> /* xxx.css */ .cont… [`references/slider开发指导.md`](<references/slider开发指导.md>)
- **stateStyles：多态样式** — @Styles仅应用于静态页面的样式复用，stateStyles可以依据组件的内部状态的不同，快速设置不同样式。这就是我们本章要介绍的内容stateStyles（又称为：多态样式）。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v… [`references/stateStyles：多态样式.md`](<references/stateStyles：多态样式.md>)
- **stepper开发指导** — 当一个任务需要多个步骤时，可以使用stepper组件展示当前进展。具体用法请参考 stepper API 。 #### 创建stepper组件 在pages/index目录下的hml文件中创建一个stepper组件。 <!-- xxx.hml --> <div class="container"> <stepper> <stepper-item> <text… [`references/stepper开发指导.md`](<references/stepper开发指导.md>)
- **svg动画** — 为svg组件添加动画效果。 #### 属性样式动画 在svg的子组件 animate 中，通过attributeName设置需要进行动效的属性，from设置开始值，to设置结束值。 <!-- xxx.hml --> <div class="container"> <svg> <text x="300" y="300" fill="blue"> Hello <… [`references/svg动画.md`](<references/svg动画.md>)
- **swiper开发指导** — swiper为滑动容器，提供切换显示子组件的能力。具体用法请参考 swiper 。 #### 创建swiper组件 在pages/index目录下的hml文件中创建一个swiper组件。 <!-- xxx.hml--> <div class="container"> <swiper> <div class="item" style="background-c… [`references/swiper开发指导.md`](<references/swiper开发指导.md>)
- **switch开发指导** — switch为开关选择器，切换开启或关闭状态。具体用法请参考 switch 。 #### 创建switch组件 在pages/index目录下的hml文件中创建一个switch组件。 <!-- xxx.hml --> <div class="container"> <switch checked="true"></switch> </div> /* xxx.… [`references/switch开发指导.md`](<references/switch开发指导.md>)
- **tabs开发指导** — tabs是一种常见的界面导航结构。通过页签容器，用户可以快捷地访问应用的不同模块。具体用法请参考 tabs API 。 #### 创建tabs 在pages/index目录下的hml文件中创建一个tabs组件。 <!-- xxx.hml --> <div class="container"> <tabs> <tab-bar> <text>item1</tex… [`references/tabs开发指导.md`](<references/tabs开发指导.md>)
- **text开发指导** — text是文本组件，用于呈现一段文本信息。具体用法请参考 text 的API文档。 #### 创建text组件 在pages/index目录下的hml文件中创建一个text组件。 <!-- xxx.hml --> <div class="container" style="text-align: center;justify-content: center;… [`references/text开发指导.md`](<references/text开发指导.md>)
- **toolbar开发指导** — toolbar为页面工具栏组件，用于展示针对当前界面的操作选项，可作为页面的一级导航。具体用法请参考 toolbar 。 #### 创建toolbar组件 在pages/index目录下的hml文件中创建一个toolbar组件。 <!-- xxx.hml --> <div class="container"> <toolbar style="backgrou… [`references/toolbar开发指导.md`](<references/toolbar开发指导.md>)
- **transform样式动画** — 设置transform属性对组件进行旋转、缩放、移动和倾斜。 #### 设置静态动画 创建一个正方形并旋转90°变成菱形，并用下方的长方形把菱形下半部分遮盖形成屋顶，设置长方形translate属性值为(150px,-150px)确定坐标位置形成门，再使用position属性使横纵线跟随父组件（正方形）移动到指定坐标位置，接着设置scale属性使父子组件一起… [`references/transform样式动画.md`](<references/transform样式动画.md>)
- **wrapBuilder：封装全局@Builder** — 当在一个struct内使用多个全局@Builder函数实现UI的不同效果时，代码维护将变得非常困难，且页面不够整洁。此时，可以使用 wrapBuilder 封装全局@Builder。 在阅读本文档前，建议阅读： @Builder 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/Developer… [`references/wrapBuilder：封装全局@Builder.md`](<references/wrapBuilder：封装全局@Builder.md>)
- **不依赖UI组件的全局气泡提示 (openPopup)** — 气泡提示（Popup） 在使用时依赖绑定UI组件，否则无法使用。从API version 18开始，可以通过使用全局接口 openPopup 的方式，在无UI组件的场景下直接或封装使用，例如在事件回调中使用或封装后对外提供能力。 #### 弹出气泡 通过 openPopup 可以弹出气泡。 this.promptAction.openPopup(this.c… [`references/不依赖UI组件的全局气泡提示 (openPopup).md`](<references/不依赖UI组件的全局气泡提示 (openPopup).md>)
- **不依赖UI组件的全局自定义弹出框 (openCustomDialog)** — 在广告、中奖、警告、软件更新等与用户交互响应操作的场景下，可以使用UIContext中获取到的PromptAction对象提供的 openCustomDialog 接口来实现自定义弹出框。相较于 CustomDialogController 优势点在于页面解耦，支持 动态刷新 。 ![](https://contentcenter-vali-drcn.dba… [`references/不依赖UI组件的全局自定义弹出框 (openCustomDialog).md`](<references/不依赖UI组件的全局自定义弹出框 (openCustomDialog).md>)
- **不依赖UI组件的全局菜单 (openMenu)** — 菜单控制 (Menu) 在使用时依赖绑定UI组件，否则无法使用。从API version 18开始，可以通过使用全局接口 openMenu 的方式，在无UI组件的场景下直接或封装使用，例如在事件回调中使用或封装后对外提供能力。 #### 弹出菜单 通过 openMenu 可以弹出菜单。 this.getUIContext().getPromptAction(… [`references/不依赖UI组件的全局菜单 (openMenu).md`](<references/不依赖UI组件的全局菜单 (openMenu).md>)
- **交互响应概述** — ArkUI框架提供了丰富的交互功能，支持直接处理基础输入事件，以及由这些事件驱动的手势系统，同时支持拖拽、焦点切换等复杂交互。 #### 基础输入事件 当用户操作输入设备（例如触摸屏、键盘、鼠标、触控板）时，底层设备驱动会产生操作信号。系统捕捉这些信号并传递给应用程序，这些信号即为基础事件。 根据基础事件特点总体上分为两类， **指向性** 与 **非指向性… [`references/交互响应概述.md`](<references/交互响应概述.md>)
- **交互基础机制说明** — 对于 触摸事件 、 鼠标事件 、 轴事件 等指向性事件的交互，交互框架基于坐标信息进行命中测试确定事件和手势的响应目标，即收集形成响应链，系统会根据触控事件的坐标、类型等信息，结合UI布局，将事件发送给对应UI组件。多个事件可以组合触发手势或其他功能，如长按、点击、拖拽。 #### 事件交互流程 事件交互流程是指当ArkUI接收上游发送的Touch类触控事件… [`references/交互基础机制说明.md`](<references/交互基础机制说明.md>)
- **传统曲线** — 传统曲线基于数学公式，创造形状符合开发者预期的动画曲线。以三阶贝塞尔曲线为代表，通过调整曲线控制点，可以改变曲线形状，从而带来缓入、缓出等动画效果。对于同一条传统曲线，由于不具备物理含义，其形状不会因为用户行为发生任何改变，缺少物理动画的自然感和生动感。建议优先采用物理曲线创建动画，将传统曲线作为辅助用于极少数必要场景中。 ArkUI提供了贝塞尔曲线、阶梯曲… [`references/传统曲线.md`](<references/传统曲线.md>)
- **使用Display实现屏幕属性查询及状态监听 (ArkTS)** — Display 屏幕属性提供管理设备屏幕的一些基础能力，例如获取默认显示设备的相关信息、获取全部显示设备的信息，此外还能对显示设备的插拔行为进行监听。应用可以根据对应的屏幕信息、屏幕状态变化、屏幕折叠状态等适配不同的UI界面显示。 屏幕属性的常见使用场景有以下几种： - 查询屏幕信息：包括屏幕的分辨率、物理像素密度、逻辑像素密度、刷新率、屏幕尺寸、屏幕旋转方… [`references/使用Display实现屏幕属性查询及状态监听 (ArkTS).md`](<references/使用Display实现屏幕属性查询及状态监听 (ArkTS).md>)
- **使用NDK接口实现画中画功能开发（C/C++）** — 本文以视频播放为例，介绍通过NDK接口实现画中画功能的基本开发步骤。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/25/v3/784LUi1PTTqJ2bi6H6dfNA/note_3.0-zh-cn.png?HW-CC-KV=V1&H… [`references/使用NDK接口实现画中画功能开发（C_C++）.md`](<references/使用NDK接口实现画中画功能开发（C_C++）.md>)
- **使用OH_DisplayManager实现屏幕基础信息查询和状态监听 (C/C++)** — OH_DisplayManager 屏幕管理模块用于提供屏幕的信息查询、屏幕状态变化监听、折叠设备的折叠状态变化监听等能力，应用可根据对应的屏幕信息、屏幕状态变化、屏幕折叠状态适配不同的UI界面显示。 - 支持查询的屏幕信息，包括屏幕的分辨率、物理像素密度、逻辑像素密度、刷新率、屏幕尺寸、屏幕旋转方向、屏幕旋转角度等。 - 支持屏幕状态变化的监听，包括屏幕旋… [`references/使用OH_DisplayManager实现屏幕基础信息查询和状态监听 (C_C++).md`](<references/使用OH_DisplayManager实现屏幕基础信息查询和状态监听 (C_C++).md>)
- **使用UI上下文接口操作界面（UIContext）** — 本文主要介绍了多UI实例涉及的概念，以及使用 UIContext 的方法替换全局接口的原因，并提供了相应的替换方案。 #### 基本概念 **UI实例：** UI实例是用于管理用户界面的对象，主要负责组件、布局、动画以及交互事件等UI功能的管理。每个窗口对象都会创建并管理一个UI实例。 **UI上下文：** UI上下文是指UI实例运行环境的抽象概念，UI功能… [`references/使用UI上下文接口操作界面（UIContext）.md`](<references/使用UI上下文接口操作界面（UIContext）.md>)
- **使用WebGL绘制图形** — WebGL的全称为Web Graphics Library（网页图形库），主要用于交互式渲染2D图形。目前HarmonyOS中使用的WebGL是基于OpenGL裁剪的OpenGL ES，可以在HTML5的Canvas元素对象中使用，无需使用插件，支持跨平台。WebGL程序是由JavaScript代码组成的，其中使用的API可以利用用户设备提供的GPU硬件完成… [`references/使用WebGL绘制图形.md`](<references/使用WebGL绘制图形.md>)
- **使用WindowManager管理多模输入事件（C/C++）** — WindowManager 提供应用窗口的管理能力，可以用于管理多模输入事件。 当前支持使用WindowManager进行多模输入事件的过滤，还可以将多模触摸事件注入目标窗口，具体开发步骤可见下文。 #### 过滤多模输入事件 使用WindowManager模块提供的能力去拦截按键事件，让按键事件不往应用内部组件分发。 #### 在CMake脚本中链接动态库… [`references/使用WindowManager管理多模输入事件（C_C++）.md`](<references/使用WindowManager管理多模输入事件（C_C++）.md>)
- **使用XComponent实现画中画功能开发（ArkTS）** — 本文以视频播放为例，介绍通过XComponent实现画中画功能的基本开发步骤。 #### 约束与限制 - HarmonyOS 6.0.0之前，支持在Phone、Tablet设备使用XComponent实现画中画功能开发；从HarmonyOS 6.0.0开始，支持在Phone、PC/2in1、Tablet设备使用XComponent实现画中画功能开发。 - 仅… [`references/使用XComponent实现画中画功能开发（ArkTS）.md`](<references/使用XComponent实现画中画功能开发（ArkTS）.md>)
- **使用typeNode实现画中画功能开发（ArkTS）** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/M3nYo57UQxS4_lATa7MpKw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110936Z&HW-CC-Ex… [`references/使用typeNode实现画中画功能开发（ArkTS）.md`](<references/使用typeNode实现画中画功能开发（ArkTS）.md>)
- **使用列表** — ArkUI开发框架在NDK接口提供了列表组件，使用列表可以轻松高效地显示结构化、可滚动的信息。列表组件支持控制滚动位置、支持分组显示内容、支持使用 NodeAdapter 实现懒加载以提升列表创建性能。 #### 创建列表 参考 接入ArkTS页面 章节实现列表创建。 #### 监听滚动事件 参考 监听组件事件 章节实现列表滚动事件监听。 #### 使用懒加… [`references/使用列表.md`](<references/使用列表.md>)
- **使用动画** — ArkUI 开发框架在 NDK 接口主要提供属性动画，实现组件出现/消失转场。同时，可以通过Node-API桥接 ArkTS 侧帧动画能力，实现Native侧的动画效果。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/zRuT… [`references/使用动画.md`](<references/使用动画.md>)
- **使用多线程NDK接口并行化构建UI页面** — 在API version 22之前，UI组件的创建与属性设置等操作必须在应用的UI线程中执行。这导致开发者在使用NDK接口时，需将组件创建与属性设置等操作通过任务队列提交至UI线程执行，限制了组件创建过程的灵活性及应用的性能。 随着应用程序功能的日益复杂，应用页面内需要动态创建大量UI组件，这些组件的创建任务堆积在单一的UI线程中执行，会导致应用启动缓慢、动… [`references/使用多线程NDK接口并行化构建UI页面.md`](<references/使用多线程NDK接口并行化构建UI页面.md>)
- **使用文本常见问题** — 本文档介绍使用文本的常见问题并提供参考。 #### 文本显示（Text/Span）常见问题 以下内容介绍了使用 Text 和 Span 组件进行文本显示时可能遇到的常见问题，包括文本截断、添加标签、显示表情等场景的处理方法。 #### Text组件尾部省略号后为什么还有一段空白，没有占满组件宽度 **问题现象** 在Text组件上未设置宽度，当内容过长时，省… [`references/使用文本常见问题.md`](<references/使用文本常见问题.md>)
- **使用瀑布流** — ArkUI开发框架在NDK接口提供了瀑布流容器组件，通过瀑布流自身的排列规则，将不同大小的"项目"自上而下如瀑布般紧密布局。 #### 接入ArkTS页面 为了使用NDK接口构建UI界面，参考 接入ArkTS页面章节 ，在ArkTS页面上创建用于Native页面挂载的占位组件，并实现ArkTS侧的NativeNode模块接口。 #### 使用懒加载 ####… [`references/使用瀑布流.md`](<references/使用瀑布流.md>)
- **使用画布绘制自定义图形 (Canvas)** — Canvas提供画布组件，用于自定义绘制图形，开发者使用CanvasRenderingContext2D对象和OffscreenCanvasRenderingContext2D对象在Canvas组件上进行绘制，绘制对象可以是基础形状、文本、图片等。 #### 使用画布组件绘制自定义图形 可以由以下三种形式在画布绘制自定义图形： - 使用CanvasRende… [`references/使用画布绘制自定义图形 (Canvas).md`](<references/使用画布绘制自定义图形 (Canvas).md>)
- **使用组件截图（ComponentSnapshot）** — 组件截图是将应用内一个组件节点树的渲染结果生成位图（ PixelMap ）的能力，支持两种方式：一种是对已挂树显示的组件进行截图，另一种是对通过Builder或ComponentContent实现的离线组件进行截图。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance… [`references/使用组件截图（ComponentSnapshot）.md`](<references/使用组件截图（ComponentSnapshot）.md>)
- **使用网格** — ArkUI开发框架从API version 12开始在NDK接口提供了网格组件，使用网格可以将页面按行列分割成单元格，并指定子组件所在单元格和占用的行列数，从而实现不同的布局需求。例如页面上大小不同的卡片和应用图标、按日期分组显示图片等。 创建网格 后，可以 设置子组件所占行列数 ，滚动场景还可以 处理滚动事件 。 使用NDK接口构建UI界面以及NDK基本使… [`references/使用网格.md`](<references/使用网格.md>)
- **全局闪控球开发指导** — 闪控球是一种在设备屏幕上悬浮的非全屏应用窗口，为应用提供临时的全局能力，完成跨应用交互。 应用可以将关键信息（如比价、搜题或抢单等）以小窗（闪控球）模式呈现。切换为小窗（闪控球）模式后，用户可以进行其他界面操作，提升使用体验。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAll… [`references/全局闪控球开发指导.md`](<references/全局闪控球开发指导.md>)
- **全屏启动元服务组件（FullScreenLaunchComponent）** — FullScreenLaunchComponent允许开发者以全屏方式拉起元服务，使得应用能够提供更友好的用户体验。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/E_UhKe4TSQq3_HhCGCq7ag/zh-cn_im… [`references/全屏启动元服务组件（FullScreenLaunchComponent）.md`](<references/全屏启动元服务组件（FullScreenLaunchComponent）.md>)
- **共享元素转场 (一镜到底)** — 共享元素转场是一种界面切换时对相同或者相似的两个元素做的一种位置和大小匹配的过渡动画效果，也称一镜到底动效。 如下例所示，在点击图片后，该图片消失，同时在另一个位置出现新的图片，二者之间内容相同，可以对它们添加一镜到底动效。左图为不添加一镜到底动效的效果，右图为添加一镜到底动效的效果，一镜到底的效果能够让二者的出现消失产生联动，使得内容切换过程显得灵动自然而… [`references/共享元素转场 (一镜到底).md`](<references/共享元素转场 (一镜到底).md>)
- **内容修改器 (ContentModifier)** — 当开发者期望自定义组件的内容区时，比如Checkbox的内部显示一个五角星等场景时，可以使用此功能。 仅 Button 、 Checkbox 、 DataPanel 、 TextTimer 、 Slider 、 Select 、 Rating 、 Radio 、 Gauge 、 Toggle 、 TextClock 组件支持该能力。 使用ContentMod… [`references/内容修改器 (ContentModifier).md`](<references/内容修改器 (ContentModifier).md>)
- **内置对象的迁移** — 本文档主要介绍组件内置对象从V1向V2的迁移，涉及如下装饰器。 #### 滚动组件 #### List 开发者可以通过 ChildrenMainSize 来设置 List 的子组件在主轴方向的大小信息。 V1： 在状态管理V1中，可以通过 @State 装饰观察其api调用。 具体示例如下： @Entry @Component struct ListExam… [`references/内置对象的迁移.md`](<references/内置对象的迁移.md>)
- **几何图形绘制概述** — 绘制几何图形有两种方法：一是通过绘制组件 Shape 直接绘制出几何图形；二是通过形状裁剪属性 clipShape 将组件裁剪成几何图形。 #### 使用场景 #### 约束限制 - 对绘制组件，既可用 Shape 组件作为父组件实现类似SVG的效果，也可单独使用各种形状的子组件进行绘制。 - 对形状裁剪属性，裁剪不会导致被裁剪区域无法响应绑定的手势事件。 [`references/几何图形绘制概述.md`](<references/几何图形绘制概述.md>)
- **出现/消失转场** — transition 是基础的组件转场接口，用于实现一个组件出现或者消失时的动画效果。可以通过 TransitionEffect对象 的组合使用，定义出各式效果。 **表1** 转场效果接口 1. 创建TransitionEffect。 // 出现时会是所有出现转场效果的叠加，消失时会是所有消失转场效果的叠加 // 说明各个effect跟随的动画参数 pri… [`references/出现_消失转场.md`](<references/出现_消失转场.md>)
- **切换按钮 (Toggle)** — Toggle组件提供状态按钮样式、勾选框样式和开关样式，一般用于两种状态之间的切换。具体用法请参考 Toggle 。 #### 创建切换按钮 Toggle通过调用 ToggleOptions 来创建，具体调用形式如下： Toggle(options: { type: ToggleType, isOn?: boolean }) 其中，ToggleType为开关… [`references/切换按钮 (Toggle).md`](<references/切换按钮 (Toggle).md>)
- **列表与网格概述** — 许多应用存在滚动展示同类项目集合的需求，例如显示图片、视频、音乐、新闻、商品等。此类场景可以根据项目排列方式分别选择 List 、 Grid 、 WaterFlow 实现，在圆形屏幕推荐使用 ArcList 。 #### 列表 List适合单列和多列宽度相同的场景，如通讯录、音乐列表、购物清单等。 直播评论、即时聊天等应用场景需要在列表底部插入数据时，内容应… [`references/列表与网格概述.md`](<references/列表与网格概述.md>)
- **创建列表 (List)** — 列表是一种复杂的容器，当列表项达到一定数量，内容超过屏幕大小时，可以自动提供滚动功能。它适合用于呈现同类数据类型或数据类型集，例如图片和文本。在列表中显示数据集合是许多应用程序中的常见要求（如通讯录、音乐列表、购物清单等）。 使用列表可以轻松高效地显示结构化、可滚动的信息。通过在 List 组件中按垂直或者水平方向线性排列子组件 ListItemGroup … [`references/创建列表 (List).md`](<references/创建列表 (List).md>)
- **创建弧形轮播 (ArcSwiper)（圆形屏幕推荐使用）** — ArcSwiper是弧形轮播组件，在圆形屏幕场景下使用，提供弧形轮播显示能力。具体用法请参考 ArcSwiper 。 在使用ArcSwiper组件之前，需要在代码中先导入ArcSwiper模块。 import { ArcSwiper, ArcSwiperAttribute, ArcDotIndicator, ArcDirection, ArcSwiperCo… [`references/创建弧形轮播 (ArcSwiper)（圆形屏幕推荐使用）.md`](<references/创建弧形轮播 (ArcSwiper)（圆形屏幕推荐使用）.md>)
- **创建瀑布流（WaterFlow）** — 瀑布流 常用于展示图片信息，尤其在购物和资讯类应用中。 ArkUI提供了WaterFlow容器组件，用于构建瀑布流布局。WaterFlow组件支持条件渲染、循环渲染和懒加载等方式生成子组件。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/… [`references/创建瀑布流（WaterFlow）.md`](<references/创建瀑布流（WaterFlow）.md>)
- **创建网格 (Grid/GridItem)** — 网格布局是由“行”和“列”分割的单元格所组成，通过指定“项目”所在的单元格做出各种各样的布局。网格布局具有较强的页面均分能力，子组件占比控制能力，是一种重要自适应布局，其使用场景有九宫格图片展示、日历、计算器等。 ArkUI提供了 Grid 容器组件和子组件 GridItem ，用于构建网格布局。Grid用于设置网格布局相关参数，GridItem定义子组件相… [`references/创建网格 (Grid_GridItem).md`](<references/创建网格 (Grid_GridItem).md>)
- **创建自定义组件** — 在ArkUI中，UI显示的内容均为组件，由框架直接提供的称为系统组件，由开发者定义的称为自定义组件。进行UI界面开发时，不仅要组合使用系统组件，还需考虑代码的可复用性、业务逻辑与UI的分离，以及后续版本的演进等因素。因此，将UI和部分业务逻辑封装成自定义组件是不可或缺的能力。 自定义组件具有以下特点： - 可组合：允许开发者组合使用系统组件及其属性和方法。 … [`references/创建自定义组件.md`](<references/创建自定义组件.md>)
- **创建轮播 (Swiper)** — Swiper 组件提供滑动轮播显示的能力。Swiper本身是一个容器组件，当设置了多个子组件后，可以对这些子组件进行轮播显示。通常，在一些应用首页显示推荐的内容时，需要用到轮播显示的能力。 针对复杂页面场景，可以使用Swiper组件的预加载机制，利用主线程的空闲时间来提前构建和布局绘制组件，优化滑动体验。 #### 布局与约束 Swiper作为一个容器组件，… [`references/创建轮播 (Swiper).md`](<references/创建轮播 (Swiper).md>)
- **动态属性设置常见问题** — 本文档介绍动态属性设置的常见问题并提供参考。 #### 使用AttributeModifier设置组件动态属性，出现jscrash **问题现象** 使用AttributeModifier对组件进行 动态属性设置 ，设置某些属性后出现 JS Crash 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt… [`references/动态属性设置常见问题.md`](<references/动态属性设置常见问题.md>)
- **动画** — 动画分为 静态动画 和 连续动画 。 #### 静态动画 静态动画的核心是transform样式，主要可以实现以下三种变换类型，一次样式设置只能实现一种类型变换。 - **translate** ：沿水平或垂直方向将指定组件移动所需距离。 - **scale** ：横向或纵向将指定组件缩小或放大到所需比例。 - **rotate** ：将指定组件沿横轴或纵轴… [`references/动画.md`](<references/动画.md>)
- **动画动效** — 通过设置插值器来实现动画效果。 #### 创建动画对象 通过createAnimator创建一个动画对象，通过设置参数options来设置动画的属性。 <!-- xxx.hml --> <div class="container"> <div style="width: 300px;height: 300px;margin-top: 100px;backgr… [`references/动画动效.md`](<references/动画动效.md>)
- **动画帧** — 请求动画帧时通过requestAnimationFrame函数逐帧回调，传入一个回调函数。 runframe在调用requestAnimationFrame时传入带有timestamp参数的回调函数step，将step中的timestamp赋予起始的startTime。当timestamp与startTime的差值小于规定的时间时，会再次调用requestA… [`references/动画帧.md`](<references/动画帧.md>)
- **动画曲线概述** — 动画曲线是属性关于时间的变化函数，决定属性变化时产生动画的运动轨迹。某一时刻下动画曲线的斜率代表动画的速度，对应属性变化的快慢。一条优秀的动画曲线具备连续光滑、符合用户意图、符合物理世界客观规律的特点。开发者可结合用户的使用场景和意图，为动效选取合适的动画曲线。 根据动画曲线是否符合物理世界客观规律，可将其分为物理曲线（ArkUI当前提供了多种物理弹簧曲线）… [`references/动画曲线概述.md`](<references/动画曲线概述.md>)
- **动画概述** — UI（用户界面）是用户与设备进行交互的界面，包含各种可视化组件（如按钮、列表等）。属性作为接口，用于控制组件的行为，属性值的变化会引起UI的变化。动画可在UI发生改变时，添加流畅的过渡效果，使属性值从起始状态逐渐变化到终点状态，避免因瞬间变化造成的突兀感，保持用户的视觉焦点。 ![](https://contentcenter-vali-drcn.dbank… [`references/动画概述.md`](<references/动画概述.md>)
- **动画衔接** — UI界面除了运行动画之外，还承载着与用户进行实时交互的功能。当用户行为根据意图变化发生改变时，UI界面应做到即时响应。例如用户在应用启动过程中，上滑退出，那么启动动画应该立即过渡到退出动画，而不应该等启动动画完成后再退出，从而减少用户等待时间。对于桌面翻页类从跟手到离手触发动画的场景，离手后动画的初始速度应继承手势速度，避免由于速度不连续导致停顿感的产生。针… [`references/动画衔接.md`](<references/动画衔接.md>)
- **单一手势** — 单击作为常用的手势，可以方便地使用 onClick 接口实现。尽管被称为事件，它实际上是基本手势类型，等同于将count配置为1的TapGesture，即单击手势。 onClick与其他手势类型相同，也会参与命中测试、响应链收集等过程。可以使用 干预手势处理 机制对onClick的响应进行动态决策。 @Entry @Component export stru… [`references/单一手势.md`](<references/单一手势.md>)
- **单选框 (Radio)** — Radio是单选框组件，通常用于提供相应的用户交互选择项，同一组的Radio中只有一个可以被选中。具体用法请参考 Radio 。 #### 创建单选框 Radio通过调用 RadioOptions 来创建，以RadioOptions中的value和group为例： Radio(options: {value: string, group: string}) … [`references/单选框 (Radio).md`](<references/单选框 (Radio).md>)
- **即时反馈（Toast）** — 即时反馈（Toast）是一种临时性的消息提示框，用于向用户显示简短的操作反馈或状态信息。​它通常在屏幕的底部或顶部短暂弹出，随后在一段时间后自动消失。即时反馈的主要目的是提供简洁、不打扰的信息反馈，避免干扰用户当前的操作流程。 可以通过使用 UIContext 中的 getPromptAction 方法获取当前UI上下文关联的 PromptAction 对象… [`references/即时反馈（Toast）.md`](<references/即时反馈（Toast）.md>)
- **同应用进程嵌入式组件 (EmbeddedComponent)** — EmbeddedComponent组件允许当前页面嵌入同一应用内其他EmbeddedUIExtensionAbility供给的UI内容，这些UI运行在独立进程中，提供更高的安全性和稳定性。 EmbeddedComponent组件主要用于实现跨模块、跨进程的嵌入式界面集成，其核心目标是通过模块化设计提升应用的灵活性和用户体验。 开发者在使用时需注意其使用限制和… [`references/同应用进程嵌入式组件 (EmbeddedComponent).md`](<references/同应用进程嵌入式组件 (EmbeddedComponent).md>)
- **启动页资源分类配置** — 启动页资源配置与其他资源配置相同，支持资源分类配置，可针对不同的场景配置不同资源，常用于在深色模式或不同设备类型上配置不同的启动页内容。 #### 配置深色模式启动页 - 在API version 20之前，启动页深浅色模式仅支持跟随系统深浅色模式。 - 从API version 20开始，支持通过增强启动页的startWindowColorModeType… [`references/启动页资源分类配置.md`](<references/启动页资源分类配置.md>)
- **命令式节点常见问题** — 本文档介绍命令式节点的常见问题并提供参考。 #### FrameNode节点运行时出现jscrash **问题现象** 不规范地使用 FrameNode 后出现 JS Crash 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/66/v… [`references/命令式节点常见问题.md`](<references/命令式节点常见问题.md>)
- **固定样式弹出框** — 固定样式弹出框采用固定的布局格式，这使得开发者无需关心具体的显示布局细节，只需输入所需显示的文本内容，从而简化了使用流程，提升了便捷性。 #### 使用约束 - 可以通过调用UIContext或getUIContext，在非UI页面或某些异步回调中使用本文中的接口。CalendarPickerDialog当前不支持此操作。 - 操作菜单 (showActio… [`references/固定样式弹出框.md`](<references/固定样式弹出框.md>)
- **图文混排** — 图文混排是指图片与文字混合排列，文字可展示于图片四周。此排列方式能够直观呈现页面信息，增强视觉冲击力，使页面展示效果更加多样化。 #### 使用Span和ImageSpan实现图文混排 通过设置 Text 组件 textVerticalAlign 属性和设置 ImageSpan 组件 verticalAlign 为ImageSpanAlignment.FOL… [`references/图文混排.md`](<references/图文混排.md>)
- **图标小符号 (SymbolGlyph/SymbolSpan)** — SymbolGlyph是图标小符号组件，便于使用精美的图标，如渲染多色图标和使用动效图标。SymbolSpan作为Text组件的子组件，可在文本中穿插显示图标小符号。具体用法请参考 SymbolGlyph 和 SymbolSpan 组件的API文档。 #### 创建图标 SymbolGlyph通过$r引用Resource资源来创建，目前仅支持系统预置的Sym… [`references/图标小符号 (SymbolGlyph_SymbolSpan).md`](<references/图标小符号 (SymbolGlyph_SymbolSpan).md>)
- **在NDK中保证多实例场景功能正常** — API version 20开始，ArkUI开发框架新增了 OH_ArkUI_RunTaskInScope 接口，解决Native侧多实例场景下的组件操作问题。该功能通过动态切换执行上下文，确保跨实例组件属性设置的合法性，避免实例上下文不匹配导致的接口调用异常。 在NDK多窗口开发时，可能会涉及到组件的跨实例设置属性等场景，使用该能力可确保在调用跨实例组件设… [`references/在NDK中保证多实例场景功能正常.md`](<references/在NDK中保证多实例场景功能正常.md>)
- **基于NDK构建UI概述** — ArkUI开发框架提供了一系列 NDK接口 ，能够在应用中使用C和C++代码构建UI界面，这些接口包括UI组件创建、UI树操作、属性设置和事件监听等。面向通用UI界面开发场景，建议使用ArkTS代码和ArkUI声明式开发框架。然而，如果需要实现以下一个或多个目标，那么ArkUI NDK接口就能派上用场： - 需要使用UI组件树控制接口来动态创建和挂载UI组件… [`references/基于NDK构建UI概述.md`](<references/基于NDK构建UI概述.md>)
- **基本语法概述** — 在初步了解ArkTS语言后，本指南将以具体的示例来说明ArkTS的基本组成。 如下图所示，点击“按钮”时，文本内容从“Hello World”变为“Hello ArkUI”。 **图1** 示例效果图 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_1… [`references/基本语法概述.md`](<references/基本语法概述.md>)
- **基础知识** — svg组件主要作为svg画布的根节点使用，也可以在svg中嵌套使用。具体用法请参考 svg 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/4uNkiMerTeqG2BbummcmNw/note_3.0-zh-cn.png?… [`references/基础知识.md`](<references/基础知识.md>)
- **基础自定义弹出框 (CustomDialog)** — CustomDialog是自定义弹出框，可用于广告、中奖、警告、软件更新等与用户交互响应操作。开发者可以通过CustomDialogController类显示自定义弹出框。具体用法请参考 自定义弹出框 。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene… [`references/基础自定义弹出框 (CustomDialog).md`](<references/基础自定义弹出框 (CustomDialog).md>)
- **声明式UI描述** — ArkTS以声明方式组合和扩展组件来描述应用程序的UI，同时还提供了基本的属性、事件和子组件配置方法，帮助开发者实现应用交互逻辑。 #### 创建组件 根据组件构造方法的不同，创建组件包含有参数和无参数两种方式。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_s… [`references/声明式UI描述.md`](<references/声明式UI描述.md>)
- **多层级手势事件** — 多层级手势事件指父子组件嵌套时，父子组件均绑定了手势或事件。在该场景下，手势或者事件的响应受到多个因素的影响，相互之间发生传递和竞争，容易出现预期外的响应。 本章主要介绍了多层级手势事件的默认响应顺序，以及如何通过设置相关属性影响多层级手势事件的响应顺序。 #### 默认多层级手势事件 #### 触摸事件 触摸事件 （onTouch事件）是所有手势组成的基础… [`references/多层级手势事件.md`](<references/多层级手势事件.md>)
- **多语言支持** — 基于开发框架的应用会覆盖多个国家和地区，开发框架支持多语言能力后，可以让应用开发者无需开发多个不同语言的版本，就可以同时支持多种语言的切换，为项目维护带来便利。 开发者仅需要通过 定义资源文件 和 引用资源 两个步骤，就可以使用开发框架的多语言能力；如果需要在应用中获取当前系统语言，请参考 获取语言 。 #### 定义资源文件 资源文件用于存放应用在多种语言… [`references/多语言支持.md`](<references/多语言支持.md>)
- **媒体查询 (@ohos.mediaquery)** — 媒体查询 作为响应式设计的核心，在移动设备上应用十分广泛。媒体查询可根据不同设备类型或同设备不同状态修改应用的样式。媒体查询常用于下面两种场景： 1. 针对设备和应用的属性信息（比如显示区域、深浅色、分辨率），设计出相匹配的布局。 2. 当屏幕发生动态改变时（比如分屏、横竖屏切换），同步更新应用的页面布局。 #### 引入与使用流程 媒体查询通过mediaq… [`references/媒体查询 (@ohos.mediaquery).md`](<references/媒体查询 (@ohos.mediaquery).md>)
- **实现属性动画** — 通过可动画属性改变引起UI上产生的连续视觉效果，即为属性动画。属性动画是最基础易懂的动画，ArkUI提供三种动画接口 animateTo 、 animation 和 keyframeAnimateTo 驱动组件属性按照动画曲线等动画参数进行连续的变化，产生属性动画。 ![](https://contentcenter-vali-drcn.dbankcdn.c… [`references/实现属性动画.md`](<references/实现属性动画.md>)
- **富文本编辑（RichEditor）** — RichEditor是支持图文混排和文本交互式编辑的组件，通常用于响应用户对图文混合内容的输入操作，例如可以输入图文的评论区。具体用法参考 RichEditor 组件的API文档。 对于仅需图文展示而不需要编辑的场景，建议使用 Text 组件。 对于需要大量展示Html格式内容的场景，建议使用 RichText 组件。 #### 组件构成 下图展示了组件元素… [`references/富文本编辑（RichEditor）.md`](<references/富文本编辑（RichEditor）.md>)
- **层叠布局 (Stack)** — 层叠布局（StackLayout）用于在屏幕上预留一块区域来显示组件中的元素，提供元素可以重叠的布局。层叠布局通过 Stack 容器组件实现位置的固定定位与层叠，容器中的子元素依次入栈，后一个子元素覆盖前一个子元素，子元素可以叠加，也可以设置位置。 层叠布局具有较强的页面层叠、位置定位能力，其使用场景有广告、卡片层叠效果等。 如图1，Stack作为容器，容器… [`references/层叠布局 (Stack).md`](<references/层叠布局 (Stack).md>)
- **屏幕开发常见问题** — **问题现象** 三折叠设备中，调用 on('foldDisplayModeChange') 接口监听显示模式变化获取到的值为5，而调用 getFoldDisplayMode() 接口时的返回值却不是5。 **产生原因** 1. FoldDisplayMode=5的含义 在三折叠设备中，当FoldDisplayMode的值为5时，表示设备当前处于全展开显示模… [`references/屏幕开发常见问题.md`](<references/屏幕开发常见问题.md>)
- **屏幕管理开发术语** — 屏幕管理开发主要围绕逻辑屏和物理屏两个核心概念进行。 逻辑屏不能独立于物理屏存在，每一块逻辑屏都会映射到物理屏上。 物理屏属性会影响逻辑屏属性，如：折叠手机折展时，逻辑屏会在手机的内屏和外屏之间切换，逻辑屏的宽高属性也会更新为对应屏的分辨率。 #### 逻辑屏 系统为每个应用程序呈现的一个连续的显示空间。 逻辑屏有主屏、镜像屏、扩展屏、异源屏四种。 ####… [`references/屏幕管理开发术语.md`](<references/屏幕管理开发术语.md>)
- **屏幕管理简介** — 屏幕管理主要是针对设备的各种屏幕（包括物理屏、虚拟屏、折叠屏）进行管理，管理其各种属性信息，并当作广播者，将监听到的信息广播给各个需要屏幕信息的订阅服务。 屏幕管理主要包括以下几方面能力： - 可获取屏幕当前的属性信息，包括屏幕分辨率、物理像素密度、屏幕尺寸等。 - 可监听屏幕发生的各种事件变化，包括屏幕旋转变化、屏幕分辨率变化、屏幕刷新率变化、折叠状态变化… [`references/屏幕管理简介.md`](<references/屏幕管理简介.md>)
- **属性修改器 (AttributeModifier)** — 声明式语法引入了 @Styles 和 @Extend 两个装饰器，可以解决复用相同自定义样式的问题，但是存在以下受限场景： - @Styles和@Extend均是编译期处理，不支持跨文件的导出复用。 - @Styles仅能支持通用属性、事件，不支持组件特有的属性。 - @Styles虽然支持在多态样式下使用，但不支持传参，无法对外开放一些属性。 - @Ext… [`references/属性修改器 (AttributeModifier).md`](<references/属性修改器 (AttributeModifier).md>)
- **属性动画概述** — 属性接口（以下简称属性）包含尺寸属性、布局属性、位置属性等多种类型，用于控制组件的行为。针对当前界面上的组件，其部分属性（如位置属性）的变化会引起UI的变化。添加动画可以让属性值从起点逐渐变化到终点，从而产生连续的动画效果。为保障动画起点和终点的正确性，属性动画会将当前在标脏队列内的所有节点进行刷新。如果发现当前动画时长较长时，需要确认当前是否有额外的节点刷… [`references/属性动画概述.md`](<references/属性动画概述.md>)
- **属性字符串（StyledString/MutableStyledString）** — 属性字符串StyledString/MutableStyledString（其中MutableStyledString继承自StyledString，下文统称为StyledString），可用于在字符或段落级别上设置文本样式。将StyledString应用到文本组件上，可以采用多种方式修改文本，包括调整字号、添加字体颜色、使文本具备可点击性，以及通过自定义方… [`references/属性字符串（StyledString_MutableStyledString）.md`](<references/属性字符串（StyledString_MutableStyledString）.md>)
- **属性更新器 (AttributeUpdater)** — 在大量属性频繁更新的场景下，使用状态变量可能导致前端状态管理的计算量过大，并且需要对单个组件进行全量属性更新。尽管可以通过 AttributeModifier 机制实现按需更新属性，但前端仍会采用一定的diff和reset策略，这可能带来性能问题。 AttributeUpdater作为一个特殊的AttributeModifier，不仅继承了Attribute… [`references/属性更新器 (AttributeUpdater).md`](<references/属性更新器 (AttributeUpdater).md>)
- **属性样式动画** — 在关键帧（Keyframes）中动态设置父组件的width和height，实现组件变大缩小。子组件设置scale属性使父子组件同时缩放，再设置opacity实现父子组件的显示与隐藏。 <!-- xxx.hml --> <div class="container"> <div class="fade"> <text>fading away</text> </d… [`references/属性样式动画.md`](<references/属性样式动画.md>)
- **嵌入ArkTS组件** — ArkUI在Native侧提供的能力作为ArkTS的子集，部分能力不会在Native侧提供，如声明式UI语法，自定义struct组件，UI高级组件。 针对需要使用ArkTS侧独立能力的场景，ArkUI开发框架提供了Native侧嵌入ArkTS组件的能力，该能力依赖 ComponentContent 机制，通过ComponentContent完成对ArkTS组… [`references/嵌入ArkTS组件.md`](<references/嵌入ArkTS组件.md>)
- **布局概述** — 组件按照布局的要求依次排列，构成应用的页面。在声明式UI中，所有的页面都是由自定义组件构成，开发者可以根据自己的需求，选择合适的布局进行页面开发。 布局指用特定的组件或者属性来管理用户页面所放置UI组件的大小和位置。在实际的开发过程中，需要遵守以下流程保证整体的布局效果： - 确定页面的布局结构。 - 分析页面中的元素构成。 - 选用适合的布局容器组件或属性… [`references/布局概述.md`](<references/布局概述.md>)
- **布局说明** — 设备的基准宽度为720px（px为逻辑像素，非物理像素），实际显示效果会根据实际屏幕宽度进行缩放。 其换算关系如下： 组件的width设为100px时，在宽度为720物理像素的屏幕上，实际显示为100物理像素；在宽度为1440物理像素的屏幕上，实际显示为200物理像素。 一个页面的基本元素包含标题区域、文本区域、图片区域等，每个基本元素内还可以包含多个子元素… [`references/布局说明.md`](<references/布局说明.md>)
- **帧动画（ohos.animator）** — 帧动画具备逐帧回调的特性，便于开发者在每一帧中处理需调整的属性。通过向应用提供 AnimatorResult 的onFrame属性逐帧回调，帧动画使开发者能够在应用的每一帧设置属性值，从而实现组件属性值变化的自然过渡，营造出动画效果。帧动画接口详情可参考 @ohos.animator (动画) 。 与属性动画相比，帧动画能让开发者实时感知动画进程，即时调整U… [`references/帧动画（ohos.animator）.md`](<references/帧动画（ohos.animator）.md>)
- **应用内状态变量迁移** — 本文档主要介绍应用内状态变量迁移，包含以下场景。 #### LocalStorage->@ObservedV2/@Trace **迁移规则** LocalStorage的目的是实现页面间的状态变量共享。由于V1状态变量和View层耦合，开发者难以自主实现页面间状态变量的共享，因此框架提供了该能力。 状态管理V2将状态变量的观察能力内嵌到数据本身，不再和Vie… [`references/应用内状态变量迁移.md`](<references/应用内状态变量迁移.md>)
- **应用内状态管理和其他常见问题** — 本文将介绍应用内状态管理的常见问题以及其他常见问题。 #### 在并发线程中使用ArkUI装饰器导致报错 #### 懒加载包含装饰器的文件 状态管理装饰器仅限于在UI线程使用，不允许在未加载ArkUI框架的 并发线程 中使用。由于并发线程未加载完整的ArkUI框架逻辑，因此框架中定义的状态管理装饰器也不会被加载到并发线程中。若在并发线程中使用状态管理装饰器，… [`references/应用内状态管理和其他常见问题.md`](<references/应用内状态管理和其他常见问题.md>)
- **应用启动页简介** — 启动页（Starting Window）是应用冷启动时显示的首个页面，在应用进程没有运行或者应用内容没有加载完成前，都将显示启动页。同时承载了应用展示品牌特性的功能，应用可以根据自己的设计配置资源，用于展示产品独特的标识，加强用户对产品的认知。 #### 启动页展示场景 应用展示启动页主要包括如下场景，建议应用在进行启动页设计时，同时考虑如下场景的显示效果。… [`references/应用启动页简介.md`](<references/应用启动页简介.md>)
- **应用声明支持智慧多窗** — 当应用需要智慧多窗的能力时，可以通过在 module.json5配置文件 中对应标签添加相关字段声明支持。 #### 声明支持悬浮窗 开发者可以通过在module.json5配置文件中 abilities标签 下的 **supportWindowMode** 属性增加“ **floating** ”字段或使用缺省值以声明应用支持悬浮窗。 ![](https:… [`references/应用声明支持智慧多窗.md`](<references/应用声明支持智慧多窗.md>)
- **应用布局适配智慧多窗** — 由于应用从全屏进入智慧多窗（悬浮窗/分屏）模式后，窗口尺寸、宽高比例会发生变化，所以需要开发者适配应用窗口在不同尺寸、不同比例下的自适应布局，以确保应用窗口在各种形态下都能呈现出最佳的视觉效果，提供更好的用户体验。 #### 悬浮窗的比例 不同设备支持悬浮窗的比例如下所示： ![](https://contentcenter-vali-drcn.dbankc… [`references/应用布局适配智慧多窗.md`](<references/应用布局适配智慧多窗.md>)
- **应用深浅色适配** — 当前系统存在深浅色两种显示模式，为了给用户更好的使用体验，应用应适配深浅色模式。从应用与系统配置关联的角度来看，适配深浅色模式可以分为下面两种情况： 应用跟随系统的深浅色模式 应用主动设置深浅色模式 #### 应用跟随系统的深浅色模式 1. 颜色适配 - 自定义资源实现 resources目录下增加深色模式限定词目录（命名为dark）并新建color.jso… [`references/应用深浅色适配.md`](<references/应用深浅色适配.md>)
- **开发应用沉浸式效果** — 典型应用全屏窗口UI元素包括顶部 状态栏 、应用界面和底部导航区域（根据用户设置可表现为 导航条 或三键导航），其中状态栏和导航区域，通常在沉浸式布局下称为避让区；避让区之外的区域称为安全区。开发应用沉浸式效果主要指通过调整状态栏、应用界面和底部导航区域的显示效果来减少状态栏、导航条或三键导航等系统界面的突兀感，从而使用户获得最佳的UI体验。 **图1** … [`references/开发应用沉浸式效果.md`](<references/开发应用沉浸式效果.md>)
- **弧形列表 (ArcList)（圆形屏幕推荐使用）** — 从API version 18开始支持弧形列表。弧形列表是一种专为圆形屏幕设备设计的特殊列表，它能够以结构化、可滚动的形式高效展示信息。具体用法可参考 ArcList 。 使用弧形列表可以通过在 ArcList 组件中按垂直方向线性排列子组件 ArcListItem ，可以为弧形列表中的每一项提供独立视图。此外，可以使用 循环渲染 来迭代一组列表项，或结合任… [`references/弧形列表 (ArcList)（圆形屏幕推荐使用）.md`](<references/弧形列表 (ArcList)（圆形屏幕推荐使用）.md>)
- **弧形按钮 (ArcButton)** — 从API version 18开始支持ArcButton。ArcButton是弧形按钮组件，推荐用于圆形屏幕。为用户提供强调、普通、警告等样式按钮。具体用法请参考 ArcButton 。 #### 创建按钮 ArcButton通过调用以下接口来创建。 ArcButton({ options: new ArcButtonOptions({ label: 'OK… [`references/弧形按钮 (ArcButton).md`](<references/弧形按钮 (ArcButton).md>)
- **弹出框层级管理** — ArkUI的弹出框节点都是直接挂载在根节点上，会根据层级从小到大依次挂载。根节点下，右边的弹出框节点会覆盖显示在左边的弹出框节点上，新创建的弹出框节点会根据层级大小插入到对应的位置，同一层级大小的弹窗节点按照创建的先后顺序进行挂载。 从API version 18开始，可以通过设置 levelOrder 参数来管理弹出框的显示顺序，确保层级较高的弹出框覆盖在… [`references/弹出框层级管理.md`](<references/弹出框层级管理.md>)
- **弹出框控制器** — ArkUI的弹出框控制器在绑定弹出框后，可提供对弹出框的操作能力，当前支持关闭功能。可以将控制器传入弹出框内容区域后进行操作。 从API version 18开始，可设置controller参数以绑定 DialogController 控制器，通过控制器能够操作弹出框。 #### 使用约束 目前 openCustomDialogWithController … [`references/弹出框控制器.md`](<references/弹出框控制器.md>)
- **弹出框概述** — 弹出框是一种模态窗口，通常用于在保持当前上下文环境的同时，临时展示用户需关注的信息或待处理的操作。用户需在模态弹出框内完成相关交互任务之后，才能退出模态模式。弹出框可以不与任何组件绑定，其内容通常由多种组件组成，如文本、列表、输入框、图片等，以实现布局。ArkUI当前提供了 **自定义** 和 **固定样式** 两类弹出框组件。 - **自定义弹出框：**开… [`references/弹出框概述.md`](<references/弹出框概述.md>)
- **弹出框焦点策略** — ArkUI的弹出框焦点策略可以设定是否中断用户当前操作，并聚焦到新弹出的弹出框。若设定弹出框不获取焦点，则新弹出时不会中断用户当前操作，例如，当用户正在文本框中输入内容时，新弹出的弹出框不会关闭软键盘，焦点仍保留在文本框中。 从API version 19开始，可以通过设置 focusable 参数来管理弹出框是否获取焦点。 #### 使用约束 openCu… [`references/弹出框焦点策略.md`](<references/弹出框焦点策略.md>)
- **弹出框蒙层控制** — 开发者对弹出框的定制不仅限于弹出框里的内容，对弹出框蒙层的定制需求也逐渐增加。本文介绍ArkUI弹出框的蒙层控制，包括点击蒙层时是否消失、蒙层区域、蒙层颜色和蒙层动画等特性。 #### 使用约束 ArkUI提供多种弹出框，不同类型的弹出框具备不同的蒙层定制能力。详情请参阅下表： ![](https://contentcenter-vali-drcn.dban… [`references/弹出框蒙层控制.md`](<references/弹出框蒙层控制.md>)
- **弹性布局 (Flex)** — 弹性布局（ Flex ）提供更加有效的方式对容器中的子元素进行排列、对齐和分配剩余空间。常用于页面头部导航栏的均匀分布、页面框架的搭建、多行数据的排列等。 容器默认存在主轴与交叉轴，子元素默认沿主轴排列，子元素在主轴方向的尺寸称为主轴尺寸，在交叉轴方向的尺寸称为交叉轴尺寸。 **图1** 主轴为水平方向的Flex容器示意图 ![](https://conte… [`references/弹性布局 (Flex).md`](<references/弹性布局 (Flex).md>)
- **弹窗概述** — 弹窗一般指打开应用时自动弹出或者用户行为操作时弹出的UI界面，用于短时间内展示用户需关注的信息或待处理的操作。 从ArkUI组件树层级上来看，Overlay浮层、弹窗、模态、带Order的Overlay浮层都挂载在Root节点下。弹窗、模态、带Order的Overlay浮层根据设置的层级（数字大小）进行逐层显示，并且全部显示在Overlay浮层上面。如图所示… [`references/弹窗概述.md`](<references/弹窗概述.md>)
- **弹窗组件常见问题** — 本文档介绍弹窗组件的常见问题并提供参考。 #### bindPopup设置placement属性不生效 **问题现象** 通过 Popup控制 设置 placement 属性后，气泡未显示在预期的位置。 **可能原因** Popup气泡的默认显示区域是绑定组件以外的窗口区域，框架内部会根据可用空间自动调整气泡位置，而非严格按照开发者设置的placement位… [`references/弹窗组件常见问题.md`](<references/弹窗组件常见问题.md>)
- **弹簧曲线** — 阻尼弹簧曲线（以下简称弹簧曲线）对应的阻尼弹簧系统中，偏离平衡位置的物体一方面受到弹簧形变产生的反向作用力，被迫发生振动。另一方面，阻尼的存在为物体振动提供阻力。除阻尼为0的特殊情况，物体在振动过程中振幅不断减小，且最终趋于0，其轨迹对应的动画曲线自然连续。 采用弹簧曲线的动画在达终点时动画速度为0，不会产生动画“戛然而止”的观感，以避免影响用户体验。 Ar… [`references/弹簧曲线.md`](<references/弹簧曲线.md>)
- **形状裁剪（clipShape）** — 可利用 clipShape 接口将组件裁剪为所需的形状。调用该接口后，可以保留该形状覆盖的组件部分，同时移除组件的其余部分。裁剪形状本身是不可见的。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/ZPWqg_V3S5yY-Fq… [`references/形状裁剪（clipShape）.md`](<references/形状裁剪（clipShape）.md>)
- **循环渲染迁移** — 本文档主要介绍组件循环渲染从V1向V2的迁移，涉及如下渲染控制组件。 #### ForEach迁移Repeat 状态管理V2推荐使用Repeat替代ForEach。 ForEach使用示例请参考 数据源数组项子属性变化 。对应在V2中，ForEach迁移Repeat示例代码参考如下。 Repeat需要和状态管理V2一起使用，状态管理V2提供了@Observe… [`references/循环渲染迁移.md`](<references/循环渲染迁移.md>)
- **感知组件可见性** — 组件可见性是指组件在屏幕上的显示状态，通过感知可见性，应用能够实现以下典型场景： - 组件曝光统计与分析（例如，统计广告组件在屏幕上的显示时长）； - 资源按需加载与释放（例如，组件不可见时，释放组件使用的图片、视频等资源）； - 感知复杂视图切换（例如，在多层视图嵌套情况下，依据组件的显示状态，处理相关逻辑）。 针对上述场景，建议按照以下策略进行选择： 应… [`references/感知组件可见性.md`](<references/感知组件可见性.md>)
- **手势事件** — 手势表示由单个或多个事件识别的语义动作（例如：触摸、点击和长按）。一个完整的手势也可能由多个事件组成，对应手势的生命周期。支持的事件有： **触摸** - touchstart：手指触摸动作开始。 - touchmove：手指触摸后移动。 - touchcancel：手指触摸动作被打断，如来电提醒、弹窗。 - touchend：手指触摸动作结束。 **点击*… [`references/手势事件.md`](<references/手势事件.md>)
- **手势冲突处理** — 手势冲突是指多个手势识别器在同一组件或重叠区域同时识别时产生竞争，导致识别结果不符合预期。常见冲突场景包括： - 同一组件上的多手势（如按钮同时添加点击与长按手势）。 - 父子组件的同类型手势识别器。 - 系统默认手势与自定义手势（如Scroll滑动手势与子组件点击手势冲突）。 干预手势处理可有效解决冲突，除控制组件响应热区和命中测试模式外，主要通过以下三种… [`references/手势冲突处理.md`](<references/手势冲突处理.md>)
- **拖拽事件** — ArkUI开发框架针对拖拽事件提供了 NODE_ON_PRE_DRAG ， NODE_ON_DRAG_START ， NODE_ON_DROP ， NODE_ON_DRAG_ENTER ， NODE_ON_DRAG_MOVE ， NODE_ON_DRAG_LEAVE ， NODE_ON_DRAG_END 等组件事件，当拖拽在不同的阶段时会触发对应的组件事件，… [`references/拖拽事件.md`](<references/拖拽事件.md>)
- **按钮 (Button)** — Button是按钮组件，通常用于响应用户的点击操作，其类型包括胶囊按钮、圆形按钮、普通按钮、圆角矩形按钮。Button作为容器使用时可以通过添加子组件实现包含文字、图片等元素的按钮。具体用法请参考 Button 。 #### 创建按钮 Button通过调用接口来创建，接口调用有以下两种形式： - 通过label和 ButtonOptions 创建不包含子组件… [`references/按钮 (Button).md`](<references/按钮 (Button).md>)
- **按钮与选择组件常见问题** — 本文档介绍按钮与选择组件的常见问题并提供参考。 #### Slider组件滑块与滑轨是如何对齐的 Slider的滑块与滑轨显示样式 SliderStyle 有三种，其中SliderStyle.OutSet与SliderStyle.InSet存在滑块。Slider的滑动条进度为最小值时，滑块对齐方式如下： SliderStyle.OutSet模式下，滑块的中心… [`references/按钮与选择组件常见问题.md`](<references/按钮与选择组件常见问题.md>)
- **接入ArkTS页面** — 使用NDK接口构建UI界面时，需要在ArkTS页面创建用于挂载NDK接口创建组件的占位组件。占位组件类型为 ContentSlot ，ContentSlot能够绑定一个 NodeContent 对象，该对象可通过Node-API传递到Native侧挂载显示Native组件。 - NDK配置文件entry/src/main/cpp/types/libentry… [`references/接入ArkTS页面.md`](<references/接入ArkTS页面.md>)
- **支持游戏手柄输入事件** — 从API version 15开始，支持使用游戏手柄作为输入设备。当用户使用手柄进行操作时，系统会识别其输入行为并上报为按键事件或焦点轴事件。开发者可以通过注册相应的回调函数，接收并处理这些事件，进而实现与游戏手柄的交互逻辑。 由于不同品牌和型号的手柄在硬件设计与信号输出上存在差异，其上报的键值和轴值可能并不统一，开发者在处理交互逻辑时应注意进行兼容性适配。… [`references/支持游戏手柄输入事件.md`](<references/支持游戏手柄输入事件.md>)
- **支持焦点处理** — **焦点、焦点链和走焦** - 焦点：指向当前应用界面上唯一的一个可交互元素，当用户使用键盘、电视遥控器、车机摇杆/旋钮等非指向性输入设备与应用程序进行间接交互时，基于焦点的导航和交互是重要的输入手段。 - 焦点链：在应用的组件树形结构中，当一个组件获得焦点时，从根节点到该组件节点的整条路径上的所有节点都会处于焦点状态，形成一条连续的焦点链。 - 走焦：指焦… [`references/支持焦点处理.md`](<references/支持焦点处理.md>)
- **支持统一拖拽** — 统一拖拽提供了一种通过鼠标或手势触屏传递数据的机制，即从一个组件位置拖出（drag）数据并将其拖入（drop）到另一个组件位置，以触发响应。在这一过程中，拖出方提供数据，而拖入方负责接收和处理数据。这一操作使用户能够便捷地移动、复制或删除指定内容。 #### 基本概念 - 拖拽操作：在可响应拖出的组件上长按并滑动以触发拖拽行为，当用户释放手指或鼠标时，拖拽操… [`references/支持统一拖拽.md`](<references/支持统一拖拽.md>)
- **支持表冠输入事件** — 表冠事件从API version 18开始支持，是指通过旋转表冠触发的事件，通过硬件采样频率上报旋转角度的变化。 表冠事件分发依赖于应用内组件焦点，只有拥有焦点的组件才能接收到该事件。因此，接收此事件的组件应正确管理其焦点状态，并通过 onFocus 和 onBlur 接口监听自身焦点状态变化。当正在接收表冠事件的组件失焦时，接下来的表冠事件都不会再发送给这… [`references/支持表冠输入事件.md`](<references/支持表冠输入事件.md>)
- **支持触屏输入事件** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/72/v3/m8ls-9WlTCWsisa0Jm2B_g/zh-cn_image_0000002543373638.png?HW-CC-KV=V1&HW-CC-Date=20260421T11… [`references/支持触屏输入事件.md`](<references/支持触屏输入事件.md>)
- **支持触控板输入事件** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/rlFpIXpsQZWRCtJ7MD15yQ/zh-cn_image_0000002543213980.png?HW-CC-KV=V1&HW-CC-Date=20260421T11… [`references/支持触控板输入事件.md`](<references/支持触控板输入事件.md>)
- **支持适老化** — 系统字体被放大后，应用应确保整体布局不出现错乱，组件不出现重叠。可以根据业务需要限制跟随的字体最大档位、改变布局来更好的适配更大字体等。本文旨在指导应用如何跟随系统字体大小和跟随到的最大倍数。 #### 应用适配规则 - 在系统使用1.75倍及以上的大字体时，页面布局不得错乱，组件不得叠加，文字不得截断。 - 图标及图片不会随着字体的变大而变化。 - 页面中… [`references/支持适老化.md`](<references/支持适老化.md>)
- **支持键盘输入事件** — 物理按键产生的按键事件为非指向性事件，与触摸等指向性事件不同，其事件并没有坐标位置信息，所以其会按照一定次序向获焦组件进行派发，大多数文字输入场景下，按键事件都会优先派发给输入法进行处理，以便其处理文字的联想和候选词，应用可以通过 onKeyPreIme 提前感知事件。 ![](https://contentcenter-vali-drcn.dbankcdn… [`references/支持键盘输入事件.md`](<references/支持键盘输入事件.md>)
- **支持鼠标输入事件** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4/v3/0dxk6cweTBm0EWENLHzi6A/zh-cn_image_0000002573973867.png?HW-CC-KV=V1&HW-CC-Date=20260421T110… [`references/支持鼠标输入事件.md`](<references/支持鼠标输入事件.md>)
- **数据对象状态变量迁移** — 本文档主要介绍数据对象内的状态变量的迁移场景，包含以下场景： #### 各装饰器迁移示例 #### @ObjectLink/@Observed/@Track -> @ObservedV2/@Trace **迁移规则** 在V1中，@Observed与@ObjectLink装饰器用于观察类对象及其嵌套属性的变化，但V1只能观察对象的第一层属性。嵌套对象的属性需… [`references/数据对象状态变量迁移.md`](<references/数据对象状态变量迁移.md>)
- **数据对象状态管理常见问题** — 大型应用中需要封装大量的数据对象，数据对象内部状态变量的使用极大地影响开发者的开发效率，本文将介绍数据对象状态管理的常见问题及解决方案。 在状态管理中，类会被一层“代理”包装。当修改类的成员变量时，代理会拦截该操作并完成两项任务： - 同步更新数据源：确保原始数据被正确修改； - 触发UI刷新：通知所有依赖此变量的组件重新渲染。 开发者可以通过 getTar… [`references/数据对象状态管理常见问题.md`](<references/数据对象状态管理常见问题.md>)
- **文件组织** — JS FA应用的JS模块（entry/src/main/js/module）的典型开发目录结构如下： **图1** 目录结构 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/60/v3/LsMEPnrUQ3GECYY4LSeYSg/zh-c… [`references/文件组织.md`](<references/文件组织.md>)
- **文本显示 (Text/Span)** — Text是文本组件，用于展示用户视图，如显示文章的文字内容。该组件支持绑定自定义文本选择菜单，用户可根据需要选择不同功能。此外，还可以扩展自定义菜单，丰富可用选项，进一步提升用户体验。Span则用于展示行内文本。 具体用法请参考 Text 和 Span 组件的API文档。 常见问题请参考 文本显示（Text/Span）常见问题 。 #### 创建文本 Tex… [`references/文本显示 (Text_Span).md`](<references/文本显示 (Text_Span).md>)
- **文本概述** — 文本包含用户输入的信息、呈现的文本内容和小图标，这些元素共同构建了用户与系统间的交互界面，提升了操作的便捷性与信息展示的直观性。 开发者可根据实际应用场景选择合适的文本组件进行页面开发。 #### 文本显示 主要用于显示静态文本。开发者可以使用Text组件配合Span组件创建文本节点，也可以使用属性字符串（ StyledString / MutableSty… [`references/文本概述.md`](<references/文本概述.md>)
- **文本输入 (TextInput/TextArea/Search)** — TextInput、TextArea是输入框组件，用于响应用户输入，比如评论区的输入、聊天框的输入、表格的输入等，也可以结合其它组件构建功能页面，例如登录注册页面。具体用法请参考 TextInput 和 TextArea 组件的API文档。Search是特殊的输入框组件，称为搜索框，默认样式包含搜索图标。具体用法请参考 Search 组件的API文档。 ![… [`references/文本输入 (TextInput_TextArea_Search).md`](<references/文本输入 (TextInput_TextArea_Search).md>)
- **旋转屏动画** — 旋转屏动画主要分为两类： 布局切换的旋转屏动画 和 透明度变化的旋转屏动画 ，旨在实现屏幕显示方向变化时的自然过渡。布局切换的旋转屏动画实现较为简便，例如在module.json5中配置自动旋转（或设置窗口显示方向）即可实现。而透明度变化的旋转屏动画则需在module.json5配置的基础上，预备两套视图，在屏幕旋转时，通过视图切换，使消失的视图呈现渐隐效果… [`references/旋转屏动画.md`](<references/旋转屏动画.md>)
- **无障碍开发指导** — 无障碍服务是为保障所有人在任何情况下都能平等、便捷地获取和利用信息打造的系统级无障碍能力体系。其中为视障用户提供的屏幕朗读功能会将设备屏幕上的可见信息转化为语音播报，助力视障用户使用电子设备完成信息的获取和交互。 #### 屏幕朗读 屏幕朗读可帮助视障用户在无需查看屏幕的情况下操作设备。 开启屏幕朗读 后，用户通过无障碍手势控制焦点移动，设备将实时语音播报焦… [`references/无障碍开发指导.md`](<references/无障碍开发指导.md>)
- **显示图片 (Image)** — 开发者经常需要在应用中显示一些图片，例如：按钮中的icon、网络图片、本地图片等。在应用中显示图片需要使用Image组件实现，Image支持多种图片格式，包括png、jpg、jpeg等格式，不支持apng和svga格式，具体支持格式和用法请参考 Image 组件。 Image通过调用接口来创建，接口调用形式如下： Image(src: PixelMap | … [`references/显示图片 (Image).md`](<references/显示图片 (Image).md>)
- **智慧多窗简介** — 智慧多窗是一种多任务处理解决方案，它允许用户在同一时间、同一屏幕上以悬浮窗、分屏或全景多窗的方式同时运行多个应用窗口。在智慧多窗的显示模式下，用户可以根据自己的需求，合理安排应用窗口的位置和大小。 #### 悬浮窗 悬浮窗是一种在设备屏幕上悬浮的非全屏应用窗口。一般用于在已有全屏任务运行的基础上，临时处理另一个任务，或短时间多任务并行使用。如浏览网页的同时回… [`references/智慧多窗简介.md`](<references/智慧多窗简介.md>)
- **构建弹窗** — 可以通过创建弹窗控制器和创建自定义弹窗的内容对象两种方法显示自定义弹窗，设置其样式和内容。 通过创建弹窗控制器显示自定义弹窗 ：在命名为ArkUI_NativeDialogAPI_x （x表示版本）的结构体中，定义了弹窗接口集合，用于实现各种弹窗控制。 通过创建自定义弹窗的内容对象显示自定义弹窗 ：该方式下的弹窗接口在 native_dialog.h 的函数… [`references/构建弹窗.md`](<references/构建弹窗.md>)
- **构建渲染节点** — 从API version 20开始，ArkUI开发框架针对NDK接口，提供了直接构建渲染节点的能力，包括节点树操作、属性设置及含动画的自定义绘制。开发者通过调用渲染节点相关能力，可以绕过 registerNodeCustomEvent 的测量布局过程，直接对节点进行绘制并调整其大小和位置。 - **渲染节点树操作相关的能力** ，例如 OH_ArkUI_Re… [`references/构建渲染节点.md`](<references/构建渲染节点.md>)
- **构建自定义组件** — ArkUI开发框架在NDK接口提供了自定义UI组件的能力，这些能力包括自定义测算，自定义布局和自定义绘制。开发者通过注册相关自定义回调事件接入ArkUI开发框架的布局渲染流程，这些事件需要使用 registerNodeCustomEvent 来进行声明，并通过 addNodeCustomEventReceiver 函数添加组件自定义事件的监听器，在该监听器的… [`references/构建自定义组件.md`](<references/构建自定义组件.md>)
- **查询和操作自定义节点** — NDK提供一系列节点查询、遍历、操作能力，通过使用以下接口，开发者可以高效地访问和操控节点。 以下场景基于 接入ArkTS页面 章节，创建前置工程。 #### 查询节点uniqueId及通过uniqueId获取节点信息 uniqueId是系统分配的唯一标识的节点Id。 从API version 20开始，使用 OH_ArkUI_NodeUtils_GetNo… [`references/查询和操作自定义节点.md`](<references/查询和操作自定义节点.md>)
- **栅格布局 (GridRow/GridCol)** — 栅格布局是一种通用的辅助定位工具，对移动设备的界面设计有较好的借鉴作用。主要优势包括： 1. 提供可循的规律：栅格布局可以为布局提供规律性的结构，解决多尺寸多设备的动态布局问题。通过将页面划分为等宽的列数和行数，可以方便地对页面元素进行定位和排版。 2. 统一的定位标注：栅格布局可以为系统提供一种统一的定位标注，保证不同设备上各个模块的布局一致性。这可以减少… [`references/栅格布局 (GridRow_GridCol).md`](<references/栅格布局 (GridRow_GridCol).md>)
- **栅格布局** — 栅格布局容器根节点，使用grid-row与grid-col进行栅格布局。API具体描述请参考 grid-container 。 #### 创建grid-container组件 在pages/index目录下的hml文件中创建一个grid-container组件，并添加 grid-row 子组件。 <!-- index.hml --> <div class="… [`references/栅格布局.md`](<references/栅格布局.md>)
- **检查页面布局** — inspector用于检查页面布局，通过双向定位功能帮助开发者在DevEco Studio中快速定位组件、修改属性和调试组件，以提高开发效率。 ArkUI获取当前显示页面中所有组件的信息，包括组件树的父子结构、尺寸、位置、样式、属性和状态。获取组件树信息后，生成并展示为Inspector组件树。DevEco Studio的使用具体可以参考 Inspector… [`references/检查页面布局.md`](<references/检查页面布局.md>)
- **模态转场** — 模态转场是新的界面覆盖在旧的界面上，旧的界面不消失的一种转场方式。 **表1** 模态转场接口 #### 使用bindContentCover构建全屏模态转场效果 bindContentCover 接口用于为组件绑定全屏模态页面，在组件出现和消失时可通过设置转场参数ModalTransition添加过渡动效。 1. 定义全屏模态转场效果 bindConten… [`references/模态转场.md`](<references/模态转场.md>)
- **模糊** — 动画效果可以丰富界面的细节，提升UI界面的真实感和品质感。例如，模糊和阴影效果可以让物体看起来更加立体，使得动画更加生动。ArkUI提供了丰富的效果接口，开发者可快速打造出精致、个性化的效果。本章主要介绍常用的模糊、阴影和色彩效果等接口。 模糊效果可以体现界面空间的纵深感，区分前后元素的层级关系。 ![](https://contentcenter-vali… [`references/模糊.md`](<references/模糊.md>)
- **气泡提示概述** — 气泡提示是一种用于给用户提供提示的弹窗，主要用于屏幕录制、信息弹出提醒等显示状态。 #### 使用场景 #### 规格约束 - Popup的弹出需要等待页面全部构建完成才能展示，因此show不能在页面构建中设置为true，否则会导致popup弹窗显示位置及形状错误。 - openPopup的弹出需要传入有效的TargetInfo，否则无法弹出气泡。 - 其他… [`references/气泡提示概述.md`](<references/气泡提示概述.md>)
- **气泡提示（Popup）** — Popup属性可绑定在组件上显示气泡弹窗提示，设置弹窗内容、交互逻辑和显示状态。主要用于屏幕录制、信息弹出提醒等显示状态。 气泡分为两种类型，一种是系统提供的气泡 PopupOptions ，一种是开发者可以自定义的气泡 CustomPopupOptions 。其中，PopupOptions通过配置primaryButton和secondaryButton来… [`references/气泡提示（Popup）.md`](<references/气泡提示（Popup）.md>)
- **添加交互** — 添加交互可以通过在组件上关联事件实现。本节将介绍如何用div、text、image组件关联click事件，构建一个如下图所示的点赞按钮。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a3/v3/jgDECP5iSyKt9Cditks7v… [`references/添加交互.md`](<references/添加交互.md>)
- **添加图片区域** — 添加图片区域通常用 image 组件来实现，使用的方法和 text 组件类似。 图片资源建议放在js\default\common目录下，common目录需自行创建，详细的目录结构见 目录结构 。代码示例如下： <!-- xxx.hml --> <image class="img" src="{{middleImage}}"></image> /* xxx.… [`references/添加图片区域.md`](<references/添加图片区域.md>)
- **添加容器** — 要将页面的基本元素组装在一起，需要使用容器组件。在页面布局中常用到三种容器组件，分别是div、list和tabs。在页面结构相对简单时，可以直接用div作为容器，因为div作为单纯的布局容器，可以支持多种子组件，使用起来更为方便。 #### List组件 当页面结构较为复杂时，如果使用div循环渲染，容易出现卡顿，因此推荐使用list组件代替div组件实现长… [`references/添加容器.md`](<references/添加容器.md>)
- **添加标题行和文本区域** — 实现标题和文本区域最常用的是基础组件text。text组件用于展示文本，可以设置不同的属性和样式，文本内容需要写在标签内容区，完整属性和样式信息请参考 text 。在页面中插入标题和文本区域的示例如下： <!-- xxx.hml --> <div class="container"> <text class="title-text">{{headTitle}… [`references/添加标题行和文本区域.md`](<references/添加标题行和文本区域.md>)
- **添加留言区域** — 留言框的功能为：用户输入留言后点击完成，留言区域即显示留言内容。用户点击右侧的删除按钮可删除当前留言内容并重新输入。 留言区域由div、text、input关联click事件实现。开发者可以使用input组件实现输入留言的部分，使用text组件实现留言完成部分，使用commentText的状态标记此时显示的组件（通过if属性控制）。在包含文本完成和删除的te… [`references/添加留言区域.md`](<references/添加留言区域.md>)
- **渲染控制概述** — ArkUI通过 自定义组件 的 build()函数 和 @Builder装饰器 中的声明式UI描述语句构建相应的UI。在声明式描述语句中开发者除了使用系统组件外，还可以使用渲染控制组件来辅助UI的构建，这些渲染控制组件包括控制组件是否显示的条件渲染组件和基于数组数据快速生成组件的循环渲染组件。 #### 基本概念 #### 全量加载&懒加载介绍 循环渲染数组… [`references/渲染控制概述.md`](<references/渲染控制概述.md>)
- **状态变量改变不触发组件刷新问题常用定位方法** — 在声明式UI编程框架中，状态管理的主要职责是：当状态变量改变时，触发其关联组件的刷新。所以在使用状态变量的过程中，最常见的问题就是组件不刷新。本文主要针对开发者在使用状态变量时遇到的不刷新问题，阐述以下两个方面。 - 如何定位状态变量不刷新的问题。 - 不刷新问题常见案例。 #### 定位状态变量不刷新问题的主要方法 状态变量触发UI刷新主要分为两步： - … [`references/状态变量改变不触发组件刷新问题常用定位方法.md`](<references/状态变量改变不触发组件刷新问题常用定位方法.md>)
- **状态管理V1和V2更新机制差异** — 状态管理V1使用代理观察数据，创建状态变量时，会同时创建一个数据代理观察者。该观察者可以感知代理变化，但无法精准观测到实际数据变化，V1状态管理存在以下限制： - 状态变量不能独立于UI存在，同一个数据被多个视图代理时，其中一个视图的更改不会通知其他视图更新。 - 只能感知对象属性第一层的变化，无法做到深度观测和深度监听。 - 在更改对象中属性场景下存在冗余… [`references/状态管理V1和V2更新机制差异.md`](<references/状态管理V1和V2更新机制差异.md>)
- **状态管理V1和V2混用指导（API version 19前）** — ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/81/v3/WyoGLs5RSZiy3EGLwSp0HA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110842Z&HW-CC-Ex… [`references/状态管理V1和V2混用指导（API version 19前）.md`](<references/状态管理V1和V2混用指导（API version 19前）.md>)
- **状态管理V1和V2混用指导（API version 19及之后）** — 为了帮助开发者顺利地向状态管理V2迁移，从API version 19开始，减少了对状态管理V1和V2混用场景的约束。具体变更可参考 限制条件 。同时提供新的方法 enableV2Compatibility 和 makeV1Observed 来帮助开发者解决在迁移过程中遇到的混用问题。 ![](https://contentcenter-vali-drcn.… [`references/状态管理V1和V2混用指导（API version 19及之后）.md`](<references/状态管理V1和V2混用指导（API version 19及之后）.md>)
- **状态管理原理介绍** — 本文将介绍状态管理的基本原理。状态管理的核心逻辑是处理状态变量、自定义组件和系统组件之间的绑定关系。其工作流程可以概括为两个核心阶段：收集依赖和触发更新。 #### 收集依赖 收集依赖是指建立状态变量与组件之间的数据绑定关系。在UI渲染时，状态管理框架会“观察”哪些状态变量被读取了，并记录下这个“依赖关系”。一个UI界面上可能使用了多个状态变量，在修改状态变… [`references/状态管理原理介绍.md`](<references/状态管理原理介绍.md>)
- **状态管理术语** — 状态管理框架使用类属性装饰器可以实现对类对象中属性的观测能力，当属性发生变化时，只刷新该属性绑定的组件，其他未发生变化的属性绑定的组件将不会被连带刷新。 #### D #### 数据源/同步源（Data Source） 状态变量的原始来源，可以同步给不同的状态数据。通常为父组件传给子组件的数据。 #### 深度监听（Deep Monitor） @Monito… [`references/状态管理术语.md`](<references/状态管理术语.md>)
- **状态管理概述** — 在前文的描述中，构建的页面主要为静态界面。如果要构建一个动态的、有交互的界面，就需要引入“状态”的概念。 **图1** 效果图 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ad/v3/5s0Vzft_R56-6dAm43XYIg/zh-… [`references/状态管理概述.md`](<references/状态管理概述.md>)
- **生命周期** — 在app.js中可以定义如下应用生命周期函数： #### 页面生命周期 在页面JS文件中可以定义如下页面生命周期函数： 生命周期函数的一般调用顺序如下所示： **图1** 生命周期函数调用顺序图示 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100… [`references/生命周期.md`](<references/生命周期.md>)
- **画中画常见问题** — 开发者需要实现多个视频流播放，可以通过自定义节点将视频流封装为NodeController，创建画中画时配置为自定义节点 customUIController ，实现多个视频流播放 。 #### 画中画如何实现节点切换 开发者可以使用画中画typeNode方案，typeNode方案支持通过 updateContentNode 方法更新画中画节点。 #### … [`references/画中画常见问题.md`](<references/画中画常见问题.md>)
- **画中画开发概述** — 应用在视频播放、视频会议、视频通话等场景下，可以使用画中画能力将视频内容以小窗（画中画）模式呈现。切换为小窗（画中画）模式后，用户可以进行其他界面操作，提升使用体验。 画中画的常见使用场景有以下几种： - 视频播放。 - 视频通话。 - 视频会议。 - 直播。 系统提供以下三种画中画功能的开发方式： - 使用XComponent实现画中画功能开发 ：适用于应… [`references/画中画开发概述.md`](<references/画中画开发概述.md>)
- **监听组件事件** — NDK接口针对UI组件的事件，提供了监听函数的方式。首先，可使用 addNodeEventReceiver 函数添加组件事件的监听器，该监听器会监听该组件上发生的所有事件，例如：点击事件、焦点事件。然后，可使用 registerNodeEvent 函数声明组件的哪些事件需要监听，NDK接口支持的事件范围通过 ArkUI_NodeEventType 枚举值定义… [`references/监听组件事件.md`](<references/监听组件事件.md>)
- **监听组件布局和绘制送显事件** — 从API version 16开始，NDK接口针对UI组件的布局或绘制送显完成，提供了注册与取消监听函数的方式。开发者可使用如下接口监听指定节点布局完成或者绘制送显完成的时机，并注册相应的回调函数。可使用 OH_ArkUI_RegisterLayoutCallbackOnNodeHandle 注册组件布局完成的回调方法。可使用 OH_ArkUI_Regist… [`references/监听组件布局和绘制送显事件.md`](<references/监听组件布局和绘制送显事件.md>)
- **监听输入框事件** — 输入框包含多种交互行为，开发者可注册事件监听并获取状态。 要实现实时搜索功能，可注册 NODE_TEXT_AREA_ON_CHANGE 事件，输入框文本发生变化时会收到通知，并能获取当前文本内容。 要实现文字过滤功能，可注册 NODE_TEXT_AREA_ON_WILL_INSERT 事件，在文字即将插入前会收到通知，通过返回值控制文字是否插入。 要实现用户… [`references/监听输入框事件.md`](<references/监听输入框事件.md>)
- **相对布局 (RelativeContainer)** — 在应用的开发过程中，经常需要设计复杂界面，此时涉及到多个相同或不同组件之间的嵌套。如果布局组件嵌套深度过深，或者嵌套组件数过多，会带来额外的开销。如果在布局的方式上进行优化，就可以有效的提升性能，减少时间开销。 RelativeContainer是一种采用相对布局的容器，支持容器内部的子元素设置相对位置关系，适用于处理界面复杂的场景，对多个子元素进行对齐和排… [`references/相对布局 (RelativeContainer).md`](<references/相对布局 (RelativeContainer).md>)
- **窗口元数据配置** — 该标签标识HAP的自定义元信息，标签值为数组类型，包含name、value、resource三个子标签。 **表1** metadata标签说明 下面给出几种metadata标签的使用场景及示例，开发者也可以根据实际需求自定义设置。 1. 使用metadata标签配置主窗口的默认大小和位置（单位为vp）。其中name取值及对应含义如下： - name取值为o… [`references/窗口元数据配置.md`](<references/窗口元数据配置.md>)
- **窗口开发常见问题** — **解决措施** 应用A调用 on('windowStageEvent') 接口监听 WindowStageEvent.ACTIVE 事件后调用 startAbility 接口拉起应用B。 **代码示例** // applicationA EntryAbility.ts import { UIAbility } from '@kit.AbilityKit';… [`references/窗口开发常见问题.md`](<references/窗口开发常见问题.md>)
- **窗口开发术语** — 窗口有系统窗口、应用窗口两种分类。 #### 系统窗口 系统窗口指完成系统特定功能的窗口。如音量条、壁纸、通知栏、状态栏、导航栏等。 系统窗口仅系统应用可用。 #### 应用窗口 应用窗口区别于系统窗口，指与应用显示相关的窗口，用来显示应用的内容。根据管理方式和用途的不同，应用窗口又可以分为主窗口、辅助窗口两种类型。 - 主窗口 主窗口由UIAbility创… [`references/窗口开发术语.md`](<references/窗口开发术语.md>)
- **窗口开发概述** — 窗口模块用于在同一块物理屏幕上，提供多个应用界面显示、交互的机制。 - 对应用开发者而言，窗口模块提供了界面显示和交互能力。 - 对终端用户而言，窗口模块提供了控制应用界面的方式。 - 对整个操作系统而言，窗口模块提供了不同应用界面的组织管理逻辑。 #### 窗口模块的用途 在HarmonyOS中，窗口模块主要负责以下职责： - **提供应用和系统界面的窗口… [`references/窗口开发概述.md`](<references/窗口开发概述.md>)
- **窗口旋转** — 移动设备在用户手中可以任意改变握持方向。在特定场景下，应用需要根据用户握持的方向调整显示页面，或者主动指定在固定方向显示页面，以提供更好的用户体验。比如，双手操作的游戏更倾向于在横屏显示，视频类应用更倾向于在全屏播放和小窗播放间自由切换。 提供了横竖屏旋转功能，可满足应用开发者设置应用不同方向的显示策略。 设备有四个显示方向：当用户正向握持设备时，若屏幕的宽… [`references/窗口旋转.md`](<references/窗口旋转.md>)
- **管理应用拥有的状态概述** — 在管理组件拥有的状态章节中介绍的装饰器仅能在页面内，即一个组件树上共享状态变量。如果开发者要实现应用级的，或者多个页面的状态数据共享，就需要用到应用级别的状态管理的概念。ArkTS根据不同特性，提供了多种应用状态管理的能力： - LocalStorage ：页面级UI状态存储，通常用于 UIAbility 内、页面间的状态共享。 - AppStorage ：… [`references/管理应用拥有的状态概述.md`](<references/管理应用拥有的状态概述.md>)
- **管理应用窗口（FA模型）** — 窗口沉浸式能力：指对状态栏、导航栏等系统窗口进行控制，减少状态栏导航栏等系统界面的突兀感，从而使用户获得最佳体验的能力。 沉浸式能力只在应用主窗口作为全屏窗口时生效。通常情况下，应用子窗口（弹窗、悬浮窗口等辅助窗口）和处于自由窗口下的应用主窗口无法使用沉浸式能力。 ![](https://contentcenter-vali-drcn.dbankcdn.cn… [`references/管理应用窗口（FA模型）.md`](<references/管理应用窗口（FA模型）.md>)
- **管理应用窗口（Stage模型）** — - 窗口沉浸式能力：指对状态栏、导航栏等系统窗口进行控制，减少状态栏导航栏等系统界面的突兀感，从而使用户获得最佳体验的能力。沉浸式能力只在应用主窗口作为全屏窗口时生效。通常情况下，应用的辅助窗口（子窗、全局悬浮窗等）和处于自由窗口下的应用主窗口无法使用沉浸式能力。 - 全局悬浮窗：全局悬浮窗是一种特殊的应用辅助窗口，具备在应用主窗口和对应Ability退至后… [`references/管理应用窗口（Stage模型）.md`](<references/管理应用窗口（Stage模型）.md>)
- **管理软键盘** — 软键盘是用户交互的重要途径，提供文本输入功能。本文介绍在使用系统输入框组件（ TextInput 、 TextArea 、 Search 、 RichEditor ）时，如何控制软键盘的弹出和收起。 #### 弹出软键盘 默认情况下，当焦点转移到输入框时，软键盘将自动弹出。 焦点转移到输入框的方法主要有： 1. 人机交互获得焦点，例如：单击、双击、长按输入框… [`references/管理软键盘.md`](<references/管理软键盘.md>)
- **粒子动画** — 粒子动画 是通过在限定区域内随机生成大量粒子的运动，进而组合成的动画效果，通过Particle组件来实现。动画的基本构成元素为单个粒子，这些粒子可以表现为圆点或图片等形式。开发者能够通过对粒子在颜色、透明度、大小、速度、加速度、自旋角度等多个维度上的动态变化做动画，以营造特定的氛围，例如模拟下雪场景时，飘舞的雪花实际上是由一个个雪花粒子的动画效果所构成。 粒… [`references/粒子动画.md`](<references/粒子动画.md>)
- **线性布局 (Row/Column)** — 线性布局（LinearLayout）是开发中最常用的布局，通过线性容器 Row 和 Column 构建。线性布局是其他布局的基础，其子元素在线性方向上（水平方向和垂直方向）依次排列。线性布局的排列方向由所选容器组件决定，Row容器内子元素按照水平方向排列，Column容器内子元素按照垂直方向排列。根据不同的排列方向，开发者可选择使用Row或Column容器创… [`references/线性布局 (Row_Column).md`](<references/线性布局 (Row_Column).md>)
- **组件介绍** — 组件（Component）是构建页面的核心，每个组件通过对数据和方法的简单封装，实现独立的可视、可交互功能单元。组件之间相互独立，随取随用，也可以在需求相同的地方重复使用。 开发者还可以通过组件间合理的搭配定义满足业务需求的新组件，减少开发量，自定义组件的开发方法请参见 自定义组件 。 #### 组件分类 根据组件的功能，可以分为以下六大类： [`references/组件介绍.md`](<references/组件介绍.md>)
- **组件内状态变量迁移** — 本文档主要介绍组件内的状态变量的迁移场景，包含以下场景： #### 各装饰器迁移示例 #### @State -> @Local **迁移规则** 在V1中，@State装饰器用于装饰组件内部的状态变量，在V2中提供了@Local作为其替代能力，但两者在观察能力和初始化规则上存在明显差异。针对不同的使用场景，迁移策略如下： - 简单类型：对于简单类型的变量，… [`references/组件内状态变量迁移.md`](<references/组件内状态变量迁移.md>)
- **组件内状态管理常见问题** — 在ArkUI应用开发中，组件内状态管理的合理使用直接影响应用的性能和开发效率。然而，开发者在实践中常因更新机制理解不足，导致组件行为异常或渲染效率下降。本文将介绍组件内状态管理的常见问题与解决方案。 #### build函数中更改状态变量导致appfreeze 不允许在build里改变状态变量，状态管理框架会在运行时报出Error级别日志。通过事件回调或异步… [`references/组件内状态管理常见问题.md`](<references/组件内状态管理常见问题.md>)
- **组件动画** — 在组件上创建和运行动画的快捷方式。具体用法请参考 通用方法 。 #### 获取动画对象 通过调用animate方法获得animation对象，animation对象支持动画属性、动画方法和动画事件。 <!-- xxx.hml --> <div class="container"> <div id="content" class="box" onclick="… [`references/组件动画-1.md`](<references/组件动画-1.md>)
- **组件动画** — ArkUI为组件提供了通用的属性动画和转场动画能力的同时，还为一些组件提供了默认的动画效果。例如， List 的滑动动效、 Button 的点击动效，是组件自带的默认动画效果。在组件默认动画效果的基础上，开发者还可以通过属性动画和转场动画对容器组件内的子组件动效进行定制。 #### 使用组件默认动画 组件默认动效具备以下功能： - 提示用户当前状态，例如用户… [`references/组件动画.md`](<references/组件动画.md>)
- **组件复用迁移** — 本文档主要介绍组件复用从V1向V2的迁移，涉及如下装饰器。 #### @Reusable->@ReusableV2迁移规则 #### V1->V2组件迁移 **迁移规则** - 将@Component装饰的父自定义组件迁移至@ComponentV2装饰。 - 将@Reusable装饰的子自定义组件迁移为@ReusableV2装饰。 - 涉及组件内状态变量的迁… [`references/组件复用迁移.md`](<references/组件复用迁移.md>)
- **组件导航和页面路由概述** — 页面是指由布局、组件、交互逻辑等构成的可视化交互单元，承载着特定功能逻辑与信息展示，是用户与应用进行操作交互的核心界面载体。一个完整的应用往往由多个页面组成，组件导航（Navigation）和页面路由（@ohos.router）均提供了应用内的页面跳转能力。 - 在组件导航（Navigation）框架下，“页面”通过NavDestination组件承载，特指… [`references/组件导航和页面路由概述.md`](<references/组件导航和页面路由概述.md>)
- **组件扩展概述** — ArkUI使用@Builder装饰器为开发者提供代码精简方案。该装饰器通过模块化封装简化UI开发流程，并衍生出@BuilderParam、@LocalBuilder装饰器和wrapBuilder机制，构成可复用的UI结构体系。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAll… [`references/组件扩展概述.md`](<references/组件扩展概述.md>)
- **组合手势** — 组合手势由多种单一手势组合而成，通过在 GestureGroup 中使用不同的 GestureMode 来声明该组合手势的类型，支持 顺序识别 、 并行识别 和 互斥识别 三种类型。 GestureGroup(mode:GestureMode, gesture:GestureType[]) - mode：为GestureMode枚举类。用于声明该组合手势的类… [`references/组合手势.md`](<references/组合手势.md>)
- **绑定全模态页面（bindContentCover）** — 全模态页面（bindContentCover） 是全屏模态形式的弹窗交互页面，完全覆盖底层父视图。适用于查看大图，全屏查看文稿等场景。 #### 使用约束 全模态页面本质上是弹窗类组件，其交互层级默认为应用内顶层。 Navigation 导航转场时，新push的页面层级无法超出全模态，其效果仍然显示在模态页面之下。针对此类场景，建议将模态页面的内容迁移至转场… [`references/绑定全模态页面（bindContentCover）.md`](<references/绑定全模态页面（bindContentCover）.md>)
- **绑定半模态页面（bindSheet）** — 半模态页面（bindSheet） 默认是模态形式的非全屏弹窗式交互页面，允许部分底层父视图可见，帮助用户在与半模态交互时保留其父视图环境。 半模态页面适用于展示简单的任务或信息面板，例如，个人信息、文本简介、分享面板、创建日程、添加内容等。若需展示可能影响父视图的半模态页面，半模态支持配置为非模态交互形式。 半模态在不同宽度的设备上存在不同的形态能力，开发者… [`references/绑定半模态页面（bindSheet）.md`](<references/绑定半模态页面（bindSheet）.md>)
- **绑定手势事件** — ArkUI开发框架在NDK接口主要提供点击手势、滑动手势、快滑手势、长按手势、捏合手势和旋转手势，通过给指定的组件绑定不同的手势并设置相应的回调，实现期望的手势交互能力。 下面通过一个简单的示例来介绍如何实现手势绑定。 1. 创建一个Column节点，用于绑定手势。 // 创建Column节点 auto column = nodeAPI->createNod… [`references/绑定手势事件.md`](<references/绑定手势事件.md>)
- **绑定手势方法** — 通过给各个组件绑定不同的手势事件，并设计事件的响应方式，当手势识别成功时，ArkUI框架将通过事件回调通知组件手势识别的结果。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5d/v3/8KqSnaZKQUGyKUyjfFJ1EQ/not… [`references/绑定手势方法.md`](<references/绑定手势方法.md>)
- **绑定模态页面概述** — 模态页面是一种大面板交互式的弹窗，和其他弹窗组件一样，通常用于在保持当前的上下文环境时，临时展示用户需关注的信息或待处理的操作。相比于其他弹窗组件，模态页面的内容都需要开发者通过自定义组件来填充实现，可展示的视图往往也很大。默认需要用户进行交互才能够退出模态页面。ArkUI当前提供了 **半模态** 和 **全模态** 两类模态页面组件。 - **​半模态：… [`references/绑定模态页面概述.md`](<references/绑定模态页面概述.md>)
- **绘制几何图形 (Shape)** — 绘制组件用于在页面绘制图形，Shape组件是绘制组件的父组件，包含所有绘制组件的通用属性。具体用法请参考 Shape 。 #### 创建绘制组件 绘制组件可以由以下两种形式创建： - 绘制组件使用Shape作为父组件，实现类似SVG的效果。接口调用为以下形式： Shape(value?: PixelMap) 该接口用于创建带有父组件的绘制组件，其中value… [`references/绘制几何图形 (Shape).md`](<references/绘制几何图形 (Shape).md>)
- **绘制图形** — svg组件可以用来绘制常见图形和线段，如矩形（<rect>）、圆形（<circle>）、线条(<line>）等，具体支持图形样式还请参考 svg 组件。 在本场景中，绘制各种图形拼接成一个小房子。 <!-- xxx.hml --> <div class="container"> <svg width="1000" height="1000"> <polygo… [`references/绘制图形.md`](<references/绘制图形.md>)
- **绘制文本** — svg组件还可以绘制文本。 #### 文本 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/84/v3/DQ81PemHQY-m_Tit4rIttQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=202… [`references/绘制文本.md`](<references/绘制文本.md>)
- **绘制路径** — svg 组件绘制路径时，通过Path中的M（起点）、H（水平线）、a（绘制弧形到指定位置）路径控制指令，并填充颜色实现饼状图效果。 <!-- xxx.hml --> <div class="container"> <svg fill="#00FF00" x="100" y="400"> <path d="M300,200 h-150 a150 150 0 1… [`references/绘制路径.md`](<references/绘制路径.md>)
- **自定义占位节点** — ArkUI提供了系统组件 NodeContainer 和 ContentSlot 作为自定义节点的占位节点。主要用于自定义节点以及自定义节点树的显示。 NodeContainer 作为容器节点存在，具备通用属性，是UI节点。 ContentSlot 只是一个语法节点，无通用属性，不参与布局和渲染。支持混合模式开发，当容器是ArkTS组件，子组件在Native… [`references/自定义占位节点.md`](<references/自定义占位节点.md>)
- **自定义声明式节点 (BuilderNode)** — 自定义声明式节点 ( BuilderNode )提供能够挂载系统组件的能力，支持采用无状态的UI方式，通过 全局自定义构建函数 @Builder定制组件树。组件树的根 FrameNode 节点可通过 getFrameNode 获取，该节点既可直接由 NodeController 返回并挂载于 NodeContainer 节点下，亦可在FrameNode树与 … [`references/自定义声明式节点 (BuilderNode).md`](<references/自定义声明式节点 (BuilderNode).md>)
- **自定义属性动画** — 属性动画是指当可动画属性的参数值发生变化时，在UI上产生的连续视觉效果。当参数值连续变化，且设置到可以引起UI发生变化的属性接口上时，即可实现属性动画。 ArkUI提供 @AnimatableExtend装饰器 ，用于自定义可动画属性接口。由于参数的数据类型必须具备一定程度的连续性，自定义可动画属性接口的参数类型仅支持number类型和实现 Animatab… [`references/自定义属性动画.md`](<references/自定义属性动画.md>)
- **自定义扩展能力概述** — ArkUI框架提供一系列基于Modifier的自定义扩展能力，通过与UI分离的方式，对已有UI组件的属性、手势、内容进行扩展修改，以满足开发者在不改变UI组件底层实现的情况下，快速调整UI组件外观、行为等需求。自定义扩展包括 AttributeModifier 、 GestureModifier 、 ContentModifier 等。其中 Attribut… [`references/自定义扩展能力概述.md`](<references/自定义扩展能力概述.md>)
- **自定义渲染 (XComponent)** — XComponent组件作为一种渲染组件，可用于EGL/OpenGLES和媒体数据写入，通过使用XComponent持有的“ NativeWindow ”渲染画面，满足开发需要实现高级自定义渲染的需求，例如相机预览流的显示和游戏画面的渲染。开发者可通过指定XComponent组件的type字段来实现不同的渲染方式，分别为 XComponentType .SU… [`references/自定义渲染 (XComponent).md`](<references/自定义渲染 (XComponent).md>)
- **自定义渲染节点 (RenderNode)** — 对于不具备自己的渲染环境的三方框架，尽管已实现前端解析、布局及事件处理等功能，但仍需依赖系统的基础渲染和动画能力。 FrameNode 上的通用属性与通用事件对这类框架而言是冗余的，会导致多次不必要的操作，涵盖布局、事件处理等逻辑。 自定义渲染节点 ( RenderNode )是更加轻量的渲染节点，仅具备与渲染相关的功能。它提供了设置基础渲染属性的能力，以及… [`references/自定义渲染节点 (RenderNode).md`](<references/自定义渲染节点 (RenderNode).md>)
- **自定义组件** — 使用兼容JS的类Web开发范式的方舟开发框架支持自定义组件，用户可根据业务需求将已有的组件进行扩展，增加自定义的私有属性和事件，封装成新的组件，方便在工程中多次调用，提高页面布局代码的可读性。具体的封装方法示例如下： - 构建自定义组件 <!-- comp.hml --> <div class="item"> <text class="title-style… [`references/自定义组件.md`](<references/自定义组件.md>)
- **自定义组件冻结功能（V1）** — 自定义组件冻结功能专为优化复杂UI页面的性能而设计，尤其适用于包含多个页面栈、长列表或宫格布局的场景。当状态变量绑定多个UI组件时，其变化易触发大量组件刷新，导致界面卡顿与响应延迟。为提升这类高负载UI界面的刷新性能，建议开发者使用自定义组件冻结功能。 组件冻结功能是一种性能优化机制，它会冻结非激活状态下的组件的刷新能力。当组件处于非激活状态时，即使其绑定的… [`references/自定义组件冻结功能（V1）.md`](<references/自定义组件冻结功能（V1）.md>)
- **自定义组件冻结功能（V2）** — 当@ComponentV2装饰的自定义组件处于非激活状态时，状态变量将不响应更新，即 @Monitor 不会调用，状态变量关联的节点不会刷新。该冻结机制在复杂UI场景下能显著优化性能，避免非激活组件因状态变量更新进行无效刷新，从而减少资源消耗。通过freezeWhenInactive属性来决定是否使用冻结功能，不传参数时默认不使用。支持的场景有： 页面路由 … [`references/自定义组件冻结功能（V2）.md`](<references/自定义组件冻结功能（V2）.md>)
- **自定义组件成员属性访问限定符使用限制** — 在状态管理V1版本中，完成自定义组件封装后，调用方难以明确知晓应传入哪些变量作为组件的输入参数。当组件开发者不希望状态变量被外部初始化时，可以使用private限定符来限制当前变量不允许被外部初始化。外部初始化也需要遵循装饰器自身的规则，具体规则见 使用限制 。 ArkTS会对自定义组件的成员变量使用的访问限定符private/public/protecte… [`references/自定义组件成员属性访问限定符使用限制.md`](<references/自定义组件成员属性访问限定符使用限制.md>)
- **自定义组件生命周期** — 自定义组件生命周期，即用 @Component 或 @ComponentV2 装饰的自定义组件的生命周期，提供以下生命周期接口： - aboutToAppear ：组件即将出现时回调该接口，具体时机为在创建自定义组件的新实例后，在执行其build函数之前执行。 - onDidBuild ：在组件首次渲染触发的build函数执行完成之后回调该接口，后续组件重新… [`references/自定义组件生命周期.md`](<references/自定义组件生命周期.md>)
- **自定义组件生命周期（推荐）** — 已有的 自定义组件生命周期 回调函数触发只取决于事件的触发，在某些特定的情况下，会出现自定义组件生命周期回调函数的触发顺序不符合预期。比如： aboutToDisappear在特定情况下会误调用aboutToAppear、组件未展开被复用时，会误调用aboutToReuse 。新的自定义组件生命周期回调函数受 状态机 限制，生命周期回调函数调用时机符合预期。… [`references/自定义组件生命周期（推荐）.md`](<references/自定义组件生命周期（推荐）.md>)
- **自定义组件的自定义布局** — 如果系统提供的布局组件（如 Flex ， Column ， Row 等）无法满足复杂布局需求，或开发者希望自定义计算组件内子组件的大小和位置，建议在自定义组件中使用以下接口： - onMeasureSize ：组件每次布局时触发，开发者可以在这个回调中增加自定义组件内子组件的大小的计算逻辑，返回自定义组件的尺寸信息，其执行时间先于onPlaceChildre… [`references/自定义组件的自定义布局.md`](<references/自定义组件的自定义布局.md>)
- **自定义组件节点 (FrameNode)** — 对于拥有自定义前端的第三方框架（如JSON、XML、DOM树等），需将特定的DSL转换为ArkUI的声明式描述。如下图描述了JSON定义的前端框架和ArkUI声明式描述的对应关系。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/05/v3… [`references/自定义组件节点 (FrameNode).md`](<references/自定义组件节点 (FrameNode).md>)
- **自定义组合** — 自定义组合提供组件粒度的自定义能力，开发者可通过自定义组件组合已有组件来构建特定的符合业务逻辑的高级组件。组件组合的过程中可以使用布局容器和通用布局属性来对子组件进行自定义的位置排布，可以使用Canvas组件完成纯自绘，也可以使用Shape类组件，通过形状的组合，构建几何图形，实现带交互的图形动画。动画模块可针对不同类型的属性，实现灵活的动画效果。 ####… [`references/自定义组合.md`](<references/自定义组合.md>)
- **自定义绘制** — 当某些组件本身的绘制内容不满足需求时，可使用组件自定义绘制功能，在原有组件基础上部分绘制、或者全部自行绘制，以达到预期效果。例如：独特的按钮形状、文字和图像混合的图标等。NDK提供了自定义绘制节点的能力，通过自定义绘制事件，开发者可以实现基于NDK侧 ArkUI_NodeType 中ARKUI_NODE_CUSTOM类型节点的自绘制能力。 ![](https… [`references/自定义绘制.md`](<references/自定义绘制.md>)
- **自定义绘制修改器 (DrawModifier)** — 当某些组件本身的绘制内容不满足需求时，可使用组件自定义绘制功能，在原有组件基础上部分绘制、或者全部自行绘制，以达到预期效果。例如：独特的按钮形状、文字和图像混合的图标等。组件自定义绘制提供了自定义绘制修改器DrawModifier，来实现更自由的组件绘制。 #### 使用DrawModifier接口 declare class DrawModifier { … [`references/自定义绘制修改器 (DrawModifier).md`](<references/自定义绘制修改器 (DrawModifier).md>)
- **自定义能力概述** — 自定义能力是ArkUI开发框架提供的对UI界面进行开发和定制化的能力。ArkUI开发框架提供的不同控制层级的自定义能力用于实现不同场景的应用的开发。自定义能力的开放层次越低，表示越接近底层基础能力，开发的灵活程度越高，开发难度越高、对于开发者能力的要求也越高。 当前开放的自定义能力由低到高包括以下几个层次： - **自定义组合**：ArkUI框架提供的最基础… [`references/自定义能力概述.md`](<references/自定义能力概述.md>)
- **自定义节点常见问题** — 本文档介绍自定义节点的常见问题并提供参考。 #### 自定义组件的aboutToDisappear回调异常 **问题现象** 从API version 12开始，自定义节点的子节点在页面退出后未立即回调自定义组件的 aboutToDisappear 方法。自定义组件的aboutToDisappear通常在其销毁的时候触发，页面销毁后未立即回调则说明该自定义组… [`references/自定义节点常见问题.md`](<references/自定义节点常见问题.md>)
- **自定义节点概述** — 自定义节点是ArkUI通过接口提供的底层实体节点，具备部分基础能力，能够与系统组件混合显示。自定义节点的挂载与显示依赖于 自定义占位节点 。当前，自定义节点涵盖三类对象： FrameNode 、 RenderNode 和 BuilderNode 。FrameNode表示单个自定义组件节点，RenderNode表示为更轻量级的渲染节点，而BuilderNode… [`references/自定义节点概述.md`](<references/自定义节点概述.md>)
- **色彩** — 通过颜色渐变接口，可以设置组件的背景颜色渐变效果，实现在两个或多个指定的颜色之间进行平稳的过渡。 #### 为组件添加线性渐变效果 @Entry @Component struct LinearGradientDemo { build() { Grid() { GridItem() { Column() { Text('angle: 180') .fontS… [`references/色彩.md`](<references/色彩.md>)
- **菜单控制（Menu）** — Menu是菜单接口，一般用于鼠标右键弹窗、点击弹窗等。具体用法请参考 菜单控制 。 使用 bindContextMenu 并设置预览图，菜单弹出时有蒙层，此时为模态。 使用 bindMenu 或bindContextMenu未设置预览图时，菜单弹出无蒙层，此时为非模态。 #### 创建默认样式的菜单 菜单需要调用 bindMenu 接口来实现。bindMen… [`references/菜单控制（Menu）.md`](<references/菜单控制（Menu）.md>)
- **菜单概述** — 菜单是一种用于给用户提供可执行的操作的弹窗，一般用于鼠标右键弹窗、点击弹窗等。 #### 使用场景 #### 规格约束 - bindMenu通过调用isShow参数或bindContextMenu调用isShown参数弹出时，需要等待页面全部构建完成才能展示。因此isShow或isShown不能在页面构建中设置为true，否则会导致menu弹窗显示位置及形状… [`references/菜单概述.md`](<references/菜单概述.md>)
- **表单与选择组件概述** — 表单与选择组件用于构建页面的基础元素，如按钮、开关。开发者可以根据实际应用场景选择合适的表单与选择组件进行界面开发。 [`references/表单与选择组件概述.md`](<references/表单与选择组件概述.md>)
- **视频播放 (Video)** — Video组件用于播放视频文件并控制其播放状态，常用于短视频和应用内部视频的列表页面。当视频完整出现时会自动播放，用户点击视频区域则会暂停播放，同时显示播放进度条，通过拖动播放进度条指定视频播放到具体位置。具体用法请参考 Video 。 #### 创建视频组件 Video通过调用接口来创建，接口调用形式如下： Video(value: VideoOption… [`references/视频播放 (Video).md`](<references/视频播放 (Video).md>)
- **设置应用内主题换肤** — 对于采用ArkTS开发的应用，提供了应用内组件的主题换肤功能，支持局部的深浅色切换及动态换肤。目前，该功能只支持设置应用内主题换肤，暂不支持在UIAbility或窗口层面进行主题设置，同时也不支持C-API和Node-API。 #### 自定义主题色 当应用需要使用换肤功能时，应自定义主题颜色。 CustomTheme 用于自定义主题色的内容，其属性可选，仅… [`references/设置应用内主题换肤.md`](<references/设置应用内主题换肤.md>)
- **设置浮层（OverlayManager）** — 浮层（OverlayManager）用于在页面（Page）之上展示自定义的UI内容，位于Dialog、Popup、Menu、BindSheet、BindContentCover和Toast等组件之下，展示范围为当前窗口的安全区内，适用于常驻悬浮等场景。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2… [`references/设置浮层（OverlayManager）.md`](<references/设置浮层（OverlayManager）.md>)
- **设置自定义节点跨语言属性** — ArkUI支持在前端使用ArkTS语言创建命令式节点，即 FrameNode 节点，也可以在Native侧使用C语言创建命令式节点，并且可以混合使用两类节点构建页面。 针对上述场景，ArkUI提供命令式节点跨语言属性设置功能，即使用ArkTS语言创建的命令式节点，可以在Native侧进行属性设置。使用C语言创建的节点，可以在ArkTS侧进行属性设置。 ![]… [`references/设置自定义节点跨语言属性.md`](<references/设置自定义节点跨语言属性.md>)
- **资源限定与访问** — 资源限定词可以由一个或多个表示应用场景或设备特征的限定词组合而成，包括屏幕密度等维度，限定词之间通过中划线（-）连接。开发者在 **resources** 目录下创建限定词文件时，需要掌握限定词文件的命名要求以及与限定词文件与设备状态的匹配规则。 #### 资源限定词的命名要求 - 限定词的组合顺序：屏幕密度。开发者可以根据应用的使用场景和设备特征，选择其中… [`references/资源限定与访问.md`](<references/资源限定与访问.md>)
- **转场动画概述** — 转场动画用于对即将出现或消失的组件施加动画效果，始终显示的组件应使用 属性动画 。转场动画旨在简化开发者对组件消失节点的管理，如果使用属性动画实现组件转场，开发者需在动画结束回调中手动删除组件节点。此外，动画结束前已删除的节点可能重新出现，因此需在回调中增加对节点状态的判断逻辑。 转场动画有如下几类： - 出现/消失转场 ：对新增、消失的控件实现动画效果，是… [`references/转场动画概述.md`](<references/转场动画概述.md>)
- **进度条 (Progress)** — Progress是进度条显示组件，显示内容通常为目标操作的当前进度。具体用法请参考 Progress 。 #### 创建进度条 Progress通过调用接口来创建，接口调用方式如下： Progress(options: {value: number, total?: number, type?: ProgressType}) 其中，value用于设置初始进度… [`references/进度条 (Progress).md`](<references/进度条 (Progress).md>)
- **选项卡 (Tabs)** — 当页面信息较多时，为了让用户能够聚焦于当前显示的内容，需要对页面内容进行分类，提高页面空间利用率。 Tabs 组件可以在一个页面内快速实现视图内容的切换，一方面提升查找信息的效率，另一方面精简用户单次获取到的信息量。 #### 基本布局 Tabs组件的页面组成包含两个部分，分别是 TabContent 和 TabBar 。TabContent是内容页，Tab… [`references/选项卡 (Tabs).md`](<references/选项卡 (Tabs).md>)
- **通过EmbeddedComponent拉起EmbeddedUIExtensionAbility** — ArkUI在Native侧提供的能力是ArkTS的子集，某些能力不会在Native侧提供，例如声明式UI语法、自定义struct组件及UI系统预置UI组件库。 从API version 20开始，ArkUI开发框架提供了Native侧嵌入EmbeddedComponent组件的能力，此能力依赖于 EmbeddedComponent 机制。EmbeddedCo… [`references/通过EmbeddedComponent拉起EmbeddedUIExtensionAbility.md`](<references/通过EmbeddedComponent拉起EmbeddedUIExtensionAbility.md>)
- **通过自绘制接入无障碍** — 通过 自定义绘制 接入的第三方框架平台，NDK提供了对接无障碍服务的接口函数，使三方框架组件能够支持ArkUI中的基本无障碍功能，包括焦点获取、获取无障碍节点和操作响应。 从API version 13开始，支持基于Xcomponent的自绘制方式接入。 从API version 23开始，支持基于CustomNode构建渲染节点树的自绘制方式接入。 三方框… [`references/通过自绘制接入无障碍.md`](<references/通过自绘制接入无障碍.md>)
- **配置应用启动页** — 启动页分为简易启动页和增强启动页，开发者通过在module.json5配置文件中的 abilities标签 配置启动页资源，涉及的对应字段及含义如下表所示。 #### 配置简易启动页 简易启动页是每个UIAbility都必须配置的能力，开发者通过配置module.json5文件中的 abilities标签 的startWindowIcon和startWind… [`references/配置应用启动页.md`](<references/配置应用启动页.md>)
- **阴影** — 阴影接口 shadow 可以为当前组件添加阴影效果，该接口支持两种类型参数，开发者可配置 ShadowOptions 自定义阴影效果。ShadowOptions模式下，当radius = 0或者color的透明度为0时，无阴影效果。 @Entry @Component struct ShadowOptionDemo { build() { Row() { C… [`references/阴影.md`](<references/阴影.md>)
- **页面级弹出框** — ArkUI的弹出框默认设置为全局级别，弹窗节点作为页面根节点的子节点，显示层级高于应用中的所有路由/导航页面。当页面内进行路由跳转时，如果应用未主动调用close方法关闭弹出框，弹出框不会自动关闭，并且会在下一个跳转页面上继续显示。 从API version 15开始，如果开发者希望在路由跳转后，弹出框能够随前一个路由页面的切换而消失，并在路由返回后弹出框能… [`references/页面级弹出框.md`](<references/页面级弹出框.md>)
- **页面路由 (@ohos.router)(不推荐)** — 页面路由指在应用程序中实现不同页面之间的跳转和数据传递。Router模块通过不同的url地址，可以方便地进行页面路由，轻松地访问不同的页面。本文将从 页面跳转 、 页面返回 、 页面返回前增加一个询问框 和 命名路由 这几个方面，介绍如何通过Router模块实现页面路由。 ![](https://contentcenter-vali-drcn.dbankcd… [`references/页面路由 (@ohos.router)(不推荐).md`](<references/页面路由 (@ohos.router)(不推荐).md>)
- **页面路由** — 很多应用由多个页面组成，比如用户可以从音乐列表页面点击歌曲，跳转到该歌曲的播放界面。开发者需要通过页面路由将这些页面串联起来，按需实现跳转。 页面路由router根据页面的uri找到目标页面，从而实现跳转。以最基础的两个页面之间的跳转为例，具体实现步骤如下： 1. 在“Project“窗口，打开src > main >js >MainAbility，右键点击… [`references/页面路由.md`](<references/页面路由.md>)
- **页面转场动画 (不推荐)** — 为了实现更好的转场效果，推荐使用 Navigation转场动画 和 模态转场 。 两个页面间发生跳转，一个页面消失，另一个页面出现，这时可以配置各自页面的页面转场参数实现自定义的页面转场效果。 页面转场 效果写在pageTransition函数中，通过 PageTransitionEnter 和 PageTransitionExit 指定页面进入和退出的动画… [`references/页面转场动画 (不推荐).md`](<references/页面转场动画 (不推荐).md>)
- **顶部窗口控制条避让适配智慧多窗** — 顶部窗口控制条是应用窗口处于智慧多窗模式下，应用顶部的操作横条 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7a/v3/EGH74LHwQ9ezF5GuLKpCKA/zh-cn_image_0000002573974121.png?HW… [`references/顶部窗口控制条避让适配智慧多窗.md`](<references/顶部窗口控制条避让适配智慧多窗.md>)
