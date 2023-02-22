// Actions are the core for the chapters in Mandarina
import type { Action } from "./types";

export function createAction(opt: Action): Action {
    return {
        id: opt.id,
        autoskip: opt.autoskip,
        exec: opt.exec,
    };
}
