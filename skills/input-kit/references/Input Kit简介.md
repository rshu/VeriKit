# Input Kit简介
---
# Input Kit简介
#### 功能介绍
Input Kit（多模输入Kit）为多种输入设备提供服务，如触控板、触摸屏、鼠标、键盘等。通过对这些输入设备上报驱动事件的归一化处理，确保不同输入设备与用户交互体验统一和流畅。
Input Kit除了提供基础的输入事件服务之外，还提供了获取输入设备列表、改变鼠标光标样式等功能和接口。
#### 运作机制
多模输入能力作为系统为应用提供的一种基础服务，通过处理上报的输入设备驱动事件，完成输入事件管理、接收、预处理、分发，通过inner SDK与JSkit上报应用，具体运行机制如下。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/20/v3/E20Cd4ikSgOmnh7hFeDArg/zh-cn_image_0000002573854405.png?HW-CC-KV=V1&HW-CC-Date=20260421T111217Z&HW-CC-Expire=86400&HW-CC-Sign=511748843FAE7E9EC00BD7F33940D8E38DF3B8600C28FF5A3673B09782E1D95F)