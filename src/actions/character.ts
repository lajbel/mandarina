import type { MandarinaPlugin } from "../types";
import { data } from "../main";
import { createAction } from "../chapters";

export function showCharacter(
    this: MandarinaPlugin,
    characterId: string,
    expression = "default",
    align = "center",
) {
    const k = this.k;

    return createAction({
        id: "show_character",
        type: "visual",
        autoskip: true,
        fade: false,
        start: () => {
            const character = data.characters.get(characterId);
            if (!character)
                throw new Error(
                    `Character with id "${characterId}" does not exist.`,
                );

            const expressionSprite = character.opt?.expressions?.[expression];
            if (!expressionSprite)
                throw Error(`Expression "${expression}" does not exist.`);

            // k.debug.log(`Showing character "${characterId}" with expression "${expression}" aligned to "${align}".`);

            const alignments = {
                left: [ k.pos(0, k.height()), k.anchor("botleft") ],
                center: [ k.pos(k.center().x, k.height()), k.anchor("bot") ],
                right: [ k.pos(k.width(), k.height()), k.anchor("botright") ],
            };

            k.add([
                ...alignments[align],
                k.layer("characters"),
                k.sprite(expressionSprite),
                k.opacity(1),
                "character_" + characterId,
            ]);
        },
        fadeIn() {
            this.fade = true;
            return this;
        },
    });
}

export function hideCharacter(this: MandarinaPlugin, characterId: string) {
    const k = this.k;

    return createAction({
        id: "hide_character",
        type: "normal",
        start: () => {
            k.get("character_" + characterId, { recursive: true })[0].destroy();
        },
    });
}
