# React Native框架+H5接入智能填充
---
# React Native框架+H5接入智能填充
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8b/v3/FY9RQZaVQHCNBMKYtBHOvg/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111642Z&HW-CC-Expire=86400&HW-CC-Sign=B95635B2FD08A08C76789868C1829305F2802AEB6DB3D6DA3F03283AA7CBFAF8)
目前仅支持已适配HarmonyOS的三方框架应用使用。
HarmonyOS版React Native环境搭建请参考官方文档 [React Native环境搭建指导](https://gitcode.com/openharmony-sig/ohos_react_native?source_module=search_result_repo) 。
#### 前提条件
-
设备智能填充开关必须处于打开状态，请前往“设置 > 隐私和安全 > 智能填充”页面开启开关。
-
设备已连接互联网并且登录华为账号。
-
该应用需已接入 [智能填充服务](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-introduction-to-smart-fill#申请接入智能填充服务) 。
#### 开发准备
配置React Native已适配HarmonyOS的工程。
#### React Native输入框效果图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/09/v3/tGwcsXB9RU-wabbEBaDAVw/zh-cn_image_0000002573855107.png?HW-CC-KV=V1&HW-CC-Date=20260421T111642Z&HW-CC-Expire=86400&HW-CC-Sign=13F89CD81055A8373C35A1F5B01D7A350DD2CCC280B15EAADA2D62B55F180075)
#### 示例代码
在React Native输入框TextInput需要配置 [textContentType](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-mappingrelationship#react-native-textcontenttype和harmonyos的contenttype的映射关系) 属性来支持智能填充，代码如下：
```javascript
import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  default: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
    height: 80,
    width: 200,
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  label: {
    width: 140,
    textAlign: 'right',
    marginRight: 10,
    paddingTop: 2,
    fontSize: 15,
  },
  inputContainer: {
    flex: 1,
  }
});
class WithLabel extends React.Component<$FlowFixMeProps> {
  render(): React.Node {
    return (
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.inputContainer}>{this.props.children}</View>
      </View>
    );
  }
}
const RNTesterApp = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WithLabel label="昵称">
        <TextInput textContentType="nickname" style={styles.default} />
      </WithLabel>
      <WithLabel label="姓名">
        <TextInput textContentType="name" style={styles.default} />
      </WithLabel>
      <WithLabel label="手机号">
        <TextInput textContentType="telephoneNumber" style={styles.default} />
      </WithLabel>
      <WithLabel label="邮件">
        <TextInput textContentType="emailAddress" style={styles.default} />
      </WithLabel>
      <WithLabel label="身份证号">
        <TextInput textContentType="idCardNumber" style={styles.default} />
      </WithLabel>
      <WithLabel label="全部地址">
        <TextInput textContentType="formatAddress" style={styles.default} />
      </WithLabel>
      <WithLabel label="带街道的详细地址">
        <TextInput textContentType="fullStreetAddress" style={styles.default}  />
      </WithLabel>
      <WithLabel label="不带街道的详细地址">
        <TextInput textContentType="detailInfoWithoutStreet" style={styles.default} />
      </WithLabel>
    </View>
  );
};
export default RNTesterApp;
```
#### React Native框架中加载的H5页面效果图
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/9f/v3/9EPcwG49QeOcLAREj0w_jw/zh-cn_image_0000002573975089.png?HW-CC-KV=V1&HW-CC-Date=20260421T111642Z&HW-CC-Expire=86400&HW-CC-Sign=E0F201A30FB787D282613E752E3349F75459C173BA185A049F0B48AD95CFC17F)
React Native框架加载H5页面场景，通过给form表单的input输入框（form表单的子节点）配置 [autocomplete](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-mappingrelationship#h5-autocomplete和harmonyos的contenttype的映射关系) 属性来支持智能填充，代码如下：
```javascript
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
const RNTesterApp = () => {
  return (
    <View style={{width: '100%', height: '100%'}}>
      <WebView
        source={require('./autofill_h5.html')}
        style={{flex: 1, paddingTop: 50}}
      />
    </View>
  );
};
export default RNTesterApp;
```
autofill_h5.html实现参考 [示例代码二](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/scenario-fusion-h5#示例代码二) 。