# 1001502014 应用未申请scopes或permissions权限的可能原因和解决方法
---
# 1001502014 应用未申请scopes或permissions权限的可能原因和解决方法
**问题现象**
调用接口报错1001502014 应用未申请scopes或permissions权限。
**可能原因**
1.
没有申请对应的账号权限。
2.
权限申请成功后，最迟会在25小时后生效。
3.
使用 [获取风险等级](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-get-risklevel-introduction) 能力，但未申请获取风险等级权限。
**解决措施**
1.
申请对应权限，请见 [申请账号权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-config-permissions) 章节。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c8/v3/ShzgVRhEQhqJse3pKdJvHQ/zh-cn_image_0000002543374436.png?HW-CC-KV=V1&HW-CC-Date=20260421T111437Z&HW-CC-Expire=86400&HW-CC-Sign=6B7F1B22E4FC458E9EA88BC8EBCD81313D4A22EA3D1A88861D0826E3C85BB91F)
2.
权限申请通过后，您可通过修改应用工程 > app.json5中的versionCode触发权限生效。
**图1** 修改前
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a2/v3/fPtrv_ICRA2XS29tWwsNjw/zh-cn_image_0000002573854689.png?HW-CC-KV=V1&HW-CC-Date=20260421T111437Z&HW-CC-Expire=86400&HW-CC-Sign=06F3CC52957774CA58B7E36ABEFB54AC67927DB3D821BF50311C6F062D1E0580)
**图2** 修改后
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f1/v3/X5nFOggOTzKbb9hFNpeUOg/zh-cn_image_0000002573974665.png?HW-CC-KV=V1&HW-CC-Date=20260421T111437Z&HW-CC-Expire=86400&HW-CC-Sign=99E6F77C7B8684FDAE30CFD64DAC11D4BD4F8F605BA9CADBA3B89578DD6B9E7C)
3.
确认是否需要使用获取风险等级能力，如需使用，请参考 [获取风险等级](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/account-get-risklevel-introduction) 申请对应权限。