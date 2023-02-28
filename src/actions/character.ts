import { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";
import { layers } from "../constants";

export function showCharacter(
    this: MandarinaPlugin,
    characterId: string,
    expression = "default",
    align = "center",
) {
    const k = this.k;

    return createAction({
        id: "show_character",
        exec: () => {
            const character = this.data.characters.get(characterId);
            if (!character) throw new Error(`Character with id "${characterId}" does not exist.`);

            const expressionSprite = character.opt?.expressions?.[expression];
            if (!expressionSprite) throw Error(`Expression "${expression}" does not exist.`);

            const alignments = {
                "left": [
                    k.pos(0, k.height()),
                    k.anchor("botleft"),
                ],
                "center": [
                    k.pos(k.center().x, k.height()),
                    k.anchor("bot"),
                ],
                "right": [
                    k.pos(k.width(), k.height()),
                    k.anchor("botright"),
                ],
            };

            k.add([
                ...alignments[align],
                k.z(layers.characters),
                k.sprite(expressionSprite),
                k.opacity(1),
                "character_" + characterId,
            ]);
        },
    });


}

export function hideCharacter(
    this: MandarinaPlugin,
    characterId: string,
) {
    const k = this.k;

    return createAction({
        id: "hide_character",
        exec: () => {
            k.get("character_" + characterId, { recursive: true })[0].destroy();
        },
    });
}
