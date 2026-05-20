# SetMarks
---
# SetMarks
#### 函数功能
在资源类算子推理的上下文中，设置成对资源算子的标记。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/51/v3/ZxAuajzvQUC4Qfrdxv9AyQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111845Z&HW-CC-Expire=86400&HW-CC-Sign=2237CB1A7AC87CEB87CA581635639098B6421DDFD5E1DA89559CD2D0CFAA3748)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
void SetMarks(const std::vector<std::string> &marks)
void SetMarks(const std::vector<AscendString> &marks)
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| marks | 输入 | 资源类算子的标记。 |
#### 返回值
无
#### 异常处理
无
#### 约束说明
无