# 设置overlay模式的侧边栏
---
# 设置overlay模式的侧边栏
#### 场景介绍
从6.0.0(20) Beta1版本开始，新增支持设置overlay模式的侧边栏。
[HdsSideBar](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ui-design-hdssidebar) 提供可以显示和隐藏的侧边栏容器，通过子组件定义侧边栏和内容区，第一个子组件表示侧边栏，第二个子组件表示内容区，通过设置 [sideBarContainerType](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-container-sidebarcontainer#sidebarcontainertype枚举说明) 的值为SideBarContainerType.Overlay，使得当前HdsSideBar为悬浮样式。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/af/v3/8ekjwsMSRG2TAZkdXG7bsQ/zh-cn_image_0000002543214370.png?HW-CC-KV=V1&HW-CC-Date=20260421T111024Z&HW-CC-Expire=86400&HW-CC-Sign=93EEFD30CDED4351A92B69A2A0067ED53356FE5BCD160BE183A0CDF837969A50)
#### 开发步骤
1.
导入相关模块。
```typescript
import { HdsSideBar } from '@kit.UIDesignKit';
```
2.
设置图片。
将图片资源，放到entry/src/main/resources/base/media下。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/x9IjNpZxRmSFl59jZrPj8g/zh-cn_image_0000002573854285.png?HW-CC-KV=V1&HW-CC-Date=20260421T111024Z&HW-CC-Expire=86400&HW-CC-Sign=B27F66B3C5F2A8BB6CF6B69955743B598168A30EEE83B4B53AB504B2A37C14E0)
3.
创建HdsSideBar侧边栏组件，设置展开模式为overlay。
```typescript
@Entry
@ComponentV2
struct Index {
  @Local isSideBarContainerMask: boolean = true;
  @Local blankHeight: number = 48;
  @Local isAutoHide: boolean = false;
  @Local isShowSidebar: boolean = true;
  @Local triggerValueReplace: number = 0;
  //左侧侧边栏区
  @Builder
  SideBarPanelBuilder() {
    Column() {
      Blank().height(this.blankHeight)
      Text('HDSSideBar Menu 1')
        .fontSize(14)
      Text('HDSSideBar Menu 2')
        .fontSize(14)
    }
    .width('100%')
    .height('100%')
  }
  //右侧内容区
  @Builder
  ContentPanelBuilder() {
    Column(){
      Blank().height(this.blankHeight)
      Image($r('app.media.view')) // view为自定义资源，开发者需替换本地资源
        .width('80%')
        .height('50%')
        .margin({ top: 8 })
        .padding({
          right: '16vp',
          left: '16vp',
          bottom: '16vp',
        })
        .borderRadius(8)
      Column() {
        Text('HDSSideBar content text1')
          .fontSize(14)
        Text('HDSSideBar content text2')
          .fontSize(14)
      }
      Button() {
        SymbolGlyph(this.isShowSidebar ? $r('sys.symbol.open_sidebar') : $r('sys.symbol.close_sidebar'))
          .fontWeight(FontWeight.Normal)
          .fontSize($r('sys.float.ohos_id_text_size_headline7'))
          .fontColor([$r('sys.color.ohos_id_color_titlebar_icon')])
          .hitTestBehavior(HitTestMode.None)
      }
      .id('side_bar_button')
      .backgroundColor($r('sys.color.ohos_id_color_button_normal'))
      .height(24)
      .width(24)
      .animation({ curve: Curve.Sharp, duration: 100 })
      .onClick(() => {
        this.isShowSidebar = !this.isShowSidebar;
      })
    }
  }
  @BuilderParam contentBuilder: () => void = this.ContentPanelBuilder
  @BuilderParam sideBarBuilder: () => void = this.SideBarPanelBuilder
  @Builder
  HDSSideBarBuilder() {
    HdsSideBar({
      sideBarPanelBuilder: (): void => {
        this.sideBarBuilder()
      },
      contentPanelBuilder: (): void => {
        this.contentBuilder()
      },
      autoHide: this.isAutoHide,
      contentAreaMask: this.isSideBarContainerMask,
      sideBarContainerType: SideBarContainerType.Overlay,
      isShowSideBar: this.isShowSidebar,
      $isShowSideBar: (isShowSidebar: boolean) => {
        this.isShowSidebar = !isShowSidebar
      },
    })
  }
  @Builder
  build() {
    Stack() {
      this.HDSSideBarBuilder()
    }
  }
}
```