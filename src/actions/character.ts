import type * as KA from "kaboom";
import { createAction, getGameData } from "../game";

export function showCharacter(
    characterId: string,
    expression = "default",
    align = "center",
) {
    const { m, k, characters } = getGameData();
    let ch: KA.GameObj;

    return createAction<"visual">({
        id: "show_character",
        type: "visual",
        autoskip: true,
        fade: false,
        start() {
            const textbox = m._textbox;
            const comps: KA.Comp[] = [];

            if (this.fade) {
                comps.push(k.opacity(0), k.fadeIn(1));
            }

            const character = characters.get(characterId);
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

            ch = k.add([
                ...alignments[align],
                k.layer("characters"),
                k.sprite(expressionSprite),
                k.opacity(1),
                ...comps,
                "character_" + characterId,
            ]);

            if (textbox && character.opt?.voice) {
                textbox.on("writeCharacter", () => {
                    k.play(character.opt?.voice ?? "");
                });
            }
        },
        back() {
            if (!ch) return;

            ch.destroy();
        },
        skip() {
            return;
        },
        fadeIn() {
            this.fade = true;
            return this;
        },
    });
}

export function hideCharacter(characterId: string) {
    const { k } = getGameData();

    return createAction<"normal">({
        id: "hide_character",
        type: "normal",
        start: () => {
            k.get("character_" + characterId, { recursive: true })[0].destroy();
        },
        skip() {
            return;
        },
        back() {
            this.showCharacter(characterId, "default", "center");
        },
    });
}
