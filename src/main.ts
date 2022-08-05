import { parse_JSON_chart } from "./parser/parser";
import { testchart } from "./test_chart";
import { draw_chart } from "./display/display";
window.onload = () => {
    
    var chart = parse_JSON_chart(testchart);
    alert("success!");
    console.log(chart);
    var canvas:HTMLCanvasElement = document.getElementById("draw_area") as HTMLCanvasElement;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    
    var ratio = devicePixelRatio;

    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
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
