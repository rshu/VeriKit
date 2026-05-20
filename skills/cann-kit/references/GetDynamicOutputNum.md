# GetDynamicOutputNum
---
# GetDynamicOutputNum
#### 函数功能
获取算子的动态Output的实际个数。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/2c/v3/JZHXAKHaSEillyNPQNypfw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111852Z&HW-CC-Expire=86400&HW-CC-Sign=68F1F0D67B62E883009B499564BDDF635A29F7472A5D2D018C608AE637617F8A)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
int32_t GetDynamicOutputNum(const std::string &name) const;
int32_t GetDynamicOutputNum(const char_t *name) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子的动态Output名。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| int | 实际动态Output的个数。当name非法，或者算子无动态Output时，返回0。 |
#### 约束说明
无