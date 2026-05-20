# GetOpsTypeList
---
# GetOpsTypeList
#### 函数功能
获取系统支持的所有算子类型列表。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/11/v3/cmXxqUmnTV6Uy89uaG-Lfg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111850Z&HW-CC-Expire=86400&HW-CC-Sign=ACDC8C2C1CA7C2C4BFCAFE3E3E23FEED12B24F8649E764A7FD3534E98C84DB06)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
static graphStatus GetOpsTypeList(std::vector<std::string> &all_ops);
static graphStatus GetOpsTypeList(std::vector<AscendString> &all_ops);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| all_ops | 输出 | 算子类型列表。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | - SUCCESS：执行成功。- FAILED：执行失败。 |
#### 约束说明
无