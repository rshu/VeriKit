# stepper开发指导
---
# stepper开发指导
当一个任务需要多个步骤时，可以使用stepper组件展示当前进展。具体用法请参考 [stepper API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-container-stepper) 。
#### 创建stepper组件
在pages/index目录下的hml文件中创建一个stepper组件。
```html
<!-- xxx.hml -->
<div class="container"> 
 <stepper>    
   <stepper-item>     
     <text>Step 1</text>
   </stepper-item> 
   <stepper-item>     
     <text>Step 2</text>
   </stepper-item> 
 </stepper> 
</div>
```
```css
/* xxx.css */
.container {
  width:100%;
  height:100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F1F3F5;
}
text{
  width: 100%;
  height: 100%;
  text-align: center;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/73/v3/6Urd--IXQQuDBqXtrtKEZw/zh-cn_image_0000002543373786.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=DE2D3D4C893DC9124F8A33DB1C44BA31A663A4958013BD730CB85F76367470E9)
#### 设置index属性
页面默认显示索引值为index的步骤。
```html
<!-- xxx.hml -->
<div class="container"> 
 <stepper index="2">    
   <stepper-item>     
     <text>stepper-item1</text>
   </stepper-item> 
   <stepper-item>     
     <text>stepper-item2</text>
   </stepper-item> 
   <stepper-item>     
     <text>stepper-item3</text>
   </stepper-item> 
  </stepper> 
</div>
```
```css
/* xxx.css */
.container {
  width:100%;
  height:100%;
  flex-direction: column;
  background-color: #F1F3F5;
}
text{
  width: 100%;
  height: 100%;
  text-align: center;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/Fe20AszRS8CtNgVPTiEw0A/zh-cn_image_0000002543214124.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=D2416505D8E2082E007A473381128E27510D290160A797C5FFEC612A31413072)
通过设置label属性，自定义stepper-item的提示按钮。
```html
<!-- xxx.hml -->
<div class="container"> 
 <stepper index="1">    
   <stepper-item label="{{label_1}}">     
     <text>stepper-item1</text>
   </stepper-item> 
   <stepper-item label="{{label_2}}">     
     <text>stepper-item2</text>
   </stepper-item> 
   <stepper-item label="{{label_3}}">     
     <text>stepper-item3</text>
   </stepper-item>
   <stepper-item>     
     <text>stepper-item4</text>
   </stepper-item> 
 </stepper> 
</div>
```
```css
/* xxx.css */
.container {
  width:100%;
  height:100%;
  flex-direction: column;
  background-color: #F1F3F5;
}
text{
  width: 100%;
  height: 100%;
  text-align: center;
}
```
```
// xxx.js
export default {
  data: {
    label_1:{
      nextLabel: 'NEXT',
      status: 'normal'
    },
    label_2:{
      prevLabel: 'BACK',
      nextLabel: 'NEXT',
      status: 'normal'
    },
    label_3:{
      prevLabel: 'BACK',
      nextLabel: 'END',
      status: 'disabled'
    },
  },
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/Qni6gFrSQwWVCQ10ELUV4w/zh-cn_image_0000002573854039.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=C054404E687A6EC3AC1D3A32566B837FF42393D94873721AE8C76AEDBB0F32AE)
#### 设置样式
stepper组件默认填充父容器，通过border和background-color设置边框、背景色。
```html
<!-- xxx.hml -->
<div class="container" > 
  <div class="stepperContent">
    <stepper class="stepperClass">    
      <stepper-item>     
        <text>stepper-item1</text>
      </stepper-item> 
    </stepper> 
  </div>
</div>
```
```css
/* xxx.css */
.container {
  width:100%;
  height:100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color:#F1F3F5;
}
.stepperContent{
  width: 300px;
  height: 300px;
}
.stepperClass{
  border:1px solid silver ;
  background-color: white;
}
text{
  width: 100%;
  height: 100%;
  text-align: center;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/33/v3/cQRkn5DyQBOheMIvKGgCxQ/zh-cn_image_0000002573974015.png?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=63310E8B2EB48F4F80CB57A0AEE90E61968E173F61EDE4FD173103C8419E0F97)
#### 添加事件
stepper分别添加finish，change，next，back，skip事件。
-
当change与next或back同时存在时，会先执行next或back事件再去执行change事件。
-
重新设置index属性值时要先清除index的值再重新设置，否则检测不到值的改变。
```html
<!-- xxx.hml -->
<div class="container"  style="background-color:#F1F3F5;">
  <div >
    <stepper onfinish="stepperFinish" onchange="stepperChange" onnext="stepperNext" onback="stepperBack" onskip="stepperSkip" id="stepperId" index="{{index}}">
      <stepper-item>
        <text>stepper-item1</text>
        <button value="skip" onclick="skipClick"></button>
      </stepper-item>
      <stepper-item>
         <text>stepper-item2</text>
         <button value="skip" onclick="skipClick"></button>
      </stepper-item>
      <stepper-item>
        <text>stepper-item3</text>
      </stepper-item>
    </stepper>
  </div>
</div>
```
```css
/* xxx.css */
.doc-page {
  width:100%;
  height:100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
stepper-item{
  width: 100%;
  flex-direction: column;
  align-self: center;
  justify-content: center;
}
text{
  margin-top: 45%;
  justify-content: center;
  align-self: center;
  margin-bottom: 50px;
}
button{
  width: 80%;
  height: 60px;
  margin-top: 20px;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
  data: {
    index:0,
  },
   stepperSkip(){
    this.index=2;
  },
   skipClick(){
    this.$element('stepperId').setNextButtonStatus({status: 'skip', label: 'SKIP'});
  },
  stepperFinish(){
    promptAction.showToast({
      message: 'All Finished'
    })
  },
  stepperChange(e){
    console.info("stepperChange"+e.index)
    promptAction.showToast({
      // index表示当前步骤的序号
      message: 'Previous step: '+e.prevIndex+"-------Current step:"+e.index
    })
  },
  stepperNext(e){
    console.info("stepperNext"+e.index)
    promptAction.showToast({
      // pendingIndex表示将要跳转的序号
      message: 'Current step:'+e.index+"-------Next step:"+e.pendingIndex
    })
    var index = {pendingIndex:e.pendingIndex }
    return index;
  },
  stepperBack(e){
    console.info("stepperBack"+e.index)
    var index = {pendingIndex: e.pendingIndex }
    return index;
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ab/v3/o6OvrSCaQO-DeH00vnEVtQ/zh-cn_image_0000002543373788.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110923Z&HW-CC-Expire=86400&HW-CC-Sign=133A71A71F68E716FA2A527B7794A26169E723028D8EC01D10796FA5B3FA61FF)