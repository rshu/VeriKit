# OperatorCreatorRegister
---
# OperatorCreatorRegister
#### 函数功能
OperatorCreatorRegister构造函数和析构函数。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4d/v3/B0K5yZ8MQu6Scx1sOYigRQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111850Z&HW-CC-Expire=86400&HW-CC-Sign=6D4C5515747745B4EB7674E2169010B9B8B64495E82CABD7B86436CAF5F5C021)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
OperatorCreatorRegister(const std::string &operator_type, OpCreator const &op_creator);
OperatorCreatorRegister(const char_t *const operator_type, OpCreatorV2 const &op_creator);
~OperatorCreatorRegister() = default;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| operator_type | 输入 | 算子类型。 |
| op_creator | 输入 | 算子构造函数。 |
#### 返回值
OperatorCreatorRegister构造函数返回OperatorCreatorRegister类型的对象。
#### 约束说明
算子注册接口，注册一个算子原型，此接口被其他头文件引用，一般不用由算子开发者直接调用。