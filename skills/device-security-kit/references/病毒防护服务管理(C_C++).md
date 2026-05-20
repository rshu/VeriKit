# 病毒防护服务管理(C/C++)
---
# 病毒防护服务管理(C/C++)
#### 场景介绍
从6.0.0(20)开始，三方EDR（Endpoint Detection and Response）应用在Device Security Kit上注册后，可以调用注册、更新、卸载（删除数据）接口，将自身应用信息提交至HarmonyOS安全防护服务进行统一管理；零信任应用在Device Security Kit上注册后，可以查询所有注册的EDR信息列表（包含包名、当前版本号、上次更新时间、病毒防护开关状态、用户ID）；MDM应用在Device Security Kit上注册后，企业管理员可通过MDM（Mobile Device Management）应用启用或禁用HarmonyOS自带的安全防护服务。
#### 约束与限制
1.
当前能力仅支持2in1设备。
2.
不支持并发场景，同一时间仅允许一个三方EDR应用或MDM应用调用该模块接口。
#### 业务流程
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/91/v3/S7Im0lq_T7iPlLMPWrXIqw/zh-cn_image_0000002543214436.png?HW-CC-KV=V1&HW-CC-Date=20260421T111114Z&HW-CC-Expire=86400&HW-CC-Sign=FAE2D4846B1093F64DD9115B34A5AF93785E192850650FF26E37639D90449948)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/Faw7lJq4Qomu7p3wLX508Q/zh-cn_image_0000002573854351.png?HW-CC-KV=V1&HW-CC-Date=20260421T111114Z&HW-CC-Expire=86400&HW-CC-Sign=1FB33E6D6A373C3D26196A51689B9434CE4EB289D6AA09A947BE4F397A6F8F0E)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/LylIrXY0ToqRNOaSB1WgZw/zh-cn_image_0000002573974327.png?HW-CC-KV=V1&HW-CC-Date=20260421T111114Z&HW-CC-Expire=86400&HW-CC-Sign=1859B64D57F629201797E09545317A32E925F95A5D5FC7414D307B14E5223127)
**流程说明** ：
1.
三方EDR应用注册、更新、卸载时调用该模块接口向HarmonyOS安全防护服务进行应用信息同步。
2.
零信任应用调用该模块接口查询当前注册的所有三方EDR应用的信息。
3.
MDM应用调用该模块接口实现HarmonyOS安全防护功能的启停。
#### 接口说明
以下是病毒防护服务管理的相关接口，更多接口及使用方法请参见 [API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/devicesecurity-capi-securityantivirus) 。
| 接口名 | 描述 |
| --- | --- |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_RegisterAntivirus(const char* bundleName) | 三方EDR应用向HarmonyOS安全防护服务注册。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_UnregisterAntivirus(const char* bundleName) | 三方EDR应用从HarmonyOS安全防护服务注销。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_UpdateAntivirus(const SecurityAntivirus_Antivirus* antivirus) | 三方EDR应用向HarmonyOS安全防护服务更新自身应用信息，包含包名、当前版本号、上次更新时间、病毒防护开关状态、用户ID。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_QueryAntivirus(SecurityAntivirus_Antivirus** list, uint32_t* length) | 零信任应用向HarmonyOS安全防护服务查询当前所有三方EDR注册信息。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_QueryPreinstalledAntivirus(SecurityAntivirus_Antivirus** list, uint32_t* length) | MDM应用向HarmonyOS安全防护服务查询所有用户的防病毒功能状态。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_EnablePreinstalledAntivirus(void) | MDM应用启用HarmonyOS安全防护服务所有用户的防病毒功能。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_DisablePreinstalledAntivirus(void) | MDM应用禁用HarmonyOS安全防护服务所有用户的防病毒功能。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_EnablePreinstalledAntivirusByAccount(int32_t accountId) | MDM应用启用HarmonyOS安全防护服务中用户ID为accountId的防病毒功能。 |
| SecurityAntivirus_ErrCode HMS_SecurityAntivirus_DisablePreinstalledAntivirusByAccount(int32_t accountId) | MDM应用禁用HarmonyOS安全防护服务中用户ID为accountId的防病毒功能。 |
#### 开发步骤
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/29/v3/7Ck-jYsBTLm6df0dPFXfeg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111114Z&HW-CC-Expire=86400&HW-CC-Sign=080ECF368A062650D2DC0F34517130E91C002CE7B662593BCF71D309F8F2A796)
-
在开发准备过程中，需要申请权限：ohos.permission.REGISTER_ANTIVIRUS、ohos.permission.MANAGE_ANTIVIRUS、ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS。
-
只允许名单内的应用申请该权限，申请方式请参考： [申请使用企业类应用可用权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-enterprise-apps) ， [申请使用仅MDM应用可用权限](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/permissions-for-mdm-apps)
1.
在CMakeLists.txt中导入病毒防护服务管理共享库，并链接该库。
```
find_library(dsm-lib libsecurityantivirus_ndk.z.so)
target_link_libraries(entry PUBLIC libace_napi.z.so ${dsm-lib})
```
2.
导入病毒防护服务管理的头文件。
```c
#include <cstdio>
#include <cstdlib>
#include "DeviceSecurityKit/security_antivirus.h"
```
3.
EDR应用执行接口调用，分别向HarmonyOS安全防护服务中同步注册、卸载、更新信息，需要ohos.permission.REGISTER_ANTIVIRUS权限。
```c
const char *regisBundleName = "****"; // 构造注册接口入参
int ret = HMS_SecurityAntivirus_RegisterAntivirus(regisBundleName);
printf("HMS_SecurityAntivirus_RegisterAntivirus ret = %d \n", ret);
const char *unRegisBundleName = "****"; // 构造卸载接口入参
ret = HMS_SecurityAntivirus_UnregisterAntivirus(unRegisBundleName);
printf("HMS_SecurityAntivirus_UnregisterAntivirus ret = %d \n", ret);
SecurityAntivirus_Antivirus updateAntivirus; // 构造更新接口入参
ret = HMS_SecurityAntivirus_UpdateAntivirus(&updateAntivirus);
printf("HMS_SecurityAntivirus_UpdateAntivirus ret = %d \n", ret);
```
4.
零信任应用执行接口调用，查询当前所有在HarmonyOS安全防护服务中注册的三方EDR应用信息，需要ohos.permission.MANAGE_ANTIVIRUS权限。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/AYrPwJeoSN6KpFXOyvJs1w/caution_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111114Z&HW-CC-Expire=86400&HW-CC-Sign=C36EE4A3A84878DCA9CD5702FD1BA974EF51CDD1A6777CCB00CD7C65D6949434)
零信任应用在根据应用进程信息进行业务处理后，需要释放查询接口出入参的内存。
```c
SecurityAntivirus_Antivirus *list = nullptr; // 构造查询接口出参1
uint32_t length = 0; // 构造查询接口出参2
int ret = HMS_SecurityAntivirus_QueryAntivirus(&list, &length);
printf("HMS_SecurityAntivirus_QueryAntivirus ret = %d \n", ret);
for (uint32_t i = 0; i < length; ++i) {
    free((char*)(list[i].bundleName)); // 释放出参内部字符串
    free((char*)(list[i].metadata));
}
free(list); // 释放出参数组本身
```
5.
MDM应用执行接口调用，实现HarmonyOS安全防护服务的启停，需要ohos.permission.MANAGE_PREINSTALLED_ANTIVIRUS权限。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3/v3/ibMEZBdsQQCngxClegF6cg/caution_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111114Z&HW-CC-Expire=86400&HW-CC-Sign=B2139CA4C0520C36137BA0FF08AC49A3A5B4B65ACE88FC76D280BEC3D01BA0BC)
MDM应用在根据应用进程信息进行业务处理后，需要释放查询接口出入参的内存。
```c
SecurityAntivirus_Antivirus *list = nullptr; // 构造查询接口出参1
uint32_t length = 0; // 构造查询接口出参2
int ret = HMS_SecurityAntivirus_QueryPreinstalledAntivirus(&list, &length);
printf("HMS_SecurityAntivirus_QueryPreinstalledAntivirus ret = %d \n", ret);
for (uint32_t i = 0; i < length; ++i) {
    free((char*)(list[i].bundleName)); // 释放出参内部字符串
    free((char*)(list[i].metadata));
}
free(list); // 释放出参数组本身
ret = HMS_SecurityAntivirus_EnablePreinstalledAntivirus();
printf("HMS_SecurityAntivirus_EnablePreinstalledAntivirus ret = %d \n", ret);
ret = HMS_SecurityAntivirus_DisablePreinstalledAntivirus();
printf("HMS_SecurityAntivirus_DisablePreinstalledAntivirus ret = %d \n", ret);
int32_t accountId = 0; // 构造合法的用户ID
ret = HMS_SecurityAntivirus_EnablePreinstalledAntivirusByAccount(accountId);
printf("HMS_SecurityAntivirus_EnablePreinstalledAntivirusByAccount ret = %d \n", ret);
ret = HMS_SecurityAntivirus_DisablePreinstalledAntivirusByAccount(accountId );
printf("HMS_SecurityAntivirus_DisablePreinstalledAntivirusByAccount ret = %d \n", ret);
```