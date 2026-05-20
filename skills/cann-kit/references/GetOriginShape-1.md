# GetOriginShape
---
# GetOriginShape
#### 函数功能
获取Tensor的原始shape。
#### 函数原型
```cpp
const Shape &GetOriginShape() const
```
#### 参数说明
无
#### 返回值
只读的原始shape引用。
关于Shape类型的定义，请参见 [Shape](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-shape-construction-and-destructor) 。
#### 约束说明
无
#### 调用示例
```cpp
StorageShape sh({1, 2, 3}, {2, 1, 3});
Tensor t = {sh, {}, {}, ge::DT_FLOAT, nullptr};
auto shape = t.GetOriginShape(); // 1,2,3
```