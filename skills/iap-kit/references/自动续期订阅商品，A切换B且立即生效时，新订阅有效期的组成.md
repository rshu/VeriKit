# 自动续期订阅商品，A切换B且立即生效时，新订阅有效期的组成
---
# 自动续期订阅商品，A切换B且立即生效时，新订阅有效期的组成
订阅在发生切换且立即生效时，原订阅的剩余权益价值会自动按照比例，折算并叠加至新订阅。所以，切换后订阅有效期的组成 = 原订阅剩余权益的折算时间 + 新订阅原本的周期时间。
比如，某个用户首先购买了订阅A（普通会员，20元/30天），使用了15天后，切换成同订阅组下的订阅B（高级会员，60元/30天）。切换时，A订阅剩余权益自动按比例折算，折算至B订阅的时间为5天。则切换后，B订阅有效期的天数 = 5天 + 30天 = 35天。
时间轴（MM/dd）如下：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/71/v3/kV13i2sxTuavkT1DZyc6OA/zh-cn_image_0000002543374642.png?HW-CC-KV=V1&HW-CC-Date=20260421T111547Z&HW-CC-Expire=86400&HW-CC-Sign=33FDC9C9BF3C743E086350B1FD109AD32D56CC3C2DF001F3CD2ED59720EE8F43)
对于沙盒环境，按照生产1天 = 沙盒10s换算，等效时间轴（hh:mm:ss）如下：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7f/v3/zUVxbi1XTC2VE581fS_taw/zh-cn_image_0000002543214980.png?HW-CC-KV=V1&HW-CC-Date=20260421T111547Z&HW-CC-Expire=86400&HW-CC-Sign=9707F85445FA0AB1DE5F8CBEAD81D6BE92C1169509DCBF4C64A0E989482D9466)