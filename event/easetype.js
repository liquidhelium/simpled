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
