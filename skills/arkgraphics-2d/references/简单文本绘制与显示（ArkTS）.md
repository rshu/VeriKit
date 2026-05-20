# 简单文本绘制与显示（ArkTS）
---
# 简单文本绘制与显示（ArkTS）
#### 场景介绍
在一个简单的用户界面中，可能只需要展示几行静态文本，例如标签、按钮上的文字、菜单项或状态栏中的提示信息。此时，开发者只需要选择合适的字体、大小和颜色即可完成渲染。
#### 相关属性
此场景示例，涉及到的文本样式属性如下，具体及更多文本样式可参考 [TextStyle](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-graphics-text#textstyle) 。
-
color：字体颜色，默认为白色。请注意与画布颜色进行区分，以保证文本的正常显示。
-
fontSize：字体大小，浮点数，默认为14.0，单位为物理像素px。
#### 开发步骤
1.
通过context获取到Canvas画布对象。
```
let canvas = context.canvas;
```
2.
初始化文本样式，此处设置字体颜色为红色，字体大小为50。
```
// 获取文本样式
let myTextStyle: text.TextStyle = {
  // 文本颜色
  color: {
    alpha: 255,
    red: 255,
    green: 0,
    blue: 0
  },
  // 文本大小
  fontSize: 100
};
```
3.
初始化段落样式。
```
let myParagraphStyle: text.ParagraphStyle = {
  textStyle: myTextStyle,
};
```
4.
初始化段落对象，并添加文本。
```
let fontCollection = text.FontCollection.getGlobalInstance();
let ParagraphGraphBuilder = new text.ParagraphBuilder(myParagraphStyle, fontCollection);
// 更新文本样式
ParagraphGraphBuilder.pushStyle(myTextStyle);
// 添加文本
ParagraphGraphBuilder.addText("Hello World");
```
5.
排版段落并进行文本绘制。
```
// 生成段落
let paragraph = ParagraphGraphBuilder.build();
// 布局
paragraph.layoutSync(1250);
// 绘制文本
paragraph.paint(canvas, 0, 100);
```
#### 效果展示
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/72/v3/J0C5Ma3ESjeSAT_D7HET0g/zh-cn_image_0000002573854621.png?HW-CC-KV=V1&HW-CC-Date=20260421T111409Z&HW-CC-Expire=86400&HW-CC-Sign=E70ADC852C7B723395BF92C65FD6CB8AE51C25E6029E96E40B2C35A7CD95467B)