# GetValue
---
# GetValue
#### 函数功能
获取属性key-value键值对中的value值，并将value值从T类型转换为DT类型。
-
支持将INT类型转换为int64_t类型。
-
支持将FLOAT类型转换为float类型。
-
支持将STR类型转换为std::string类型。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/05/v3/gFZILvQ5QQWIUKARbgulMA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111843Z&HW-CC-Expire=86400&HW-CC-Sign=EC9E84D602D464E64DF39C39DC27B150E11EC2384FB6D6A18CC43D94E0C2BE6C)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
template<typename T, typename DT>
graphStatus GetValue(DT &val) const
graphStatus GetValue(AscendString &val);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| val | 输出 | DT类型的参数。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 数据类型转换成功，返回GRAPH_SUCCESS， 否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无