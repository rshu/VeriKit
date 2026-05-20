# @Styles装饰器：定义组件重用样式
---
# @Styles装饰器：定义组件重用样式
如果每个组件的样式都需要单独设置，在开发过程中会出现大量代码在进行重复样式设置，虽然可以复制粘贴，但为了代码简洁性和后续方便维护，我们推出了可以提炼公共样式进行复用的装饰器@Styles。
@Styles装饰器可以将多条样式设置提炼成一个方法，直接在组件声明的位置调用。通过@Styles装饰器可以快速定义并复用自定义样式。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dd/v3/B9u02tPLThGqR9ot2awkgg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110830Z&HW-CC-Expire=86400&HW-CC-Sign=A3170E85C9FB3EAC6A3B5016416D2B62924AB604F2019ECE113782111120FD3E)
从API version 9开始支持。
从API version 9开始，该装饰器支持在ArkTS卡片中使用。
从API version 11开始，该装饰器支持在元服务中使用。
#### 装饰器使用说明
-
当前@Styles仅支持 [通用属性](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-attributes) 和 [通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events) 。
-
@Styles可以定义在组件内或全局，在全局定义时需在方法名前面添加function关键字，组件内定义时则不需要添加function关键字。请参考用例 [组件内styles和全局styles的用法](#组件内styles和全局styles的用法) 。
-
组件内@Styles的优先级高于全局@Styles。框架优先找当前组件内的@Styles，如果找不到，则会全局查找。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ef/v3/B0nQ29uKTQu8pHYhVDSMUg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110830Z&HW-CC-Expire=86400&HW-CC-Sign=048B318D56C65423024D27FCD05232A15E8BC2D44C7D1477B4F5B64870D14B36)
只能在当前文件内使用@Styles，不支持export。
若需要实现样式导出，推荐使用 [AttributeModifier](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-user-defined-extension-attributemodifier) 。
定义在组件内的@Styles可以通过this访问组件的常量和状态变量，并可以在@Styles里通过事件来改变状态变量的值，示例如下：
```
@Entry
@Component
struct FancyUse {
  @State heightValue: number = 50;
  @Styles
  fancy() {
    .height(this.heightValue)
    .backgroundColor(Color.Blue)
    .onClick(() => {
      this.heightValue = 100;
    })
  }
  build() {
    Column() {
      Button('change height')
        .fancy()
    }
    .height('100%')
    .width('100%')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/38/v3/p9awZn6lSE6iHA1FIZqrGQ/zh-cn_image_0000002573973505.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110830Z&HW-CC-Expire=86400&HW-CC-Sign=88D827CBCEDF0C63D98F1F37EA1A92DA14ED5507D40AA5F6E1994BF2A85D171D)
#### 限制条件
- @Styles方法不支持传入参数，编译期会报错。
```
// 错误写法： @Styles不支持参数，编译期报错
  @Styles
  function globalFancy (value: number) {
    .width(value)
  }
```
```
// 正确写法
  @Styles
  function globalFancy () {
    .width(100)
  }
```
- 不支持在@Styles方法内使用逻辑组件，逻辑组件内的属性不生效。
```
// 错误写法
  @Styles
  function backgroundColorStyle() {
    if (true) {
      .backgroundColor(Color.Red)
    }
  }
```
```
// 正确写法
  @Styles
  function backgroundColorStyle() {
    .backgroundColor(Color.Red)
  }
```
#### 使用场景
#### 组件内@Styles和全局@Styles的用法
```
// 定义在全局的@Styles封装的样式
@Styles
function globalFancy1() {
  .width(150)
  .height(100)
  .backgroundColor(Color.Pink)
}
@Entry
@Component
struct GlobalFancy {
  @State heightValue: number = 100;
  // 定义在组件内的@Styles封装的样式
  @Styles
  fancy() {
    .width(200)
    .height(this.heightValue)
    .backgroundColor(Color.Gray)
    .onClick(() => {
      this.heightValue = 200;
    })
  }
  build() {
    Column({ space: 10 }) {
      // 使用全局的@Styles封装的样式
      Text('FancyA')
        .globalFancy1()
        .fontSize(30)
      // 使用组件内的@Styles封装的样式
      Text('FancyB')
        .fancy()
        .fontSize(30)
    }
    .width('100%')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/67/v3/c_TLkCMUSvKExJOCMGDOFQ/zh-cn_image_0000002543373276.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110830Z&HW-CC-Expire=86400&HW-CC-Sign=35629E7392027F829CF276710633C6DC5063FF8E400777AF433B7D88E134552F)