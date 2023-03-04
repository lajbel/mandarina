import { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";

export function playSound(this: MandarinaPlugin, audio: string) {
    const k = this.k;

    return createAction({
        id: "play_sound",
        autoskip: true,
        exec: () => {
            k.play(audio);
        },
    });
}
