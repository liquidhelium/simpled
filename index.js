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
