import type * as KA from "kaboom";
import type {
    Action,
    MandarinaOpt,
    MandarinaPlugin,
    CharacterData,
} from "./types";
import kaboom from "kaboom";
import { startNovel, addChapter, addCharacter } from "./game";
import { changeChapter } from "./actions/narration";
import { LayerPlugin, layerPlugin } from "./plugins/layer";
import { showCharacter, hideCharacter } from "./actions/character";
import { showBackground } from "./actions/background";
import { playAudio } from "./actions/audio";
import { say, showTextbox, hideTextbox } from "./actions/textbox";

type GameData = {
    k: KA.KaboomCtx & LayerPlugin;
    m: MandarinaPlugin;
    opt: MandarinaOpt;
    chapters: Map<string, Action[]>;
    characters: Map<string, CharacterData>;
    currentChapter: string;
    currentAction: number;
    processingAction: boolean;
    playingAudios: Map<string, KA.AudioPlay[]>;

    isProcessingAction(): boolean;
};

let mandarinaPluginCtx: MandarinaPlugin;

export const data: Partial<GameData> = {
    chapters: new Map<string, Action[]>(),
    characters: new Map(),
    currentChapter: "start",
    currentAction: 0,
    processingAction: false,
    playingAudios: new Map(),

    isProcessingAction(this: GameData) {
        return data.processingAction as boolean;
    },
};

function hasContextStarted(d: typeof data): d is GameData {
    return "m" in data;
}

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
        showBackground: showBackground,
        playAudio: playAudio,
        showTextbox: showTextbox,
        hideTextbox: hideTextbox,
    };

    data.m = mandarinaPluginCtx;

    return mandarinaPluginCtx;
}

// The Mandaarina function creates a Kaboom game and add the plugin.
export default function mandarina(opt: MandarinaOpt): MandarinaPlugin {
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
    data.k = k;
    data.opt = opt;

    startNovel();

    return extractedPluginCtx as MandarinaPlugin;
}

export function getGameData(): GameData {
    if (hasContextStarted(data)) {
        return data;
    } else {
        throw new Error("Mandarina context not started");
    }
}
