import { Float } from "../type/explicit_type";

export {EaseType,interplot}
enum EaseType {
    Linear,
    Const,
    SineOut,
    SineIn,
    QuadOut,
    QuadIn
}

function interplot(time1: Float, time2: Float, y1: Float, y2: Float, time: Float, e_type: EaseType): Float{
    var ret:Float;
    ret = ease(time1,time2,y1,y2,time,tween[e_type])
    
    return ret
}

// function linear(time1: Float, time2: Float,y1: Float,y2: Float, time: Float) : Float{
//     return time1 === time2 ? y1: y1 + (y2-y1) / (time2-time1) * (time - time1)
// }

function ease(time1: Float, time2: Float,y1: Float,y2: Float, time: Float, func: (pos:number) => number) : Float{
    return func((time-time1)/(time2-time1)) * (y2 - y1) + y1
}

const tween: ((pos: number) => number)[] = [
    (pos: number) => pos,
    (_pos: number) => 1,
    (pos: number) => Math.sin((pos * Math.PI) / 2), 
    (pos: number) => 1 - Math.cos((pos * Math.PI) / 2),
    (pos: number) => 1 - (pos - 1) ** 2,
    (pos: number) => pos ** 2,
    (pos: number) => (1 - Math.cos(pos * Math.PI)) / 2,
    (pos: number) => ((pos *= 2) < 1 ? pos ** 2 : -((pos - 2) ** 2 - 2)) / 2,
    (pos: number) => 1 + (pos - 1) ** 3, 
    (pos: number) => pos ** 3,
    (pos: number) => 1 - (pos - 1) ** 4, 
    (pos: number) => pos ** 4, 
    (pos: number) => ((pos *= 2) < 1 ? pos ** 3 : (pos - 2) ** 3 + 2) / 2, 
    (pos: number) => ((pos *= 2) < 1 ? pos ** 4 : -((pos - 2) ** 4 - 2)) / 2, 
    (pos: number) => 1 + (pos - 1) ** 5, 
    (pos: number) => pos ** 5, 
    (pos: number) => 1 - 2 ** (-10 * pos), 
    (pos: number) => 2 ** (10 * (pos - 1)), 
    (pos: number) => Math.sqrt(1 - (pos - 1) ** 2), 
    (pos: number) => 1 - Math.sqrt(1 - pos ** 2), 
    (pos: number) => (2.70158 * pos - 1) * (pos - 1) ** 2 + 1, 
    (pos: number) => (2.70158 * pos - 1.70158) * pos ** 2, 
    (pos: number) => ((pos *= 2) < 1 ? 1 - Math.sqrt(1 - pos ** 2) : Math.sqrt(1 - (pos - 2) ** 2) + 1) / 2, 
    (pos: number) => (pos < 0.5 ? (14.379638 * pos - 5.189819) * pos ** 2 : (14.379638 * pos - 9.189819) * (pos - 1) ** 2 + 1), 
    (pos: number) => 1 - 2 ** (-10 * pos) * Math.cos((pos * Math.PI) / 0.15), 
    (pos: number) => 2 ** (10 * (pos - 1)) * Math.cos(((pos - 1) * Math.PI) / 0.15), 
    (pos: number) => ((pos *= 11) < 4 ? pos ** 2 : pos < 8 ? (pos - 6) ** 2 + 12 : pos < 10 ? (pos - 9) ** 2 + 15 : (pos - 10.5) ** 2 + 15.75) / 16, 
    (pos: number) => 1 - tween[26](1 - pos), 
    (pos: number) => ((pos *= 2) < 1 ? tween[26](pos) / 2 : tween[27](pos - 1) / 2 + 0.5), 
    (pos: number) => (pos < 0.5 ? 2 ** (20 * pos - 11) * Math.sin(((160 * pos + 1) * Math.PI) / 18) : 1 - 2 ** (9 - 20 * pos) * Math.sin(((160 * pos + 1) * Math.PI) / 18)), 
];