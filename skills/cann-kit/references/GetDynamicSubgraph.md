# GetDynamicSubgraph
---
# GetDynamicSubgraph
#### 函数功能
根据子图名称和子图索引获取算子对应的动态输入子图。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/5a/v3/ChcDA9_aTVu_YBK9Hpfu1Q/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111853Z&HW-CC-Expire=86400&HW-CC-Sign=F088835D890433387513B360419035AA43DA5E664C1019031F5E70316996B78E)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
Graph GetDynamicSubgraph(const std::string &name, uint32_t index) const;
Graph GetDynamicSubgraph(const char_t *name, uint32_t index) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 子图名。 |
| index | 输入 | 同名子图的索引。 |
#### 返回值
Graph对象。
#### 异常处理
无
#### 约束说明
无