import type * as KA from "kaboom";
import type { VisualAction } from "types";
import type {
    VisuaLEffectsOpt,
    VisualAlign,
    VisualComp,
} from "../components/visual";
import { createAction, getGameData } from "../game";
import { getAlignment } from "utils/getDimensions";
import { visualComponent } from "../components/visual";

export function showCharacter(
    characterId: string,
    expression = "default",
    align: VisualAlign = "center",
) {
    const { m, k, characters, loadedImages } = getGameData();
    let ch: KA.GameObj<VisualComp>;
    let effects: Partial<VisuaLEffectsOpt> = {};

    return createAction({
        id: "show_character",
        type: "visual",
        autoSkip: true,
        fade: false,
        start(this: VisualAction) {
            const textbox = m._textbox;

            const character = characters.get(characterId);
            if (!character)
                throw new Error(
                    `Character with id "${characterId}" does not exist.`,
                );

            const expressionSprite = character.opt?.expressions?.[expression];
            if (!expressionSprite)
                throw Error(`Expression "${expression}" does not exist.`);

            const spriteScale = loadedImages.get(expressionSprite)?.scale ?? 1;

            ch = k.make([
                `character_${characterId}`,
                k.layer("characters"),
                k.opacity(1),
                k.anchor("center"),
                k.pos(0),
                visualComponent({
                    sprite: expressionSprite,
                    visualObj: "character_sprite",
                    startEffects: [ ...Object.keys(effects) ],
                    ...effects.fade,
                    ...effects.appearFrom,
                }),
            ]);

            ch.add([
                "character_sprite",
                k.scale(spriteScale),
                k.sprite(expressionSprite),
                k.anchor("center"),
            ]);

            if (textbox && character.opt?.voice) {
                textbox.on("writeCharacter", () => {
                    k.play(character.opt?.voice ?? "");
                });
            }

            k.add(ch);
            ch.alignTo(expressionSprite, align);
        },
        back() {
            if (!ch) return;
            ch.destroy();
        },
        skip() {
            return;
        },
        fadeIn() {
            effects.fade = {
                fade: "in",
                fadeDuration: 1,
            };
            return this;
        },
        appearFrom(side) {
            effects.appearFrom = {
                side,
                appearDuration: 1,
                appearTo: getAlignment(align, 0, 0).x,
            };
            return this;
        },
    });
}

export function hideCharacter(characterId: string) {
    const { k } = getGameData();

    return createAction({
        id: "hide_character",
        type: "normal",
        start: () => {
            k.get("character_" + characterId, { recursive: true })[0].destroy();
        },
        skip() {
            return;
        },
        back() {
            showCharacter(characterId, "default", "center");
        },
    });
}
