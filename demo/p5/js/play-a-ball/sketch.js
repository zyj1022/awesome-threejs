var lengths = 1500;
let graphics;
var myCanvas;
var img;
var a1,
  a2,
  a3;
var rx,
  ry,
  rz;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  backgroundColor = color(options.Background);
  graphics = createGraphics(lengths, lengths);
}

function p5LoadImage(dataURL) {
  img = loadImage(dataURL);
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

function draw() {
  if (options.SavePNG == true) {
    background(0, 0, 0, 0);
  } else {
    background(options.Background);
  }

  // howrotate();

  if (options.Pattern == 'Pattern6' && type != 'image') {
    stroke(options.Color1);
    strokeWeight(options.StrokeWeight);
    noFill();
    if (options.Smooth < 15) {
      options.Smooth = 15;
    }
    chooseShape(options.Smooth / 5);
  } else if (options.Pattern == 'Pattern7' && type != 'image') {
    stroke(options.Color1);
    strokeWeight(options.StrokeWeight);
    fill(options.Background);
    if (options.Smooth < 15) {
      options.Smooth = 15;
    }
    chooseShape(options.Smooth / 5);
  } else if (options.Pattern != 'Pattern6' && options.Pattern != 'Pattern7' && type != 'image') {
    fill(options.Color1);
    texture(graphics);
    pattern();
    chooseShape(options.Smooth);
  } else if (type == 'image') {
    texture(img);
    pattern();
    chooseShape(options.Smooth);
  }
}

function pattern() {
  graphics.background(options.Color2);
  graphics.stroke(options.Color1);
  graphics.strokeCap(ROUND);

  for (var i = 0; i < options.Counts; i++) {
    graphics.strokeWeight(options.StrokeWeight * 4);
    y = map(i, 0, options.Counts - 1, 0, lengths);
    if (options.Pattern == 'Pattern1') {
      graphics.line(0, y, lengths, y);
    } else if (options.Pattern == 'Pattern2') {
      graphics.line(y, 0, y, lengths);
    }
  }

  if (options.Pattern == 'Pattern3') {
    for (var y = 0; y < lengths; y += options.Counts) {
      for (var x = 0; x < lengths; x += options.Counts) {
        graphics.noStroke();
        graphics.push();
        graphics.fill(options.Color1);
        graphics.translate(x, y);
        graphics.rect(0, 0, options.Counts / 1.5, options.Counts / 1.5);
        graphics.pop();
      }
    }
  }

  var s = lengths / int(options.Counts) / 2;
  for (var y = 0; y < int(options.Counts); y += 1) {
    for (var x = 0; x < int(options.Counts); x += 1) {
      graphics.noFill();
      graphics.strokeWeight(options.StrokeWeight * 4);

      var posX = map(x, 0, int(options.Counts), 0, lengths);
      var posY = map(y, 0, int(options.Counts), 20, lengths - 20);
      graphics.stroke(options.Color1);

      if (options.Pattern == "Pattern4") {
        graphics.line(posX, posY, posX + s, posY + s);
        graphics.line(posX + s, posY + s, posX + s * 2, posY);
      } else if (options.Pattern == "Pattern5") {
        graphics.line(posX, posY, posX + s * 2, posY + s * 2);
        graphics.line(posX, posY + s * 2, posX + s * 2, posY);
      }
    }
  }
}

function chooseShape(detail) {
  if (options.Shape == "Sphere") {
    ellipsoid(options.Radius, options.Radius, options.Radius, int(detail), int(detail));
  } else if (options.Shape == "Box") {
    box(options.Radius * 1.2);
  } else if (options.Shape == "Cylinder") {
    cylinder(options.Radius / 1.5, options.Radius2 * 2, int(detail), int(detail));
  } else if (options.Shape == "Torus") {
    torus(options.Radius / 1.6, options.Radius2, int(detail), int(detail));
  }
}

function howrotate() {
  a1 = map(mouseX, -options.Radius, options.Radius, -TWO_PI, TWO_PI);
  a2 = map(mouseY, -options.Radius, options.Radius, -TWO_PI, TWO_PI);
  a3 = map(mouseY, -options.Radius, options.Radius, -TWO_PI, TWO_PI);

  rx = degrees(millis() * 0.00001 * options.Speed);
  ry = degrees(millis() * 0.00001 * options.Speed);
  rz = degrees(millis() * 0.00001 * options.Speed);

  if (degrees(options.RotateX == true && options.RotateY == true && options.RotateZ == true)) {
    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);

    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateX(rx + a1);
      rotateY(ry + a2);
      rotateZ(rz + a3);
    }
  } else if (degrees(options.RotateX == false && options.RotateY == true && options.RotateZ == true)) {
    rotateX(0);
    rotateY(ry);
    rotateZ(rz);

    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      // rotateX(rx+a1);
      rotateY(ry + a2);
      rotateZ(rz + a3);
    }
  } else if (degrees(options.RotateX == true && options.RotateY == false && options.RotateZ == true)) {
    rotateX(rx);
    rotateY(0);
    rotateZ(rz);

    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateX(rx + a1);
      // rotateY(ry+a2);
      rotateZ(rz + a3);
    }
  } else if (degrees(options.RotateX == true && options.RotateY == true && options.RotateZ == false)) {
    rotateX(rx);
    rotateY(ry);
    rotateZ(0);

    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateX(rx + a1);
      rotateY(ry + a2);
      // rotateZ(rz+a3);
    }
  } else if (degrees(options.RotateX == false && options.RotateY == false && options.RotateZ == true)) {
    rotateX(0);
    rotateY(0);
    rotateZ(rz);
    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateZ(rz + a3);
    }
  } else if (degrees(options.RotateX == false && options.RotateY == true && options.RotateZ == false)) {
    rotateX(0);
    rotateY(ry);
    rotateZ(0);
    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateY(ry + a1);
    }
  } else if (degrees(options.RotateX == true && options.RotateY == false && options.RotateZ == false)) {
    rotateX(rx);
    rotateY(0);
    rotateZ(0);
    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateX(rx + a1);
    }
  } else if (degrees(options.RotateX == true && options.RotateY == false && options.RotateZ == false)) {
    rotateX(rx);
    rotateY(0);
    rotateZ(0);
    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateX(rx + a1);
    }
  } else if (degrees(options.RotateX == false && options.RotateY == false && options.RotateZ == false)) {
    rotateX(0);
    rotateY(0);
    rotateZ(0);
    if (dist(mouseX, mouseY, width / 2, height / 2) < options.Radius) {
      rotateX(a1);
      rotateY(a2);
      rotateZ(a3);
    }
  }
}
