import { createAction, getGameData } from "../game";

export function changeChapter(name: string) {
    return createAction<"normal">({
        id: "change_chapter",
        type: "normal",
        start() {
            getGameData().currentChapter = name;
            getGameData().currentAction = 0;
        },
        skip() {
            return;
        },
        back() {
            getGameData().currentChapter = name;
            getGameData().currentAction = 0;
        },
    });
}
