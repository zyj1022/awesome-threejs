var type;
var options = {
  Color1: '#aab91f',
  Color2: '#009788',
  Shadow: 0.5,
  Speed: 3,
  Spacing: 70,
  Points: 15,
  Repeate: 4,
  Emission: 10,
  maxSize: 20,
  minSize: 0,
  FullScreen: false,
  Rotate: false,
  Shape: 'Circle',
  Text: "★",
  Image_DataURL: '',
  'Upload ICON': function() {
    // you need to create an input element in HTML, explained later

    var input = document.getElementById('img-path');
    input.addEventListener('change', function() {
      var file = input.files[0];
      r = new FileReader();
      r.onload = function() {
        gui['Image_DataURL'] = r.result;
        p5LoadImage(r.result);
        type = 'image';
        draw();
      }
      r.readAsDataURL(file);

      for (var i in gui.__controllers) {
        gui.__controllers[i].updateDisplay();
      }
    });
    input.click();
  },

  Random: function() {
    options.Color1 = [
      random(0, 255),
      random(0, 255),
      random(0, 255)
    ];
    options.Color2 = [
      options.Color1[0] + 100,
      options.Color1[1] + 100,
      options.Color1[2] + 100
    ];
    options.Speed = random(1, 5);
    options.Spacing = random(30, 100);
    options.Shadow = random(0, 0.6);
    options.Points = random(5, 20);
    options.Repeate = random(4, 15);
    options.Emission = random(1, 10);
    options.maxSize = random(1, 20);
    options.minSize = random(1, 5);
    options.FullScreen = random(true, false);
    options.Shape = random(['Circle', 'Rect', 'Line', 'Diamond', 'Text']);

    var color1 = rgbToHex(Math.floor(options.Color1[0]), Math.floor(options.Color1[1]), Math.floor(options.Color1[2]));
    color1Control.setValue(color1);

    var color2 = rgbToHex(Math.floor(options.Color2[0]), Math.floor(options.Color2[1]), Math.floor(options.Color2[2]));
    color2Control.setValue(color2);

  },

  isPNG: false,

  Save: function() {
    saveFrames("Particles-Emission", "png", 1, 1);
  },
  SaveGif: function() {
    createGif();
  }
}

//upload icon
var GuiConfig = function() {
  this['Image Path'] = 'graphic.png'; // default image path
  this['Upload Image'] = function() {};
};

var text,
  gui,
  config,
  color1Control,
  color2Control,
  alphaControl,
  speedControl,
  SpacingControl,
  EmissionControl,
  maxSizeControl,
  minSizeControl,
  RepeateControl,
  RotateControl;
window.onload = function() {
  gui = new dat.GUI();

  //folder1
  var folder1 = gui.addFolder('Controls');

  color1Control = folder1.addColor(options, 'Color1');
  color1Control.onChange(draw);

  color2Control = folder1.addColor(options, 'Color2');
  color2Control.onChange(draw);

  alphaControl = folder1.add(options, 'Shadow', 0, 0.8);
  alphaControl.onChange(draw);
  alphaControl.listen();

  speedControl = folder1.add(options, 'Speed', 1, 10);
  speedControl.onChange(draw);
  speedControl.listen();

  SpacingControl = folder1.add(options, 'Spacing', 0, 200);
  SpacingControl.onChange(draw);
  SpacingControl.listen();

  PointsControl = folder1.add(options, 'Points', 5, 50);
  PointsControl.onChange(draw);
  PointsControl.listen();

  EmissionControl = folder1.add(options, 'Emission', 1, 20);
  EmissionControl.onChange(draw);
  EmissionControl.listen();

  maxSizeControl = folder1.add(options, 'maxSize', 1, 100);
  maxSizeControl.onChange(draw);
  maxSizeControl.listen();

  minSizeControl = folder1.add(options, 'minSize', 0, 100);
  minSizeControl.onChange(draw);
  minSizeControl.listen();

  RepeateControl = folder1.add(options, 'Repeate', 4, 30);
  RepeateControl.onChange(draw);
  RepeateControl.listen();

  FullScreenControl = folder1.add(options, 'FullScreen');
  FullScreenControl.onChange(draw);
  FullScreenControl.listen();

  RotateControl = folder1.add(options, 'Rotate');
  RotateControl.onChange(draw);
  RotateControl.listen();

  var RandomControl = folder1.add(options, 'Random');

  //folder2
  var folder2 = gui.addFolder('Shape');

  var shapeControl = folder2.add(options, 'Shape', ['Circle', 'Rectangle', 'Line', 'Diamond']);

  shapeControl.onChange(function() {
    if (options.Shape == 'Circle') {
      type = 'Circle';
      draw();

    } else if (options.Shape == 'Rectangle') {
      type = 'Rectangle';
      draw();
    } else if (options.Shape == 'Line') {
      type = 'Line';
      draw();
    } else if (options.Shape == 'Diamond') {
      type = 'Diamond';
      draw();
    }
  });

  var textControl = folder2.add(options, 'Text');
  textControl.onChange(function() {
    type = 'text';
    draw();
  });

  var UploadImg = folder2.add(options, 'Upload ICON');

  //folder3
  var folder3 = gui.addFolder('Save');
  var isPNGControl = folder3.add(options, 'isPNG');
  isPNGControl.onChange(draw);

  var SaveControl = folder3.add(options, 'Save');
  var SaveControl = folder3.add(options, 'SaveGif');

  folder1.open();
};

var gif = new GIF({workers: 2, quality: 10, workerScript: 'js/gif.worker.js'});

var canvas = document.getElementById('defaultCanvas0'),
  t,
  needFrames = 28,
  startFrame = 0,
  delay = 150,

  progressBar = document.querySelector('.progress-bar'),
  progressTip = document.querySelector('.save-gif-tip');

function createGif() {

  t = setInterval(addFrame, 50);
}

function addFrame() {
  gif.addFrame(canvas, {delay: delay});

  startFrame++;
  progressBar.style.width = 100 * (startFrame / needFrames) + '%';
  if (startFrame >= needFrames) {
    finishGif();
  }
}

function finishGif() {
  clearInterval(t);
  progressTip.style.display = 'block';
  gif.on('finished', function(blob) {
    //window.open(URL.createObjectURL(blob));
    var anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = '1.gif';
    progressTip.style.display = 'none';
    progressBar.style.width = 0;
    anchor.click();
  });

  gif.render();
}

//rgb to hex颜色转换
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1
    ? "0" + hex
    : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
