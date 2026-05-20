# DelInputWithOriginalType
---
# DelInputWithOriginalType
#### 函数功能
根据算子类型，删除算子指定输入边。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d8/v3/PigbjcVESiizSyYNE_moSQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111902Z&HW-CC-Expire=86400&HW-CC-Sign=68255F9557436DDCC22D00DDC9BF5FD5F32E8B58C6AB501E7A4FECC25D2F4AC8)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
OpRegistrationData &DelInputWithOriginalType(int32_t input_idx, const std::string &ori_type)
OpRegistrationData &DelInputWithOriginalType(int32_t input_idx, const char_t *ori_type)
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| input_idx | 输入 | 需要删除的输入边编号。 |
| ori_type | 输入 | 删除节点的原始算子类型。 |
#### 约束说明
无