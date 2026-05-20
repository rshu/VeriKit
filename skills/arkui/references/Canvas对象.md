# Canvas对象
---
# Canvas对象
Canvas组件提供画布，用于自定义绘制图形。具体用法请参考 [CanvasRenderingContext2D对象](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-canvas-canvasrenderingcontext2d) 。
#### 创建Canvas组件
在pages/index目录下的hml文件中创建一个Canvas组件。
```html
<!-- xxx.hml -->
<div class="container">
  <canvas></canvas>
</div>
```
```css
/* xxx.css */
.container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F1F3F5;
}
canvas {
    background-color: #00ff73;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/de/v3/nGnbNvzMQvOlpvFJi4S1Vw/zh-cn_image_0000002573974053.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=16A22E80BFA1667DEAFC580BF94A5521BEBCD485429D87F363FE3F17F08310B0)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3/v3/JrRoWp1pQkawhwHKBKGCxw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=D078B1BF66104DF33ECFDC268BD46533F506E18E208827F9B0E815D55D10638E)
-
Canvas组件默认背景色与父组件的背景色一致。
-
Canvas默认宽高为width: 300px，height: 150px。
#### 添加样式
Canvas组件设置宽（width）、高（height）、背景色（background-color）及边框样式（border）。
```html
<!-- xxx.hml -->
<div class="container">
  <canvas></canvas>
</div>
```
```css
/* xxx.css */
.container {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F1F3F5;
    width: 100%;
    height: 100%;
}
canvas {
    width: 500px;
    height: 500px;
    background-color: #fdfdfd;
    border: 5px solid red;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/74/v3/TYVQmjJ8QgiAa_yt7j_Azg/zh-cn_image_0000002543373826.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=0F76512DE75803E7A0E7D275A481F18947FDD6EA8574A722A4040F985E8DB1AF)
#### 添加事件
Canvas添加长按事件，长按后可获取Canvas组件的dataUrl值（toDataURL方法返回的图片信息），打印在下方文本区域内。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/sJKrOUd9ToK7_P_mr9NdhA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=4876F6A1F1EEDB6F0B6EB822E88AEEFDB7A4A4BEE176C650B411A77DCA885C8E)
promptAction相关接口参考 [弹窗](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction) 。
```html
<!-- xxx.hml -->
<div class="container">
    <canvas ref="canvas1" onlongpress="getUrl"></canvas>
    <text>dataURL</text>
    <text class="content">{{ dataURL }}</text>
</div>
```
```css
/* xxx.css */
.container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #F1F3F5;
}
canvas {
    width: 500px;
    height: 500px;
    background-color: #fdfdfd;
    border: 5px solid red;
    margin-bottom: 50px;
}
.content {
    border: 5px solid blue;
    padding: 10px;
    width: 90%;
    height: 400px;
    overflow: scroll;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
    data: {
        dataURL: null,
    },
    onShow() {
        let el = this.$refs.canvas1;
        let ctx = el.getContext("2d");
        ctx.strokeRect(100, 100, 300, 300);
    },
    getUrl() {
        let el = this.$refs.canvas1
        let dataUrl = el.toDataURL()
        this.dataURL = dataUrl;
        promptAction.showToast({ duration: 2000, message: "long press,get dataURL" })
    }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/f7zL9x1cSFKgp6qleauMpA/zh-cn_image_0000002543214164.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=0209020EAEA5F1472E8C72988986E68B904A20E34C3EFC2634B2E3D8FF4E1BB5)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/aa/v3/5_ovqMpcQTCuUhChv3zM4A/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=E8C513B5176657609FE155323627E1F307A719331463DDF50E9EC9394411644A)
画布不支持在onInit和onReady中进行创建。