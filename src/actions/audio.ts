// All audio related actions
import type * as KA from "kaboom";
import { getGameData } from "../main";
import { createAction } from "../game";

// TODO: Maybe instead of use playSound and playMusic use play(channel)
export function playSound(audio: string) {
    const { k } = getGameData();
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
        stopAt(time) {
            k.wait(time, () => (audioPlay.paused = true));
            return this;
        },
    });
}

function playAudio(channel: string, audio: string) {
    const { k, current } = getGameData();
    const playingAudios = current.playingAudios;

    let audioPlay: KA.AudioPlay;

    return createAction<"audio">({
        id: "play_audio",
        type: "audio",
        volume: 0.5,
        autoskip: true,
        start() {
            audioPlay = k.play(audio, { volume: this.volume, loop: true });
            audioPlay.paused = true;

            if (playingAudios.has(channel)) {
                playingAudios.get(channel)?.push(audioPlay);
            } else {
                playingAudios.set(channel, [ audioPlay ]);
            }
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
        stopAt(time) {
            k.wait(time, () => (audioPlay.paused = true));
            return this;
        },
    });
}
