# Three.js 之 Hello world!

## 准备工作

新建空白 html 页面，引入 three.js，及页面元素准备。

```
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Hello world</title>
  <script type="text/javascript" src="js/three.js"></script>
</head>
<body>
    <canvas id="mainCanvas"></canvas>

    <script type="text/javascript">
      // ...code
    </script>
</body>
</html>
```

## 基本概念介绍

一个典型的Three.js程序至少要包括:

- 渲染器（Renderer）—— 渲染器将和Canvas元素进行绑定
- 场景（Scene）—— 我们创建的物体都添加到场景中，相当于一个大容器
- 照相机（Camera）—— 这里相当于一个透视投影的三维坐标系
- 在场景中创建的物体

创建一个形状的代码如下：

```
var renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('mainCanvas')
});

renderer.setClearColor(0x000000); // black

// 创建场景
var scene = new THREE.Scene();

// 创建相机
var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
camera.position.set(0, 0, 5);
scene.add(camera); // 记得把相机添加到场景

// 创建一个长方形
var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        })
);
scene.add(cube);

// 渲染器最终渲染
renderer.render(scene, camera);

```

现实中会有光源照射物体，产生光影效果，这里也可以添加 light。


```
var renderer = new THREE.WebGLRenderer({
	canvas: document.getElementById('mainCanvas')
});

renderer.setClearColor(0xffcc00);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// scene
var scene = new THREE.Scene();

// 添加环境光
var light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

// 添加点光源
var light2 = new THREE.PointLight(0xffffff, 0.7);
scene.add(light2);

// camera
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
// camera.position.set(0, 0, 5);

var geometry = new THREE.CubeGeometry(200, 200, 200);
// var material = new THREE.MeshBasicMaterial();
var material = new THREE.MeshLambertMaterial({color: 0xffffee});
var mesh = new THREE.Mesh(geometry, material);

mesh.position.set(0, 0, -1000);

scene.add(mesh);

//
requestAnimationFrame(render)

function render() {
	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;
	// render
	renderer.render(scene, camera);
	requestAnimationFrame(render)
}

```


## 总结

以上，如果使用过flash或者maya等软件等话，相信对以上场景、相机、渲染、灯光等会比较容易理解。
在这里可以联想为在3D软件里创建一个物体，当然软件所有操作及效果是需要我们用代码来实现。

------

> [查看视频教程地址](https://www.youtube.com/watch?v=biZgx45Mzqo&list=PL08jItIqOb2qyMOhtEUoLh100KpccQiRf&index=2)
