# SetInferDataType
---
# SetInferDataType
#### 函数功能
注册DataType推导函数。
#### 函数原型
```cpp
OpDef &SetInferDataType(gert::OpImplRegisterV2::InferDataTypeKernelFunc func);
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| func | 输入 | DataType推导函数。**InferDataTypeKernelFunc**类型定义如下。using InferDataTypeKernelFunc = UINT32 (*)(InferDataTypeContext *); |
#### 返回值
[OpDef](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-input) 算子定义。
#### 约束说明
无