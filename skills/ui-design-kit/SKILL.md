---
name: ui-design-kit
description: 提供符合HarmonyOS Design System规范的UI组件，包括导航、侧边栏、页签、光影效果、图标处理及应用内多窗，助力构建精致界面。
---

## 功能说明

UI Design Kit是华为提供的符合HarmonyOS Design System规范的UI界面开发套件集合，通过提供多样式的扩展组件、丰富的光影效果，支撑开发者高效构建高端精致的界面。该Kit基于ArkUI基础能力维度进行扩展，确保应用在HarmonyOS全场景设备上达成一致的视觉体验与设计品质。

UI Design Kit提供三大类核心能力：增强型UI组件（组件导航、侧边栏、底部页签、即时操作、核心操作栏、列表、应用内多窗）、HDS沉浸视效（点光源、流光、按压阴影、沉浸光感材质）以及资源与图标能力（分层图标处理、自定义Symbol注册）。组件导航支持动态模糊、半模态样式、标题栏自定义等；底部页签支持分割线动态显隐、页签栏模糊、图标出血等增强样式。

该Kit支持Phone、Tablet、PC/2in1、TV、Wearable等多种设备类型，不同能力对应的设备支持范围有所不同。图标批量处理接口最大并发数为10，单次最大处理量500个；Symbol资源注册接口最大支持10个自定义图标与动效参数资源注册。

## 使用场景

当你的应用需要使用符合HarmonyOS设计规范的高端UI组件时使用本Kit，例如需要动态模糊标题栏、流光效果、按压阴影等沉浸式视觉体验的场景。当需要对应用图标进行分层处理、剪切、缩放、描边等批量操作时，或者需要注册自定义Symbol图标资源时，应使用本Kit的图标处理能力。

当ArkUI基础组件无法满足你的视觉设计需求时，可以考虑使用UI Design Kit提供的增强型组件。本Kit支持模拟器开发，但模拟器不支持HDS沉浸视效相关能力。

## 典型场景

- 如何设置导航组件标题栏的动态模糊效果？
- 如何配置半模态页面样式和自定义标题栏区域？
- 如何设置overlay模式和embed模式的侧边栏？
- 如何配置侧边栏菜单的一级、二级菜单样式及红点提醒？
- 如何设置底部页签栏的分割线、模糊样式和悬浮样式？
- 如何使用即时操作控件发送常驻或定时通知弹窗？
- 如何配置核心操作栏的主按钮展开收起动效？
- 如何实现列表卡片的横滑删除效果？
- 如何使用点光源、流光、按压阴影等HDS沉浸视效？
- 如何对分层图标进行合成、剪切、缩放及描边处理？

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### 简介

- [UI Design Kit简介](references/UI%20Design%20Kit%E7%AE%80%E4%BB%8B.md) - 介绍UI Design Kit功能全景、增强型组件、光影效果及与ArkUI基础能力的关系
- [开发实例](references/%E5%BC%80%E5%8F%91%E5%AE%9E%E4%BE%8B.md) - 提供UI Design Kit的完整开发示例代码
- [401 参数检查失败的可能原因和解决办法](references/401%20%E5%8F%82%E6%95%B0%E6%A3%80%E6%9F%A5%E5%A4%B1%E8%B4%A5%E7%9A%84%E5%8F%AF%E8%83%BD%E5%8E%9F%E5%9B%A0%E5%92%8C%E8%A7%A3%E5%86%B3%E5%8A%9E%E6%B3%95.md) - 介绍参数检查错误码401的排查思路和解决方法

### 组件导航

