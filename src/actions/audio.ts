// All audio related actions

import type { MandarinaPlugin } from "../types";
import { data } from "../main";
import { createAction } from "../game";

export function playSound(this: MandarinaPlugin, audio: string) {
    const k = data.k;

    return createAction({
        id: "play_sound",
        type: "normal",
        autoskip: true,
        start: () => {
            k.play(audio);
        },
    });
}
