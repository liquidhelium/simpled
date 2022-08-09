
import { Event } from '../event/event';
import { Judgement, JudgementType, MovingBezier, SimChart, SimConnection, SimDot } from '../type/chart';
export function parse_JSON_chart(str: String):SimChart{
    try {
        var chart=JSON.parse(str as string);
    }catch (e){
        console.error("unable to load chart");
        throw e;
    }
    return make_simchart(chart)
}

function make_event(value:any): Event{
    return new Event(
        value.start_time,
        value.end_time,
        value.start_value, 
        value.end_value,
        value.ease_type,
    )
}

function make_judgement(value: any): Judgement{
    return new Judgement(
        value.time,
        value.judge_type as JudgementType
    )
}

function make_array<T>(value: any, f: (arg0: any) => T): T[] {
    var arr: T[] =[];
    for (let v of value) {
        arr.push(f(v));
    }
    return arr;
}

function make_simconnection(value: any): SimConnection {
    
    return new SimConnection(
        value.from,
        value.to,
        make_array(value.alpha,make_event),
        make_bezier(value.line)
    )
}

function make_bezier(value: any): MovingBezier {
    return new MovingBezier(
        make_array(value.x, make_event),
        make_array(value.y, make_event)
    )
}

function make_simdot(value: any): SimDot {
    return new SimDot(
        value.id,
        make_array(value.x_position,make_event),
        make_array(value.y_position,make_event),
        make_array(value.judgements,make_judgement)
    )
}

function make_simchart(value:any):SimChart {
    return new SimChart(
        make_array(value.dots, make_simdot),
        make_array(value.connections,make_simconnection),
        value.description
    )
}

