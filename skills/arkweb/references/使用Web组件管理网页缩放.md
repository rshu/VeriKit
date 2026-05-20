# 使用Web组件管理网页缩放
---
# 使用Web组件管理网页缩放
Web组件支持手势缩放、鼠标滚轮、键盘缩放，以方便用户调整到舒适的显示大小。并对应用提供监听、控制页面缩放比例的功能，以便应用实现个性化的视觉效果。
#### 启用/禁用网页缩放
#### 启用/禁用网页手势缩放
通过属性 [zoomAccess](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#zoomaccess) 控制网页缩放功能，当设置为false时，网页不允许手势缩放行为。
当html网页设置<meta name="viewport" id="viewport" content="user-scalable=no">时，网页不允许手势缩放。
仅当zoomAccess和viewport标签都设置为允许缩放时，才允许手势缩放。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/cQR4FLXhSuGbx3tyUbYGpA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110946Z&HW-CC-Expire=86400&HW-CC-Sign=5A3EBFE863667A44DE9A3277D86987753E776DED5808B39555731107B3B3C059)
在PC/2in1设备上，viewport标签不生效，仅能通过设置zoomAccess为false来禁用手势缩放。
以上方法仅能控制缩放功能的开关，但如果网页在viewport标签中设置了minimum-scale和maximum-scale，那么缩放的范围也会受到这两个属性的限制，当最大、最小值相等时，网页也是不能缩放的。
另外，网页的内容宽度也会限制缩小的比例。
```
import { webview } from '@kit.ArkWeb';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  build() {
    Column() {
      Web({ src: 'www.example.com', controller: this.controller })
        .zoomAccess(false)
    }
  }
}
```
#### 启用/禁用手势强制缩放
通过属性 [forceEnableZoom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#forceenablezoom21) 控制网页强制缩放功能，当设置为true时，手势缩放行为不受minimum-scale和maximum-scale以及user-scalable=no的限制。
#### 启用/禁用网页键盘鼠标缩放
ArkWeb默认支持通过Ctrl+按键'-'/'+' 或者 Ctrl+鼠标滚轮进行缩放。应用可以通过拦截键盘事件来阻止按键缩放。
通过拦截键盘事件来阻止按键缩放：
```
import { webview } from '@kit.ArkWeb';
import { KeyCode } from '@kit.InputKit';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  build() {
    Column() {
      Web({ src: 'www.example.com', controller: this.controller })
        .zoomAccess(true)
        .onKeyPreIme((event) => {
          if (event.type === KeyType.Down &&
          event.getModifierKeyState &&
          event.getModifierKeyState(['Ctrl']) &&
            (event.keyCode === KeyCode.KEYCODE_MINUS || event.keyCode === KeyCode.KEYCODE_EQUALS ||
              event.keyCode === KeyCode.KEYCODE_NUMPAD_SUBTRACT || event.keyCode === KeyCode.KEYCODE_NUMPAD_ADD)) {
            return true;
          }
          return false;
        })
    }
  }
}
```
或者通过属性 [zoomControlAccess](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#zoomcontrolaccess22) 设置是否允许通过组合按键（Ctrl+'-/+'或Ctrl+鼠标滚轮/触摸板）进行缩放。
```
// xxx.ets
import { webview } from '@kit.ArkWeb';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  build() {
    Column() {
      Web({ src: 'www.example.com', controller: this.controller })
        .zoomControlAccess(false)
    }
  }
}
```
#### 监听页面缩放比例变化
应用可以通过 [onScaleChange](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-events#onscalechange9) 接口监听页面缩放比例的变化。该接口事件对应手势事件(双指缩放)，event.newScale对应网页属性visualViewport.scale。
```
import { webview } from '@kit.ArkWeb';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  build() {
    Column() {
      Web({ src: 'www.example.com', controller: this.controller })
        .onScaleChange((event) => {
          console.info('onScaleChange changed from ' + event.oldScale + ' to ' + event.newScale);
        })
    }
  }
}
```
#### 控制网页的缩放比例
应用可以通过设置 [initialScale](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-basic-components-web-attributes#initialscale9) 属性设置页面初始缩放比例。
应用可以通过 [zoom](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#zoom) 、 [zoomIn](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#zoomin) 、 [zoomOut](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-webview-webviewcontroller#zoomout) 接口控制页面缩放。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2f/v3/KXe30EkSTI-Jm3rFafYhpg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110946Z&HW-CC-Expire=86400&HW-CC-Sign=BEDF8F4CDA3A288DC5EE64BF929139A1CE7FCEBC03281D1C57A19799E23A9C2F)
使用以上接口控制页面缩放时，必须设置属性zoomAccess为true。zoomAccess为false时，zoom类接口会抛出异常17100004。
#### 以固定比例缩放页面
zoomIn将当前网页进行放大，比例为25%；zoomOut将当前网页进行缩小，比例为20%。
```
import { webview } from '@kit.ArkWeb';
import { BusinessError } from '@kit.BasicServicesKit';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  build() {
    Column() {
      Button('zoomIn')
        .onClick(() => {
          try {
            this.controller.zoomIn();
          } catch (error) {
            console.error(`ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
          }
        })
      Button('zoomOut')
        .onClick(() => {
          try {
            this.controller.zoomOut();
          } catch (error) {
            console.error(`ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
          }
        })
      Web({ src: 'www.example.com', controller: this.controller })
        .zoomAccess(true)
    }
  }
}
```
#### 根据输入值控制页面缩放比例:
zoom基于当前网页比例进行缩放，入参要求大于0，当入参为1时为默认加载网页的缩放比例，入参小于1为缩小，入参大于1为放大。
```
import { webview } from '@kit.ArkWeb';
import { BusinessError } from '@kit.BasicServicesKit';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  @State factor: number = 1;
  build() {
    Column() {
      TextInput()
        .type(InputType.NUMBER_DECIMAL)
        .onChange((value)=>{
          this.factor = Number(value);
        })
      Button('zoom')
        .onClick(() => {
          try {
            this.controller.zoom(this.factor);
          } catch (error) {
            console.error(`ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
          }
        })
      Web({ src: 'www.example.com', controller: this.controller })
        .zoomAccess(true)
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/20/v3/R-HYEmYpTaSgXS10V6DGJA/zh-cn_image_0000002573974143.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110946Z&HW-CC-Expire=86400&HW-CC-Sign=D66D191654795B80B6A4C9C327D4F4640FA359697AF02EB5DF1ED96E73B9B9D3)
#### 缩放页面到目标比例:
通过onScaleChange接口，应用可以得知当前网页的缩放比例，配合zoom接口即可实现将页面缩放至指定比例的功能。根据当前页面缩放比例pageFactor和目标比例targetFactor计算zoom入参的公式为：
```
factor = 100 * targetFactor / pageFactor
```
```
import { webview } from '@kit.ArkWeb';
import { BusinessError } from '@kit.BasicServicesKit';
@Entry
@Component
struct WebComponent {
  controller: webview.WebviewController = new webview.WebviewController();
  @State targetFactor: number = 1;
  // This represents the page zoom level
  @State pageFactor: number = 100;
  // Represents the integer 100
  intNumber: number = 100;
  build() {
    Column() {
      TextInput()
        .type(InputType.NUMBER_DECIMAL)
        .onChange((value)=>{
          this.targetFactor = Number(value);
        })
      Button('zoom')
        .onClick(() => {
          try {
            let factor = this.targetFactor * this.intNumber / this.pageFactor;
            this.controller.zoom(factor);
          } catch (error) {
            console.error(`ErrorCode: ${(error as BusinessError).code},  Message: ${(error as BusinessError).message}`);
          }
        })
      Web({ src: 'www.example.com', controller: this.controller })
        .zoomAccess(true)
        .onScaleChange((event) => {
          console.error('onScaleChange changed from ' + event.oldScale + ' to ' + event.newScale);
          this.pageFactor = event.newScale;
        })
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/45/v3/2J1LwmI5QWG_xwcKatiMmA/zh-cn_image_0000002543373916.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110946Z&HW-CC-Expire=86400&HW-CC-Sign=6385C8472E187FE965087EC7D40AD7A0F7A3A8668F8CE62DB1327635621A5392)