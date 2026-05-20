# 静态方式加载Native模块
---
# 静态方式加载Native模块
在ES6(ECMAScript 6.0)模块设计中，使用import语法加载其他文件导出的内容是ECMA规范所定义的语法规则。为支持开发者使用该功能导入Native模块（so）导出的内容，ArkTS进行了相关适配，并提供了以下几种支持写法。
#### 直接导入
在Native模块的index.d.ts文件中导出，并在文件内直接导入。
#### 具名导入
```
// libentry.so对应的index.d.ts。
export const add: (a: number, b: number) => number;
```
```
// NameImport.ets
import { add } from 'libentry.so'
add(2, 3);
```
#### 默认导入
```
// libentry.so对应的index.d.ts。
export const add: (a: number, b: number) => number;
```
```
// DefaultImport.ets
import entry from 'libentry.so'
entry.add(2, 3);
```
#### 命名空间导入
```
// libentry.so对应的index.d.ts。
export const add: (a: number, b: number) => number;
```
```
// NamespaceImport.ets
import * as entry from 'libentry.so'
entry.add(2, 3);
```
#### 间接导入
#### 转为具名变量导出再导入
```
// libentry.so对应的index.d.ts。
export const add: (a: number, b: number) => number;
```
```
// NameExport.ets
// 将libentry.so的API封装后导出
import { add } from 'libentry.so';
export { add };
```
```
// NameImportFromExport.ets
// 从中间模块导入API
import { add } from './NameExport';
const result = add(2, 3);
```
#### 转为命名空间导出再导入
```
// libentry.so对应的index.d.ts。
export const add: (a: number, b: number) => number;
```
```
// NamespaceExport.ets
export * from 'libentry.so'
```
```
// NamespaceImportFromExport.ets
import { add } from './NamespaceExport'
add(2, 3);
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/3c/v3/BW3s3bDORNSr7QSfhiWQGQ/caution_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110821Z&HW-CC-Expire=86400&HW-CC-Sign=5EE00749257AADF2DBC582C5247C557088E0CC66C39C2003E54951B0B7482211)
不支持Native模块导出和导入同时使用命名空间。
**反例：**
```
// test1.ets
export * from 'libentry.so'
```
```
// test2.ets
import * as add from './test1'
// 无法获取add对象
```
#### 动态导入
#### 直接导入
```
// libentry.so对应的index.d.ts。
export const add: (a: number, b: number) => number;
```
```
// DynamicImport.ets
import('libentry.so').then((entry:ESObject) => {
  entry.default.add(2, 3);
})
```
#### 间接导入
```
// DynamicExport.ets
import entry from 'libentry.so'
export { entry }
```
```
// DynamicImportFromExport.ets
import('./DynamicExport').then((ns:ESObject) => {
  ns.entry.add(2, 3);
})
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/87/v3/6FBTz3gySzWI0rXhKbRnKg/caution_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T110821Z&HW-CC-Expire=86400&HW-CC-Sign=40F24023E34E0079C6100BC6A4D27B9C2C8975C131834E03CF9FB1FC9B6FAD32)
不支持动态加载时，导出文件使用命名空间。
**反例：**
```
// test1.ets
export * from 'libentry.so'
```
```
// test2.ets
import('./test1').then((ns:ESObject) => {
    // 无法获取ns对象
})
```