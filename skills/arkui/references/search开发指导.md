# search开发指导
---
# search开发指导
提供搜索框组件，用于提供用户搜索内容的输入区域，具体用法请参考 [search](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-search) 。
#### 创建search组件
在pages/index目录下的hml文件中创建一个search组件。
```html
<!-- xxx.hml-->
<div class="container">
  <search></search>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7e/v3/7gK4av5cQpWyzf4xGCCBaw/zh-cn_image_0000002573854075.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=59DFF732E88453EA6901F00D6D3D40B180A0F4E629735CBA67BD398DE818E5C4)
#### 设置属性
通过设置hint、icon和searchbutton属性设置搜索框的提示文字、图标和末尾搜索按钮的内容。
```html
<!-- xxx.hml-->
<div class="container">
  <search hint="Please enter the search content"  searchbutton="search" icon="/common/search1.png"></search>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f8/v3/NYS7mnklQmir19gU_TLYGQ/zh-cn_image_0000002573974051.png?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=FA75614FAA5B58EB77890AD7B20869B5156B8C1EBF48D242D772E708879FF816)
#### 添加样式
通过color、placeholder-color和caret-color样式来设置搜索框的文本颜色、提示文本颜色和光标颜色。
```html
<!-- xxx.hml-->
<div class="container">
  <search hint="Please enter the search content"  searchbutton="search" ></search>
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
search{
  color: black;
  placeholder-color: black;
  caret-color: red;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/41LLxSohR3aJmbBe1I9_Fw/zh-cn_image_0000002543373824.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=A5681093642EBF0548FF9DA98500B8C1AC2B29A09B0C8ECD792BFED4EA562B09)
#### 绑定事件
向search组件添加change、search、submit、share和translate事件，对输入信息进行操作。
```html
<!-- xxx.hml-->
<div class="container">
  <text style="margin-left: -7px;">
    <span>Enter text and then touch and hold what you've entered</span>
  </text>
  <search hint="Please enter the search content"  searchbutton="search" onsearch="search" onchange="change" ontranslate="translate" onshare="share"
  onsubmit="submit">
  </search>
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
text{
  width: 100%;
  font-size: 25px;
  text-align: center;
  margin-bottom: 100px;
}
```
```
// index.js
import promptAction from '@ohos.promptAction';
export default {
  search(e){
    promptAction.showToast({
      message: e.value,
      duration: 3000,
    });
  },
  translate(e){
    promptAction.showToast({
      message:  e.value,
      duration: 3000,
    });
  },
  share(e){
    promptAction.showToast({
      message:  e.value,
      duration: 3000,
    });
  },
  change(e){
    promptAction.showToast({
      message:  e.value,
      duration: 3000,
    });
  },
  submit(e){
    promptAction.showToast({
      message: 'submit',
      duration: 3000,
    });
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cf/v3/rEQ51XelR-6mq22HfVtlhA/zh-cn_image_0000002543214162.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=CD07E9CB60AB2BE4DF3CA606AA411EEC40EBBBF40BC32BA27E67FFCF32EE8DE3)
#### 场景示例
在本场景中通过下拉菜单选择search、Textarea和Input组件来实现搜索和输入效果。
```html
<!-- xxx.hml-->
<div style="flex-direction: column;align-items: center;justify-content: center; width: 100%;">
  <select class="slt1" id="slt1" onchange="setfield">
    <option value="search">search</option>
    <option value="textarea">Textarea</option>
    <option value="input">Input</option>
  </select>
  <div if="{{showsearch}}" style="flex-direction: column;align-items: center;margin-top: 50px;height: 400px;justify-content: space-around;">
    <search class="field" id="search1" hint="search1" onsubmit="submit" onchange="change" ></search>
    <search class="field" id="search2" icon="common/search1.png" hint="search2" show="{{showsec}}" onsubmit="submit" onchange="change" ></search>
  </div>
  <div if="{{showtextarea}}" style="flex-direction: column;align-items: center;margin-top: 50px;height: 400px;justify-content: space-around;">
    <textarea class="field" id="textarea1" extend="true" placeholder="textarea1" onchange="change" ></textarea>
    <textarea class="field" id="textarea2" extend="true" placeholder="textarea2" onchange="change" show="{{showsec}}"></textarea>
  </div>
  <div if="{{showinput}}" style="flex-direction: column;align-items: center;margin-top: 50px;height: 400px;justify-content: space-around;">
    <input type="text" class="field" id="input1" placeholder="input1" onchange="change" ></input>
    <input type="text" class="field" id="input2" placeholder="input2" onchange="change" show="{{showsec}}"></input>
  </div>
</div>
```
```css
/* xxx.css */
.field {
  width: 80%;
  color: mediumaquamarine;
  font-weight: 600;
  placeholder-color: orangered;
}
.slt1{
  font-size: 50px;
  position: absolute;
  left: 50px;
  top: 50px;
}
```
```
// index.js
import promptAction from '@ohos.promptAction';
export default {
  data: {
    showsearch: true,
    showtextarea: false,
    showinput: false,
    showsec: true,
  },
  setfield(e) {
    this.field = e.newValue
    if (e.newValue == 'search') {
      this.showsearch = true
      this.showtextarea = false
      this.showinput = false
    } else if (e.newValue == 'textarea') {
      this.showsearch = false
      this.showtextarea = true
      this.showinput = false
    } else {
      this.showsearch = false
      this.showtextarea = false
      this.showinput = true
    }
  },
  submit(e) {
    promptAction.showToast({
      message: '搜索！',
      duration: 2000
    })
  },
  change(e) {
    promptAction.showToast({
      message: '内容:' + e.text,
      duration: 2000
    })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/dc/v3/2fwaiGXlQgKc8oOwBj56KA/zh-cn_image_0000002573854077.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110927Z&HW-CC-Expire=86400&HW-CC-Sign=8C9AD1757A4E03D883872474CCCCC945D7C15FD95E70A0F3F8E1FADF5D5CA1FD)