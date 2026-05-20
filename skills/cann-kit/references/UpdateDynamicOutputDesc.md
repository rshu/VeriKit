# UpdateDynamicOutputDesc
---
# UpdateDynamicOutputDesc
#### 函数功能
根据name和index的组合更新算子动态Output的TensorDesc。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/63/v3/dGviOLMyTtC6Xigvr01zWA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111857Z&HW-CC-Expire=86400&HW-CC-Sign=8E23A373CC5186EDFFEC612CEC27DD54A1775CC242F2C9F392AA3D71CED6F41F)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
graphStatus UpdateDynamicOutputDesc(const std::string &name, uint32_t index, const TensorDesc &tensor_desc);
graphStatus UpdateDynamicOutputDesc(const char_t *name, uint32_t index, const TensorDesc &tensor_desc);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子动态Output的名称。 |
| index | 输入 | 算子动态Output编号。 |
| tensor_desc | 输入 | TensorDesc对象。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 更新动态Output成功，返回GRAPH_SUCCESS， 否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无