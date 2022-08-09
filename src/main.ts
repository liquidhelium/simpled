import { parse_JSON_chart } from "./parser/parser";
import { clearCanvas, draw_chart,draw_touch_circle } from "./display/display";
import "./index.css";
import { SimChart } from "./type/chart";
import { init_touch, touch_list} from "./touch/touch";
import { judge, JudgeResult } from "./judgement/judge";

var animation_id = 0;

var mql = window.matchMedia("(orientation: portrait)")

declare global {
  var chart_start: number;
  var current_chart: SimChart;
}
window.onload = () => {
  let file_url =
        'chart2.json'
      let xhr = new XMLHttpRequest();
      xhr.open("get", file_url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          var fr = new FileReader()
          fr.onload=(_ev) =>{
            var f= fr.result as string;
            var chart = parse_JSON_chart(f);
            globalThis.current_chart = chart;
            var canvas: HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
            canvas_update_ratio(canvas);
            connect_all();
              
            mql.addEventListener("change",(_ev) => {canvas_update_ratio(canvas)})
            start_playing(chart,canvas);
          }
          fr.readAsText(xhr.response)
        }
      };
      xhr.send();
  
}

export function canvas_full_screen() {
  var canvas: HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
  canvas.requestFullscreen();
  canvas_update_ratio(canvas);

}

function canvas_update_ratio(canvas: HTMLCanvasElement) {
  var w = canvas.offsetWidth;
  var h = canvas.offsetHeight;

  var ratio = devicePixelRatio;

  canvas.width = Math.max(w,h) * ratio;
  canvas.height = Math.min(w,h) * ratio;
}

function start_playing(chart: SimChart, canvas: HTMLCanvasElement, seek: number = 0) {
  var f = (_time :number) => {
    var time = new Date().getTime()
    var in_chart_time=(time-seek) * .001;
    clearCanvas(canvas);
    draw_chart(chart, canvas, in_chart_time);
    draw_touch_circle(touch_list,canvas);
    judge(chart);
    animation_id = requestAnimationFrame(f)
  }
  seek += new Date().getTime()
  globalThis.chart_start=seek;
  console.log("start timing.")
  animation_id = requestAnimationFrame(f)
}

function abort_playing() {
  cancelAnimationFrame(animation_id)
}

function connect_all() {
  var full = document.getElementById("full_screen");
  
  var load:HTMLInputElement= document.getElementById("upload_file") as HTMLInputElement;


  var canvas: HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;

  
  

  // var _pause = document.getElementById("pause");
  if (!(full && load)) {
    throw new Error("querying err.")
  }
  full.onclick = canvas_full_screen;
  load.onchange =async (_ev:Event) => {  
    var file = load.files? load.files[0]: null;
    if (!file) {return;}
    load_chart(file);
  }

  init_touch(canvas);

}

async function load_chart(file: File)  {
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

export function show_adjust(adjust: number) {
  var adjust_element = document.getElementById("judge_adjust") as HTMLElement;
  adjust_element.innerHTML=adjust.toString();
}

export function show_judge_result(result: JudgeResult) {
  var result_element = document.getElementById("judge_result") as HTMLElement;
  result_element.innerHTML=JudgeResult[result];
}