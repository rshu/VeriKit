# DataType
---
# DataType
#### 函数功能
定义算子参数数据类型。
#### 函数原型
```cpp
OpParamDef &DataType(std::vector<ge::DataType> types);
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| types | 输入 | 算子参数数据类型，ge::DataType请参考[DataType](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-ge-datatype)。 |
#### 返回值
[OpParamDef](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-paramtype) 算子定义。
#### 约束说明
无