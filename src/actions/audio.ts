import type * as KA from "kaboom";
import { createAction, getGameData } from "../game";

// TODO: Is necessary an stopAudio()?
// Maybe when user define channels, the user can define if audio must stop when another
// audio is played in the same channel.
// Another options is define some channels by default (music, sounds, voices, etc.).
export function playAudio(
    channel: string,
    audio: string,
    opt: Exclude<KA.AudioPlayOpt, "volume">,
) {
    const { k, playingAudios } = getGameData();

    let audioPlay: KA.AudioPlay;

    return createAction({
        id: "play_audio",
        type: "audio",
        volume: 0.5,
        autoskip: true,
        start() {
            audioPlay = k.play(audio, {
                volume: this.volume,
                ...opt,
            });
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
