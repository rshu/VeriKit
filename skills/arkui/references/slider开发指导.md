# slider开发指导
---
# slider开发指导
slider为滑动条组件，用来快速调节音量、亮度等。具体用法请参考 [slider](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-slider) 。
#### 创建slider组件
在pages/index目录下的hml文件中创建一个slider组件。
```html
<!-- xxx.hml -->
<div class="container">
  <slider></slider>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  background-color: #F1F3F5;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/yPA0P3xHRgmSOienKtOQtg/zh-cn_image_0000002573974037.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=3CEC7FC474DB2C3B780624AC14601C24FD1BC2B349B5DCE8D8D59161B5694C1E)
#### 设置样式和属性
slider组件通过color、selected-color、block-color样式分别为滑动条设置背景颜色、已选择颜色和滑块颜色。
```html
<!-- xxx.hml -->
<div class="container">
  <slider class= "sli"></slider>
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
.sli{
  color: #fcfcfc;
  scrollbar-color: aqua;
  background-color: #b7e3f3;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/99/v3/80NCeJ_WSdSrafnRSgmPrQ/zh-cn_image_0000002543373810.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=B0C810F7F89D5052D35733DBA726758A838AAF3BBA58FD0491C4143BEA5271F4)
通过添加min、max、value、step、mode属性分别为滑动条设置最小值、最大值、初始值、滑动步长和滑动条样式。
```html
<!-- xxx.hml -->
<div class="container">
  <slider min="0" max="100" value="1" step="2" mode="inset" showtips="true"></slider>
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
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e9/v3/yj4NYOzTSaWVc9mlG0D3mA/zh-cn_image_0000002543214148.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=A9F55B2172BC5D7842A860229D06E49078629069B7A26866E7FA38CFEC87DDBB)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1/v3/6GCpxyufTj2_JqUoAi0nZA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=AC5EF63C76FC0AA753E432930240ED8FCE3928B50FE17A2E8DF4100772F244C7)
mode属性为滑动条样式，可选值为：
-
outset：滑块在滑杆上。
-
inset：滑块在滑杆内。
#### 绑定事件
向slider组件添加change事件，添加时需要传入ChangeEvent参数。
```html
<!-- xxx.hml -->
<div class="container">
  <text>slider start value is {{startValue}}</text>
  <text>slider current value is {{currentValue}}</text>
  <text>slider end value is {{endValue}}</text>
  <slider min="0" max="100" value="{{value}}" onchange="setValue"></slider>
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
```
```
// xxx.js
export default {
  data: {
    value: 0,
    startValue: 0,
    currentValue: 0,
    endValue: 0,
  },
  setValue(e) {
    if (e.mode === "start") {
      this.value = e.value;
      this.startValue = e.value;
    } else if (e.mode === "move") {
      this.value = e.value;
      this.currentValue = e.value;
    } else if (e.mode === "end") {
      this.value = e.value;
      this.endValue = e.value;
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/53/v3/M_N4IB88QJuGYFzRBu9Edw/zh-cn_image_0000002573854063.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=2519178512EB0991A7B26D3DCFE9233CBB0FAC005787D819B9EFE6CF040AA1C3)
#### 场景示例
开发者可以通过调整滑动条的值来改变图片大小，并且动态打印当前图片的宽和高。
```html
<!-- xxx.hml -->
<div class="container">
  <image src="common/landscape3.jpg" style=" width: {{WidthVal}}px;height:{{HeightVal}}px;margin-top: -150px;"></image>
  <div class="txt">
    <slider min="0" max="100" value="{{value}}" onchange="setValue"></slider>
    <text>The width of this picture is {{WidthVal}}</text>
    <text>The height of this picture is {{HeightVal}}</text>
  </div>
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
.text{
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 65%;
}
.text{
  margin-top: 30px;
}
```
```
// xxx.js
export default{
  data: {
    value: 0,
    WidthVal: 200,
    HeightVal: 200
  },
  setValue(e) {
    this.WidthVal = 200 + e.value;
    this.HeightVal = 200 + e.value
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e8/v3/kHjyFQA8RoKUIFoxkOuK4g/zh-cn_image_0000002573974039.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=4531C7DDD01D3850A36BF626A8AB45BE20895BF63F6C393B8BF70C779FBCAEB3)