import type { Action, MandarinaCtx } from "./types";

// Chapters are how Mandarina novels are organized.
export function addChapter(this: MandarinaCtx, name: string, actions: () => Action[]) {
    this.data.chapters.set(name, actions());
}

// In a chapter, there are actions, which are the things that happen in the story.
// Actions are functions that are executed in order.
export function createAction(opt: Action): Action {
    return {...opt};
}

// Process actions info in game
export async function processAction(m: MandarinaCtx) {
    const chapter = m.data.chapters.get(m.data.current.chapter);
    if(!chapter) return;

    const action = chapter[m.data.current.action];

    // Process action
    var done = await action.exec(() => processAction(m));

    if (done) m.data.current.action++;
    // if(action.autoskip) processAction(m);
}

