# GetSubgraph
---
# GetSubgraph
#### 函数功能
根据子图名称获取算子对应的子图。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/b2/v3/tRlqIU4FSFePSVCKu0XNzQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111854Z&HW-CC-Expire=86400&HW-CC-Sign=22A5133C89019510C9D414F41DD15E19C873FC006EAE8DD4EBCCD3F2DF49F89D)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
Graph GetSubgraph(const std::string &name) const;
Graph GetSubgraph(const char_t *name) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 子图名称。 |
#### 返回值
Graph对象。
#### 异常处理
无
#### 约束说明
无