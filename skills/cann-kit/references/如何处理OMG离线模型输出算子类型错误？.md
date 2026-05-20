# 如何处理OMG离线模型输出算子类型错误？
---
# 如何处理OMG离线模型输出算子类型错误？
Caffe网络中具有相同类型名但计算功能不同的层。比如DetectionOutput层，需要使用算子映射指明为FSRDetectionOutput、SSDDetectionOutput等检测算子类型，否则OMG生成离线模型会执行失败。为了避免出现错误，以下两种方案二选一即可。
-
方案1：可以在OMG命令中加入--op_name_map参数，参考 [OMG参数](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-overall-parameter) 中op_name_map参数设置。
-
方案2：可以在原始网络proto模型文件中将输出算子类型指定为SSDDetectionOutput等算子类型，如下图所示。
**图1** 输出算子类型修改前（左）和修改后（右）
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c6/v3/zyes2MPEQmi5LIUaph-CMw/zh-cn_image_0000002573855243.png?HW-CC-KV=V1&HW-CC-Date=20260421T111931Z&HW-CC-Expire=86400&HW-CC-Sign=63116FC5A544E4A8F8214A4B1A79536D391E47827077ACBF3FA24DC654D85472)