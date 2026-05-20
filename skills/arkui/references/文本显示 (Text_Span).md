# 文本显示 (Text/Span)
---
# 文本显示 (Text/Span)
Text是文本组件，用于展示用户视图，如显示文章的文字内容。该组件支持绑定自定义文本选择菜单，用户可根据需要选择不同功能。此外，还可以扩展自定义菜单，丰富可用选项，进一步提升用户体验。Span则用于展示行内文本。
具体用法请参考 [Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text) 和 [Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span) 组件的API文档。
常见问题请参考 [文本显示（Text/Span）常见问题](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-text-faq#文本显示textspan常见问题) 。
#### 创建文本
Text可通过以下两种方式来创建：
-
string字符串。
```
Text('我是一段文本')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/75/v3/MOVskgoET2-GmGYI7iTDWw/zh-cn_image_0000002573973713.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=B6D76F437AEC36B8F77310F35373BB921312348CB3A18B116E6462303B224E53)
-
引用Resource资源。
资源引用类型可以通过$r创建Resource类型对象，文件位置为/resources/base/element/string.json，具体内容如下：
```json
{
  "string": [
    {
      "name": "module_desc",
      "value": "模块描述"
    }
  ]
}
```
```
// 请将$r('app.string.module_desc')替换为实际资源文件，在本示例中该资源文件的value值为"模块描述"
Text($r('app.string.module_desc'))
  .baselineOffset(0)
  .fontSize(30)
  .border({ width: 1 })
  .padding(10)
  .width(300)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2/v3/zJaQmQnoSwiSM3bjGxWoOg/zh-cn_image_0000002543373486.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=049D8EE9192B71191998A3592EB08F7D2770572FC4C6884997AD06BCA7648767)
