# P5

## 基础代码

主要有两个起始函数:

- 程序开始时，`setup()` 函数中的语句执行一次
- `draw()` 中的语句一直执行到程序停止为止。每个语句都按顺序执行，并且在读取最后一行之后，将再次执行第一行
- `draw()` 函数中的代码从上到下连续运行，直到程序停止。

```
function setup() {
  // put setup code here
}

function draw() {
  // put drawing code here
}
```

- `createCanvas(width, height)`: 例 `createCanvas(800,600)`
- `noLoop()` 函数使 `draw()` 只执行一次, 如果不调用 `noLoop()` ，`draw()` 内的代码会持续运行。
- `redraw()` 函数使 `draw()` 执行一次。在这个例子中，`draw()` 将在每次点击鼠标时执行一次。

## 形状

Points 与 lines 可用于绘制基本几何。 更改变量 'd' 的值以缩放外形。这四个变量根据 'd' 的值设置位置。

基本形状的原始函数包括：

- triangle() — 三角形
- rect() - 正方形
- quad() - 四边形
- ellipse() - 圆形
- arc() - 弧形 方块是通过 rect() 绘制， 圆形是通过 ellipse() 来绘制。每个功能都需要一些参数来确定形状的位置和大小。

**正多边形函数**

```
function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
```

**Star**

star() 函数能够绘制各种不同的形式

五角星： `star(0, 0, 30, 70, 5);`

```
function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
```
