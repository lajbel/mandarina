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

type GameData = {
    k: KaboomCtx & LayerPlugin;
    m: MandarinaPlugin;
    opt: MandarinaOpt;
    chapters: Map<string, Action[]>;
    characters: Map<string, CharacterData>;
    current: {
        chapter: string;
        action: number;
        runningAction: boolean;
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
    },
};

export function mandarinaPlugin(k: KaboomCtx): MandarinaPlugin {
    mandarinaPluginCtx = {
        // TODO: `as` usage | Maybe a PR in Kaboom?
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
    mandarinaOpt = opt;

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

export function getGameData(): GameData {
    return {
        m: mandarinaPluginCtx,
        k: mandarinaPluginCtx.k,
        opt: mandarinaOpt,
        ...data,
    };
}
