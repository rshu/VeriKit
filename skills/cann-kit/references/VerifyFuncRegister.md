# VerifyFuncRegister
---
# VerifyFuncRegister
#### 函数功能
VerifyFuncRegister构造函数和析构函数。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/96/v3/K7fw2bupRWmRcZE5DXrgcw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111921Z&HW-CC-Expire=86400&HW-CC-Sign=0965E7BEDA4A38326168084EEE79497ADA6075967EDCD02F391B6212F7D7CBE3)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
VerifyFuncRegister(const std::string &operator_type, const VerifyFunc &verify_func);
VerifyFuncRegister(const char_t *const operator_type, const VerifyFunc &verify_func);
~VerifyFuncRegister() = default;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| operator_type | 输入 | 算子类型。 |
| verify_func | 输入 | 算子verify函数。 |
#### 返回值
VerifyFuncRegister构造函数返回VerifyFuncRegister类型的对象。
#### 约束说明
算子verifyFunc函数注册接口，此接口被其他头文件引用，一般不用由算子开发者直接调用。