#### 添加子组件
[Span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span) 只能作为 [Text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text) 和 [RichEditor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-richeditor) 组件的子组件显示文本内容。可以在一个Text内添加多个Span来显示一段信息，例如产品说明书、承诺书等。
-
创建Span。
Span组件需嵌入在Text组件中才能显示，单独使用时不会显示任何内容。Text与Span同时配置文本内容时，Span内容将覆盖Text内容。
```
// 请将$r('app.string.TextSpan_textContent_text')替换为实际资源文件，在本示例中该资源文件的value值为"我是Text"
Text($r('app.string.TextSpan_textContent_text')) {
  // 请将$r('app.string.TextSpan_textContent_span')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span"
  Span($r('app.string.TextSpan_textContent_span'))
}
.padding(10)
.borderWidth(1)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c4/v3/c0wFEQFZTCK585BriJovWQ/zh-cn_image_0000002543213824.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=C0945E0B3AE1791DF25AB056A8595A128DA86C05BBDAB64304D45F9D9EBA9CED)
-
设置文本装饰线及颜色。
通过 [decoration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#decoration) 设置文本装饰线及颜色。
```
Text() {
  // 请将$r('app.string.TextSpan_textContent_span_one')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span1，"
  Span($r('app.string.TextSpan_textContent_span_one'))
    .fontSize(16)
    .fontColor(Color.Grey)
    .decoration({ type: TextDecorationType.LineThrough, color: Color.Red })
  // 请将$r('app.string.TextSpan_textContent_span_two')替换为实际资源文件，在本示例中该资源文件的value值为"我是Span2"
  Span($r('app.string.TextSpan_textContent_span_two'))
    .fontColor(Color.Blue)
    .fontSize(16)
    .fontStyle(FontStyle.Italic)
    .decoration({ type: TextDecorationType.Underline, color: Color.Black })
  // 请将$r('app.string.TextSpan_textContent_span_three')替换为实际资源文件，在本示例中该资源文件的value值为"，我是Span3"
  Span($r('app.string.TextSpan_textContent_span_three'))
    .fontSize(16)
    .fontColor(Color.Grey)
    .decoration({ type: TextDecorationType.Overline, color: Color.Green })
}
.borderWidth(1)
.padding(10)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/mLtGYK7TTMaSMK96KyZXtA/zh-cn_image_0000002573853737.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=C23AC647015116EBE427B2F2FE1B0FCC8E1F4C5442705BECF20E73ED8EF71333)
-
通过 [textCase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-span#textcase) 设置文字一直保持大写或者小写状态。
```
Text() {
  Span('I am Upper-span').fontSize(12)
    .textCase(TextCase.UpperCase)
}
.borderWidth(1)
.padding(10)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/q1t7FqwZSBq8VZTiUBisAQ/zh-cn_image_0000002573973715.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=162C5A559F29E34033613723A49DA211645E55E5C84D9079DDE4EE3D48031B19)
-
添加事件。
由于Span组件无尺寸信息，仅支持添加点击事件 [onClick](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click#onclick) 、悬浮事件 [onHover](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-hover#onhover) 。
```
// xxx.ets
import { hilog } from '@kit.PerformanceAnalysisKit';
@Entry
@Component
export struct TextSpanOnHover {
  @State textStr1: string = '';
  @State textStr2: string = '';
  build() {
    NavDestination() {
      Row() {
        Column() {
          Text() {
            Span('I am Upper-span')
              .textCase(TextCase.UpperCase)
              .fontSize(30)
              .onClick(() => {
                hilog.info(0x0000, 'Sample_TextComponent', 'Span onClick is triggering');
                this.textStr1 = 'Span onClick is triggering';
              })
              .onHover(() => {
                hilog.info(0x0000, 'Sample_TextComponent', 'Span onHover is triggering');
                this.textStr2 = 'Span onHover is triggering';
              })
          }
          Text('onClick：' + this.textStr1)
            .fontSize(20)
          Text('onHover：' + this.textStr2)
            .fontSize(20)
        }.width('100%')
      }
      .height('100%')
    }
    // ···
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3e/v3/ziOIu1SvRFmiot96gpFi_w/zh-cn_image_0000002543373488.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=2508C3319D77CFD7683CE8BC6D60BB3A3D8F8DE90FC59B958AA8B2EC1F9BB159)
#### 创建自定义文本样式
Text组件支持创建自定义文本样式，以下为修改文本样式的主要属性。
| 属性名称 | 功能描述 |
| --- | --- |
| baselineOffset | 设置文本基线的偏移量。 |
| contentTransition | 设置数字翻牌效果。 |
| copyOption | 设置文本是否可复制粘贴。 |
| decoration | 设置文本装饰线样式，如类型、颜色及其粗细。 |
| enableAutoSpacing | 设置是否开启中文与西文的自动间距。 |
| enableDataDetector | 设置是否进行文本特殊实体识别。 |
| font | 设置文本字体相关属性。 |
| fontColor | 设置文本字体颜色。 |
| fontFamily | 设置文本字体族。 |
| fontFeature | 设置文字特性效果，比如数字等宽的特性。 |
| fontSize | 设置文本字体大小。 |
| fontStyle | 设置文本字体风格。 |
| fontWeight | 设置文本字体粗细。 |
| halfLeading | 设置文本是否将行间距平分至行的顶部与底部。 |
| heightAdaptivePolicy | 设置文本自适应布局调整字号的方式。 |
| letterSpacing | 设置文本字符间距。 |
| lineHeight | 设置文本行高。 |
| lineSpacing | 设置文本的行间距。 |
| marqueeOptions | 设置跑马灯配置项，如开关、步长、循环次数、方向等。 |
| maxFontSize | 设置自适应字体最大尺寸。 |
| maxLines | 设置文本最大显示行数。 |
| minFontSize | 设置自适应字体最小尺寸。 |
| optimizeTrailingSpace | 控制每行末尾空格的优化。 |
| privacySensitive | 设置是否支持卡片敏感隐私信息。 |
| shaderStyle | 设置文本渐变色样式。 |
| textCase | 设置文本大小写转换。 |
| textAlign | 设置文本段落在水平方向的对齐方式。 |
| textIndent | 设置首行文本缩进。 |
| textOverflow | 控制文本超长处理方式。 |
| textSelectable | 设置文本是否可选择。 |
| textVerticalAlign | 设置文本段落在垂直方向的对齐方式。 |
| wordBreak | 设置断行规则。 |
下面对常用的接口进行举例说明。
-
通过 [textAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign) 属性设置文本对齐样式。
```
// 请将$r('app.string.TextAlign_Start')替换为实际资源文件，在本示例中该资源文件的value值为"左对齐"
Text($r('app.string.TextAlign_Start'))
  .width(300)
  .textAlign(TextAlign.Start)
  .border({ width: 1 })
  .padding(10)
// 请将$r('app.string.TextAlign_Center')替换为实际资源文件，在本示例中该资源文件的value值为"中间对齐"
Text($r('app.string.TextAlign_Center'))
  .width(300)
  .textAlign(TextAlign.Center)
  .border({ width: 1 })
  .padding(10)
// 请将$r('app.string.TextAlign_End')替换为实际资源文件，在本示例中该资源文件的value值为"右对齐"
Text($r('app.string.TextAlign_End'))
  .width(300)
  .textAlign(TextAlign.End)
  .border({ width: 1 })
  .padding(10)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/_SSFjWL5RYuqX73xaw5cTg/zh-cn_image_0000002543213826.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=5274618953CF4C7A49AB5A0E981088B900BCFE7DAF031EA5BFD66DA6F1203F57)
-
通过 [textOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow) 属性控制文本超长处理，textOverflow需配合 [maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines) 一起使用（默认情况下文本自动折行）。从API version 18开始，文本超长时设置跑马灯的方式展示时，支持设置跑马灯的配置项，比如开关、步长、循环次数、方向等。
```
Text('This is the setting of textOverflow to Clip text content This is the setting of textOverflow ' +
  'to None text content. This is the setting of textOverflow to Clip text content This is the setting ' +
  'of textOverflow to None text content.')
  .width(250)
  .textOverflow({ overflow: TextOverflow.None })
  .maxLines(1)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
// 'app.string.CustomTextStyle_textContent_epsis'资源文件中的value值为
// '我是超长文本，超出的部分显示省略号 I am an extra long text, with ellipses displayed for any excess。'
Text($r('app.string.CustomTextStyle_textContent_epsis'))
  .width(250)
  .textOverflow({ overflow: TextOverflow.Ellipsis })
  .maxLines(1)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
// 'app.string.CustomTextStyle_textContent_marq'资源文件中的value值为
// '当文本溢出其尺寸时，文本将滚动显示
// When the text overflows its dimensions,the text will scroll for displaying.'
Text($r('app.string.CustomTextStyle_textContent_marq'))
  .width(250)
  .textOverflow({ overflow: TextOverflow.MARQUEE })
  .maxLines(1)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
// 'app.string.CustomTextStyle_textContent_marq_def'资源文件中的value值为
// '当文本溢出其尺寸时，文本将滚动显示，支持设置跑马灯配置项
// When the text overflows its dimensions, the text will scroll for displaying.'
Text($r('app.string.CustomTextStyle_textContent_marq_def'))
  .width(250)
  .textOverflow({ overflow: TextOverflow.MARQUEE })
  .maxLines(1)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .marqueeOptions({
    start: true,
    fromStart: true,
    step: 6,
    loop: -1,
    delay: 0,
    fadeout: false,
    marqueeStartPolicy: MarqueeStartPolicy.DEFAULT
  })
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8d/v3/Fd09VocrQAKFwDFR27WrwQ/zh-cn_image_0000002573853739.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=D836579739F493DD2E124C555E2E6C8FFCC3D6CC38C454AF6B7976A70E81B196)
-
通过 [lineHeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#lineheight) 属性设置文本行高。
```
Text('This is the text with the line height set. This is the text with the line height set.')
  .width(300).fontSize(12).border({ width: 1 }).padding(10)
Text('This is the text with the line height set. This is the text with the line height set.')
  .width(300)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .lineHeight(20)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/INvmCIXhTZaWGbP7rnZeTQ/zh-cn_image_0000002573973717.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=4FBF270CE29C7CCE1CBBF6DC40E1CAE6B25B08FFCCAB5C060171A72DB88E2C52)
-
通过 [decoration](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#decoration) 属性设置文本装饰线样式、颜色及其粗细。
```
Text('This is the text')
  .decoration({
    type: TextDecorationType.LineThrough,
    color: Color.Red
  })
  .borderWidth(1).padding(15).margin(5)
Text('This is the text')
  .decoration({
    type: TextDecorationType.Overline,
    color: Color.Red
  })
  .borderWidth(1).padding(15).margin(5)
Text('This is the text')
  .decoration({
    type: TextDecorationType.Underline,
    color: Color.Red
  })
  .borderWidth(1).padding(15).margin(5)
Text('This is the text')
  .decoration({
    type: TextDecorationType.Underline,
    color: Color.Blue,
    style: TextDecorationStyle.DASHED
  })
  .borderWidth(1).padding(15).margin(5)
Text('This is the text')
  .decoration({
    type: TextDecorationType.Underline,
    color: Color.Blue,
    style: TextDecorationStyle.DOTTED
  })
  .borderWidth(1).padding(15).margin(5)
Text('This is the text')
  .decoration({
    type: TextDecorationType.Underline,
    color: Color.Blue,
    style: TextDecorationStyle.DOUBLE
  })
  .borderWidth(1).padding(15).margin(5)
Text('This is the text')
  .decoration({
    type: TextDecorationType.Underline,
    color: Color.Blue,
    style: TextDecorationStyle.WAVY,
    thicknessScale: 4
  })
  .borderWidth(1).padding(15).margin(5)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/43/v3/h834HUpzS1yA62msr3YOUQ/zh-cn_image_0000002543373490.jpg?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=CB3E93B661912098DC852A72F00A3B47F7B0982ADC0BFBAD8C499FCCDD0F26D1)
-
通过 [baselineOffset](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#baselineoffset) 属性设置文本基线的偏移量。
```
Text('This is the text content with baselineOffset 0.')
  .baselineOffset(0)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .width('100%')
  .margin(5)
Text('This is the text content with baselineOffset 30.')
  .baselineOffset(30)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .width('100%')
  .margin(5)
Text('This is the text content with baselineOffset -20.')
  .baselineOffset(-20)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .width('100%')
  .margin(5)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/VGDWPHsYTnaJ3dFE_L3yFg/zh-cn_image_0000002543213828.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=183D164479091E724D400A3A826FFE3698FF5E245DCC5FA0422B6C63383CFAD0)
-
通过 [letterSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#letterspacing) 属性设置文本字符间距。
```
Text('This is the text content with letterSpacing 0.')
  .letterSpacing(0)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .width('100%')
  .margin(5)
Text('This is the text content with letterSpacing 3.')
  .letterSpacing(3)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .width('100%')
  .margin(5)
Text('This is the text content with letterSpacing -1.')
  .letterSpacing(-1)
  .fontSize(12)
  .border({ width: 1 })
  .padding(10)
  .width('100%')
  .margin(5)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e7/v3/f9PEiW6WTny2VT6-fpi4Tg/zh-cn_image_0000002573853741.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=916B5EFA0C974AFC9012BBE3ABA935A5504F2F6994A7D06A2502E4C230CFE62F)
-
通过 [minFontSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#minfontsize) 与 [maxFontSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxfontsize) 自适应字体大小。
minFontSize用于设置文本的最小显示字号，maxFontSize用于设置文本的最大显示字号。这两个属性必须同时设置才能生效，并且需要与 [maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines) 属性或布局大小限制配合使用，单独设置任一属性将不会产生效果。
```
/* 请将$r('app.string.CustomTextStyle_textContent_one_style')替换为实际资源文件，
 * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为5，宽度为250，maxLines为1"
 */
Text($r('app.string.CustomTextStyle_textContent_one_style'))
  .width(250)
  .maxLines(1)
  .maxFontSize(30)
  .minFontSize(5)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
/* 请将$r('app.string.CustomTextStyle_textContent_two_style')替换为实际资源文件，
 * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为5，宽度为250，maxLines为2"
 */
Text($r('app.string.CustomTextStyle_textContent_two_style'))
  .width(250)
  .maxLines(2)
  .maxFontSize(30)
  .minFontSize(5)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
/* 请将$r('app.string.CustomTextStyle_textContent_no_max')替换为实际资源文件，
 * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为15，宽度为250,高度为50"
 */
Text($r('app.string.CustomTextStyle_textContent_no_max'))
  .width(250)
  .height(50)
  .maxFontSize(30)
  .minFontSize(15)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
/* 请将$r('app.string.CustomTextStyle_textContent_high')替换为实际资源文件，
 * 在本示例中该资源文件的value值为"我的最大字号为30，最小字号为15，宽度为250,高度为100"
 */
Text($r('app.string.CustomTextStyle_textContent_high'))
  .width(250)
  .height(100)
  .maxFontSize(30)
  .minFontSize(15)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e2/v3/jHtDOlA0Q4OIVBUZzJHVUQ/zh-cn_image_0000002573973719.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=4237DB5A74D83073606F8E3CE2CC1CF5B5E932F2A0F67EB7D37EBFE66739FE0E)
-
通过 [textCase](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textcase) 属性设置文本大小写。
```
Text('This is the text content with textCase set to Normal.')
  .textCase(TextCase.Normal)
  .padding(10)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
// 文本全小写展示
Text('This is the text content with textCase set to LowerCase.')
  .textCase(TextCase.LowerCase)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
// 文本全大写展示
Text('This is the text content with textCase set to UpperCase.')
  .textCase(TextCase.UpperCase)
  .border({ width: 1 })
  .padding(10)
  .margin(5)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/80/v3/E1hoDgAVTgqCXQi4fx38Bw/zh-cn_image_0000002543373492.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=0F375AAD384EF99C53C419064E5B821AF66630EEA91EC898C3C0FF2E3243D85C)
-
通过 [copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9) 属性设置文本是否可复制粘贴。
```
// 请将$r('app.string.CustomTextStyle_textContent_incopy')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段可复制文本。"
Text($r('app.string.CustomTextStyle_textContent_incopy'))
  .fontSize(30)
  .copyOption(CopyOptions.InApp)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8a/v3/g53qxGRoSfa8pUYhMXA8_Q/zh-cn_image_0000002543213830.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=7A1B1FF95FD848F4459838A7E3A92B725E10AFE2B9D8472D9246EF6BBC0E290A)
-
通过 [fontFamily](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#fontfamily) 属性设置字体列表。应用当前支持'HarmonyOS Sans'字体和 [注册自定义字体](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-font) 。
```
Text('This is the text content with fontFamily')
  .fontSize(30)
  .fontFamily('HarmonyOS Sans')
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/de/v3/rcf3_phYQDO9YoJbm35Uzg/zh-cn_image_0000002573853743.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=B2363C1CC228E8B5C8012903A574E2727FF5F849635C019B7C469EDC5C128329)
-
从API version 20开始，支持通过 [contentTransition](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#contenttransition20) 属性设置数字翻牌效果。
```
@Entry
@Component
export struct ContentTransition {
  private static readonly INITIAL_SCORE: number = 98;
  @State number: number = ContentTransition.INITIAL_SCORE;
  @State numberTransition: NumericTextTransition =
    new NumericTextTransition({ flipDirection: FlipDirection.DOWN, enableBlur: false });
  build() {
    NavDestination() {
      Column() {
        Text(this.number + '')
          .borderWidth(1)
          .fontSize(40)
          .contentTransition(this.numberTransition)
        Button('chang number')
          .onClick(() => {
            this.number++
          })
          .margin(10)
      }
      .width('100%')
      .height('100%')
    }
    // ···
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6/v3/7w0sptmeQbiDD_18zv4TTQ/zh-cn_image_0000002573973721.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=06508A7A5564A5942B72F525C6A86C6147582FBCFEFFAB7FB2667EC3833DFBF7)
-
从API version 20开始，支持通过 [optimizeTrailingSpace](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#optimizetrailingspace20) 设置是否在文本布局过程中优化每行末尾的空格，可解决行尾空格影响对齐显示效果问题。
```
Column() {
  // 启用优化行尾空格功能
  Text('Trimmed space enabled     ')
    .fontSize(30)
    .fontWeight(FontWeight.Bold)
    .margin({ top: 20 })
    .optimizeTrailingSpace(true)
    .textAlign(TextAlign.Center)
  // 不启用优化行尾空格功能
  Text('Trimmed space disabled     ')
    .fontSize(30)
    .fontWeight(FontWeight.Bold)
    .margin({ top: 20 })
    .optimizeTrailingSpace(false)
    .textAlign(TextAlign.Center)
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/27/v3/Kl5meXslRUuoMg3YQjmFdw/zh-cn_image_0000002543373494.jpg?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=96F5CB5EB8F4A68BCF3F7137F7BC5A02B2464FDACE451C0CBA3278F02E79BC37)
-
从API version 20开始，支持通过 [lineSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#linespacing20) 设置文本的行间距。当不配置 [LineSpacingOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#linespacingoptions20对象说明) 时，首行上方和尾行下方默认会有行间距，当onlyBetweenLines设置为true时，行间距仅适用于行与行之间，首行上方无额外的行间距。
```
import { LengthMetrics } from '@kit.ArkUI';
@Extend(Text)
function style() {
  .width(250)
  .height(100)
  .maxFontSize(30)
  .minFontSize(15)
  .border({ width: 1 })
}
@Entry
@Component
export struct LineSpacing {
  build() {
    NavDestination() {
      Column() {
        Text('The line spacing of this context is set to 20_px, and the spacing is effective only between the lines.')
          .lineSpacing(LengthMetrics.px(20), { onlyBetweenLines: true })
          .style()
      }
    }
    // ···
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/ulEFKjvLRb2xn0N8BqFiIA/zh-cn_image_0000002543213832.jpg?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=8AA4741C5ADA3C55BAB5960A621429E0D842551EE51FA88457B56E5DF8397FE4)
-
从API version 20开始，支持通过 [enableAutoSpacing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enableautospacing20) 设置是否开启中文与西文的自动间距。
```
@Entry
@Component
export struct EnableAutoSpacing {
  @State enableSpacing: boolean = false;
  build() {
    NavDestination() {
    Column() {
      Row({ space: 20 }) {
        // 请将$r('app.string.Enable_automatic_spacing')替换为实际资源文件，在本示例中该资源文件的value值为"开启自动间距"
        Button($r('app.string.Enable_automatic_spacing'))
          .onClick(() => this.enableSpacing = true)
          .backgroundColor(this.enableSpacing ? '#4CAF50' : '#E0E0E0')
          .fontColor(this.enableSpacing ? Color.White : Color.Black)
        // 请将$r('app.string.off_automatic_spacing')替换为实际资源文件，在本示例中该资源文件的value值为"关闭自动间距"
        Button($r('app.string.off_automatic_spacing'))
          .onClick(() => this.enableSpacing = false)
          .backgroundColor(!this.enableSpacing ? '#F44336' : '#E0E0E0')
          .fontColor(!this.enableSpacing ? Color.White : Color.Black)
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .margin({ top: 30, bottom: 20 })
      // 请将$r('app.string.Automatic_spacing_has_been_enabled')替换为实际资源文件，在本示例中该资源文件的value值为"当前状态:已开启自动间距"
      // 请将$r('app.string.Automatic_spacing_has_been_turned_off')替换为实际资源文件，在本示例中该资源文件的value值为"当前状态:已关闭自动间距"
      Text(this.enableSpacing ? $r('app.string.Automatic_spacing_has_been_enabled') : $r('app.string.Automatic_spacing_has_been_turned_off'))
        .fontSize(16)
        .fontColor(this.enableSpacing ? '#4CAF50' : '#F44336')
        .margin({ bottom: 20 })
      // 设置是否应用中西文自动间距
      /* 请将$r('app.string.Chinese_and_Western_Auto_Spacing_automatic_spacing')替换为实际资源文件，
       * 在本示例中该资源文件的value值为"中西文Auto Spacing自动间距"
       */
      Text($r('app.string.Chinese_and_Western_Auto_Spacing_automatic_spacing'))
        .fontSize(24)
        .padding(15)
        .backgroundColor('#F5F5F5')
        .width('90%')
        .enableAutoSpacing(this.enableSpacing)
    }
    .width('100%')
    .height('100%')
    .padding(20)
    }
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/M_Y5EsOjSQeOA_Gd1Om18Q/zh-cn_image_0000002573853745.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=B34A42E5F4CE84D5F7EC668DACFAF27E5A379718A3D43B895C6F499B79EDA96D)
-
从API version 20开始，支持通过 [shaderStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#shaderstyle20) 设置渐变色。
```
@Entry
@Component
export struct ShaderStyle {
  @State message: string = 'Hello World';
  @State linearGradientOptions: LinearGradientOptions =
    {
      direction: GradientDirection.LeftTop,
      colors: [[Color.Red, 0.0], [Color.Blue, 0.3], [Color.Green, 0.5]],
      repeating: true,
    };
  build() {
    NavDestination() {
      Column({ space: 5 }) {
        // 请将$r('app.string.direction_LeftTop')替换为实际资源文件，在本示例中该资源文件的value值为"direction为LeftTop的线性渐变"
        Text($r('app.string.direction_LeftTop')).fontSize(18).width('90%').fontColor(0xCCCCCC)
          .margin({ top: 40, left: 40 })
        Text(this.message)
          .fontSize(50)
          .width('80%')
          .height(50)
          .shaderStyle(this.linearGradientOptions)
      }
      .height('100%')
      .width('100%')
    }
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e0/v3/bebtLtDySri4a7w4DP2oyA/zh-cn_image_0000002573973723.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=D21DFD6FB691E42970B9E346EFAE602499E093F083F4573CC4809597B4704D8B)
#### 添加事件
Text组件可以添加通用事件，可以绑定 [onClick](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-click#onclick) 、 [onTouch](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-events-touch#ontouch) 等事件来响应操作。
```
// xxx.ets
import { hilog } from '@kit.PerformanceAnalysisKit';
@Entry
@Component
export struct GeneralEvents {
  @State textStr1: string = '';
  @State textStr2: string = '';
  build() {
    NavDestination() {
      Row() {
        Column() {
          Text('This is a text component.')
            .fontSize(30)
            .onClick(() => {
              hilog.info(0x0000, 'Sample_TextComponent', 'Text onClick is triggering');
              this.textStr1 = 'Text onClick is triggering';
            })
            .onTouch(() => {
              hilog.info(0x0000, 'Sample_TextComponent', 'Text onTouch is triggering');
              this.textStr2 = 'Text onTouch is triggering';
            })
          Text('onClick：' + this.textStr1)
            .fontSize(20)
          Text('onTouch：' + this.textStr2)
            .fontSize(20)
        }.width('100%')
      }
      .height('100%')
    }
    // ···
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/43/v3/zELwAns8Tm2CZLaekxQMug/zh-cn_image_0000002543373496.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=9507CC7A9853141462B4A53E19D23FD67CF30DA0DCF5AC67DB60778669D6569F)
#### 设置垂直居中
从API version 20开始，Text组件支持通过 [textVerticalAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textverticalalign20) 属性实现文本段落在垂直方向的对齐。
-
以下示例展示了如何通过textVerticalAlign属性设置文本垂直居中对齐效果。
```
// 请将$r('app.media.startIcon')替换为实际资源文件
Text() {
  Span('Hello')
    .fontSize(50)
  ImageSpan($r('app.media.startIcon'))
    .width(30).height(30)
    .verticalAlign(ImageSpanAlignment.FOLLOW_PARAGRAPH)
  Span('World')
}
.textVerticalAlign(TextVerticalAlign.CENTER)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/ub19qhQTTOCQ_GYIngw3Cg/zh-cn_image_0000002543213834.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=519091310ED60070FED800D877E1B701216B60CCBB48F46069A21074A17FE9BB)
#### 设置选中菜单
#### 弹出选中菜单
-
设置Text被选中时，会弹出包含复制、翻译、搜索的菜单。
Text组件需要设置 [copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9) 属性才可以被选中。
```
// 请将$r('app.string.selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
Text($r('app.string.selected_menu'))
  .fontSize(30)
  .copyOption(CopyOptions.InApp)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/sCy4y3m6Q96BrwYoRW1d_w/zh-cn_image_0000002573853747.jpg?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=29E713092CEACB17FED4B95FAA40F3486057AC9B6209771F06FD5B34565002F1)
-
Text组件通过设置 [bindSelectionMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#bindselectionmenu11) 属性绑定自定义选择菜单。
```
controller: TextController = new TextController();
options: TextOptions = { controller: this.controller };
```
```
// 请将$r('app.string.show_selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
Text($r('app.string.show_selected_menu'), this.options)
  .fontSize(30)
  .copyOption(CopyOptions.InApp)
  .bindSelectionMenu(TextSpanType.TEXT, this.RightClickTextCustomMenu, TextResponseType.RIGHT_CLICK, {
    onAppear: () => {
      // 请将$r('app.string.SelectMenu_Text_Ejected')替换为实际资源文件，在本示例中该资源文件的value值为"自定义选择菜单弹出时触发该回调"
      hilog.info(0x0000, 'Sample_TextComponent',
        this.getUIContext()
          .getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_Ejected').id));
    },
    onDisappear: () => {
      // 'SelectMenu_Text_Close'资源文件中的value值为'自定义选择菜单关闭时触发该回调'
      hilog.info(0x0000, 'Sample_TextComponent',
        this.getUIContext()
          .getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_Close').id));
    }
  })
```
```
// 定义菜单项
@Builder
RightClickTextCustomMenu() {
  Column() {
    Menu() {
      MenuItemGroup() {
        // 请将$r('app.media.app_icon')替换为实际资源文件
        MenuItem({ startIcon: $r('app.media.app_icon'), content: 'CustomMenu One', labelInfo: '' })
          .onClick(() => {
            // 使用closeSelectionMenu接口关闭菜单
            this.controller.closeSelectionMenu();
          })
        MenuItem({ startIcon: $r('app.media.app_icon'), content: 'CustomMenu Two', labelInfo: '' })
        MenuItem({ startIcon: $r('app.media.app_icon'), content: 'CustomMenu Three', labelInfo: '' })
      }
    }.backgroundColor('#F0F0F0')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/bDOzOgspRMy4VMbWrX_-sQ/zh-cn_image_0000002573973725.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=55BB2007A94FF9A252A236250989AFC31F57F7E165A37D0BE51EBB3457C562AB)
-
Text组件通过设置 [editMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12) 属性扩展自定义选择菜单，可以设置扩展项的文本内容、图标以及回调方法。
```
// 请将$r('app.string.show_selected_menu')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，用来展示选中菜单"
Text($r('app.string.show_selected_menu'))
  .fontSize(20)
  .copyOption(CopyOptions.LocalDevice)
  .editMenuOptions({
    onCreateMenu: this.onCreateMenu, onMenuItemClick: this.onMenuItemClick
  })
```
```
// 定义onCreateMenu，onMenuItemClick
// 请将$r('app.media.app_icon')替换为实际资源文件
onCreateMenu = (menuItems: Array<TextMenuItem>) => {
  let item1: TextMenuItem = {
    content: 'customMenu1',
    icon: $r('app.media.app_icon'),
    id: TextMenuItemId.of('customMenu1'),
  };
  let item2: TextMenuItem = {
    content: 'customMenu2',
    id: TextMenuItemId.of('customMenu2'),
    icon: $r('app.media.app_icon'),
  };
  menuItems.push(item1);
  menuItems.unshift(item2);
  return menuItems;
}
onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange) => {
  if (menuItem.id.equals(TextMenuItemId.of('customMenu2'))) {
    // 请将$r('app.string.SelectMenu_Text_customMenu')替换为实际资源文件，在本示例中该资源文件的value值为"拦截 id: customMenu2 start:"
    hilog.info(0x0000, 'Sample_TextComponent',
      this.getUIContext().getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_customMenu')
        .id) + textRange.start + '; end:' +
      textRange.end);
    return true;
  }
  if (menuItem.id.equals(TextMenuItemId.COPY)) {
    // 请将$r('app.string.SelectMenu_Text_copy')替换为实际资源文件，在本示例中该资源文件的value值为"拦截 COPY start:"
    hilog.info(0x0000, 'Sample_TextComponent',
      this.getUIContext().getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_copy').id) +
      textRange.start + '; end:' + textRange.end);
    return true;
  }
  if (menuItem.id.equals(TextMenuItemId.SELECT_ALL)) {
    // 请将$r('app.string.SelectMenu_Text_SelectionAll')替换为实际资源文件，在本示例中该资源文件的value值为"不拦截 SELECT_ALL start:"
    hilog.info(0x0000, 'Sample_TextComponent',
      this.getUIContext()
        .getHostContext()!.resourceManager.getStringSync($r('app.string.SelectMenu_Text_SelectionAll').id) +
      textRange.start + '; end:' +
      textRange.end);
    return false;
  }
  return false;
};
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/92/v3/g3d9RkrUT1if8P6XLEoK5A/zh-cn_image_0000002543373498.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=2BFD4F2B2CBE4261F4E90067125E7AE658BFD77C8AFD80EDCA9DA1DC225C003F)
#### 关闭选中菜单
使用Text组件时，若需要实现点击空白处关闭选中的场景，分为以下两种情况：
-
在Text组件区域内点击空白处，会正常关闭选中态和菜单；
-
在Text组件区域外点击空白处，前提是Text组件设置 [selection](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#selection11) 属性，具体示例如下：
```
// xxx.ets
@Entry
@Component
export struct SelectionChange {
  @State text: string =
    'This is set selection to Selection text content This is set selection to Selection text content.';
  @State start: number = 0;
  @State end: number = 20;
  build() {
    NavDestination() {
      Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
        Text(this.text)
          .fontSize(12)
          .border({ width: 1 })
          .lineHeight(20)
          .margin(30)
          .copyOption(CopyOptions.InApp)
          .selection(this.start, this.end)
          .onTextSelectionChange((selectionStart, selectionEnd) => {
            // 更新选中态位置
            this.start = selectionStart;
            this.end = selectionEnd;
          })
      }
      .height(600)
      .width(335)
      .borderWidth(1)
      .onClick(() => {
        // 监听父组件的点击事件，将选中首尾位置均设置为-1，即可清除选中
        this.start = -1;
        this.end = -1;
      })
    }
    // ···
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/5lo5AT9ASTm5p1rmFe2IpA/zh-cn_image_0000002543213836.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=A6A9B64A79CC42B3F093AAAAD81A753A897621F4D830C4BCDB59C1F6A13301CF)
#### 屏蔽系统菜单回调和自定义扩展菜单
从API version 12开始，支持通过 [editMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12) 屏蔽系统菜单回调和自定义扩展菜单项。
```
// xxx.ets
@Entry
@Component
export struct CustomAndBlockMenus {
  private static readonly CREATE_MENU_ITEM_ID_1: string = 'create1';
  private static readonly CREATE_MENU_ITEM_ID_2: string = 'create2';
  private static readonly PREPARE_MENU_ITEM_ID: string = 'prepare1';
  private controller: TextController = new TextController();
  @State private text: string = 'Text editMenuOptions';
  @State private endIndex: number = 0;
  @State blockCallbackText: string = '';
  // 创建菜单项辅助方法
  private createMenuItem(id: string, content: string): TextMenuItem {
    // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件
    return {
      content: content,
      icon: $r('app.media.startIcon'),
      id: TextMenuItemId.of(id)
    };
  }
  // 查找菜单项索引
  private findMenuItemIndex(menuItems: Array<TextMenuItem>, menuItemId: TextMenuItemId): number {
    return menuItems.findIndex((item: TextMenuItem) => item.id.equals(menuItemId));
  }
  // 创建菜单回调
  private onCreateMenu = (menuItems: Array<TextMenuItem>): Array<TextMenuItem> => {
    const createItem1: TextMenuItem = this.createMenuItem(
      CustomAndBlockMenus.CREATE_MENU_ITEM_ID_1,
      'create1'
    );
    const createItem2: TextMenuItem = this.createMenuItem(
      CustomAndBlockMenus.CREATE_MENU_ITEM_ID_2,
      'create2'
    );
    // 添加自定义菜单项
    menuItems.push(createItem1);
    menuItems.unshift(createItem2);
    // 移除不需要的系统菜单项
    this.removeMenuItemById(menuItems, TextMenuItemId.AI_WRITER);
    this.removeMenuItemById(menuItems, TextMenuItemId.TRANSLATE);
    return menuItems;
  }
  // 移除指定菜单项
  private removeMenuItemById(menuItems: Array<TextMenuItem>, menuItemId: TextMenuItemId): void {
    const targetIndex: number = this.findMenuItemIndex(menuItems, menuItemId);
    if (targetIndex !== -1) {
      menuItems.splice(targetIndex, 1);
    }
  }
  // 菜单项点击回调
  private onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange): boolean => {
    const menuItemId: TextMenuItemId = menuItem.id;
    // 处理自定义菜单项，return false，点击自定义菜单项后菜单会关闭
    if (menuItemId.equals(TextMenuItemId.of(CustomAndBlockMenus.CREATE_MENU_ITEM_ID_2))) {
      let msg = '拦截 id: create2 start:' + textRange.start + '; end:' + textRange.end;
      this.blockCallbackText = msg;
      return false;
    }
    // 处理自定义菜单项，return true，点击自定义菜单项后菜单不会关闭
    if (menuItemId.equals(TextMenuItemId.of(CustomAndBlockMenus.PREPARE_MENU_ITEM_ID))) {
      let msg = '拦截 id: prepare1 start:' + textRange.start + '; end:+' + textRange.end;
      this.blockCallbackText = msg;
      return true;
    }
    // 处理系统菜单项，return true，拦截系统默认逻辑，此时点击复制菜单不会关闭
    if (menuItemId.equals(TextMenuItemId.COPY)) {
      let msg = '拦截 COPY start:' + textRange.start + '; end:' + textRange.end;
      this.blockCallbackText = msg;
      // 可以通过文本控制器关闭菜单，手柄也会消失，仅保持选中区域，点击可消失
      this.controller.closeSelectionMenu();
      return true;
    }
    // 处理系统菜单项，return false，不拦截系统默认逻辑，自定义逻辑亦会被执行
    if (menuItemId.equals(TextMenuItemId.SELECT_ALL)) {
      let msg = '不拦截 SELECT_ALL start:' + textRange.start + '; end:' + textRange.end;
      this.blockCallbackText = msg;
      return false;
    }
    return false;
  }
  // 准备菜单回调
  private onPrepareMenu = (menuItems: Array<TextMenuItem>): Array<TextMenuItem> => {
    const prepareItem: TextMenuItem = this.createMenuItem(
      CustomAndBlockMenus.PREPARE_MENU_ITEM_ID,
      `prepare1_${this.endIndex}`
    );
    menuItems.unshift(prepareItem);
    return menuItems;
  }
  // 编辑菜单选项
  @State private editMenuOptions: EditMenuOptions = {
    onCreateMenu: this.onCreateMenu,
    onMenuItemClick: this.onMenuItemClick,
    onPrepareMenu: this.onPrepareMenu
  };
  // 文本选择变化回调
  private onTextSelectionChange = (selectionStart: number, selectionEnd: number): void => {
    this.endIndex = selectionEnd;
  }
  build() {
    NavDestination() {
      Column() {
        Text(this.text, { controller: this.controller })
          .fontSize(20)
          .copyOption(CopyOptions.LocalDevice)
          .editMenuOptions(this.editMenuOptions)
          .margin({ top: 100 })
          .onTextSelectionChange(this.onTextSelectionChange)
        Text(this.blockCallbackText).borderWidth(1)
      }
      .width('90%')
      .margin('5%')
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/CD_PynsDQV2F6kstk2Seeg/zh-cn_image_0000002573853749.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=E7E177F01E333159B38E099B1E9DB531FE45B9992FCC021C601674EB3A98FC91)
#### 屏蔽系统服务类菜单
-
从API version 20开始，支持通过 [disableSystemServiceMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablesystemservicemenuitems20) 屏蔽文本选择菜单内所有系统服务菜单项。
```
import { TextMenuController } from '@kit.ArkUI';
// xxx.ets
@Entry
@Component
export struct ServiceMenuItems {
  aboutToAppear(): void {
    // 禁用所有系统服务菜单
    TextMenuController.disableSystemServiceMenuItems(true);
  }
  aboutToDisappear(): void {
    // 页面消失恢复系统服务菜单
    TextMenuController.disableSystemServiceMenuItems(false);
  }
  build() {
    NavDestination() {
      Row() {
        Column() {
          // 请将$r('app.string.Service_MenuItems_Text')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，长按弹出文本选择菜单。"
          Text($r('app.string.Service_MenuItems_Text'))
            .height(60)
            .fontStyle(FontStyle.Italic)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Center)
            .copyOption(CopyOptions.InApp)
            .editMenuOptions({
              onCreateMenu: (menuItems: Array<TextMenuItem>) => {
                // menuItems不包含被屏蔽的系统菜单项
                return menuItems;
              },
              onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
                return false;
              }
            })
        }.width('100%')
      }
      .height('100%')
    }
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/52/v3/rddabMbfRKqL80cafEw4sA/zh-cn_image_0000002573973727.jpg?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=BC885FE93CFA74ACC4527C258F93568659605F38BE11577E6A53EBF4D98EAB23)
-
从API version 20开始，支持通过 [disableMenuItems](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-textmenucontroller#disablemenuitems20) 屏蔽文本选择菜单内指定的系统服务菜单项。
```
import { TextMenuController } from '@kit.ArkUI';
// xxx.ets
@Entry
@Component
export struct DisableMenuItems {
  aboutToAppear(): void {
    // 禁用搜索菜单
    TextMenuController.disableMenuItems([TextMenuItemId.SEARCH])
  }
  aboutToDisappear(): void {
    // 恢复系统服务菜单
    TextMenuController.disableMenuItems([])
  }
  build() {
    NavDestination() {
      Row() {
        Column() {
          // 请将$r('app.string.Service_MenuItems_Text')替换为实际资源文件，在本示例中该资源文件的value值为"这是一段文本，长按弹出文本选择菜单。"
          Text($r('app.string.Service_MenuItems_Text'))
            .height(60)
            .fontStyle(FontStyle.Italic)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Center)
            .copyOption(CopyOptions.InApp)
            .editMenuOptions({
              onCreateMenu: (menuItems: Array<TextMenuItem>) => {
                // menuItems不包含搜索
                return menuItems;
              },
              onMenuItemClick: (menuItem: TextMenuItem, textRange: TextRange) => {
                return false
              }
            })
        }.width('100%')
      }
      .height('100%')
    }
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/38/v3/wQSH6Go_RYevu9zPRc1PAg/zh-cn_image_0000002543373500.jpg?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=B818AB4E92CEBC939637BD0233010003215898396FAD3B26B7FA1FE00E6A0084)
#### 默认菜单支持自定义刷新能力
从API version 20开始，当文本选择区域变化后显示菜单之前触发 [onPrepareMenu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#属性-1) 回调，可在该回调中进行菜单数据设置。
```
// 请将$r('app.media.xxx')替换为实际资源文件
// xxx.ets
import { hilog } from '@kit.PerformanceAnalysisKit';
const DOMAIN = 0x0000;
@Entry
@Component
export struct PrepareMenu {
  @State text: string = 'Text editMenuOptions';
  @State endIndex: number = 0;
  onCreateMenu = (menuItems: Array<TextMenuItem>) => {
    let item1: TextMenuItem = {
      content: 'create1',
      icon: $r('app.media.startIcon'),
      id: TextMenuItemId.of('create1'),
    };
    let item2: TextMenuItem = {
      content: 'create2',
      id: TextMenuItemId.of('create2'),
      icon: $r('app.media.startIcon'),
    };
    menuItems.push(item1);
    menuItems.unshift(item2);
    return menuItems;
  }
  onMenuItemClick = (menuItem: TextMenuItem, textRange: TextRange) => {
    if (menuItem.id.equals(TextMenuItemId.of('create2'))) {
      hilog.info(DOMAIN, 'testTag', '%{public}s', 'intercept id: create2 start:' + textRange.start + '; end:' + textRange.end);
      return true;
    }
    if (menuItem.id.equals(TextMenuItemId.of('prepare1'))) {
      hilog.info(DOMAIN, 'testTag', '%{public}s', 'intercept id: prepare1 start:' + textRange.start + '; end:' + textRange.end);
      return true;
    }
    if (menuItem.id.equals(TextMenuItemId.COPY)) {
      hilog.info(DOMAIN, 'testTag', '%{public}s', 'intercept COPY start:' + textRange.start + '; end:' + textRange.end);
      return true;
    }
    if (menuItem.id.equals(TextMenuItemId.SELECT_ALL)) {
      hilog.info(DOMAIN, 'testTag', '%{public}s', 'No interception SELECT_ALL start:' + textRange.start + '; end:' + textRange.end);
      return false;
    }
    return false;
  }
  onPrepareMenu = (menuItems: Array<TextMenuItem>) => {
    let item1: TextMenuItem = {
      content: 'prepare1_' + this.endIndex,
      icon: $r('app.media.startIcon'),
      id: TextMenuItemId.of('prepare1'),
    };
    menuItems.unshift(item1);
    return menuItems;
  }
  @State editMenuOptions: EditMenuOptions = {
    onCreateMenu: this.onCreateMenu,
    onMenuItemClick: this.onMenuItemClick,
    onPrepareMenu: this.onPrepareMenu
  };
  build() {
    NavDestination() {
    Column() {
      Text(this.text)
        .fontSize(20)
        .copyOption(CopyOptions.LocalDevice)
        .editMenuOptions(this.editMenuOptions)
        .margin({ top: 100 })
        .onTextSelectionChange((selectionStart: number, selectionEnd: number) => {
          this.endIndex = selectionEnd;
        })
    }
    .width('90%')
    .margin('5%')
    }
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/JrO5A4gmTOao8adm6t-akQ/zh-cn_image_0000002543213838.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=FDCED2C86E6A73CEFA6335B9D2C166C62290250C4BC66FD8176846A376DC7E75)
#### 设置AI菜单
Text组件通过 [enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11) 和 [dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#datadetectorconfig11) 属性实现AI菜单的显示。AI菜单的表现形式包括：单击AI实体（指可被识别的内容，包括地址、邮箱等）弹出菜单的实体识别选项，选中文本后，文本选择菜单与鼠标右键菜单中显示的实体识别选项。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/9KF6VELiQMSP6MU8YalCrQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=435FA3D5E495A1DA1A1989E351DCF675A04758EC6EE7D148DC84967A1A84FB68)
从API version 20开始，支持在文本选择菜单与鼠标右键菜单中显示实体识别选项。当 [enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11) 设置为true，且 [copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9) 设置为CopyOptions.LocalDevice时，该功能生效。菜单选项包括 [TextMenuItemId](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textmenuitemid12) 中的url(打开链接)、email(新建邮件)、phoneNumber(呼叫)、address(导航至该位置)、dateTime(新建日程提醒)。
该功能生效时，需选中范围内，包括一个完整的AI实体，才能展示对应的选项。
-
如果需要单击AI实体弹出菜单的实体识别选项，可以配置 [enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11) 为true。
-
如果在单击的交互方式之外，还需要文本选择菜单与鼠标右键菜单中显示的实体识别选项，可以配置 [enableDataDetector](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#enabledatadetector11) 为true，且 [copyOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#copyoption9) 设置为CopyOptions.LocalDevice，具体示例如下所示：
```
// 'app.string.AIMenu_Text_One'资源文件中的value值为'电话号码：(86) (755) ********  \n \n 链接：www.********.com
// \n \n 邮箱：***@example.com\n \n 地址：XX省XX市XX区XXXX \n \n 时间：XX年XX月XX日XXXX'
Text($r('app.string.AIMenu_Text_One'))
  .fontSize(16)
  .copyOption(CopyOptions.LocalDevice)
  .enableDataDetector(true)// 使能实体识别
  .dataDetectorConfig({
    // 配置识别样式
    // types可支持PHONE_NUMBER电话号码、URL链接、EMAIL邮箱、ADDRESS地址、DATE_TIME时间
    // types设置为null或者[]时，识别所有类型的实体
    types: [], onDetectResultUpdate: (result: string) => {
    }
  })
```
-
如果需要调整识别出的样式，可以通过 [dataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#datadetectorconfig11) 实现，具体可以参考 [TextDataDetectorConfig](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-text-common#textdatadetectorconfig11对象说明) 配置项。
-
如果需要调整菜单的位置，可以通过 [editMenuOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#editmenuoptions12) 实现，具体可以参考示例 [文本扩展自定义菜单](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#示例12文本扩展自定义菜单) 。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/77/v3/klJQZGhNSwy2m2yZ_udWQA/zh-cn_image_0000002573853751.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=BF10F2224BA21629747A1FD8AD4E6EFD8AED18002439FFBF486BD778438D109B)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/89/v3/UoH2BlLWQ6alDrsbVnBqeA/zh-cn_image_0000002573973729.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=19D8599980BFD587E7D5B1DD74FC84C19F0AAEFD815A2F27FF0E3B01A516A400)
#### 实现热搜榜
该示例通过 [maxLines](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#maxlines) 、 [textOverflow](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textoverflow) 、 [textAlign](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-text#textalign) 、 [constraintSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-size#constraintsize) 属性展示了热搜榜的效果。
```
import { ComponentCard } from '../../common/Card';
@Entry
@Component
export struct TextHotSearch {
  build() {
    NavDestination() {
      Column({ space: 12 }) {
        // ...
          Column() {
            Row() {
              Text('1').fontSize(14).fontColor(Color.Red).margin({ left: 10, right: 10 })
              // 请将$r('app.string.TextHotSearch_textContent_one')替换为实际资源文件，在本示例中该资源文件的value值为"我是热搜词条1"
              Text($r('app.string.TextHotSearch_textContent_one'))
                .fontSize(12)
                .fontColor(Color.Blue)
                .maxLines(1)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .fontWeight(300)
              // 请将$r('app.string.TextHotSearch_textContent_two')替换为实际资源文件，在本示例中该资源文件的value值为"爆"
              Text($r('app.string.TextHotSearch_textContent_two'))
                .margin({ left: 6 })
                .textAlign(TextAlign.Center)
                .fontSize(10)
                .fontColor(Color.White)
                .fontWeight(600)
                .backgroundColor(0x770100)
                .borderRadius(5)
                .width(15)
                .height(14)
            }.width('100%').margin(5)
            Row() {
              Text('2').fontSize(14).fontColor(Color.Red).margin({ left: 10, right: 10 })
              /* 请将$r('app.string.TextHotSearch_textContent_three')替换为实际资源文件，
               * 在本示例中该资源文件的value值为"我是热搜词条2 我是热搜词条2 我是热搜词条2 我是热搜词条2 我是热搜词条2"
               */
              Text($r('app.string.TextHotSearch_textContent_three'))
                .fontSize(12)
                .fontColor(Color.Blue)
                .fontWeight(300)
                .constraintSize({ maxWidth: 200 })
                .maxLines(1)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
              // 请将$r('app.string.TextHotSearch_textContent_four')替换为实际资源文件，在本示例中该资源文件的value值为"热"
              Text($r('app.string.TextHotSearch_textContent_four'))
                .margin({ left: 6 })
                .textAlign(TextAlign.Center)
                .fontSize(10)
                .fontColor(Color.White)
                .fontWeight(600)
                .backgroundColor(0xCC5500)
                .borderRadius(5)
                .width(15)
                .height(14)
            }.width('100%').margin(5)
            Row() {
              Text('3').fontSize(14).fontColor(Color.Orange).margin({ left: 10, right: 10 })
              // 请将$r('app.string.TextHotSearch_textContent_five')替换为实际资源文件，在本示例中该资源文件的value值为"我是热搜词条3"
              Text($r('app.string.TextHotSearch_textContent_five'))
                .fontSize(12)
                .fontColor(Color.Blue)
                .fontWeight(300)
                .maxLines(1)
                .constraintSize({ maxWidth: 200 })
                .textOverflow({ overflow: TextOverflow.Ellipsis })
              // 请将$r('app.string.TextHotSearch_textContent_four')替换为实际资源文件，在本示例中该资源文件的value值为"热"
              Text($r('app.string.TextHotSearch_textContent_four'))
                .margin({ left: 6 })
                .textAlign(TextAlign.Center)
                .fontSize(10)
                .fontColor(Color.White)
                .fontWeight(600)
                .backgroundColor(0xCC5500)
                .borderRadius(5)
                .width(15)
                .height(14)
            }.width('100%').margin(5)
            Row() {
              Text('4').fontSize(14).fontColor(Color.Grey).margin({ left: 10, right: 10 })
              /* 请将$r('app.string.TextHotSearch_textContent_six')替换为实际资源文件，
               * 在本示例中该资源文件的value值为"我是热搜词条4 我是热搜词条4 我是热搜词条4 我是热搜词条4 我是热搜词条4"
               */
              Text($r('app.string.TextHotSearch_textContent_six'))
                .fontSize(12)
                .fontColor(Color.Blue)
                .fontWeight(300)
                .constraintSize({ maxWidth: 200 })
                .maxLines(1)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
            }.width('100%').margin(5)
          }.width('100%')
        // ...
      }
      .width('100%')
      .height('100%')
      .padding({ left: 12, right: 12 })
    }
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/Sc4tq5N6T7q6492Teue_9w/zh-cn_image_0000002543373502.png?HW-CC-KV=V1&HW-CC-Date=20260421T110850Z&HW-CC-Expire=86400&HW-CC-Sign=04C277E5422781A1A1FD4BBDF63686D3A5E78F6FF84FAA8B31B519F9A1F7CB10)
#### 示例代码
- [文字特效合集](https://gitcode.com/HarmonyOS_Samples/text-effects)