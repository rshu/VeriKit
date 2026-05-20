# 弧形按钮 (ArcButton)
---
# 弧形按钮 (ArcButton)
从API version 18开始支持ArcButton。ArcButton是弧形按钮组件，推荐用于圆形屏幕。为用户提供强调、普通、警告等样式按钮。具体用法请参考 [ArcButton](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton) 。
#### 创建按钮
ArcButton通过调用以下接口来创建。
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
    position: ArcButtonPosition.TOP_EDGE,
    styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  // ···
  })
})
```
其中， [label](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 设置按钮文字， [position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 设置按钮类型， [styleMode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 设置按钮样式。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/4FOfd0CNQz6qS2YhNPQXJQ/zh-cn_image_0000002573853825.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=9E10C8DC70F92902A9C75AF2168671551DA2248047DCFF0C3DEC48AB3ADDBFE4)
#### 设置按钮类型
ArcButton有上弧形按钮和下弧形按钮两种类型。使用 [position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 设置按钮类型。
-
下弧形按钮（默认类型）。
通过将 [position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 属性设置为ArcButtonPosition.BOTTOM_EDGE，可以将按钮设置为下弧形按钮。
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
    position: ArcButtonPosition.BOTTOM_EDGE,
    styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  // ···
  })
})
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f4/v3/WjwG35fZTsCobqAm6CH_Vg/zh-cn_image_0000002573973803.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=EF5C092345AFAA230256F23D14695CA37AE60BF3BF20038C6DA1F250031780E7)
-
上弧形按钮。
通过将 [position](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 属性设置为ArcButtonPosition.TOP_EDGE，可以将按钮设置为上弧形按钮。
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
    position: ArcButtonPosition.TOP_EDGE,
    styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
  // ···
  })
})
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f7/v3/BN5tO9iDSR6_WAI7T5eHdg/zh-cn_image_0000002543373576.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=0E395DE083EB9626B5B0106209A6BA66601F3CFE1DDF09B6A92651180E5E7734)
#### 自定义样式
-
设置背景色。
使用 [backgroundColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 属性设置按钮的背景色。
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
    styleMode: ArcButtonStyleMode.CUSTOM,
    backgroundColor: ColorMetrics.resourceColor('#707070')
  })
})
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/59/v3/1ke7mK-PS_O1g0N7Q_18ZQ/zh-cn_image_0000002543213914.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=AD6510F79FB3E212CD9BB69CA39B08128F61763EB794BC156D4930E1581D809F)
-
设置文本颜色。
使用 [fontColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 属性设置按钮的文本颜色。
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
    styleMode: ArcButtonStyleMode.CUSTOM,
    backgroundColor: ColorMetrics.resourceColor('#E84026'),
    fontColor: ColorMetrics.resourceColor('#707070')
  })
})
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/bLFRRojLSnS0pFCPmbUJig/zh-cn_image_0000002573853827.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=F1E4CEE77B5263C9BFB837E54B9C82766D1439E9CF04A975FCE1B82BF93B3B54)
-
设置阴影颜色。
使用 [shadowEnabled](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 属性启用按钮阴影，并通过 [shadowColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ohos-arkui-advanced-arcbutton#arcbuttonoptions) 属性设置按钮的阴影颜色。
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
    shadowEnabled: true,
    shadowColor: ColorMetrics.resourceColor('#ffec1022')
  })
})
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/60/v3/PJlji2V7Q_WPGgBSPz6yNg/zh-cn_image_0000002573973805.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=D450C7D820B5B124858BA08ADAA84118BEAAF79DFA7DBAD5EE53D8B22E6F3070)
#### 添加事件
-
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
  // ···
    onClick: () => {
      hilog.info(DOMAIN, TAG, 'ArcButton onClick');
    },
  })
})
```
-
```
ArcButton({
  options: new ArcButtonOptions({
    label: 'OK',
  // ···
    onTouch: (event: TouchEvent) => {
      hilog.info(DOMAIN, TAG, 'ArcButton onTouch');
    }
  })
})
```
#### 场景示例
在亮度设置界面，进度条显示当前亮度为30%。点击重置后，亮度值将被重置为默认的50%。
运行该示例推荐在Wearable设备上以获得最佳显示效果，同时支持在其他设备上运行。若要在Wearable设备上运行，在src/main目录下的工程配置文件 [module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file) 中 [deviceTypes标签](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file#devicetypes标签) 内配置wearable。
```
"module": {
  // ···
  "deviceTypes": [
    "wearable"
  ],
  // ···
}
```
```
import { LengthMetrics, LengthUnit, ArcButton, ArcButtonOptions, ArcButtonStyleMode } from '@kit.ArkUI';
const BRIGHT_NESS_VALUE = 30;
const BRIGHT_NESS_VALUE_DEFAULT = 50;
@Entry
@ComponentV2
struct BrightnessPage {
  @Local brightnessValue: number = BRIGHT_NESS_VALUE;
  private defaultBrightnessValue: number = BRIGHT_NESS_VALUE_DEFAULT;
  build() {
    RelativeContainer() {
      // 请将$r('app.string.Brightness')替换为实际资源文件，在本示例中该资源文件的value值为"设置亮度"
      Text($r('app.string.Brightness'))
        .fontColor(Color.White)
        .id('id_brightness_set_text')
        .fontSize(24)
        .margin({ top: 16 })
        .alignRules({
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
      Text(`${this.brightnessValue} %`)
        .fontColor(Color.White)
        .id('id_brightness_min_text')
        .margin({ left: 16 })
        .alignRules({
          start: { anchor: '__container__', align: HorizontalAlign.Start },
          center: { anchor: '__container__', align: VerticalAlign.Center }
        })
      Slider({
        value: this.brightnessValue,
        min: 0,
        max: 100,
        style: SliderStyle.InSet
      })
        .blockColor('#191970')
        .trackColor('#ADD8E6')
        .selectedColor('#4169E1')
        .width(150)
        .id('id_brightness_slider')
        .margin({ left: 16, right: 16 })
        .onChange((value: number, mode: SliderChangeMode) => {
          this.brightnessValue = value;
        })
        .alignRules({
          center: { anchor: 'id_brightness_min_text', align: VerticalAlign.Center },
          start: { anchor: 'id_brightness_min_text', align: HorizontalAlign.End }
        })
      ArcButton({
        options: new ArcButtonOptions({
          // 请将$r('app.string.Reset')替换为实际资源文件，在本示例中该资源文件的value值为"重置"
          label: $r('app.string.Reset'),
          styleMode: ArcButtonStyleMode.EMPHASIZED_LIGHT,
          fontSize: new LengthMetrics(19, LengthUnit.FP),
          onClick: () => {
            this.brightnessValue = this.defaultBrightnessValue;
          }
        })
      })
        .alignRules({
          middle: { anchor: '__container__', align: HorizontalAlign.Center },
          bottom: { anchor: '__container__', align: VerticalAlign.Bottom }
        })
    }
    .height('100%')
    .width('100%')
    .backgroundColor(Color.Black)
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/eUdWdnBsSdOhnln3leZKIg/zh-cn_image_0000002543373578.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=2D6829486426F4228BB9BA7E55E9B492E8A6AF1FEF2779A40F9D31A49670FB98)