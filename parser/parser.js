"use strict";
exports.__esModule = true;
exports.parse_JSON_chart = void 0;
var event_1 = require("../event/event");
var chart_1 = require("../type/chart");
function parse_JSON_chart(str) {
    try {
        var chart = JSON.parse(str);
    }
    catch (_a) {
        console.error("unable to load chart");
        throw Error;
    }
    return make_simchart(chart);
}
exports.parse_JSON_chart = parse_JSON_chart;
function make_event(value) {
    return new event_1.Event(value.start_time, value.end_time, value.start_value, value.end_value, value.ease_type);
}
function make_judgement(value) {
    return new chart_1.Judgement(value.time, value.judge_type);
}
function make_array(value, f) {
    var arr = [];
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var v = value_1[_i];
        arr.push(f(v));
    }
    return arr;
}
function make_simconnection(value) {
    return new chart_1.SimConnection(value.from, value.to, make_array(value.alpha, make_event));
}
function make_simdot(value) {
    return new chart_1.SimDot(value.id, make_array(value.x_position, make_event), make_array(value.y_position, make_event), make_array(value.judgements, make_judgement));
}
function make_simchart(value) {
    return new chart_1.SimChart(make_array(value.dots, make_simdot), make_array(value.connections, make_simconnection), value.description);
}
