var type;
var options = {
    Background: [
      10, 10, 10
    ],
    Color1: '#FF3054',
    Color2: '#4614E9',
    Range: 400,
    Speed: 20,
    Points: 1000,
    maxSize: 10,
    minSize: 3,
    Direction: 'Center',

    Random: function() {
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
      options.Speed = random(10, 20);
      options.Range = random(400);
      options.Points = random(300, 2000);
      options.maxSize = random(1, 20);
      options.minSize = random(1, 5);
      options.Direction = random(['Center', 'Left', 'Right', 'Up', 'Down']);

      // color1
      var color1 = rgbToHex(Math.floor(options.Color1[0]), Math.floor(options.Color1[1]), Math.floor(options.Color1[2]));
      color1Control.setValue(color1);

      //color2
      var color2 = rgbToHex(Math.floor(options.Color2[0]), Math.floor(options.Color2[1]), Math.floor(options.Color2[2]));
      color2Control.setValue(color2);
    },

    Save: function() {
      saveFrames("Star-Emission", "png", 1, 1);
    }
  }

  var text,
    gui,
    config,
    BgControl,
    BgColor,
    color1Control,
    color2Control,
    speedControl,
    PointsControl,
    RangeControl,
    maxSizeControl,
    minSizeControl,
    DirControl;
  window.onload = function() {
    gui = new dat.GUI();

    //folder1
    var folder1 = gui.addFolder('Controls');

    BgControl = folder1.addColor(options, 'Background');
    BgControl.onChange(draw);

    color1Control = folder1.addColor(options, 'Color1');
    color1Control.onChange(draw);
    color1Control.listen();

    color2Control = folder1.addColor(options, 'Color2');
    color2Control.onChange(draw);
    color2Control.listen();

    speedControl = folder1.add(options, 'Speed', 10, 40);
    speedControl.onChange(draw);
    speedControl.listen();

    PointsControl = folder1.add(options, 'Points', 100, 4000);
    PointsControl.onChange(draw);
    PointsControl.listen();

    RangeControl = folder1.add(options, 'Range', 100, 2000);
    RangeControl.onChange(draw);
    RangeControl.listen();

    maxSizeControl = folder1.add(options, 'maxSize', 0, 20);
    maxSizeControl.onChange(draw);
    maxSizeControl.listen();

    minSizeControl = folder1.add(options, 'minSize', 0, 10);
    minSizeControl.onChange(draw);
    minSizeControl.listen();

    DirControl = folder1.add(options, 'Direction', ['Center', 'Left', 'Right', 'Up', 'Down']);
    DirControl.listen();

    var RandomControl = folder1.add(options, 'Random');

    var SaveControl = folder1.add(options, 'Save');

    folder1.open();

  };

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
