# UI预览
---
# UI预览
DevEco Studio为开发者提供了UI预览功能，方便查看UI效果并随时调整页面布局。预览支持页面预览和组件预览。图1中左侧图标 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/fiWdnkpIQrS-iKY_LY4J-Q/zh-cn_image_0000002573854103.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=186EE15B0B8D6AF9B3E834628926EEB2A4FECFDCEC1F7645C023B351C7FB440B) 表示页面预览，右侧图标 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/h6L2YX1eRjSdomSt1IiQRA/zh-cn_image_0000002573974079.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=E08B11EDF149DD96BF6AF06C42729D7DC1BF41729515A387076C5B5E8F22EEFF) 表示组件预览。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/09/v3/EF7nYVGiQqyaKwY1MVGtAQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=02C84AE2D2560A0194F4C2A3BE23657ACE6E787BB74753EB50DF938DA665E8FC)
操作系统和真机设备的差异可能导致预览效果与真机效果不同。预览效果仅作参考，实际效果以真机为准。
**图1** 预览图标
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/60/v3/FCogkzX9TtuC8FRipYGsTg/zh-cn_image_0000002543373852.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=61953628BACA0A4D42D5D28D691C7160188CF080E80EE2E35B65C4AAAA4D403F)
#### 页面预览
ArkTS应用/元服务均支持页面预览。页面预览通过在工程的ets文件中，给自定义组件添加 [@Entry](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-create-custom-components#entry) 装饰器，即可以查看当前UI页面效果。
-
启动方式：选中需要预览的ets页面，点击右侧侧边栏的Previewer按钮，启动页面预览。
-
热加载：在启动页面预览的前提下，添加、删除或修改UI组件后，通过Ctrl+S保存，预览器会同步刷新预览效果，无需重新启动预览。
-
路由能力：支持通过路由能力进行页面切换查看其它页面预览效果。
在页面预览的基础上，提供了极速预览和Inspector双向预览两种特性。下面将详细说明这两种特性。
#### 极速预览
支持在修改组件的属性时，无需使用Ctrl+S进行保存，可以直接观察到修改后的预览效果。极速预览默认开启，若需关闭，点击预览器右上角按钮 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/ijBmeFvERfm-HAAIpp76MA/zh-cn_image_0000002543214190.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=667439CB65B39E349FC783D9142D82A735900EFE71B7E67324DACCACC7998E44) 即可。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/46/v3/7RnFlpLwSXSINKDPLuCwdg/caution_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=A9C9622787B20BF3CB29A5BB1C0030D3322DC10D2A737C2EE2454C9837876CD1)
部分应用场景不支持极速预览：
- 不显示的组件。
- 新增或删除组件。
- 包含private变量或无类型的controller的组件。
- 使用了[@Builder](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-builder)、[@Style](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-style)、[@Extend](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-extend)等装饰器的组件。
- 修改使用import导入外部组件/模块的组件。
- 修改状态变量。
效果如图2所示：
**图2** 极速预览演示图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ee/v3/-xvkgSpoQV-ed4Dw3d1WuA/zh-cn_image_0000002573854105.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=295BF395212A38185E22B78175E372A9A5F6EE72856A1A55F9965DC4A3D30228)
#### inspector双向预览
支持ets文件与预览器的双向预览。使用时，点击预览器界面图标 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/50/v3/3GdfpffvSPK1nuh4wqj7JA/zh-cn_image_0000002573974081.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=AA43151F5FB3B505DA18F6413B79800B3B9D04D753BA5BB1692C1EAE1DC36D86) 开启双向预览功能。
开启双向预览功能后，支持代码编辑器、UI界面和组件树之间的联动：
1.
选中预览器界面中的组件，组件树上对应的组件将被选中，同时代码编辑器中的布局文件中对应的代码块高亮显示。
2.
选中布局文件中的代码块，预览器界面将高亮显示，组件树上的组件节点将呈现被选中的状态。
3.
选中组件树中的组件，对应的代码块和预览器界面将高亮显示。
4.
在预览界面，通过组件的属性面板修改可修改的属性或样式。预览界面的修改会自动同步到代码编辑器中，并实时刷新预览器界面。代码编辑器中的源码修改也会实时刷新预览器界面，并更新组件树信息及组件属性。
效果如图3所示：
**图3** inspector双向预览演示图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6b/v3/vyCsdFX0TheYK4Ru4Zb7BQ/zh-cn_image_0000002543373854.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=404CCAF254482432D21425A4DB7FB6B135191D3F2CC23B499B1C0297DE97BDBB)
#### 组件预览
ArkTS应用/元服务支持组件预览功能。组件预览通过在自定义组件前添加 [@Preview](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-previewer#preview装饰器) 装饰器实现。在单个源文件中，最多可以使用10个@Preview装饰自定义组件。启动方式：
- 当组件被@Entry和@Preview装饰时，点击右侧侧边栏的Previewer按钮，启动页面预览，页面加载成功后，点击，切换到组件预览。
- 当组件仅被@Preview装饰时，点击右侧侧边栏的Previewer按钮，则默认为组件预览。
组件预览时，使用@Preview装饰器的默认属性（请参考 [PreviewParams](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-universal-component-previewer#previewparams9) ）进行效果显示。可以通过设置@Preview的参数，指定预览设备的相关属性，包括设备类型、屏幕形状等。
@Preview的使用参考如下示例：
```
@Entry
@Preview
@Component
struct ComponentPreviewOne {
  build() {
    Column() {
      Text('this is component previewer One')
        .height(80)
        .fontSize(30)
      // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件
      Image($r('app.media.startIcon'))
        .height(300)
        .width(300)
    }
  }
}
@Preview
@Component
struct ComponentPreviewTwo {
  build() {
    Column() {
      Text('this is component previewer Two')
        .height(80)
        .fontSize(30)
        .fontColor(Color.Pink)
      // $r('app.media.startIcon')需要替换为开发者所需的图像资源文件
      Image($r('app.media.startIcon'))
        .height(300)
        .width(300)
    }
  }
}
```
效果如图4所示：
**图4** 组件预览效果图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1e/v3/WyzlFFSyQqmanTrs8ovazA/zh-cn_image_0000002543214192.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=B1508F51763F9F8E7BFA4C7DB24CE72B6853656762E5950B9C04FEAE6FF0EC7A)
#### 动态修改分辨率
同一个应用/元服务可以运行在多个设备上，因不同设备的屏幕分辨率、形状、大小等不同，开发者需要在不同的设备上查看应用/元服务的UI布局和交互效果。预览支持动态修改分辨率，方便开发者随时查看不同设备上的页面显示效果。启动方式：启动页面预览后，点击右上角 ![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a8/v3/-svMh8F8Rnus46tSi55Iiw/zh-cn_image_0000002573854107.png?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=F23AFA64895E2697848FC2A0553E57B36E28F07B99DFD1849AC3EC0B35738EF6) ，即可拖动页面选中框动态修改当前设备的屏幕大小。
效果如图5所示：
**图5** 动态修改分辨率效果图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7b/v3/TyKUaI0GSgmkk8rDArBP4Q/zh-cn_image_0000002573974083.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110933Z&HW-CC-Expire=86400&HW-CC-Sign=51434B0D67568BB835BD5E6802058F559F169AD8FCA1B23ADE0CEB9434F105F0)