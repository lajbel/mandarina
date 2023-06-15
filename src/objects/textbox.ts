// The textbox object.
import type * as KA from "kaboom";
import type {
    MandarinaPlugin,
    Textbox,
    TextboxComp,
    TextboxOpt,
} from "../types";

function textboxComp(k: KA.KaboomCtx): TextboxComp {
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

        write(text) {
            // TODO: Make wait time modifiable.
            return new Promise<void>((resolve) => {
                textbox.text = "";
                this.curChar = 0;

                const write = async () => {
                    if (this.skipped) {
                        this.skipped = false;
                        textbox.text = text;
                        this.curChar = 0;

                        resolve();
                        return;
                    }

                    textbox.text += text[this.curChar];

                    // If character is a comma, wait 0.5 seconds.
                    if (text[this.curChar] == ",") await k.wait(0.5);

                    this.curChar++;

                    if (this.curChar == text.length) {
                        this.curChar = 0;

                        resolve();
                        return;
                    }

                    await k.wait(0.05);
                    write();
                };

                write();
            });
        },

        clear() {
            textbox.text = "";
        },

        skip() {
            if (!this.skipped) this.skipped = true;
        },

        show() {
            this.opacity = 1;
        },

        hide() {
            this.opacity = 0;
        },

        changeName(text) {
            namebox.text = text;
        },
    };
}

export function addTextbox(m: MandarinaPlugin, opt?: TextboxOpt): Textbox {
    const k = m.k;

    const options = {
        width: opt?.width ?? k.width() - k.width() / 16,
        height: opt?.height ?? 200,
        pos: opt?.pos ?? k.vec2(0),
        sprite: opt?.sprite ?? undefined,
        textAlign: opt?.textAlign ?? "left",
        textSize: opt?.textSize ?? 16,
        textFont: opt?.textFont ?? "sans-serif",
        textColor: opt?.textColor ?? "#000000",
        textOffset: opt?.textOffset ? k.vec2(...opt.textOffset) : k.vec2(0),
    };

    // Hacky way to get the sprite's width and height.
    let loadedSpriteDimensions: KA.Vec2 | null = null;

    if (options.sprite) {
        const spr = k.add([
            k.pos(k.vec2(k.width(), k.height()).scale(100)),
            k.sprite(options.sprite),
        ]);

        loadedSpriteDimensions = k.vec2(spr.width, spr.height);
    }

    // Get the textbox's width and height if is sprite, if not, use the opt values.
    const textboxWidth: number = options.sprite
        ? (loadedSpriteDimensions?.x as number)
        : options.width;
    const textboxHeight: number = options.sprite
        ? (loadedSpriteDimensions?.y as number)
        : options.height;

    // The textbox parent object.
    const textbox: Textbox = k.make([
        k.pos(k.center().x, k.height()),
        k.layer("textbox"),
        k.anchor("bot"),
        k.opacity(1),
        textboxComp(k),
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
