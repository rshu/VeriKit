# 使用PixelMap完成图像变换
---
# 使用PixelMap完成图像变换
图片处理指对PixelMap进行相关的操作，如获取图片信息、裁剪、缩放、偏移、旋转、翻转、设置透明度、读写像素数据等。图片处理主要包括图像变换、 [位图操作](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-pixelmap-operation) ，本文介绍图像变换。
#### 开发步骤
图像变换相关API的详细介绍请参见 [API参考](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-pixelmap) 。
1.
完成 [图片解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-decoding) ，获取PixelMap对象。
2.
获取图片信息。
```
import { BusinessError } from '@kit.BasicServicesKit';
// 获取图片大小。
pixelMap.getImageInfo().then( (info : image.ImageInfo) => {
  console.info('info.width = ' + info.size.width);
  console.info('info.height = ' + info.size.height);
}).catch((err : BusinessError) => {
  console.error("Failed to obtain the image pixel map information.And the error is: " + err);
});
```
3.
进行图像变换操作。
原图：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1e/v3/-vyS0kYnQP6AO45nKuCBWQ/zh-cn_image_0000002573854531.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=753D9321EB6599FB74ED1E86683FEF4083D7B30D05C827232B47CCFFDFF548DD)
-
裁剪
```
// x：裁剪起始点横坐标0。
// y：裁剪起始点纵坐标0。
// height：裁剪高度400，方向为从上往下（裁剪后的图片高度为400）。
// width：裁剪宽度400，方向为从左到右（裁剪后的图片宽度为400）。
pixelMap.crop({x: 0, y: 0, size: { height: 400, width: 400 } });
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2e/v3/CH4wbmZtTEuhC6LAwtEZdg/zh-cn_image_0000002573974507.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=B7D8C81177AEE42D728E44BD91FBFF3A03448DDE78CE80AEB880FA7ED78550FE)
-
缩放
```
// 宽为原来的0.5。
// 高为原来的0.5。
pixelMap.scale(0.5, 0.5);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/15/v3/kZGxxBzITcemsd11h23F0g/zh-cn_image_0000002543374280.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=B73203BD75A71A4485FDC355DD3D3BFC0C3804D4F9AB0E986E7B7993E52AC479)
-
偏移
```
// 向下偏移100。
// 向右偏移100。
pixelMap.translate(100, 100);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d5/v3/SxjHrBQLSj6GplAdkaptKQ/zh-cn_image_0000002543214618.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=9FAEF081F417DA4DEA1B1685F0230C661B345730A2C05DE63932BF4EE7A87DB0)
-
旋转
```
// 顺时针旋转90°。
pixelMap.rotate(90);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/28/v3/ICKOLF1fQUuPTht7Dhl9cw/zh-cn_image_0000002573854533.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=175AD853034A536499BB3CDCD5403240BC7583DAC79081188340B08D75BFE6A4)
-
翻转
```
// 垂直翻转。
pixelMap.flip(false, true);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2a/v3/CI2E7sWCTumTJv-c7wleAg/zh-cn_image_0000002573974509.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=1BDFE3A93F7D718EB1750E716D577B0381348BBD8A03289C59510BD0DCEDBA1F)
```
// 水平翻转。
pixelMap.flip(true, false);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b5/v3/zJTlUgr9SheEGp8gLQ_kQg/zh-cn_image_0000002543374282.jpeg?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=BF43655261D684CC712BFC43716F983EB48028AD765610DC775D994182ABFCD1)
-
透明度
```
// 透明度0.5。
pixelMap.opacity(0.5);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fa/v3/pyTwPUt3RPWoUNKB4MRuow/zh-cn_image_0000002543214620.png?HW-CC-KV=V1&HW-CC-Date=20260421T111331Z&HW-CC-Expire=86400&HW-CC-Sign=08431DCA047A3C46DA324262851A6E3E1B8456AEB8E34FD762A6B02701483557)
#### 示例代码
- [拼图](https://gitcode.com/HarmonyOS_Samples/game-puzzle)