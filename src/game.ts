import { MandarinaCtx, MandarinaOpt } from "./types";
import { addTextbox } from "./textbox";
import { processAction } from "./action";

export function startNovel(m: MandarinaCtx, opt: MandarinaOpt) {
    const k = m.k;

    return k.scene("mandarina_novel", () => {
        m.textbox = addTextbox(m, opt.textbox ?? {});

        // Process the first game action.
        processAction(m);

        k.onKeyDown("up", () => {
            k.camScale(k.camScale().add(k.vec2(k.dt())));
        });

        k.onKeyDown("down", () => {
            k.camScale(k.camScale().sub(k.vec2(k.dt())));
        });
    });
}