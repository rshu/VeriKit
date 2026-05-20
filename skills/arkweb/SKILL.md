---
name: arkweb
description: ArkWeb提供Web组件用于在HarmonyOS应用中展示网页内容，支持页面加载、JavaScript交互、安全隐私管理、媒体播放、文件管理、DevTools调试以及同层渲染等高级渲染能力。
---

## 功能说明

ArkWeb（方舟Web）提供Web组件，用于在HarmonyOS应用中显示Web页面内容。常见使用场景包括应用集成Web页面、浏览器网页浏览、小程序渲染等。Web组件基于Chromium内核开发，HarmonyOS 6.0默认使用M132内核版本，提供完整的W3C标准支持。

ArkWeb提供丰富的Web页面控制能力。页面加载与管理方面，支持声明式和离屏加载Web页面、页面跳转与历史记录导航、前进后退缓存、页面访问加速、新窗口打开、跨窗口迁移、离线Web组件使用等。与前端页面交互方面，支持应用侧与Web页面建立数据通道、应用侧调用前端JavaScript函数、前端页面调用应用侧函数、浏览器扩展与应用通信等双向交互能力。网络请求方面，支持拦截Web组件网络请求、自定义页面请求响应、User-Agent设置等。

安全与隐私方面，ArkWeb提供位置权限管理、Cookie及数据存储管理、隐私模式（无痕浏览）、Web深色模式适配、坚盾守护安全模式、智能防跟踪、广告过滤、模拟点击检测等能力。页面显示方面，支持网页弹框处理、内容滚动、缩放管理、手势交互、拖拽交互、焦点管理、嵌套滚动、软键盘对接、安全区域避让、菜单处理、智能分词、剪贴板交互等。此外还支持文件上传下载、PDF预览与打印、媒体托管播放、摄像头麦克风访问、视频沉浸式全屏和画中画、同层渲染、Web组件大小自适应等高级能力。维测方面提供DevTools调试、Crashpad崩溃信息收集、Web白屏问题定位、Hypium自动化测试等工具。

## 使用场景

当应用需要嵌入和显示Web页面内容时，请使用ArkWeb的Web组件。适用于应用内嵌Web页面、浏览器应用、小程序宿主应用等场景。当应用需要与Web前端页面进行JavaScript双向交互时，请使用ArkWeb的应用侧与前端页面数据通道和函数调用能力。

当应用需要实现Web内容的安全与隐私保护时，请使用ArkWeb提供的权限管理、Cookie管理、隐私模式、广告拦截、防跟踪等能力。当需要调试Web页面或排查Web组件问题时，请使用DevTools调试工具和Crashpad崩溃信息收集功能。当应用需要处理Web页面的媒体播放、文件操作、打印等特定场景时，请使用ArkWeb对应的能力。

## 典型场景

- 如何使用Web组件加载和显示Web页面
- 如何实现应用侧与Web前端页面的JavaScript双向调用
- 如何管理Web组件的Cookie和数据存储
- 如何拦截Web组件发起的网络请求并自定义响应
- 如何使用隐私模式、广告过滤和智能防跟踪保护用户隐私
- 如何实现Web页面的深色模式适配
- 如何使用DevTools调试Web页面和定位Web白屏问题
- 如何实现Web组件的同层渲染和画中画功能
- 如何处理Web组件中的文件上传下载和PDF预览
- 如何优化Web页面跳转过程中的页面闪烁现象

## 使用指南

**重要提示：** 本Kit的references目录下包含大量详细参考文档。在查询时，请根据用户的具体问题，仅加载references中与问题相关的MD文件进行阅读，不要一次性加载所有文件，以免上下文过长影响回答质量。先通过标题和描述判断哪些文件与当前问题相关，再针对性地读取。

## 参考文档

### Kit简介与架构

- [ArkWeb简介](references/ArkWeb简介.md) - 介绍ArkWeb的能力范围、使用场景、权限要求和约束限制
- [ArkWeb进程](references/ArkWeb进程.md) - 说明ArkWeb的多进程架构设计
- [Web组件的生命周期](references/Web组件的生命周期.md) - 说明Web组件的生命周期状态变化过程

### 页面加载与管理

- [使用Web组件加载页面](references/使用Web组件加载页面.md) - 说明Web页面的加载方式和开发指导
- [管理页面跳转及浏览记录导航](references/管理页面跳转及浏览记录导航.md) - 说明页面跳转与浏览历史记录的导航管理方法
- [设置Web组件前进后退缓存](references/设置Web组件前进后退缓存.md) - 说明前进后退缓存的配置方法
- [加速Web页面的访问](references/加速Web页面的访问.md) - 说明Web页面访问加速的优化方法
- [在新窗口中打开页面](references/在新窗口中打开页面.md) - 说明如何在新窗口中打开Web页面
- [Web组件在不同的窗口间迁移](references/Web组件在不同的窗口间迁移.md) - 说明Web组件在不同窗口间迁移的方法
- [使用离线Web组件](references/使用离线Web组件.md) - 说明离线Web组件的使用方法
- [解决Web组件本地资源跨域问题](references/解决Web组件本地资源跨域问题.md) - 说明Web组件本地资源跨域问题的解决方案

### 与前端页面交互

