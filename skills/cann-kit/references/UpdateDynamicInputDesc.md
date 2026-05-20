# UpdateDynamicInputDesc
---
# UpdateDynamicInputDesc
#### 函数功能
根据name和index的组合更新算子动态Input的TensorDesc。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/1d/v3/h7781rh7TLywY26QBMjwFA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111857Z&HW-CC-Expire=86400&HW-CC-Sign=75F51614DAA85D4D087CCB765E24934613794D0A0903E461710744E019687869)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
graphStatus UpdateDynamicInputDesc(const std::string &name, uint32_t index, const TensorDesc &tensor_desc);
graphStatus UpdateDynamicInputDesc(const char_t *name, uint32_t index, const TensorDesc &tensor_desc);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子动态Input的名称。 |
| index | 输入 | 算子动态Input编号，编号起始值从1开始。 |
| tensor_desc | 输入 | TensorDesc对象。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 更新动态Input成功，返回GRAPH_SUCCESS， 否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无