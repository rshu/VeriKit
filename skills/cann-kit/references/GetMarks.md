# GetMarks
---
# GetMarks
#### 函数功能
在资源类算子推理的上下文中，获取成对资源算子的标记。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/68/v3/e-HXIo8CT4abyXdw2fooyQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111845Z&HW-CC-Expire=86400&HW-CC-Sign=E3BA882A8464F2C289F283600513CC7F17F9856B83DA50C84CEF3AB2E3DB0F4A)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
const std::vector<std::string> &GetMarks() const
void GetMarks(std::vector<AscendString> &marks) const
```
#### 参数说明
无
#### 返回值
| 类型 | 描述 |
| --- | --- |
| const std::vector<std::string> | 资源类算子的标记。 |
#### 异常处理
无
#### 约束说明
无