- [设置动态模糊样式](references/%E8%AE%BE%E7%BD%AE%E5%8A%A8%E6%80%81%E6%A8%A1%E7%B3%8A%E6%A0%B7%E5%BC%8F.md) - 介绍如何配置导航组件标题栏的动态模糊效果
- [半模态样式](references/%E5%8D%8A%E6%A8%A1%E6%80%81%E6%A0%B7%E5%BC%8F.md) - 介绍如何配置半模态页面样式
- [设置自定义区域](references/%E8%AE%BE%E7%BD%AE%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8C%BA%E5%9F%9F.md) - 介绍如何自定义标题栏区域内容
- [标题栏动态显隐](references/%E6%A0%87%E9%A2%98%E6%A0%8F%E5%8A%A8%E6%80%81%E6%98%BE%E9%9A%90.md) - 介绍如何控制标题栏的动态显示与隐藏
- [图标类型设置](references/%E5%9B%BE%E6%A0%87%E7%B1%BB%E5%9E%8B%E8%AE%BE%E7%BD%AE.md) - 介绍如何设置导航栏图标为文字或图片类型
- [设置信息提醒](references/%E8%AE%BE%E7%BD%AE%E4%BF%A1%E6%81%AF%E6%8F%90%E9%86%92.md) - 介绍如何配置导航栏的信息提醒功能

### 侧边栏

- [设置overlay模式的侧边栏](references/%E8%AE%BE%E7%BD%AEoverlay%E6%A8%A1%E5%BC%8F%E7%9A%84%E4%BE%A7%E8%BE%B9%E6%A0%8F.md) - 介绍如何配置overlay模式的侧边栏容器
- [设置embed模式的侧边栏](references/%E8%AE%BE%E7%BD%AEembed%E6%A8%A1%E5%BC%8F%E7%9A%84%E4%BE%A7%E8%BE%B9%E6%A0%8F.md) - 介绍如何配置embed模式的侧边栏容器
- [侧边栏菜单样式](references/%E4%BE%A7%E8%BE%B9%E6%A0%8F%E8%8F%9C%E5%8D%95%E6%A0%B7%E5%BC%8F.md) - 介绍侧边栏一级、二级菜单样式及红点提醒配置
- [设置侧边栏半屏居中对齐样式](references/%E8%AE%BE%E7%BD%AE%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%8D%8A%E5%B1%8F%E5%B1%85%E4%B8%AD%E5%AF%B9%E9%BD%90%E6%A0%B7%E5%BC%8F.md) - 介绍侧边栏半屏居中对齐布局样式

### 底部页签

- [设置页签栏的分割线](references/%E8%AE%BE%E7%BD%AE%E9%A1%B5%E7%AD%BE%E6%A0%8F%E7%9A%84%E5%88%86%E5%89%B2%E7%BA%BF.md) - 介绍页签栏分割线动态显隐设置
- [设置页签栏的模糊样式](references/%E8%AE%BE%E7%BD%AE%E9%A1%B5%E7%AD%BE%E6%A0%8F%E7%9A%84%E6%A8%A1%E7%B3%8A%E6%A0%B7%E5%BC%8F.md) - 介绍页签栏背景模糊效果设置
- [设置页签栏的悬浮样式](references/%E8%AE%BE%E7%BD%AE%E9%A1%B5%E7%AD%BE%E6%A0%8F%E7%9A%84%E6%82%AC%E6%B5%AE%E6%A0%B7%E5%BC%8F.md) - 介绍页签栏悬浮样式配置
- [设置页签的图标出血样式](references/%E8%AE%BE%E7%BD%AE%E9%A1%B5%E7%AD%BE%E7%9A%84%E5%9B%BE%E6%A0%87%E5%87%BA%E8%A1%80%E6%A0%B7%E5%BC%8F.md) - 介绍页签图标出血设计样式

### 即时操作与核心操作栏

- [设置常驻通知弹窗](references/%E8%AE%BE%E7%BD%AE%E5%B8%B8%E9%A9%BB%E9%80%9A%E7%9F%A5%E5%BC%B9%E7%AA%97.md) - 介绍如何配置常驻型即时操作通知弹窗
- [设置定时通知弹窗](references/%E8%AE%BE%E7%BD%AE%E5%AE%9A%E6%97%B6%E9%80%9A%E7%9F%A5%E5%BC%B9%E7%AA%97.md) - 介绍如何配置定时型即时操作通知弹窗
- [设置有主按钮的组件](references/%E8%AE%BE%E7%BD%AE%E6%9C%89%E4%B8%BB%E6%8C%89%E9%92%AE%E7%9A%84%E7%BB%84%E4%BB%B6.md) - 介绍核心操作栏主按钮展开/收起动效配置
- [设置无主按钮的组件](references/%E8%AE%BE%E7%BD%AE%E6%97%A0%E4%B8%BB%E6%8C%89%E9%92%AE%E7%9A%84%E7%BB%84%E4%BB%B6.md) - 介绍核心操作栏无主按钮样式配置

