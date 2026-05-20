# 使用云存储上传文件失败，app日志提示“"state":65”，upload进程日志提示“403 Forbidden”
---
# 使用云存储上传文件失败，app日志提示“"state":65”，upload进程日志提示“403 Forbidden”
**问题现象**
使用云存储上传文件失败，出现如下错误提示：
-
app日志提示“"state":65”
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f7/v3/hqbrqqQVT_qATiI0433BMA/zh-cn_image_0000002543374572.png?HW-CC-KV=V1&HW-CC-Date=20260421T111511Z&HW-CC-Expire=86400&HW-CC-Sign=57AA17FFD1883BB0B1C3931258B7DAF2652177B6869F0B9A89D9E9F6088118A6)
-
upload进程的日志提示“403 Forbidden”（通过设置“No filters”模式、过滤“C01C50”关键字查找）
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/12/v3/t4emKWbuSTapHWPfq-Qyug/zh-cn_image_0000002543214910.png?HW-CC-KV=V1&HW-CC-Date=20260421T111511Z&HW-CC-Expire=86400&HW-CC-Sign=CA40052E628A5E534387982F799A20D29EE6A53B04E5550769D269E76B172A77)
**解决措施**
出现此问题，可按照如下步骤排查和解决：
1.
请确认应用的签名方式正确。当前Cloud Foundation Kit支持 [关联注册应用进行自动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section20943184413328) 和 [手动签名](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233) 两种方式。
2.
请确认已通过 [AuthProvider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/cloudfoundation-cloudcommon#authprovider) 获取用户凭据。未配置用户凭据的情况下，服务端会返回“403 Forbidden”错误。