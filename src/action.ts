// Actions are the core for the chapters in Mandarina
import type { Action, MandarinaCtx } from "./types";

export function createAction(opt: Action): Action {
    return {
        id: opt.id,
        autoskip: opt.autoskip,
        exec: opt.exec,
    };
}

export async function processAction(m: MandarinaCtx) {
    const chapter = m.data.chapters.get(m.data.current.chapter);
    if(!chapter) return;

    const action = chapter[m.data.current.action];

    // Process action
    await action.exec();

    m.data.current.action++;
    // if(action.autoskip) processAction(m);
}