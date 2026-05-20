# SetName
---
# SetName
#### 函数功能
向TensorDesc中设置Tensor的名称。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bb/v3/tvyOVNv4TeqJEBeaop-DUg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111912Z&HW-CC-Expire=86400&HW-CC-Sign=A3C35AA34C0F820ECEBEFDDDAB94422A9463B377E0889D1B2A2DE0DFEFFFB519)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
void SetName(const std::string &name);
void SetName(const char_t *name);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 需设置的Tensor的名称。 |
#### 返回值
无
#### 异常处理
无
#### 约束说明
无