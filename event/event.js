"use strict";
exports.__esModule = true;
exports.event_array_get_at = exports.event_bisect = exports.Event = void 0;
var easetype_1 = require("./easetype");
var Event = /** @class */ (function () {
    function Event(start_time, end_time, start_value, end_value, ease_type) {
        if (start_time === void 0) { start_time = 0.0; }
        if (end_time === void 0) { end_time = 0.0; }
        if (start_value === void 0) { start_value = 0.0; }
        if (end_value === void 0) { end_value = 0.0; }
        if (ease_type === void 0) { ease_type = easetype_1.EaseType.Const; }
        this.start_time = start_time;
        this.end_time = end_time;
        this.start_value = start_value;
        this.end_value = end_value;
        this.ease_type = ease_type;
    }
    Event.prototype.get_at = function (time) {
        return (0, easetype_1.interplot)(this.start_time, this.end_time, this.start_value, this.end_value, time, this.ease_type);
    };
    return Event;
}());
exports.Event = Event;
function event_bisect(arr, value, start, end) {
    if (start === void 0) { start = 0; }
    if (end === void 0) { end = arr.length; }
    if (start > end) {
        return -1;
    }
    var mid = Math.floor((end + start) / 2);
    if (arr[mid].start_time <= value && arr[mid].end_time >= value) {
        return mid;
    }
    else if (arr[mid].start_time > value) {
        end = mid - 1;
        return event_bisect(arr, value, start, end);
    }
    else {
        start = mid + 1;
        return event_bisect(arr, value, start, end);
    }
}
exports.event_bisect = event_bisect;
function event_array_get_at(arr, time) {
    var a = arr[event_bisect(arr, time)].get_at(time);
    return a;
}
exports.event_array_get_at = event_array_get_at;
