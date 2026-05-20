# 集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。
---
# 集成了游戏资源加速ExtensionAbility方法，未配置网络权限，导致功能未生效。
未配置网络权限将出现如下异常日志：
```typescript
ohos.permission.INTERNET check failed
```
请开发者在“src/main/module.json5”的requestPermissions层级中添加网络权限。
```typescript
{
  "module": {
    // ...
    "requestPermissions": [
      {
        "name": "ohos.permission.INTERNET"
      }
    ]
  }
}
```