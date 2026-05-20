# GetDynamicSubgraphBuilder
---
# GetDynamicSubgraphBuilder
#### 函数功能
根据子图名称和子图索引获取算子对应的动态输入子图的构建函数对象。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/18/v3/KeJYWYhpRsuZre7v18Gnxw/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111853Z&HW-CC-Expire=86400&HW-CC-Sign=A74B0DC312B8C3C4DB75ACEAC037A25CCB8358A91FBA6AEDD6C2EF5E20B0D185)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
SubgraphBuilder GetDynamicSubgraphBuilder(const std::string &name, uint32_t index) const;
SubgraphBuilder GetDynamicSubgraphBuilder(const char_t *name, uint32_t index) const;
```
#### 参数说明
| 参数 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 子图名。 |
| index | 输入 | 同名子图的索引。 |
#### 返回值
SubgraphBuilder对象。
#### 异常处理
无
#### 约束说明
无