# 进度条 (Progress)
---
# 进度条 (Progress)
Progress是进度条显示组件，显示内容通常为目标操作的当前进度。具体用法请参考 [Progress](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-progress) 。
#### 创建进度条
Progress通过调用接口来创建，接口调用方式如下：
```
Progress(options: {value: number, total?: number, type?: ProgressType})
```
其中，value用于设置初始进度值，total用于设置进度总长度，type用于设置Progress样式。
```
Progress({ value: 24, total: 100, type: ProgressType.Linear }) // 创建一个进度总长为100，初始进度值为24的线性进度条
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1b/v3/hBBs4Nf_RAuEzAAbRdrtoQ/zh-cn_image_0000002543373586.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=78DB318B1493C4299FC51E83695B96A132DA24F16F8D659DAD5AC57E1E6BAEDD)
#### 设置进度条样式
Progress有5种可选类型，通过ProgressType可以设置进度条样式。ProgressType类型包括：ProgressType.Linear（线性样式）、 ProgressType.Ring（环形无刻度样式）、ProgressType.ScaleRing（环形有刻度样式）、ProgressType.Eclipse（圆形样式）和ProgressType.Capsule（胶囊样式）。
-
线性样式进度条（默认类型）
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/85/v3/EtQP-QRjQDmtSrgKhEwxWw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=4A6DF60AA9757570B857B424633D56F8D937855FE8194C8EE19D9F9FC5CFD841)
从API version 9开始，组件高度大于宽度时，自适应垂直显示；组件高度等于宽度时，保持水平显示。
```
Progress({ value: 20, total: 100, type: ProgressType.Linear }).width(200).height(50)
Progress({ value: 20, total: 100, type: ProgressType.Linear }).width(50).height(200)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6d/v3/FdPxewCUSGC5WVYHuLnd_A/zh-cn_image_0000002543213924.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=9E65778639B84A1723C2D7B904109F31803AFF6D84435C7AF222769B42466E4C)
-
环形无刻度样式进度条
```
// 从左往右，1号环形进度条，默认前景色为蓝色渐变，默认strokeWidth进度条宽度为2.0vp
Progress({ value: 40, total: 150, type: ProgressType.Ring }).width(100).height(100)
// 从左往右，2号环形进度条
Progress({ value: 40, total: 150, type: ProgressType.Ring }).width(100).height(100)
  .color(Color.Grey)    // 进度条前景色为灰色
  .style({ strokeWidth: 15})    // 设置strokeWidth进度条宽度为15.0vp
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8f/v3/MD7PrhDtTCGx7_yYEDXofA/zh-cn_image_0000002573853837.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=8B7C13C447D085B66DB50D5347DE6DDA6F34AC84613A6172B4FA07BCBA770B07)
-
环形有刻度样式进度条
```
Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
  .backgroundColor(Color.Black)
  .style({ scaleCount: 20, scaleWidth: 5 })    // 设置环形有刻度进度条总刻度数为20，刻度宽度为5vp
Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
  .backgroundColor(Color.Black)
  .style({ strokeWidth: 15, scaleCount: 20, scaleWidth: 5 })    // 设置环形有刻度进度条宽度15，总刻度数为20，刻度宽度为5vp
Progress({ value: 20, total: 150, type: ProgressType.ScaleRing }).width(100).height(100)
  .backgroundColor(Color.Black)
  .style({ strokeWidth: 15, scaleCount: 20, scaleWidth: 3 })    // 设置环形有刻度进度条宽度15，总刻度数为20，刻度宽度为3vp
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/45/v3/Z-f5M6LsQhKtiRtr5_KKEg/zh-cn_image_0000002573973815.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=D0D43DED1A09A7BA9A63CA2776C576D7573444B76AE0067B6C075953621D4A84)
-
圆形样式进度条
```
// 从左往右，1号圆形进度条，默认前景色为蓝色
Progress({ value: 10, total: 150, type: ProgressType.Eclipse }).width(100).height(100)
// 从左往右，2号圆形进度条，指定前景色为灰色
Progress({ value: 20, total: 150, type: ProgressType.Eclipse }).color(Color.Grey).width(100).height(100)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/06/v3/yZtuIeG6T86yv-kYFtdDRQ/zh-cn_image_0000002543373588.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=86DFE55A3E9B2F478316FA77827C0153790D61160E159BC85CCAAF0DA5DF58AF)
-
胶囊样式进度条
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/82/v3/MBw3FzEZSiG5_N-rlsxukw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=7F7594CB882EC4F9B671DC1A22A056DC925ECDC85A02D5386D0CFDC4D7ACB498)
-
头尾两端圆弧处的进度展示效果与ProgressType.Eclipse样式一致。
-
中段处的进度展示效果为矩形状长条，与ProgressType.Linear线性样式相似。
-
组件高度大于宽度时，自适应垂直显示。
```
Progress({ value: 10, total: 150, type: ProgressType.Capsule }).width(100).height(50)
Progress({ value: 20, total: 150, type: ProgressType.Capsule }).width(50).height(100).color(Color.Grey)
Progress({ value: 50, total: 150, type: ProgressType.Capsule }).width(50).height(100).color(Color.Blue).backgroundColor(Color.Black)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/86/v3/Zphkd1Y-QNSHXpby7C_6yA/zh-cn_image_0000002543213926.png?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=B98B7139377E9974C940548760AC6110E6383B49552CCFD53EC217881E2C2853)
#### 场景示例
更新当前进度值，如应用安装进度条，可通过点击Button增加progressValue，value属性将progressValue设置给Progress组件，进度条组件即会触发刷新，更新当前进度。
```
@Entry
@Component
struct ProgressCase1 {
  @State progressValue: number = 0;    // 设置进度条初始值为0
  build() {
    Column() {
      Column() {
        Progress({value:0, total:100, type:ProgressType.Capsule}).width(200).height(50).value(this.progressValue)
        Row().width('100%').height(5)
        // 请将$r('app.string.progress_add')替换为实际资源文件，在本示例中该资源文件的value值为"进度条+5"
        Button($r('app.string.progress_add'))
          .onClick(()=>{
            this.progressValue += 5;
            if (this.progressValue > 100){
              this.progressValue = 0;
            }
          })
      }
    }.width('100%').height('100%')
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/0d/v3/DTT9pG3XRX63PotWAcCOHQ/zh-cn_image_0000002573853839.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110854Z&HW-CC-Expire=86400&HW-CC-Sign=7B6CE9DE419A97986A5A636E9F3F64F4F1A9A2BE11CCE0885F18E9AF545C238F)