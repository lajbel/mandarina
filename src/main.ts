import type * as KA from "kaboom";
import type { MandarinaOpt, MandarinaPlugin } from "./types.ts";
import kaboom from "kaboom";
import {
    startNovel,
    addChapter,
    addCharacter,
    data,
    loadImage,
    setVar,
    getVar,
} from "./game.ts";
import { jump } from "./actions/chapters.ts";
import { LayerPlugin, layerPlugin } from "./plugins/layer.ts";
import { showCharacter, hideCharacter } from "./actions/character.ts";
import { showBackground } from "./actions/background.ts";
import { playAudio } from "./actions/audio.ts";
import {
    say,
    showTextbox,
    hideTextbox,
    choice,
    input,
} from "./actions/textbox.ts";

export function mandarinaPlugin(
    opt: MandarinaOpt,
): KA.KaboomPlugin<MandarinaPlugin> {
    return (k: KA.KaboomCtx) => {
        data.k = k as KA.KaboomCtx & LayerPlugin;
        data.opt = opt;
        data.m = {
            k: k as KA.KaboomCtx & LayerPlugin,
            getMandarinaContext(this: MandarinaPlugin) {
                return this;
            },
            // Configuration and setup.
            loadImage,
            loadAudio: k.loadSound,
            character: addCharacter,
            chapter: addChapter,
            setVar,
            getVar,
            start() {
                k.go("mandarina");
            },
            // Actions
            jump,
            say,
            input,
            show: showCharacter,
            hide: hideCharacter,
            showBackground,
            playAudio,
            showTextbox,
            hideTextbox,
            choice,
        };

        return data.m;
    };
}

export default function mandarina(
    opt: MandarinaOpt & KA.KaboomOpt,
): MandarinaPlugin {
    const k = kaboom({
        ...opt,
        plugins: [ mandarinaPlugin(opt), layerPlugin ],
    });
    startNovel();
    return k.getMandarinaContext();
}
