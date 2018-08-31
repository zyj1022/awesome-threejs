var type;
var options = {
    Background: '#111111',
    Color: [
      255, 90, 50
    ],
    Counts: 200,
    Radius: 320,
    Style: 'style3',
    Offset: 15,
    Angle: -90,
    CenterX: 0,
    CenterY: -230,
    SavePNG: false,
    Save: function() {
      saveFrames("pic", "png", 1, 1);
    }
  }

  var imageControl,
    colorControl,
    bgControl,
    SmoothControl2,
    OffsetControl,
    Xcontrol,
    Ycontrol,
    SaveControl,
    RadiusControl,
    AngelControl,
    StyleControl,
    SaveControl;

  window.onload = function() {
    gui = new dat.GUI();

    //folder1
    var folder1 = gui.addFolder('Controls');

    bgControl = folder1.addColor(options, 'Background');
    bgControl.onChange(draw);
    bgControl.listen();

    colorControl = folder1.addColor(options, 'Color');
    colorControl.onChange(draw);
    colorControl.listen();

    StyleControl = folder1.add(options, 'Style', [
      'style1',
      'style2',
      'style3',
      'style4',
      'style5',
      'style6',
      'style7'
    ]);
    StyleControl.listen();

    StyleControl.onChange(function() {
      if (options.Style == 'style1') {
        type = 'style1';
        draw();
      } else if (options.Style == 'style2') {
        type = 'style2';
        draw();
      } else if (options.Style == 'style3') {
        type = 'style3';
        draw();
      } else if (options.Style == 'style4') {
        type = 'style4';
        draw();
      } else if (options.Style == 'style5') {
        type = 'style5';
        draw();
      } else if (options.Style == 'style6') {
        type = 'style6';
        draw();
      } else if (options.Style == 'style7') {
        type = 'style7';
        draw();
      }
    });

    CountsControl = folder1.add(options, 'Counts', 10, 360);
    CountsControl.onChange(draw);
    CountsControl.listen();

    OffsetControl = folder1.add(options, 'Offset', 0, 500);
    OffsetControl.onChange(draw);
    OffsetControl.listen();

    AngelControl = folder1.add(options, 'Angle', -360, 360);
    AngelControl.onChange(draw);
    AngelControl.listen();

    RadiusControl = folder1.add(options, 'Radius', 200, 1000);
    RadiusControl.onChange(draw);
    RadiusControl.listen();

    XControl = folder1.add(options, 'CenterX', -1000, 1000);
    XControl.onChange(draw);
    XControl.listen();

    YControl = folder1.add(options, 'CenterY', -1000, 1000);
    YControl.onChange(draw);
    YControl.listen();

    pngControl = folder1.add(options, 'SavePNG');
    pngControl.onChange(draw);

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
