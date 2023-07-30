import type { KaboomCtx, Vec2 } from "kaboom";
import type { TextOptions } from "../types";
import { getGameData } from "../game";

export function textWithOptions(text: string, textOptions: TextOptions) {
    const { k } = getGameData();

    return [
        k.text(text, {
            size: textOptions.textSize,
            font: textOptions.textFont,
            align: textOptions.textAlign,
        }),
        k.color(k.Color.fromHex(textOptions.textColor || "#fff")),
    ];
}
