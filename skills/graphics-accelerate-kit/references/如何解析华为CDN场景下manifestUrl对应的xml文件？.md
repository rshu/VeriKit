# 如何解析华为CDN场景下manifestUrl对应的xml文件？
---
# 如何解析华为CDN场景下manifestUrl对应的xml文件？
推荐使用 [@ifbear/fast-xml-parser](https://ohpm.openharmony.cn/#/cn/detail/@ifbear%2Ffast-xml-parser) 。
执行如下命令行，安装依赖。
```typescript
To use as package dependency $ ohpm install @ifbear/fast-xml-parser
```
示例代码：
```typescript
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const parser = new XMLParser();
let jObj = parser.parse(XMLdata);
```