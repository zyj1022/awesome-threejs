var type;
var options = {
    Color: '#111111',
    Counts: 200,
    Line: 'straight',
    Width: 30,
    CenterX: 0,
    CenterY: 0,
    Length: 400,
    Save: function() {
      saveFrames("Speed-Line", "png", 1, 1);
    }
  }
  var imageControl,
    colorControl,
    SmoothControl2,
    StrokeControl,
    Xcontrol,
    Ycontrol,
    SaveControl;
  window.onload = function() {
    gui = new dat.GUI();
    //folder1
    var folder1 = gui.addFolder('Controls');
    colorControl = folder1.addColor(options, 'Color');
    colorControl.onChange(draw);
    colorControl.listen();
    LineControl = folder1.add(options, 'Line', ['straight', 'curved']);
    LineControl.listen();
    LineControl.onChange(function() {
      if (options.Line == 'straight') {
        type = 'straight';
        draw();
      } else if (options.Line == 'curved') {
        type = 'curved';
        draw();
      }

    });
    CountsControl = folder1.add(options, 'Counts', 10, 500);
    CountsControl.onChange(draw);
    CountsControl.listen();
    StrokeControl = folder1.add(options, 'Width', 5, 50);
    StrokeControl.onChange(draw);
    StrokeControl.listen();
    LengthControl = folder1.add(options, 'Length', 100, 2000);
    LengthControl.onChange(draw);
    LengthControl.listen();
    XControl = folder1.add(options, 'CenterX', -300, 300);
    XControl.onChange(draw);
    XControl.listen();
    YControl = folder1.add(options, 'CenterY', -300, 300);
    YControl.onChange(draw);
    YControl.listen();
    var SaveControl = folder1.add(options, 'Save');
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
