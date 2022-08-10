import { Float } from "../type/explicit_type"
import { event_array_get_at } from "../event/event"
import { Group, SimChart } from "../type/chart"
import { Click } from "../touch/touch"


export function draw_group(
    group: Group,
    ctx: CanvasRenderingContext2D,
    time: Float, w:number,h:number) {
    // ctx.scale(devicePixelRatio,devicePixelRatio)
    ctx.lineWidth = 5;
    ctx.lineCap = "butt";
    for (let line of group.connections) {
        var x1,x2,y1,y2;
        x1 = event_array_get_at(group.dots[line.from].x_position, time) * w;
        x2 = event_array_get_at(group.dots[line.to].x_position, time) * w;
        y1 = event_array_get_at(group.dots[line.from].y_position, time) * h;
        y2 = event_array_get_at(group.dots[line.to].y_position, time) * h;
                       
        
        var p1 = screen_mapto_canvas([x1,y1], ctx);
        var p2 = screen_mapto_canvas([x2,y2],ctx);
        group.dots[line.from].cached_x = p1[0] / w;
        group.dots[line.from].cached_y = p1[1] / h;
        group.dots[line.to].cached_x = p2[0] / w;
        group.dots[line.to].cached_y = p2[1] / h;
        var alpha = event_array_get_at(line.alpha,time);
        ctx.strokeStyle = "rgba("+line.color[0]+","+line.color[1]+","+line.color[2]+"," +(alpha/255).toString()+ ")"
        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.stroke();
    }
}

export function draw_chart(chart: SimChart, canvas: HTMLCanvasElement,time:Float) {
    var ctx = canvas.getContext("2d")
    if (!ctx) {throw Error("no context")}
    for (const group of chart.groups) {
        const x = event_array_get_at(group.x,time);
        const y = event_array_get_at(group.y, time);
        console.log(x,y);
        const radians = event_array_get_at(group.angle,time) / 180 * Math.PI;
        ctx.save();
        ctx.translate(x*canvas.width,y*canvas.height);
        ctx.rotate(radians);
        draw_group(group,ctx,time,canvas.width,canvas.height);
        ctx.restore();
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

function get_canvas_matrix(ctx: CanvasRenderingContext2D): DOMMatrix{
    const trans = ctx.getTransform()
    if (!trans.is2D) {console.warn("the matrix is not inversable. It shouldn't happen.");
    }
    return trans
}

function matrix_mutiply(pt:[number,number],mat: DOMMatrix): [number,number] {
    var {a,b,c,d,e,f} = mat
    return [pt[0]*a+pt[1]*b+e,pt[0]*c+pt[1]*d+f]
}

export function screen_mapto_canvas(pt:[number,number], ctx: CanvasRenderingContext2D): [number,number]{
    var trans = get_canvas_matrix(ctx);
    return matrix_mutiply(pt,trans)
}

export function canvas_mapto_screen(pt:[number,number], ctx:CanvasRenderingContext2D): [number,number] {
    var trans = get_canvas_matrix(ctx).inverse();
    return matrix_mutiply(pt,trans)
}