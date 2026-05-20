# qrcode开发指导
---
# qrcode开发指导
生成并显示二维码，具体用法请参考 [qrcode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-qrcode) 。
#### 创建qrcode组件
在pages/index目录下的hml文件中创建一个qrcode组件。
```html
<!-- xxx.hml-->
<div class="container">
  <qrcode value="Hello"></qrcode>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/IKxjAF8oSwO3R647l3_bBQ/zh-cn_image_0000002573854073.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=2772D3BDF4A6118AF591D6DC3270404EE0F34282368EB21F253DE654C5CC71F6)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ef/v3/Qzp1malRTN-iUsnn2sBn7A/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=D776798EA10F5C6E2855D26B6A682383BA0A3857019B81BC6ABF6353579D1484)
qrcode组件在创建的时候value的值为必填项。
#### 设置组件类型
通过设置qrcode的type属性来选择二维码类型，如定义qrcode为矩形二维码、圆形二维码。
```html
<!-- xxx.hml-->
<div class="container">
  <select onchange="settype">
    <option for="{{bcol_list}}" value="{{$item}}">{{$item}}</option>
  </select>
  <qrcode value="Hello" type="{{qr_type}}"></qrcode>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
select{
  margin-top: 50px;
  margin-bottom: 50px;
}
```
```
// index.js
export default {
  data: {
    qr_type: 'rect',
    bcol_list: ['rect','circle']
  },
  settype(e) {
    this.qr_type = e.newValue
  },
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7d/v3/FrxxEPjeT2m2Ewj21tCwPg/zh-cn_image_0000002573974049.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=09670D183E1343B0AE58EA3ECCC5A5AA0D70A6F5225A60FF5680B16AC8A83E6C)
#### 设置样式
通过color和background-color样式为二维码设置显示颜色和背景颜色。
```html
<!-- xxx.hml-->
<div class="container">
  <qrcode value="Hello" type="rect"></qrcode>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
qrcode{
  width: 300px;
  height: 300px;
 color: blue;  background-color: #ffffff;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a2/v3/79e8LIGPRz65l-qnPmxKew/zh-cn_image_0000002543373822.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=FA2C16C41ED647EDDA2D9F616AE265DD711644A1F1A30426511B7459F154E9F3)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/91/v3/0Tm3lyqiRsmD6zRZqTKH9w/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=8935D3093C6326CBB239BC436B10DD557FD13C0D0B06E09DDF045FAF2377604B)
-
width和height不一致时，取二者较小值作为二维码的边长，且最终生成的二维码居中显示。
-
width和height只设置一个时，取设置的值作为二维码的边长。都不设置时，使用200px作为默认边长。
#### 场景示例
在本场景中将二维码与输入框绑定，通过改变输入框的内容改变二维码。
```html
<!-- xxx.hml-->
<div class="container">
  <input style="margin-bottom: 100px;" onchange="change"></input>
  <qrcode value="{{textVal}}"></qrcode>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
qrcode{
  width: 400px;
  height: 400px;
}
```
```
// index.js
export default{
  data: {
    textVal: ''
  },
  change(e){
    this.textVal = e.value
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/gYk8oMlIQvKFs1dzrZv1-Q/zh-cn_image_0000002543214160.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=755FEA7D3A3B16C311DC2B51F5AB0B5980430340875D4F374784F2DC65D9B3E7)