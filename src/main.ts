import { parse_JSON_chart } from "./parser/parser";
import { testchart } from "./test_chart";
import { draw_chart } from "./display/display";
import "./index.css";
import { SimChart } from "./type/chart";

var animation_id = 0;

window.onload = () => {
  var chart = parse_JSON_chart(testchart);
  var canvas: HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
  canvas_update_ratio(canvas);
  connect_all();
  start_playing(chart,canvas);

}

export function canvas_full_screen() {
  var canvas: HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
  canvas.requestFullscreen();
  canvas_update_ratio(canvas);

}

function canvas_update_ratio(canvas: HTMLCanvasElement) {
  var w = window.screen.width;
  var h = window.screen.height;

  var ratio = devicePixelRatio;

  canvas.width = w * ratio;
  canvas.height = h * ratio;
}

function start_playing(chart: SimChart, canvas: HTMLCanvasElement) {
  var initialized=false;
  var start_time=0;
  var f = (time: number) => {
    if (initialized) {
      draw_chart(chart, canvas, (time - start_time) * 0.001);
      animation_id = requestAnimationFrame(f)
    } else {
      start_time = time;
      initialized = true
      animation_id = requestAnimationFrame(f)
    }
  }

  animation_id = requestAnimationFrame(f)
}
function abort_playing() {
  cancelAnimationFrame(animation_id)
}

function connect_all() {
  var full = document.getElementById("full_screen");
  
  var load:HTMLInputElement= document.getElementById("upload_file") as HTMLInputElement;

  // var _pause = document.getElementById("pause");
  if (!(full && load)) {
    throw new Error("querying err.")
  }
  full.onclick = canvas_full_screen;
  load.onchange = async (_ev) => {
    var file = load.files? load.files[0]: null;
    if (!file) {return;}
    var text = await file.text()
    try {
        var chart = parse_JSON_chart(text)
    }catch(e) {
      console.warn(e)
      return;
    }
    abort_playing();
    var canvas: HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
    start_playing(chart,canvas)
  } 

}