# GetOriginOpTypeSet
---
# GetOriginOpTypeSet
#### 函数功能
获取原始模型的算子类型集合。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/69/v3/gRUmA_W-S0mg3CM8X_uruQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111902Z&HW-CC-Expire=86400&HW-CC-Sign=2A9488221AA5753B07D81A5D364AEA27C2FDA1EA748A2EE149ACC4A5FBDA1DC4)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
std::set<std::string> GetOriginOpTypeSet () const;
Status GetOriginOpTypeSet(std::set<ge::AscendString> &ori_op_type) const;
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| ori_op_type | 输出 | 原始模型的算子类型集合。 |
#### 约束说明
无