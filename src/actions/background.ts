import type * as KA from "kaboom";
import type { MandarinaPlugin } from "../types";
import { getData } from "../main";
import { createAction } from "../game";

export function showBackground(
    this: MandarinaPlugin,
    background: string | KA.Color,
) {
    const k = getData().k;

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

                    k.add([
                        k.layer("backgrounds"),
                        k.rect(k.width(), k.height()),
                        k.color(color),
                        ...comps,
                    ]);
                } catch {
                    k.add([
                        k.layer("backgrounds"),
                        k.sprite(background),
                        ...comps,
                    ]);
                }
            } else {
                k.add([
                    k.layer("backgrounds"),
                    k.rect(k.width(), k.height()),
                    k.color(background),
                    ...comps,
                ]);
            }
        },
        fadeIn() {
            this.fade = true;
            return this;
        },
    });
}