- [建立应用侧与前端页面数据通道](references/建立应用侧与前端页面数据通道.md) - 说明如何在ArkTS中建立应用与Web页面的数据通道
- [建立应用侧与前端页面数据通道(C_C++)](references/建立应用侧与前端页面数据通道(C_C++).md) - 说明如何在C/C++中建立应用与Web页面的数据通道
- [应用侧调用前端页面函数](references/应用侧调用前端页面函数.md) - 说明应用侧如何调用Web页面的JavaScript函数
- [前端页面调用应用侧函数](references/前端页面调用应用侧函数.md) - 说明Web页面的JavaScript如何调用应用侧函数
- [应用侧与前端页面的相互调用(C_C++)](references/应用侧与前端页面的相互调用(C_C++).md) - 说明C/C++中应用侧与前端页面的相互调用方法
- [使用WebNativeMessagingExtensionAbility组件实现浏览器扩展和应用通信场景](references/使用WebNativeMessagingExtensionAbility组件实现浏览器扩展和应用通信场景.md) - 说明浏览器扩展与应用通信的实现方法

### 网络与请求

- [拦截Web组件发起的网络请求](references/拦截Web组件发起的网络请求.md) - 说明如何拦截Web组件发起的网络请求
- [自定义页面请求响应](references/自定义页面请求响应.md) - 说明如何自定义页面请求的响应处理
- [User-Agent开发指导](references/User-Agent开发指导.md) - 说明User-Agent的设置和开发方法

### 安全与隐私

- [管理位置权限](references/管理位置权限.md) - 说明Web组件位置权限的管理方法
- [管理Cookie及数据存储](references/管理Cookie及数据存储.md) - 说明Cookie和数据存储的管理方法
- [使用隐私模式](references/使用隐私模式.md) - 说明无痕浏览隐私模式的使用方法
- [Web深色模式适配](references/Web深色模式适配.md) - 说明Web页面的深色模式适配方法
- [坚盾守护模式](references/坚盾守护模式.md) - 说明坚盾守护安全模式的使用方法
- [使用智能防跟踪功能](references/使用智能防跟踪功能.md) - 说明智能防跟踪功能的使用方法
- [使用Web组件的广告过滤功能](references/使用Web组件的广告过滤功能.md) - 说明Web组件广告过滤功能的使用方法
- [Web应用模拟点击检测](references/Web应用模拟点击检测.md) - 说明Web应用模拟点击行为的检测方法

### 页面显示与交互

- [使用Web组件显示网页弹框](references/使用Web组件显示网页弹框.md) - 说明网页弹框的显示处理方法
- [Web页面显示内容滚动](references/Web页面显示内容滚动.md) - 说明Web页面内容的滚动控制方法
- [使用Web组件管理网页缩放](references/使用Web组件管理网页缩放.md) - 说明网页缩放的管理方法
- [使用Web组件的手势与应用交互](references/使用Web组件的手势与应用交互.md) - 说明Web组件手势与应用交互的实现方法
- [使用Web组件的拖拽功能与网页交互](references/使用Web组件的拖拽功能与网页交互.md) - 说明Web组件拖拽功能与网页交互的实现方法
- [Web组件焦点管理](references/Web组件焦点管理.md) - 说明Web组件焦点管理的方法
- [Web组件嵌套滚动](references/Web组件嵌套滚动.md) - 说明Web组件嵌套滚动的处理方法
- [Web组件对接软键盘](references/Web组件对接软键盘.md) - 说明Web组件与软键盘的对接方法
- [网页中安全区域计算和避让适配](references/网页中安全区域计算和避让适配.md) - 说明网页中安全区域的计算和避让适配方法
- [使用Web组件菜单处理网页内容](references/使用Web组件菜单处理网页内容.md) - 说明使用Web组件菜单处理网页内容的方法
- [使用Web组件的智能分词能力](references/使用Web组件的智能分词能力.md) - 说明Web组件智能分词能力的使用方法
- [使用Web组件与系统剪贴板交互处理网页内容](references/使用Web组件与系统剪贴板交互处理网页内容.md) - 说明Web组件与系统剪贴板交互处理网页内容的方法

### 文件与媒体

- [使用Web组件的下载能力](references/使用Web组件的下载能力.md) - 说明Web组件文件下载能力的使用方法
- [使用Web组件上传文件](references/使用Web组件上传文件.md) - 说明Web组件文件上传的使用方法
- [使用Web组件的PDF文档预览能力](references/使用Web组件的PDF文档预览能力.md) - 说明Web组件PDF文档预览功能的使用方法
- [使用Web组件打印前端页面](references/使用Web组件打印前端页面.md) - 说明Web组件打印前端页面的方法
- [使用Web组件保存前端页面为PDF](references/使用Web组件保存前端页面为PDF.md) - 说明使用Web组件将前端页面保存为PDF的方法
- [托管网页中的媒体播放](references/托管网页中的媒体播放.md) - 说明网页中媒体播放的托管管理方法
- [在Web中打开摄像头和麦克风](references/在Web中打开摄像头和麦克风.md) - 说明在Web中访问摄像头和麦克风的方法
- [Web组件支持视频沉浸式全屏播放](references/Web组件支持视频沉浸式全屏播放.md) - 说明Web组件视频沉浸式全屏播放的实现方法
- [Web组件支持画中画](references/Web组件支持画中画.md) - 说明Web组件画中画功能的实现方法
- [使用运动和方向传感器监测设备状态](references/使用运动和方向传感器监测设备状态.md) - 说明使用运动和方向传感器监测设备状态的方法

### 渲染与布局

- [Web组件渲染模式](references/Web组件渲染模式.md) - 说明Web组件的渲染模式选择
- [Web组件大小自适应页面内容布局](references/Web组件大小自适应页面内容布局.md) - 说明Web组件大小自适应页面内容布局的实现方法
- [同层渲染](references/同层渲染.md) - 说明Web组件同层渲染能力的实现方法

### 调试与维测

