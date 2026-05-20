# GetSubgraphBuilder
---
# GetSubgraphBuilder
#### 函数功能
根据子图名称获取算子对应的子图构建的函数对象。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/c3/v3/zSBTy60UTU2Q_9TYd3cTPg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111854Z&HW-CC-Expire=86400&HW-CC-Sign=B8B1736824AE1CE647E0A3FF43DAA80198FC8F61703F8F056EF8A71F00A719DD)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
SubgraphBuilder GetSubgraphBuilder(const std::string &name) const;
SubgraphBuilder GetSubgraphBuilder(const char_t *name) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 子图名称。 |
#### 返回值
SubgraphBuilder对象。
#### 异常处理
无
#### 约束说明
无