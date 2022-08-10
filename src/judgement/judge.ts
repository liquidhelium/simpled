import { show_adjust, show_judge_result } from "../main";
import { Click, touch_list } from "../touch/touch";
import { Judgement, JudgementType, SimDot, SimChart } from "../type/chart";


const easy = true;

const judge_times = {
    "Perfect": easy ? 50 : 25,
    "Good": easy ? 100 : 50,
    "Bad": easy ? 150 : 75,
}

//see the discription in "is_nearby"
const judge_radius = 0.07;

export function judge(chart: SimChart) {
    for (const group of chart.groups) {
        for (const dot of group.dots) {
            for (const click of touch_list.values()) {
                var judgelist: Judgement[] = [];
                if (is_nearby(dot, click)) {
                    for (const judgeiter of dot.judgements) {
                        if (!judgeiter.judged) {
                            judgelist.push(judgeiter)
                        }
                    }
                }
                judgelist.sort((a, b) => a.time - b.time)
                for (const j of judgelist) {
                    judge_single(j, click);
                }
            }
        }
    }

}

function judge_single(judgement: Judgement, click: Click): JudgeResult {
    var result: JudgeResult;
    switch (judgement.judge_type) {
        case JudgementType.Invalid: throw Error("judgement type is invalid"); break;
        case JudgementType.Tap: result = judge_tap(judgement, click); click.tap_judged = true; break;
    }
    if (result != JudgeResult.None) {
        judgement.judged = true;
    }
    show_judge_result(result);
    return result;
}
function is_nearby(dot: SimDot, click: Click): boolean {
    // I think it may cause performance issues, let's wait and see
    var euclid_distance = Math.sqrt((dot.cached_x - click.x) ** 2 + (dot.cached_y - click.y) ** 2);
    console.log(dot.cached_x,dot.cached_y)
    console.log(euclid_distance);
    
    return euclid_distance < judge_radius
    // return true; //they want to use full screen judge
}

function judge_tap(judgement: Judgement, click: Click): JudgeResult {
    if (click.tap_judged) { return JudgeResult.None }
    var delta_time = (judgement.time - click.press_time + globalThis.chart_start * .001) * 1000; //it's ms
    console.log(delta_time);
    show_adjust(delta_time);
    if (delta_time < judge_times.Perfect && delta_time > -judge_times.Perfect) {
        return JudgeResult.Perfect;
    } else if (delta_time < judge_times.Good && delta_time > -judge_times.Good) {
        return JudgeResult.Good;
    } else if (delta_time < judge_times.Bad && delta_time > -judge_times.Bad) {
        return JudgeResult.Bad;
    } else { return JudgeResult.None }
}


export enum JudgeResult {
    Perfect,
    Good,
    Bad,
    None //没点到
}