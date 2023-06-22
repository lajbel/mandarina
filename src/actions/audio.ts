// All audio related actions
import type * as KA from "kaboom";
import type { MandarinaPlugin } from "../types";
import { getGameData } from "../main";
import { createAction } from "../game";

export function playSound(this: MandarinaPlugin, audio: string) {
    const k = getGameData().k;
    let audioPlay: KA.AudioPlay;

    // TODO: Accept an audio options object
    return createAction<"audio">({
        id: "play_sound",
        type: "audio",
        volume: 0.5,
        autoskip: true,
        start() {
            audioPlay = k.play(audio, { volume: this.volume });
        },
        skip() {
            return;
        },
        back() {
            if (!audioPlay) return;
            audioPlay.paused = true;
        },
        withVolume(vol: number) {
            this.volume = vol;
            return this;
        },
    });
}