- [使用DevTools工具调试前端页面](references/使用DevTools工具调试前端页面.md) - 说明使用DevTools工具调试Web前端页面的方法
- [使用Crashpad收集Web组件崩溃信息](references/使用Crashpad收集Web组件崩溃信息.md) - 说明使用Crashpad收集Web组件崩溃信息的方法
- [定位与解决Web白屏问题](references/定位与解决Web白屏问题.md) - 说明Web白屏问题的定位和解决方法
- [获取网页内容高度](references/获取网页内容高度.md) - 说明如何获取网页内容高度
- [优化跳转至新Web组件过程中的页面闪烁现象](references/优化跳转至新Web组件过程中的页面闪烁现象.md) - 说明如何优化跳转至新Web组件过程中的页面闪烁现象
- [使用Hypium实现ArkWeb自动化测试](references/使用Hypium实现ArkWeb自动化测试.md) - 说明使用Hypium实现ArkWeb自动化测试的方法

<!-- verikit:references-index -->

## References / 参考文档索引

_Auto-generated by VeriKit from this Kit's reference manifest — `59` document(s) shipped under `references/`. Each link points at a real file in the plugin tree; load any with the agent's file-read tool._

- **ArkWeb简介** — ArkWeb（方舟Web）提供了Web组件，用于在应用中显示Web页面内容。常见使用场景包括： - 应用集成Web页面：应用可以在界面中使用Web组件，嵌入Web页面内容，以降低开发成本，提升开发、运维效率。 - 浏览器网页浏览场景：浏览器类应用可以使用Web组件，打开三方Web网页，使用无痕浏览模式浏览Web页面，设置广告拦截等。 - 小程序：小程序类宿主… [`references/ArkWeb简介.md`](<references/ArkWeb简介.md>)
- **ArkWeb进程** — ArkWeb是多进程模型，分为应用进程、Web渲染进程、Web GPU进程、Web孵化进程和Foundation进程。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/B2KS6KaiRSGvgl0_R1opFg/note_3.… [`references/ArkWeb进程.md`](<references/ArkWeb进程.md>)
- **User-Agent开发指导** — User-Agent（简称UA）是一个特殊的字符串，包含设备类型、操作系统及版本等关键信息。在Web开发中，这个字符串使服务器能够识别请求的来源设备及其特性，从而根据这些信息提供定制化的内容和服务。如果页面无法正确识别UA，可能会导致多种异常情况。例如，为移动设备优化的页面布局可能会在桌面设备上显示错乱，反之亦然。此外，某些特定的浏览器功能或CSS样式可能仅… [`references/User-Agent开发指导.md`](<references/User-Agent开发指导.md>)
- **Web应用模拟点击检测** — 从API version 23开始，新增支持Web应用模拟点击检测。 Web应用通过Javascript调用window.detectSimulatedClickRiskEnhanced接口，获取模拟点击检测结果。用于自动化点击、设备墙等作弊行为检测。 应用可以根据检测结果评估如何进行业务操作。 #### 约束与限制 - 每30秒最多可以调用10次，每个应用… [`references/Web应用模拟点击检测.md`](<references/Web应用模拟点击检测.md>)
- **Web深色模式适配** — 系统提供浅色和深色的主题模式供用户选择。深色模式在低光环境下能够降低屏幕亮度，减少光线刺激，改善阅读体验。Web组件根据网页样式进行渲染。若网页未适配深色模式，会造成与系统主题的割裂感。网页开发者应考虑用户的主题偏好，适配深色模式，以保证用户体验的一致性。 ArkWeb提供灵活控制Web组件深色模式的能力，支持独立于系统进行设置。此外，ArkWeb还可以强制… [`references/Web深色模式适配.md`](<references/Web深色模式适配.md>)
- **Web组件在不同的窗口间迁移** — Web组件能够实现在不同窗口的组件树上进行挂载或移除操作，这一能力使得开发者可以将同一个Web组件在不同窗口间迁移。例如，将浏览器的Tab页拖出成独立窗口，或拖入浏览器的另一个窗口。 Web组件在不同窗口间迁移，是基于 自定义节点 能力实现的。实现的基本原理是：通过 BuilderNode ，开发者可创建Web组件的离线节点，并结合 自定义占位节点 控制We… [`references/Web组件在不同的窗口间迁移.md`](<references/Web组件在不同的窗口间迁移.md>)
- **Web组件大小自适应页面内容布局** — 使用Web组件大小自适应页面内容布局模式 layoutMode ( WebLayoutMode .FIT_CONTENT)时，能使Web组件的大小根据页面内容自适应变化。 多设备适配Web页面请参考 Web响应式布局 。 #### 使用场景 适用于Web组件需要根据网页高度撑开，与其他系统组件一起滚动的场景，如： - 浏览长文章。Web组件同一布局层级有其他… [`references/Web组件大小自适应页面内容布局.md`](<references/Web组件大小自适应页面内容布局.md>)
- **Web组件对接软键盘** — 开发者能够通过Web组件对接软键盘，来处理系统软键盘的显示与交互问题，同时实现软键盘的自定义功能。主要有以下场景： - 拉起系统软键盘输入文字：点击网页输入框时，屏幕下方将弹出系统默认的软键盘。开发者可以通过软键盘输入文字，输入的内容会显示在输入框中。 - 自定义系统软键盘的回车键类型：设置不同的回车键类型，例如：确认、下一个和提交。 - 软键盘避让：在移动… [`references/Web组件对接软键盘.md`](<references/Web组件对接软键盘.md>)
- **Web组件嵌套滚动** — Web组件嵌套滚动的典型应用场景为，在页面中，多个独立区域需进行滚动，当用户滚动Web区域内容时，可联动其他滚动区域，实现上下左右全方位滑动页面的嵌套滚动体验。内嵌于可滚动容器（ Grid 、 List 、 Scroll 、 Swiper 、 Tabs 、 WaterFlow 、 Refresh 、 bindSheet ）中的Web组件，接收到滑动手势事件后… [`references/Web组件嵌套滚动.md`](<references/Web组件嵌套滚动.md>)
- **Web组件支持画中画** — Web组件提供画中画功能支持，应用可利用W3C标准的Picture-in-Picture API在网页中创建浮动窗口以播放视频，使用户在浏览其他网页或与其他应用交互时，可通过该画中画窗口继续观看视频。 若使用线上视频资源，则需在配置文件中设置网络权限。权限的添加方法请参考 在配置文件中声明权限 。 "requestPermissions": [ { "nam… [`references/Web组件支持画中画.md`](<references/Web组件支持画中画.md>)
- **Web组件支持视频沉浸式全屏播放** — Web组件提供了视频进入全屏和退出全屏的事件功能，应用可通过监听这些事件实现进入和退出沉浸式全屏模式。 Web组件引用第三方H5页面加载的视频，当点击视频全屏时，视频仅扩展至整个Web组件区域，无法实现系统全屏显示（如图2所示）。若要达到系统全屏的沉浸式视频播放效果（如图3所示），则需应用监听进入全屏的事件并调整页面其他组件的属性。 Web组件可通过 onF… [`references/Web组件支持视频沉浸式全屏播放.md`](<references/Web组件支持视频沉浸式全屏播放.md>)
- **Web组件渲染模式** — Web组件提供了两种可配置的渲染模式，能够根据不同的容器大小进行适配，从而满足使用场景中对容器尺寸的需求。 #### 异步渲染模式（默认） 异步渲染模式下（renderMode: RenderMode .ASYNC_RENDER），Web组件作为图形surface节点，独立送显。建议在仅由Web组件构成的应用页面中使用此模式，以提高性能并降低功耗。 - We… [`references/Web组件渲染模式.md`](<references/Web组件渲染模式.md>)
- **Web组件焦点管理** — 开发者可利用Web组件的焦点管理功能，有效管理Web组件的获焦与失焦，同时利用H5端的W3C标准接口，管理网页界面上唯一可交互的元素获焦与失焦。 - Web组件与ArkUI组件焦点控制的常用接口及其使用场景： 1. 通过requestFocus主动请求Web组件获焦：当应用内有多个组件时，开发者可通过Web组件的requestFocus接口，主动将焦点转移到… [`references/Web组件焦点管理.md`](<references/Web组件焦点管理.md>)
- **Web组件的生命周期** — 开发者可以使用Web组件加载本地或者在线网页。 Web组件提供生命周期回调接口，用于感知状态变化和处理业务。 Web组件的状态主要包括：Controller绑定到Web组件、网页加载开始、网页加载进度、网页加载结束、页面即将可见。 Web页面保活可以参考 使用离线Web组件 。 自定义组件析构销毁时执行 aboutToDisappear 函数，Web组件会被… [`references/Web组件的生命周期.md`](<references/Web组件的生命周期.md>)
- **Web页面显示内容滚动** — 当Web页面的内容高度或宽度超过可视区域时，页面才能滚动。Web页面滚动有多种方式，包括使用外接设备、ArkTS侧接口调用和JS侧接口调用。 #### 使用外接设备控制Web页面滚动 可以使用以下方式，通过触屏、触摸板和鼠标滚轮控制Web页面滚动。 - 通过触屏控制Web页面滚动：支持在触摸屏上单指上下左右滑动可以控制页面滚动。 - 通过触摸板控制Web页面… [`references/Web页面显示内容滚动.md`](<references/Web页面显示内容滚动.md>)
- **优化跳转至新Web组件过程中的页面闪烁现象** — 应用使用 Navigation 等路由策略导航至Web组件页面时，在网页加载过程中，页面底部可能出现闪烁现象，这会影响用户体验。 #### 闪烁原因 使用Navigation等路由策略导航至Web组件页面时，通常根据网页的回调通知判断是否隐藏系统导航栏。若决定隐藏，Web组件布局会进行调整。这一布局调整过程可简化为如下四个阶段： ![](https://co… [`references/优化跳转至新Web组件过程中的页面闪烁现象.md`](<references/优化跳转至新Web组件过程中的页面闪烁现象.md>)
- **使用Crashpad收集Web组件崩溃信息** — Web组件支持使用Crashpad记录进程崩溃信息。Crashpad是Chromium内核提供的进程崩溃信息处理工具，在应用使用Web组件导致的进程（Web渲染进程）崩溃出现后，Crashpad会在应用主进程沙箱目录写入dmp文件。该文件为二进制格式，后缀为dmp，其记录了进程崩溃的原因、线程信息、寄存器信息等，应用可以使用该文件分析Web组件相关进程崩溃问… [`references/使用Crashpad收集Web组件崩溃信息.md`](<references/使用Crashpad收集Web组件崩溃信息.md>)
- **使用DevTools工具调试前端页面** — Web组件支持使用DevTools工具调试前端页面。DevTools是Web前端开发调试工具，支持在电脑上调试移动设备前端页面。开发者通过 setWebDebuggingAccess() 接口开启Web组件前端页面调试能力，使用DevTools在电脑上调试移动前端网页，设备需为4.1.0及以上版本。 #### 无线调试 从API version 20开始，可… [`references/使用DevTools工具调试前端页面.md`](<references/使用DevTools工具调试前端页面.md>)
- **使用Hypium实现ArkWeb自动化测试** — ArkWeb页面支持使用Hypium集成Selenium框架、ChromeDriver驱动进行UI自动化测试。 #### 环境配置 1.Hypium环境搭建 参考： 应用UI测试（基于Python） 。 2.安装Selenium Selenium主要用于Web应用程序的自动化测试，核心功能是模拟用户在浏览器中的操作，例如点击按钮、输入文本、导航页面等。 pi… [`references/使用Hypium实现ArkWeb自动化测试.md`](<references/使用Hypium实现ArkWeb自动化测试.md>)
- **使用WebNativeMessagingExtensionAbility组件实现浏览器扩展和应用通信场景** — 浏览器的扩展程序（extension）支持与系统上安装的应用交换消息，应用向扩展提供服务，帮助扩展实现一些应用才具备的能力，常见的例子是密码管理器：应用负责存储和加密你的密码信息，以便浏览器扩展程序自动填充网页中的表单字段。 从API version 21开始，支持开发者在应用中使用 WebNativeMessagingExtensionAbility 组件… [`references/使用WebNativeMessagingExtensionAbility组件实现浏览器扩展和应用通信场景.md`](<references/使用WebNativeMessagingExtensionAbility组件实现浏览器扩展和应用通信场景.md>)
- **使用Web组件上传文件** — Web组件支持前端页面选择文件上传功能，应用开发者可以使用 onShowFileSelector() 接口来处理前端页面文件上传的请求，如果应用开发者不做任何处理，ArkWeb会提供默认行为来处理前端页面文件上传的请求。应用开发者也可以通过获取到的前端数据，自定义拉起Picker。 #### 使用onShowFileSelector拉起文件管理器 下面的示例… [`references/使用Web组件上传文件.md`](<references/使用Web组件上传文件.md>)
- **使用Web组件与系统剪贴板交互处理网页内容** — 开发者能够通过Web组件和系统剪贴板进行交互，实现各种类型数据的复制和粘贴。支持通过 菜单 、键盘快捷键以及 W3C剪贴板接口 对网页内容执行剪切、复制和粘贴操作。 #### 通过菜单或键盘快捷键与系统剪贴板交互 开发者能够自定义菜单中的功能选项，当用户选择特定选项时，开发者可以通过调用 cut 、 copy 、 copyImage 、 paste 、 pa… [`references/使用Web组件与系统剪贴板交互处理网页内容.md`](<references/使用Web组件与系统剪贴板交互处理网页内容.md>)
- **使用Web组件保存前端页面为PDF** — 从API version 14开始，支持使用Web组件的 createPdf 方法，为应用提供了保存前端页面为PDF的功能。 使用 createPdf 生成实例后，调用pdfArrayBuffer方法获取二进制数据流，再使用 fileIo 方法将二进制数据流保存为PDF文件。用户可以将前端页面内容保存为PDF以便分享或保存。例如，生成报告、发票等，方便用户保… [`references/使用Web组件保存前端页面为PDF.md`](<references/使用Web组件保存前端页面为PDF.md>)
- **使用Web组件加载页面** — 页面加载是Web组件的基本功能。根据页面加载数据来源可以分为三种常用场景，包括加载网络页面、加载本地页面、加载HTML格式的富文本数据。 页面加载过程中，若涉及网络资源获取，请在module.json5中配置网络访问权限，添加方法请参考 在配置文件中声明权限 。 "requestPermissions":[ { "name" : "ohos.permissi… [`references/使用Web组件加载页面.md`](<references/使用Web组件加载页面.md>)
- **使用Web组件打印前端页面** — Web组件打印html页面时可通过W3C标准协议接口和应用接口两种方式实现。 使用打印功能前，请在module.json5中配置相关权限，添加方法请参考 在配置文件中声明权限 。 "requestPermissions":[ { "name" : "ohos.permission.PRINT" } ] #### 使用W3C标准协议接口拉起打印 通过创建打印适… [`references/使用Web组件打印前端页面.md`](<references/使用Web组件打印前端页面.md>)
- **使用Web组件显示网页弹框** — 在HTML中，可以使用JavaScript创建三种类型的弹框：警告框window.alert(message)、确认框window.confirm(message)和提示框window.prompt(message, defaultValue)。这些弹框可以用于向用户传递信息、确认操作或请求输入。 当前，ArkWeb暂未提供默认的应用弹框。如果需要网页的弹框… [`references/使用Web组件显示网页弹框.md`](<references/使用Web组件显示网页弹框.md>)
- **使用Web组件的PDF文档预览能力** — Web组件 支持在网页中预览PDF。应用通过 WebOptions 的src参数和 loadUrl() 接口加载PDF文档。具体场景包括：网络PDF文档、应用沙箱内PDF文档和本地PDF文档。 若涉及网络文档获取，需在module.json5中配置网络访问权限。添加方法请参考 在配置文件中声明权限 。 "requestPermissions":[ { "na… [`references/使用Web组件的PDF文档预览能力.md`](<references/使用Web组件的PDF文档预览能力.md>)
- **使用Web组件的下载能力** — 当需要通过Web页面进行文件下载时，可以通过此方式调用Web接口。 #### 监听页面触发的下载 通过 setDownloadDelegate() 向Web组件注册一个DownloadDelegate来监听页面触发的下载任务。资源由Web组件来下载，Web组件会通过DownloadDelegate将下载的进度通知给应用。 下面的示例中，在应用的rawfile… [`references/使用Web组件的下载能力.md`](<references/使用Web组件的下载能力.md>)
- **使用Web组件的广告过滤功能** — ArkWeb为应用提供广告过滤功能，支持通过云端推送默认的easylist规则，或允许应用通过接口设定自定义规则文件。它在网络层拦截广告资源的下载，或在网页中注入CSS规则以隐藏特定的广告元素。 当前配置文件格式为 easylist规则 。 #### 常用easylist语法规则 例外规则，通常是与普通规则配合使用的，在某些特定场景下使普通规则不适用，单独应… [`references/使用Web组件的广告过滤功能.md`](<references/使用Web组件的广告过滤功能.md>)
- **使用Web组件的手势与应用交互** — 在移动端或支持触控的Web应用中，用户通过触摸屏与页面交互，Web组件支持了常见的手势识别，例如长按、滑动、点击等，以支持丰富的用户交互体验。 #### ArkWeb手势识别 ArkWeb接收ArkUI的 触摸事件 ，并识别出手势（触摸事件的分发策略详见 交互基础机制说明 ）。ArkWeb手势符合W3C标准：Touch Events、UI Events、Po… [`references/使用Web组件的手势与应用交互.md`](<references/使用Web组件的手势与应用交互.md>)
- **使用Web组件的拖拽功能与网页交互** — ArkWeb的拖拽功能使应用能够在网页中实现元素的拖放，用户可以长按可拖拽的元素，将其拖至可放置的元素上，然后松手完成放置。ArkWeb在网页内容中的拖拽功能满足H5标准。 #### 将网页内容拖拽至其他应用 ArkWeb目前支持以下四种数据格式。应用按照 H5 标准设置这些格式的拖拽数据，即可将内容拖拽到其他应用中。 #### 拖拽事件通知 ArkWeb拖… [`references/使用Web组件的拖拽功能与网页交互.md`](<references/使用Web组件的拖拽功能与网页交互.md>)
- **使用Web组件的智能分词能力** — 从API version 20开始，ArkWeb提供了H5页面内的文本分词识别功能，支持文本分词高亮、分词长按预览及文本选择菜单扩展等。这些功能需将 enableDataDetector 设置为true，默认为false。 此功能主要用于单页H5页面内容的实体识别，能够自动识别页面中的电话号码、网址等信息，并提供便捷的交互操作。启用此功能后，用户可以直接在页… [`references/使用Web组件的智能分词能力.md`](<references/使用Web组件的智能分词能力.md>)
- **使用Web组件管理网页缩放** — Web组件支持手势缩放、鼠标滚轮、键盘缩放，以方便用户调整到舒适的显示大小。并对应用提供监听、控制页面缩放比例的功能，以便应用实现个性化的视觉效果。 #### 启用/禁用网页缩放 #### 启用/禁用网页手势缩放 通过属性 zoomAccess 控制网页缩放功能，当设置为false时，网页不允许手势缩放行为。 当html网页设置<meta name="vie… [`references/使用Web组件管理网页缩放.md`](<references/使用Web组件管理网页缩放.md>)
- **使用Web组件菜单处理网页内容** — 菜单作为用户交互的关键组件，其作用是构建清晰的导航体系，通过结构化布局展示功能入口，使用户能够迅速找到目标内容或执行操作。作为人机交互的重要枢纽，它显著提升了Web组件的可访问性和用户体验，是应用设计中必不可少的部分。Web组件菜单类型包括 文本选中菜单 、 上下文菜单 和 自定义菜单 ，应用可根据具体需求灵活选择。 #### 文本选中菜单 Web组件的文本… [`references/使用Web组件菜单处理网页内容.md`](<references/使用Web组件菜单处理网页内容.md>)
- **使用智能防跟踪功能** — Web组件支持智能防跟踪功能，即当跟踪型网站作为第三方插入到其他网页时，其发送的网络请求将禁止携带cookie。 - 通过调用 enableIntelligentTrackingPrevention 接口启用或关闭Web组件的智能防跟踪功能。默认情况下，该功能未启用。 import { webview } from '@kit.ArkWeb'; import… [`references/使用智能防跟踪功能.md`](<references/使用智能防跟踪功能.md>)
- **使用离线Web组件** — Web组件能够实现在不同窗口的组件树上进行挂载或移除操作，这一能力使得开发者可以预先创建Web组件，从而实现性能优化。例如，Tab页为Web组件时，页面预先渲染，便于即时显示。 离线Web组件基于自定义占位组件 NodeContainer 实现。基本原理是构建支持命令式创建的Web组件，此类组件创建后不会立即挂载到组件树中，状态为Hidden和Inactiv… [`references/使用离线Web组件.md`](<references/使用离线Web组件.md>)
- **使用运动和方向传感器监测设备状态** — 运动和方向传感器，如加速度计、陀螺仪等，能够监测设备的运动状态和方向变化，例如设备的旋转、倾斜等。 通过W3C标准协议接口，Web组件能够访问这些传感器的数据，进而实现更加丰富的用户交互功能。例如，开发者在网页应用中可以利用加速度计识别运动模式，指导用户进行健身运动，利用陀螺仪捕获玩家手中设备的倾斜和旋转动作，实现无按钮操控的游戏体验。 通过在JavaScr… [`references/使用运动和方向传感器监测设备状态.md`](<references/使用运动和方向传感器监测设备状态.md>)
- **使用隐私模式** — 开发者在创建Web组件时，可以将可选参数 incognitoMode 设置为true，来开启Web组件的隐私模式。使用隐私模式浏览网页时，Cookie、缓存等数据不会写入本地持久化存储；隐私模式的Web组件销毁后，这些数据将被清除，不会保留。 - 创建隐私模式的 Web组件 。 import { webview } from '@kit.ArkWeb'; @… [`references/使用隐私模式.md`](<references/使用隐私模式.md>)
- **前端页面调用应用侧函数** — 开发者使用Web组件将应用侧代码注册到前端页面中，注册完成之后，前端页面中使用注册的对象名称就可以调用应用侧的方法。 #### 如何建立应用侧与H5侧的交互通道 注册应用侧代码有两种方式，一种在Web组件初始化调用，使用 javaScriptProxy() 接口。另外一种在Web组件初始化完成后调用，使用 registerJavaScriptProxy() … [`references/前端页面调用应用侧函数.md`](<references/前端页面调用应用侧函数.md>)
- **加速Web页面的访问** — 当Web页面加载缓慢时，可以使用预连接、预加载和预获取POST请求的能力加速Web页面的访问。 针对Web页面加载性能优化的详细内容请参考 Web页面加载优化性能指导 。 #### 预解析和预连接 此方法可以针对域名级进行优化，通过 prepareForPageLoad() 来预解析或者预连接将要加载的页面。该方式仅对url进行DNS解析以及建立tcp连接，… [`references/加速Web页面的访问.md`](<references/加速Web页面的访问.md>)
- **同层渲染** — 在系统中，应用可以使用Web组件加载Web网页。当非系统框架的UI组件功能或性能不如系统组件时，可使用同层渲染技术，通过ArkUI组件渲染这些组件（简称为同层组件）。 #### 使用场景 #### Web网页 小程序的地图组件，可以使用ArkUI的XComponent组件渲染来提升性能。小程序的输入框组件，可以使用ArkUI的TextInput组件渲染，达到… [`references/同层渲染.md`](<references/同层渲染.md>)
- **在Web中打开摄像头和麦克风** — WebRTC（Web Real-Time Communications）是一项实时通讯技术，它允许网络应用或站点在无需中间媒介的情况下建立浏览器之间的点对点（Peer-to-Peer）连接，实现视频流、音频流或其他任意数据的传输。WebRTC所包含的标准使得用户无需安装任何插件或第三方软件即可创建点对点（Peer-to-Peer）的数据共享与音视频会议。We… [`references/在Web中打开摄像头和麦克风.md`](<references/在Web中打开摄像头和麦克风.md>)
- **在新窗口中打开页面** — Web组件提供了在新窗口打开页面的能力，开发者可以通过 multiWindowAccess() 接口来设置是否允许网页在新窗口打开。当有新窗口打开时，应用侧会在 onWindowNew() 接口或 onWindowNewExt() 接口中收到Web组件新窗口事件。开发者需要在此接口事件中新建窗口来处理Web组件的窗口请求。 ![](https://conte… [`references/在新窗口中打开页面.md`](<references/在新窗口中打开页面.md>)
- **坚盾守护模式** — 坚盾守护模式提供给高安全需求用户的系统级别安全模式。该模式通过限制设备基础功能，增强安全性，有效抵御远程攻击面的针对性攻击。 #### ArkWeb限制的HTML5特性 坚盾守护模式开启时，ArkWeb通过限制以下HTML5特性减少攻击面。 - 禁止使用WebAssembly能力。 - 禁止使用WebGL、WebGL2能力。 - 禁止使用PDF Viewer… [`references/坚盾守护模式.md`](<references/坚盾守护模式.md>)
- **定位与解决Web白屏问题** — Web页面出现白屏的原因众多，本文列举了若干常见白屏问题的排查步骤，供开发者快速定位。 1. 首先排查权限和网络状态。 2. 通过使用DevTools工具调试前端页面定位具体报错类型（跨域、资源404、JS异常）。 3. 在复杂布局场景中，排查渲染模式及组件约束条件的问题。 4. 处理H5代码兼容性问题。 5. 从日志中排查生命周期和网络加载相关关键字。 6… [`references/定位与解决Web白屏问题.md`](<references/定位与解决Web白屏问题.md>)
- **应用侧与前端页面的相互调用(C/C++)** — 本指导适用于ArkWeb应用侧与前端网页通信场景，开发者可根据应用架构选择使用ArkWeb Native接口完成业务通信机制（以下简称Native JSBridge）。 针对JSBridge进行性能优化可参考 JSBridge优化解决方案 #### 适用的应用架构 应用使用ArkTS、C++语言混合开发，或本身应用架构较贴近于小程序架构，自带C++侧环境，推… [`references/应用侧与前端页面的相互调用(C_C++).md`](<references/应用侧与前端页面的相互调用(C_C++).md>)
- **应用侧调用前端页面函数** — 应用侧可以通过 runJavaScript() 和 runJavaScriptExt() 方法调用前端页面的JavaScript相关函数。 runJavaScript() 和 runJavaScriptExt() 在参数类型上有以下差异： runJavaScriptExt() 支持string和ArrayBuffer类型参数，而 runJavaScript(… [`references/应用侧调用前端页面函数.md`](<references/应用侧调用前端页面函数.md>)
- **建立应用侧与前端页面数据通道(C/C++)** — 前端页面和应用侧之间可以使用Native方法实现两端通信（以下简称Native PostWebMessage），可解决ArkTS环境的冗余切换，同时允许发送消息、回调在非UI线程上运行，避免造成UI阻塞。当前只支持string和buffer数据类型。 #### 适用的应用架构 应用使用ArkTS、C++语言混合开发，或本身应用架构较贴近于小程序架构，自带C+… [`references/建立应用侧与前端页面数据通道(C_C++).md`](<references/建立应用侧与前端页面数据通道(C_C++).md>)
- **建立应用侧与前端页面数据通道** — 前端页面和应用侧之间可以用 createWebMessagePorts() 接口创建消息端口来实现两端的通信。 在下面的示例中，应用侧页面中通过createWebMessagePorts方法创建两个消息端口，再把其中一个端口通过 postMessage() 接口发送到前端页面，便可以在前端页面和应用侧之间互相发送消息。端口使用完毕后或Webview对象销毁前… [`references/建立应用侧与前端页面数据通道.md`](<references/建立应用侧与前端页面数据通道.md>)
- **托管网页中的媒体播放** — Web组件提供了应用接管网页中媒体播放的能力，用来支持应用增强网页的媒体播放，如画质增强等。 #### 使用场景 网页播放媒体时，存在以下问题：网页清晰度低、网页播放器播放控件功能有限、某些视频无法播放。 应用开发者可以使用该功能，通过自己或者第三方播放器接管网页媒体播放，从而改善播放体验。 #### 实现原理 #### ArkWeb内核播放媒体的框架 不开… [`references/托管网页中的媒体播放.md`](<references/托管网页中的媒体播放.md>)
- **拦截Web组件发起的网络请求** — 应用可以通过 onInterceptRequest 拦截Web组件发起的网络请求，也可以通过SchemeHandler来拦截Web组件发起的网络请求。SchemeHandler提供了ArkTS与NDK两套接口。 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_sc… [`references/拦截Web组件发起的网络请求.md`](<references/拦截Web组件发起的网络请求.md>)
- **管理Cookie及数据存储** — Cookie是服务端生成并发送到客户端的数据。客户端持有Cookie，便于服务端快速识别身份和状态。 当Cookie的SameSite属性未指定时，默认值为SameSite=Lax。这种设置下，Cookie仅在用户导航到其源站点时发送，不会在跨站请求中发送。 #### Cookie管理 Web组件提供 WebCookieManager 类来管理Cookie信… [`references/管理Cookie及数据存储.md`](<references/管理Cookie及数据存储.md>)
- **管理位置权限** — 从API version 9开始，支持Web组件的 GeolocationPermissions 类和 onGeolocationShow 方法对网页进行位置权限管理。更多信息请参见 应用数据安全 。 Web组件根据 GeolocationPermissions 类和 onGeolocationShow 方法的响应结果，决定是否赋予前端页面权限。用户可以获取… [`references/管理位置权限.md`](<references/管理位置权限.md>)
- **管理页面跳转及浏览记录导航** — 为了提高页面访问速度，浏览记录导航允许用户通过“前进”和“后退”按钮在历史记录的页面之间切换。Web组件支持用户跳转到应用内其他页面或者进行跨应用跳转。 #### 历史记录导航 在前端页面点击网页中的链接时，Web组件默认会自动打开并加载目标网址。当前端页面替换为新的加载链接时，会自动记录已经访问的网页地址。可以通过 forward() 和 backward… [`references/管理页面跳转及浏览记录导航.md`](<references/管理页面跳转及浏览记录导航.md>)
- **网页中安全区域计算和避让适配** — 早期设备屏幕多为矩形，应用界面能够完整展示。随着全面屏、刘海屏等异形屏幕的普及，屏幕边缘可能出现圆角、摄像头或系统导航条，导致界面部分被遮挡。 安全区域是指屏幕中未被设备硬件或系统UI遮挡的区域，不与系统非安全区域（如状态栏、挖孔区和导航栏）重叠。应用的布局默认限定在安全区域内，但系统提供沉浸式布局能力，允许应用通过配置使界面扩展至非安全区域。 在沉浸式效果… [`references/网页中安全区域计算和避让适配.md`](<references/网页中安全区域计算和避让适配.md>)
- **自定义页面请求响应** — Web组件支持在应用拦截到页面请求后自定义响应请求能力。开发者通过 onInterceptRequest() 接口来实现自定义资源请求响应。自定义请求能力可以用于开发者自定义Web页面响应、自定义文件资源响应等场景。 Web网页上发起资源加载请求，应用层收到资源请求信息。应用层构造本地资源响应信息发送给Web内核。Web内核解析应用层响应信息，根据此响应信息… [`references/自定义页面请求响应.md`](<references/自定义页面请求响应.md>)
- **获取网页内容高度** — 通过调用 getPageHeight 可获取当前网页内容的实际高度，开发者可以根据具体需求选择合适的方法。 #### 使用场景 在网页加载过程中，获取的高度可能不够精确，特别是在网页还未渲染完成时。因为动态内容加载后会更新这个值。网页内容可能需要长时间加载。目前网站为优化首次加载速度，会使用动态网页加载技术，用户在看到网页首帧时，页面资源还在动态加载页面，特… [`references/获取网页内容高度.md`](<references/获取网页内容高度.md>)
- **解决Web组件本地资源跨域问题** — 为了提高安全性，ArkWeb内核禁止file协议和resource协议访问跨域请求。因此，在使用Web组件加载本地离线资源的时候，Web组件会拦截file协议和resource协议的跨域访问。通过方法二设置一个路径列表，再使用file协议访问该路径列表中的资源，允许跨域访问本地文件。Web组件无法访问本地跨域资源时，DevTools控制台会显示报错信息： A… [`references/解决Web组件本地资源跨域问题.md`](<references/解决Web组件本地资源跨域问题.md>)
- **设置Web组件前进后退缓存** — Web组件为开发者提供了启用和配置前进后退缓存（以下简称BFCache）的功能。启用此功能后，能够显著提升用户返回至先前浏览网页的速度，尤其对于网络条件不佳的用户，可提供更为流畅的浏览体验。 BFCache功能启用后，Web组件会在用户离开当前页面时在内存中保存该页面的快照。当用户在短期内通过Web组件的前进或后退功能重新访问同一页面时，能够迅速恢复页面状态… [`references/设置Web组件前进后退缓存.md`](<references/设置Web组件前进后退缓存.md>)
