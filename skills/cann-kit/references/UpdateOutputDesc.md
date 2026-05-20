# UpdateOutputDesc
---
# UpdateOutputDesc
#### 函数功能
根据算子Output名称更新Output的TensorDesc。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b1/v3/qLZiEpILQvSjbhDlHS2R3w/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111857Z&HW-CC-Expire=86400&HW-CC-Sign=D6CD2A66EF45B8BFDA3FBF01E45FCC4660A4A3FAEE5EE97880ECCBCBB69E16CC)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
graphStatus UpdateOutputDesc(const std::string &name, const TensorDesc &tensor_desc);
graphStatus UpdateOutputDesc(const char_t *name, const TensorDesc &tensor_desc);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子Output名称。 |
| tensor_desc | 输入 | TensorDesc对象。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 更新TensorDesc成功，返回GRAPH_SUCCESS， 否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无