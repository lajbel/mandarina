import { createAction, getGameData } from "../game.ts";

export function jump(name: string) {
    return createAction({
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
