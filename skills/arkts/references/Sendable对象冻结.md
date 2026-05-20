# Sendable对象冻结
---
# Sendable对象冻结
Sendable对象支持冻结操作。冻结后，对象变为只读，不能修改属性。因此，多个并发实例间访问时无需加锁。可以通过调用 [Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 接口冻结对象。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d0/v3/Ad93G6OTRGOClGNdCdQDFw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110813Z&HW-CC-Expire=86400&HW-CC-Sign=67FAA0D2FB7642511CC62D647D2799A945404704CDD42F2416AB47237F46E253)
不支持在.ets文件中使用Object.freeze接口。
#### 使用示例
1.
提供ts文件封装Object.freeze方法。
```
// helper.ts
export function freezeObj(obj: any) {
  Object.freeze(obj);
}
```
2.
调用freeze方法冻结对象，然后将其发送到子线程。
```
// SendableFreeze.ets
import { freezeObj } from './helper';
import { worker } from '@kit.ArkTS';
@Sendable
export class GlobalConfig {
  // 一些配置属性与方法
  init() {
    // 初始化相关逻辑
    freezeObj(this); // 初始化完成后冻结当前对象
  }
}
@Entry
@Component
struct Index {
  build() {
    Column() {
      Text("Sendable freezeObj Test")
        .id('HelloWorld')
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .onClick(() => {
          let gConfig = new GlobalConfig();
          gConfig.init();
          const workerInstance = new worker.ThreadWorker('entry/ets/workers/Worker.ets', { name: "Worker1" });
          workerInstance.postMessage(gConfig);
        })
    }
    .height('100%')
    .width('100%')
  }
}
```
3.
子线程直接操作对象，不加锁。
```
// Worker.ets
import { ErrorEvent, MessageEvents, ThreadWorkerGlobalScope, worker } from '@kit.ArkTS';
import { GlobalConfig } from '../pages/Index';
const workerPort: ThreadWorkerGlobalScope = worker.workerPort;
workerPort.onmessage = (e: MessageEvents) => {
  let gConfig: GlobalConfig = e.data;
  // 使用gConfig对象
}
```