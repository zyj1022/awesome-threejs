var myCanvas;
var r;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  background(255);
  if (width > height) {
    r = width;
  } else {
    r = height;
  }
}

function draw() {
  speedline();
  frameRate(0.00001);
}

function speedline() {

  clear();
  for (var i = 0; i < TWO_PI; i += TWO_PI / options.Counts) {
    push();
    translate(width / 2 + options.CenterX, height / 2 + options.CenterY);

    if (options.Line == 'straight') {
      beginShape();
      rotate(i);
      fill(options.Color);
      noStroke();
      vertex(-random(options.Width), r);
      vertex(0, r / 2 - random(options.Length));
      vertex(random(options.Width), r);
      endShape(CLOSE);

    } else {
      rotate(i);
      beginShape();

      var offset = random(30);
      var n = random(5, 6);
      var h = random(options.Length / 10, options.Length / 10) + random(200);

      var x1 = 0;
      var y1 = r * 0.9;

      var x4 = random(options.Width / 10, options.Width) * 4;
      // var x4 = random(options.Width*0.8,options.Width)*n;//top
      var y4 = y1 / 2 - h; //top

      var x7 = random(options.Width / 10, options.Width / 5);
      var y7 = r;

      var x2 = -options.Width * 2.5;
      var y2 = y1 / 2 + h;

      var x3 = -options.Width * 2.5;
      var y3 = y1 / 2 + h;

      var x5 = -options.Width * 2;
      var y5 = y1 / 2 + h;

      var x6 = -options.Width * 2;
      var y6 = y1 / 2 + h;

      fill(options.Color);
      noStroke();
      vertex(x1, y1);
      bezierVertex(x2, y2, x3, y3, x4, y4);
      bezierVertex(x5, y5, x6, y6, x7, y7);
      endShape(CLOSE);
    }
    pop();
  }
}
