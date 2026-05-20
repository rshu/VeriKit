# 形状裁剪（clipShape）
---
# 形状裁剪（clipShape）
可利用 [clipShape](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-attributes-sharp-clipping#clipshape12) 接口将组件裁剪为所需的形状。调用该接口后，可以保留该形状覆盖的组件部分，同时移除组件的其余部分。裁剪形状本身是不可见的。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/16/v3/ZPWqg_V3S5yY-FqSGZa2QA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=60A4C3B30198D3839C3C6D3BC6EFF9269B7838098B47BFDEDDCAB882F07E941B)
不同的形状支持的属性范围不同，路径是一种形状，除此之外还有椭圆、矩形等形状。
路径的形状不支持设置宽度和高度，具体形状支持的属性参考具体 [形状](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-shape) 的文档。
形状中的 [fill](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-arkui-shape#fill) 属性对clipShape接口不生效。
#### 裁剪圆形
通过设置CircleShape，将图片裁剪为圆形。
```
// xxx.ets
import { CircleShape } from '@kit.ArkUI';
@Entry
@Component
struct ClipShapeExample {
  build() {
    Column({ space: 15 }) {
      // 用一个280px直径的圆对图片进行裁剪
      // 请将$r('app.media.background')替换为实际资源文件
      Image($r('app.media.background'))
        .clipShape(new CircleShape({ width: '280px', height: '280px' }))
        .width('500px').height('280px')
      // 用一个350px直径的圆对图片进行裁剪
      // 请将$r('app.media.background')替换为实际资源文件
      Image($r('app.media.background'))
        .clipShape(new CircleShape({ width: '350px', height: '350px' }))
        .width('500px').height('370px')
    }
    .width('100%')
    .margin({ top: 15 })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fd/v3/zPYpHC4nQ9q6EwTKKycgTg/zh-cn_image_0000002543213968.png?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=7E114F0A39095DB8B114D006BCF804BC5D84EC9AD81C0CFDD31F5BD474CE8EE9)
#### 裁剪椭圆形
通过设置EllipseShape，将图片裁剪为椭圆形。
```
// xxx.ets
import { EllipseShape } from '@kit.ArkUI';
@Entry
@Component
struct ClipShapeExample {
  build() {
    Column({ space: 15 }) {
      // 请将$r('app.media.background')替换为实际资源文件
      Image($r('app.media.background'))
        .clipShape(new EllipseShape({ width: '280px', height: '200px' }))
        .width('500px').height('400px')
      // 请将$r('app.media.background')替换为实际资源文件
      Image($r('app.media.background'))
        .clipShape(new EllipseShape({ width: '380px', height: '280px' }))
        .width('500px').height('400px')
    }
    .width('100%')
    .margin({ top: 15 })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6/v3/hwIQW6ZaTO-lh5tWIFxF3g/zh-cn_image_0000002573853881.png?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=F5AAA0677A2067E8A81A6F08266D2A2941F92460988318AC2CC8DA20B486ECC9)
#### 裁剪矩形
通过设置RectShape，将图片裁剪为矩形。
```
// xxx.ets
import { RectShape } from '@kit.ArkUI';
@Entry
@Component
struct ClipShapeExample {
  build() {
    Column({ space: 15 }) {
      // 请将$r('app.media.background')替换为实际资源文件
      Image($r('app.media.background'))
        .clipShape(new RectShape({ width: '200px', height: '200px' }))
        .width('500px').height('400px')
      // 请将$r('app.media.background')替换为实际资源文件
      Image($r('app.media.background'))
        .clipShape(new RectShape({ width: '380px', height: '280px' }))
        .width('500px').height('400px')
    }
    .width('100%')
    .margin({ top: 15 })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/57/v3/qC4-PE-hRCqwHT6Qd_t5uw/zh-cn_image_0000002573973859.png?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=43B786860F98FFF10CB3516E1DEFF8B2693D7B1B8C97436FF3962D646F81911A)
#### 裁剪不规则形状
通过设置PathShape，将图片裁剪为不规则形状。
```
// xxx.ets
import { PathShape } from '@kit.ArkUI';
@Entry
@Component
struct ClipShapeExample {
  build() {
    Column({ space: 15 }) {
      Row() {
        // 请将$r('app.media.background')替换为实际资源文件
        Image($r('app.media.background'))
          .clipShape(new PathShape({ commands: 'M0 0 H400 V200 H0 Z' }))
          .width('500px').height('300px')
      }
      .clip(true)
      .borderRadius(20)
    }
    .width('100%')
    .margin({ top: 15 })
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/KfJmWF6qQgeD97p1bhHnvQ/zh-cn_image_0000002543373632.png?HW-CC-KV=V1&HW-CC-Date=20260421T110859Z&HW-CC-Expire=86400&HW-CC-Sign=03BAB135D4B7FFCD4D331261EFB0DC5D705B0C67D5244C39149535E82EDC646F)