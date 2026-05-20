# GetDynamicInputDesc
---
# GetDynamicInputDesc
#### 函数功能
根据name和index的组合获取算子动态Input的TensorDesc。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9a/v3/_YIeU88ITkWvB0tmldbquA/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111852Z&HW-CC-Expire=86400&HW-CC-Sign=524DC97A72B3DF06EF5C73A7D428BB14A4E94361320DAA0F9D500ABE3EAD43AD)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
TensorDesc GetDynamicInputDesc(const std::string &name, uint32_t index) const;
TensorDesc GetDynamicInputDesc(const char_t *name, uint32_t index) const;
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| name | 输入 | 算子动态Input的名称。 |
| index | 输入 | 算子动态Input编号，编号从0开始。 |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| [TensorDesc](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/cannkit-tensordesc-construction-and-destructor) | 获取TensorDesc成功，则返回算子动态Input的TensorDesc；获取失败，则返回TensorDesc默认构造的对象，其中，主要设置DataType为DT_FLOAT（表示float类型），Format为FORMAT_NCHW（表示NCHW）。 |
#### 异常处理
无
#### 约束说明
无