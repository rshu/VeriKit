# 基于Link的装饰器方案
---
# 基于Link的装饰器方案
开发者使用@InsightIntentLink装饰器进行基于Link的意图声明，可快速将已实现的Link跳转功能接入意图框架，以购买电影票意图为例，详细说明如下：
1.
装饰器的添加位置：装饰器建议添加到处理该Link的Class上，如下所示。
```typescript
import { InsightIntentLink, LinkParamCategory } from "@kit.AbilityKit";
import { url } from "@kit.ArkTS";
@InsightIntentLink({
  intentName: 'PurchaseMovieTickets',
  domain: 'PurchaseTickets',
  intentVersion: '1.0.1',
  displayName: '购买电影票',
  llmDescription: '用于在线购买电影票，允许用户选择指定影院、电影和场次时间进行购票。在用户明确表达购票需求，且已提供所有必要信息（cinema, film, time）时使用。如果信息不全或者用户只是查询电影信息、放映时间或票价，不应调用此工具。',
  uri: 'decorator://ability.entry/main',
  parameters: {
    "type": "object",
    "properties": {
      "cinema": {
        "type": "string",
        "description": "目标影院名称，仅支持平台合作的影院"
      },
      "film": {
        "type": "string",
        "description": "目标电影名称，需为当前上映或即将上映且在影院排片列表中的电影"
      },
      "time": {
        "type": "string",
        "description": "放映时间，必须为未来的场次，且需为影院当天有效排片时间；时间格式应为'YYYY-MM-DD HH:MM'（例如'2025-07-01 19:30'）"
      }
    },
    "required": ["cinema", "film", "time"]
  },
  paramMappings:[
    {
      paramName: 'cinema',
      paramMappingName: 'location',
      paramCategory: LinkParamCategory.LINK
    },
    {
      paramName: 'film',
      paramMappingName: 'title',
      paramCategory: LinkParamCategory.LINK
    },
    {
      paramName: 'time',
      paramMappingName: 'time',
      paramCategory: LinkParamCategory.LINK
    }
  ]
})
export class PurchaseMovieTicketsLinkIntent {
   private purchaseMovieTickets(uri: string): void {
     // 从want中获取传入的链接信息。
     // 如传入的url为：decorator://ability.entry/main?location=XXX影城&title=XXX&time=2025.06.01
     let urlObject = url.URL.parseURL(uri);
     let location = urlObject.params.get('location');
     if (location === "XXX影城") {
       // ...
     }
   }
 }
```
2.
装饰器的字段说明以及示例：@InsightIntentLink字段以及具体说明如下。
| **字段名称** | **类型** | **必选** | **说明** |
| --- | --- | --- | --- |
| intentName | string | 是 | 意图名称，最大长度：64。 |
| domain | string | 是 | 意图所属的功能垂域。 |
| intentVersion | string | 是 | 意图的版本号，用于兼容性管理。 |
| displayName | string | 是 | 意图的展示名称，用于界面显示，最大长度：64。 |
| llmDescription | string | 否 | 意图的描述，详细描述该意图可实现的能力，便于大模型理解并调用，接入自定义意图时，该字段必选。 |
| uri | string | 是 | Link跳转uri。 |
| parameters | Record<string, object > | 否 | 意图参数定义，描述参数类型以及含义。 |
| paramMappings | LinkIntentParamMapping[] | 否 | Link的参数映射，定义了意图入参与uri拼接参数的映射关系，如果需要参数映射或者需要添加wantParams，需要使用该字段。 |
| result | Record<string, object > | 否 | 意图执行返回结果定义。 |
LinkIntentParamMapping结构如下表：
| **字段名称** | **类型** | **必选** | **说明** |
| --- | --- | --- | --- |
| paramName | string | 是 | 映射后的意图参数名称。 |
| paramMappingName | string | 否 | 映射前的Link参数名称，意图调用时可将意图参数映射为Link参数，用于适配已有的Link调用。 |
| paramCategory | LinkParamCategory | 否 | Link参数类型枚举，默认作为域名参数，设置为“link”类型；如需要wantParams，则需要设置为“want”类型。 |
为便于大模型理解和调用，相关参数定义需要遵照 [自定义意图相关信息定义规范](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/intents-skill-all-rec-specification) 。
3.
添加装饰器的方式：装饰器可以直接手动添加，同时也支持一键生成装饰器，建议使用后者，此方式需要安装相应插件，详细步骤如下：
1.
打开CodeGenie插件：在DevEco Studio右侧边栏点击CodeGenie或输入快捷键Alt/Option+U，可以进入DevEco CodeGenie。若使用非最新版本的DevEco Studio，可通过 [下载中心](https://developer.huawei.com/consumer/cn/download/deveco-codegenie) 获取并使用相关功能，具体请参考 [插件获取及安装](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-codegenie#section18337533718) 。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/38/v3/B71dU8jEQ1-y4MJik36idw/zh-cn_image_0000002543375016.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=516AB17340E2BD49CC483E67D394D9DA3F562412F1132F5861F189B7D7614B73)
2.
框选想要接入意图框架功能的代码。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/99/v3/HMm7pw8YRsOpTIhI4oKmZg/zh-cn_image_0000002543215356.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=C648605DB5CD02A9DAF13A637CB892A7B8A7D8B1FE9B589986B75BA5284082AC)
3.
在选中的代码块上右键CodeGenie > Insight Intent > 选择适合的装饰器。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/be/v3/WL9y4yspRc-nS06pB1tjhA/zh-cn_image_0000002573855271.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=EA0295D8D615CD759DE97E3DAEC2D359562DA9139525501ED9BB10FE1DC276EA)
4.
在DevEco CodeGenie对话框中对意图定义、功能和参数等进行描述。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cc/v3/rMhTgmxIQdyYOJm-mZS8cQ/zh-cn_image_0000002573975251.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=71F4D51C833D019FD7A577CE5B32EC2E039EC952F827CBD2061305B4F789EF63)
5.
回车或者点击发送按钮，即可生成对应的装饰器内容。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/03/v3/rbfSU43YTKOFiM4UvMZ-mQ/zh-cn_image_0000002543375018.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=0D59C705AEB6FB86F3811E685BB32B13229BFC685F8CDEF84DA1DC0C81FBD601)
6. 将光标放置于要插入装饰器的位置，点击插入图标，即可在对应位置插入装饰器。
插入前：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/eb/v3/Iht69T2kSnu4pgk4OjXwuw/zh-cn_image_0000002543215358.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=00EB9DAE52B96FDE13D4394842F1649BE374420AF218D6FD564ABF6DC3D2A529)
插入后：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/55/v3/88JAf8fSTUeOh1RXzYacmQ/zh-cn_image_0000002573855273.png?HW-CC-KV=V1&HW-CC-Date=20260421T111939Z&HW-CC-Expire=86400&HW-CC-Sign=B898F1F5B95D14406A3DB920986F105FE31D6AED9F8A0BCB85758EEDC8C59AF2)
4.
装饰器的使用约束和说明：
- Link装饰器包含通过Link接入意图的所有配置，因此对装饰器所在Class、变量、成员没有要求，但是必须要在被依赖的ets文件中添加装饰器才可以被编译。
- 支持开发者设置wantParameter，执行Link时，会将该参数附带到want的parameter中。
- 装饰器方式仅支持参数名映射，不做参数加工，包括取值转换、合并等情况。