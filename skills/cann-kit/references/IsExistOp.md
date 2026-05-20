# IsExistOp
---
# IsExistOp
#### 函数功能
查询指定的算子类型是否支持。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/14/v3/U6oU7cQ5TgOob4r7CbDzig/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111850Z&HW-CC-Expire=86400&HW-CC-Sign=991196392E7651D6819C3811F4C43323779C738DAB63010D692C3CF1B884B0FD)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
static bool IsExistOp(const std::string &operator_type)
static bool IsExistOp(const char_t *const operator_type)
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| operator_type | 输入 | 算子类型。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| bool | - true：支持此算子。- false：不支持此算子。 |
#### 约束说明
无