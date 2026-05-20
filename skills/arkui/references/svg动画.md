# svg动画
---
# svg动画
为svg组件添加动画效果。
#### 属性样式动画
在svg的子组件 [animate](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg-animate) 中，通过attributeName设置需要进行动效的属性，from设置开始值，to设置结束值。
```html
<!-- xxx.hml -->
<div class="container">
  <svg>
    <text x="300" y="300" fill="blue">
      Hello
      <animate attributeName="font-size" from="30" to="60" dur="3s" repeatCount="indefinite">
      </animate>
      <animate attributeName="fill" from="red" to="blue" dur="3s" repeatCount="indefinite">
      </animate>
      <animate attributeName="opacity" from="1" to="0.3" dur="3s" repeatCount="indefinite">
      </animate>
    </text>
    <text x="300" y="600" fill="blue">
      World
      <animate attributeName="font-size" from="30" to="60" values="30;80" dur="3s" repeatCount="indefinite">
      </animate>
      <animate attributeName="fill" from="red" to="blue"  dur="3s" repeatCount="indefinite">
      </animate>
      <animate attributeName="opacity" from="0.3" to="1" dur="3s" repeatCount="indefinite">
      </animate>
    </text>
  </svg>
</div>
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/19/v3/nAPw4eHNRpKFf6bxctpwVg/zh-cn_image_0000002573854093.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110930Z&HW-CC-Expire=86400&HW-CC-Sign=3264A5647B74D9AEA66A2527835ECC1462122ADD9F76C200040FF032B891382D)
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/qZ4Rgz7MRpO70Ev67u8siA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110930Z&HW-CC-Expire=86400&HW-CC-Sign=DD66EE466EB927124069F445E389522E8FC7ED4BE1FC1021514306308C47168A)
在设置动画变化值时，如果已经设置了values属性，则from和to都失效。
#### 路径动画
在svg的子组件 [animateMotion](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg-animatemotion) 中，通过path设置动画变化的路径。
```html
<!-- xxx.hml -->
<div class="container">
  <svg fill="white" width="800" height="900">
    <path d="M300,200 h-150 a150 150 0 1 0 150 -150 z" fill="white" stroke="blue" stroke-width="5" >
    </path>
    <path fill="red" d="M-5,-5 L10,0 L-5,5 L0,0 Z"  >
      <animateMotion dur="2000" repeatCount="indefinite" rotate="auto-reverse"path="M300,200 h-150 a150 150 0 1 0 150 -150 z">
      </animateMotion>
    </path>
  </svg>
</div>
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9/v3/WNacvZPyQxmsrKVvTr987w/zh-cn_image_0000002573974069.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110930Z&HW-CC-Expire=86400&HW-CC-Sign=4514D7A26C4F8DAC1B697F99DA7C4CCEC54E4430ACE45B8A1B839FE8D48245F3)
#### animateTransform动画
在svg的子组件 [animateTransform](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-components-svg-animatetransform) 中，通过attributeName绑定transform属性，type设置动画类型，from设置开始值，to设置结束值。
```html
<!-- xxx.hml -->
<div class="container" style="">
  <svg>
    <line x1="90" y1="300" x2="90" y2="730" stroke-width="10" stroke="black" stroke-linecap="round">
      <animateTransform attributeName="transform" attributeType="XML" type="translate"  dur="3s" values="0;30;10;30;20;30;25;30" keyTimes="0;0.3;0.5;0.7;0.8;0.9;1.0;1.1"
      fill="freeze">
      </animateTransform>
    </line>
    <circle cx="500" cy="500" r="50" stroke-width="15" fill="red" stroke="#e70d0d">
      <animateTransform attributeName="transform" attributeType="XML" type="rotate"  dur="3s" values="0;30;10;30;20;30;25;30" keyTimes="0;0.3;0.5;0.7;0.8;0.9;1.0;1.1" fill="freeze">
      </animateTransform>
      <animateTransform attributeName="transform" attributeType="XML" type="scale"  dur="6s" values="1;1;1.3" keyTimes="0;0.5;1" fill="freeze"></animateTransform>
      <animateTransform attributeName="transform" attributeType="XML" type="translate"  dur="9s" values="0;0;300 7" keyTimes="0;0.6;0.9" fill="freeze"></animateTransform>
    </circle>
    <rect width="500" height="200" x="90" y="840">
      <animateTransform attributeName="transform" attributeType="XML" type="skewY"  dur="6s" values="0;0;30" keyTimes="0;0.5;1" fill="freeze"></animateTransform>
    </rect>
    <line x1="650" y1="300" x2="650" y2="600" stroke-width="20" stroke="blue" stroke-linecap="round">
      <animateTransform attributeName="transform" attributeType="XML" type="translate"  dur="9s" values="0;0;0 800" keyTimes="0;0.6;1" fill="freeze"></animateTransform>
    </line>
  </svg>
</div>
```
```css
/* xxx.css */
.container {
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #F1F3F5;
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5c/v3/AlMcUUs5RrW3yG0GqyFDEw/zh-cn_image_0000002543373842.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110930Z&HW-CC-Expire=86400&HW-CC-Sign=3983C0338943083BC04FA6AA02301CB5A4423B573E677EEB1629F0BAD9C6FFA5)