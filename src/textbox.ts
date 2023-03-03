// The textbox object.
import type { GameObj, KaboomCtx } from "kaboom";
import type { MandarinaCtx, Textbox, TextboxComp, TextboxOpt } from "./types";
import { layers } from "./constants";

function textboxComp(k: KaboomCtx): TextboxComp {
    let textbox: GameObj;
    let namebox: GameObj;

    return {
        id: "mandarina_textbox",
        require: [],

        skipped: false,
        curChar: 0,

        setup() {
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

export function addTextbox(m: MandarinaCtx, opt?: TextboxOpt): Textbox {
    const k = m.k;

    const fOpt = {
        width: opt?.width ?? k.width() - k.width()/16,
        height: opt?.height ?? 200,
        pos: opt?.pos ?? k.vec2(0),
        sprite: opt?.sprite ?? undefined,
        textAlign: opt?.textAlign ?? "left",
        textSize: opt?.textSize ?? 16,
        textFont: opt?.textFont ?? "sans-serif",
        textColor: opt?.textColor ?? "#000000",
    };

    // Get the textbox's width and height if is sprite, if not, use the opt values.
    // TODO: Temporary, because is imposible get the sprite's width and height right now.
    const textboxWidth = fOpt.sprite ? fOpt.width : fOpt.width;
    const textboxHeight = fOpt.sprite ? fOpt.height : fOpt.height;

    // The textbox parent object.
    const textbox: Textbox = k.add([
        k.pos(k.center().x, k.height()),
        k.z(layers.textbox),
        k.anchor("bot"),
        k.opacity(1),

        textboxComp(k),
    ]);

    // The textbox's background.
    textbox.add([
        k.z(10),
        k.anchor("bot"),
        fOpt.sprite ?
            k.sprite(fOpt.sprite) :
            k.rect(fOpt.width, fOpt.height),
    ]);

    // The textbox's text.
    textbox.text = textbox.add([
        k.pos(-textboxWidth / 2, -textboxHeight),
        k.z(20),
        k.text(""),
        k.color(k.Color.fromHex(fOpt.textColor)),
    ]);

    // The textbox's name.
    textbox.name = textbox.add([
        k.pos(-textboxWidth / 2, -textboxHeight),
        k.z(20),
        k.anchor("botleft"),
        k.text(""),
        k.color(k.Color.fromHex(fOpt.textColor)),
    ]);

    // For now, this is the only way to get setup the
    // textbox and namebox variables in the component.
    textbox.setup();

    return textbox;
}
