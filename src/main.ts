import type * as KA from "kaboom";
import type {
    Action,
    MandarinaOpt,
    MandarinaPlugin,
    CharacterData,
} from "./types";
import kaboom from "kaboom";
import { startNovel, addChapter, addCharacter } from "./game";
import { changeChapter, say } from "./actions/narration";
import { LayerPlugin, layerPlugin } from "./plugins/layer";
import { showCharacter, hideCharacter } from "./actions/character";
import { showBackground } from "./actions/background";
import { playAudio } from "./actions/audio";

type GameData = {
    k: KA.KaboomCtx & LayerPlugin;
    m: MandarinaPlugin;
    opt: MandarinaOpt;
    chapters: Map<string, Action[]>;
    characters: Map<string, CharacterData>;
    current: {
        chapter: string;
        action: number;
        runningAction: boolean;
        playingAudios: Map<string, KA.AudioPlay[]>;
    };
};

let mandarinaPluginCtx: MandarinaPlugin;
let mandarinaOpt: MandarinaOpt;

export const data = {
    chapters: new Map<string, Action[]>(),
    characters: new Map(),
    current: {
        chapter: "start",
        action: 0,
        runningAction: false,
        playingAudios: new Map(),
    },
};

export function mandarinaPlugin(k: KA.KaboomCtx): MandarinaPlugin {
    mandarinaPluginCtx = {
        // TODO: `as` usage | Maybe a PR in Kaboom?
        k: k as KA.KaboomCtx & LayerPlugin,
        pronoun: "none",

        /** Configuration and setup */
        loadImage: k.loadSprite,
        loadAudio: k.loadSound,

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
        playAudio: playAudio,
    };

    return mandarinaPluginCtx;
}

// The Mandaarina function creates a Kaboom game and add the plugin.
export default function mandarina(opt: MandarinaOpt): MandarinaPlugin {
    mandarinaOpt = opt;

    const k = kaboom({
        ...opt,
        plugins: [ mandarinaPlugin, layerPlugin ],
    });

    const extractedPluginCtx: Partial<MandarinaPlugin> = {};

    // get plugin context
    Object.keys(k).forEach((key) => {
        if (Object.keys(mandarinaPluginCtx).includes(key)) {
            extractedPluginCtx[key] = k[key];
        }
    });

    if (!extractedPluginCtx) throw new Error("Mandarina plugin not found");

    // TODO: As `MandarinaPlugin` use in mandarina() method
    mandarinaPluginCtx = extractedPluginCtx as MandarinaPlugin;

    startNovel(mandarinaPluginCtx, opt);

    return extractedPluginCtx as MandarinaPlugin;
}

export function getGameData(): GameData {
    return {
        m: mandarinaPluginCtx,
        k: mandarinaPluginCtx.k,
        opt: mandarinaOpt,
        ...data,
    };
}
