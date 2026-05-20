# GetInputConstData
---
# GetInputConstData
#### 函数功能
如果指定算子Input对应的节点为Const节点，可调用该接口获取Const节点的数据。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6a/v3/EjR8LQjJSHedal3bsf_X1Q/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111853Z&HW-CC-Expire=86400&HW-CC-Sign=0EE8BEE6006BEBC92DA3CD54E4DF3AB6AB703DDD012D14C9D71BFEEAEA592B05)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
graphStatus GetInputConstData(const std::string &dst_name, Tensor &data) const;
graphStatus GetInputConstData(const char_t *dst_name, Tensor &data) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| dst_name | 输入 | 输入名称。 |
| data | 输出 | 返回Const节点的数据Tensor。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 如果指定算子Input对应的节点为Const节点且获取数据成功，返回GRAPH_SUCCESS，否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无