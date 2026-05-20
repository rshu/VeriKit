# 线性布局 (Row/Column)
---
# 线性布局 (Row/Column)
#### 概述
线性布局（LinearLayout）是开发中最常用的布局，通过线性容器 [Row](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-row) 和 [Column](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column) 构建。线性布局是其他布局的基础，其子元素在线性方向上（水平方向和垂直方向）依次排列。线性布局的排列方向由所选容器组件决定，Row容器内子元素按照水平方向排列，Column容器内子元素按照垂直方向排列。根据不同的排列方向，开发者可选择使用Row或Column容器创建线性布局。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c0/v3/h4XkzyUFRMq6KZR1pMqwww/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=F504CCD7ACF6FADC7DF1AB0C1434E3157BD4563AD74BCBF65468BE60AA05F736)
在复杂界面中使用多组件嵌套时，若布局组件的嵌套层数过深或嵌套的组件数量过多，将会产生额外开销。建议通过移除冗余节点、利用布局边界减少布局计算、合理采用渲染控制语法及布局组件方法来优化性能。最佳实践请参考 [布局优化指导](https://developer.huawei.com/consumer/cn/doc/best-practices/bpta-improve-layout-performance) 。
**图1** Column容器内子元素排列示意图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/43/v3/dXy56nMgRC6FDWRv6TKGXg/zh-cn_image_0000002543213726.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=CCF38A9B1A4B9A19875D511BC3261C88603D27EAA38AF7482C4A08E91F306D40)
**图2** Row容器内子元素排列示意图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d9/v3/qBRbBAsVQLGEiNGYQ0tI_Q/zh-cn_image_0000002573853639.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=A889652F75FC6BBC588F358080EDDCE82F5FEDC4689F348FCC48E61CDBA2601B)
#### 基本概念
-
布局容器：具有布局能力的容器组件，可以承载其他元素作为其子元素，布局容器会对其子元素进行尺寸计算和布局排列。
-
布局子元素：布局容器内部的元素。
-
主轴：线性布局容器在布局方向上的轴线，子元素默认沿主轴排列。Row容器主轴为水平方向，Column容器主轴为垂直方向（图示可参考弹性布局 [基本概念](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-flex-layout#基本概念) 中的主轴）。
-
交叉轴：垂直于主轴方向的轴线。Row容器交叉轴为垂直方向，Column容器交叉轴为水平方向（图示可参考弹性布局 [基本概念](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-flex-layout#基本概念) 中的交叉轴）。
-
间距：布局子元素的间距。
#### 布局子元素在排列方向上的间距
在布局容器内，可以通过space属性设置排列方向上子元素的间距，使各子元素在排列方向上有等间距效果。
#### Column容器内排列方向上的间距
**图3** Column容器内排列方向的间距图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/2v-S9a6vQVaAL0NijsiC6w/zh-cn_image_0000002573973617.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=9B35F592CD9645C34A61CD8CE9DE2DF9969FB70FCE1AB2EE1D759C6363C9891D)
```
Column({ space: 20 }) {
  Text('space: 20').fontSize(15).fontColor(Color.Gray).width('90%')
  Row().width('90%').height(50).backgroundColor(0xF5DEB3)
  Row().width('90%').height(50).backgroundColor(0xD2B48C)
  Row().width('90%').height(50).backgroundColor(0xF5DEB3)
}.width('100%')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ef/v3/5ojFGnA1QwyebIw3E7K9TA/zh-cn_image_0000002543373388.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=688ABA529340EF6E2E218E104437ABAAB44AA09248742D41A69D12FEAB794DEB)
#### Row容器内排列方向上的间距
**图4** Row容器内排列方向的间距图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3e/v3/VFM-4igGRsuD86yg0UyJjQ/zh-cn_image_0000002543213728.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=45C500499AF69386AE286C5E65A219D7F2B57EDF09DC78DF0EC030821D1707EF)
```
Row({ space: 35 }) {
  Text('space: 35').fontSize(15).fontColor(Color.Gray)
  Row().width('10%').height(150).backgroundColor(0xF5DEB3)
  Row().width('10%').height(150).backgroundColor(0xD2B48C)
  Row().width('10%').height(150).backgroundColor(0xF5DEB3)
}.width('90%')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/17/v3/KXP3RFJxQ7OqrhEh54sUNQ/zh-cn_image_0000002573853641.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=575001A0268E6504317A023EDDC74F3AC2005954FEFE9DC201793E84C436E886)
#### 布局子元素在主轴上的排列方式
在布局容器内，可以通过 [justifyContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column#justifycontent8) 属性设置子元素在容器主轴上的排列方式。可以从主轴起始位置开始排布，也可以从主轴结束位置开始排布，或者均匀分割主轴的空间。
#### Column容器内子元素在垂直方向上的排列
**图5** Column容器内子元素在垂直方向上的排列图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/S2leR0OxSJyGL_7Ve9K4tQ/zh-cn_image_0000002573973619.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=3F19E0B03BF345FDB64C0574AD3F6C4B5CB4226014BC7644C495AD1B38B9DDC2)
-
justifyContent(FlexAlign.Start，默认值)：元素在垂直方向首端对齐，第一个元素与行首对齐，同时后续的元素与前一个对齐。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Start)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e0/v3/NeDCX6t1TlyOPeOcss0zsA/zh-cn_image_0000002543373392.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=E528C12A390D9279E21A0F2CFD0B5E06DC6CCE7ED63002316B6FB611207E5DE0)
-
justifyContent(FlexAlign.Center)：元素在垂直方向中心对齐，第一个元素与行首的距离与最后一个元素与行尾距离相同。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Center)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/67/v3/jH_dFe0UT8Ce1t4hL1x9DA/zh-cn_image_0000002543213730.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=0BFED5C8ADA7F14359A811351F7C0BB7531AA1D056ECC8DE0E869144857C2974)
-
justifyContent(FlexAlign.End)：元素在垂直方向尾部对齐，最后一个元素与行尾对齐，其他元素与后一个对齐。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.End)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a0/v3/MRzmuLNASkS3veEwYQk_XQ/zh-cn_image_0000002573853643.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=28A8BD2E0A4AA2EA53737D7D9FB5E5AF75FEEB543AC3D8450FA799EC5FF64961)
-
justifyContent(FlexAlign.SpaceBetween)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素与行首对齐，最后一个元素与行尾对齐。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceBetween)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/tqgDF_pPTtOgWKzolgvjzA/zh-cn_image_0000002573973621.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=837E5848CFE267E7AA45FDE297A7F8BCC062E6625AACDEC04D8A807581A51760)
-
justifyContent(FlexAlign.SpaceAround)：垂直方向均匀分配元素，相邻元素之间距离相同。第一个元素到行首的距离和最后一个元素到行尾的距离是相邻元素之间距离的一半。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceAround)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9c/v3/nYKTsko7TQO51PEUGahL9Q/zh-cn_image_0000002543373394.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=D47F15A2BB1E777EB964B0854183945A9755D6F94495A17A3982E03448D6FBBE)
-
justifyContent(FlexAlign.SpaceEvenly)：垂直方向均匀分配元素，相邻元素之间的距离、第一个元素与行首的间距、最后一个元素到行尾的间距都完全一样。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').height(300).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceEvenly)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/Sju3QacqST-vSvK6Hr1GJw/zh-cn_image_0000002543213732.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=54BF558D92A19691F9A5B9CAE61D9F7E287F7D3B442C5088C652DE7749C56E86)
#### Row容器内子元素在水平方向上的排列
**图6** Row容器内子元素在水平方向上的排列图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/09/v3/jrKHN7ZLRsayQgYm3S-eCQ/zh-cn_image_0000002573853645.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=2700ABEB2E2E92740311830270635CEAA3903BBA84B60A829A3652739DE903AC)
-
justifyContent(FlexAlign.Start，默认值)：元素在水平方向首端对齐，第一个元素与行首对齐，同时后续的元素与前一个对齐。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Start)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a8/v3/gY3E5OBnTA-sogfn5wOwVw/zh-cn_image_0000002573973623.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=75A3053BC596FC8C1C0ED90112CCD7D6BB4454FF52CE432E073653DAD735E6CD)
-
justifyContent(FlexAlign.Center)：元素在水平方向中心对齐，第一个元素与行首的距离与最后一个元素与行尾距离相同。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.Center)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/ARc_1OQER4WvixuNtoTghw/zh-cn_image_0000002543373396.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=E2056D149F28EF4E1FC1B77D34FD91E06D7D40D1C8ECFF5D583DE596A9A7F90F)
-
justifyContent(FlexAlign.End)：元素在水平方向尾部对齐，最后一个元素与行尾对齐，其他元素与后一个对齐。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.End)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/IPc5RRmoSnSdNBApBUS58Q/zh-cn_image_0000002543213734.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=5C03DC8C5D71F36FE556D1CA6D6CF928124146C5A9E1D5A99E76615C9BAE4063)
-
justifyContent(FlexAlign.SpaceBetween)：水平方向均匀分配元素，相邻元素之间距离相同。第一个元素与行首对齐，最后一个元素与行尾对齐。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceBetween)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/o_3DLGqQQ4uyTfVzfdvHPg/zh-cn_image_0000002573853647.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=B68724F8D63BDDC084B9F37F60B9323CE26BC1D6CF4820AD7BDD2EE80355CD35)
-
justifyContent(FlexAlign.SpaceAround)：水平方向均匀分配元素，相邻元素之间距离相同。第一个元素到行首的距离和最后一个元素到行尾的距离是相邻元素之间距离的一半。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceAround)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c5/v3/7PFV0Qd3QVqC_sYda_kK_w/zh-cn_image_0000002573973625.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=CB26ED0B43A6599E7976227FFEABED9207CFE71001FD81B830361797896E1818)
-
justifyContent(FlexAlign.SpaceEvenly)：水平方向均匀分配元素，相邻元素之间的距离、第一个元素与行首的间距、最后一个元素到行尾的间距都完全一样。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).backgroundColor('rgb(242,242,242)').justifyContent(FlexAlign.SpaceEvenly)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7a/v3/tqeaLrUDShifj9zaAgbOFw/zh-cn_image_0000002543373398.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=38899300EB0A94FEDDAF5A64166F63B1C55104B4D12FA73445D323A7EB0F88C3)
#### 布局子元素在交叉轴上的对齐方式
在布局容器内，可以通过 [alignItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-column#alignitems) 属性设置子元素在交叉轴（排列方向的垂直方向）上的对齐方式，且在各类尺寸屏幕中表现一致。其中，交叉轴为垂直方向时，取值为 [VerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#verticalalign) 类型，水平方向取值为 [HorizontalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#horizontalalign) 类型。
[alignSelf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout#alignself) 属性用于控制单个子元素在容器交叉轴上的对齐方式，其优先级高于alignItems属性，如果设置了alignSelf属性，则在单个子元素上会覆盖alignItems属性。
#### Column容器内子元素在水平方向上的排列
**图7** Column容器内子元素在水平方向上的排列图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/2P1HtikCQ-S_c5_O09yNiw/zh-cn_image_0000002543213736.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=E1922B86CE966FCBA2F1DD9DAB5BC7B253C3A9FD1CA556EFDB74B15013A0241C)
-
HorizontalAlign.Start：子元素在水平方向左对齐。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').alignItems(HorizontalAlign.Start).backgroundColor('rgb(242,242,242)')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c1/v3/KUhQOhjNQ1ymM28cSdcjLA/zh-cn_image_0000002573853649.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=253FDE02E2D2EA4823BFD8FBD0727C620A314DDC7A9711CFBE63DE779DB87228)
-
HorizontalAlign.Center（默认值）：子元素在水平方向居中对齐。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').alignItems(HorizontalAlign.Center).backgroundColor('rgb(242,242,242)')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2b/v3/w6YQddo7QHWK_1MzG9Fn_g/zh-cn_image_0000002573973627.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=2C1697F2C9F39D7D6326CA96E096FA27D9914DB8A6AFCB6F46A34EA17EEAB30C)
-
HorizontalAlign.End：子元素在水平方向右对齐。
```
Column({}) {
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
  Column() {
  }.width('80%').height(50).backgroundColor(0xD2B48C)
  Column() {
  }.width('80%').height(50).backgroundColor(0xF5DEB3)
}.width('100%').alignItems(HorizontalAlign.End).backgroundColor('rgb(242,242,242)')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/58/v3/_2_aJUKPTOGGklEWBdb7sA/zh-cn_image_0000002543373400.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=7DD9CE0DB3613E56BD92331CF90C7906E612552F80987412CFF3712306488F64)
#### Row容器内子元素在垂直方向上的排列
**图8** Row容器内子元素在垂直方向上的排列图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/Z7hmneEpQWOpBEXG1JivJA/zh-cn_image_0000002543213738.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=B99F44926C976C803295DD2B82AB4E1BBB5BF616F8150F2996F238DA82914CB2)
-
VerticalAlign.Top：子元素在垂直方向顶部对齐。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).alignItems(VerticalAlign.Top).backgroundColor('rgb(242,242,242)')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/8LHazsuZRiupiUznKSOzDQ/zh-cn_image_0000002573853651.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=E1301390A7AAA350F250120A077F7A6EA6996F68E45E383BE2E0C9C634B54347)
-
VerticalAlign.Center（默认值）：子元素在垂直方向居中对齐。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).alignItems(VerticalAlign.Center).backgroundColor('rgb(242,242,242)')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/kxHHAR6zR3qzwEK4s7H_Qw/zh-cn_image_0000002573973629.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=853E6ABAB72A54ACDF3AD91F47EEE95A7A67557131F621B8A13F7B268D57BCCF)
-
VerticalAlign.Bottom：子元素在垂直方向底部对齐。
```
Row({}) {
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
  Column() {
  }.width('20%').height(30).backgroundColor(0xD2B48C)
  Column() {
  }.width('20%').height(30).backgroundColor(0xF5DEB3)
}.width('100%').height(200).alignItems(VerticalAlign.Bottom).backgroundColor('rgb(242,242,242)')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/Lxv2aj_vRkGUcZ9tKqnIUQ/zh-cn_image_0000002543373402.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=B6C877AB02F17E07AC0EB90DE50336FD4B704EE7A7D448934820C934561207B0)
#### 自适应拉伸
在线性布局下，常用空白填充组件 [Blank](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-blank) ，在容器主轴方向自动填充空白空间，达到自适应拉伸效果。Row和Column作为容器，只需要添加宽高为百分比，当屏幕宽高发生变化时，会产生自适应效果。
```
@Entry
@Component
struct BlankExample {
  build() {
    Column() {
      Row() {
        Text('Bluetooth').fontSize(18)
        Blank()
        Toggle({ type: ToggleType.Switch, isOn: true })
      }.backgroundColor(0xFFFFFF).borderRadius(15).padding({ left: 12 }).width('100%')
    }.backgroundColor(0xEFEFEF).padding(20).width('100%')
  }
}
```
**图9** 竖屏（自适应屏幕窄边）
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8d/v3/r5oT5931SWCSvVyYYbxkDw/zh-cn_image_0000002543213740.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=B1350112F5F616ADC3386B90912E8E00F43D80B4E96042D4A6FA3B1139F80706)
**图10** 横屏（自适应屏幕宽边）
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/TOF_i85aTaG6Yktc5Lep5Q/zh-cn_image_0000002573853653.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=FE21465BE4C96125A69345C4DAC987276BBE6B4FCD847A18570953CEDBEB9D0A)
#### 自适应缩放
自适应缩放是指子元素随容器尺寸的变化而按照预设的比例自动调整尺寸，适应各种不同大小的设备。在线性布局中，可以使用以下两种方法实现自适应缩放。
-
父容器尺寸确定时，使用 [layoutWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#layoutweight) 属性设置子元素和兄弟元素在主轴上的权重，忽略元素本身尺寸设置，使它们在任意尺寸的设备下自适应占满剩余空间。
```
@Entry
@Component
struct LayoutWeightExample {
  build() {
    Column() {
      Text('1:2:3').width('100%')
      Row() {
        Column() {
          Text('layoutWeight(1)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(1).backgroundColor(0xF5DEB3).height('100%')
        Column() {
          Text('layoutWeight(2)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(2).backgroundColor(0xD2B48C).height('100%')
        Column() {
          Text('layoutWeight(3)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(3).backgroundColor(0xF5DEB3).height('100%')
      }.backgroundColor(0xffd306).height('30%')
      Text('2:5:3').width('100%')
      Row() {
        Column() {
          Text('layoutWeight(2)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(2).backgroundColor(0xF5DEB3).height('100%')
        Column() {
          Text('layoutWeight(5)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(5).backgroundColor(0xD2B48C).height('100%')
        Column() {
          Text('layoutWeight(3)')
            .textAlign(TextAlign.Center)
        }.layoutWeight(3).backgroundColor(0xF5DEB3).height('100%')
      }.backgroundColor(0xffd306).height('30%')
    }
  }
}
```
**图11** 横屏
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/JuZukb3gSU6SiHMFcKV4vw/zh-cn_image_0000002573973631.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=28191D474B4930C538CADC2E5C6BC28BFF7A139224C8840E52A18D6B84E92A5D)
**图12** 竖屏
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/33/v3/7vPXyFzbQQiRAJkTNaVw_g/zh-cn_image_0000002543373404.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=E2BCAF3F826D5AD2B107C532B352AE9BAA0FB6F4226F23BF9A88F8EC301ECC42)
-
父容器尺寸确定时，使用百分比设置子元素和兄弟元素的宽度，使他们在任意尺寸的设备下保持固定的自适应占比。
```
@Entry
@Component
struct WidthExample {
  build() {
    Column() {
      Row() {
        Column() {
          Text('left width 20%')
            .textAlign(TextAlign.Center)
        }.width('20%').backgroundColor(0xF5DEB3).height('100%')
        Column() {
          Text('center width 50%')
            .textAlign(TextAlign.Center)
        }.width('50%').backgroundColor(0xD2B48C).height('100%')
        Column() {
          Text('right width 30%')
            .textAlign(TextAlign.Center)
        }.width('30%').backgroundColor(0xF5DEB3).height('100%')
      }.backgroundColor(0xffd306).height('30%')
    }
  }
}
```
**图13** 横屏
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4/v3/31Oh1JN1SG-WKEw2MdozUQ/zh-cn_image_0000002543213742.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=7C5D03D41B21B546A0D297D6FCE745F50D4C82403D8B60071E5880AFEABC0289)
**图14** 竖屏
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/XYBmAwMbRQ6yzrgBEPz2bQ/zh-cn_image_0000002573853655.png?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=5822C2CDE91EC1963FCE52FD0666097626C3D00B054C3A291B6FABDF1B16CA4C)
#### 自适应延伸
自适应延伸是指在不同尺寸设备下，当页面的内容超出屏幕大小而无法完全显示时，可以通过滚动条进行拖动展示。对于线性布局，这种方法适用于容器中内容无法一屏展示的场景。通常有以下两种实现方式。
-
[在List中添加滚动条](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-layout-development-create-list#添加滚动条) ：当List子项过多一屏放不下时，可以将每一项子元素放置在不同的组件中，通过滚动条进行拖动展示。可以通过 [scrollBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#scrollbar) 属性设置滚动条的常驻状态， [edgeEffect](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll#edgeeffect) 属性设置拖动到内容最末端的回弹效果。
-
使用 [Scroll](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-scroll) 组件：在线性布局中，开发者可以进行垂直方向或者水平方向的布局。当一屏无法完全显示时，可以在Column或Row组件的外层包裹一个可滚动的容器组件Scroll来实现可滑动的线性布局。
垂直方向布局中使用Scroll组件：
```
@Entry
@Component
struct ScrollVerticalExample {
  scroller: Scroller = new Scroller();
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  build() {
    Scroll(this.scroller) {
      Column() {
        ForEach(this.arr, (item?:number|undefined) => {
          if(item != undefined){
            Text(item.toString())
              .width('90%')
              .height(150)
              .backgroundColor(0xFFFFFF)
              .borderRadius(15)
              .fontSize(16)
              .textAlign(TextAlign.Center)
              .margin({ top: 10 })
          }
        }, (item:number) => item.toString())
      }.width('100%')
    }
    .backgroundColor(0xDCDCDC)
    .scrollable(ScrollDirection.Vertical) // 滚动方向为垂直方向
    .scrollBar(BarState.On) // 滚动条常驻显示
    .scrollBarColor(Color.Gray) // 滚动条颜色
    .scrollBarWidth(10) // 滚动条宽度
    .edgeEffect(EdgeEffect.Spring) // 滚动到边沿后回弹
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c1/v3/HBCougYUSAWDEMR-41ExbA/zh-cn_image_0000002573973633.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=24D81A0A9E731B4831D1EAC844CC5395E4A619917F2147B0C42257953827295B)
水平方向布局中使用Scroll组件：
```
@Entry
@Component
struct ScrollHorizontalExample {
  scroller: Scroller = new Scroller();
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  build() {
    Scroll(this.scroller) {
      Row() {
        ForEach(this.arr, (item?:number|undefined) => {
          if(item != undefined){
            Text(item.toString())
              .height('90%')
              .width(150)
              .backgroundColor(0xFFFFFF)
              .borderRadius(15)
              .fontSize(16)
              .textAlign(TextAlign.Center)
              .margin({ left: 10 })
          }
        })
      }.height('100%')
    }
    .backgroundColor(0xDCDCDC)
    .scrollable(ScrollDirection.Horizontal) // 滚动方向为水平方向
    .scrollBar(BarState.On) // 滚动条常驻显示
    .scrollBarColor(Color.Gray) // 滚动条颜色
    .scrollBarWidth(10) // 滚动条宽度
    .edgeEffect(EdgeEffect.Spring) // 滚动到边沿后回弹
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/UTm9v0xVRsCdOvzQpfp4bQ/zh-cn_image_0000002543373406.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110847Z&HW-CC-Expire=86400&HW-CC-Sign=3641995611F8420FA217966746F4FE9E0FCE38DD18C3518F299EC5276122B925)