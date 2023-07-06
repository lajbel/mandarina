import type * as KA from "kaboom";
import type { VisualAlign } from "../types";
import { getGameData } from "../game";
import { getSpriteDimensions } from "../util";
import { visual } from "../components/visual";

export function makeCharacter(
    characterId: string,
    expression = "default",
    align: VisualAlign = "center",
) {
    const { m, k, characters, loadedImages } = getGameData();
    const textbox = m._textbox;
    const comps: KA.Comp[] = [];

    const characterData = characters.get(characterId);
    if (!characterData)
        throw new Error(`Character with id "${characterId}" does not exist.`);

    const expressionSprite = characterData.opt?.expressions?.[expression];
    if (!expressionSprite)
        throw Error(`Expression "${expression}" does not exist.`);

    const ch = k.make([
        k.layer("characters"),
        k.sprite(expressionSprite),
        k.opacity(1),
        k.anchor("center"),
        ...comps,
        `character_${characterId}`,
    ]);

    if (this.fade) {
        ch.use(k.opacity(0));
        ch.use(k.fadeIn(1));
    }

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

        ch.use(
            k.pos(
                this.side === "left" ? -sprW / 2 : k.width() + sprW / 2,
                alignments[align].y,
            ),
        );
        ch.use(moveTweenComp());
    } else {
        ch.use(k.pos(alignments[align]));
    }

    if (textbox && characterData.opt?.voice) {
        textbox.on("writeCharacter", () => {
            k.play(characterData.opt?.voice ?? "");
        });
    }

    return ch;
}
