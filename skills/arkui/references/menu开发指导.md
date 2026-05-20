# menu开发指导
---
# menu开发指导
提供菜单组件，作为临时性弹出窗口，用于展示用户可执行的操作，具体用法请参考 [menu](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-menu) 。
#### 创建menu组件
在pages/index目录下的hml文件中创建一个menu组件，添加target、type、title属性。
```html
<!-- xxx.hml-->
<div class="container">
  <text class="title-text" id="textId">show menu</text>
  <menu target="textId" type="click" title="title">
    <option value="Item 1">Item 1</option>
    <option value="Item 2">Item 2</option>
    <option value="Item 3">Item 3</option>
  </menu>
</div>
```
```css
/* xxx.css */
.container{
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #F1F3F5;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.title-text{
  font-size: 35px;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b3/v3/2A5ZIi4eRJq_u-femdp8oA/zh-cn_image_0000002573974045.png?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=145527A40BA465441945AA2BF145BF65E5CD314D05177DDEA0549A6FC5A6EE04)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b0/v3/E7D6Au9ZQ4SthdxdJpq0ag/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=238C1AA52DF5924AD5F83A1B10CE4FC1C2D01D4EA0324379F32678C3AD7411DE)
-
menu仅支持 [option](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-option) 子组件。
-
menu组件不支持focusable、disabled属性。
#### 设置样式
为menu组件设置样式，例如字体颜色、大小、字符间距等。
```html
<!-- xxx.hml-->
<div class="container">
  <text class="title-text" id="textId">show menu</text>
  <menu target="textId" type="click" title="title">
    <option value="Item 1">Item 1</option>
    <option value="Item 2">Item 2</option>
    <option value="Item 3">Item 3</option>
  </menu>
</div>
```
```css
/* xxx.css */
.container{
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #F1F3F5;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.title-text{
  font-size: 35px;
  background-color: #5a5aee;
  color: white;
  width: 70%;
  text-align: center;
  height: 85px;
  border-radius: 12px;
}
.menu{
  text-color: blue;
  font-size: 35px;
  letter-spacing: 2px;
}
option{
  color: #6a6aef;
  font-size: 30px;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/rRwUhWRwQZWDSG8T-2VtRQ/zh-cn_image_0000002543373818.png?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=0997C9C3D9E42A3456153B4D75BEC3220683F624AD1A5A2B697BE99CD2F8CEDE)
#### 绑定事件
为menu组件绑定oncancel事件（取消操作时触发）。
```html
<!-- xxx.hml-->
<div class="container">
  <text  class="title-text" id="textId" onclick="textClick">show menu</text>
  <menu  title="title" oncancel="cancel" id="menuId">
    <option value="Item 1">Item 1</option>
    <option value="Item 2">Item 2</option>
    <option value="Item 3">Item 3</option>
  </menu>
</div>
```
```css
/* xxx.css */
.container{
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #F1F3F5;
  width: 100%;
}
.title-text{
  font-size: 35px;
  background-color: #5a5aee;
  color: white;
  width: 70%;
  text-align: center;
  height: 85px;
  border-radius: 12px;
  margin-top: 500px;
  margin-left: 15%;
}
menu{
  text-color: blue;
  font-size: 35px;
  letter-spacing: 2px;
}
option{
  color: #6a6aef;
  font-size: 30px;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
  cancel() {
    promptAction.showToast({
      message: "cancel"
    })
  },
  textClick() {
    this.$element("menuId").show({ x: 175,y: 590 });
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/4vtP0LpDTdOv_fve-tSH3w/zh-cn_image_0000002543214156.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110926Z&HW-CC-Expire=86400&HW-CC-Sign=FE70BA6735DCC5F03228400948CFFCD912D5966A145180AB2A830AD5346FDEC8)