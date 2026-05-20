# DelInputWithCond
---
# DelInputWithCond
#### 函数功能
根据算子属性，删除算子指定输入边。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/cd/v3/SQ1IqjIRSD6AjS-6ml04MQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111902Z&HW-CC-Expire=86400&HW-CC-Sign=0AE4B7AD5632ED556A03DF01B8DB2D5798656A0D1B48FB26A1A3AFEF37086A52)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
OpRegistrationData &DelInputWithCond(int32_t inputIdx, const std::string &attrName, bool attrValue);
OpRegistrationData &DelInputWithCond(int32_t input_idx, const char_t *attr_name, bool attr_value);
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| inputIdx | 输入 | 需要删除的输入边编号。 |
| attrName | 输入 | 属性名字。 |
| attrValue | 输入 | 属性的值。 |
#### 约束说明
无