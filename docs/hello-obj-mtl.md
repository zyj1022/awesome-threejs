# obj、mtl文件格式详解

研究3D模型，就免不了用到了.obj文件及.mtl文件。
对这两种格式文件内容一头雾水，所有总结归纳一下，以备学习。

# obj 文件

> obj文件格式是Wavefront公司为它的一套基于工作站的3D建模和动画软件"AdvancedVisualizer"开发的一种文件格式。

OBJ文件是一种标准的3D模型文件格式，很适合用于3D软件模型之间的互导。OBJ文件是一种文本文件格式，这就意味着你可以直接用写字板打开进行查看修改。目前几乎所有知名的3D软件都支持OBJ文件的读写，不过很多软件需要通过插件才能做到这一点。另外，作为一种优秀的文件格式，很多游戏引擎也都支持OBJ文件。


## OBJ文件特点
- 1、OBJ是一种3D模型文件，因此不包含动画、材质特性、贴图路径、动力学、粒子等信息。
- 2、OBJ文件主要支持多边形(Polygons)模型。
虽然OBJ文件也支持曲线(Curves)、表面(Surfaces)、点组材质(Point Group Materials)，但Maya导出的OBJ文件并不包括这些信息。
- 3、OBJ文件支持三个点以上的面，这一点很有用。
很多其它的模型文件格式只支持三个点的面，所以我们导入Maya的模型经常被三角化了，这对于我们对模型的再加工甚为不利。　　　　
- 4、OBJ文件支持法线和贴图坐标。

## OBJ文件基本结构

OBJ文件不需要任何种文件头(File Header)，尽管经常使用几行文件信息的注释作为文件的开头。
OBJ文件由一行行文本组成，注释行以一个“#”号(#)为开头，空格和空行可以随意加到文件中以增加文件的可读性。有字的行都由一两个标记字母也就是关键字 (Keyword)开头，关键字可以说明这一行是什么样的数据。多行可以逻辑地连接在一起表示一行，方法是在每一行最后添加一个连接符(\)。注意连接符(\)后面不能出现空格或tab格，否则将导致文件出错。

下列关键字可以在OBJ文件使用【关键字根据数据类型排列，每个关键字有一段简短描述】

- 顶点数据(Vertex data)：
  - v 几何体顶点 (Geometric vertices)
  - vt贴图坐标点 (Texture vertices)
  - vn顶点法线 (Vertex normals)
  - vp参数空格顶点 (Parameter space vertices)

- 自由形态曲线(Free-form curve)/表面属性(surface attributes):
  - deg度 (Degree)
  - bmat基础矩阵 (Basis matrix)
  - step步尺寸 (Step size)
  - cstype曲线或表面类型 (Curve or surface type)

- 元素(Elements):
  - p点 (Point)
  - l线 (Line)
  - f面 (Face)
  - curv曲线 (Curve)
  - curv2 2D曲线 (2D curve)
  - surf表面 (Surface)

- 自由形态曲线(Free-form curve)/表面主体陈述(surface body statements):
  - parm参数值 (Parameter values )
  - trim外部修剪循环 (Outer trimming loop)
  - hole内部整修循环 (Inner trimming loop)
  - scrv特殊曲线 (Special curve)
  - sp特殊的点 (Special point)
  - end结束陈述 (End statement)

- 自由形态表面之间的连接(Connectivity betweenfree-form surfaces):
  - con连接 (Connect)

- 成组(Grouping):
  - g组名称 (Group name)
  - s光滑组 (Smoothing group)
  - mg合并组 (Merging group)
  - o对象名称 (Object name)

- 显示(Display)/渲染属性(render attributes):
  - bevel导角插值 (Bevel interpolation)
  - c_interp颜色插值 (Color interpolation)
  - d_interp溶解插值 (Dissolve interpolation)
  - lod细节层次 (Level of detail)
  - usemtl材质名称 (Material name)
  - mtllib材质库 (Material library)
  - shadow_obj投射阴影 (Shadow casting)
  - trace_obj光线跟踪 (Ray tracing)
  - ctech曲线近似技术 (Curve approximation technique)
  - stech表面近似技术 (Surface approximation technique)


