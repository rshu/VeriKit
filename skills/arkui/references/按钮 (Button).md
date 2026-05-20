# 按钮 (Button)
---
# 按钮 (Button)
Button是按钮组件，通常用于响应用户的点击操作，其类型包括胶囊按钮、圆形按钮、普通按钮、圆角矩形按钮。Button作为容器使用时可以通过添加子组件实现包含文字、图片等元素的按钮。具体用法请参考 [Button](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button) 。
#### 创建按钮
Button通过调用接口来创建，接口调用有以下两种形式：
-
通过label和 [ButtonOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button#buttonoptions对象说明) 创建不包含子组件的按钮。以ButtonOptions中的type和stateEffect为例。
```
Button(label?: ResourceStr, options?: { type?: ButtonType, stateEffect?: boolean })
```
其中，label用来设置按钮文字，type用于设置Button类型，stateEffect属性设置Button是否开启点击效果。
```
Button('Ok', { type: ButtonType.Normal, stateEffect: true })
  .borderRadius(8)
  .backgroundColor(0x317aff)
  .width(90)
  .height(40)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/bXPmFYqSQbSfBNTlPPur3Q/zh-cn_image_0000002573853819.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=322BC8E313DA5D232229B26D39EC8563B053E2DC7FF151B3E4B8741C3B01C08E)
-
通过 [ButtonOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button#buttonoptions对象说明) 创建包含子组件的按钮。以ButtonOptions中的type和stateEffect为例。
```
Button(options?: {type?: ButtonType, stateEffect?: boolean})
```
只支持包含一个子组件，子组件可以是基础组件或者容器组件。
```
Button({ type: ButtonType.Normal, stateEffect: true }) {
  Row() {
    // 请将$r('app.media.loading')替换为实际资源文件
    Image($r('app.media.loading')).width(20).height(40).margin({ left: 12 })
    Text('loading').fontSize(12).fontColor(0xffffff).margin({ left: 5, right: 12 })
  }.alignItems(VerticalAlign.Center)
}.borderRadius(8).backgroundColor(0x317aff).width(90).height(40)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b6/v3/BVRqjXFPRbi-DDAaJvvHNg/zh-cn_image_0000002573973797.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=7316601B4B5E06D7983585974F0C426B8705D892887431B6E7216C50FE068CB1)
#### 设置按钮类型
Button有四种可选类型，分别为胶囊类型（Capsule）、圆形按钮（Circle）、普通按钮（Normal）和圆角矩形按钮（ROUNDED_RECTANGLE），通过type进行设置。
-
胶囊按钮（默认类型）。
此类型按钮的圆角自动设置为高度的一半，不支持通过borderRadius属性重新设置圆角。
```
Button('Disable', { type: ButtonType.Capsule, stateEffect: false })
  .backgroundColor(0x317aff)
  .width(90)
  .height(40)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/81/v3/a9D6WXtIQRaUlYrk1W4wzw/zh-cn_image_0000002543373570.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=F78C1EF74F60B32D6283DDD1900266ECBB58A1CAAD5D6412F4DB23CE872AD647)
-
圆形按钮。
此类型按钮为圆形，不支持通过borderRadius属性重新设置圆角。
```
Button('Circle', { type: ButtonType.Circle, stateEffect: false })
  .backgroundColor(0x317aff)
  .width(90)
  .height(90)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/76/v3/URlm3vC_TnePJsuzPxTHmw/zh-cn_image_0000002543213908.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=82D6457F2326CEAF1C556F041A559C774225FC36A7598C6D522BFDD21FBF896A)
-
普通按钮。
此类型的按钮默认圆角为0，支持通过borderRadius属性重新设置圆角。
```
Button('Ok', { type: ButtonType.Normal, stateEffect: true })
  .borderRadius(8)
  .backgroundColor(0x317aff)
  .width(90)
  .height(40)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/dsyfIDcsT72hAr5hgbDlRg/zh-cn_image_0000002573853821.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=6F267DC9A3613D52B7533D58F94FA6ACBD48188CCDB02CB9EF33C9F5C9F2B030)
-
圆角矩形按钮。
当 [controlSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button#controlsize11) 为NORMAL时，默认圆角大小为20vp， [controlSize](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-button#controlsize11) 为SMALL时，圆角大小为14vp，支持通过borderRadius属性重新设置圆角。
```
Button('Disable', { type: ButtonType.ROUNDED_RECTANGLE, stateEffect: true })
  .backgroundColor(0x317aff)
  .width(90)
  .height(40)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/jnFFzpGzRGyUg6N2Yj94-Q/zh-cn_image_0000002543373570.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=0F2B068166857A84059E1455BF70598437AFFA19E6768DB5349C04E718BD8811)
