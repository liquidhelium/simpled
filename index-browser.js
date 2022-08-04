(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.draw_chart = void 0;
var event_1 = require("../event/event");
function draw_chart(chart, canvas, time) {
    var ctx = canvas.getContext("2d");
    // ctx.scale(devicePixelRatio,devicePixelRatio)
    clearCanvas(canvas);
    ctx.lineWidth = 5;
    for (var _i = 0, _a = chart.connections; _i < _a.length; _i++) {
        var line = _a[_i];
        var x1 = (0, event_1.event_array_get_at)(chart.dots[line.from].x_position, time) * canvas.width;
        var x2 = (0, event_1.event_array_get_at)(chart.dots[line.to].x_position, time) * canvas.width;
        var y1 = (0, event_1.event_array_get_at)(chart.dots[line.from].y_position, time) * canvas.height;
        var y2 = (0, event_1.event_array_get_at)(chart.dots[line.to].y_position, time) * canvas.height;
        var alpha = (0, event_1.event_array_get_at)(line.alpha, time);
        console.log(alpha);
        ctx.strokeStyle = "rgba(10,10,10," + (alpha / 255).toString() + ")";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}
exports.draw_chart = draw_chart;
function clearCanvas(c) {
    var cxt = c.getContext("2d");
    cxt.fillStyle = "#FEFEFE";
    cxt.beginPath();
    cxt.fillRect(0, 0, c.width, c.height);
    cxt.closePath();
}

},{"../event/event":3}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.interplot = exports.EaseType = void 0;
var EaseType;
(function (EaseType) {
    EaseType[EaseType["Linear"] = 0] = "Linear";
    EaseType[EaseType["Const"] = 1] = "Const";
    EaseType[EaseType["SineOut"] = 2] = "SineOut";
    EaseType[EaseType["SineIn"] = 3] = "SineIn";
    EaseType[EaseType["QuadOut"] = 4] = "QuadOut";
    EaseType[EaseType["QuadIn"] = 5] = "QuadIn";
})(EaseType || (EaseType = {}));
exports.EaseType = EaseType;
function interplot(time1, time2, y1, y2, time, e_type) {
    var ret;
    console.log(e_type);
    ret = ease(time1, time2, y1, y2, time, tween[e_type]);
    console.log(ret);
    return ret;
}
exports.interplot = interplot;
// function linear(time1: Float, time2: Float,y1: Float,y2: Float, time: Float) : Float{
//     return time1 === time2 ? y1: y1 + (y2-y1) / (time2-time1) * (time - time1)
// }
function ease(time1, time2, y1, y2, time, func) {
    return func((time - time1) / (time2 - time1)) * (y2 - y1) + y1;
}
var tween = [
    function (pos) { return pos; },
    function (pos) { return 0; },
    function (pos) { return Math.sin((pos * Math.PI) / 2); },
    function (pos) { return 1 - Math.cos((pos * Math.PI) / 2); },
    function (pos) { return 1 - Math.pow((pos - 1), 2); },
    function (pos) { return Math.pow(pos, 2); },
    function (pos) { return (1 - Math.cos(pos * Math.PI)) / 2; },
    function (pos) { return ((pos *= 2) < 1 ? Math.pow(pos, 2) : -(Math.pow((pos - 2), 2) - 2)) / 2; },
    function (pos) { return 1 + Math.pow((pos - 1), 3); },
    function (pos) { return Math.pow(pos, 3); },
    function (pos) { return 1 - Math.pow((pos - 1), 4); },
    function (pos) { return Math.pow(pos, 4); },
    function (pos) { return ((pos *= 2) < 1 ? Math.pow(pos, 3) : Math.pow((pos - 2), 3) + 2) / 2; },
    function (pos) { return ((pos *= 2) < 1 ? Math.pow(pos, 4) : -(Math.pow((pos - 2), 4) - 2)) / 2; },
    function (pos) { return 1 + Math.pow((pos - 1), 5); },
    function (pos) { return Math.pow(pos, 5); },
    function (pos) { return 1 - Math.pow(2, (-10 * pos)); },
    function (pos) { return Math.pow(2, (10 * (pos - 1))); },
    function (pos) { return Math.sqrt(1 - Math.pow((pos - 1), 2)); },
    function (pos) { return 1 - Math.sqrt(1 - Math.pow(pos, 2)); },
    function (pos) { return (2.70158 * pos - 1) * Math.pow((pos - 1), 2) + 1; },
    function (pos) { return (2.70158 * pos - 1.70158) * Math.pow(pos, 2); },
    function (pos) { return ((pos *= 2) < 1 ? 1 - Math.sqrt(1 - Math.pow(pos, 2)) : Math.sqrt(1 - Math.pow((pos - 2), 2)) + 1) / 2; },
    function (pos) { return (pos < 0.5 ? (14.379638 * pos - 5.189819) * Math.pow(pos, 2) : (14.379638 * pos - 9.189819) * Math.pow((pos - 1), 2) + 1); },
    function (pos) { return 1 - Math.pow(2, (-10 * pos)) * Math.cos((pos * Math.PI) / 0.15); },
    function (pos) { return Math.pow(2, (10 * (pos - 1))) * Math.cos(((pos - 1) * Math.PI) / 0.15); },
    function (pos) { return ((pos *= 11) < 4 ? Math.pow(pos, 2) : pos < 8 ? Math.pow((pos - 6), 2) + 12 : pos < 10 ? Math.pow((pos - 9), 2) + 15 : Math.pow((pos - 10.5), 2) + 15.75) / 16; },
    function (pos) { return 1 - tween[26](1 - pos); },
    function (pos) { return ((pos *= 2) < 1 ? tween[26](pos) / 2 : tween[27](pos - 1) / 2 + 0.5); },
    function (pos) { return (pos < 0.5 ? Math.pow(2, (20 * pos - 11)) * Math.sin(((160 * pos + 1) * Math.PI) / 18) : 1 - Math.pow(2, (9 - 20 * pos)) * Math.sin(((160 * pos + 1) * Math.PI) / 18)); },
];

},{}],3:[function(require,module,exports){
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

},{"./easetype":2}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var parser_1 = require("./parser/parser");
var test_chart_1 = require("./test_chart");
var display_1 = require("./display/display");
window.onload = function () {
    var chart = (0, parser_1.parse_JSON_chart)(test_chart_1.testchart);
    alert("success!");
    console.log(chart);
    var canvas = document.getElementById("draw_area");
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    var ratio = devicePixelRatio;
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    var initialized = false;
    var start_time = 0;
    var f = function (time) {
        if (initialized) {
            (0, display_1.draw_chart)(chart, canvas, (time - start_time) * 0.001);
            requestAnimationFrame(f);
        }
        else {
            start_time = time;
            initialized = true;
            requestAnimationFrame(f);
        }
    };
    requestAnimationFrame(f);
};

},{"./display/display":1,"./parser/parser":5,"./test_chart":6}],5:[function(require,module,exports){
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

},{"../event/event":3,"../type/chart":7}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.testchart = void 0;
exports.testchart = '{\
    "dots": [\
      {\
        "id": 0,\
        "x_position": [\
          {\
            "start_time": 0,\
            "end_time": 5,\
            "start_value": 0.3,\
            "end_value": 0.3,\
            "ease_type": 1\
          },\
          {\
            "start_time": 5,\
            "end_time": 6,\
            "start_value": 0.3,\
            "end_value": 0,\
            "ease_type": 0\
          }\
        ],\
        "y_position": [\
          {\
            "start_time": 0,\
            "end_time": 5,\
            "start_value": 0.5,\
            "end_value": 0.5,\
            "ease_type": 1\
          },\
          {\
            "start_time": 5,\
            "end_time": 6,\
            "start_value": 0.5,\
            "end_value": 0,\
            "ease_type": 5\
          }\
        ],\
        "judgements": [\
          {\
            "time": -1,\
            "judge_type": "Invalid"\
          }\
        ]\
      },\
      {\
        "id": 1,\
        "x_position": [\
          {\
            "start_time": 0,\
            "end_time": 5,\
            "start_value": 0.7,\
            "end_value": 0.7,\
            "ease_type": 1\
          },\
          {\
            "start_time": 5,\
            "end_time": 6,\
            "start_value": 0.7,\
            "end_value": 1,\
            "ease_type": 5\
          }\
        ],\
        "y_position": [\
          {\
            "start_time": 0,\
            "end_time": 5,\
            "start_value": 0.5,\
            "end_value": 0.5,\
            "ease_type": 1\
          },\
          {\
            "start_time": 5,\
            "end_time": 6,\
            "start_value": 0.5,\
            "end_value": 0,\
            "ease_type": 5\
          }\
        ],\
        "judgements": [\
          {\
            "time": -1,\
            "judge_type": "Invalid"\
          }\
        ]\
      }\
    ],\
    "connections": [\
      {\
        "from": 0,\
        "to": 1,\
        "alpha": [\
          {\
            "start_time": 0,\
            "end_time": 5,\
            "start_value": 255,\
            "end_value": 255,\
            "ease_type": 1\
          },\
          {\
            "start_time": 5,\
            "end_time": 6,\
            "start_value": 255,\
            "end_value": 0,\
            "ease_type": 5\
          }\
        ]\
      }\
    ],\
    "description": "改进后的谱面"\
  }\
  ';

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.SimDot = exports.SimConnection = exports.SimChart = exports.JudgementType = exports.Judgement = void 0;
var event_1 = require("../event/event");
var JudgementType;
(function (JudgementType) {
    JudgementType[JudgementType["Invalid"] = 0] = "Invalid";
    JudgementType[JudgementType["Hit"] = 1] = "Hit";
})(JudgementType || (JudgementType = {}));
exports.JudgementType = JudgementType;
var Judgement = /** @class */ (function () {
    function Judgement(time, // second
    judge_type) {
        if (time === void 0) { time = 0.0; }
        if (judge_type === void 0) { judge_type = JudgementType.Invalid; }
        this.time = time;
        this.judge_type = judge_type;
    }
    return Judgement;
}());
exports.Judgement = Judgement;
var SimConnection = /** @class */ (function () {
    function SimConnection(from, to, alpha) {
        if (from === void 0) { from = -1; }
        if (to === void 0) { to = -1; }
        if (alpha === void 0) { alpha = [new event_1.Event()]; }
        this.from = from;
        this.to = to;
        this.alpha = alpha;
    }
    return SimConnection;
}());
exports.SimConnection = SimConnection;
var SimDot = /** @class */ (function () {
    function SimDot(id, x_position, y_position, judgements) {
        if (id === void 0) { id = 0; }
        if (x_position === void 0) { x_position = [new event_1.Event()]; }
        if (y_position === void 0) { y_position = [new event_1.Event()]; }
        if (judgements === void 0) { judgements = [new Judgement()]; }
        this.id = id;
        this.x_position = x_position;
        this.y_position = y_position;
        this.judgements = judgements;
    }
    return SimDot;
}());
exports.SimDot = SimDot;
var SimChart = /** @class */ (function () {
    function SimChart(dots, connections, description) {
        if (dots === void 0) { dots = [new SimDot()]; }
        if (connections === void 0) { connections = [new SimConnection()]; }
        this.dots = dots;
        this.connections = connections;
        this.description = description;
    }
    return SimChart;
}());
exports.SimChart = SimChart;

},{"../event/event":3}]},{},[4]);
