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
