import type * as KA from "kaboom";
import { getGameData } from "./game";

export function getSpriteDimensions(sprite: string): KA.Vec2 {
    const { k } = getGameData();

    const spr = k.add([
        k.sprite(sprite),
        k.pos(-k.width() * 10, -k.height() * 10),
    ]);
    return k.vec2(spr.width, spr.height);
}
