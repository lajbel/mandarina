import type { Action, ActionType, MandarinaPlugin } from "./types";
import { data } from "./main";

// Chapters are how Mandarina novels are organized.
export function addChapter(name: string, actions: () => Action<unknown>[]) {
    data.chapters.set(name, actions());
}

// In a chapter, there are actions, which are the things that happen in the story.
// Actions are functions that are executed in order.
export function createAction<T extends ActionType>(opt: Action<T>): Action<T> {
    return opt;
}

// Process actions info in game
export async function processAction(m: MandarinaPlugin) {
    const chapter = data.chapters.get(data.current.chapter);
    if (!chapter) return;

    const action = chapter[data.current.action];

    // If there's not action, won't do anything.
    if (!action) return;

    if (data.current.runningAction && action && action.skip)
        return action.skip();

    data.current.runningAction = true;

    // Process start action
    await action.start();

    data.current.runningAction = false;

    data.current.action++;
    if (action.autoskip) {
        // TODO: implement
        // action.finish();
        processAction(m);
    }
}
