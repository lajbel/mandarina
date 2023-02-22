import { MandarinaCtx } from "./types";
import { addTextbox } from "./textbox";

export function startNovel(m: MandarinaCtx) {
    const k = m.k;

    k.scene("mandarina_novel", () => {
        addTextbox(m, {});

        k.onKeyDown("up", () => {
            k.camScale(k.camScale().add(k.vec2(k.dt())));
        });
    
        k.onKeyDown("down", () => {
            k.camScale(k.camScale().sub(k.vec2(k.dt())));
        });
    });
}