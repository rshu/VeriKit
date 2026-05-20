# input开发指导
---
# input开发指导
input是交互式组件，用于接收用户数据。其类型可设置为日期、多选框和按钮等。具体用法请参考 [input API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-input) 。
#### 创建input组件
在pages/index目录下的hml文件中创建一个input组件。
```html
<!-- xxx.hml -->
<div class="container">       
  <input type="text">             
     Please enter the content
  </input>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/f7/v3/QBZJQxvrR6SCSdl2r6Artg/zh-cn_image_0000002543373796.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=48991053883F123EFECA3F60E027F2413CCFCB740BD5FCFF651C81083CEA90F4)
#### 设置input类型
通过设置type属性来定义input类型，如将input设置为button、date等。
```html
<!-- xxx.hml -->
<div class="container">
  <div class="div-button">
    <dialog class="dialogClass" id="dialogId">
      <div class="content">
        <text>this is a dialog</text>
      </div>
    </dialog>
    <input class="button" type="button" value="click" onclick="btnclick"></input>
  </div>
  <div class="content">
    <input onchange="checkboxOnChange" checked="true" type="checkbox"></input>
  </div>
  <div class="content">
    <input type="date" class="flex" placeholder="Enter date"></input>
  </div>
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
  background-color: #F1F3F5 ;
}
.div-button {
  flex-direction: column;
  align-items: center;
}
.dialogClass{
  width:80%;
  height: 200px;
}
.button {
  margin-top: 30px;
  width: 50%;
}
.content{
  width: 90%;
  height: 150px;
  align-items: center;
  justify-content: center;
}
.flex {
  width: 80%;
  margin-bottom:40px;
}
```
```
// xxx.js
export default {
  btnclick(){
    this.$element('dialogId').show()
  },
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0b/v3/ZcEZNUZbQ32wUBY5Mg43Bw/zh-cn_image_0000002543214134.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=851A6C7A50E55A2BA1104FB1D94B75A1E5320BC88E89DE3F79B57B09B442E6D8)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/41/v3/tx3euy9XTXCaTkVnls1bxw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=3F3A4B3473136F884E87BDF928DD5CF4CD99A5F799C154D845C205D98F5F70B7)
仅当input类型为checkbox或radio时，当前组件选中的属性是checked才生效，默认值为false。
#### 事件绑定
向input组件添加translate事件。
```html
<!-- xxx.hml -->
<div class="content">
    <text style="margin-left: -7px;">
        <span>Enter text and then touch and hold what you've entered</span>
    </text>
    <input class="input" type="text" ontranslate="translate" placeholder="translate"> </input>
</div>
```
```css
/* xxx.css */
.content {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
.input {
  margin-top: 50px;
  width: 60%;
  placeholder-color: gray;
}
text{
  width:100%;
  font-size:25px;
  text-align:center;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction'
export default {
    translate(e) {
        promptAction.showToast({
            message: e.value,
            duration: 3000,
        });
    }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a0/v3/Uj0YlFMTTtWShbqKhFGdQg/zh-cn_image_0000002573854049.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=944DB42F971E46B781FFD6F56D8986822C9EAF5CCB8F185D81DCA90C9D2463E6)
#### 设置输入提示
通过对input组件添加showError方法来提示输入的错误原因。
```html
<!-- xxx.hml -->
<div class="content">
  <input id="input" class="input" type="text"  maxlength="20" placeholder="Please input text" onchange="change">
  </input>
  <input class="button" type="button" value="Submit" onclick="buttonClick"></input>
</div>
```
```css
/* xxx.css */
.content {
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F1F3F5;
}
.input {
  width: 80%;
  placeholder-color: gray;
}
.button {
  width: 30%;
  margin-top: 50px;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction'
 export default {
   data:{
     value:'',
   },
   change(e){
     this.value = e.value;
     promptAction.showToast({
     message: "value: " + this.value,
       duration: 3000,
      });
   },
   buttonClick(e){
     if(this.value.length > 6){
       this.$element("input").showError({
         error:  'Up to 6 characters are allowed.'
       });
      }else if(this.value.length == 0){
        this.$element("input").showError({
          error:this.value + 'This field cannot be left empty.'
        });
      }else{
        promptAction.showToast({
          message: "success "
        });
      }
   },
 }
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9b/v3/KMbpviutTFm_xtVZGgVnzw/zh-cn_image_0000002573974025.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=A9E4517B7981DA96A047CA4B43B11D4F278BF6B0368410858F009998D3240392)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/08/v3/4Zu6SXoqRYO5Hnba2WfwEw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=36E1F4F395A3494BE21ACAFB07B1CDF3ECE7AE6EACE3841050F8495C56F8D228)
showError方法仅在input类型为text、email、date、time、number和password时生效。
#### 场景示例
根据场景选择不同类型的input输入框，完成信息录入。
```html
<!-- xxx.hml -->
<div class="container">    
  <div class="label-item"> 
    <label>memorandum</label>   
  </div>    
  <div class="label-item">        
    <label class="lab" target="input1">content:</label>        
    <input class="flex" id="input1" placeholder="Enter content" />    
  </div>    
  <div class="label-item">        
    <label class="lab" target="input3">date:</label>        
    <input class="flex" id="input3" type="date" placeholder="Enter date" />    
  </div>    
  <div class="label-item">        
    <label class="lab" target="input4">time:</label>        
    <input class="flex" id="input4" type="time" placeholder="Enter time" />    
  </div>   
  <div class="label-item">        
    <label class="lab" target="checkbox1">Complete:</label>        
    <input class="flex" type="checkbox" id="checkbox1" style="width: 100px;height: 100px;" />    
  </div>    
  <div class="label-item">        
    <input class="flex" type="button" id="button" value="save" onclick="btnclick"/>    
  </div>
</div>
```
```css
/* xxx.css */
.container {
  flex-direction: column;
  background-color: #F1F3F5;
}
.label-item {
  align-items: center;
  border-bottom-width: 1px;border-color: #dddddd;
}
.lab {
  width: 400px;}
label {
  padding: 30px;
  font-size: 30px;
  width: 320px;
  font-family: serif;
  color: #9370d8;
  font-weight: bold;
}
.flex {
  flex: 1;
}
.textareaPadding {
  padding-left: 100px;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
  data: {
  },
  onInit() {
  },
  btnclick(e) {
    promptAction.showToast({
      message:'Saved successfully!'
    })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/91/v3/nmSWbXpYSdm2spi1TRzx_w/zh-cn_image_0000002543373798.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=9551236A14FBBB5CEBD10EABF2BD49EEFC04D21FF985B214B3E2CB6FD8F5DC3A)