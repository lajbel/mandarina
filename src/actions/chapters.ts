import { createAction, insertChapter } from "game";

export function jump(name: string) {
    return createAction({
        id: "jump",
        type: "normal",
        autoskip: true,
        start() {
            insertChapter(name);
        },
        skip() {
            return;
        },
        back() {},
    });
}
