import type * as KA from "kaboom";
import type { VisualAlign } from "../types";
import { createAction, getGameData } from "../game";
import { getSpriteDimensions } from "../util";

export function showCharacter(
    characterId: string,
    expression = "default",
    align: VisualAlign = "center",
) {
    const { m, k, characters, loadedImages } = getGameData();
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

            const spriteScale = loadedImages.get(expressionSprite)?.scale ?? 1;
            const spriteDimensions =
                getSpriteDimensions(expressionSprite).scale(spriteScale);
            const sprW = spriteDimensions.x;
            const sprH = spriteDimensions.y;

            const alignments: Record<VisualAlign, KA.Vec2> = {
                left: k.vec2(sprW / 2, k.height() - sprH / 2),
                center: k.vec2(k.center().x, k.height() - sprH / 2),
                right: k.vec2(k.width() - sprW / 2, k.height() - sprH / 2),
                truecenter: k.vec2(k.center().x, k.center().y),
                trueleft: k.vec2(sprW / 2, k.center().y),
                trueright: k.vec2(k.width() - sprW / 2, k.center().y),
            };

            if (this.side) {
                const moveTweenComp = () => {
                    return {
                        add() {
                            k.tween(
                                this.pos.x,
                                alignments[align].x,
                                1,
                                (v) => {
                                    this.pos.x = v;
                                },
                                k.easings.easeInOutQuad,
                            );
                        },
                    };
                };

                comps.push(
                    k.pos(
                        this.side === "left" ? -sprW / 2 : k.width() + sprW / 2,
                        alignments[align].y,
                    ),
                    moveTweenComp(),
                );
            } else {
                comps.push(k.pos(alignments[align]));
            }

            ch = k.add([
                k.scale(spriteScale),
                k.layer("characters"),
                k.sprite(expressionSprite),
                k.opacity(1),
                k.anchor("center"),
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
        appearFrom(side) {
            this.side = side;
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
