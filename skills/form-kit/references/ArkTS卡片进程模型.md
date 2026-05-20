# ArkTS卡片进程模型
---
# ArkTS卡片进程模型
本文主要介绍，卡片从创建到显示整个过程中各个进程的含义。具体请参考卡片进程模型。
**图1** 卡片进程模型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/eAvzn39gQvCfh4zfCHQ-FA/zh-cn_image_0000002573854237.png?HW-CC-KV=V1&HW-CC-Date=20260421T111006Z&HW-CC-Expire=86400&HW-CC-Sign=1968A9D762645DFDC72524AA55E38B3D9E8E820E12161B4B18BF24BC9935D6CA)
- 卡片使用方进程：显示卡片的宿主进程，例如桌面进程。
- 卡片渲染服务进程：系统内统一加载渲染卡片UI的进程，所有卡片渲染在同一个进程内，不同的应用卡片通过虚拟机隔离。
- 卡片管理服务进程：系统内统一卡片生命周期的系统[SA](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/serviceability-overview)服务。
- 卡片提供方进程：提供卡片的应用进程，包括应用自身UIAbility运行的主进程，以及卡片单独的[FormExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-form-formextensionability)进程。两个进程之间内存隔离，但是共享相同的文件沙箱。