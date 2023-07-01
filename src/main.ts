import type * as KA from "kaboom";
import type { MandarinaOpt, MandarinaPlugin } from "./types";
import kaboom from "kaboom";
import { startNovel, addChapter, addCharacter, data } from "./game";
import { changeChapter } from "./actions/narration";
import { LayerPlugin, layerPlugin } from "./plugins/layer";
import { showCharacter, hideCharacter } from "./actions/character";
import { showBackground } from "./actions/background";
import { playAudio } from "./actions/audio";
import { say, showTextbox, hideTextbox } from "./actions/textbox";

export function mandarinaPlugin(
    opt: MandarinaOpt,
): KA.KaboomPlugin<MandarinaPlugin> {
    return (k: KA.KaboomCtx) => {
        data.k = k as KA.KaboomCtx & LayerPlugin;
        data.opt = opt;
        data.m = {
            // TODO: `as` usage | Maybe a PR in Kaboom?
            k: k as KA.KaboomCtx & LayerPlugin,
            pronoun: "none",

            getMandarinaContext(this: MandarinaPlugin) {
                return this;
            },

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
