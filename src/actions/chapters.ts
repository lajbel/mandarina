import { createAction, getGameData } from "../game";

export function jump(name: string) {
    return createAction<"normal">({
        id: "jump",
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
