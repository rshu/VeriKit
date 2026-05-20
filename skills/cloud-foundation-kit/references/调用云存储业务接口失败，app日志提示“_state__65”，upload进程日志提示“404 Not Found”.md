# 调用云存储业务接口失败，app日志提示“"state":65”，upload进程日志提示“404 Not Found”
---
# 调用云存储业务接口失败，app日志提示“"state":65”，upload进程日志提示“404 Not Found”
**问题现象**
通过“使用指定的实例”方式初始化云存储实例时，调用业务接口（如调用uploadFile接口上传文件）失败，出现如下错误提示：
-
app日志提示“"state":65”
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/27/v3/LmPeK3fwSFCo70GHodwYow/zh-cn_image_0000002573854825.png?HW-CC-KV=V1&HW-CC-Date=20260421T111512Z&HW-CC-Expire=86400&HW-CC-Sign=C56058C7BB3C650908F23CA3B2ABC031A34006319FB01758A1291378DBD9B270)
-
upload进程的日志提示“404 Not Found”（通过设置“No filters”模式、过滤“C01C50”关键字查找）
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/97/v3/hH41oZ_pRd2jsJKctPSyDg/zh-cn_image_0000002573974803.png?HW-CC-KV=V1&HW-CC-Date=20260421T111512Z&HW-CC-Expire=86400&HW-CC-Sign=E16FE02C31D1A45A6F2AB340265778831E4F7BA99E064679613A69AA0A331A68)
**解决措施**
出现此问题，原因是当前云侧不存在该存储实例，或传入的存储实例名称错误。
请检查您传入的存储实例名称，确保云侧存在该存储实例，且传入的存储实例名称与云侧存储实例名称完全一致。