# 查询密钥别名集(ArkTS)
---
# 查询密钥别名集(ArkTS)
HUKS提供了接口供应用查询密钥别名集。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f0/v3/rGNsNqwQSy201Wyb9XVwKQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111133Z&HW-CC-Expire=86400&HW-CC-Sign=7C1A4D49749286D0AD6C31EAEBE922FEDAF53338EB2588846D3E855F2C6F81A0)
轻量级智能穿戴不支持查询密钥别名集功能。
从API 23开始支持 [群组密钥](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/huks-group-key-overview) 特性。
#### 开发步骤
1.
初始化密钥属性集，用于查询指定密钥别名集TAG。TAG仅支持 [HUKS_TAG_AUTH_STORAGE_LEVEL](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukstag) 。
2.
调用接口 [listAliases](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-huks#hukslistaliases12) ，查询密钥别名集。
```
/*
 * 以下查询密钥别名集Promise操作使用为例
 */
import { huks } from '@kit.UniversalKeystoreKit'
async function testListAliases() {
  /* 1.初始化密钥属性集 */
  let queryProperties: Array<huks.HuksParam> = [
    {
      tag: huks.HuksTag.HUKS_TAG_AUTH_STORAGE_LEVEL,
      value: huks.HuksAuthStorageLevel.HUKS_AUTH_STORAGE_LEVEL_DE
    }
  ];
  let queryOptions: huks.HuksOptions = {
    properties: queryProperties
  };
  try {
    /* 2.查询密钥别名集 */
    let result: huks.HuksListAliasesReturnResult = await huks.listAliases(queryOptions);
    console.info(`promise: listAliases success`);
  } catch (error) {
    console.error(`promise: listAliases fail`);
    throw (error as Error);
  }
}
```