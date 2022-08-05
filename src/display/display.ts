import { Float } from "../type/explicit_type"
import { event_array_get_at } from "../event/event"
import { SimChart } from "../type/chart"


export function draw_chart(
    chart: SimChart,
    canvas: any,
    time: Float) {
    var ctx: CanvasRenderingContext2D=canvas.getContext("2d")
    // ctx.scale(devicePixelRatio,devicePixelRatio)
    clearCanvas(canvas)
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    for (let line of chart.connections) {
        var x1 = event_array_get_at(chart.dots[line.from].x_position, time) * canvas.width;
        var x2 = event_array_get_at(chart.dots[line.to].x_position, time) * canvas.width;
        var y1 = event_array_get_at(chart.dots[line.from].y_position, time) * canvas.height;
        var y2 = event_array_get_at(chart.dots[line.to].y_position, time) * canvas.height;
        var alpha = event_array_get_at(line.alpha,time);
        ctx.strokeStyle = "rgba(10,10,10," +(alpha/255).toString()+ ")"
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
}

function clearCanvas(c:any)  
{ 
    var cxt=c.getContext("2d");  
      
    cxt.fillStyle="#FEFEFE";  
    cxt.beginPath();  
    cxt.fillRect(0,0,c.width,c.height);  
    cxt.closePath();  
} 
