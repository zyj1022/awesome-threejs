# Hellow Three.js Pro 理解光源及应用

> [Demo查看](../demo/hello-threejs-pro/hell-light-shadow.html)

首选，在 Threejs 中 所有光源都是基于 `THREE.Light` 对象扩展而成的。

基本光源包含：

- `THREE.AmbientLight`
- `THREE.PointLight`
- `THREE.SpotLight`
- `THREE.DirectinalLight`

## THREE.AmbientLight

`THREE.AmbientLight` 创建时，颜色将会应用到全局，该光源并没有特别的来源方向，而且它不会生成阴影，
所以，不能将 `THREE.AmbientLight` 作为场景中唯一的光源，因为它会把场景中的物体渲染为相同的颜色，无论什么形状。

在使用其它光源的时候同时使用它，目的是弱化阴影或给场景添加一些额外的颜色。

`AmbientLight( color, intensity )`

- color — 光源颜色的RGB数值。
- intensity  — 光源强度的数值。

**使用方法**

```
var ambientLight = new THREE.AmbientLight('#ff00ff');
scene.add(ambientLight);

```

## THREE.PointLight

`THREE.PointLight` 是一种单发光点、照射所有方向的光源，比如：夜空中的照明弹。该光源不会产生阴影（因为朝所有方向发散光线，在这种情况计算阴影对GPU负担太大）。

点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越远的物体会显得越暗。

**构造函数**

`PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )`

- color — 颜色的RBG数值。
- intensity — 光强的数值。
- distance - 光强为0处到光源的距离，0表示无穷大。
- decay - 沿着光照距离的衰退量。


**使用方法**

```
var pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

```

## THREE.SpotLight 

`THREE.SpotLight` 聚光灯光源，是一种锥形效果光源，属于常见光源，在产生阴影的时候比较有用。实例：手电筒。


**构造函数**

`SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )`

- color — 颜色的RBG数值。
- intensity — 光强的数值。
- distance -- 光强为0处到光源的距离，0表示无穷大。
- angle -- 光线散射角度，最大为Math.PI/2。
- penumbra -- 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
- decay -- 沿着光照距离的衰退量。

**使用方法**

```
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 100, 1000, 100 );

spotLight.castShadow = true; // 设置生成阴影

scene.add( spotLight );

```

**特有属性**

`target` 将聚光灯的焦点位于 `target.position` 处。

## THREE.DirectinalLight

`THREE.DirectinalLight` 方向光可以看做是距离很远的光源，所发出的光线都是平行的，比如太阳。

方向光和聚光灯光源的区别：

- 方向光不像聚焦光那样离目标越远越暗淡
- 被方向光光源照亮整个区域接收到的光强是一样的

**构造函数**

`DirectionalLight( color : Integer, intensity : Float )`

- color -- 光源颜色的RGB数值。
- intensity -- 光源强度的数值。


# 使用特殊光源生成高级光照效果

特殊光源：

- `THREE.HemisphereLight`
- `THREE.AreaLight`


## THREE.HemisphereLight

`THREE.AreaLight` 半球光光源，这种光源可以为室外场景创建更加自然点光照效果。

**应用场景**

当你在室外的时候，并不是所有光都来自上方，很多空气的散射、地面的反射，以及其它物体的反射，`THREE.AreaLight` 就是为这种情形创建的。

**构造函数**

`HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )`

- skyColor — 从天空发出光的颜色
- groundColor — 从地面发出光的颜色
- intensity — 光线照射的强度。默认值为1。

## THREE.AreaLight


`THREE.AreaLight` 平面光光源，可以从很大的平面发射光线，而不是单个点。

如果要使用 `THREE.AreaLight` 光源，就不能用我们之前一直使用的 `THREE.WebGLRenderer` 对象，因为平面光光源氏一种非常复杂的光源，会对  `THREE.WebGLRenderer` 造成非常严重的性能损失， 可以用  `THREE.WebGLDeferredRenderer` （WebGL的延迟渲染器）对象在渲染场景时，可以处理复杂光照或者是光源很多的情况。

需要引入额外的代码文件：

```
<script type="text/javascript" src="../libs/WebGLDeferredRenderer.js"></script>
<script type="text/javascript" src="../libs/ShaderDeferred.js"></script>
<script type="text/javascript" src="../libs/RenderPass.js"></script>
<script type="text/javascript" src="../libs/EffectComposer.js"></script>
<script type="text/javascript" src="../libs/CopyShader.js"></script>
<script type="text/javascript" src="../libs/ShaderPass.js"></script>
<script type="text/javascript" src="../libs/FXAAShader.js"></script>
<script type="text/javascript" src="../libs/MaskPass.js"></script>
```


# 镜头眩光效果

`THREE.LensFlare`  创建镜头光晕。

`LensflareElement( texture : Texture, size : Float, distance : Float, color : Color, blending : Materials )`

- texture -- THREE.Texture （可选） 
- size -- 像素尺寸 (-1 = 使用 texture.width) 
- distance -- 介于 (0-1) 的光源距离（0 = 在光源处）
- blending -- 混合模式 - 缺省为 THREE.NormalBlending 
- color -- 镜头光晕的颜色。