```
# obj对应的材质文件
# mtllib testvt.mtl
# 组名称
g default
# o 对象名称(Object name)
o testvt.obj
# 顶点
v -0.5 -0.5 0.1
v -0.5 -0.5 -0.1
v 0 0.5 0.1
v 0 0.5 -0.1
v 0.5 -0.5 0.1
v 0.5 -0.5 -0.1
# 纹理坐标
vt 0 1
vt 1 1
vt 0.5 0
# 顶点法线
vn 0 0 1
vn 0 0 -1
# 当前图元所用材质
usemtl Default
# s Smooth shading across polygons is enabled by smoothing groups.
# Smooth shading can be disabled as well.
s off
# v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3(索引起始于1)    
f 1/1/1 5/2/1 3/3/1
f 6/2/2 2/1/2 4/3/2
```

# mtl 文件

三维模型处理会要读取.mtl文件来获得材质信息。

 > .mtl文件（Material Library File）是材质库文件，描述的是物体的材质信息，ASCII存储，任何文本编辑器可以将其打开和编辑。一个.mtl文件可以包含一个或多个材质定义，对于每个材质都有其颜色，纹理和反射贴图的描述，应用于物体的表面和顶点。


 以下是一个材质库文件的基本结构：

 ```
 # 定义一个名为 'xxx'的材质
 newmtl xxx
 # 材质的环境光（ambient color）
 Ka 0 0 0
 # 散射光（diffuse color）用Kd
 Kd 0.784314 0.784314 0.784314
 # 镜面光（specular color）用Ks
 Ks 0 0 0
 # 折射值 可在0.001到10之间进行取值。若取值为1.0，光在通过物体的时候不发生弯曲。玻璃的折射率为1.5。
 Ni 1
 # 反射指数 定义了反射高光度。该值越高则高光越密集，一般取值范围在0~1000。
 Ns 400
 # 滤光透射率
 Tf 1 1 1
 # 渐隐指数描述 参数factor表示物体融入背景的数量，取值范围为0.0~1.0，取值为1.0表示完全不透明，取值为0.0时表示完全透明。
 d 1
 # 为漫反射指定颜色纹理文件
 map_Kd test_vt.bmp
```

```
newmtl B01
Ns 96.078431
Ka 1.000000 1.000000 1.000000
Kd 0.640000 0.640000 0.640000
Ks 0.000000 0.000000 0.000000
Ke 0.400000 0.400000 0.400000
Ni 1.000000
d 1.000000
illum 1
map_Kd http://www.xxx.com/demo/models/texture_X1/CO1_middle_mylar_backlight.png
```

注释：每个材质库可含多个材质定义，每个材质都有一个材质名。用newmtl mtlName来定义一个材质。对于每个材质，可定义它的颜色光照纹理反射等描述特征。


主要的定义格式如下文所示：

材质颜色光照

1、环境反射有以下三种描述格式，三者是互斥的，不能同时使用。

- Ka r g b    
  - 用RGB颜色值来表示，g和b两参数是可选的，如果只指定了r的值，则g和b的值都等于r的值。三个参数一般取值范围为0.0~1.0，在此范围外的值则相应的增加或减少反射率;
- Ka spectral file.rfl factor   
  - 用一个rfl文件来表示。factor是一个可选参数，表示.rfl文件中值的乘数，默认为1.0;
- Ka xyz x y z   
  - 用CIEXYZ值来表示，x，y，z是CIEXYZ颜色空间的各分量值。y和z两参数是可选的，如果只指定了x的值，则y和z的值都等于r的值。三个参数一般取值范围为0~1。

2、漫反射描述的三种格式：
- Kd r g b
- Kd spectral file.rfl factor
- Kd xyz x y z

3、镜反射描述的三种格式:
- Ks r g b
- Ks spectral file.rfl factor
- Ks xyz x y z

4、滤光透射率描述的三种格式：
- Tf r g b
- Tf spectral file.rfl factor
- Tf xyz x y z

5、光照模型描述格式：

- illum illum_#
指定材质的光照模型。illum后面可接0~10范围内的数字参数。

- map_Kd -options args filename
为漫反射指定颜色纹理文件(.mpc)或程序纹理文件(.cxc)，或是一个位图文件。作用原理与可选参数与map_Ka同。

- map_Ks -options args filename
为镜反射指定颜色纹理文件(.mpc)或程序纹理文件(.cxc)，或是一个位图文件。作用原理与可选参数与map_Ka同。

- map_Ns -options args filename
为镜面反射指定标量纹理文件（.mps或.cxs）。可选参数如下所示：

  - blendu on | off
  - blendv on | off
  - clamp on | off
  - imfchan r | g | b | m | l | z
  - mm base gain
  - o u v w
  - s u v w
  - t u v w
  - texres value

- map_d -options args filename
为消隐指数指定标量纹理文件（.mps或.cxs）。作用原理和可选参数与map_Ns同。

- map_aat on
打开纹理反走样功能。
