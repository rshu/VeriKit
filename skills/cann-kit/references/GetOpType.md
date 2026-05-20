# GetOpType
---
# GetOpType
#### 函数功能
获取算子类型。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/bc/v3/Fu1FwciEQdu8RXqleWQ_hA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111855Z&HW-CC-Expire=86400&HW-CC-Sign=B7EF2D7A0D6D253E96522F70EA01E58E1F8E92E78EB1109B884C53640C3C6892)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
std::string GetOpType() const;
graphStatus GetOpType(AscendString &type) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| type | 输出 | 算子类型。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | GRAPH_FAILED：失败。GRAPH_SUCCESS：成功。 |
#### 异常处理
无
#### 约束说明
无