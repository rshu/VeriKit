# 设置浮层（OverlayManager）
---
# 设置浮层（OverlayManager）
浮层（OverlayManager）用于在页面（Page）之上展示自定义的UI内容，位于Dialog、Popup、Menu、BindSheet、BindContentCover和Toast等组件之下，展示范围为当前窗口的安全区内，适用于常驻悬浮等场景。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bd/v3/uwUpDzFCQvquhM0VzLauDw/zh-cn_image_0000002573853871.png?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=F4399E2329634F20986281D01CD4A92D127BD6C6A0D64E69B7355A0750879778)
可以通过使用 [UIContext](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext) 中的 [getOverlayManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-uicontext#getoverlaymanager12) 方法获取当前UI上下文关联的 [OverlayManager](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager) 对象，再通过该对象调用对应方法。
#### 规格约束
- OverlayManager上节点的层级在Page页面层级之上，在Dialog、Popup、Menu、BindSheet、BindContentCover和Toast等组件之下。
- OverlayManager添加的节点显示和消失时没有默认动画。
- OverlayManager上节点安全区域内外的绘制方式与Page一致，键盘避让方式与Page一致。
- 推荐使用AppStorage存储与OverlayManager相关的属性，以避免页面切换时属性值变化导致业务错误。
- 当使用API version 19以下版本时，OverlayManager不支持侧滑（左滑/右滑）关闭，需在[onBackPress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-custom-component-lifecycle#onbackpress)中添加OverlayManager关闭的逻辑。API 19及以上版本可通过配置[OverlayManagerOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-i#overlaymanageroptions15)中的enableBackPressedEvent属性设置OverlayManager是否响应侧滑手势。
- OverlayManager中的事件机制优先被[WrappedBuilder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-wrapbuilder)装饰的组件接收。若需实现浮层底部接收事件，可通过设置[hitTestBehavior](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-hit-test-behavior#hittestbehavior)为HitTestMode.Transparent将事件传递至底层。
#### 设置浮层
在OverlayManager上 [新增指定节点（addComponentContent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#addcomponentcontent12) 、 [删除指定节点（removeComponentContent）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#removecomponentcontent12) 、 [显示所有节点（showAllComponentContents）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#showallcomponentcontents12) 和 [隐藏所有节点（hideAllComponentContents）](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#hideallcomponentcontents12) 。
```
import { ComponentContent, OverlayManager } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
const TAG: string = '[Sample_dialogproject]';
const DOMAIN: number = 0xFF00;
class Params {
  public text: string = '';
  public offset: Position;
  constructor(text: string, offset: Position) {
    this.text = text;
    this.offset = offset;
  }
}
@Builder
function builderText(params: Params) {
  Column() {
    Text(params.text)
      .fontSize(30)
      .fontWeight(FontWeight.Bold)
  }.offset(params.offset)
}
@Entry
@Component
export struct OverlayManagerComponent {
  @State message: string = 'ComponentContent';
  private uiContext: UIContext = this.getUIContext();
  private overlayNode: OverlayManager = this.uiContext.getOverlayManager();
  @StorageLink('contentArray') contentArray: ComponentContent<Params>[] = [];
  @StorageLink('componentContentIndex') componentContentIndex: number = 0;
  @StorageLink('arrayIndex') arrayIndex: number = 0;
  @StorageLink('componentOffset') componentOffset: Position = { x: 0, y: 30 };
  build() {
    // ...
      Column({ space: 10 }) {
        Button('Increment componentContentIndex:' + this.componentContentIndex)
          .onClick(() => {
            ++this.componentContentIndex;
          })
        Button('Decrement componentContentIndex:' + this.componentContentIndex)
          .onClick(() => {
            --this.componentContentIndex;
          })
        Button('Add ComponentContent:' + this.contentArray.length)
          .onClick(() => {
            let componentContent = new ComponentContent(
              this.uiContext, wrapBuilder<[Params]>(builderText),
              new Params(this.message + (this.contentArray.length), this.componentOffset)
            )
            this.contentArray.push(componentContent);
            this.overlayNode.addComponentContent(componentContent, this.componentContentIndex);
          })
        Button('Increment arrayIndex:' + this.arrayIndex)
          .onClick(() => {
            ++this.arrayIndex;
          })
        Button('Decrement arrayIndex:' + this.arrayIndex)
          .onClick(() => {
            --this.arrayIndex;
          })
        Button('Delete ComponentContent:' + this.arrayIndex)
          .onClick(() => {
            if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
              let componentContent = this.contentArray.splice(this.arrayIndex, 1);
              this.overlayNode.removeComponentContent(componentContent.pop());
            } else {
              hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
            }
          })
        Button('Show ComponentContent:' + this.arrayIndex)
          .onClick(() => {
            if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
              let componentContent = this.contentArray[this.arrayIndex];
              this.overlayNode.showComponentContent(componentContent);
            } else {
              hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
            }
          })
        Button('Hide ComponentContent:' + this.arrayIndex)
          .onClick(() => {
            if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
              let componentContent = this.contentArray[this.arrayIndex];
              this.overlayNode.hideComponentContent(componentContent);
            } else {
              hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
            }
          })
        Button('Show All ComponentContent')
          .onClick(() => {
            this.overlayNode.showAllComponentContents();
          })
        Button('Hide All ComponentContent')
          .onClick(() => {
            this.overlayNode.hideAllComponentContents();
          })
        Button('Go')
          .onClick(() => {
            this.getUIContext().getRouter().pushUrl({
              url: 'pages/Second'
            })
          })
      }
      .width('100%')
      .height('100%')
      // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1/v3/4WMu_c_3Tj6hyWvo5_33Rg/zh-cn_image_0000002573973849.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=FF9E53C1A0B4C089B27E6F49FFD1B52AF43B894E9A263195AC10625F82D706BD)
显示一个始终在屏幕左侧的悬浮球，点击可以弹出alertDialog弹窗。
```
import { ComponentContent, OverlayManager } from '@kit.ArkUI';
class Params {
  public context: UIContext;
  public offset: Position;
  constructor(context: UIContext, offset: Position) {
    this.context = context;
    this.offset = offset;
  }
}
@Builder
function builderOverlay(params: Params) {
  Column() {
    Stack(){
    }.width(50).height(50).backgroundColor(Color.Yellow).position(params.offset).borderRadius(50)
    .onClick(() => {
      params.context.showAlertDialog(
        {
          title: 'title',
          message: 'Text',
          autoCancel: true,
          alignment: DialogAlignment.Center,
          gridCount: 3,
          confirm: {
            value: 'Button',
            action: () => {}
          },
          cancel: () => {}
        }
      )
    })
  }.focusable(false).width('100%').height('100%').hitTestBehavior(HitTestMode.Transparent)
}
@Entry
@Component
export struct OverlayManagerAlertDialog {
  private uiContext: UIContext = this.getUIContext();
  private overlayNode: OverlayManager = this.uiContext.getOverlayManager();
  private overlayContent:ComponentContent<Params>[] = [];
  controller: TextInputController = new TextInputController();
  aboutToAppear(): void {
    let uiContext = this.getUIContext();
    let componentContent = new ComponentContent(
      this.uiContext, wrapBuilder<[Params]>(builderOverlay),
      new Params(uiContext, {x:0, y: 100})
    );
    this.overlayNode.addComponentContent(componentContent, 0);
    this.overlayContent.push(componentContent);
  }
  aboutToDisappear(): void {
    let componentContent = this.overlayContent.pop();
    this.overlayNode.removeComponentContent(componentContent);
  }
  build() {
    // ...
      Column() {
      }
      .width('100%')
      .height('100%')
    // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/GIZn_csdS2SfCzATAyW3lw/zh-cn_image_0000002543373622.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=698B71B1EAB9FC40189A5394CD8215FD818FF4066C606623AC5DFAEFF0F94E1B)
从API version 18开始，可以通过调用UIContext中getOverlayManager方法获取OverlayManager对象，并利用该对象在指定层级上新增指定节点（ [addComponentContentWithOrder](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-uicontext-overlaymanager#addcomponentcontentwithorder18) ），层次高的浮层会覆盖在层级低的浮层之上。
```
import { ComponentContent, LevelOrder, OverlayManager } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
const TAG: string = '[Sample_dialogproject]';
const DOMAIN: number = 0xFF00;
class Params {
  public text: string = '';
  public offset: Position;
  constructor(text: string, offset: Position) {
    this.text = text;
    this.offset = offset;
  }
}
@Builder
function builderTopText(params: Params) {
  Column() {
    Stack() {
      Text(params.text)
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
    }
    .width(300)
    .height(200)
    .padding(5)
    .backgroundColor('#F7F7F7')
    .alignContent(Alignment.Top)
  }.offset(params.offset)
}
@Builder
function builderNormalText(params: Params) {
  Column() {
    Stack() {
      Text(params.text)
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
    }
    .width(300)
    .height(400)
    .padding(5)
    .backgroundColor('#D5D5D5')
    .alignContent(Alignment.Top)
  }.offset(params.offset)
}
@Entry
@Component
export struct OverlayManagerWithOrder {
  private ctx: UIContext = this.getUIContext();
  private overlayManager: OverlayManager = this.ctx.getOverlayManager();
  @StorageLink('contentArray') contentArray: ComponentContent<Params>[] = [];
  @StorageLink('componentContentIndex') componentContentIndex: number = 0;
  @StorageLink('arrayIndex') arrayIndex: number = 0;
  @StorageLink('componentOffset') componentOffset: Position = { x: 0, y: 80 };
  build() {
    // ...
      Row() {
        Column({ space: 5 }) {
          Button('Open Top-Level Dialog Box')
            .onClick(() => {
              let componentContent = new ComponentContent(
                this.ctx, wrapBuilder<[Params]>(builderTopText),
                new Params('I am a top-level dialog box', this.componentOffset)
              );
              this.contentArray.push(componentContent);
              this.overlayManager.addComponentContentWithOrder(componentContent, LevelOrder.clamp(100000));
            })
          Button('Open Normal Dialog Box')
            .onClick(() => {
              let componentContent = new ComponentContent(
                this.ctx, wrapBuilder<[Params]>(builderNormalText),
                new Params('I am a normal dialog box', this.componentOffset)
              );
              this.contentArray.push(componentContent);
              this.overlayManager.addComponentContentWithOrder(componentContent, LevelOrder.clamp(0));
            })
          Button('Remove Dialog Box').onClick(() => {
            if (this.arrayIndex >= 0 && this.arrayIndex < this.contentArray.length) {
              let componentContent = this.contentArray.splice(this.arrayIndex, 1);
              this.overlayManager.removeComponentContent(componentContent.pop());
            } else {
              hilog.info(DOMAIN, TAG, '%{public}s', 'arrayIndex error');
            }
          })
        }.width('100%')
      }
      // ...
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/64/v3/0GP6JTknQ36s9W8NL4g-Ng/zh-cn_image_0000002543213960.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=36254077AB769995E1A40D630D89DED0EB66FCA028FB149B3537B2B49155869D)