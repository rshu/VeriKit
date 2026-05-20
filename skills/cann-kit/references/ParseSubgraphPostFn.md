# ParseSubgraphPostFn
---
# ParseSubgraphPostFn
#### 函数功能
根据算子类型，注册算子的子图中输入输出节点跟算子的输入输出的对应关系函数实现。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/XPYag3UFTLerdZlhuNioLQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111901Z&HW-CC-Expire=86400&HW-CC-Sign=BEEFC4238BFBA2C313CE10E2F7D30C7317CD6C0A1940133ECFA9AD7B90F2EC07)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
OpRegistrationData &ParseSubgraphPostFn(const ParseSubgraphFunc &subgraph_post_fn)
OpRegistrationData &ParseSubgraphPostFn(const ParseSubgraphFuncV2 &subgraph_post_fn);
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| subgraph_post_fn | 输入 | 子图中输入输出节点跟算子的输入输出的对应关系函数对象。详见[回调函数ParseSubgraphFuncV2](#回调函数parsesubgraphfuncv2)**。** |
#### 约束说明
无
#### 回调函数ParseSubgraphFuncV2
开发者自定义并实现ParseSubgraphFuncV2函数，完成解析子图中输入输出节点跟算子的输入输出的对应关系功能，回调函数原型定义如下。
```cpp
Status ParseSubgraphFuncV2(const ge::AscendString &subgraph_name, const ge::Graph &graph)
```
**表1** 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| subgraph_name | 输入 | 子图名字。 |
| graph | 输出 | 构造的子图。 |