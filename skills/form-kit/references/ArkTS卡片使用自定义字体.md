# ArkTS卡片使用自定义字体
---
# ArkTS卡片使用自定义字体
API version 22开始新增了 [ohos.graphics.text.FontCollection.getLocalInstance](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-graphics-text#getlocalinstance22) 接口获取本地字体集实例，应用可以通过这个本地实例为卡片加载自定义字体。
#### 开发步骤
1.
创建动态卡片：按照 [创建ArkTS卡片](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-ui-widget-creation) 里的描述创建动态卡片。
2.
在项目entry\src\main\resources\rawfile目录下添加自定义字体文件xxx.ttf。
3.
页面布局代码实现entry/src/main/ets/widget/pages/WidgetCard.ets。
在卡片页面中布局两个按钮，点击按钮load font或按钮unload font，调用本地字体集实例的loadFontSync、unloadFontSync进行字体的加载、卸载。
```
// entry/src/main/ets/widget/pages/WidgetCard.ets
import { text } from '@kit.ArkGraphics2D';
@Entry
@Component
struct loadFontSyncCard {
  // 在这里使用getLocalInstance访问本地字体集实例
  private fc: text.FontCollection = text.FontCollection.getLocalInstance();
  @State content: string = '默认字体';
  build() {
    Column({ space: 10 }) {
      Text(this.content)
        .fontFamily('custom') // 在此处声明组件使用自定义字体
      Button('load font')
        .onClick(() => {
          // 在此处加载自定义字体文件
          this.fc.loadFontSync('custom', $rawfile('xxx.ttf'));
          this.content = '自定义字体';
        })
      Button('unload font')
        .onClick(() => {
          this.fc.unloadFontSync('custom');
          this.content = '默认字体';
        })
    }.width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5e/v3/y6uBw59dQE-n90SRmdTgAw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111007Z&HW-CC-Expire=86400&HW-CC-Sign=FE6E6F9C47912B80BCB03D4F0924154BBE236E1108D76A97FA9FC716E879682D)
-
本地字体集可加载多个自定义字体，所有字体合计最大内存限制加载20MB。
-
同一应用的所有卡片共用一个本地字体集实例。加载或卸载自定义字体后，所有卡片的字体显示会同步更新。
#### 运行结果
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b5/v3/hUISb0spTBG9Y06IpLtllA/zh-cn_image_0000002543373988.gif?HW-CC-KV=V1&HW-CC-Date=20260421T111007Z&HW-CC-Expire=86400&HW-CC-Sign=7C0306BC0F81273F1897F3CF7349E77C520B82DF5D66380EDE2077454EBBED89)