# 配置Client ID
---
# 配置Client ID
1.
登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html) 平台，在“开发与服务”中选择目标应用，获取“项目设置 > 常规 > 应用”的Client ID。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/ETv9CNNRSu-u91J2rERLUg/zh-cn_image_0000002573854433.png?HW-CC-KV=V1&HW-CC-Date=20260421T111232Z&HW-CC-Expire=86400&HW-CC-Sign=3AB3F27BFE7BE9553D8F4E90039C80F1BBADF5EEE313E6B65C2DBAA0756B179A)
2.
在工程中entry模块的module.json5文件中，新增metadata，配置name为client_id，value为上一步获取的Client ID的值，如下所示：
```
{
  "module": {
    "name": "xxxx",
    "type": "entry",
    "description": "xxxx",
    "mainElement": "xxxx",
    "deviceTypes": [],
    "pages": "xxxx",
    "abilities": [],
    "metadata": [
      // 配置如下信息
      {
        "name": "client_id",
        "value": "xxxxxx"
      }
    ]
  }
}
```