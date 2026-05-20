# 使用云存储上传文件失败，提示“404:Product does not exist”
---
# 使用云存储上传文件失败，提示“404:Product does not exist”
**问题现象**
使用云存储上传文件失败，HiLog提示“404:Product does not exist”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ad/v3/hsgm6FDwSiSBfqAOje-Hrw/zh-cn_image_0000002573974801.png?HW-CC-KV=V1&HW-CC-Date=20260421T111511Z&HW-CC-Expire=86400&HW-CC-Sign=735F88D8B5DC1C4F336B9ED958C432EE6108B873E40D1278349ACE4EA31E9136)
**解决措施**
此错误由云存储服务端返回，原因是云存储服务未开通。请 [开通云存储服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cloudfoundation-enable-storage) 。