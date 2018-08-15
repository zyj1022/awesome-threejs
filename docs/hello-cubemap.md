# 创建自己的全景图

> [Demo查看](../demo/hello-threejs/hello-cubemap.html)

![cubemap](./images/cubemap.png)

## 1.环境纹理

首先什么是环境纹理？在WebGL或者OpenGL中他们实际上是种特殊的立方体纹理。一个立方体纹理是对整个场景（虚拟的或现实的）的观察，场景的样子被“贴”在了立方体的内部表面。想象一下，你站在山顶，向前看，向左看，向右看，向上看，向下看，最后向后看。每一次你都看到了这个“立方体”的内部表面，你就站在这个立方体的中心。如果这个立方体足够大，就很难分辨出立方体的棱和角，而给你一种错觉：你处在一个很大的环境里面。如果你还没弄明白，那么维基百科上的 [cube maps](http://en.wikipedia.org/wiki/Cube_mapping) 条目会非常有帮助。

这很酷，但是这怎么用？我们可以像做反射和折射一样，而且事实上这两者的函数都已经内建在GLSL，WebGL的着色器语言上了。你只需要传递给着色器6张纹理图片，每张代表立方体的一个内表面，然后告诉WebGL这是个立方体纹理，然后就可以使用上面的效果了。

半轴：这个术语服务于立方体纹理。因为我们通常使用三个轴来描述三维空间：x轴、y轴、z轴，所以用于立方体纹理的图片也用轴的名称来标识了。一共六张图片，每个轴两张图片，正半轴一个，负半轴一个。

## 全景图片

全景图片可以是室内外比较空旷的地方，需要专门的应用拍摄，将图片做成了贴到球体上的那种，之后转换到立方体上。在此不赘述。

处理完成会获得与立方体六个面对应到6张图片，就是我们需要到环境纹理图。

## 4.加入场景

现在我们已经获得了环境纹理，然后将其载入到场景中。Three.js使这变得非常简单：

```
// 纹理图像的url
var path = "./demo/images/Bridge/";
var format = '.jpg';
var urls = [
	path + 'posx' + format, path + 'negx' + format,
	path + 'posy' + format, path + 'negy' + format,
	path + 'posz' + format, path + 'negz' + format
];

// 打包成我们需要的对象
reflectionCube = new THREE.CubeTextureLoader().load(urls);
// 设置格式为RGB
reflectionCube.format = THREE.RGBFormat;

```
现在只需要将cubemap指定到一个材质中去就可以了！

```
var torus = new THREE.Mesh(
	new THREE.TorusKnotGeometry(300,100,100),
	reflectionMaterial
);
```

效果可以查看demo。

------

本文部分内容参照及引用：

> [Create your own environment maps](https://aerotwist.com/tutorials/create-your-own-environment-maps/)
>
> [threejs-intro](http://davidscottlyons.com/threejs-intro/)
> 
