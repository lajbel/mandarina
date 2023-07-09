import type * as KA from "kaboom";
import type { MandarinaOpt, MandarinaPlugin } from "types";
import kaboom from "kaboom";
import {
    startNovel,
    addChapter,
    addCharacter,
    data,
    loadImage,
    setVar,
    getVar,
} from "game";
import { jump } from "actions/chapters";
import { LayerPlugin, layerPlugin } from "plugins/layer";
import { showCharacter, hideCharacter } from "actions/character";
import { showBackground } from "actions/background";
import { playAudio } from "actions/audio";
import { say, showTextbox, hideTextbox, choice } from "actions/textbox";

export function mandarinaPlugin(
    opt: MandarinaOpt,
): KA.KaboomPlugin<MandarinaPlugin> {
    // @ts-ignore
    return (k: KA.KaboomCtx) => {
        data.k = k as KA.KaboomCtx & LayerPlugin;
        data.opt = opt;
        data.m = {
            // TODO: `as` usage | Maybe a PR in Kaboom?
            k: k as KA.KaboomCtx & LayerPlugin,

            getMandarinaContext(this: MandarinaPlugin) {
                return this;
            },

            /** Configuration and setup */
            loadImage,
            loadAudio: k.loadSound,
            character: addCharacter,
            chapter: addChapter,
            setVar,
            getVar,
            start() {
                k.go("mandarina");
            },
            /** Actions */
            jump,
            say,
            show: showCharacter,
            hide: hideCharacter,
            showBackground,
            playAudio,
            showTextbox,
            hideTextbox,
            // @ts-ignore
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
