# OriginOpType
---
# OriginOpType
#### 函数功能
设置原始模型的算子类型或算子类型列表。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/jl3ITOxZSf6SBLuxkvkdpg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111900Z&HW-CC-Expire=86400&HW-CC-Sign=DA96663FCC2955F0CC47E925C95083EB44B8C7DD1ACBFB7B982789F94D7DD39E)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
OpRegistrationData &OriginOpType(const std::vector<ge::AscendString> &ori_op_type_list);
OpRegistrationData &OriginOpType(const char_t *ori_op_type);
OpRegistrationData &OriginOpType(const std::initializer_list<std::string> &ori_optype_list);
OpRegistrationData &OriginOpType(const std::string &ori_optype);
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| ori_op_type_list/ori_optype_list | 输入 | 原始模型算子类型列表 |
| ori_op_type/ori_optype | 输入 | 原始模型算子类型 |