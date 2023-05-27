import kaboom, { KaboomCtx } from "kaboom";
import { MandarinaCtx, MandarinaOpt, MandarinaPlugin } from "./types";
import { startNovel } from "./game";
import { addCharacter } from "./character";
import { addChapter } from "./chapters";

import { say } from "./actions/narration";
import { showCharacter, hideCharacter } from "./actions/character";
import { LayerPlugin, layerPlugin } from "./plugins/layer";

export function mandarinaPlugin(k: KaboomCtx): MandarinaPlugin {
    // Exported to Kaboom's Context
    return {
        k: k as KaboomCtx & LayerPlugin,

        data: {
            chapters: new Map(),
            characters: new Map(),

            current: {
                chapter: "start",
                action: 0,

                runningAction: false,
            },
        },

        /** Configuration and setup */
        loadSprite: k.loadSprite,
        loadSound: k.loadSound,

        character: addCharacter,
        chapter: addChapter,

        /** Actions */
        say,
        show: showCharacter,
        hide: hideCharacter,
    };
}

// The Mandaarina function creates a Kaboom game and add the plugin.
export default function mandarina(opt: MandarinaOpt): MandarinaCtx {
    const k = kaboom({
        ...opt,
        plugins: [ mandarinaPlugin, layerPlugin ],
    });

    const mandarinaCtx: MandarinaCtx = {
        ...mandarinaPlugin(k),
    };

    startNovel(mandarinaCtx, opt);

    return mandarinaCtx;
}
