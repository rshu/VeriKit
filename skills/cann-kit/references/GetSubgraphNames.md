# GetSubgraphNames
---
# GetSubgraphNames
#### 函数功能
获取一个算子的子图名称列表。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bf/v3/Ul8uCFbZTcyDd-It0Ex2nA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111855Z&HW-CC-Expire=86400&HW-CC-Sign=7DA00161723BA8ADB726DF660B4288ED70FB40180E7974C97F288D46C980F1E6)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
std::vector<std::string> GetSubgraphNames() const;
graphStatus GetSubgraphNames(std::vector<AscendString> &names) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| names | 输出 | 获取一个算子的子图名称列表。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | GRAPH_FAILED：失败。GRAPH_SUCCESS：成功。 |
#### 异常处理
无
#### 约束说明
无