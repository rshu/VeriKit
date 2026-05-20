# SetData
---
# SetData
#### 函数功能
向Tensor中设置数据。
#### 函数原型
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/ac/v3/Cvg4ZuWxQUemcCysoHc7TQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111917Z&HW-CC-Expire=86400&HW-CC-Sign=D4F1B7DD57D1857C10310B2F2A4A7C68D5E2C7D135C57114BC0C796728EEE74A)
数据类型为string的接口后续版本会废弃，建议使用数据类型为非string的接口。
```cpp
graphStatus SetData(std::vector<uint8_t> &&data);
graphStatus SetData(const std::vector<uint8_t> &data);
graphStatus SetData(const uint8_t *data, size_t size);
graphStatus SetData(const std::string &data);
graphStatus SetData(const char_t *data);
graphStatus SetData(const std::vector<std::string> &data);
graphStatus SetData(const std::vector<AscendString> &datas);
graphStatus SetData(uint8_t *data, size_t size, const Tensor::DeleteFunc &deleter_func);
```
#### 参数说明
| 参数名 | 输入/输出 | 描述 |
| --- | --- | --- |
| data/datas | 输入 | 需设置的数据。 |
| size | 输入 | 数据的长度，单位为字节。 |
| deleter_func | 输入 | 用于释放data数据。using DeleteFunc = std::function<void(uint8_t *)>; |
#### 返回值
| 类型 | 描述 |
| --- | --- |
| graphStatus | 设置成功返回GRAPH_SUCCESS，否则，返回GRAPH_FAILED。 |
#### 异常处理
无
#### 约束说明
无