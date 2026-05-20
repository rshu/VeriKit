# tabs开发指导
---
# tabs开发指导
tabs是一种常见的界面导航结构。通过页签容器，用户可以快捷地访问应用的不同模块。具体用法请参考 [tabs API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-container-tabs) 。
#### 创建tabs
在pages/index目录下的hml文件中创建一个tabs组件。
```html
<!-- xxx.hml -->
<div class="container">
    <tabs>
        <tab-bar>
            <text>item1</text>
            <text>item2</text>
        </tab-bar>
        <tab-content class="tabContent">
            <div class="text">
                <text>content1</text>
            </div>
            <div class="text">
                <text>content2</text>
            </div>
        </tab-content>
    </tabs>
</div>
```
```css
/* xxx.css */
.container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F1F3F5;
}
.tabContent{
  width: 100%;
  height: 100%;
}
.text{
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/26/v3/m2CqBLQ0SgGijFbBdyfXvg/zh-cn_image_0000002543214126.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=A6103EB0EEE1AD4DAF3E6268C50F656FCF28E4B94B71E814C21DAEF0E3C16A96)
#### 设置样式
设置tabs背景色及边框和tab-content布局。
```html
<!-- xxx.hml -->
<div class="container">
  <tabs class="tabs">
    <tab-bar class="tabBar">
      <text class="tabBarItem">item1</text>
      <text class="tabBarItem">item2</text>
    </tab-bar>
    <tab-content class="tabContent">
      <div class="tabContent">
        <text>content1</text>
      </div>
      <div class="tabContent" >
        <text>content2</text>
      </div>
    </tab-content>
  </tabs>
</div>
```
```css
/* xxx.css */
.container {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
 background-color:#F1F3F5;
}
.tabs{
  margin-top: 20px;
 border: 1px solid #2262ef;
  width: 99%;
  padding: 10px;
}
.tabBar{
  width: 100%;
  border: 1px solid #78abec;
}
.tabContent{
  width: 100%;
  margin-top: 10px;
  height: 300px;
  color: blue;
  justify-content: center;
  align-items: center;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/73/v3/9CtFNvrTRv2GW1Fdwi3B6Q/zh-cn_image_0000002573854041.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=02F11C8B991C43BD695CD098487B00745F01D10A23370DB65A9DDC121461A22D)
#### 显示页签索引
开发者可以为tabs添加change事件，实现页签切换后显示当前页签索引的功能。
```html
<!-- xxx.hml -->
<div class="container" style="background-color:#F1F3F5;">
  <tabs class="tabs" onchange="tabChange">
    <tab-bar class="tabBar">
      <text class="tabBarItem">item1</text>
      <text class="tabBarItem">item2</text>
    </tab-bar>
    <tab-content class="tabContent">
      <div>
        <image src="common/images/bg-tv.jpg" style="object-fit: contain;"> </image>
      </div>
      <div>
        <image src="common/images/img1.jpg" style="object-fit: contain;"> </image>
      </div>
    </tab-content>
  </tabs>
</div>
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
  tabChange(e){
    promptAction.showToast({
      message: "Tab index: " + e.index
    })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7/v3/O_dn6roFSRWlO2L8aUoTsQ/zh-cn_image_0000002573974017.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=3763646F399566A71348EE09B90A50DA809DE37C2FD45B072677B004C728B771)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/92/v3/qg0zMKplRAe-ao4rF80-qw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=5AECC0F36689783083AAE89DE1D410A51D73D37880F49A0FEC4908C57C67D574)
tabs子组件仅支持一个 [<tab-bar>](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-container-tab-bar) 和一个 [<tab-content>](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-container-tab-content) 。
#### 场景示例
在本场景中，开发者可以点击标签切换内容，选中后标签文字颜色变红，并显示下划线。
用tabs、tab-bar和tab-content实现点击切换功能，再定义数组，设置属性。使用change事件改变数组内的属性值实现变色及下划线的显示。
```html
<!-- xxx.hml -->
<div class="container">
  <tabs onchange="changeTabactive">
    <tab-content>
      <div class="item-container" for="data.list">
        <div if="{{$item.title=='List1'?true:false}}">
          <image src="common/images/bg-tv.jpg" style="object-fit: contain;"> </image>
        </div>
        <div if="{{$item.title=='List2'?true:false}}">
          <image src="common/images/img1.jpg" style="object-fit: none;"> </image>
        </div>
        <div if="{{$item.title=='List3'?true:false}}">
          <image src="common/images/img2.jpg" style="object-fit: contain;"> </image>
        </div>
      </div>
    </tab-content>
    <tab-bar class="tab_bar mytabs" mode="scrollable">
      <div class="tab_item" for="data.list">
        <text style="color: {{$item.color}};">{{$item.title}}</text>
        <div class="underline-show" if="{{$item.show}}"></div>
        <div class="underline-hide" if="{{!$item.show}}"></div>
      </div>
    </tab-bar>
  </tabs>
</div>
```
```css
/* xxx.css */
.container{
width: 100%;
height: 100%;
background-color:#F1F3F5;
}
.tab_bar {
  width: 100%;
  height: 150px;
}
.tab_item {
  height: 30%;
  flex-direction: column;
  align-items: center;
}
.tab_item text {
  font-size: 32px;
}
.item-container {
  justify-content: center;
  flex-direction: column;
}
.underline-show {
  height: 2px;
  width: 160px;
  background-color: #FF4500;
  margin-top: 7.5px;
}
.underline-hide {
  height: 2px;
  margin-top: 7.5px;
  width: 160px;
}
```
```
// xxx.js
export default {
  data() {
    return {
      data: {
        color_normal: '#878787',
        color_active: '#ff4500',
        show: true,
        list: [{
          i: 0,
          color: '#ff4500',
          show: true,
          title: 'List1'
        }, {
          i: 1,
          color: '#878787',
          show: false,
          title: 'List2'
        }, {
           i: 2,
           color: '#878787',
           show: false,
           title: 'List3'
        }]
      }
    }
  },
  changeTabactive (e) {
    for (let i = 0; i < this.data.list.length; i++) {
      let element = this.data.list[i];
      element.show = false;
      element.color = this.data.color_normal;
      if (i === e.index) {
        element.show = true;
        element.color = this.data.color_active;
      }
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a1/v3/r3f1XCx_ST2YVEv2ZW1MjA/zh-cn_image_0000002543373790.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=035EF973A8E4813120704C279647AB2BE2ABBEB74561744F6A4B10849DE71556)