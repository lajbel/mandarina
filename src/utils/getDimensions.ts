import type * as KA from "kaboom";
import { getGameData } from "game";
import { VisualAlign } from "components/visual";

export function getAlignment(
    align: VisualAlign,
    w: number = 0,
    h: number = 0,
): KA.Vec2 {
    const { k } = getGameData();

    const alignments: Record<VisualAlign, KA.Vec2> = {
        left: k.vec2(w / 2, k.height() - h / 2),
        center: k.vec2(k.center().x, k.height() - h / 2),
        right: k.vec2(k.width() - w / 2, k.height() - h / 2),
        truecenter: k.vec2(k.center().x, k.center().y),
        trueleft: k.vec2(w / 2, k.center().y),
        trueright: k.vec2(k.width() - w / 2, k.center().y),
    };

    return alignments[align];
}

export function getSpriteDimensions(sprite: string): KA.Vec2 {
    const { k, loadedImages } = getGameData();
    const spr = loadedImages.get(sprite);
    if (!spr) throw new Error(`Sprite ${sprite} not found!`);

    const sprW = spr.tex.width * spr.frames[0].w;
    const sprH = spr.tex.height * spr.frames[0].h;

    return k.vec2(sprW, sprH);
}
