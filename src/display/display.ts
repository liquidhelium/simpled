import { Float } from "../type/explicit_type"
import { event_array_get_at } from "../event/event"
import { SimChart } from "../type/chart"
import { Click } from "../touch/touch"


export function draw_chart(
    chart: SimChart,
    canvas: any,
    time: Float) {
    var ctx: CanvasRenderingContext2D=canvas.getContext("2d")
    // ctx.scale(devicePixelRatio,devicePixelRatio)
    ctx.lineWidth = 5;
    ctx.lineCap = "butt";
    for (let line of chart.connections) {
        var x1,x2,y1,y2;
        chart.dots[line.from].cached_x = x1 = event_array_get_at(chart.dots[line.from].x_position, time)
        chart.dots[line.to].cached_x = x2 = event_array_get_at(chart.dots[line.to].x_position, time)
        chart.dots[line.from].cached_y = y1 = event_array_get_at(chart.dots[line.from].y_position, time)
        chart.dots[line.to].cached_y = y2 = event_array_get_at(chart.dots[line.to].y_position, time)
        x1 *= canvas.width;
        x2 *=canvas.width;
        y1 *=canvas.height;
        y2 *=canvas.height;
        var alpha = event_array_get_at(line.alpha,time);
        ctx.strokeStyle = "rgba(10,10,10," +(alpha/255).toString()+ ")"
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
}

export function clearCanvas(c:HTMLCanvasElement)  
{ 
    var cxt=c.getContext("2d");
    if (!cxt) {throw Error("no context")}
      
    cxt.fillStyle="#FEFEFE";  
    cxt.beginPath();  
    cxt.fillRect(0,0,c.width,c.height);  
    cxt.closePath();  
} 

export function draw_touch_circle(touch_list: Map<number,Click>,c:HTMLCanvasElement) {
    var ctx=c.getContext("2d");
    if (!ctx) {throw Error("no context")}
    ctx.font = "50px arial"
    ctx.textAlign="center"
    ctx.textBaseline="middle"
    for (const i of touch_list.values()) {

        ctx.fillStyle = "#00000099"
        ctx.beginPath();
        ctx.arc(i.x*c.width,i.y*c.height,50,0, 2*Math.PI)
        ctx.fill()
        var txt = i.id.toString();
        ctx.fillText(txt,i.x*c.width,i.y*c.height,45)
    }
    
}