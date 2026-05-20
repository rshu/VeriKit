# MutableTensorData
---
# MutableTensorData
#### 函数功能
获取tensor中的数据。
#### 函数原型
```cpp
TensorData &MutableTensorData()
```
#### 参数说明
无
#### 返回值
可写的tensor data引用。
关于TensorData类型的定义，请参见 [TensorData](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-construction-and-destructor-functions) 。
#### 约束说明
无
#### 调用示例
```cpp
Tensor t = {{}, {}, {}, {}, nullptr};
const Tensor &ct = t;
std::vector<int> a = {10};
t.MutableTensorData() = TensorData{reinterpret_cast<void *>(a.data()), nullptr}; // 设置新tensordata
auto td = t.GetTensorData(); // TensorData{a, nullptr}
```