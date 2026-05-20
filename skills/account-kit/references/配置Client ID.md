# 配置Client ID
---
# 配置Client ID
#### 获取Client ID和APP ID
在 AppGallery Connect（简称AGC）的 [开发与服务](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/myProject) 中，选择对应的项目和对应的应用，在“常规 > 应用 ”下，找到 **应用** 的Client ID和APP ID。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/de/v3/C6HAfOE7SZiPq8FGs_LrrA/zh-cn_image_0000002573854691.png?HW-CC-KV=V1&HW-CC-Date=20260421T111432Z&HW-CC-Expire=86400&HW-CC-Sign=3520951CA4FA65D071D26FEF294B652E05E326A51AA509E1AC86329E2848A8FF)
#### 确认是否需要配置Client ID
如果上一步获取到的Client ID和APP ID相同，则无需配置Client ID，否则需要按下一步配置Client ID。
#### 配置Client ID
在工程中 **entry** 模块的module.json5文件中，新增metadata，配置name为client_id，value为上一步获取的Client ID的值，如下所示：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b6/v3/y53e8y7CQfKFG1k-_Y0nJQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111432Z&HW-CC-Expire=86400&HW-CC-Sign=EF4F26329ADED4C9AEBA48B3546447FFEF673DEB48906836DCAEADD02F7F3BD1)
1.若工程中存在多个模块，需要在"type"为"entry"模块中的module.json5文件配置应用的Client ID。
2.请确认获取的Client ID是 **应用** Client ID，错配成项目Client ID将导致接口调用报错。
```json
"module": {
  "name": "<name>",
  "type": "entry",
  "description": "<description>",
  "mainElement": "<mainElement>",
  "deviceTypes": [],
  "pages": "<pages>",
  "abilities": [],
  "metadata": [ // 配置信息如下
    {
      "name": "client_id",
      "value": "xxxxx" // 将上一步获取到的Client ID赋值给value，请注意不要使用其他方式设置value值
    }
  ]
 }
```