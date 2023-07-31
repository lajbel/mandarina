// The textbox object.
import type * as KA from "kaboom";
import type { TextboxComp } from "components/textbox";
import { getGameData } from "game";
import { textbox } from "components/textbox";
import { getSpriteDimensions } from "../util";
import { textWithOptions } from "utils/textWithOptions";

export type Textbox = KA.GameObj<
    KA.PosComp | KA.AnchorComp | KA.OpacityComp | TextboxComp
>;

export type TextboxOpt = {
    /** Kaboom loaded sprite for use in textbox. */
    sprite?: string;
    /** Textbox's position. */
    pos?: [number, number];
    /** Textbox's offset. */
    offset?: [number, number];
    /** Textbox's width. */
    width?: number;
    /** Textbox's height. */
    height?: number;
    /** Textbox's text align */
    textAlign?: "left" | "center" | "right";
    /** Textbox's text size. */
    textSize?: number;
    /** Textbox's text font. */
    textFont?: string;
    /** Textbox's text color. */
    textColor?: string;
    /** Textbox's text offset. */
    textOffset?: [number, number];
    /** Textbox's text max width before wrap. */
    textWidth?: number;
};

export function addTextbox(opt?: TextboxOpt): Textbox {
    const k = getGameData().k;

    const options = {
        width: opt?.width ?? k.width() - k.width() / 16,
        height: opt?.height ?? 200,
        pos: opt?.pos ? k.vec2(...opt.pos) : k.vec2(k.center().x, k.height()),
        offset: opt?.offset ? k.vec2(...opt.offset) : k.vec2(0),
        sprite: opt?.sprite ?? undefined,
        textAlign: opt?.textAlign ?? "left",
        textSize: opt?.textSize ?? 16,
        textFont: opt?.textFont ?? "sans-serif",
        textColor: opt?.textColor ?? "#000000",
        textOffset: opt?.textOffset ? k.vec2(...opt.textOffset) : k.vec2(0),
        textWidth: opt?.textWidth ?? 0,
    };

    let boxDimensions = k.vec2(options.width, options.height);

    if (options.sprite) {
        boxDimensions = getSpriteDimensions(options.sprite);
    }

    // Get the textbox's width and height if is sprite, if not, use the opt values.
    const textboxWidth = boxDimensions.x;
    const textboxHeight = boxDimensions.y;

    // The textbox parent object.
    const textboxParent: Textbox = k.make([
        k.pos(options.pos.add(options.offset)),
        k.layer("textbox"),
        k.anchor("bot"),
        k.opacity(1),
        textbox(),
    ]);

    // The textbox's background.
    textboxParent.add([
        k.layer("textbox"),
        k.anchor("bot"),
        options.sprite
            ? k.sprite(options.sprite)
            : k.rect(options.width, options.height),
    ]);

    // The textbox's text.
    textboxParent.text = textboxParent.add([
        k.pos(
            -textboxWidth / 2 + options.textOffset.x,
            -textboxHeight + options.textOffset.y,
        ),
        k.layer("textbox"),
        ...textWithOptions("", options),
    ]);

    // The textbox's name.
    textboxParent.name = textboxParent.add([
        k.pos(-textboxWidth / 2, -textboxHeight),
        k.layer("textbox_name"),
        k.anchor("botleft"),
        k.text(""),
        k.color(k.Color.fromHex(options.textColor)),
    ]);

    k.add(textboxParent);
    return textboxParent;
}
