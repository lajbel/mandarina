import { createAction, insertChapter } from "game";

export function jump(name: string) {
    return createAction({
        id: "jump",
        type: "normal",
        autoSkip: true,
        start() {
            insertChapter(name);
        },
        skip() {
            return;
        },
        back() {},
    });
}
