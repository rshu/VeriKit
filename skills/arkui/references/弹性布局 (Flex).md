# 弹性布局 (Flex)
---
# 弹性布局 (Flex)
#### 概述
弹性布局（ [Flex](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex) ）提供更加有效的方式对容器中的子元素进行排列、对齐和分配剩余空间。常用于页面头部导航栏的均匀分布、页面框架的搭建、多行数据的排列等。
容器默认存在主轴与交叉轴，子元素默认沿主轴排列，子元素在主轴方向的尺寸称为主轴尺寸，在交叉轴方向的尺寸称为交叉轴尺寸。
**图1** 主轴为水平方向的Flex容器示意图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/hs8SFCeSRFuOYn2cZRXRrg/zh-cn_image_0000002573973637.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=1949977741DA0C527EE2EB23A4336748B40A364C0F6F4AED42A85E1911616A33)
#### 基本概念
-
主轴：Flex组件布局方向的轴线，子元素默认沿着主轴排列。主轴开始的位置称为主轴起始点，结束位置称为主轴结束点。
-
交叉轴：垂直于主轴方向的轴线。交叉轴开始的位置称为交叉轴起始点，结束位置称为交叉轴结束点。
#### 布局方向
在弹性布局中，容器的子元素可以按照任意方向排列。通过设置 [FlexOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex#flexoptions对象说明) 的参数direction，可以决定主轴的方向，从而控制子元素的排列方向。
**图2** 弹性布局方向图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b5/v3/74Q4IAhlTaOLuzrAJeR4CA/zh-cn_image_0000002543373410.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=9CE66D379A9C9B7AAC9F75B087C7F285B076D8E7E48D609174E9FF374509F37E)
-
FlexDirection.Row（默认值）：主轴为水平方向，子元素从起始端沿着水平方向开始排布。
```
Flex({ direction: FlexDirection.Row }) {
  Text('1').width('33%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(50).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.height(70)
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/nND5eDdySyiKCvg1_-usng/zh-cn_image_0000002543213748.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=43652E7C49EDB031BA084B0B7BB9100A48CDEB131D73C5E7BF6AB64C1B0977FD)
-
FlexDirection.RowReverse：主轴为水平方向，子元素从终点端沿着FlexDirection.Row相反的方向开始排布。
```
Flex({ direction: FlexDirection.RowReverse }) {
  Text('1').width('33%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(50).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.height(70)
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/cqi2T69JSgiNjxmSFoMSTw/zh-cn_image_0000002573853661.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=4171077856FD91A0E7F02F7E7F3433ECC5AA7868B9D6AE7055DCDFA4B5066C3F)
-
FlexDirection.Column：主轴为垂直方向，子元素从起始端沿着垂直方向开始排布。
```
Flex({ direction: FlexDirection.Column }) {
  Text('1').width('100%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('100%').height(50).backgroundColor('#D2B48C')
  Text('3').width('100%').height(50).backgroundColor('#F5DEB3')
}
.height(70)
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6e/v3/VGGjXaoCRxiU6ty6hP1Trw/zh-cn_image_0000002573973639.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=C2DF608171B5094255AF3B72F5F87523623C96B35593F9577B21058D3D509EEF)
-
FlexDirection.ColumnReverse：主轴为垂直方向，子元素从终点端沿着FlexDirection.Column相反的方向开始排布。
```
Flex({ direction: FlexDirection.ColumnReverse }) {
  Text('1').width('100%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('100%').height(50).backgroundColor('#D2B48C')
  Text('3').width('100%').height(50).backgroundColor('#F5DEB3')
}
.height(70)
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/Yd9Zucr_R4eOxfmoOqlVJQ/zh-cn_image_0000002543373412.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=7A82FA518FEFA65AF9AA064735914C81D8DE3D69863AFD48932CDDCADEBC30B1)
#### 布局换行
弹性布局分为单行布局和多行布局。默认情况下，Flex容器中的子元素都排在一条线（又称“轴线”）上。wrap属性控制当子元素主轴尺寸之和大于容器主轴尺寸时，Flex是单行布局还是多行布局。在多行布局时，通过交叉轴方向，确认新行排列方向。
-
FlexWrap.NoWrap（默认值）：不换行。如果子元素的宽度总和大于父元素的宽度，则子元素会被压缩宽度。
```
Flex({ wrap: FlexWrap.NoWrap }) {
  Text('1').width('50%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('50%').height(50).backgroundColor('#D2B48C')
  Text('3').width('50%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e3/v3/SZGiGx6jT4eqlfR1-JkmPA/zh-cn_image_0000002543213750.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=994245FF2C703F834E0EA1D9CA528680E2865BA73953ABF8C0CDB59D0A19421F)
-
FlexWrap.Wrap：换行，每一行子元素按照主轴方向排列。
```
Flex({ wrap: FlexWrap.Wrap }) {
  Text('1').width('50%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('50%').height(50).backgroundColor('#D2B48C')
  Text('3').width('50%').height(50).backgroundColor('#D2B48C')
}
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/09/v3/K574c9KJSRaSAVIDvue4SQ/zh-cn_image_0000002573853663.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=6C982C134416AC3AA5F2548B2A934859EF6703A05390CCF4A4BD6F077255A30D)
-
FlexWrap.WrapReverse：换行，每一行子元素按照主轴反方向排列。
```
Flex({ wrap: FlexWrap.WrapReverse}) {
  Text('1').width('50%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('50%').height(50).backgroundColor('#D2B48C')
  Text('3').width('50%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1f/v3/aJJT24b6R_WmfeVUEEN_-Q/zh-cn_image_0000002573973641.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=30ABFBBD4E6D51B858C64F80692E51BEE97B7486961A3D25D15048EE0284DD49)
#### 主轴对齐方式
通过justifyContent参数设置子元素在主轴方向的对齐方式。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/I988KFyUSCmIjmMhD3y-Qw/zh-cn_image_0000002543373414.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=3F6933BF5FAF076D2B1A14798250A902796F4557949DFBFEFEBE0218BF7EDA26)
-
FlexAlign.Start（默认值）：子元素在主轴方向起始端对齐， 第一个子元素与父元素边沿对齐，其他元素与前一个元素对齐。
```
Flex({ justifyContent: FlexAlign.Start }) {
  Text('1').width('20%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('20%').height(50).backgroundColor('#D2B48C')
  Text('3').width('20%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding({ top: 10, bottom: 10 })
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/MBuDJBX7Sk2EzIDfQ-bFbg/zh-cn_image_0000002543213752.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=FD7EAC705E0614729ACAD6A5E6C3926B1E52AF9416092A27F540C45FB059A298)
-
FlexAlign.Center：子元素在主轴方向居中对齐。
```
Flex({ justifyContent: FlexAlign.Center }) {
  Text('1').width('20%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('20%').height(50).backgroundColor('#D2B48C')
  Text('3').width('20%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding({ top: 10, bottom: 10 })
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/zP7MVcK7RI6GeerbXffo0Q/zh-cn_image_0000002573853665.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=AF18EEB91BDA99B13E5F74C478B9D495B6D7E9AC1480B52F9598C10629F6E483)
-
FlexAlign.End：子元素在主轴方向终点端对齐，最后一个子元素与父元素边沿对齐，其他元素与后一个元素对齐。
```
Flex({ justifyContent: FlexAlign.End }) {
  Text('1').width('20%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('20%').height(50).backgroundColor('#D2B48C')
  Text('3').width('20%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding({ top: 10, bottom: 10 })
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/db/v3/QMGWs15LRHG12wndWTpYXQ/zh-cn_image_0000002573973643.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=E61266B58657CCAFA09E9C2866A7791D4041AE17EB7D9000CD93A3322BED78BB)
-
FlexAlign.SpaceBetween：Flex主轴方向均匀分配弹性元素，相邻子元素之间距离相同。第一个子元素和最后一个子元素与父元素边沿对齐。
```
Flex({ justifyContent: FlexAlign.SpaceBetween }) {
  Text('1').width('20%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('20%').height(50).backgroundColor('#D2B48C')
  Text('3').width('20%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding({ top: 10, bottom: 10 })
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/pD4qbH8TQtaqS12vme9u-Q/zh-cn_image_0000002543373416.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=7D1347673A40881A926BF11C45900BBA7D7B51A76F855B009D52FCC15EB4EEB6)
-
FlexAlign.SpaceAround：Flex主轴方向均匀分配弹性元素，相邻子元素之间距离相同。第一个子元素到主轴起始端的距离和最后一个子元素到主轴终点端的距离是相邻元素之间距离的一半。
```
Flex({ justifyContent: FlexAlign.SpaceAround }) {
  Text('1').width('20%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('20%').height(50).backgroundColor('#D2B48C')
  Text('3').width('20%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding({ top: 10, bottom: 10 })
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f9/v3/PnqbEox0QSCugn8Ydun7oA/zh-cn_image_0000002543213754.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=F2CE62B87C6289FB01FAA3AF74E8C16297A69546AC51230B911C1C6E1C033862)
-
FlexAlign.SpaceEvenly：Flex主轴方向元素等间距布局，相邻子元素之间的间距、第一个子元素与主轴起始端的间距、最后一个子元素到主轴终点端的间距均相等。
```
Flex({ justifyContent: FlexAlign.SpaceEvenly }) {
  Text('1').width('20%').height(50).backgroundColor('#F5DEB3')
  Text('2').width('20%').height(50).backgroundColor('#D2B48C')
  Text('3').width('20%').height(50).backgroundColor('#F5DEB3')
}
.width('90%')
.padding({ top: 10, bottom: 10 })
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/_kPALbrwSSa4JG3JWhXEOQ/zh-cn_image_0000002573853667.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=CDCD66A71F983BFC170D68C644304B5D6E28557A673582B0190C9CFB27FEF75C)
#### 交叉轴对齐方式
容器和子元素都可以设置交叉轴对齐方式，且子元素设置的对齐方式优先级较高。
#### 容器组件设置交叉轴对齐
可以通过设置 [FlexOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex#flexoptions对象说明) 的参数alignItems，设置子元素在交叉轴的对齐方式。
-
ItemAlign.Auto：使用Flex容器中默认配置。
```
Flex({ alignItems: ItemAlign.Auto }) {
  Text('1').width('33%').height(30).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(40).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.size({ width: '90%', height: 80 })
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/iUJDWaSJTE20YnWiELtVjg/zh-cn_image_0000002573973645.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=CC049019C42EE460DEC0FBE4B631BE11C5EC0AEA905EF3F2FF6CBE480628859B)
-
ItemAlign.Start：交叉轴方向首部对齐。
```
Flex({ alignItems: ItemAlign.Start }) {
  Text('1').width('33%').height(30).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(40).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.size({ width: '90%', height: 80 })
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8/v3/kLDqwIHfR_qNWNMyMhVHqA/zh-cn_image_0000002543373418.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=4B50B5EBBABD525D5E21B71E135CEC0186BD3ED5D75D9322F19AD4BB1C6ABC29)
-
ItemAlign.Center：交叉轴方向居中对齐。
```
Flex({ alignItems: ItemAlign.Center }) {
  Text('1').width('33%').height(30).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(40).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.size({ width: '90%', height: 80 })
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0b/v3/WjvvjQyCSBupeJ_qtizeAg/zh-cn_image_0000002543213756.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=D2C16F437BFA2B2AE8F65C08F8A5BC5C15F576C472EAE9232FB9A55439536603)
-
ItemAlign.End：交叉轴方向底部对齐。
```
Flex({ alignItems: ItemAlign.End }) {
  Text('1').width('33%').height(30).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(40).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.size({ width: '90%', height: 80 })
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/mwBBcLD8S3mJr_eirB8wYw/zh-cn_image_0000002573853669.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=1850AC24B1D44DDBEF5444F2CD737E218BA8EB643D7DE9A435F386D9A6310287)
-
ItemAlign.Stretch：交叉轴方向拉伸填充，在未设置尺寸时，拉伸到容器尺寸。元素在Flex容器中，沿交叉轴方向拉伸填充。容器为Flex且设置 [FlexWrap](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#flexwrap) 为FlexWrap.Wrap或FlexWrap.WrapReverse时，元素拉伸到与当前行或列交叉轴长度最长的元素尺寸。其余情况下，无论元素尺寸是否设置，均拉伸到容器尺寸。
```
Flex({ alignItems: ItemAlign.Stretch }) {
  Text('1').width('33%').backgroundColor('#F5DEB3')
  Text('2').width('33%').backgroundColor('#D2B48C')
  Text('3').width('33%').backgroundColor('#F5DEB3')
}
.size({ width: '90%', height: 80 })
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/90/v3/_mKHbVrlTZqGVre44IaKPA/zh-cn_image_0000002573973647.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=31873496D1263B92963CF61E861BAF229E222B04C1D9D575A55C82E04D268D82)
-
ItemAlign.Baseline：交叉轴方向文本基线对齐。
```
Flex({ alignItems: ItemAlign.Baseline }) {
  Text('1').width('33%').height(30).backgroundColor('#F5DEB3')
  Text('2').width('33%').height(40).backgroundColor('#D2B48C')
  Text('3').width('33%').height(50).backgroundColor('#F5DEB3')
}
.size({ width: '90%', height: 80 })
.padding(10)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e6/v3/EscjmVMvTFS665X-I3o8Dg/zh-cn_image_0000002543373420.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=8F397D9E1F2032D34751601A2F067B993278BC73575552CB30AFCA597A73C99B)
#### 子元素设置交叉轴对齐
子元素的 [alignSelf](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout#alignself) 属性也可以设置子元素在父容器交叉轴的对齐方式，且会覆盖Flex布局容器中alignItems配置。如下例所示：
```
Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center }) { // 容器组件设置子元素居中
  Text('alignSelf Start').width('25%').height(80)
    .alignSelf(ItemAlign.Start)
    .backgroundColor('#F5DEB3')
  Text('alignSelf Baseline')
    .alignSelf(ItemAlign.Baseline)
    .width('25%')
    .height(80)
    .backgroundColor('#D2B48C')
  Text('alignSelf Baseline').width('25%').height(100)
    .backgroundColor('#F5DEB3')
    .alignSelf(ItemAlign.Baseline)
  Text('no alignSelf').width('25%').height(100)
    .backgroundColor('#D2B48C')
  Text('no alignSelf').width('25%').height(100)
    .backgroundColor('#F5DEB3')
}.width('90%').height(220).backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dd/v3/Uz_ejmzSTbaM_JH1ReOP3g/zh-cn_image_0000002543213758.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=8649FED8385987D6BA6682FFEA62937036A8FED3F53DB9377472EF14989485D1)
上例中，Flex容器中alignItems设置交叉轴子元素的对齐方式为居中，子元素自身设置了alignSelf属性的情况，覆盖父组件的alignItems值，表现为alignSelf的定义。
#### 内容对齐
可以通过 [alignContent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-flex#flexoptions对象说明) 参数设置子元素各行在交叉轴剩余空间内的对齐方式，只在多行的Flex布局中生效，可选值有：
-
FlexAlign.Start：子元素各行与交叉轴起点对齐。
```
Flex({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap, alignContent: FlexAlign.Start }) {
  Text('1').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('2').width('60%').height(20).backgroundColor('#D2B48C')
  Text('3').width('40%').height(20).backgroundColor('#D2B48C')
  Text('4').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('5').width('20%').height(20).backgroundColor('#D2B48C')
}
.width('90%')
.height(100)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e6/v3/Bk1g8ee0QdC4CGfz743fDg/zh-cn_image_0000002573853671.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=58ABE8715394D1F9FDA6A19F358C6BEBA38DE70AA405D112D6447A6C1020DAA1)
-
FlexAlign.Center：子元素各行在交叉轴方向居中对齐。
```
Flex({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap, alignContent: FlexAlign.Center }) {
  Text('1').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('2').width('60%').height(20).backgroundColor('#D2B48C')
  Text('3').width('40%').height(20).backgroundColor('#D2B48C')
  Text('4').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('5').width('20%').height(20).backgroundColor('#D2B48C')
}
.width('90%')
.height(100)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/tsUFDWmNRpKW4My3RE4w-A/zh-cn_image_0000002573973649.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=5474D90156EC7FE2B87031EFC4DD9E6E5E05A01036D6072348A18B93AA0AE82C)
-
FlexAlign.End：子元素各行与交叉轴终点对齐。
```
Flex({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap, alignContent: FlexAlign.End }) {
  Text('1').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('2').width('60%').height(20).backgroundColor('#D2B48C')
  Text('3').width('40%').height(20).backgroundColor('#D2B48C')
  Text('4').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('5').width('20%').height(20).backgroundColor('#D2B48C')
}
.width('90%')
.height(100)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/BcWiXvV5Q2GOxWKCedbOAQ/zh-cn_image_0000002543373422.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=959DCA48780F91E9E0CF1B05EF33E0470F76665797E8127DB0B63EB061D80D3C)
-
FlexAlign.SpaceBetween：子元素各行与交叉轴两端对齐，各行间垂直间距平均分布。
```
Flex({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap, alignContent: FlexAlign.SpaceBetween }) {
  Text('1').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('2').width('60%').height(20).backgroundColor('#D2B48C')
  Text('3').width('40%').height(20).backgroundColor('#D2B48C')
  Text('4').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('5').width('20%').height(20).backgroundColor('#D2B48C')
}
.width('90%')
.height(100)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e5/v3/XnPYCfMeQouSPgpqX__80g/zh-cn_image_0000002543213760.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=21A2091177DEBEA1DD821FE2934A842938623388EA4AA43BE5CF3747D62A00F7)
-
FlexAlign.SpaceAround：子元素各行间距相等，是元素首尾行与交叉轴两端距离的两倍。
```
Flex({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap, alignContent: FlexAlign.SpaceAround }) {
  Text('1').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('2').width('60%').height(20).backgroundColor('#D2B48C')
  Text('3').width('40%').height(20).backgroundColor('#D2B48C')
  Text('4').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('5').width('20%').height(20).backgroundColor('#D2B48C')
}
.width('90%')
.height(100)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/94/v3/-5jJC0NBRrWgq5lWPGxSWQ/zh-cn_image_0000002573853673.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=017F00A4238B6E67908A4DACBEF96A74FCDC2FD6EF2DCD498B54A185DEF931AB)
-
FlexAlign.SpaceEvenly: 子元素各行间距，子元素首尾行与交叉轴两端距离都相等。
```
Flex({ justifyContent: FlexAlign.SpaceBetween, wrap: FlexWrap.Wrap, alignContent: FlexAlign.SpaceEvenly }) {
  Text('1').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('2').width('60%').height(20).backgroundColor('#D2B48C')
  Text('3').width('40%').height(20).backgroundColor('#D2B48C')
  Text('4').width('30%').height(20).backgroundColor('#F5DEB3')
  Text('5').width('20%').height(20).backgroundColor('#D2B48C')
}
.width('90%')
.height(100)
.backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/86/v3/3j6sevC9T96pOMAHU4LPmQ/zh-cn_image_0000002573973651.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=1E68FA80FF22CAF3FF7899D9531EBD5D5A865F0029E31247434B2B5C468A4759)
#### 自适应拉伸
在弹性布局父组件尺寸过小时，通过子元素的以下属性设置其在父容器的占比，达到自适应布局。
-
[flexBasis](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout#flexbasis) ：设置子元素在父容器主轴方向上的基准尺寸。如果设置了该属性，则子项占用的空间为该属性所设置的值；如果没设置该属性，那子项的空间为width/height的值。
```
Flex() {
  Text('flexBasis("auto")')
    .flexBasis('auto')// 未设置width以及flexBasis值为auto，内容自身宽度
    .height(100)
    .backgroundColor('#F5DEB3')
  Text('flexBasis("auto")'+' width("40%")')
    .width('40%')
    .flexBasis('auto')// 设置width以及flexBasis值auto，使用width的值
    .height(100)
    .backgroundColor('#D2B48C')
  Text('flexBasis(100)') // 未设置width以及flexBasis值为100，宽度为100vp
    .flexBasis(100)
    .height(100)
    .backgroundColor('#F5DEB3')
  Text('flexBasis(100)')
    .flexBasis(100)
    .width(200)// flexBasis值为100，覆盖width的设置值，宽度为100vp
    .height(100)
    .backgroundColor('#D2B48C')
}.width('90%').height(120).padding(10).backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/4Z_cX9VKQl2wnLEC44AevA/zh-cn_image_0000002543373424.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=0383825B20496B36495108F5A3EDE8FEBC7964D4DBED853656AD43ACDDF09F40)
-
[flexGrow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout#flexgrow) ：设置父容器的剩余空间分配给此属性所在组件的比例，用于分配父组件的剩余空间。
```
Flex() {
  Text('flexGrow(1)')
    .flexGrow(1)
    .width(100)
    .height(100)
    .backgroundColor('#F5DEB3')
  Text('flexGrow(4)')
    .flexGrow(4)
    .width(100)
    .height(100)
    .backgroundColor('#D2B48C')
  Text('no flexGrow')
    .width(100)
    .height(100)
    .backgroundColor('#F5DEB3')
}.width(360).height(120).padding(10).backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/81/v3/67u14-OUQL2MmFy3kkvkZA/zh-cn_image_0000002543213762.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=04B7185F528F7A9808071AE1D8981C8B56D4E8B6A63234D3BDA33B235C8237E5)
父容器宽度360vp，三个子元素原始宽度均为100vp，左右padding为20vp，总和320vp，剩余空间40vp根据flexGrow值的占比分配给子元素，未设置flexGrow的子元素不参与分配。
第一个元素以及第二个元素以1:4分配剩下的40vp。第一个元素为100vp+40vp * 1/5=108vp，第二个元素为100vp+40vp * 4/5=132vp。
-
[flexShrink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-flex-layout#flexshrink) : 当父容器空间不足时，子元素的压缩比例。
```
Flex({ direction: FlexDirection.Row }) {
  Text('flexShrink(3)')
    .flexShrink(3)
    .width(200)
    .height(100)
    .backgroundColor('#F5DEB3')
  Text('no flexShrink')
    .width(200)
    .height(100)
    .backgroundColor('#D2B48C')
  Text('flexShrink(2)')
    .flexShrink(2)
    .width(200)
    .height(100)
    .backgroundColor('#F5DEB3')
}.width(400).height(120).padding(10).backgroundColor('#AFEEEE')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0f/v3/4LJynww7REicFqyl7QozHw/zh-cn_image_0000002573853675.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=25B12D45605D80B78FE9EABD1DAA8B4FE143E7016F5CEE3D29C54323D2110CBA)
父容器宽度400vp，三个子元素原始宽度为200vp，左右padding为20vp，父容器给子元素的布局空间为380vp，超出父容器空间220vp。
将第一个元素和第三个元素以3:2的压缩比例进行压缩，直至不再超出父容器提供的布局空间。第一个元素为200vp - (220vp / 5) * 3=68vp，第三个元素为200vp - (220vp / 5) * 2=112vp。
#### 场景示例
使用弹性布局，可以实现子元素沿水平方向排列，两端对齐，子元素间距平分，垂直方向上子元素居中的效果。
```
@Entry
@Component
struct FlexExample {
  build() {
    Column() {
      Column({ space: 5 }) {
        Flex({
          direction: FlexDirection.Row,
          wrap: FlexWrap.NoWrap,
          justifyContent: FlexAlign.SpaceBetween,
          alignItems: ItemAlign.Center
        }) {
          Text('1').width('30%').height(50).backgroundColor('#F5DEB3')
          Text('2').width('30%').height(50).backgroundColor('#D2B48C')
          Text('3').width('30%').height(50).backgroundColor('#F5DEB3')
        }
        .height(70)
        .width('90%')
        .backgroundColor('#AFEEEE')
      }.width('100%').margin({ top: 5 })
    }.width('100%')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/31/v3/3TtXGmyjQjqbSg_I9AOilw/zh-cn_image_0000002573973653.png?HW-CC-KV=V1&HW-CC-Date=20260421T110848Z&HW-CC-Expire=86400&HW-CC-Sign=FCC4825876227481543E311C493EFC9C7E8C8D5908E65B1AE7BA82DAFAF9CC10)