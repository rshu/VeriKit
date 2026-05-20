# text开发指导
---
# text开发指导
text是文本组件，用于呈现一段文本信息。具体用法请参考 [text](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-text) 的API文档。
#### 创建text组件
在pages/index目录下的hml文件中创建一个text组件。
```html
<!-- xxx.hml -->
<div class="container" style="text-align: center;justify-content: center; align-items: center;">
  <text>Hello World</text>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/ER7b6hwoRQSrVGBtc1Av0A/zh-cn_image_0000002573854045.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=254C95EAB5292481A351AFA1ACF7436FBCE13AE8B37CD1A69B9B6409B1E3491D)
#### 设置text组件样式和属性
-
添加文本样式
设置color、font-size、allow-scale、word-spacing、text-align属性分别为文本添加颜色、大小、缩放、文本之间的间距和文本在水平方向的对齐方式。
```html
<!-- xxx.hml -->
<div class="container" style="background-color:#F1F3F5;flex-direction: column;justify-content: center; align-items: center;">   
  <text style="color: blueviolet; font-size: 40px; allow-scale:true"> 
    This is a passage
  </text>
  <text style="color: blueviolet; font-size: 40px; margin-top: 20px; allow-scale:true;word-spacing: 20px;text-align: center">
    This is a passage
  </text>
</div>
```
```css
/* xxx.css */
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/1TGVCrfJScGV_PuyHxTxAw/zh-cn_image_0000002573974021.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=5B1B82B81FFFD9B41206E38C0E62A595A0687BD859FCFAA7AC0BAEDBBC713FC1)
-
添加划线
设置text-decoration和text-decoration-color属性为文本添加划线和划线颜色，text-decoration枚举值请参考 text自有样式。
```html
<!-- xxx.hml -->
<div class="container" style="background-color:#F1F3F5;">
  <text style="text-decoration:underline">
    This is a passage
  </text>
  <text style="text-decoration:line-through;text-decoration-color: red">
    This is a passage
   </text>
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
}
text{
  font-size: 50px;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/tIoukrOSToG2zDWC6gFyDQ/zh-cn_image_0000002543373794.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=B7453F3C1F0A6707D68C412D5AA0CD69B8703A3DB328A30647DA2650D7D80F1A)
-
隐藏文本内容
当文本内容过多而显示不全时，添加text-overflow属性将隐藏内容以省略号的形式展现。
```html
<!-- xxx.hml -->
<div class="container">
  <text class="text">
    This is a passage
  </text>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #F1F3F5;
  justify-content: center;
}
.text{
  width: 200px;
  max-lines: 1;
  text-overflow:ellipsis;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1e/v3/p25pgMG0RrOnCKws4W1Smw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=C30CD09B4C2B4C4BCD06C5C2F694148346EA733A98C3B270197582868AD2CFC3)
- text-overflow样式需配合max-lines样式使用，在设置了最大行数的情况下才会生效。
- max-lines属性设置文本最多可以展示的行数。
​ ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7a/v3/_codTi1XQt-LGHyUTP5-Ug/zh-cn_image_0000002543214132.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=E9A9215B72EEE20C84C9CF9062B36CCADEB95FF359E3CC111B968D57E8D35647)
-
text组件支持 [span](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-span) 子组件
```html
<!-- xxx.hml -->
<div class="container" style="justify-content: center; align-items: center;flex-direction: column;background-color: #F1F3F5;  width: 100%;height: 100%;">
  <text style="font-size: 45px;">
    This is a passage
  </text>
  <text style="font-size: 45px;">
    <span style="color: aqua;">This </span><span style="color: #F1F3F5;">      1
    </span>   
    <span style="color: blue;"> is a </span>    <span style="color: #F1F3F5;">      1    </span>    
    <span style="color: red;">  passage </span>
  </text>
</div>
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/49/v3/8yk-DZc3T4ugQcEeNt03Tg/zh-cn_image_0000002573854047.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=CBCD65960F09D84E658C3D8D6B0C6F4F2C84E19E6E041DA261B3BDD7A1C41A22)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/34/v3/56FAk0DGScWqZtSddYO1Cg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=6052A849FEB250B73A7B708F55E3AAF55DB7094F67CAE7A7604F4891B9A4B72E)
-
当使用span子组件组成文本段落时，如果span属性样式异常（例如：font-weight设置为1000），将导致文本段落显示异常。
-
在使用span子组件时，注意text组件内不能存在文本内容，如果在text组件同时包含文本内容和span子组件，则仅会显示子组件span中的内容。
#### 场景示例
text组件通过数据绑定展示文本内容，span组件通过设置show属性来实现文本内容的隐藏和显示。
```html
<!-- xxx.hml -->
<div class="container">
  <div style="align-items: center;justify-content: center;">
    <text class="title">
      {{ content }}
    </text>
    <switch checked="true" onchange="test"></switch>
  </div>
  <text class="span-container" style="color: #ff00ff;">
    <span show="{{isShow}}">  {{ content  }}  </span>
    <span style="color: white;">
        1
    </span>
    <span style="color: #f76160">Hide clip </span>
  </text>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #F1F3F5;
}
.title {
  font-size: 26px;
  text-align:center;
  width: 200px;
  height: 200px;
}
```
```
// xxx.js
export default {
  data: {
    isShow:true,
    content: 'Hello World'
  },
  onInit(){    },
  test(e) {
    this.isShow = e.checked
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/39/v3/0aiEoqlrRkSI_pudw6delA/zh-cn_image_0000002573974023.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=7979C187ED77593E205DC3CD7282752A5A35C5658952F0C16F7F59367BE2CAC5)