# AI框架算子适配概述
---
# AI框架算子适配概述
本章节内容介绍AI框架调用自定义算子的方法。如下图所示，PyTorch和TensorFlow仅支持图模式。
AI框架调用时，除了需要提供DDK框架调用时需要的代码实现文件，还需要对插件进行适配开发。下文仅展示通过ONNX框架进行算子适配，TensorFlow框架开发流程与ONNX框架开发流程一致。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/92/v3/llgoxRiyQXWprZqzgNCy5g/zh-cn_image_0000002573975181.png?HW-CC-KV=V1&HW-CC-Date=20260421T111718Z&HW-CC-Expire=86400&HW-CC-Sign=F67788B0C214E14D0D06DEA00257F00F22D3BCE1A29F60738C8324F80E374C60)