# OpenGL ES平台
---
# OpenGL ES平台
#### 业务流程
基于OpenGL ES图形API平台，超帧顶点标记的主要业务流程如下：
-
增强模式运动估计原理
开发阶段，开发者需要使用系统的图形驱动库提供的OpenGL ES接口，在期望被标记的物体绘制前后添加上开始标记指令和结束标记指令。运行阶段，基于OpenGL ES的Transform Feedback（变换反馈）特性，被标记的所有Draw Call处理的顶点数据将被缓存，再通过顶点匹配、运动估计、屏幕空间投影等过程，得到高精度运动向量，最终绘制出预测帧。运行阶段流程如下图所示：
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/fc/v3/FaXW5aXjSg2UBMnt5fLfPA/zh-cn_image_0000002573974631.png?HW-CC-KV=V1&HW-CC-Date=20260421T111416Z&HW-CC-Expire=86400&HW-CC-Sign=584226A646829DE6DFE2A4D1D4A9FCD28ACE84AEDEA006298F0B6A2D91666157)
-
顶点标记原则
被标记的物体能在运动估计阶段得到更高精度的运动向量图（MV，Motion Vector），但需要付出额外的性能代价，开发者需要在这之间做出平衡。 **建议只标记画面中相对场景运动的物体** ，因为相对场景运动的物体的顶点数量较少，但运动预测却最为困难，这样的标记方式能以少量的性能代价换取较明显的超帧画质收益。
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/44/v3/jrBLd5dmQJ2_s9oMi7zKbQ/notice_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111416Z&HW-CC-Expire=86400&HW-CC-Sign=20561DD23CF8D256B4B3C93A274DB2AA4D2F781E339F4EC80EC48106BB27EF5A)
**请在会影响最终深度缓冲区写入的渲染Pass中，标记对应的Draw Call** 。比如对于延迟管线，建议在gbuffer pass中标记；对于有pre depth的前向管线，建议在pre depth pass标记；对于无pre depth的前向管线，建议在base pass（也叫forward pass）中进行标记。并且注意，不要在生成shadowmap pass中的动态物体Draw Call进行标记。
#### 开发步骤
本节阐述基于OpenGL ES图形API平台的超帧调用示例。详细代码请参考 [图形开发Sample（超帧GLES）](https://gitcode.com/harmonyos_samples/frame-generation-gles-samplecode-clientdemo-cpp) 。
1.
设置meta-data。设置GraphicsAccelerateKit_VBMV为true，来通知系统支持顶点标记。
```json
{
    "module": {
         /*
          其他的配置项
          ...
         */
        "metadata": [
            {
                "name": "GraphicsAccelerateKit_VBMV",
                "value": "true"
            }
        ]
    }
}
```
2.
定义glHint扩展宏，标记需要得到更高精度MV的物体顶点。
```cpp
// 引用头文件
#include <GLES3/gl32.h>
// 定义glHint的拓展宏
#define GL_DRAWCALL_HINT 0x8193
#define GL_START 0x8194
#define GL_END 0x8195
// 声明动态物体的顶点数量
GLsizei vertices;
// 循环渲染帧
void UpdateAndRenderOpaqueScene()
{
    /* Do something prepare ... */
    glHint(GL_DRAWCALL_HINT, GL_START);       // 绘制动态物体前，开始记录顶点数据
    glDrawArrays(GL_TRIANGLES, 0, vertices);  // 被记录的动态物体顶点绘制
    glHint(GL_DRAWCALL_HINT, GL_END);         // 绘制动态物体后，结束记录顶点数据
    /* Do something post process... */
}
```
![](https://contentcenter-vali-drcn.dbankcdn.cn/pvt_2/DeveloperAlliance_scene_100_1/4c/v3/6YiDDDXoQDiv88e2wGGAQQ/note_3.0-zh-cn.png?HW-CC-KV=V1&HW-CC-Date=20260421T111416Z&HW-CC-Expire=86400&HW-CC-Sign=C19CBEBEE2D665E72BBC277748DE824A984D66466058E833C503B9B9B6AFB652)
宏名GL_DRAWCALL_HINT 、GL_START 、GL_END均为HarmonyOS 5.0.x及以上版本独有的拓展宏，且仅在马良910 GPU及以上的手机平板设备上被HarmonyOS的系统实现和定义，在其他芯片平台上运行时标记无效，但不会影响应用的正常运行。