import { createAction, getGameData } from "../game";

export function changeChapter(name: string) {
    return createAction<"normal">({
        id: "change_chapter",
        type: "normal",
        autoskip: true,
        start() {
            getGameData().currentAction = -1;
            getGameData().currentChapter = name;
        },
        skip() {
            return;
        },
        back() {
            getGameData().currentAction = -1;
            getGameData().currentChapter = name;
        },
    });
}
