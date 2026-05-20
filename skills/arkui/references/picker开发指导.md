# picker开发指导
---
# picker开发指导
picker是滑动选择器组件，类型支持普通选择器、日期选择器、时间选择器、时间日期选择器和多列文本选择器。具体用法请参考 [picker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-picker) 。
#### 创建picker组件
在pages/index目录下的hml文件中创建一个picker组件。
```html
<!-- xxx.hml -->
<div class="container">
  <picker>picker</picker>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ed/v3/V9Az3KX_S6ijX_T5tJ2XGQ/zh-cn_image_0000002543214138.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=F69888806EA9A7E069244E25E31B32BA3B9644936B36DB508D6531B70E9B2642)
#### 设置picker类型
通过设置picker的type属性来选择滑动选择器类型，如定义picker为日期选择器。
```html
<!-- xxx.hml -->
<div class="container">
  <picker id="picker_text" type="text" value="{{textvalue}}"range="{{rangetext}}" class="pickertext" ></picker>
  <picker id="picker_date" type="date" value="{{datevalue}}" lunarswitch="true" start="2002-2-5" end="2030-6-5" class="pickerdate"></picker>
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
.pickertext{
  margin-bottom: 30px;
}
```
```
// xxx.js
export default {
  data: {
    rangetext:['15', "20", "25"],
    textvalue:'Select text',
    datevalue:'Select date',
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/13/v3/0LbXoiPsTcCRRogql_RWzA/zh-cn_image_0000002573854053.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=7B6916BA953FD9AB875B1F1B0A114F2BA2F94A40865DC789F8CD96B679907E63)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/BILeUSoCQ86R-iF_wl_oig/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=91767C182ADADE0494E9E9916A9842568657F65088F942C358EBD6CACD0404C6)
普通选择器设置取值范围时，需要使用数据绑定的方式。
#### 设置时间显示格式
picker组件的hours属性用于设置时间显示格式，支持12小时制和24小时制两种模式。
```html
<!-- xxx.hml -->
<div class="container">
  <picker id="picker_time" type="time" value="12-hour format" hours="12" onchange="timeonchange"  class="pickertime"></picker>
  <picker id="picker_time" type="time" value="24-hour format" hours="24" onchange="timeonchange"  class="pickertime"></picker>
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
.pickertime {
  margin-bottom:50px;
  width: 300px;
  height: 50px;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ff/v3/TTe1ZKj0SEef_KQFh1AsTA/zh-cn_image_0000002573974029.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=F28804BE136B8BE3D065F372F8C68A5FC7914AA8CC1BCF5F358A1D5B64311601)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f4/v3/lEZvqGagSWqBPI6_qNglMw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=3B392B8CEA473D7E522BD31C4AD20858A52EA944E9F4AD212D37695513B26FEC)
-
hours属性为12：按照12小时制显示，用上午和下午进行区分。
-
hours属性为24：按照24小时制显示。
#### 添加响应事件
为picker组件添加change和cancel事件，可以处理用户的选择确定和取消操作。
```html
<!-- xxx.hml -->
<div class="container">
  <picker id="picker_multi" type="multi-text" value="{{multitextvalue}}" columns="3" range="{{multitext}}" selected="
     {{multitextselect}}" onchange="multitextonchange" oncancel="multitextoncancel" class="pickermuitl"></picker>
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
.pickermuitl {
  margin-bottom:20px;
  width: 600px;
  height: 50px;
  font-size: 25px;
  letter-spacing:15px;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
  data: {
    multitext:[["a", "b", "c"], ["e", "f", "g"], ["h", "i"]],
    multitextvalue:'Select multi-line text',
    multitextselect:[0,0,0],
  },
  multitextonchange(e) {
    this.multitextvalue=e.newValue;
    promptAction.showToast({ message:"Multi-column text changed to:" + e.newValue })
  },
  multitextoncancel() {
    promptAction.showToast({ message:"multitextoncancel" })
  },
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/35/v3/VOcngvCsTzS58zVP_QBGjA/zh-cn_image_0000002543373802.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=AA0BD923C4F8E09302F443548229D23A9747779D770BF04FE9A0E5573A1D336D)
#### 场景示例
在本场景中，开发者可以自定义填写健康情况以完成打卡。
```html
<!-- xxx.hml -->
<div class="doc-page">
  <text class="title">Health check-in</text>
  <div class="out-container">
    <text class="txt">Office:</text>
    <picker class="pick" focusable="true" type="text" value="{{pos}}" range="{{posarr}}" onchange="setPos"></picker>
  </div>
  <divider class="dvd"></divider>
  <div class="out-container">
    <text class="txt">Office hours:</text>
    <picker class="pick" type="date" value="{{datevalue}}"  start="2002-2-5" end="2030-6-5" selected="{{dateselect}}"
      lunarswitch="true" onchange="dateonchange"></picker>
  </div>
  <divider class="dvd"></divider>
  <div class="out-container">
    <text class="txt">Having fever or cold symptoms</text>
    <picker class="pick" type="text" value="{{yorn1}}" range="{{yesno}}" selected="1" onchange="isFever"></picker>
  </div>
  <divider class="dvd"></divider>
  <div class="out-container">
    <text class="txt">Close contact with someone with COVID-19</text>
    <picker class="pick" type="text" value="{{yorn2}}" range="{{yesno}}" selected="1" onchange="isTouch"></picker>
  </div>
  <div class="out-container">
    <button value="Submit" style="margin-top:100px;width:50%;font-color:#0000ff;height:80px" onclick="showtoast"></button>
  </div>
</div>
```
```css
/* xxx.css */
.doc-page {
  flex-direction: column;
  background-color: #F1F3F5;
}
.title {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 50px;
  font-weight: bold;
  color: #0000ff;
  font-size: 38px;
}
.out-container {
  flex-direction: column;
  align-items: center;
}
.pick {
  width: 80%;
  height: 76px;
  border: 1px solid #0000ff;
  border-radius: 20px;
  padding-left: 12px;
}
.txt {
  width: 80%;
  font-size: 18px;
  text-align: left;
  margin-bottom: 12px;
  margin-left: 12px;
}
.dvd {
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 80px;
  margin-right: 80px;
  color: #6495ED;
  stroke-width: 6px;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction'
export default {
  data: {
    yorn1:'No',
    yorn2:'No',
    pos:'Home',
    yesno:['Yes', 'No'],
    posarr:['Home', 'Company'],
    datevalue:'Select time',
    datetimeselect:'2012-5-6-11-25',
    dateselect:'2021-9-17',
    showbuild:true
  },
  onInit() {
  },
  isFever(e) {
    this.yorn1 = e.newValue
  },
  isTouch(e) {
    this.yorn2 = e.newValue
  },
  setPos(e) {
    this.pos = e.newValue
    if (e.newValue === 'Non-research center') {
      this.showbuild = false
    } else {
      this.showbuild = true
    }
  },
  setbuild(e) {
    this.build = e.newValue
  },
  dateonchange(e) {
    e.month=e.month+1;
    this.datevalue = e.year + "-" + e.month + "-" + e.day;
    promptAction.showToast({ message:"date:"+e.year+"-"+e.month+"-"+e.day })
  },
  showtoast() {
    promptAction.showToast({
      message: 'Submitted.',
      duration: 2000,
      gravity: 'center'
    })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cb/v3/gac5nO1FT7S7S1I9Sa2nWA/zh-cn_image_0000002543214140.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110925Z&HW-CC-Expire=86400&HW-CC-Sign=B8B5F8FC8704B2B4E34BD89EF84EAD2C8027C47B780E1DB24AF55E16BFA4945C)