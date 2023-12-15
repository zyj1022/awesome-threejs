# [Awesome-threejs](https://github.com/zyj1022/awesome-threejs/)

搜集并学习threejs的相关知识总结、Demo、站点、书籍等，欢迎有兴趣的小伙伴一起交流学习。

## [Threejs](https://threejs.org)

three.js是以webgl为基础的库，封装了一些3D渲染需求中重要的工具方法与渲染循环。WebGL门槛相对较高,Three.js对WebGL提供的接口进行了非常好的封装，简化了很多细节，大大降低了学习成本。查看[官方实例](https://threejs.org/examples/)

## 基础入门

### 问-学-记

个人学习过程中的疑问记录及demo演示，小白入门开始教程之Hello Threejs。

- [x] [什么是WebGL?](./docs/what-webgl.md)
- [x] [开始第一个Hello world](./docs/hello-world.md)
- [x] [三维空间中观察物体的方法--照相机](./docs/hello-camera.md)
- [x] [创建各种几何形状](./docs/hello-geometry.md)
- [x] [光影之谜](./docs/hello-light.md)
- [x] [给创建的物体赋予材质](./docs/hello-material.md)
- [x] [让物体动起来](./docs/hello-tween.md)
- [x] [运动3D物体的性能监测](./docs/hello-stats.md)
- [x] [加载外部3D模型](./docs/hello-loader.md)
- [x] [有趣的着色器](./docs/hello-shaders.md)
- [x] [创建自己的全景图](./docs/hello-cubemap.md)
- [x] [obj、mtl文件格式详解](./docs/hello-obj-mtl.md)

## 进阶教程

- [x] [理解光源的应用](./docs/hello-light-pro.md)
- [ ] 粒子效果点云
- [ ] 使用二元操作组合网格
- [ ] 几何体的合并与组合
- [ ] 摄像机控制器
- [ ] 变形动画与骨骼动画
- [ ] 场景内物体的物理效果
- [ ] 自定义着色器与后期处理
- [x] [OpenGL GLSL 基础语法和函数](./docs/glsl/glsl-syntax.md)
- [x] [GLSL 中文手册](./docs/glsl/glsl-cookbook.md)

### 踩坑经验

分享记录遇到的坑及解决方案

> 以下经验来自[快乐小球球](https://zhuanlan.zhihu.com/p/25483816)

- 图片尺寸必须以2的n次方<=1024，如果图片不是2的整数倍数，引擎会自动压缩到2的整数倍数，在chrome控制台中会出提示，粗看没事，但在iphone6Plus下会卡到微信闪退.
- 用webpack打包模型文件，用各种加载器中的 prase 直接解析即可。模型在 webpack 中以 raw 加载

  ```
  module: {
    loaders: [
      {test: /\.dae$/, loader: 'raw'},
      ...
    ]
  }
  ```

## Shader 相关资料

- [LearnOpenGL-CN](https://learnopengl-cn.readthedocs.io/zh/latest/)
- [The Book of Shaders](https://thebookofshaders.com/?lan=ch)--一本关于 Fragment Shaders（片段着色器）的入门指南
- [The Book of Shaders Editor](http://editor.thebookofshaders.com)- Shaders 在线编辑器
- [Inigo Quilez](http://www.iquilezles.org/www/index.htm) - 有关计算机图形学、着色器的博客代码示例
- [Introducing Shaders](https://openframeworks.cc/ofBook/chapters/shaders.html)
- [pixelshaders](http://pixelshaders.com/) - 基础代码示例

### shader 效果

用如上 **[Shaders 在线编辑器](http://editor.thebookofshaders.com)** 可以查看效果 [这里查看效果代码](./docs/glsl/glsl_shaders.md)

### 网上收集资料

- [Three.js Fundamentals starting lesson](https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html) 官网推荐入门教程
- [图解WebGL&Three.js工作原理](https://www.cnblogs.com/wanbo/p/6754066.html)
- [three.js editor使用视频教程](https://www.youtube.com/watch?v=rqn-KPnh3hM)
- [youtube入门视频教程](https://www.youtube.com/watch?v=biZgx45Mzqo&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf&index=2)
- [Three.js 中文文档](http://techbrood.com/threejs/docs/)
- [ThreeJS快速入门](https://zhuanlan.zhihu.com/p/23272116)
- [learningthreejs-系列博客](http://learningthreejs.com)
- [webgl 入门教程](https://codepen.io/rachsmith/post/beginning-with-3d-webgl-pt-1-the-scene)
- [使用 D3 + webgl 制作地球仪](http://www.delimited.io/blog/2015/5/16/interactive-webgl-globes-with-threejs-and-d3)
- [使用 header-tracker 和 webRTC](http://learningthreejs.com/blog/2013/03/12/move-a-cube-with-your-head/)
- [Intro to WebGL with Three.js](http://davidscottlyons.com/threejs/presentations/frontporch14/#slide-0)
- [Google+ 关于 threejs 的文章发布](https://plus.google.com/+ThreejsOrg)

## Threejs 相关的库

- [tween lite](https://greensock.com/)
- [dat.gui: 一个轻量级的可视化库供开发者调试变量使用](https://github.com/dataarts/dat.gui)
- [csg.js: 封装了几何体合并、取交集、取非交集的方法](http://evanw.github.io/csg.js/docs/)
- [headtraker](https://github.com/auduno/headtrackr)
- [html_gl](https://github.com/PixelsCommander/HTML-GL)
- [threex](http://www.threejsgames.com/extensions/)
- [ar.js](https://github.com/then/promise)

## 贴图素材

- [3dwarehouse](https://3dwarehouse.sketchup.com)
- [行星素材](http://planetpixelemporium.com/earth.html)
- [Clara.io 3D素材](https://clara.io/library)
- [Shadertoy 着色器](https://www.shadertoy.com)
- [各种着色器 demo 文章](http://www.iquilezles.org/www/index.htm)

## 在线站点

- [marpi.pl](https://demo.marpi.pl) - 很多牛X的Demo
- [Altered Qualia](http://alteredqualia.com/) - 也是很棒的Demo
- [CESIUM 3D 地球](http://cesiumjs.org/index.html)
- [minecraft-threejs-clone](https://dgreenheck.github.io/minecraft-threejs-clone/)-我的世界threejs版，还有另一个 threejs-procedural-planets

### 在线DEMO

- [三种方法创建3D粒子效果](https://varun.ca/three-js-particles)
- [three-seed](https://github.com/edwinwebb/three-seed/) - three.js starter project with ES6 and Webpack
- [The Aviator](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/) - the-aviator-animating-basic-3d-scene-threejs
- [Infinite Tubes](https://tympanus.net/codrops/2017/05/09/infinite-tubes-with-three-js/)
- [Decorative WebGL Backgrounds](https://tympanus.net/codrops/2017/11/28/decorative-webgl-backgrounds/)
- [egraether - Demos](http://egraether.com)
- [David Lyons - 3D Artist](http://davidscottlyons.com)
- [83个含注释Demo](https://stemkoski.github.io/Three.js/)
- [workshop](http://workshop.chromeexperiments.com)
- [Three Bird](http://codepen.io/Yakudoo/pen/LVyJXw?editors=0010)
- [Crystals](http://codepen.io/aglosson/pen/rVyRGm?editors=0010)
- [three.js-editor](https://threejs.org/editor/)
- [星空](http://charliehoey.com/threejs-demos/our-galactic-neighborhood.html)
- [3D投影](https://threejs.org/examples/#webgl_materials_cubemap)
- [voxelpainter](https://threejs.org/examples/webgl_interactive_voxelpainter.html)
- [tunnel-effect](http://learningthreejs.com/blog/2012/01/11/tunnel-effect/)
- [Altered earth](http://alteredqualia.com/xg/examples/earth_bathymetry.html)

## 相关书籍资料

收集整理学习资料。

- [《threejs-intro》](http://davidscottlyons.com/threejs-intro/#slide-1)----很棒的入门示例
- 《WebGL编程指南》
- 《Three.js开发指南》-- [在线Demo案例](http://www.skyliu.top/three-js/)
- [《Three.js入门指南》](http://www.ituring.com.cn/book/1272)--[书例代码](http://zhangwenli.com/ThreeExample.js/)
- [Three.js入门教程](http://www.cnblogs.com/yiyezhai/category/447410.html) -- 这是对国外一份教程的翻译，一共六篇文章。讲解不多，更多的是展示各个基本功能怎么用。更适合有一些图形基础的同学

## 同类库探索

![b4w](./docs/images/b4w.png) ![p5.js](./docs/images/p5.png)

- [blend4web](https://github.com/TriumphLLC/Blend4Web)

  - [Demo案例 - 仿机械革命源计划-私人定制](http://zyj1022.github.io/demos/blend4web/index.html)

- [P5.js](https://p5js.org/zh-Hans/) - [基础教程](./docs/hello-p5.md)

  - [p5.js Web Editor](https://editor.p5js.org) - p5在线编辑器
  - [OpenProcessing](https://www.openprocessing.org/) - 各种 demo
  - wangyasai-[亚赛大人](https://github.com/wangyasai),很多好玩的效果，👍.

    - [Speed-Line](https://wangyasai.github.io/Speed-Line/) - 漫画必备超燃速度线
    - [Play-a-ball](https://wangyasai.github.io/Play-a-ball/) - 抽象球体生成器
    - [Awesome Masoic](https://wangyasai.github.io/Awesome-Masoic) - 动态马赛克背景生成器
    - [Perlin Noise](https://wangyasai.github.io/Perlin-Noise/) - 等高线神器
    - [Stars-Emmision](https://wangyasai.github.io/Stars-Emmision/) - 万箭齐发毫发无伤背景生成器
    - [Particles-Emission](https://wangyasai.github.io/Particles-Emission/) - 粒子循环运动神器
