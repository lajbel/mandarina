import kaboom, { KaboomCtx } from "kaboom";
import type {
    Action,
    MandarinaOpt,
    MandarinaPlugin,
    CharacterData,
} from "./types";
import { startNovel, addChapter, addCharacter } from "./game";
import { changeChapter, say } from "./actions/narration";
import { LayerPlugin, layerPlugin } from "./plugins/layer";
import { showCharacter, hideCharacter } from "./actions/character";
import { showBackground } from "./actions/background";
import { playSound } from "./actions/audio";

let mandarinaPluginCtx: MandarinaPlugin;

export type Data = {
    k: KaboomCtx & LayerPlugin;
    m: MandarinaPlugin;
    chapters: Map<string, Action[]>;
    characters: Map<string, CharacterData>;
    current: {
        chapter: string;
        action: number;
        runningAction: boolean;
    };
};

export const data = {
    chapters: new Map<string, Action[]>(),
    characters: new Map(),
    current: {
        chapter: "start",
        action: 0,
        runningAction: false,
    },
};

// The plugin loaded to Kaboom
export function mandarinaPlugin(k: KaboomCtx): MandarinaPlugin {
    // Exported to Kaboom's Context
    mandarinaPluginCtx = {
        // TODO: `as` usage
        k: k as KaboomCtx & LayerPlugin,
        pronouns: "none",

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
        sound: playSound,
    };

    return mandarinaPluginCtx;
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

// Get data
export function getData(): Data {
    return {
        m: mandarinaPluginCtx,
        k: mandarinaPluginCtx.k,
        ...data,
    };
}
