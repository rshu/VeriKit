# 查询密钥别名集(C/C++)
---
# 查询密钥别名集(C/C++)
HUKS提供了接口供应用查询密钥别名集。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/64/v3/8AFZqdHpQmCwSuy-ZSdJpw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111133Z&HW-CC-Expire=86400&HW-CC-Sign=885F2CA1FA34D37C03AC15BEF05FF58C253372F7D559AC714A7F1C070F192B0E)
轻量级智能穿戴不支持查询密钥别名集功能。
从API 23开始支持 [群组密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-group-key-overview) 特性。
#### 在CMake脚本中链接相关动态库
```
target_link_libraries(entry PUBLIC libhuks_ndk.z.so)
```
#### 开发步骤
1.
初始化密钥属性集。用于查询指定密钥别名集TAG，TAG仅支持 [OH_HUKS_TAG_AUTH_STORAGE_LEVEL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-type-h#oh_huks_tag) 。
2.
调用接口 [OH_Huks_ListAliases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/capi-native-huks-api-h#oh_huks_listaliases) ，查询密钥别名集。
```
/* 以下查询密钥别名集为例 */
#include "huks/native_huks_api.h"
#include "huks/native_huks_param.h"
#include "napi/native_api.h"
#include <string.h>
OH_Huks_Result InitParamSet(
   struct OH_Huks_ParamSet **paramSet,
   const struct OH_Huks_Param *params,
   uint32_t paramCount)
{
   OH_Huks_Result ret = OH_Huks_InitParamSet(paramSet);
   if (ret.errorCode != OH_HUKS_SUCCESS) {
       return ret;
   }
   ret = OH_Huks_AddParams(*paramSet, params, paramCount);
   if (ret.errorCode != OH_HUKS_SUCCESS) {
       OH_Huks_FreeParamSet(paramSet);
       return ret;
   }
   ret = OH_Huks_BuildParamSet(paramSet);
   if (ret.errorCode != OH_HUKS_SUCCESS) {
       OH_Huks_FreeParamSet(paramSet);
       return ret;
   }
   return ret;
}
struct OH_Huks_Param g_testQueryParam[] = {
   {
       .tag = OH_HUKS_TAG_AUTH_STORAGE_LEVEL,
       .uint32Param = OH_HUKS_AUTH_STORAGE_LEVEL_DE
   },
};
static napi_value ListAliases(napi_env env, napi_callback_info info)
{
   struct OH_Huks_ParamSet *testQueryParamSet = nullptr;
   struct OH_Huks_KeyAliasSet *outData = nullptr;
   struct OH_Huks_Result ohResult;
   do {
       /* 1.初始化密钥属性集 */
       ohResult = InitParamSet(&testQueryParamSet, g_testQueryParam,
           sizeof(g_testQueryParam) / sizeof(OH_Huks_Param));
       if (ohResult.errorCode != OH_HUKS_SUCCESS) {
           break;
       }
       /* 2.查询密钥别名集 */
       ohResult = OH_Huks_ListAliases(testQueryParamSet, &outData);
   } while (0);
   OH_Huks_FreeParamSet(&testQueryParamSet);
   OH_Huks_FreeKeyAliasSet(outData);
   napi_value ret;
   napi_create_int32(env, ohResult.errorCode, &ret);
   return ret;
}
```