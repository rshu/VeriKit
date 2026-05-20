# 受限ACL权限申请
---
# 受限ACL权限申请
1.
在 [申请调试Profile](https://developer.huawei.com/consumer/cn/doc/app/agc-help-debug-profile-0000002248181278) 和 [发布Profile文件](https://developer.huawei.com/consumer/cn/doc/app/agc-help-release-profile-0000002248341090) 之前，需要 [申请相应的ACL权限](https://developer.huawei.com/consumer/cn/doc/app/agc-help-apply-acl-0000002394212138) 。
2.
登录 [AppGallery Connect](https://developer.huawei.com/consumer/cn/service/josp/agc/index.html#/) ，点击“开发与服务”，在项目列表中找到对应的项目，并点击选择您需要申请ACL权限的应用。在“项目设置”页面，选择“ACL权限”页签，开始为应用申请ACL权限。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/a4/v3/abr5wiLXS3-vpxGvZTbHoQ/zh-cn_image_0000002573975091.png?HW-CC-KV=V1&HW-CC-Date=20260421T111644Z&HW-CC-Expire=86400&HW-CC-Sign=E6008F1A214F9568DDC7FE5BCE26F4147337A75685D2022C4E765D2348628222)
3.
在核对注意事项后，在“未获取权限”区域中勾选“我已知晓”。在权限搜索框中输入"ohos.permission.MANAGE_SCREEN_TIME_GUARD"，查找并勾选权限，提交申请。
4.
根据实际业务需求填写申请原因并提交，提交后将在1个工作日回复。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ca/v3/eBcHlJz1Sf6Eg7N2YjTXIQ/zh-cn_image_0000002543374858.png?HW-CC-KV=V1&HW-CC-Date=20260421T111644Z&HW-CC-Expire=86400&HW-CC-Sign=2465ECBBCE66AD4370246ED7E4590DF46189E261CCA34C7F8509709E519DCF73)
5.
权限申请通过后，在申请profile文件时，在“申请权限”栏选中“受限ACL权限（HarmonyOS API9及以上）”选项，点击“选择”。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6f/v3/o3rfD4GkSWCEmk_wQCc6Eg/zh-cn_image_0000002543215198.png?HW-CC-KV=V1&HW-CC-Date=20260421T111644Z&HW-CC-Expire=86400&HW-CC-Sign=3FC9FA4D6F189CAB8E199E1B29A381AFFC414A26E8BD0E8FD1DFAA90420A33BE)
6.
在弹出的“选择受限ACL权限”窗口可以看到已申请的权限，勾选后点击确定。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b2/v3/Y5rRqpF3SMG80FRPIJ0x5w/zh-cn_image_0000002573855111.png?HW-CC-KV=V1&HW-CC-Date=20260421T111644Z&HW-CC-Expire=86400&HW-CC-Sign=A3C166FE0E61C0A87E04E752E74246C518A3216B8CBEA7749E78A40473368626)
7.
选择权限后点击“添加”生成新的Profile文件，下载后按 [手动配置签名信息](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/ide-signing#section297715173233) 替换profile文件。
8.
在工程中entry模块的module.json5文件中添加"ohos.permission.MANAGE_SCREEN_TIME_GUARD"权限，如下所示：
```typescript
"requestPermissions": [{
   "name": "ohos.permission.MANAGE_SCREEN_TIME_GUARD"
}]
```