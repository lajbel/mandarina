import type * as KA from "kaboom";
import { getGameData } from "game";
import { VisualAlign } from "components/visual";

export function getAlignment(
    align: VisualAlign,
    sprW: number,
    sprH: number,
): KA.Vec2 {
    const { k } = getGameData();

    const alignments: Record<VisualAlign, KA.Vec2> = {
        left: k.vec2(sprW / 2, k.height() - sprH / 2),
        center: k.vec2(k.center().x, k.height() - sprH / 2),
        right: k.vec2(k.width() - sprW / 2, k.height() - sprH / 2),
        truecenter: k.vec2(k.center().x, k.center().y),
        trueleft: k.vec2(sprW / 2, k.center().y),
        trueright: k.vec2(k.width() - sprW / 2, k.center().y),
    };

    return alignments[align];
}

export function getSpriteDimensions(sprite: string): KA.Vec2 {
    const { k } = getGameData();

    const spr = k.add([ k.sprite(sprite), k.opacity(0) ]);
    k.destroy(spr);
    return k.vec2(spr.width, spr.height);
}

export function onAddObj(obj: KA.GameObj, action: (obj2: KA.GameObj) => void) {
    console.log(obj);
    const { k } = getGameData();

    return k.onAdd((o) => {
        if (o.id === obj.id) {
            action(o);
        }
    });
}
