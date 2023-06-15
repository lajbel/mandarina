import type * as KA from "kaboom";
import type { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";

export function showBackground(
    this: MandarinaPlugin,
    background: string | KA.Color,
) {
    const k = this.k;

    return createAction({
        id: "showBackground",
        type: "visual",
        autoskip: true,
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
