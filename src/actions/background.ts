import type { MandarinaPlugin } from "../types";
import { getData } from "../main";
import { createAction } from "../game";

export function showBackground(this: MandarinaPlugin, background: string) {
    const k = getData().k;

    return createAction<"visual">({
        id: "showBackground",
        type: "visual",
        autoskip: true,
        fade: false,
        start: () => {
            if (typeof background === "string") {
                k.add([ k.layer("backgrounds"), k.sprite(background) ]);
            } else {
                k.add([
                    k.layer("backgrounds"),
                    k.rect(k.width(), k.height()),
                    k.color(background),
                ]);
            }
        },
        fadeIn() {
            this.fade = true;
            return this;
        },
    });
}
