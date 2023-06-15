// All audio related actions

import type { MandarinaPlugin } from "../types";
import { getData } from "../main";
import { createAction } from "../game";

export function playSound(this: MandarinaPlugin, audio: string) {
    const k = getData().k;

    return createAction<"audio">({
        id: "play_sound",
        type: "audio",
        volume: 0.5,
        autoskip: true,
        start() {
            k.play(audio, { volume: this.volume });
        },
        withVolume(vol: number) {
            this.volume = vol;
            return this;
        },
    });
}
