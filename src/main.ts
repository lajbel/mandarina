import kaboom, { KaboomCtx } from "kaboom";
import type { Action, MandarinaOpt, MandarinaPlugin } from "./types";
import { startNovel } from "./game";
import { addCharacter } from "./character";
import { addChapter } from "./chapters";
import { changeChapter, say } from "./actions/narration";
import { showCharacter, hideCharacter } from "./actions/character";
import { showBackground } from "./actions/backgrounds";
import { LayerPlugin, layerPlugin } from "./plugins/layer";

export const data = {
    chapters: new Map<string, Action[]>(),
    characters: new Map(),

    current: {
        chapter: "start",
        action: 0,
        runningAction: false,
    },
};

export function mandarinaPlugin(k: KaboomCtx): MandarinaPlugin {
    // Exported to Kaboom's Context
    return {
        k: k as KaboomCtx & LayerPlugin,

        /** Configuration and setup */
        loadSprite: k.loadSprite,
        loadSound: k.loadSound,

        character: addCharacter,
        chapter: addChapter,

        /** Actions */
        jump: changeChapter,
        say,
        show: showCharacter,
        hide: hideCharacter,
        bg: showBackground,
    };
}

// The Mandaarina function creates a Kaboom game and add the plugin.
export default function mandarina(opt: MandarinaOpt): MandarinaPlugin {
    const k = kaboom({
        ...opt,
        plugins: [ mandarinaPlugin, layerPlugin ],
    });

    const mandarinaCtx: MandarinaPlugin = {
        ...mandarinaPlugin(k),
    };

    startNovel(mandarinaCtx, opt);

    return mandarinaCtx;
}
