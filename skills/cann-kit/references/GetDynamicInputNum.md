# GetDynamicInputNum
---
# GetDynamicInputNum
#### 函数功能
获取算子的动态Input的实际个数。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/98/v3/GnShU8oDQMiZS6-rZmaKUg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111852Z&HW-CC-Expire=86400&HW-CC-Sign=8006862B2F06A9F9C72F63A9030FEEF60423D9B442181EA3E551796918B4AAB5)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
int32_t GetDynamicInputNum(const std::string &name) const;
int32_t GetDynamicInputNum(const char_t *name) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子的动态Input名。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| int | 实际动态Input的个数。当name非法，或者算子无动态Input时，返回-1。 |
#### 约束说明
无