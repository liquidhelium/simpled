import { Float, Int32 } from "../type/explicit_type"
import { EaseType, interplot } from "./easetype";
export {Event,event_bisect,event_array_get_at}
class Event {
    start_time: Float;
    end_time: Float;
    start_value:Float;
    end_value:Float;
    ease_type:EaseType;
    constructor(
        start_time:Float = 0.0,
        end_time:Float= 0.0,
        start_value:Float= 0.0,
        end_value:Float= 0.0,
        ease_type:EaseType=EaseType.Const) {
        this.start_time = start_time;
        this.end_time = end_time;
        this.start_value = start_value;
        this.end_value = end_value;
        this.ease_type = ease_type;
    }
    get_at(time:Float) : Float {
        return interplot(this.start_time, this.end_time,this.start_value, this.end_value, time, this.ease_type)
    }

}



function event_bisect(arr:Array<Event>, value: Float, start: Int32=0, end: Int32=arr.length) :Int32{
    if(start > end) {
        return -1
    }
    let mid = Math.floor((end + start) / 2)
    if(arr[mid].start_time <= value && arr[mid].end_time >= value) {
        return mid
    } else if(arr[mid].start_time > value) {
        end = mid -1
        return event_bisect(arr, value, start, end)
    } else {
        start = mid + 1
        return event_bisect(arr, value, start, end)
    }
}

function event_array_get_at(arr: Array<Event>, time:Float) : Float {
    var a = arr[event_bisect(arr, time)].get_at(time)
    return a
}