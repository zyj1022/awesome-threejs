var shadow;
var theata = 0;
var myCanvas;
var img;

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight);
  background(10, 10, 10);
}

function p5LoadImage(dataURL) {
  img = loadImage(dataURL);
}

function draw() {
  drawParticles();
}

function drawParticles() {
  shadow = 'rgba(10,10,10,' + (
  1 - options.Shadow) + ')';

  background(shadow);

  if (options.isPNG == true) {
    clear();
  }

  translate(width / 2, height / 2);

  for (var k = 0; k < options.Repeate; k++) {
    for (var i = 0; i < options.Points; i++) {
      for (var j = 0; j < options.Points; j++) {

        var ratio = dist(i, j, 0, 0) / options.Emission;
        var angle = sin(millis() / 2000 * options.Speed + ratio * (PI / 2));

        var b = (options.Spacing);

        var scale = map(options.Points, 5, 50, 400, 1000);
        var r = map(dist(i * b, j * b, 0, 0), 0, scale, options.maxSize, options.minSize);

        if (options.FullScreen == false) {
          if (dist(i * b, j * b, 0, 0) > scale) {
            r = 0;
          }
        }

        var percent = norm(pow(j + i, 1.2), 0, options.Points);

        from = color(options.Color1);
        to = color(options.Color2);
        between = lerpColor(from, to, percent);

        var x = i * b * abs((cos(angle)) / 2);
        var y = j * b * abs((cos(angle)) / 2);

        push();
        rotate(radians(theata));

        if (type == 'image') {
          options.Repeate = 1;
          r = map(dist(i * b, j * b, 0, 0), 0, scale, options.maxSize, options.minSize);
          image(img, x, y, r, r);
          image(img, -x, y, r, r);
          image(img, -x, -y, r, r);
          image(img, x, -y, r, r);
        } else if (type == 'text') {
          textSize(r);
          fill(between);
          options.Repeate = 1;
          var s = options.Text;
          text(s, x, y);
          text(s, -x, y);
          text(s, -x, -y);
          text(s, x, -y);
        } else if (type == 'Circle') {
          if (options.Repeate == 1) {
            options.Repeate += 3;
          }

          fill(between);
          noStroke();
          ellipse(x, y, r, r);
        } else if (type == 'Rectangle') {
          if (options.Repeate == 1) {
            options.Repeate += 3;
          }
          print('rect');
          fill(between);
          noStroke();
          rect(x, y, r, r);
        } else if (options.Shape == 'Line') {
          if (options.Repeate == 1) {
            options.Repeate += 3;
          }
          stroke(between);
          strokeWeight(r / 10);
          noFill();
          line(x, y, x + 2 * r * sin(angle), y + 2 * r * sin(angle));
        } else if (options.Shape == 'Diamond') {
          if (options.Repeate == 1) {
            options.Repeate += 3;
          }
          fill(between);
          noStroke();
          beginShape();
          var x = (i + 0.5) * b * abs((cos(angle)) / 2);
          var y = (j + 0.5) * b * abs((cos(angle)) / 2);
          vertex(x, y);
          vertex(x + r / 3, y - r / 3 * 2);
          vertex(x + r, y - r);
          vertex(x + r / 3 * 2, y - r / 3);
          endShape(CLOSE);
        } else {
          if (options.Repeate == 1) {
            options.Repeate += 3;
          }
          fill(between);
          noStroke();
          ellipse(x, y, r, r);
        }
        pop();
      }
    }

    if (options.Rotate == true) {
      theata += 0.08;
    }

    rotate(TWO_PI / int(options.Repeate + 0.1));
  }
}
