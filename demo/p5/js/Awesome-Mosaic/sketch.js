// created by yasai
// 2018/06/27

var noise;
var angle = 0;
var targetSize = 15;
var targetPadding = 2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  noiseDetail(2, 0.9);
}

function draw() {
  background(options.Background);
  if (options.Shape == 'Rectangle') {
    options.Size += (targetSize - options.Size) * 0.5;
    options.Padding += (targetPadding - options.Padding) * 0.5;
    if (mouseIsPressed) {
      targetSize = options.Size;
      targetPadding = options.Padding;
    }
    rectangle();
  } else if (options.Shape == 'Circle') {
    options.Size += (targetSize - options.Size) * 0.5;
    options.Padding += (targetPadding - options.Padding) * 0.5;
    if (mouseIsPressed) {
      targetSize = options.Size;
      targetPadding = options.Padding;
    }
    circle();
  } else if (options.Shape == 'Wave') {
    huan(0);
    targetSize = 15;
    targetPadding = 2;
  } else if (options.Shape == 'Annulus') {
    huan(options.Size);
    targetSize = 15;
    targetPadding = 2;
  }
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

function circle() {
  for (var y = 0; y < height; y += options.Padding + options.Size) {
    for (var x = 0; x < width; x += options.Padding + options.Size) {
      var n = noise(x * options.noiseScale, y * options.noiseScale, frameCount * 0.05);

      var rgb = hexToRgb(options.Color);
      var r = map(n, 0, 1, rgb.r, rgb.r + options.Rscale);
      var g = map(n, 0, 1, rgb.g, rgb.g + options.Gscale);
      var b = map(n, 0, 1, rgb.b, rgb.b + options.Bscale);
      fill(r, g, b);

      noStroke();
      push();
      translate(x, y);
      translate(options.Size / 2, options.Size / 2);
      ellipse(0, 0, options.Size, options.Size);
      pop();
    }
  }
}

function rectangle() {
  for (var y = 0; y < height; y += options.Padding + options.Size) {
    for (var x = 0; x < width; x += options.Padding + options.Size) {
      var n = noise(x * options.noiseScale, y * options.noiseScale, frameCount * 0.05);

      var rgb = hexToRgb(options.Color);
      var r = map(n, 0, 1, rgb.r, rgb.r + options.Rscale);
      var g = map(n, 0, 1, rgb.g, rgb.g + options.Gscale);
      var b = map(n, 0, 1, rgb.b, rgb.b + options.Bscale);

      noStroke();
      push();
      fill(r, g, b);
      translate(x, y);

      rect(0, 0, options.Size, options.Size);
      pop();
    }
  }

}

function huan(s) {
  for (var y = 1; y < height * 2; y += 2 * (options.Padding + options.Size)) {
    for (var x = 1; x < options.Nums + 1; x++) {
      push();
      var n = noise(x * options.noiseScale, y * options.noiseScale, frameCount * 0.05);
      var rgb = hexToRgb(options.Color);
      var r = map(n, 0, 1, rgb.r, rgb.r + options.Rscale);
      var g = map(n, 0, 1, rgb.g, rgb.g + options.Gscale);
      var b = map(n, 0, 1, rgb.b, rgb.b + options.Bscale);
      stroke(r, g, b);
      noFill();
      strokeCap(SQUARE);

      translate(width / 2, height / 2);
      var w = map(n, 0, 1, s, options.Size);
      strokeWeight(w);

      var angle = TWO_PI / options.Nums;
      var space = TWO_PI / (1 / options.Padding) / 10000;
      if (options.Nums != 1) {
        arc(0, 0, 200 + y, 200 + y, x * angle, (x + 1) * angle - space);
      } else {
        ellipse(0, 0, y, y);
      }
      pop();
    }
  }
}
