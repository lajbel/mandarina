import type * as KA from "kaboom";
import type { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";

export function showBackground(this: MandarinaPlugin, background: string | KA.Color) {
    const k = this.k;
    let bg: KA.GameObj<any>;

    return createAction({
        id: "showBackground",
        type: "visual",
        autoskip: true,
        exec: () => {
            if (typeof background === "string") {
                bg = k.add([
                    k.layer("backgrounds"),
                    k.sprite(background),
                ]);
            }
            else {
                bg = k.add([
                    k.layer("backgrounds"),
                    k.rect(k.width(), k.height()),
                    k.color(background),
                ]);
            }
        },
        fadeIn() {
            if(!bg.onAdd) return this;
            
            bg.onAdd(() => {
                bg.use(k.fadeIn(0.5));
            });

            return this;
        },
    });
}