import type * as KA from "kaboom";
import type { MandarinaPlugin } from "../types";
import { getGameData } from "../main";
import { createAction } from "../game";

export function showBackground(
    this: MandarinaPlugin,
    background: string | KA.Color,
) {
    const k = getGameData().k;
    let bg: KA.GameObj;

    return createAction<"visual">({
        id: "showBackground",
        type: "visual",
        autoskip: true,
        fade: false,
        start() {
            const comps: KA.Comp[] = [];

            if (this.fade) {
                comps.push(k.opacity(0), k.fadeIn(1));
            }

            if (typeof background == "string") {
                try {
                    const color = k.Color.fromHex(background);

                    bg = k.add([
                        k.layer("backgrounds"),
                        k.rect(k.width(), k.height()),
                        k.color(color),
                        ...comps,
                    ]);
                } catch {
                    bg = k.add([
                        k.layer("backgrounds"),
                        k.sprite(background),
                        ...comps,
                    ]);
                }
            } else {
                bg = k.add([
                    k.layer("backgrounds"),
                    k.rect(k.width(), k.height()),
                    k.color(background),
                    ...comps,
                ]);
            }
        },
        skip() {
            return;
        },
        back() {
            bg.destroy();
        },
        fadeIn() {
            this.fade = true;
            return this;
        },
    });
}
