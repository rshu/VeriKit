# 通过Push Kit更新实况窗
---
# 通过Push Kit更新实况窗
#### 场景介绍
本地实况窗的更新依赖于应用进程的存活，为了让实况窗在生命周期内正常完成更新和结束，我们更推荐开发者使用Push Kit实时更新实况窗状态。
通过Push Kit更新实况窗的流程如下图：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/BusyQ2tDTF29N1qSnpg9dQ/zh-cn_image_0000002573974911.png?HW-CC-KV=V1&HW-CC-Date=20260421T111550Z&HW-CC-Expire=86400&HW-CC-Sign=7815ED2829D6802ADD138A593629A74045057BD1CEC4D596D1605F2528E6E2FC)
1.
使用Push Kit，获取Push Token。
2.
使用Live View Kit创建实况窗成功后，开发者需要将实况窗id、pushToken、实况窗场景event以及业务服务的相关的状态属性保存到业务服务端。
3.
当业务服务的用户订单状态发生变化时，通过Push Kit通道推送更新消息，更新/结束实况窗。
详细开发流程请参见Push Kit [推送实况窗消息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-update-liveview) 。