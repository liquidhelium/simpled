import { Float, Int32 } from "./explicit_type";
import { Event } from "../event/event";

export {Judgement,JudgementType,SimChart,SimConnection,SimDot}
enum JudgementType {
    Invalid,
    Hit,
}

class Judgement {
    time: Float; // second
    judge_type:JudgementType;
    constructor(
        time: Float = 0.0, // second
        judge_type:JudgementType = JudgementType.Invalid
    ) {
        this.time=time;
        this.judge_type = judge_type;
    }
}

class SimConnection {
    from: Int32;
    to: Int32;
    alpha: Array<Event>;
    constructor(
        from: Int32 = -1,
        to: Int32 = -1,
        alpha: Array<Event> = [new Event()]
    ) {
        this.from=from;
        this.to = to;
        this.alpha = alpha;
    }
}

class SimDot {
    id: Int32;
    x_position: Array<Event>;
    y_position: Array<Event>;
    judgements: Array<Judgement>;
    constructor(
        id: Int32=0,
        x_position: Array<Event> = [new Event()],
        y_position: Array<Event> = [new Event()],
        judgements: Array<Judgement> = [new Judgement()],
    ) {
        this.id=id;
        this.x_position=x_position;
        this.y_position=y_position;
        this.judgements=judgements;
    }
}

class SimChart {
    description: String;
    connections: SimConnection[];
    dots: SimDot[];
    constructor(
        dots: Array<SimDot> = [new SimDot()],
        connections: Array<SimConnection> = [new SimConnection()],
        description: String
    ) {
        this.dots = dots;
        this.connections = connections;
        this.description = description
    }
}