var SVG;
var myCanvas;
var r;
var x1,
  y1,
  x2,
  y2,
  x3,
  y3,
  x4,
  y4,
  sx,
  sy;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  if (width > height) {
    r = width;
  } else {
    r = height;
  }
}

function draw() {
  frameRate(0.00001);
  if (options.SavePNG == true) {
    background(0, 0, 0, 0);
  } else {
    background(options.Background);
  }
  speedline(options.Radius);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : null;
}

function speedline(r) {
  if (options.SavePNG == true) {
    clear();
  } else {
    background(options.Background); //
  }

  for (var i = 180; i < 540; i += 360 / options.Counts) {
    push();
    translate(width / 2, height / 2);
    noFill();

    if (options.Style == 'style7') {
      beginShape();
      vertex(options.CenterX, options.CenterY + height / 1.6);
      x3 = sin(radians(i)) * r + random(options.Offset);
      y3 = cos(radians(i)) * r + random(options.Offset);
      x1 = x3 / 1.5;
      x2 = x1;
      y1 = (-r / 7 + y3) / 2;
      y2 = y1;
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);
      bezierVertex(x1, y1, x2, y2, x3, y3);
      endShape();

      fill(options.Color);
      noStroke();
      ellipse(x3, y3, 5, 5);
    }

    if (options.Style == 'style1') {

      x3 = sin(radians(i)) * r + random(options.Offset);
      y3 = cos(radians(i)) * r + random(options.Offset);

      if (i < 220) {
        sx = map(i, 180, 220, -r / 30, -r / 1.5);
        sy = map(i, 180, 220, 0, -r / 30);
        x1 = x3 * 0.5;
        y1 = options.CenterY + sy;
        x2 = x3 * 0.8;
        y2 = y3;
      } else if (i > 220 && i < 270) {
        sx = map(i, 220, 270, -r / 5, -r / 1.5);
        sy = map(i, 220, 270, -r / 30, -r / 20);
        x1 = sx;
        y1 = options.CenterY + sy;
        x2 = x3;
        y2 = y3 - sy;
      } else if (i > 270 && i < 360) {
        sx = map(i, 270, 360, -r / 1.5, 0);
        sy = map(i, 270, 360, r / 20, r);
        x1 = sx;
        y1 = options.CenterY;
        x2 = x3 + sx / 15;
        y2 = 0;
      } else if (i > 360 && i < 450) {
        sx = map(i, 360, 450, 0, r / 1.5);
        sy = map(i, 360, 450, r / 4, r / 20);
        x1 = sx;
        y1 = options.CenterY;
        x2 = x3 + sx / 15;
        y2 = 0;
      } else if (i > 450 && i < 500) {
        sx = map(i, 450, 500, r / 1.5, r / 5);
        sy = map(i, 450, 500, -r / 30, -r / 20);
        x1 = sx;
        y1 = options.CenterY + sy;
        x2 = x3;
        y2 = y3 - sy;
      } else if (i > 500) {
        sx = map(i, 500, 540, r / 10, r / 30);
        sy = map(i, 500, 540, 0, -r / 30);
        x1 = x3 * 0.5;
        y1 = options.CenterY + sy;
        x2 = x3 * 0.8;
        y2 = y3 + 10;
      }

      noFill();
      push();
      beginShape();
      // rotate(-PI/6);
      vertex(options.CenterX, options.CenterY);
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);
      bezierVertex(x1, y1, x2, y2, x3, y3);
      endShape();

      fill(options.Color);
      noStroke();
      ellipse(x3, y3, 5, 5);
      pop();
    } else if (options.Style == 'style2') {
      x1 = sin(radians(0)) * r + random(options.Offset);
      y1 = cos(radians(0)) * r + random(options.Offset);

      x4 = sin(radians(360 / options.Counts * 30)) * r + random(options.Offset);
      y4 = cos(radians(360 / options.Counts * 30)) * r + random(options.Offset);

      x2 = (x1 + x4) / 2 + options.Angle;
      y2 = (x2 + x4) / 2 + options.Angle;

      rotate(i);

      x3 = x2;
      y3 = y2;
      beginShape();
      noFill();
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);
      vertex(x1, y1);
      bezierVertex(x2, y2, x3, y3, x4, y4);
      endShape();
      fill(options.Color);
      noStroke();
      ellipse(x1, y1, 5, 5);
      ellipse(x4, y4, 5, 5);
    } else if (options.Style == 'style3') {
      x1 = sin(radians(0)) * r + random(options.Offset);
      y1 = cos(radians(0)) * r + random(options.Offset);

      x4 = sin(radians(0)) * r / 3 + random(options.Offset);
      y4 = cos(radians(0)) * r / 3 + random(options.Offset);

      x2 = x1 - options.Angle * 2;
      y2 = y1;
      x3 = x4 - options.Angle * 2;
      y3 = y4;
      rotate(i);
      beginShape();
      noFill();
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);
      vertex(x1, y1);
      bezierVertex(x2, y2, x3, y3, x4, y4);
      endShape();
      fill(options.Color);
      noStroke();
      ellipse(x1, y1, 5, 5);
      ellipse(x4, y4, 5, 5);
    } else if (options.Style == 'style4') {
      x1 = sin(radians(0)) * r + random(options.Offset);
      y1 = cos(radians(0)) * r + random(options.Offset);
      rotate(i);

      noFill();
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);
      ellipse(100 + random(options.Offset), 100 + random(options.Offset), options.Radius, options.Radius);
      fill(options.Color);
      noStroke();
      ellipse(x1, y1, 5, 5);
    } else if (options.Style == 'style5') {
      x1 = sin(radians(0)) * r + random(options.Offset);
      y1 = cos(radians(0)) * r + random(options.Offset);

      x2 = 100 + random(options.Offset);
      y2 = 100 + random(options.Offset);
      rotate(i);

      noFill();
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);
      arc(x2, y2, options.Radius, options.Radius, radians(40), radians(220));
      fill(options.Color);
      noStroke();
      ellipse(x1, y1, 5, 5);
      ellipse(x2 - 100, y2 - 100, 5, 5);
    } else if (options.Style == 'style6') {
      x1 = sin(radians(0)) * random(r * 0.8, r) + random(options.Offset);
      y1 = cos(radians(0)) * random(r * 0.8, r) + random(options.Offset);

      x2 = sin(radians(0)) * random(r * 0.3, r * 0.5) + random(options.Offset);
      y2 = cos(radians(0)) * random(r * 0.3, r * 0.5) + random(options.Offset);

      rotate(i);
      noFill();
      stroke(options.Color[0], options.Color[1], options.Color[2], 100);

      line(x1, y1, x2, y2);
      fill(options.Color);

      noStroke();
      var radius = random(3, 10);
      ellipse(x1, y1, radius, radius);
      ellipse(x2, y2, radius, radius);
    }
    pop();
  }
}
