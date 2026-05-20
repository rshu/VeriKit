# image开发指导
---
# image开发指导
image是图片组件，用来渲染展示图片。具体用法请参考 [image](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-image) 组件。
#### 创建image组件
在pages/index目录下的hml文件中创建一个image组件。
```html
<!-- index.hml -->
<div class="container">
  <image style="height: 30%;" src="common/images/bg-tv.jpg"> </image>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/VSSMujosTqmp5LaLByT-TA/zh-cn_image_0000002573854055.png?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=24DFBC83F93D91596105879C572D2B517DDCC23D0BD135DB7FA9F5B4F1E6FFA9)
#### 设置image样式
通过设置width、height和object-fit属性定义图片的宽、高和缩放样式。
```html
<!-- index.hml -->
<div class="container">
  <image src="common/images/bg-tv.jpg"> </image>
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
  background-color:#F1F3F5;
}
image{
  width: 80%;
  height: 500px;
  border: 5px solid saddlebrown;
  border-radius: 20px;
  object-fit: contain;
  match-text-direction:true;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/xXY1NtbzQQWdHwDE_Xcrkg/zh-cn_image_0000002573974031.png?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=6A46825C87FCF4A4FE4A16903D0F07B6A3B1A421967E4DA721B16E9738CE6347)
#### 加载图片
图片成功加载时触发complete事件，返回加载的图源尺寸。加载失败则触发error事件，打印图片加载失败。
```html
<!-- index.hml -->
<div class="container" >
  <div>
    <image src="common/images/bg-tv.jpg" oncomplete="imageComplete(1)" onerror="imageError(1)"> </image>
  </div>
  <div>
    <image src="common/images/bg-tv1.jpg" oncomplete="imageComplete(2)" onerror="imageError(2)"> </image>
  </div>
</div>
```
```css
/* xxx.css */
.container{
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  background-color: #F1F3F5;
}
.container div{
  margin-left: 10%;
  width: 80%;
  height: 300px;
  margin-bottom: 40px;
}
```
```
// index.js
import promptAction from '@ohos.promptAction';
export default {
  imageComplete(i,e){
    promptAction.showToast({
      message: "image "+i+"'s width"+ e.width+"----image "+i+"'s height"+e.height,
      duration: 3000,
    })
  },
  imageError(i,e){
    setTimeout(()=>{
      promptAction.showToast({
        message: "Failed to load image "+i+".",
        duration: 3000,
      })
    },3000)
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/KcXHwBYNRLuLCjocf5iLAg/zh-cn_image_0000002543373804.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=51C038A29D1933D9222FA8A66F2826F1FC8890AD2B24FF8BB24EFB268AE51061)
#### 场景示例
在本场景中，开发者长按图片后将慢慢隐藏图片，当完全隐藏后再重新显示原始图片。定时器setInterval每隔一段时间改变图片透明度,实现慢慢隐藏的效果，当透明度为0时清除定时器，设置透明度为1。
```html
<!-- index.hml -->
<div class="page-container">
  <div class="content">
    <div class="image-container">
      <image class="testimage" src="{{testuri}}" style="opacity:{{imageopacity}};" onlongpress="changeopacity"> </image>
    </div>
    <div class="text-container">
      <text style="font-size: 37px;font-weight:bold;color:orange;text-align: center;width: 100%;">Touch and hold the image</text>
    </div>
  </div>
</div>
```
```css
/* xxx.css */
.page-container {
  width: 100%;
  height: 100%;
  flex-direction:column;
  align-self: center;
  justify-content: center;
  background-color:#F1F3F5;
  background-color: #F1F3F5;
}
.content{
  flex-direction:column;
}
.image-container {
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
}
.text-container {
  margin-top:50px;
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
}
.testimage {
  width: 100%;  height: 400px;
  object-fit: scale-down;
  border-radius: 20px;
}
```
```
// index.js
import promptAction from '@ohos.promptAction';
export default {
  data: {
    testuri: 'common/images/bg-tv.jpg',
    imageopacity:1,
    timer: null
  },
  changeopacity: function () {
    promptAction.showToast({
      message: 'Touch and hold the image.'
    })
    var opval = this.imageopacity * 20
    clearInterval(this.timer);
    this.timer = setInterval(()=>{
      opval--;
      this.imageopacity = opval / 20
      if (opval===0) {
        clearInterval(this.timer)
        this.imageopacity = 1
      }
    },100);
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/da/v3/ukP0iQ02SCy2zvgKhJrf6Q/zh-cn_image_0000002543214142.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=CB01AB6EDFFEA5B8F040910FF9126DFB972AFC598B2E4393775920ED349094F0)