#### 自定义样式
-
设置边框弧度。
使用通用属性来自定义按钮样式。例如通过borderRadius属性设置按钮的边框弧度。
```
Button('circle border', { type: ButtonType.Normal })
  .borderRadius(20)
  .height(40)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/ePOQdaypRjqGYhoyY6dOsg/zh-cn_image_0000002573973799.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=904E4968CACBB135CE27937AF95ED0CC470CE4B6530CE2CA35CDDF916668A988)
-
设置文本样式。
通过添加文本样式设置按钮文本的展示样式。
```
Button('font style', { type: ButtonType.Normal })
  .fontSize(20)
  .fontColor(Color.Pink)
  .fontWeight(800)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b8/v3/sOr6rV69S7iYDRGritao6A/zh-cn_image_0000002543373572.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=B42F7276FB7BCAB6034A2EF60DC9023E9AA595A0571AD598AD8B94DCE444E0C1)
-
设置背景颜色。
添加backgroundColor属性设置按钮的背景颜色。
```
Button('background color').backgroundColor(0xF55A42)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0/v3/Gf6feEZYQGevj9TaoxakEA/zh-cn_image_0000002543213910.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=85092A2F0EABFAA2E1FB21D3F7549E30D393A7668A7412714D79DC41D113E8C5)
-
创建功能型按钮。
创建删除操作的按钮。
```
Button({ type: ButtonType.Circle, stateEffect: true }) {
  // 请将$r('app.media.ic_public_delete_filled3')替换为实际资源文件
  Image($r('app.media.ic_public_delete_filled')).width(30).height(30)
}.width(55).height(55).margin({ 'left': 20 }).backgroundColor(0xF55A42)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/oowtesK5Ti2QegmfKGc1WA/zh-cn_image_0000002573853823.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=85F4137A64FC4770996F131FFC7826832BC6DBFAECF81D20CF494BF7F232A94A)
#### 添加事件
Button组件通常用于触发某些操作，可以绑定onClick事件来响应点击操作后的自定义行为。
```
Button('Ok', { type: ButtonType.Normal, stateEffect: true })
  .onClick(()=>{
    hilog.info(DOMAIN, 'testTag', 'Button onClick');
  }).margin(10)
```
#### 场景示例
-
用于启动操作。
可以用按钮启动任何用户界面元素，按钮会根据用户的操作触发相应的事件。例如，在List容器里通过点击按钮进行页面跳转。
```
const DOMAIN = 0x0000;
// xxx.ets
@Entry
@Component
export struct ButtonCaseTouch {
  pathStack: NavPathStack = new NavPathStack();
  @Builder
  PageMap(name: string) {
    if (name === 'first_page') {
      pageOneTmp()
    } else if (name === 'second_page') {
      pageTwoTmp()
    } else if (name === 'third_page') {
      pageThreeTmp()
    }
  }
  build() {
    NavDestination() {
      Navigation(this.pathStack) {
        List({ space: 4 }) {
          ListItem() {
            Button('First').onClick(() => {
              this.pathStack.pushPath({ name: 'first_page' });
            })
              .width('100%')
          }
          ListItem() {
            Button('Second').onClick(() => {
              this.pathStack.pushPath({ name: 'second_page' });
            })
              .width('100%')
          }
          ListItem() {
            Button('Third').onClick(() => {
              this.pathStack.pushPath({ name: 'third_page' });
            })
              .width('100%')
          }
        }
        .listDirection(Axis.Vertical)
        .backgroundColor(0xDCDCDC).padding(20)
      }
      .mode(NavigationMode.Stack)
      .navDestination(this.PageMap)
    }
  }
}
// pageOne
@Component
export struct pageOneTmp {
  pathStack: NavPathStack = new NavPathStack();
  build() {
    NavDestination() {
      Column() {
        Text('first_page')
      }.width('100%').height('100%')
    }.title('pageOne')
    .onBackPressed(() => {
      const popDestinationInfo = this.pathStack.pop(); // 弹出路由栈栈顶元素
      // 请将$r('app.string.return_value')替换为实际资源文件，在本示例中该资源文件的value值为"返回值"
      hilog.info(DOMAIN, 'testTag', 'pop' + $r('app.string.return_value') + JSON.stringify(popDestinationInfo));
      return true;
    })
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    })
  }
}
// pageTwo
@Component
export struct pageTwoTmp {
  pathStack: NavPathStack = new NavPathStack();
  build() {
    NavDestination() {
      Column() {
        Text('second_page')
      }.width('100%').height('100%')
    }.title('pageTwo')
    .onBackPressed(() => {
      const popDestinationInfo = this.pathStack.pop(); // 弹出路由栈栈顶元素
      // 请将$r('app.string.return_value')替换为实际资源文件，在本示例中该资源文件的value值为"返回值"
      hilog.info(DOMAIN, 'testTag', 'pop' + $r('app.string.return_value') + JSON.stringify(popDestinationInfo));
      return true;
    })
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    })
  }
}
// pageThree
@Component
export struct pageThreeTmp {
  pathStack: NavPathStack = new NavPathStack();
  build() {
    NavDestination() {
      Column() {
        Text('third_page')
      }.width('100%').height('100%')
    }.title('pageThree')
    .onBackPressed(() => {
      const popDestinationInfo = this.pathStack.pop(); // 弹出路由栈栈顶元素
      /// 请将$r('app.string.return_value')替换为实际资源文件，在本示例中该资源文件的value值为"返回值"
      hilog.info(DOMAIN, 'testTag', 'pop' + $r('app.string.return_value') + JSON.stringify(popDestinationInfo));
      return true;
    })
    .onReady((context: NavDestinationContext) => {
      this.pathStack = context.pathStack;
    })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/gG_EcruQSHSJN8HJr4NDvw/zh-cn_image_0000002573973801.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=FA59069F85A2786CBBBC8502719EACF192076CDBE8376A9E61338C172902CE57)
-
用于提交表单。
在用户登录/注册页面，使用按钮进行登录或注册操作。
```
// xxx.ets
const DOMAIN = 0x0000;
@Entry
@Component
export struct ButtonCaseLogin {
  build() {
    NavDestination() {
      Column() {
        TextInput({ placeholder: 'input your username' }).margin({ top: 20 })
        TextInput({ placeholder: 'input your password' }).type(InputType.Password).margin({ top: 20 })
        Button('Register').width(300).margin({ top: 20 })
          .onClick(() => {
            // 需要执行的操作
          })
        // ···
      }.padding(20)
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c2/v3/aRuuC_ocQnmm4C4os8SOhA/zh-cn_image_0000002543373574.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=E9C57A8669CB920E7CBABC1A42E8C9974D5986B870DF93FBD5990E69DA7A37B2)
-
悬浮按钮。
在可以滑动的界面，滑动时按钮始终保持悬浮状态。
```
// xxx.ets
@Entry
@Component
export struct HoverButtonExample {
  private arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  build() {
    NavDestination() {
      Stack() {
        List({ space: 20, initialIndex: 0 }) {
          ForEach(this.arr, (item: number) => {
            ListItem() {
              Text('' + item)
                .width('100%')
                .height(100)
                .fontSize(16)
                .textAlign(TextAlign.Center)
                .borderRadius(10)
                .backgroundColor(0xFFFFFF)
            }
          }, (item: number) => item.toString())
        }.width('90%')
        Button() {
          // 请将$r('app.media.ic_public_add')替换为实际资源文件
          Image($r('app.media.ic_public_add'))
           .width(50)
           .height(50)
        }
        .width(60)
        .height(60)
        .position({ x: '80%', y: 600 })
        .shadow({ radius: 10 })
        .onClick(() => {
          // 需要执行的操作
        })
      }
      .width('100%')
      .height('100%')
      .backgroundColor(0xDCDCDC)
      .padding({ top: 5 })
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/3k9gEuPxQr-2EFCl-U9StQ/zh-cn_image_0000002543213912.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=9C236AEAA61D1351857CE07C4BAF5DFBFB5B7BB4B309AC9BCEE40568E0BF1557)