# 组件启动规则（Stage模型）
---
# 组件启动规则（Stage模型）
启动组件是指一切启动或连接应用组件的行为：
-
启动 [UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-uiability) 、ServiceExtensionAbility、DataShareExtensionAbility，如使用 [startAbility()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startability) 、startServiceExtensionAbility()、 [startAbilityByCall()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startabilitybycall) 、 [openLink()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12) 等相关接口。
-
连接ServiceExtensionAbility、DataShareExtensionAbility，如使用 [connectServiceExtensionAbility()](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#connectserviceextensionability) 、createDataShareHelper()等相关接口。
#### 组件启动总体规则
为了保证用户具有更好的使用体验，对以下几种易影响用户体验与系统安全的行为做了限制：
-
后台应用任意弹框，如各种广告弹窗，影响用户使用。
-
后台应用相互唤醒，不合理的占用系统资源，导致系统功耗增加或系统卡顿。
-
前台应用任意跳转至其他应用，如随意跳转到其他应用的支付页面，存在安全风险。
鉴于此，制定了一套组件启动规则，主要包括：
-
**跨应用启动组件，需校验目标组件是否可以被其他应用调用。**
若目标组件exported字段配置为true，表示可以被其他应用调用；若目标组件exported字段配置为false，表示不可以被其他应用调用，还需进一步校验ohos.permission.START_INVISIBLE_ABILITY权限（该权限仅系统应用可申请）。组件exported字段说明可参考 [abilities标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#abilities标签) 。
-
**位于后台的UIAbility应用，启动组件需校验BACKGROUND权限ohos.permission.START_ABILITIES_FROM_BACKGROUND（该权限仅系统应用可申请）。**
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/pYKz2JmRS0iaVlq22siMQQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110738Z&HW-CC-Expire=86400&HW-CC-Sign=CFEC21810C44CF364BB6D7987C798C8356A75FDA86E4458A5F71BE68277DBE3B)
- 前后台应用的判断依据：若应用进程获焦或所属的UIAbility组件位于前台则判定为前台应用，否则为后台应用。
-
- 从API version 18开始，如果应用已创建在前台显示的悬浮窗，当该应用退至后台时，无需校验BACKGROUND权限也可以拉起其他Ability。
- 从API version 21开始，如果应用自身已经添加到状态栏，则当应用退至后台时，无需校验BACKGROUND权限也可以拉起自身的UIAbility。
-
**跨设备使用startAbilityByCall接口，需校验分布式权限ohos.permission.DISTRIBUTED_DATASYNC。**
上述组件启动规则自API 9版本开始生效，新增规则生效版本在规则中单独说明。开发者需熟知组件启动规则，避免业务功能异常。启动组件的具体校验流程见下文。
#### 同设备组件启动规则
设备内启动组件，不同场景下的规则不同，可分为如下三种场景：
-
启动UIAbility。
-
启动ServiceExtensionAbility、DataShareExtensionAbility。
-
通过 [startAbilityByCall](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startabilitybycall) 接口启动UIAbility。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/FN-JeFnoQX2mp954iieQ2A/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110738Z&HW-CC-Expire=86400&HW-CC-Sign=BC44B58CACC579E9F0A89309A7D5050DF84D72769BF38D3DE8D28BB476D972E0)
下图中的BACKGROUND权限是指ohos.permission.START_ABILITIES_FROM_BACKGROUND，CALL权限是指ohos.permission.ABILITY_BACKGROUND_COMMUNICATION。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/1D95gAgyRaukyzzDKFcAfA/zh-cn_image_0000002573853443.png?HW-CC-KV=V1&HW-CC-Date=20260421T110738Z&HW-CC-Expire=86400&HW-CC-Sign=9E9AE19D19E1F57FE25B34FAA17877B4C0C46CA20DE952BD6E3D3BB36C177FB2)
#### 分布式跨设备组件启动规则
跨设备启动组件，不同场景下的规则不同，可分为如下三种场景：
-
启动UIAbility。
-
启动ServiceExtensionAbility、DataShareExtensionAbility。
-
通过 [startAbilityByCall](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#startabilitybycall) 接口启动UIAbility。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/IhtFqLiQTW2clczpRya4MQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110738Z&HW-CC-Expire=86400&HW-CC-Sign=2DB0370650E8B7F2C018AC4D4C8C06F97A06CE363CB0CF5C24F31348C5C511BC)
下图中的BACKGROUND权限是指ohos.permission.START_ABILITIES_FROM_BACKGROUND，DATASYNC权限是指ohos.permission.DISTRIBUTED_DATASYNC。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/ZOxbismVQFWzFROOO8uvPA/zh-cn_image_0000002573973421.png?HW-CC-KV=V1&HW-CC-Date=20260421T110738Z&HW-CC-Expire=86400&HW-CC-Sign=00DF55FBF9FC10ED864A485472C1214ACE4D20E3ABE1F249CF008F22E8637927)