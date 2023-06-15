// All audio related actions

import type { MandarinaPlugin } from "../types";
import { getData } from "../main";
import { createAction } from "../game";

export function playSound(this: MandarinaPlugin, audio: string) {
    const k = getData().k;

    return createAction<"normal">({
        id: "play_sound",
        type: "normal",
        autoskip: true,
        start: () => {
            k.play(audio);
        },
    });
}
