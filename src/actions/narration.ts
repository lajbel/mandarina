import type { MandarinaPlugin } from "../types";
import { getGameData } from "../main";
import { createAction } from "../game";

export function changeChapter(this: MandarinaPlugin, name: string) {
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
