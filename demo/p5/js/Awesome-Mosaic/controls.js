var type;
var type_;
var options = {
    Background: '#01731f',
    Color: '#ffdb45',
    Rscale: 27,
    Gscale: 95,
    Bscale: 31,
    Size: 120,
    Nums: 130,
    noiseScale: 0.43,
    Shape: 'Wave',
    Padding: 30
  }

  var gui,
    config;
  var colorControl,
    rControl,
    gControl,
    bControl,
    noiseControl,
    SizeControl,
    RandomControl,
    shapeControl,
    PaddingControl,
    NumsControl;

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

    shapeControl = folder1.add(options, 'Shape', ['Wave', 'Annulus', 'Rectangle', 'Circle']);
    shapeControl.onChange(draw);
    shapeControl.listen();

    var bgcolorControl = folder1.addColor(options, 'Background');
    bgcolorControl.onChange(draw);

    colorControl = folder1.addColor(options, 'Color');
    colorControl.onChange(draw);

    rControl = folder1.add(options, 'Rscale', -100, 100);
    rControl.onChange(draw);
    rControl.listen();

    gControl = folder1.add(options, 'Gscale', -100, 100);
    gControl.onChange(draw);
    gControl.listen();

    bControl = folder1.add(options, 'Bscale', -100, 100);
    bControl.onChange(draw);
    bControl.listen();

    noiseControl = folder1.add(options, 'noiseScale', 0, 1);
    noiseControl.onChange(draw);
    noiseControl.listen();

    SizeControl = folder1.add(options, 'Size', 1, 200);
    SizeControl.onChange(draw);
    SizeControl.listen();

    NumsControl = folder1.add(options, 'Nums', 1, 180);
    NumsControl.onChange(draw);
    NumsControl.listen();

    PaddingControl = folder1.add(options, 'Padding', 0, 100);
    PaddingControl.onChange(draw);
    PaddingControl.listen();

    folder1.open();
  };
