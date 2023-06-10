import type * as KA from "kaboom";
import type { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";

export function showBackground(
    this: MandarinaPlugin,
    background: string | KA.Color,
) {
    const k = this.k;
    let bg: KA.GameObj<unknown>;

    return createAction({
        id: "showBackground",
        type: "visual",
        autoskip: true,
        exec: () => {
            console.log("action exec runned");

            if (typeof background === "string") {
                bg = k.add([ k.layer("backgrounds"), k.sprite(background) ]);
            } else {
                bg = k.add([
                    k.layer("backgrounds"),
                    k.rect(k.width(), k.height()),
                    k.color(background),
                ]);
            }
        },
        fadeIn() {
            console.log("action fadein runned");

            k.onAdd((obj) => {
                console.log("nashex");

                if (obj.id === bg.id) {
                    k.debug.log("xds");
                    bg.use(k.fadeIn(2));
                }
            });

            return this;
        },
    });
}
