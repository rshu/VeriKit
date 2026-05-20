# GetName
---
# GetName
#### 函数功能
获取TensorDesc所描述Tensor的名称。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/33/v3/bbjoKDAmT9Wpz3qOpgDekg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111909Z&HW-CC-Expire=86400&HW-CC-Sign=F61C5DA3F0EF9FD743D6D508489718EE3932F72B68063CAD78559C78BEB0EF33)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
std::string GetName() const;
graphStatus GetName(AscendString &name);
graphStatus GetName(AscendString &name) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输出 | 算子名称。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 获取name成功，返回GRAPH_SUCCESS， 否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无