# marquee开发指导
---
# marquee开发指导
marquee为跑马灯组件，用于展示一段单行滚动的文字。具体用法请参考 [marquee](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-marquee) 。
#### 创建marquee组件
在pages/index目录下的hml文件中创建一个marquee组件。
```html
<!-- xxx.hml -->
<div class="container">
  <marquee style="width: 100%;height: 80px; color: #ffffff; background-color: #0820ef;padding-left: 200px;">It's a racing lamp.</marquee>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/dcsT_zuiRJy2QB0ur1I4eA/zh-cn_image_0000002573854071.png?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=E2569AA1B544B14EDA19D80C9985901F2A5CB13879F6E1DA644031FE71405AE5)
#### 设置属性和样式
marquee通过color和font-weight属性设置跑马灯中文本的颜色、字体粗细和边框样式。
```html
<!-- xxx.hml -->
<div class="container">
 <marquee class="custommarquee">It's a racing lamp.</marquee>
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
.custommarquee {
  width: 100%;
  height: 80px;
  padding: 10px;
  margin: 20px;
  border: 4px solid #6712f1;
  border-radius: 20px;
  font-size: 40px;
  color: #ffffff;  font-weight: bolder;
  font-family: serif;
  background-color: #1567f3;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f3/v3/HC-iw3opTgm_ORFfEh7wMA/zh-cn_image_0000002573974047.png?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=E59B16891F28A1D2F33171BBAEE6E1576B46A63BB3914F00D311A1A82D5D5D5F)
通过scrollamount、loop和direction属性实现跑马灯滚动时移动的最大长度、滚动次数和文字滚动方向。
```html
<!-- xxx.hml -->
<div class="tutorial-page">
  <div class="mymarquee">
    <marquee loop="{{loopval}}" scrollamount="{{scroll}}" direction="{{isleft}}" class="marqueetext" id="testmarquee" onclick="makestart">
      Life is a journey, not the destination.
    </marquee>
  </div>
  <div style="width: 600px;height: 150px;flex-direction: row;justify-content: space-around;">
    <button onclick="setleft"  value="left"></button>
    <button onclick="setright" value="right"></button>
  </div>
</div>
```
```css
/* xxx.css */
.tutorial-page {
  width: 750px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
.marqueetext {
  color: #ffffff;
  font-family: serif;
  font-size: 37px;
}
.mymarquee {
  margin-top: 20px;
  width:100%;
  height: 100px;
  margin-left: 50px;
  margin-right: 50px;
  border: 1px solid #6712f1;
  background-color: #1567f3;
  border-radius: 15px;
  align-items: center;
}
button{
  width: 200px;
  height: 80px;
  margin-top: 100px;
}
```
```
// xxx.js
export default {
  private: {
    loopval: -1,
    scroll: 10,
    isleft: "left",
  },
  onInit(){
  },
  setleft(e) {
    this.isleft = "left"
  },
  setright(e) {
    this.isleft = "right"
  },
  makestart(e) {
    this.$element('testmarquee').start()
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/47/v3/w3IUA6ZpQOOK689nJN3rAA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=1CDA5BC3F523ECAF07DB143E3AF079D0DA16AE1E383A277575BC90041B69A0B0)
当loop的值小于等于零时，跑马灯marquee将连续滚动。如果loop未指定，则默认为-1。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/24/v3/WWGb5co-SpOTjxpY-7aMcQ/zh-cn_image_0000002543373820.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=B7F36FE61C814DBF77D1221803B9B54CABDAA3B1198F8AA00BE848B6D7D391C0)
#### 场景示例
本场景可以控制跑马灯文字的滚动和暂停。
跑马灯的次数设置为1，在结束的时候触发finish事件使跑马灯的次数加1，字体颜色变为随机颜色，调用start方法使跑马灯再次开始滚动。
```html
<!-- xxx.hml -->
<div class="tutorial-page">
  <div class="mymarquee">
    <marquee  style="color: {{color1}}" loop="{{loopval}}" scrollamount="{{scroll}}" direction="{{isleft}}" class="marqueetext"
    id="testmarquee" onfinish="setfinish">
      Life is a journey, not the destination.
    </marquee>
  </div>
  <div style="width: 600px;height: 150px;flex-direction: row;justify-content: space-around;">
    <button onclick="makestart"  value="start"></button>
    <button onclick="makestop" value="stop"></button>
  </div>
</div>
```
```css
/* xxx.css */
.tutorial-page {
  width: 750px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.marqueetext {
  font-size: 37px;
}
.mymarquee {
  margin-top: 20px;
  width:100%;
  height: 100px;
  margin-left: 50px;
  margin-right: 50px;
  border: 1px solid #dc0f27;
  border-radius: 15px;
  align-items: center;
}
button{
  width: 200px;
  height: 80px;
  margin-top: 100px;
}
```
```
// xxx.js
export default {
  private: {
    loopval: 1,
    scroll: 8,
    color1: 'red'
  },
  onInit(){
  },
  setfinish(e) {
    this.loopval = this.loopval + 1,
    this.r = Math.floor(Math.random()*255),
    this.g = Math.floor(Math.random()*255),
    this.b = Math.floor(Math.random()*255),
    this.color1 = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)',
    this.$element('testmarquee').start(),
    this.loopval = this.loopval - 1
  },
  makestart(e) {
    this.$element('testmarquee').start()
  },
  makestop(e) {
    this.$element('testmarquee').stop()
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/Xs5ZV-FDRYuCqeegQuKD8A/zh-cn_image_0000002543214158.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=66B8D9808E854573DEEDEEFF59644A0DB06C5C7514A5DA589C7AD4D5C854D941)