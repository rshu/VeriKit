# @Extend装饰器：定义扩展组件样式
---
# @Extend装饰器：定义扩展组件样式
在前文的示例中，可以使用 [@Styles](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-style) 用于样式的重用，在@Styles的基础上，我们提供了@Extend，用于扩展组件样式。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/G01elUXLTainNYajGHEfKQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110831Z&HW-CC-Expire=86400&HW-CC-Sign=D9B95C1C1ED1EB57A8D773D497B9E1F5F1D6B47E957076F07961B76CBFCB30A4)
从API version 9开始支持。
从API version 9开始，该装饰器支持在ArkTS卡片中使用。
从API version 11开始，该装饰器支持在元服务中使用。
#### 装饰器使用说明
#### 语法
```
@Extend(UIComponentName) function functionName { ... }
```
#### 使用规则
-
和@Styles不同，@Extend支持封装指定组件的私有属性、私有事件和自身定义的全局方法。
```
// @Extend(Text)可以支持Text的私有属性fontColor
@Extend(Text)
function fancy() {
  .fontColor(Color.Red)
}
// superFancyText可以调用预定义的fancy
@Extend(Text)
function superFancyText(size: number) {
  .fontSize(size)
  .fancy()
}
```
-
使用@Extend封装指定组件的私有属性、私有事件和自身定义的全局方法时，不支持和@Styles混用。
```
@Styles
function fancy() {
  .backgroundColor(Color.Red)
}
// superFancyText不可以调用预定义的fancy
@Extend(Text)
function superFancyText(size: number) {
  .fontSize(size)
  .fancy()
}
```
-
和@Styles不同，@Extend装饰的方法支持传入参数，调用遵循TS方法传值调用。
```
// xxx.ets
@Extend(Text)
function fancy(fontSize: number) {
  .fontColor(Color.Red)
  .fontSize(fontSize)
}
@Entry
@Component
struct FancyUse {
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(16)
      Text('Fancy')
        .fancy(24)
    }
  }
}
```
-
@Extend装饰的方法的参数可以为function，作为Event事件的句柄。
```
@Extend(Text)
function makeMeClick(onClick: () => void) {
  .backgroundColor(Color.Blue)
  .onClick(onClick)
}
@Entry
@Component
struct FancyUse {
  @State label: string = 'Hello World';
  onClickHandler() {
    this.label = 'Hello ArkUI';
  }
  build() {
    Row({ space: 10 }) {
      Text(`${this.label}`)
        .makeMeClick(() => {
          this.onClickHandler();
        })
    }
  }
}
```
-
@Extend的参数可以为 [状态变量](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-overview) ，当状态变量改变时，UI可以正常的被刷新渲染。
```
@Extend(Text)
function fancy(fontSize: number) {
  .fontColor(Color.Blue)
  .fontSize(fontSize)
}
@Entry
@Component
struct FancyUse {
  @State fontSizeValue: number = 20;
  build() {
    Column({ space: 10 }) {
      Text('Fancy')
        .fancy(this.fontSizeValue)
        .onClick(() => {
          this.fontSizeValue = 30;
        })
    }
    .width('100%')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/df/v3/7gkTyVfMSRigRdNjsaUFIA/zh-cn_image_0000002543213616.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110831Z&HW-CC-Expire=86400&HW-CC-Sign=5091E8DD9C58D706032CEA869FDA04A68B4FB2E8420CC0BA5678D5733A553E92)
#### 限制条件
- 和@Styles不同，@Extend仅支持在全局定义，不支持在组件内部定义。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a7/v3/mM1SDqjLR_a2aEjy_d9ZXw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110831Z&HW-CC-Expire=86400&HW-CC-Sign=BD995E641EC2E5BFF2C1B2B78AC052131672344CD6823516DF5B12563BC68B6E)
仅限在当前文件内使用，不支持导出。
如果要实现export功能，推荐使用 [AttributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-extension-attributemodifier) 。
【反例】
```
@Entry
@Component
struct FancyUse {
  // 错误写法，@Extend仅支持在全局定义，不支持在组件内部定义
  @Extend(Text) function fancy (fontSize: number) {
    .fontSize(fontSize)
  }
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(16)
    }
  }
}
```
【正例】
```
// 正确写法
@Extend(Text)
function fancy(fontSize: number) {
  .fontSize(fontSize)
}
@Entry
@Component
struct FancyUse {
  build() {
    Row({ space: 10 }) {
      Text('Fancy')
        .fancy(16)
    }
  }
}
```
#### 使用场景
以下示例声明了3个Text组件，每个Text组件均设置了 [fontStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontstyle) 、 [fontWeight](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-appendix-enums#fontweight) 和 [backgroundColor](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-background#backgroundcolor) 样式。
```
@Entry
@Component
struct FancyUse {
  @State label: string = 'Hello World';
  build() {
    Row({ space: 10 }) {
      Text(`${this.label}`)
        .fontStyle(FontStyle.Italic)
        .fontWeight(500)
        .backgroundColor(Color.Yellow)
      Text(`${this.label}`)
        .fontStyle(FontStyle.Italic)
        .fontWeight(600)
        .backgroundColor(Color.Pink)
      Text(`${this.label}`)
        .fontStyle(FontStyle.Italic)
        .fontWeight(700)
        .backgroundColor(Color.Orange)
    }.margin('20%')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/RgFVRIZhRxObldSlcy4bew/zh-cn_image_0000002573853529.png?HW-CC-KV=V1&HW-CC-Date=20260421T110831Z&HW-CC-Expire=86400&HW-CC-Sign=2EE9EABFC816D79368B0E0EF9C1ECC201211C48604E81322EB20A77E56E20604)
使用@Extend将样式组合复用，示例如下。
```
@Extend(Text)
function fancyText(weightValue: number, color: Color) {
  .fontStyle(FontStyle.Italic)
  .fontWeight(weightValue)
  .backgroundColor(color)
}
```
通过@Extend组合样式后，使得代码更加简洁，增强可读性。
```
@Entry
@Component
struct FancyUse {
  @State label: string = 'Hello World';
  build() {
    Row({ space: 10 }) {
      Text(`${this.label}`)
        .fancyText(100, Color.Blue)
      Text(`${this.label}`)
        .fancyText(200, Color.Pink)
      Text(`${this.label}`)
        .fancyText(300, Color.Orange)
    }.margin('20%')
  }
}
```