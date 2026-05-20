# MCP协议上架指导
---
# MCP协议上架指导
#### **意图注册配置操作步骤**
1.
账号登录：
1.
通过“ [https://developer.huawei.com/consumer/cn/](https://developer.huawei.com/consumer/cn/) > 管理中心 > 生态服务 > 智慧服务 > 小艺开放平台（原HarmonyOS服务开放平台） > 意图框架”，进入意图注册入口。
如发布渠道为“智能体/小艺对话”只能使用与应用上架相同的账号登录。反之发布渠道为“插件市场”无特殊账号要求。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/0g3CLu_RQf6G_ar8pcjrVQ/zh-cn_image_0000002573855289.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=8C6E428664D513461BC1844F9201E26FC4B3B370608844A50AA9E969E5155157)
2.
点击“立即体验”即可进入意图注册入口。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1e/v3/4H5-wyVnQrG89CYwK0GuVA/zh-cn_image_0000002573975269.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=8DEED7028CB1B747B6A026DD37324004FC9BC83428FC42E3C82BE633C8403F59)
2.
注册意图集
1.
如图，点击“注册意图”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6e/v3/PY5C7aGgTEKfrlAEwoWSxg/zh-cn_image_0000002543375036.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=1A228FFB8B4C404768C1406374B0A32C710665B5EB9FDBEE72DB3B4274087EEA)
2.
选择“MCP协议”并填写基本信息创建意图集。
1. 意图集（插件）名称：需唯一标识。
2. 意图集（插件）描述：开发者自定义插件描述信息。
3. 分类：按业务场景选择。
4. MCP服务配置：填写MCP URL（服务器地址信息，不含鉴权信息）。
5. 认证信息配置：对应鉴权信息（注意放在Header/Query）。
6. 协议类型：根据情况选择，提供SSE/Streamable两种。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/37/v3/gDEKhNh6RPyBNyLNL4oomQ/zh-cn_image_0000002543215376.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=369D625DB79CFA1D4E563D3F0E5F862F9FC0F4FF8B8BADD5036C414438BABD43)
3.
编辑：创建后自动进入”插件编辑“页面。
1.
编辑基本信息：
1. 开发者品牌：该信息是对外露出的品牌传播名（注意和企业账号，公司名称区别开）。
2. 图标：192*192。
3. 使用描述：需使用Markdown格式。（需对server的功能概述、apikey申请方式表达准确清晰）。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5b/v3/iL0s7GqxQWWPaSzdbqvVCw/zh-cn_image_0000002573855291.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=0AC6F0E5C51500724994F530A963BCAFADF6976328B74B6EDEBC21B28F09844E)
4.
工具检查：保存后切换至"工具"页签。若基本信息配置无误，工具列表中会根据基本信息内容自动生成1条/多条信息。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/7c/v3/5JLigcrJRIiy4vED7iuxHA/zh-cn_image_0000002573975271.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=C3C31BC81F58120913AD249AB9F55D05A37A9EBAC5BB2C097149D5954A86D9B9)
1.
出现工具列表：请检查工具入参，参数是否重复或者缺失，参数类型是否正确。若一切无误，则配置成功。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/ZpEyBBjYSC-K-yR1jYPK2g/zh-cn_image_0000002543375038.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=835F6921AC55E6F731C748A2C59F67D5A489ED112B7B62FA9E91325D43034DD6)
2.
未出现工具列表：请等候几分钟重新进入，后台加载存在延时；如若重新进入后，仍未加载出工具信息，可能是插件的链接和鉴权信息配置错误。多次尝试后仍未解决，请通过邮箱联系华为意图框架同学（hagservice@huawei.com） 。
5.
审核：切换至“发布”页签，点击“提交审核”。
1.
1. 智能体：开发者上架MCP Server，仅供开发者自己开发的智能体来调用。
2. 小艺对话：开发者上架MCP Server，可供开发者自己开发的智能体调用，也可供小艺APP主对话调用（当前暂不支持开发者独立在小艺主对话上线该能力，需联系华为意图框架同学）。
3.
插件市场：开发者上架MCP server，可供开发者自己开发的智能体调用，也可供平台上其他开发者开发智能体时调用（回到开发者源头平台去开服）。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ab/v3/A3Z0eFULT-Gcp5QFENUVoA/zh-cn_image_0000002543215378.png?HW-CC-KV=V1&HW-CC-Date=20260421T111942Z&HW-CC-Expire=86400&HW-CC-Sign=74E737F3FDBCFA75DDE42D97B332A8A1B54DA17E39A71C0612689616797C0DFF)
2. 提交审核后，请耐心等待平台相关审核流程完成；完成后即可在“[https://developer.huawei.com/consumer/cn/](https://developer.huawei.com/consumer/cn/)> 管理中心 > 生态服务 > 智慧服务 > 小艺开放平台（原HarmonyOS服务开放平台） > 意图框架 > 小艺插件市场”中找到您的工具。