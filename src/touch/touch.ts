export class Click {
    x: number;
    y: number;
    press_time: number;
    id: number;
    tap_judged: boolean = false;
    in_judge: boolean = false;

    constructor(dx: number, dy: number, id: number) {
        this.x = dx;
        this.y = dy;
        this.id = id;
        this.press_time = new Date().getTime() *.001
    }


}

export var touch_list: Map<number, Click> = new Map()

export function init_touch(canvas: HTMLCanvasElement) {
    const res = canvas.getContext("2d");
    if (!res) {throw Error("No context")}
    var ctx = res
    canvas.ontouchstart = (ev) => {
        ev.preventDefault()
        for (let index = 0; index < ev.touches.length; index++) {
            const touch = ev.touches[index];
            var real_x = (touch.pageX - canvas.offsetLeft)/ canvas.offsetWidth //*canvas.width;
            var real_y = (touch.pageY - canvas.offsetTop)/ canvas.offsetHeight //* canvas.height;
            // var in_canvas_pos = screen_mapto_canvas([real_x,real_y],ctx);
            touch_list.set(touch.identifier, new Click(real_x,real_y,touch.identifier))
        }
    }
    canvas.ontouchmove = (ev) => {
        ev.preventDefault()

        for (let index = 0; index < ev.touches.length; index++) {
            const touch = ev.touches[index];
            var real_x = (touch.pageX - canvas.offsetLeft)/ canvas.offsetWidth;// *canvas.width;
            var real_y = (touch.pageY - canvas.offsetTop)/ canvas.offsetHeight;// * canvas.height;
            // var in_canvas_pos = screen_mapto_canvas([real_x,real_y],ctx);
            (touch_list.get(touch.identifier) as Click).x = real_x;
            (touch_list.get(touch.identifier) as Click).y = real_y;
        }
    }
    canvas.ontouchend = (ev) => {
        ev.preventDefault()
        for (let index = 0; index < ev.changedTouches.length; index++) {
            const idx = ev.changedTouches[index].identifier;
            touch_list.delete(idx)

        }
    }
    canvas.ontouchcancel = (ev) => {
        ev.preventDefault()
        for (let index = 0; index < ev.changedTouches.length; index++) {
            const idx = ev.changedTouches[index].identifier;
            touch_list.delete(idx)

        }

    }
}