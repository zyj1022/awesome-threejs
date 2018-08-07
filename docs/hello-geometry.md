# Hellow Three.js 之 创建各种几何形状

> [Demo查看](../demo/hello-threejs/hello-geometry.html)

![geometry](./images/geometry.png) 

## 几何模型(Geometries)

几何形状（Geometry）最主要的功能是储存了一个物体的顶点信息。WebGL需要程序员指定每个顶点的位置，而在Three.js中，可以通过指定一些特征来创建几何形状，例如使用半径创建一个球体，从而省去程序员一个个指定顶点的工作量。

基本几何形状包括：立方体、平面、球体、圆柱体、四面体、八面体等几何形状，以及以三维文字作为几何形状的方法。

### BoxGeometry

盒型几何是四边形的原始几何类。它通常用于创建一个立方体或带有“宽度”、“高度”和“深度”构造函数参数的不规则四边形。

`BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)`

- width — X轴上的面的宽度
- height — Y轴上的面的高度
- depth — Z轴上的面的深度
- widthSegments — 可选参数. 沿宽度面的分割面数量. 默认值为1.
- heightSegments — 可选参数. 沿高度面的分割面数量. 默认值为1.
- depthSegments — 可选参数. 沿深度面的分割面数量. 默认值为1.

更多，请参看demo代码部分。

------

本文部分内容参照及引用：

> [Three.js入门指南](http://www.ituring.com.cn/book/1272)
