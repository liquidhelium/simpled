import { Float, Int32 } from "./explicit_type";
import { Event } from "../event/event";
import { EaseType } from "../event/easetype";

export { Judgement, JudgementType, Group, SimConnection, SimDot, SimChart}
enum JudgementType {
    Invalid,
    Tap,
}

class Judgement {
    time: Float; // second
    judge_type: JudgementType; // 判定类型
    judged: boolean = false; // 已经判完了?
    constructor(
        time: Float = 0.0, // second
        judge_type: JudgementType = JudgementType.Invalid
    ) {
        this.time = time;
        this.judge_type = judge_type;
    }
}

class SimConnection {
    from: Int32; //点, 数组下标
    to: Int32;
    alpha: Array<Event>;
    color: [number, number, number];
    line: MovingBezier;
    constructor(
        from: Int32 = -1,
        to: Int32 = -1,
        alpha: Array<Event> = [new Event()],
        line: MovingBezier = new MovingBezier(),
        color: [number, number, number] = [0, 0, 0]
    ) {
        this.from = from;
        this.to = to;
        this.alpha = alpha;
        this.line = line;
        this.color = color;
    }
}
export class MovingBezier {
    x: Array<Event>;
    y: Array<Event>;
    constructor(
        x: Event[] = [new Event()],
        y: Event[] = [new Event()],
    ) {
        this.x = x;
        this.y = y;
    }
}
class SimDot {
    id: Int32;
    x_position: Array<Event>;
    y_position: Array<Event>;
    judgements: Array<Judgement>;
    cached_x: Float = 0;
    cached_y: Float = 0;
    constructor(
        id: Int32 = 0,
        x_position: Array<Event> = [new Event()],
        y_position: Array<Event> = [new Event()],
        judgements: Array<Judgement> = [new Judgement()],
    ) {
        this.id = id;
        this.x_position = x_position;
        this.y_position = y_position;
        this.judgements = judgements;
    }
}

class Group {
    description: String;
    connections: SimConnection[];
    dots: SimDot[];
    x: Event[];
    y: Event[];
    angle: Event[];
    constructor(
        description: String,
        dots: Array<SimDot> = [new SimDot()],
        connections: Array<SimConnection> = [new SimConnection()],
        
        x: Event[] = [new Event(-10000,10000,0,0,EaseType.Const)],
        y: Event[] = [new Event(-10000,10000,0,0,EaseType.Const)],
        angle: Event[] = [new Event(-10000,10000,0,0,EaseType.Const)],
    ) {
        this.dots = dots;
        this.connections = connections;
        this.description = description;
        this.x=x;
        this.y=y;
        this.angle=angle;
    }
}

class SimChart {
    description: String;
    groups: Group[];
    constructor(
        description: String = "Untitled chart",
        groups: Group[] = [new Group(description = "Unnamed Group")]
    ) {
        this.description=description;
        this.groups=groups;
    }
}