# Notification Kit简介
---
# Notification Kit简介
Notification Kit（用户通知服务）为开发者提供本地通知发布通道，开发者可借助Notification Kit将应用产生的通知直接在客户端本地推送给用户，本地通知根据通知类型及发布场景会产生对应的铃声、震动、横幅、锁屏、息屏、通知栏提醒和显示。
#### 使用场景
当应用进程处于运行时，开发者可以使用Notification Kit向用户发布通知。当应用进程终止后，本地通知发布通道关闭，开发者需要接入 [Push Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-kit-introduction) 进行云侧离线通知的发布。
开发者可以在多种场景中运用本地通知能力。如同步用户的上传下载进度、发布即时的客服支付通知、更新运动步数等。
#### 能力范围
Notification Kit支持的能力主要包括：
- 发布文本、进度条等类型通知。
- 携带或更新应用通知数字角标。
- 取消曾经发布的某条或全部通知。
- 查询已发布的通知列表。
- 查询应用自身通知开关状态。
- 应用通知用户的能力默认关闭，开发者可拉起授权框，请求用户授权发布通知。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/e3/v3/7cpFQzVnSw6l9Znx6-6eBw/zh-cn_image_0000002543374754.png?HW-CC-KV=V1&HW-CC-Date=20260421T111605Z&HW-CC-Expire=86400&HW-CC-Sign=34DBED59DF01A95C84C47F9E47932BE7E9C850CB15F4E1E8E2E8FE195FF2CE52)
#### 业务流程
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/EpmmKDLVS2KzHKP1-Agdrw/zh-cn_image_0000002543215092.png?HW-CC-KV=V1&HW-CC-Date=20260421T111605Z&HW-CC-Expire=86400&HW-CC-Sign=383B73ADBE5FFB4ACF7A78597759E419D866930FCEB7D32CD3DE5C95BB935DF3)
使用Notification Kit的主要业务流程如下：
1.请求通知授权。
2.应用发布通知到通知服务。
3.将通知展示到通知中心。
#### 通知样式
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/70/v3/jS6c_xDrTXKQetGoGhAa0A/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111605Z&HW-CC-Expire=86400&HW-CC-Sign=0A34174BB106715E7B9D936B0F2CB9FBB184D49893439E777A4461B38A77993D)
实际显示效果依赖设备能力和通知中心UI设计样式。
Notification Kit中常用的通知样式如下：
| 类型 | 通知样式 | 规格描述 |
| --- | --- | --- |
| [文本](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/text-notification) |  | 通知文本内容最多显示三行，超长后以“...”截断。 |
| [多行文本](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/text-notification) |  | 最多可显示三行内容，每行内容超长后以“...”截断。 |
| [通知角标](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/notification-badge) |  | 以数字的形式展示在右上角。 |
| [进度条](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/progress-bar-notification) |  | 进度类通知。 |
#### 约束限制
- 单个应用已发布的通知在通知中心等系统入口的留存数量有限（当前规格最多24条）。
- 通知的长度不能超过200KB（跨进程序列化大小限制）。
-
- 单个应用发布新通知的频次累计不能超过每秒10条，更新通知的频次累计不能超过每秒20条。
- 所有三方应用发布新通知的频次累计不能超过每秒15条，更新通知的频次累计不能超过每秒30条。
#### 违规处罚
应用发送的通知需遵守Push Kit的 [通知内容原则](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-detail-rules) ，如出现违反通知内容原则的行为，将被视为违规。
违规行为及相应的处理措施请参见 [违规分类、违规行为及违规处罚标准](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-punishment-standards) 。
#### 与相关Kit的关系
- Notification Kit创建的通知会即时显示在通知中心等系统入口。如果开发者希望在应用退到后台或进程终止后仍然有一些提醒用户的定时类通知，例如购物类应用抢购提醒等，可通过[Background Tasks Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/background-task-overview)创建。目前支持基于倒计时、日历、闹钟等类型的通知提醒功能。
- 开发者可通过[Ability Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/abilitykit-overview)的[getWantAgent](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-app-ability-wantagent#wantagentgetwantagent)接口设置用户点击通知后的行为意图。
- 开发者可通过[Push Kit](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/push-kit-introduction)远程推送用户通知到本地。
#### 模拟器支持情况
本Kit支持模拟器，但与真机存在差异，详情请参见“ [模拟器与真机的差异](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-emulator-specification) ”。