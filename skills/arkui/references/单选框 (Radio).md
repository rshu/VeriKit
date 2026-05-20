# 单选框 (Radio)
---
# 单选框 (Radio)
Radio是单选框组件，通常用于提供相应的用户交互选择项，同一组的Radio中只有一个可以被选中。具体用法请参考 [Radio](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-radio) 。
#### 创建单选框
Radio通过调用 [RadioOptions](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-basic-components-radio#radiooptions对象说明) 来创建，以RadioOptions中的value和group为例：
```
Radio(options: {value: string, group: string})
```
其中，value是单选框的名称，group是单选框的所属群组名称。checked属性可以设置单选框的状态，状态分别为false和true，设置为true时表示单选框被选中。
Radio支持设置选中状态和非选中状态的样式。
```
Radio({ value: 'Radio1', group: 'radioGroup' })
  .checked(false)
Radio({ value: 'Radio2', group: 'radioGroup' })
  .checked(true)
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/8c/v3/2_ktGxw2TdOvMrgzIWHY5Q/zh-cn_image_0000002543213916.png?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=E4B071D234F35DDA1740D6BE7B0ECA74DA99F6A86E72827894A33DB26ADFA978)
#### 添加事件
除支持 [通用事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/ts-component-general-events) 外，Radio还用于选中后触发某些操作，可以绑定onChange事件来响应选中操作后的自定义行为。
```
Radio({ value: 'Radio1', group: 'radioGroup' })
  .onChange((isChecked: boolean) => {
    if(isChecked) {
      //需要执行的操作
      // ···
    }
  })
Radio({ value: 'Radio2', group: 'radioGroup' })
  .onChange((isChecked: boolean) => {
    if(isChecked) {
      //需要执行的操作
      // ···
    }
  })
```
#### 场景示例
通过点击Radio切换声音模式。
```
// xxx.ets
import { promptAction } from '@kit.ArkUI';
@Entry
@Component
export struct RadioExample {
  @State rst: promptAction.ShowToastOptions = { 'message': 'Ringing mode.' };
  @State vst: promptAction.ShowToastOptions = { 'message': 'Vibration mode.' };
  @State sst: promptAction.ShowToastOptions = { 'message': 'Silent mode.' };
  build() {
    // ···
      Row() {
        Column() {
          Radio({ value: 'Ringing', group: 'radioGroup' }).checked(true)
            .height(50)
            .width(50)
            .onChange((isChecked: boolean) => {
              if (isChecked) {
                // 切换为响铃模式
                this.getUIContext().getPromptAction().openToast(this.rst);
              }
            })
          Text('Ringing')
        }
        Column() {
          Radio({ value: 'Vibration', group: 'radioGroup' })
            .height(50)
            .width(50)
            .onChange((isChecked: boolean) => {
              if (isChecked) {
                // 切换为振动模式
                this.getUIContext().getPromptAction().openToast(this.vst);
              }
            })
          Text('Vibration')
        }
        Column() {
          Radio({ value: 'Silent', group: 'radioGroup' })
            .height(50)
            .width(50)
            .onChange((isChecked: boolean) => {
              if (isChecked) {
                // 切换为静音模式
                this.getUIContext().getPromptAction().openToast(this.sst);
              }
            })
          Text('Silent')
        }
      }.height('100%').width('100%').justifyContent(FlexAlign.Center)
    // ···
  }
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/6c/v3/D9uG7T3cR_KvmqHRbywFuA/zh-cn_image_0000002573853829.gif?HW-CC-KV=V1&HW-CC-Date=20260421T110853Z&HW-CC-Expire=86400&HW-CC-Sign=501858C5742922A1983262FFFED898984ED9FFD9049FA0FA6AF35B248B5D3196)