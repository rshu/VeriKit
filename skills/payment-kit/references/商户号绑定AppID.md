# 商户号绑定AppID
---
# 商户号绑定AppID
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/b8WJOG3OQrm7fJ-2RMwOmg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=17905FD35CEF192DDEE0F1523195C1DD0FE19F2296BB9E684ACA400257F5BB29)
商户号绑定AppID的商户需要通过 [华为支付商户平台](https://petalpay-merchant.cloud.huawei.com/) 入网，详见 [商户入网和获取商户号](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-merc-regist-apply) 。通过 [华为开发者联盟官网](https://developer.huawei.com/consumer/cn/) 开通 [商户服务](https://developer.huawei.com/consumer/cn/doc/app/open-0000001959074873) 入网的商户暂不支持直接接入华为支付以及绑定AppID操作。
商户（以下所称商户均包含所有商户模型）后续支付交易依赖于 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 中 [创建应用](https://developer.huawei.com/consumer/cn/doc/app/agc-help-create-app-0000002247955506) 生成的AppID与商户号的关联关系。商户在请求预下单接口传递AppID入参，后续可以在 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站上基于应用维度查看交易报表数据。传递AppID参数后，华为支付侧会校验商户号与传递的AppID是否匹配，如不匹配则会直接响应异常。因此，接入鸿蒙支付服务前商户需要为商户号绑定AppID，如无商户号则需要先申请，详细介绍参考 [商户入网和获取商户号](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-merc-regist-apply) 。
AppID绑定详细可参见 [AppID管理及关联](https://developer.huawei.com/consumer/cn/doc/pay-docs/hwzf-appidguanli-0000001757041165) 。
#### 基本概念
**同主体** ：商户号与AppID所关联的营业主体信息一致。
**异主体** ：商户号与AppID关联的营业主体信息不一致。
#### 绑定AppID说明
1.
暂不支持平台子商户及特约商户发起绑定AppID申请。
2.
商户发起绑定AppID申请，异主体绑定需要商户与华为支付侧沟通申请开通异主体绑定权限（可参考 [产品开通操作](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-product-configuration#场景一产品开通操作) ）后才可在 [华为支付商户平台](https://petalpay-merchant.cloud.huawei.com/) 发起异主体AppID绑定操作。
3.
AppID关联的营业主体与特约商户商户号或与服务商商户号关联的营业主体一致，都认为是同主体，可直接发起绑定。
4.
商户发起绑定申请后，商户应用管理员登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站才能对商户号绑定AppID进行授权（提示“主体不一致”可 [参见这里](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/payment-faq-26) ）。
#### 直连商户/平台类商户绑定
1.
请登录 [华为支付商户平台](https://petalpay-merchant.cloud.huawei.com/) 进入“商户中心 > 产品功能 > AppID管理 > 新增关联AppID”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/BstXTtkCR2CsOGtM2drhiQ/zh-cn_image_0000002543215110.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=8A855D106BCB75E61B4889BC11EEEC6BA68696DCA1B3861CC6EB457C23A52AC0)
2.
申请绑定AppID后，应用管理员登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站选择对应的项目后，在左侧导航栏选择“盈利 > 鸿蒙支付服务（可在‘全部功能’中搜索服务并固定到导航栏）> 支付服务（非虚拟类）> 待关联商户号”选择对应的商户点击“授权”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/gqXd85ASQOWlEMwKtbYwgQ/zh-cn_image_0000002573855025.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=05AE8D68EF14E1B21531199D4C6AE97CB14CF59C598F2B9CB67E4E5D486CD0F1)
#### 服务商绑定
服务商绑定AppID涉及如下场景：
1.
**服务商绑定**
服务商需要绑定服务商应用AppID可直接在华为支付商户平台发起绑定申请。
2.
**特约商户绑定**
特约商户需要绑定特约商户应用AppID，需要服务商在华为支付商户平台发起邀请特约商户绑定AppID才可以进行绑定。
#### 服务商绑定
1.
服务商登录 [华为支付商户平台](https://petalpay-merchant.cloud.huawei.com/) 进入“商户中心 > 产品功能 > AppID管理”，在“服务商绑定的AppID”页签内点击“新增关联AppID”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/19/v3/2VSozgnjTbaGLnEbEipzBQ/zh-cn_image_0000002573975007.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=25A30812958F431C89B9938DA2DF4624852E266669F182BEFE61909C699885A5)
2.
申请绑定AppID后，应用管理员登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站选择对应的项目后，在左侧导航栏选择“盈利 > 鸿蒙支付服务（可在‘全部功能’中搜索服务并固定到导航栏）> 支付服务（非虚拟类）> 待关联商户号”选择对应的商户点击“授权”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3a/v3/Pk_EoFalSWKj7XpGCIcJXg/zh-cn_image_0000002543374774.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=9A3E79C1D44B8EA2DF8A3966D3A42F83DE72968AC683308D51EBAC51D8C812EF)
#### 服务商邀请特约商户绑定
1.
服务商登录 [华为支付商户平台](https://petalpay-merchant.cloud.huawei.com/) 进入“商户中心 > 产品功能 > AppID管理”，在“特约商户绑定的AppID”页签内根据服务商下的特约商户列表，选择特约商户发起AppID绑定申请邀请。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/UqSfw63vSba9VkstuRPZCQ/zh-cn_image_0000002543215112.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=8844141FFF7D144B0390F49F7019CAF36801456CA480D5E0F82C0A547F7BE45F)
2.
特约商户登录 [华为支付商户平台](https://petalpay-merchant.cloud.huawei.com/) 进入“商户中心 > 产品功能 > AppID管理”选择“服务商为我绑定的AppID列表”中的数据，点击去确认，对服务商邀请绑定AppID进行确认。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/62/v3/xa4tetj6Sg2IWVcA4x8y0A/zh-cn_image_0000002573855027.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=B8DBA4C6BA4D3B67184F92B1A906685537F77902DE3AE263485E1A91B58D8374)
3.
特约商户确认绑定AppID后，应用管理员登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 网站选择对应的项目后，在左侧导航栏选择“盈利 > 鸿蒙支付服务（可在‘全部功能’中搜索服务并固定到导航栏）> 支付服务（非虚拟类）> 待关联商户号”选择对应的商户点击“授权”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7a/v3/fT0WQhcFQJKS5PXkuHh0pQ/zh-cn_image_0000002573975009.png?HW-CC-KV=V1&HW-CC-Date=20260421T111609Z&HW-CC-Expire=86400&HW-CC-Sign=0AD711454397549D2B8012B6372F7A9BA21F392BF1B73D41677214669C5C8A86)