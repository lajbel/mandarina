import type { Action, ActionType, MandarinaPlugin } from "./types";

// Chapters are how Mandarina novels are organized.
export function addChapter(this: MandarinaPlugin, name: string, actions: () => Action<unknown>[]) {
    this.data.chapters.set(name, actions());
}

// In a chapter, there are actions, which are the things that happen in the story.
// Actions are functions that are executed in order.
export function createAction<T extends ActionType>(opt: Action<T>): Action<T> {
    return opt;
}

// Process actions info in game
export async function processAction(m: MandarinaPlugin) {
    const chapter = m.data.chapters.get(m.data.current.chapter);
    if(!chapter) return;

    const action = chapter[m.data.current.action];

    // If there's not action, won't do anything.
    if(!action) return;

    if(m.data.current.runningAction && action && action.skip) return action.skip();

    m.data.current.runningAction = true;

    // Process action
    await action.exec();

    m.data.current.runningAction = false;

    m.data.current.action++;
    if(action.autoskip) processAction(m);
}

