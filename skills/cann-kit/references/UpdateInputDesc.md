# UpdateInputDesc
---
# UpdateInputDesc
#### 函数功能
根据算子Input名称更新Input的TensorDesc。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/UVCDFmcmQy-AEEWTk0DEug/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111857Z&HW-CC-Expire=86400&HW-CC-Sign=551B1AEA418C39F654C51437D532A155467B12E81EA28B1D78117F2EBDBA2469)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
graphStatus UpdateInputDesc(const std::string &name, const TensorDesc &tensor_desc);
graphStatus UpdateInputDesc(const char_t *name, const TensorDesc &tensor_desc);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子Input名称。 |
| tensor_desc | 输入 | TensorDesc对象。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 更新TensorDesc成功，返回GRAPH_SUCCESS， 否则，返回GRAPH_FAILED。 |
#### 异常处理
| 异常场景 | 说明 |
| --- | --- |
| 无对应name输入 | 函数提前结束，返回GRAPH_FAILED。 |
#### 约束说明
无