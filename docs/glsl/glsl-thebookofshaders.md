# The book of shaders 记录


## shader 语言


- main 函数
- 最终的像素颜色取决于预设的全局变量 gl_FragColor。
- vec4 四分量浮点向量 vec4(1.0,0.0,1.0,1.0), 四个变元分别响应红，绿，蓝和透明度通道
- vec3 三分量浮点向量
- vec2 二分量浮点向量

## uniform (统一值)

它们的数据类型通常为：float, vec2, vec3, vec4, mat2, mat3, mat4, sampler2D and samplerCube。

uniform 值需要数值类型前后一致。且在 shader 的开头，在设定精度之后，就对其进行定义。

```
uniform vec2 u_resolution; // 画布尺寸（宽，高）
uniform vec2 u_mouse;      // 鼠标位置（在屏幕上哪个像素）
uniform float u_time;     // 时间（加载后的秒数）
```

## gl_FragCoord

就像 GLSL 有个默认输出值 vec4 gl_FragColor 一样，它也有一个默认输入值（ vec4 gl_FragCoord ）。

gl_FragCoord存储了活动线程正在处理的像素或屏幕碎片的坐标。有了它我们就知道了屏幕上的哪一个线程正在运转。

为什么我们不叫 gl_FragCoord uniform （统一值）呢？因为每个像素的坐标都不同，所以我们把它叫做 `varying`（变化值）。

## 算法绘画

### 造型函数

- `pow()` - 求x的y次幂
- `exp()` - 以自然常数e为底的指数函数
- `log()` - 对数函数
- `sqrt()` - 平方根函数
- `abs()` - 绝对值
- `ceil()` - 向正无穷取整
- `floor()` - 向负无穷取整
- `fract()` - 只选取小数部分
- `clamp(x,0.0,1.0)` 把 x 的值限制在 0.0 到 1.0

***Step 和 Smoothstep***

- `step()` - 插值函数需要输入两个参数。第一个是极限或阀值，第二个是我们想要检测或通过的值。对任何小于阀值的值，返回 0.0，大于阀值，则返回 1.0。

 - `smoothstep()` - 当给定一个范围的上下限和一个数值，这个函数会在已有的范围内给出插值。前两个参数规定转换的开始和结束点，第三个是给出一个值用来插值。


## 颜色

在GLSL中，有个十分有用的函数：`mix()`

- `mix()` 函数：以百分比混合两个值。
- 百分比的取值范围:0~1

## 形状
