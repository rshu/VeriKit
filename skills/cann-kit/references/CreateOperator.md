# CreateOperator
---
# CreateOperator
#### 函数功能
基于算子名称和算子类型获取算子对象实例。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/10/v3/b3VZ22QWTQe5cO0UoZASMg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111850Z&HW-CC-Expire=86400&HW-CC-Sign=E137D5C95DA9D82E68ADC100B482A8A5C634B8DA0524877E12234DED9E557A60)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
static Operator CreateOperator(const std::string &operator_name, const std::string &operator_type)
static Operator CreateOperator(const char_t *const operator_name, const char_t *const operator_type)
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| operator_name | 输入 | 算子名称。 |
| operator_type | 输入 | 算子类型。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| string | 算子对象实例。 |
#### 约束说明
无