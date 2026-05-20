# button开发指导
---
# button开发指导
button是按钮组件，其类型包括胶囊按钮、圆形按钮、文本按钮、弧形按钮、下载按钮。具体用法请参考 [button API](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-basic-button) 。
#### 创建button组件
在pages/index目录下的hml文件中创建一个button组件。
```html
<!-- xxx.hml -->
<div class="container">       
  <button  type="capsule" value="Capsule button"></button>
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
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e1/v3/BZFPCZWDQEGm367JYQTwGw/zh-cn_image_0000002543214136.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=26001285F580A29A3A47FA4DE68CD55736F30685ACA4D7ECB726A71CA874FBB6)
#### 设置button类型
通过设置button的type属性来选择按钮类型，如定义button为圆形按钮、文本按钮等。
```html
<!-- xxx.hml -->
<div class="container">    
  <button class="circle" type="circle" >+</button>
  <button class="text" type="text"> button</button>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  background-color: #F1F3F5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.circle {
  font-size: 120px;
  background-color: blue;
  radius: 72px;
}
.text {
  margin-top: 30px;
  text-color: white;
  font-size: 30px;
  font-style: normal;
  background-color: blue;
  width: 50%;
  height: 100px;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2d/v3/QxFTmE7QSxyt_O_S6Qm3pQ/zh-cn_image_0000002573854051.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=D9647B91D3DDD2D6107EDD1F3F90C87B4A4A8DE4E0119A6D3287B091E5C671D2)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/5IE1MtSmTJy7frlJWr9CrQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=D98F805A31F2410A6991CF13A4DE2CF370C73AEAC3E9623D5C3E2DAD3DB7B6E2)
- button组件使用的icon图标如果来自云端路径，需要添加网络访问权限 ohos.permission.INTERNET。
如果需要添加ohos.permission.INTERNET权限，则在resources文件夹下的config.json文件里进行权限配置。
```json
<!-- config.json -->
"module": {
  "reqPermissions": [{
    "name": "ohos.permission.INTERNET"
  }],
}
```
#### 显示下载进度
为button组件添加setProgress方法，来实时显示下载进度条的进度。
```html
<!-- xxx.hml -->
<div class="container">
  <button class="button download" type="download" id="download-btn" onclick="setProgress">{{downloadText}}</button>
</div>
```
```css
/* xxx.css */
.container {
  width: 100%;
  height: 100%;
  background-color: #F1F3F5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.download {
  width: 280px;
  text-color: white;
  background-color: #007dff;
}
```
```
// xxx.js
import promptAction from '@ohos.promptAction';
export default {
  data: {
    percent: 0,
    downloadText: "Download",
    isPaused: true,
    intervalId : null,
  },
  start(){
    this.intervalId = setInterval(()=>{
      if(this.percent <100){
        this.percent += 1;
        this.downloadText = this.percent+ "%";
       } else{
         promptAction.showToast({
            message: "Download succeeded."
         })
         this.paused()
         this.downloadText = "Download";
         this.percent = 0;
         this.isPaused = true;
       }
    },100)
  },
  paused(){
    clearInterval(this.intervalId);
    this.intervalId = null;
  },
 setProgress(e) {
    if(this.isPaused){
      promptAction.showToast({
        message: "Started Downloading"
      })
      this.start();
      this.isPaused = false;
    }else{
      promptAction.showToast({
        message: "Paused."
      })
      this.paused();
      this.isPaused = true;
    }
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4b/v3/2BUKDRGAQ_GahUvgJnD4Tw/zh-cn_image_0000002573974027.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=22F2FD01E60D9D6044754EF624FAA459FEB9CC1B63C37A26D3186C7220EE5F4E)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/1_gFzGSZRS2WWPY4JDcWtg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=40FF2D5635AA82138BAB0810CE50753518E30768B4F75E5060D30CB6FFBD0AD1)
setProgress方法只支持button的类型为download。
#### 场景示例
在本场景中，开发者可根据输入的文本内容进行button类型切换。
```html
<!-- xxx.hml -->
<div class="container">
  <div class="input-item">
    <input class="input-text" id="change" type="{{mytype}}"  placeholder="{{myholder}}"
      style="background-color:{{mystyle1}};
      placeholder-color:{{mystyle2}};flex-grow:{{myflex}};"name="{{myname}}" value="{{myvalue}}"></input>
  </div>
  <div class="input-item">
    <div class="doc-row">
      <input type="button" class="select-button color-3" value="text" onclick="changetype3"></input>
      <input type="button" class="select-button color-3" value="data" onclick="changetype4"></input>
    </div>
  </div>
</div>
```
```css
/* xxx.css */
.container {
  flex-direction: column;
  align-items: center;
  background-color: #F1F3F5;
}
.input-item {
  margin-bottom: 80px;
  flex-direction: column;
}
.doc-row {
  justify-content: center;
  margin-left: 30px;
  margin-right: 30px;
}
.input-text {
  height: 80px;
  line-height: 80px;
  padding-left: 30px;
  padding-right: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top:100px;
  border: 3px solid;
  border-color: #999999;
  font-size: 30px;
  background-color: #ffffff;
  font-weight: 400;
}
.select-button {
  width: 35%;
  text-align: center;
  height: 70px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 30px;
  font-size: 30px;
  color: #ffffff;
}
.color-3 {
  background-color: #0598db;
}
```
```
// xxx.js
export default {
  data: {
    myflex: '',
    myholder: 'Enter text.',
    myname: '',
    mystyle1: "#ffffff",
    mystyle2: "#ff0000",
    mytype: 'text',
    myvalue: '',
  },
  onInit() {
  },
  changetype3() {
    this.myflex = '';
    this.myholder = 'Enter text.';
    this.myname = '';
    this.mystyle1 = "#ffffff";
    this.mystyle2 = "#FF0000";
    this.mytype = 'text';
    this.myvalue = '';
  },
  changetype4() {
    this.myflex = '';
    this.myholder = 'Enter a date.';
    this.myname = '';
    this.mystyle1 = "#ffffff";
    this.mystyle2 = "#FF0000";
    this.mytype = 'date';
    this.myvalue = '';
  },
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/jfw5GpHYRdiwL_6OAvCzdw/zh-cn_image_0000002543373800.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110924Z&HW-CC-Expire=86400&HW-CC-Sign=8A8B730E3BC26C6C34609A7EA8CFBD2928C9AAEB9AC65DB70CECD5431F72C84D)