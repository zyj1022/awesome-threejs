var type;
var options = {
  Background: '#221f4d',
  Color1: '#FFE947',
  Color2: '#FF29CC',
  Counts: 20,
  Smooth: 60,
  Shape: 'Sphere',
  Pattern: 'Pattern1',
  StrokeWeight: 7,
  Image_DataURL: '',
  'Upload Image': function() {
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

  Radius: 270,
  Radius2: 90,
  Speed: 0.1,
  RotateX: true,
  RotateY: true,
  RotateZ: true,
  Random: function() {
    background(options.Background);
    options.Background = random(['#FFE300', '#00EBA5', '#111111', '#f2f2f2']);
    options.Color1 = random(['#E632A5', '#580AFF', '#005CFF']);
    options.Color2 = options.Background;
    options.Counts = random(25, 40);
    options.Smooth = random(3, 60);
    options.Mode = random(['Sphere', 'Torus', 'Cylinder', 'Box']);
    options.Pattern = random([
      'Pattern1',
      'Pattern2',
      'Pattern3',
      'Pattern4',
      'Pattern5',
      'Pattern6',
      'Pattern7'
    ]);
    options.StrokeWeight = random(2, 4);
  },

  SavePNG: false,
  Save: function() {
    saveFrames("Play-a-ball", "png", 1, 1);
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
  bgcolorControl,
  ShapeControl,
  LineControl,
  CountsCont,
  SmoothControl,
  RadiusControl,
  Radius2Control,
  RandomControl,
  imageControl,
  rolcolor1Control,
  color2Control,
  SpeedControl,
  pngControl,
  SaveControl,
  SmoothControl2,
  StrokeControl,
  RotateXControll,
  RotateYControl,
  RotateZControl,
  SaveControl;

window.onload = function() {
  gui = new dat.GUI();

  //folder1
  var folder1 = gui.addFolder('Controls');

  bgcolorControl = folder1.addColor(options, 'Background');
  bgcolorControl.onChange(draw);
  bgcolorControl.listen();

  color1Control = folder1.addColor(options, 'Color1');
  color1Control.onChange(draw);
  color1Control.listen();

  color2Control = folder1.addColor(options, 'Color2');
  color2Control.onChange(draw);
  color2Control.listen();

  ShapeControl = folder1.add(options, 'Shape', ['Sphere', 'Torus', 'Cylinder', 'Box']);
  ShapeControl.listen();

  PatternControl = folder1.add(options, 'Pattern', [
    'Pattern1',
    'Pattern2',
    'Pattern3',
    'Pattern4',
    'Pattern5',
    'Pattern6',
    'Pattern7'
  ]);
  PatternControl.listen();

  PatternControl.onChange(function() {
    if (options.Pattern == 'Pattern1') {
      type = 'Pattern1';
      draw();

    } else if (options.Pattern == 'Pattern2') {
      type = 'Pattern2';
      draw();
    } else if (options.Pattern == 'Pattern3') {
      type = 'Pattern3';
      draw();
    } else if (options.Pattern == 'Pattern4') {
      type = 'Pattern4';
      draw();
    } else if (options.Pattern == 'Pattern5') {
      type = 'Pattern5';
      draw();
    }
  });

  var UploadImg = folder1.add(options, 'Upload Image');

  StrokeControl = folder1.add(options, 'StrokeWeight', 1, 10);
  StrokeControl.onChange(draw);
  StrokeControl.listen();

  SmoothControl = folder1.add(options, 'Smooth', 3, 60);
  SmoothControl.onChange(draw);
  SmoothControl.listen();

  CountsControl = folder1.add(options, 'Counts', 5, 40);
  CountsControl.onChange(draw);
  CountsControl.listen();

  RadiusControl = folder1.add(options, 'Radius', 100, 500);
  RadiusControl.onChange(draw);
  RadiusControl.listen();

  Radius2Control = folder1.add(options, 'Radius2', 50, 300);
  Radius2Control.onChange(draw);
  Radius2Control.listen();

  SpeedControl = folder1.add(options, 'Speed', 0, 1);
  SpeedControl.onChange(draw);
  SpeedControl.listen();

  RotateXControl = folder1.add(options, 'RotateX');
  RotateXControl.onChange(draw);

  RotateYControl = folder1.add(options, 'RotateY');
  RotateYControl.onChange(draw);

  RotateZControl = folder1.add(options, 'RotateZ');
  RotateZControl.onChange(draw);

  RandomControl = folder1.add(options, 'Random');
  RandomControl.listen();

  pngControl = folder1.add(options, 'SavePNG');
  pngControl.onChange(draw);

  var SaveControl = folder1.add(options, 'Save');
  folder1.open();

  folder1.open();

};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1
    ? "0" + hex
    : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
