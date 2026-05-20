# GetOmOptype
---
# GetOmOptype
#### 函数功能
获取模型的算子类型。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/d3/v3/fOy9OWWbT4CuLWKS6dQi5A/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111902Z&HW-CC-Expire=86400&HW-CC-Sign=7C2A00F01C621C32F9C630B34E1557BBED5FE079F7F9307D686299AB6AB96514)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
std::string GetOmOptype () const;
Status GetOmOptype(ge::AscendString &om_op_type) const;
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| om_op_type | 输出 | 模型的算子类型。 |
#### 约束说明
无