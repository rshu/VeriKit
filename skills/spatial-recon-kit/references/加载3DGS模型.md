# 加载3DGS模型
---
# 加载3DGS模型
#### 适用场景
支持的3DGS模块格式包括：MP4、PLY、GLB三种格式。
效果如下图所示：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/HaN2uzxnRx63hXn-6JZXYQ/zh-cn_image_0000002543214766.png?HW-CC-KV=V1&HW-CC-Date=20260421T111427Z&HW-CC-Expire=86400&HW-CC-Sign=19CD5984913B7357FEFD7AE0A754D97318DB2C314F232D5788473650D285C5DB)
#### 接口说明
以下仅列出本指南示例代码中调用的部分主要接口：
| 接口名 | 描述 |
| --- | --- |
| static loadGSNode(scene:[Scene](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-scene), params:[GSImportSettings](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/spatial-recon-spatialrender#gsimportsettings), parent?:[Node](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-scene-nodes#node)): Promise<[GSNode](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/spatial-recon-spatialrender#gsnode3dgs渲染对象)> | 加载3DGS模型。 |
#### 开发步骤
1.
从entry目录进入/src/main/ets/entryability/EntryAbility.ets文件，导入空间建模模块。
```typescript
import { spatialRender } from '@kit.SpatialReconKit';
import { Scene, RenderContext } from '@kit.ArkGraphics3D'
```
2.
加载当前场景的上下文。
```typescript
let renderContext: RenderContext | null = Scene.getDefaultRenderContext();
```
3.
调用加载3DGS模型接口。
```typescript
if (renderContext != null) {
  renderContext.loadPlugin(spatialRender.GSPlugin.PLUGIN_ID);
  let scene = Scene.load().then(async (scene: Scene) => {
    let uri = "OhosRawFile://assets/gltf/model.glb"; //3DGS模型的uri，根据实际情况修改
    let offset = 0;
    let gsNodeext: spatialRender.GSNode = await spatialRender.GSPlugin.loadGSNode(scene, {uri, offset}, scene.root);
  });
}
```