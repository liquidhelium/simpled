import { parse_JSON_chart } from "./parser/parser";
import { testchart } from "./test_chart";
import { draw_chart } from "./display/display";
import "./index.css";
window.onload = () => {
    
    var chart = parse_JSON_chart(testchart);
    console.log(chart);
    var canvas:HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
    canvas.onresize = () => {
      canvas_update_ratio(canvas);
    }
    canvas_update_ratio(canvas);
    var btn = document.getElementById("full_screen")
    if (!btn) {throw new Error("no such btn");
    }
    btn.onclick = canvas_full_screen;
    var initialized = false;
    var start_time = 0;
    var f = (time: number)=>{
        if (initialized) {
            draw_chart(chart,canvas,(time-start_time)*0.001);
            requestAnimationFrame(f)
        }else{
            start_time=time;
            initialized=true
            requestAnimationFrame(f)
        }
    }

    requestAnimationFrame(f)
}

function canvas_full_screen() {
  var canvas:HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
  canvas.requestFullscreen();
  canvas_update_ratio(canvas);
  
}

function canvas_update_ratio(canvas: HTMLCanvasElement) {
  var w = window.screen.width;
  var h = window.screen.height;
  console.log("w:",w," h: ",h);
  
  var ratio = devicePixelRatio;

  canvas.width = w * ratio;
  canvas.height = h * ratio;
}