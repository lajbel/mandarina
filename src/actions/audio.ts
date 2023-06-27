// All audio related actions
import type * as KA from "kaboom";
import { getGameData } from "../main";
import { createAction } from "../game";

// TODO: Is necessary an stopAudio()?
// Maybe when user define channels, the user can define if audio must stop when another
// audio is played in the same channel.
// Another options is define some channels by default (music, sounds, voices, etc.).
export function playAudio(
    channel: string,
    audio: string,
    opt: Exclude<KA.AudioPlayOpt, "volume">,
) {
    const { k, current } = getGameData();
    const playingAudios = current.playingAudios;

    let audioPlay: KA.AudioPlay;

    return createAction<"audio">({
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
