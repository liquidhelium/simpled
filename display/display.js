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