### 列表

- [设置列表卡片样式](references/%E8%AE%BE%E7%BD%AE%E5%88%97%E8%A1%A8%E5%8D%A1%E7%89%87%E6%A0%B7%E5%BC%8F.md) - 介绍高端列表卡片样式的封装使用
- [设置附带横滑的列表样式](references/%E8%AE%BE%E7%BD%AE%E9%99%84%E5%B8%A6%E6%A8%AA%E6%BB%91%E7%9A%84%E5%88%97%E8%A1%A8%E6%A0%B7%E5%BC%8F.md) - 介绍列表项内置横滑删除动效的实现

### 应用内多窗

- [设置应用内多窗](references/%E8%AE%BE%E7%BD%AE%E5%BA%94%E7%94%A8%E5%86%85%E5%A4%9A%E7%AA%97.md) - 介绍应用内多窗口的配置说明
- [应用内多窗](references/%E5%BA%94%E7%94%A8%E5%86%85%E5%A4%9A%E7%AA%97.md) - 介绍单应用多窗口入口组件MultiWindowEntryInAPP的使用

### HDS沉浸视效

- [点光源效果](references/%E7%82%B9%E5%85%89%E6%BA%90%E6%95%88%E6%9E%9C.md) - 介绍物理光感系统的点光源效果
- [沉浸光感](references/%E6%B2%89%E6%B5%B8%E5%85%89%E6%84%9F.md) - 介绍HDS标题栏和底部页签的沉浸光感材质
- [背景流光](references/%E8%83%8C%E6%99%AF%E6%B5%81%E5%85%89.md) - 介绍背景流光效果的实现
- [双边边缘流光](references/%E5%8F%8C%E8%BE%B9%E8%BE%B9%E7%BC%98%E6%B5%81%E5%85%89.md) - 介绍双边边缘流光效果的实现
- [自带背景的双边流光](references/%E8%87%AA%E5%B8%A6%E8%83%8C%E6%99%AF%E7%9A%84%E5%8F%8C%E8%BE%B9%E6%B5%81%E5%85%89.md) - 介绍适配胶囊组件的自带背景双边流光效果
- [按压阴影](references/%E6%8C%89%E5%8E%8B%E9%98%B4%E5%BD%B1.md) - 介绍按压交互时的背景色变化阴影效果

### 资源与图标能力

