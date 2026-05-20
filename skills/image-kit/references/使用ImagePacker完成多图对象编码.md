# 使用ImagePacker完成多图对象编码
---
# 使用ImagePacker完成多图对象编码
图片编码指将 [Picture](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-picture) 对象编码成不同格式的图片文件（当前仅支持编码为JPEG 和 HEIF 格式），用于后续处理，如保存、传输等。
#### 开发步骤
图片编码相关API的详细介绍请参见 [ImagePacker](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker) 。
1.
导入相关模块包。
```
// 导入相关模块包。
import { image } from '@kit.ImageKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';
import { fileIo as fs } from '@kit.CoreFileKit';
import { resourceManager } from '@kit.LocalizationKit';
```
2.
设置编码选项 [PackingOption](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-i#packingoption) 。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a2/v3/AiLeDXTXRlaqUdPXJ6SFXA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111330Z&HW-CC-Expire=86400&HW-CC-Sign=243DF0C2D23949CCEEB716EAE0140E8C5F6B3383D94C31F09459D5BA6694246F)
这里以编码成jpeg图片为例。编码的目标格式format遵循MIME标准定义，因此PackingOption.format应设置为image/jpeg，编码后的文件扩展名可设为.jpg或.jpeg。
```
let packOpts: image.PackingOption = {
  format: 'image/jpeg',
  quality: 95,
  desiredDynamicRange: image.PackingDynamicRange.AUTO,
  needsPackProperties: true
};
```
3.
封装函数，传入picture，使用 [packing](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packing13) 接口编码到ArrayBuffer，或使用 [packToFile](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/arkts-apis-image-imagepacker#packtofile11-2) 接口编码到文件。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/62/v3/WqA12HhsQFSpxJTADqGY0w/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111330Z&HW-CC-Expire=86400&HW-CC-Sign=E9FE7093F9A46B3E45C851B15538B2F3C39CC7999F54E42E70F745FFAA6226BC)
在进行编码前，需要先通过解码获取picture，可参考 [使用ImageSource完成多图对象解码](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/image-picture-decoding) 。
-
picture编码到ArrayBuffer。
```
async function packing(picture: image.Picture, packOpts: image.PackingOption) {
  const imagePackerApi = image.createImagePacker();
  try {
    let data = await imagePackerApi.packing(picture, packOpts);
    copyData = data;
    console.info('Succeeded in packing the image.');
  } catch (error) {
    console.error('Failed to pack the picture to data. And the error is: ' + error);
  }
}
```
-
picture编码到文件。
```
async function packToFile(picture: image.Picture, packOpts: image.PackingOption, context: Context) {
  try {
    const path : string = context.cacheDir + '/picture.jpg';
    let file = fs.openSync(path, fs.OpenMode.CREATE | fs.OpenMode.READ_WRITE);
    const imagePackerApi = image.createImagePacker();
    await imagePackerApi.packToFile(picture, file.fd, packOpts);
  } catch (error) {
    console.error('Failed to pack the picture to file. And the error is: ' + error);
  }
}
```