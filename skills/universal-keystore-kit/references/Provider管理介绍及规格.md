# Provider管理介绍及规格
---
# Provider管理介绍及规格
HUKS提供外部密钥管理扩展能力（简称Ukey Extension）注册和注销接口。三方驱动HAP检测到Ukey存在时，调用Provider注册接口，将驱动HAP应用提供的外部密钥管理能力注册到系统中来。当检测到所有Ukey被拔出时，通过调用Provider注销接口，将其提供的外部密钥管理能力从系统中注销。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/-7v3wtOVRm2VkR9hOiNweA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111135Z&HW-CC-Expire=86400&HW-CC-Sign=D50811D8B1C5509CD040BB61A62A798BF643A6A81A84CAF516E5C63D700F514F)
1. Provider名称建议包含厂商信息，全局唯一。
2. Provider名称长度最大为128字节。
3. Provider注册和注销有权限管控，需申请[ohos.permission.CRYPTO_EXTENSION_REGISTER](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/restricted-permissions#ohospermissioncrypto_extension_register)权限。
4. 一个Provider可以关联到多个Ability。一般来说，Provider是厂商驱动名称，Ability是厂商针对其名下的各个业务定制扩展能力的名称，也可以由厂商自行决定Provider和Ability的名称。
**支持功能规格：**
| 功能 | 说明 | API级别 |
| --- | --- | --- |
| Provider注册 | 注册外部密钥管理扩展能力提供者到系统。 | 22+ |
| Provider注销 | 从系统中注销外部密钥管理扩展能力提供者。 | 22+ |