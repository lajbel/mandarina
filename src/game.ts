import type { MandarinaPlugin, MandarinaOpt } from "./types";
import { addTextbox } from "./textbox";
import { processAction } from "./chapters";

export function startNovel(m: MandarinaPlugin, opt: MandarinaOpt) {
    const k = m.k;

    k.scene("mandarina", () => {
        // Layers
        k.layers(
            [ "backgrounds", "characters", "textbox", "textbox_name" ],
            "textbox",
        );

        m._textbox = addTextbox(m, opt.textbox ?? {});

        // Process the first game action.
        processAction(m);

        // Input
        k.onUpdate(() => {
            if (
                k.isKeyPressed("space") ||
                k.isKeyPressed("right") ||
                k.isMousePressed()
            ) {
                processAction(m);
            }
        });

        k.onKeyDown("up", () => {
            k.camScale(k.camScale().add(k.vec2(k.dt())));
        });

        k.onKeyDown("down", () => {
            k.camScale(k.camScale().sub(k.vec2(k.dt())));
        });
    });
}