- [（推荐）分层图标处理](references/%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89%E5%88%86%E5%B1%82%E5%9B%BE%E6%A0%87%E5%A4%84%E7%90%86.md) - 介绍分层图标的合成、剪切、缩放及描边处理
- [单层图标处理](references/%E5%8D%95%E5%B1%82%E5%9B%BE%E6%A0%87%E5%A4%84%E7%90%86.md) - 介绍单层图标的处理方式
- [怎么获取layeredDrawableDescriptor对象信息？](references/%E6%80%8E%E4%B9%88%E8%8E%B7%E5%8F%96layeredDrawableDescriptor%E5%AF%B9%E8%B1%A1%E4%BF%A1%E6%81%AF%EF%BC%9F.md) - 介绍获取分层图标描述符对象的方法
- [应用加载自定义Symbol](references/%E5%BA%94%E7%94%A8%E5%8A%A0%E8%BD%BD%E8%87%AA%E5%AE%9A%E4%B9%89Symbol.md) - 介绍如何注册应用侧自定义Symbol图标和动效资源

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `35` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **401 参数检查失败的可能原因和解决办法** — **问题现象** 调用接口报错401 参数检查失败。 Parameter error. The value of bundleName is incorrect. Parameter error. The value of layeredDrawableDescriptor is incorrect. Parameter error. The value o… [`references/401 参数检查失败的可能原因和解决办法.md`](<references/401 参数检查失败的可能原因和解决办法.md>)
- **UI Design Kit简介** — UI Design Kit是华为提供的符合HarmonyOS Design System规范的UI界面开发套件集合。通过提供多样式的扩展组件、丰富的光影效果，支撑开发者高效构建高端精致的界面（参见 HarmonyOS设计理念 ），确保应用在HarmonyOS全场景设备上达成一致的视觉体验与设计品质，遵循 HarmonyOS设计规范 。 #### 功能全景 #… [`references/UI Design Kit简介.md`](<references/UI Design Kit简介.md>)
- **侧边栏菜单样式** — 从6.0.0(20) Beta1版本开始，新增支持设置侧边栏菜单样式。 HdsSideMenu 提供一种菜单栏样式组件。设置侧边栏对应的一级菜单和二级菜单，并显示其新消息数量。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9e/v3/d… [`references/侧边栏菜单样式.md`](<references/侧边栏菜单样式.md>)
- **半模态样式** — 从6.0.0(20) Beta1版本开始，导航组件新增支持半模态样式和半模态样式下的标题栏模糊。 用于半模态弹窗中使用导航组件场景。通过设置 HdsNavigationTitleMode 为MODAL可以实现标题栏半模态样式及动态模糊。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/Develop… [`references/半模态样式.md`](<references/半模态样式.md>)
- **单层图标处理** — 从5.0.0(12)版本开始， Hds支持单层图标处理能力。 适用于图标为单层资源，且图标展示风格要与华为HarmonyOS Design System设计风格一致的应用场景，典型应用场景可参考分层图标 场景介绍 。 #### 约束条件 单层图标处理支持Phone、Tablet、PC/2in1设备，并且从5.1.1(19)版本开始，新增支持TV设备。 ###… [`references/单层图标处理.md`](<references/单层图标处理.md>)
- **双边边缘流光** — 从6.0.0(20) Beta1版本开始，新增支持 双边边缘流光 。 通过双边边缘流光接口可以设置组件的边缘发光效果，并且可以设置两条边的起始、终止位置和边缘颜色效果，常用于胶囊组件、屏幕边缘发光等。 #### 开发步骤 1. 导入模块。 import { hdsEffect } from '@kit.UIDesignKit'; 2. 设置双边边缘流光效果。… [`references/双边边缘流光.md`](<references/双边边缘流光.md>)
- **图标类型设置** — 从6.0.0(20) Beta1版本开始，导航组件新增支持文本型与图片型图标类型设置。 当应用开发者需要配置图片型图标大小，或者使用普通文字型图标（胶囊型按钮）、单字图标（圆形按钮）时，可通过设置titleBar图标内容配置中的 type 属性实现该功能。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt… [`references/图标类型设置.md`](<references/图标类型设置.md>)
- **应用内多窗** — 从6.0.0(20)Beta3版本开始，新增支持应用内多窗。 通过应用内多窗组件 MultiWindowEntryInAPP 提供的单应用多窗口接口，实现一个应用多个窗口并行运行的体验。并且可以设置图标大小颜色、背板大小颜色、文字大小颜色等。 如果开发者未集成HdsNavigation组件，可使用应用内多窗组件实现应用内多窗体验。 #### 约束条件 依赖全… [`references/应用内多窗.md`](<references/应用内多窗.md>)
- **应用加载自定义Symbol** — 从5.1.1 (19)版本开始，新增支持资源注册。 适用于需要快速定制应用内 Symbol图标 ，不想强依赖于系统版本中预制的系统Symbol图标资源。 #### 约束条件 资源注册支持Phone、Tablet、PC/2in1设备，并且从5.1.1(19)版本开始，新增支持TV设备。 #### 开发步骤 1. 将UX设计师提供的Symbol图标资源（TTF文… [`references/应用加载自定义Symbol.md`](<references/应用加载自定义Symbol.md>)
- **开发实例** — 1. 在首页创建一级导航。通过titleBar接口设置HdsNavigation标题栏样式及内容设置。通过pushPath路由方法跳转二级页面。 // 模块导入 // 从6.0.2(22)版本开始，无需手动导入HdsNavigationAttribute。具体请参考HdsNavigation的导入模块说明。 import { HdsNavigation, S… [`references/开发实例.md`](<references/开发实例.md>)
- **怎么获取layeredDrawableDescriptor对象信息？** — 应用配置的图标和名称信息，可以通过 resourceManager.getDrawableDescriptor 获取。 [`references/怎么获取layeredDrawableDescriptor对象信息？.md`](<references/怎么获取layeredDrawableDescriptor对象信息？.md>)
- **按压阴影** — 从6.0.0(20) Beta1版本开始，新增支持 按压阴影 。 通过按压阴影接口可以设置组件的背景色变化效果，一般常用于组件按压交互时的背景色变化场景。 #### 开发步骤 1. 导入模块。 import { hdsEffect } from '@kit.UIDesignKit'; 2. 创建按压阴影效果。 @Entry @Component struct… [`references/按压阴影.md`](<references/按压阴影.md>)
- **标题栏动态显隐** — 从6.0.0(20) Beta1版本开始，导航组件新增支持设置标题栏动态显隐及隐藏类型。 当应用开发者需要动态隐藏标题栏时，可通过使用 dynamicHideTitleBar 属性实现该功能。设置隐藏标题区域前提下，才可以设置隐藏状态栏。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/Develo… [`references/标题栏动态显隐.md`](<references/标题栏动态显隐.md>)
- **沉浸光感** — 从6.1.0(23) 版本开始，新增支持HDS组件的沉浸光感材质能力。 - **HDS导航**：通过设置TitleBarStyleOptions的systemMaterialEffect参数，可为标题栏按钮设置沉浸光感视效。 - **HDS底部页签**：通过设置HdsTabsFloatingStyle的systemMaterialEffect参数，可为底部页… [`references/沉浸光感.md`](<references/沉浸光感.md>)
- **点光源效果** — 从6.0.0(20) Beta1版本开始，新增支持 点光源效果 。 通过点光源接口可以设置组件的发光效果以及被照亮的受光效果，使得组件交互体验更显沉浸。 #### 约束与限制 单个组件最多同时受12个光源照亮。 #### 开发步骤 1. 导入模块。 import { hdsEffect } from '@kit.UIDesignKit'; 2. 创建点光源发… [`references/点光源效果.md`](<references/点光源效果.md>)
- **背景流光** — 从6.0.0(20) Beta1版本开始，新增支持 背景流光 。 通过背景流光接口可以设置组件的背景流动发光效果，并且可以设置背景色及渐变背景色，常用于全屏幕背景流光等。 #### 开发步骤 1. 导入模块。 import { hdsEffect } from '@kit.UIDesignKit'; 2. 设置背景流光效果。 @Entry @Componen… [`references/背景流光.md`](<references/背景流光.md>)
- **自带背景的双边流光** — 从6.0.0(20) Beta1版本开始，新增支持 自带背景的双边流光 。 通过通用视效组件HdsVisualComponent提供的自带背景的双边流光效果场景接口，支持设置两条边缘流光的起始、终止位置、边缘颜色效果以及与流光相叠加的背景板颜色，用于胶囊组件、屏幕边缘发光等。 #### 开发步骤 1. 导入模块。 // 从6.0.2(22)版本开始，无需手动… [`references/自带背景的双边流光.md`](<references/自带背景的双边流光.md>)
- **设置embed模式的侧边栏** — 从6.0.0(20) Beta1版本开始，新增支持设置embed模式的侧边栏。 HdsSideBar 提供可以显示和隐藏的侧边栏容器，通过子组件定义侧边栏和内容区，第一个子组件表示侧边栏，第二个子组件表示内容区，通过设置 sideBarContainerType 的值为SideBarContainerType.Embed，使得当前HdsSideBar为嵌入样… [`references/设置embed模式的侧边栏.md`](<references/设置embed模式的侧边栏.md>)
- **设置overlay模式的侧边栏** — 从6.0.0(20) Beta1版本开始，新增支持设置overlay模式的侧边栏。 HdsSideBar 提供可以显示和隐藏的侧边栏容器，通过子组件定义侧边栏和内容区，第一个子组件表示侧边栏，第二个子组件表示内容区，通过设置 sideBarContainerType 的值为SideBarContainerType.Overlay，使得当前HdsSideBar… [`references/设置overlay模式的侧边栏.md`](<references/设置overlay模式的侧边栏.md>)
- **设置侧边栏半屏居中对齐样式** — 从6.0.0(20) Beta1版本开始，新增支持设置侧边栏半屏居中对齐样式。 HdsTabs 容器组件侧边栏支持半屏居中对齐布局。横向Tabs时，若没有主动设置TabBar高度，则TabBar默认高度为48vp，纵向TabBar默认宽度为96vp，barHeight设成固定值后，TabBar无法扩展底部安全区。当safeAreaPadding不设置bott… [`references/设置侧边栏半屏居中对齐样式.md`](<references/设置侧边栏半屏居中对齐样式.md>)
- **设置信息提醒** — 从5.1.0(18)版本开始，导航组件新增支持菜单栏设置信息提醒能力。 当应用开发者需要在导航组件菜单项右上角附加消息提醒时，可以通过设置标题栏菜单中的 badge 配置，实现信息提醒能力。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/… [`references/设置信息提醒.md`](<references/设置信息提醒.md>)
- **设置列表卡片样式** — 从6.0.0(20) Beta1版本开始，新增支持设置列表卡片样式。 应用使用 HdsListItemCard 组件实现多设备上的系统列表样式。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ba/v3/-4WiKS7vRNq9jdLS-… [`references/设置列表卡片样式.md`](<references/设置列表卡片样式.md>)
- **设置动态模糊样式** — 从5.1.0(18)版本开始， 导航组件新增支持标题栏 通用模糊 样式。 从6.0.0(20) Beta1版本开始，新增支持 过渡模糊 与 渐变模糊 样式。 当应用开发者需要使用标题栏样式随内容区滚动而动态改变样式的导航组件时，可以通过设置titleBar属性中的 style 配置，自定义滚动前后的标题栏样式。 #### 通用模糊样式 对组件背景进行均匀的模… [`references/设置动态模糊样式.md`](<references/设置动态模糊样式.md>)
- **设置定时通知弹窗** — 从6.0.0(20) Beta1版本开始，新增支持设置定时通知弹窗。 HdsSnackBar 支持定时通知弹窗。当应用开发者需要定时通知提醒弹窗时，可以通过HdsSnackBar的show方法显示HdsSnackBar弹窗，设置duration是大于0的时间表示弹窗是定时消失的，默认定时时间是5000ms。 ![](https://contentcenter… [`references/设置定时通知弹窗.md`](<references/设置定时通知弹窗.md>)
- **设置常驻通知弹窗** — 从6.0.0(20) Beta1版本开始，新增支持设置常驻通知弹窗。 HdsSnackBar 支持常驻通知弹窗。当应用开发者需要常驻通知提醒弹窗时，可以通过HdsSnackBar的show方法显示HdsSnackBar弹窗，设置duration是-1表示常驻弹窗。 ![](https://contentcenter-vali-drcn.dbankcdn.cn… [`references/设置常驻通知弹窗.md`](<references/设置常驻通知弹窗.md>)
- **设置应用内多窗** — 从6.0.0(20)Beta3版本开始，新增支持应用内多窗。 当应用开发者需要使用应用内多窗图标（分屏按钮）时，可通过配置titleBar中的menu的 multiWindowEntryInAPPMenu 属性实现该功能。 #### 约束条件 依赖全景多窗特性，只有当前设备及屏幕状态支持全景多窗，才支持设置此功能。目前支持全景多窗的设备形态有： - 双折叠：… [`references/设置应用内多窗.md`](<references/设置应用内多窗.md>)
- **设置无主按钮的组件** — 从6.0.0(20) Beta1版本开始，新增支持设置无主按钮的组件。 HdsActionBar 组件支持多个按钮的样式。当应用开发者需要多个按钮并且没有主按钮，没有展开和收缩的动效时，可以通过设置左按钮和右按钮配置样式。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAllia… [`references/设置无主按钮的组件.md`](<references/设置无主按钮的组件.md>)
- **设置有主按钮的组件** — 从6.0.0(20) Beta1版本开始，新增支持设置有主按钮的组件。 HdsActionBar 组件支持多个按钮的样式。当应用开发者需要多个按钮并且有主按钮，支持展开和收缩的动效时，可以通过设置主按钮配置样式。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_s… [`references/设置有主按钮的组件.md`](<references/设置有主按钮的组件.md>)
- **设置自定义区域** — 从6.0.0(20) Beta1版本开始，导航组件新增支持设置标题栏 stackBuilder 以及 bottomBuilder 。 当应用开发者需要在标题栏区域增加自定义节点时，例如在标题栏上方区域增加分段按钮，标题栏底部区域增加搜索框、页签时，可以使用标题栏自定义区域设置能力。 ![](https://contentcenter-vali-drcn.db… [`references/设置自定义区域.md`](<references/设置自定义区域.md>)
- **设置附带横滑的列表样式** — 从6.0.0(20) Beta1版本开始，新增支持设置附带横滑的列表样式。 应用使用 HdsListItem 组件实现多设备上的系统列表的横滑动效按钮的内容和样式。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/05/v3/n1J1gAm… [`references/设置附带横滑的列表样式.md`](<references/设置附带横滑的列表样式.md>)
- **设置页签栏的分割线** — 从6.0.0(20) Beta1版本开始，新增支持设置页签栏的分割线。 HdsTabs 容器组件扩展支持页签栏分割线常隐、常显和渐进显隐。当应用开发者需要分割线一直显示、一直隐藏或者内容区超过页签栏8vp后分割线完全消失时，可以通过设置HdsTabs组件的分割线的模式，同时也支持自定义分割线样式。 #### 约束条件 1. 将页签栏置于容器的底部且支持模糊，… [`references/设置页签栏的分割线.md`](<references/设置页签栏的分割线.md>)
- **设置页签栏的悬浮样式** — 从6.1.0(23) 版本开始，新增支持设置页签栏的悬浮样式以及迷你栏。 #### 页签栏 页签栏悬浮样式如下图所示： ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/JUuo2pCPSI67icsZwwZMAA/zh-cn_i… [`references/设置页签栏的悬浮样式.md`](<references/设置页签栏的悬浮样式.md>)
- **设置页签栏的模糊样式** — 从6.0.0(20) Beta1版本开始，新增支持设置页签栏的模糊样式。 HdsTabs 容器组件扩展支持页签栏设置直接模糊和渐变模糊效果。 - 直接模糊 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/vZ4nmHDjRfm4… [`references/设置页签栏的模糊样式.md`](<references/设置页签栏的模糊样式.md>)
- **设置页签的图标出血样式** — 从6.0.0(20) Beta1版本开始，新增支持设置页签的图标出血样式。 HdsTabs 容器组件扩展支持出血图标样式。当应用开发者需要tabBar内的页签高度超出tabBar时，可以通过设置对应页签的属性，添加出血效果的自定义组件，图标超出容器部分最大高度为4vp。 ![](https://contentcenter-vali-drcn.dbankcdn… [`references/设置页签的图标出血样式.md`](<references/设置页签的图标出血样式.md>)
- **（推荐）分层图标处理** — 从5.0.0(12)版本开始， Hds支持分层图标处理能力。 适用于图标为分层资源，且图标展示风格要与华为HarmonyOS Design System设计风格一致的应用场景。以下是一些典型的应用场景： - 展示带图标的应用列表：可调用UI Design Kit批量处理分层图标的接口获取处理后的应用图标。 - 展示应用详情：可调用UI Design Kit处… [`references/（推荐）分层图标处理.md`](<references/（推荐）分层图标处理.md>)
