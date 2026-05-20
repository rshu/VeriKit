# SharedArrayBuffer对象
---
# SharedArrayBuffer对象
SharedArrayBuffer内部包含一块Native内存，其JS对象壳被分配在虚拟机本地堆（LocalHeap）。支持跨并发实例间共享Native内存，但是对共享Native内存的访问及修改需要采用Atomics类，防止数据竞争。SharedArrayBuffer可用于多个并发实例间的状态或数据共享。通信过程如下图所示：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/t1PVGCp6SBqvSE69yAroaA/zh-cn_image_0000002573973455.png?HW-CC-KV=V1&HW-CC-Date=20260421T110810Z&HW-CC-Expire=86400&HW-CC-Sign=3E3451200C9AFB5E331E02EA6FD71059250E2ECC62EA9198C26966D9273FDC4E)
#### 使用示例
使用TaskPool传递Int32Array对象，实现如下：
```
import { taskpool } from '@kit.ArkTS';
@Concurrent
function transferAtomics(arg1: Int32Array) {
  console.info('wait begin::');
  // 使用Atomics进行操作
  let res = Atomics.wait(arg1, 0, 0, 3000);
  return res;
}
@Entry
@Component
struct sharedArrayBuffer {
  @State message: string = 'Hello World';
  build() {
    RelativeContainer() {
      Text(this.message)
        .id('HelloWorld')
        .fontSize(50)
        .fontWeight(FontWeight.Bold)
        .alignRules({
          center: { anchor: '__container__', align: VerticalAlign.Center },
          middle: { anchor: '__container__', align: HorizontalAlign.Center }
        })
        .onClick(() => {
          // 定义可共享对象
          let sab: SharedArrayBuffer = new SharedArrayBuffer(20);
          let int32 = new Int32Array(sab);
          let task: taskpool.Task = new taskpool.Task(transferAtomics, int32);
          taskpool.execute(task).then((res) => {
            console.info('this res is: ' + res);
          });
          setTimeout(() => {
            Atomics.notify(int32, 0, 1);
          }, 1000);
          this.message = 'success';
        })
    }
    .height('100%')
    .width('100%')
  }
}
```