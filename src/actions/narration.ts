import type { MandarinaPlugin } from "../types";
import { getGameData } from "../main";
import { createAction } from "../game";

export function changeChapter(this: MandarinaPlugin, name: string) {
    return createAction<"normal">({
        id: "change_chapter",
        type: "normal",
        start() {
            getGameData().current.chapter = name;
            getGameData().current.action = -1;
        },
        skip() {
            return;
        },
        back() {
            getGameData().current.chapter = name;
            getGameData().current.action = -1;
        },
    });
}
