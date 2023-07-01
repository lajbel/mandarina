// The textbox object.
import type * as KA from "kaboom";
import type { Textbox, TextboxComp, TextboxOpt } from "../types";
import { getGameData } from "../game";

function textboxComp(): TextboxComp {
    const data = getGameData();
    const k = data.k;
    let textbox: KA.GameObj;
    let namebox: KA.GameObj;

    return {
        id: "mandarina_textbox",
        require: [],

        skipped: false,
        curChar: 0,

        add() {
            textbox = this.text;
            namebox = this.name;
        },

        write(this: KA.GameObj, text) {
            // TODO: Pronouns replacement support
            const writePromise = new Promise<void>((resolve) => {
                textbox.text = "";
                this.curChar = 0;

                const writeCharacter = async () => {
                    const characterToWrite = text[this.curChar];

                    if (this.skipped) {
                        this.skipped = false;
                        this.curChar = 0;
                        textbox.text = text;
                        return resolve();
                    }

                    textbox.text += characterToWrite;
                    this.trigger("writeCharacter", text[this.curChar]);

                    if (characterToWrite == ",")
                        await k.wait(data.opt.writeCommaWait ?? 0.5);

                    this.curChar++;
                    if (this.curChar == text.length) {
                        resolve();
                    } else {
                        await k.wait(data.opt.writeVel ?? 0.05);
                        writeCharacter();
                    }
                };

                writeCharacter();
            });

            writePromise.then(() => {
                this.curChar = 0;
                this.trigger("writeEnd");
            });

            return writePromise;
        },

        clear() {
            textbox.text = "";
        },

        skip() {
            if (!this.skipped) this.skipped = true;
        },

        show() {
            k.tween(
                0,
                1,
                0.5,
                (v) => {
                    this.opacity = v;
                },
                k.easings.linear,
            );
        },

        hide() {
            k.tween(
                1,
                0,
                0.5,
                (v) => {
                    this.opacity = v;
                },
                k.easings.linear,
            );
        },

        changeName(text, color) {
            namebox.text = text;
            namebox.use(
                k.color(
                    color
                        ? color
                        : k.Color.fromHex(
                            data.opt.textbox?.textColor || "#000000",
                        ),
                ),
            );
        },
    };
}

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
    };

    let boxDimensions: KA.Vec2;

    if (options.sprite) {
        const spr = k.add([
            k.pos(k.vec2(k.width(), k.height()).scale(100)),
            k.sprite(options.sprite),
        ]);

        boxDimensions = k.vec2(spr.width, spr.height);
    } else {
        boxDimensions = k.vec2(options.width, options.height);
    }

    // Get the textbox's width and height if is sprite, if not, use the opt values.
    const textboxWidth = boxDimensions.x;
    const textboxHeight = boxDimensions.y;

    // The textbox parent object.
    const textbox: Textbox = k.make([
        k.pos(options.pos.add(options.offset)),
        k.layer("textbox"),
        k.anchor("bot"),
        k.opacity(1),
        textboxComp(),
    ]);

    // The textbox's background.
    textbox.add([
        k.layer("textbox"),
        k.anchor("bot"),
        options.sprite
            ? k.sprite(options.sprite)
            : k.rect(options.width, options.height),
    ]);

    // The textbox's text.
    textbox.text = textbox.add([
        k.pos(
            -textboxWidth / 2 + options.textOffset.x,
            -textboxHeight + options.textOffset.y,
        ),
        k.layer("textbox"),
        k.text("", {
            width: textboxWidth,
            size: options.textSize,
            font: options.textFont,
            align: options.textAlign,
        }),
        k.color(k.Color.fromHex(options.textColor)),
    ]);

    // The textbox's name.
    textbox.name = textbox.add([
        k.pos(-textboxWidth / 2, -textboxHeight),
        k.layer("textbox_name"),
        k.anchor("botleft"),
        k.text(""),
        k.color(k.Color.fromHex(options.textColor)),
    ]);

    k.add(textbox);
    return textbox;
}
