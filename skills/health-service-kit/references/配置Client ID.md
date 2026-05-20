# 配置Client ID
---
# 配置Client ID
1.
登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 平台，在“开发与服务”中选择目标应用，获取“项目设置 > 常规 > 应用”的Client ID。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a9/v3/mS1ugKAVQ1mmSOhRB5qaZw/zh-cn_image_0000002543214944.png?HW-CC-KV=V1&HW-CC-Date=20260421T111528Z&HW-CC-Expire=86400&HW-CC-Sign=7596580963F28B9A3B4A2CDF5C83E422BA242F8E977CF4B471D5B3C2F7080AE7)
2.
在工程中entry模块的module.json5文件中，新增metadata，配置name为client_id，value为上一步获取的Client ID的值，如下所示：
```json
"module": {
  "name": "xxxx",
  "type": "entry",
  "description": "xxxx",
  "mainElement": "xxxx",
  "deviceTypes": [],
  "pages": "xxxx",
  "abilities": [],
  "metadata": [ // 配置如下信息
    {
      "name": "client_id",
      "value": "xxxxxx"
    }
  ]
}
```