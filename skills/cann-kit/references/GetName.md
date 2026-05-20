# GetName
---
# GetName
#### 函数功能
获取算子名称。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ea/v3/Of0ZwTcWRNaBU8NQDuSp0w/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111854Z&HW-CC-Expire=86400&HW-CC-Sign=C65B02833605A0D50CCC04A68C8BD99FAC3E24EB459A0585E93B1003434A023A)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
std::string GetName() const;
graphStatus GetName(AscendString &name) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输出 | 算子名称。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | GRAPH_FAILED：失败。GRAPH_SUCCESS：成功。 |
#### 异常处理
无
#### 约束说明
无