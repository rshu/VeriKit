# 秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？
---
# 秒级启动后，游戏出现类似UIContent is nullptr报错导致登录等异常，应该如何排查？
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a7/v3/o9yCTXV8RDOnZZoqP3I7Nw/zh-cn_image_0000002573974655.png?HW-CC-KV=V1&HW-CC-Date=20260421T111425Z&HW-CC-Expire=86400&HW-CC-Sign=AD430CEA1EA9DA4272081CA62ED37AB501FCF0F54247C8A8C3E0ED175D47AD3B)
该报错通常是由于游戏在秒级启动后未重新获取并更新 [UIAbilityContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext) ，导致后续逻辑仍使用旧的Context对象。当 [UIAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/uiability) 被重新创建时，如果相关模块或三方SDK继续使用旧的UIAbilityContext，可能会导致接口调用异常、资源访问失败或SDK功能异常。
排查要点：
1.
游戏启动后进入onCreate生命周期时，是否重新更新UIAbilityContext。
以 [示例工程](https://gitcode.com/HarmonyOS_Codelabs/graphics-accelerate-kit-launch-acceleration-codelab-arkts/blob/master/entry/src/main/ets/ability/TuanjiePlayerAbilityBase.ets) 为例，AbilityContext的赋值应放在isFirstLaunchFlag判断之外，以确保每次启动（包括秒级启动）都能更新为当前UIAbility的UIAbilityContext。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7a/v3/obqm7PQ6R3u8oa9C2dgN3g/zh-cn_image_0000002543374428.png?HW-CC-KV=V1&HW-CC-Date=20260421T111425Z&HW-CC-Expire=86400&HW-CC-Sign=5EB38E7795F41DBA6BFAFEB3CC23C083DD90BCD0CCE0F0EFCD7F0720869138AD)
2.
对于依赖UIAbilityContext的三方SDK，是否在每次启动时同步更新Context。
若三方SDK在初始化或调用过程中依赖UIAbilityContext，需要在UIAbility重新创建时，将最新的UIAbilityContext重新传递给SDK，避免继续使用旧的Context实例。