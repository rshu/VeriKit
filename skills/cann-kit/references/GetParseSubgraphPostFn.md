# GetParseSubgraphPostFn
---
# GetParseSubgraphPostFn
#### 函数功能
根据算子类型，获取算子注册的子图中输入输出节点跟算子的输入输出的对应关系实现的函数对象。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/fBhJTuisRti731KF7A_J0A/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111904Z&HW-CC-Expire=86400&HW-CC-Sign=1162908AD3F3EBF4C64483F91FF017DC67E0BD62CFE033C5B6C6CA34337FADF7)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
-
**ParseSubgraphFunc GetParseSubgraphPostFn() const**
该函数会返回ParseSubgraphFunc类型的函数对象，ParseSubgraphFunc函数的声明如下。
```cpp
using ParseSubgraphFunc = std::function<Status(const std::string &subgraph_name, const ge::Graph &graph)>
```
-
**Status GetParseSubgraphPostFn(ParseSubgraphFuncV2 &func) const**
该函数会返回ParseSubgraphFuncV2类型的函数对象，ParseSubgraphFuncV2函数的声明如下。
```cpp
using ParseSubgraphFuncV2 = std::function<Status(const ge::AscendString &subgraph_name, const ge::Graph &graph)>
```
#### 参数说明
-
GetParseSubgraphPostFn()函数
无
-
GetParseSubgraphPostFn(ParseSubgraphFuncV2 &func)函数
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| func | 输出 | 实现算子注册的子图中输入输出节点跟算子的输入输出对应关系的函数对象。 |
#### 约束说明
无