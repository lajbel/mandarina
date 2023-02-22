import kaboom, { KaboomCtx } from "kaboom";
import { MandarinaCtx, MandarinaPlugin } from "./types";
import { startNovel } from "./game";
import { addCharacter } from "./character";

export function mandarinaPlugin(k: KaboomCtx): MandarinaPlugin {
    // Exported to Kaboom's Context
    return {
        k: k,

        data: {
            chapters: new Map(),
            characters: new Map(),

            current: {
                chapter: 0,
                action: 0,
            }
        },

        /** Configuration and setup */
        character: addCharacter,
    };
}

// The Mandaarina function creates a Kaboom game and add the plugin.
export default function mandarina(): MandarinaCtx {
    const k = kaboom({
        plugins: [ mandarinaPlugin ]
    });

    const mandarinaCtx: MandarinaCtx = {
        ...mandarinaPlugin(k),
    };

    startNovel(mandarinaCtx);

    return mandarinaCtx;
}
