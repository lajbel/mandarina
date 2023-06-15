import kaboom, { KaboomCtx } from "kaboom";
import type {
    Action,
    MandarinaOpt,
    MandarinaPlugin,
    CharacterData,
} from "./types";
import { startNovel, addChapter, addCharacter } from "./game";
import { changeChapter, say } from "./actions/narration";
import { showCharacter, hideCharacter } from "./actions/character";
import { showBackground } from "./actions/background";
import { LayerPlugin, layerPlugin } from "./plugins/layer";

export type Data = {
    k: KaboomCtx & LayerPlugin;
    chapters: Map<string, Action[]>;
    characters: Map<string, CharacterData>;
    current: {
        chapter: string;
        action: number;
        runningAction: boolean;
    };
};

export const data: Data = {
    // TODO: `as` usage
    // TODO: `!` usage
    k: null!,
    chapters: new Map<string, Action[]>(),
    characters: new Map(),
    current: {
        chapter: "start",
        action: 0,
        runningAction: false,
    },
};

export function mandarinaPlugin(k: KaboomCtx): MandarinaPlugin {
    // TODO: `as` usage
    data.k = k as KaboomCtx & LayerPlugin;

    // Exported to Kaboom's Context
    return {
        // TODO: `as` usage
        k: k as KaboomCtx & LayerPlugin,

        /** Configuration and setup */
        loadImage: k.loadSprite,
        loadSound: k.loadSound,

        character: addCharacter,
        chapter: addChapter,

        start() {
            k.go("mandarina");
        },

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
