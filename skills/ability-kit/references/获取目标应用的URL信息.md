# 获取目标应用的URL信息
---
# 获取目标应用的URL信息
#### 场景介绍
开发者在使用 [UIAbilityContext.openLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12) 接口拉起目标应用时，需要传入目标应用的URL信息。本章节主要介绍如何获取目标应用的URL信息。
假设目标应用的UIAbility的 [module.json5](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/module-configuration-file) 配置信息如下：
```
{
  "name": "EntryAbility",
  "srcEntry": "./ets/entryability/EntryAbility.ets",
  "icon": "$media:layered_image",
  "label": "$string:EntryAbility_label",
  // ···
  "skills": [
    {
      "uris": [
        {
          "scheme": "appurl",
          "host": "www.example.com",
          "path": "path1"
          // ...
        }
      ],
      "domainVerify": false,
    }
    // ...
  ]
}
```
#### 环境要求
开发者需要先获取 [hdc工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/hdc) 。
#### 操作步骤
1.
使用 [bm工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/bm-tool) 获取目标应用的bundleName。
1.
获取当前设备上所有已安装应用的bundleName，保存结果。
```bash
hdc shell bm dump -a
```
2.
安装目标应用。
3.
再次获取当前设备上所有已安装应用的bundleName，并与之前保存的结果进行对比。
新增的bundleName即为目标应用包名，本例中假设为com.example.myapplication。
2.
根据bundleName获取目标应用的Mission ID。
1.
使用 [aa工具](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/aa-tool) ，获取目标应用的abilityName。
```bash
hdc shell "aa dump -l | grep com.examplmyapplication"
```
2.
通过查看输出中的Mission ID部分，获取abilityName即为EntryAbility。
```bash
# 执行结果
Mission ID #48  mission name #[#com.example.myapplication:entry:EntryAbility] lockedStat#0 mission affinity #[]
      app name [com.example.myapplication]
      bundle name [com.example.myapplication]
```
3.
根据bundleName获取应用的uris信息。
1.
使用bm工具，获取应用的完整配置信息，包括abilities、skills、uris等配置。
```bash
hdc shell bm dump -n com.example.myapplication
```
2.
通过查看输出中name为的EntryAbility下方的skills部分，获取应用支持的URL Scheme配置。
```
// 输出示例（skills部分）：
// ...
"name": "EntryAbility",
// ...
{
  "skills": [
    {
      "actions": [
        "ohos.want.action.viewData"
      ],
      "domainVerify": false,
      "entities": [
        "entity.system.browsable"
      ],
      "permissions": [],
      "uris": [
        {
          "host": "www.example.com",
          "linkFeature": "",
          "maxFileSupported": 0,
          "path": "path1",
          "pathRegex": "",
          "pathStartWith": "",
          "port": "",
          "scheme": "appurl",
          "type": "",
          "utd": ""
        }
      ]
    }
  ]
}
```
4.
根据获取到的配置信息拼接生成URL信息。
URL格式如下：
```
scheme://host:port/path
```
以目标应用为例，其URL构成如下：
| 配置项 | 值 |
| --- | --- |
| scheme | appurl |
| host | www.example.com |
| port | 未指定（可选） |
| path | path1 |
根据上述参数，拼接得到的完整URL为：
```
appurl://www.example.com/path1
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b7/v3/zQeYBliGRa60sB21nys1mQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110740Z&HW-CC-Expire=86400&HW-CC-Sign=5E44E1D449A1C2DE859BAA0889DBE5B7D4D754BF19C261371F53727708F1B752)
- 不同应用的bundleName和URL配置可能因版本不同而有所变化。
- 建议在实际使用前，通过hdc命令确认目标应用的最新配置信息。
- 如果应用未配置skills中的uris字段，则不支持通过Deep Linking方式拉起。
5.
使用Deep Linking方式拉起目标应用。
以下为通过 [UIAbilityContext.openLink](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-inner-application-uiabilitycontext#openlink12) 接口拉起目标应用的完整示例。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e9/v3/YWAtuWF8SOe76PwrzMJVOQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110740Z&HW-CC-Expire=86400&HW-CC-Sign=9FE4D58D3F7FE0284A8E6B59F933A4D62A9E281FCAC61F254B7B4E85A8B8C55D)
-
URL配置验证：在使用目标应用的URL之前，务必验证其正确性，避免因URL错误导致拉起失败。
-
应用安装检测：在拉起目标应用前，建议先检测应用是否已安装。
```
import { common } from '@kit.AbilityKit'
import { hilog } from '@kit.PerformanceAnalysisKit';
import { BusinessError } from '@kit.BasicServicesKit';
@Entry
@Component
struct SpecifiedPage {
  build() {
    Row() {
      Column() {
        Button("拉起目标应用")
          .onClick(() => {
            let context = this.getUIContext().getHostContext() as common.UIAbilityContext;
            let link: string = 'appurl://www.example.com/path1';
            context.openLink(link, { appLinkingOnly: false })
              .then(() => {
                hilog.info(0x0000, 'testTag', `Succeeded in opening link.`);
              })
              .catch((error: BusinessError) => {
                hilog.error(0x0000, 'testTag', `Failed to open link, code: ${error.code}, message: ${error.message}`);
              });
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}
```
6.
调试验证。
安装并启动拉起方应用后，点击"拉起目标应用"按钮即可拉起目标应用，演示效果如下：
**图1** 拉起目标应用演示
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/lG2-BZSEQa6G4fymOJf9_g/zh-cn_image_0000002573973425.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110740Z&HW-CC-Expire=86400&HW-CC-Sign=C5E1E7598A2DC8DE06C99BF303354E595D2CE951CC2D10E0A47091A51DE70D5E)