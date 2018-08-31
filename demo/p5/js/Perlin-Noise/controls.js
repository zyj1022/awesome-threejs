var type;
var options = {
    Background: '#0a0a0a',
    Color1: '#ffffff',
    Color2: '#0799f2',
    Color3: '#45217c',
    Length: 10,
    Nums: 400,
    MaxRadius: 2,
    MinRadius: 2,
    noiseScale: 800,
    ColorMode: 'Normal',
    Random: function() {
      background(options.Background);
      options.Color1 = [
        random(0, 255),
        random(0, 255),
        random(0, 255)
      ];
      options.Color2 = [
        random(0, 255),
        random(0, 255),
        random(0, 255)
      ];
      options.Color3 = [
        random(0, 255),
        random(0, 255),
        random(0, 255)
      ];
      options.Length = random(1, 50);
      options.Nums = random(200, 1000);
      options.noiseScale = random(200, 4000);
      options.MaxRadius = random(1, 10);
      options.MinRadius = random(1, 10);
      options.ColorMode = random(['Normal', 'Linera Gradient', 'Splice']);
    }
  }
  var text,
    gui,
    config;
  window.onload = function() {
    document.getElementById('defaultCanvas0').onmousedown = function(e) {
      // 阻止默认行为并取消冒泡
      if (typeof e.preventDefault === 'function') {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.returnValue = false;
        e.cancelBubble = true;
      }
    }
    gui = new dat.GUI();
    //folder1
    var folder1 = gui.addFolder('Controls');
    var bgcolorControl = folder1.addColor(options, 'Background');
    bgcolorControl.onChange(draw);
    var shapeControl = folder1.add(options, 'ColorMode', ['Normal', 'Linera Gradient', 'Radial Gradient', 'Splice']);
    var color1Control = folder1.addColor(options, 'Color1');
    color1Control.onChange(draw);
    var color2Control = folder1.addColor(options, 'Color2');
    color2Control.onChange(draw);
    var color2Control = folder1.addColor(options, 'Color3');
    color2Control.onChange(draw);
    var noiseControl = folder1.add(options, 'noiseScale', 10, 5000);
    noiseControl.onChange(draw);
    var LengthControl = folder1.add(options, 'Length', 0.1, 50);
    LengthControl.onChange(draw);
    var NumsControl = folder1.add(options, 'Nums', 100, 2500);
    NumsControl.onChange(draw);
    var RadiusControl = folder1.add(options, 'MaxRadius', 1, 5);
    RadiusControl.onChange(draw);
    var RadiusControl = folder1.add(options, 'MinRadius', 1, 5);
    RadiusControl.onChange(draw);
    var RandomControl = folder1.add(options, 'Random');
    folder1.open();
  };
