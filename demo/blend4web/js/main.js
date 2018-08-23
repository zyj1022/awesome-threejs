b4w.register("Computer", function(exports, require) {
  var m_app = require("app");
  var m_ctl = require("controls");
  var m_cfg = require("config");
  var m_data = require("data");
  var m_preloader = require("preloader");
  var m_ver = require("version");

  var m_scenes = require("scenes");
  var m_tex = require("textures");

  var m_camera = require("camera");
  var m_animation = require("animation");
  var m_camera_anim = require("camera_anim")

  var DEBUG = (m_ver.type() == "DEBUG");

  var APP_ASSETS_PATH = DEBUG ? m_cfg.get_assets_path("Computer") : "./data/";

  exports.init = function() {
    m_app.init({
      canvas_container_id: "main_canvas_container",
      callback: init_cb,
      show_fps: DEBUG,
      autoresize: true,
      // console_verbose: true
    });
  }

  function init_cb(canvas_elem, success) {
    if (!success) {
      console.log("b4w init failure");
      return;
    }

    m_preloader.create_preloader();

    canvas_elem.oncontextmenu = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    load();
  }

  function load() {
    m_data.load(APP_ASSETS_PATH + "x2.json", load_cb, preloader_cb);
  }

  function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
  }

  function load_cb(data_id, success) {

    if (!success) {
      console.log("b4w load failure");
      return;
    }

    m_app.enable_camera_controls(false, false, false, null, true);

    var camera = m_scenes.get_active_camera();
    var cameraName = m_scenes.get_object_by_name("B_part");

    console.log('cameraName', cameraName);

    m_camera_anim.is_auto_rotate();
    // m_camera_anim.move_camera_to_point(camera, cameraName, 10,1, moveCB)

    function moveCB() {
       console.log('2222');
    }
  }



  exports.changeCover = function() {
    var cover = m_scenes.get_object_by_name("B_part"); // B_part----monitor
    var image = new Image();
    image.onload = function() {
      // m_tex.replace_image(cover, "monitor", image);
      m_tex.replace_image(cover, "monitor", image);
    }
    image.src = "./images/a_cover_pic-01.jpg";
  }

});
b4w.require("Computer").init();

function changeCover() {
  b4w.require("Computer").changeCover();
}
