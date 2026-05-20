# SetData
---
# SetData
#### 函数功能
设置Tensor的数据。
#### 函数原型
```cpp
void SetData(TensorData &&data)
```
#### 参数说明
| 参数 | 输入/输出 | 说明 |
| --- | --- | --- |
| data | 输入 | 需要设置的数据。关于TensorData类型的定义，请参见[TensorData](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-construction-and-destructor-functions)。 |
#### 返回值
无
#### 约束说明
无
#### 调用示例
```cpp
Tensor t = {{}, {}, {}, {}, nullptr};
void *a = &t;
TensorData td(a, nullptr);
t.SetData(std::move(td));
```