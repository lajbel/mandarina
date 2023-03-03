// The textbox object.
import type { GameObj, KaboomCtx } from "kaboom";
import type { MandarinaCtx, Textbox, TextboxComp, TextboxOpt } from "./types";
import { layers } from "./constants";

function textboxComp(m: MandarinaCtx, opt?: TextboxOpt): TextboxComp {
    let textbox: GameObj;
    let namebox: GameObj;
    let k = m.k;

    return {
        id: "mandarina_textbox",
        require: [],

        skipped: false,
        curChar: 0,

        setup() {
            textbox = this.text;
            namebox = this.name;
        },

        write(text, char) {
            // DONE: Make wait time modifiable.
            return new Promise<void>((resolve) => {
                this.curChar = 0;

                const write = async () => {
                    if (this.skipped) {
                        this.skipped = false;
                        textbox.text = text;
                        this.curChar = 0;

                        resolve();
                        return;
                    }

                    // If character is considered special, wait for the wait time.
                    var charSkip = 1;
                    var time = opt?.wait ?? 0.05;
                    var playSound = char?.opt?.sound ?? opt?.progressSound;
                    await opt?.waitCharacters?.forEach(async v => {
                        if (text.substring(this.curChar, this.curChar + v.character.length) == v.character) {
                            charSkip = v.character.length;
                            time = v.time ?? opt?.wait ?? 0.05;
                            playSound = v.sound;
                            return false;
                        }
                    });
                    this.curChar += charSkip;

                    textbox.text = text.substring(0, this.curChar);
                    if (playSound) k.play(playSound);

                    if (this.curChar >= text.length) {
                        this.curChar = 0;

                        resolve();
                        return;
                    }

                    await k.wait(time);
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
        width: opt?.width ?? k.width() - 64,
        height: opt?.height ?? 200,
        pos: opt?.pos ?? k.vec2(k.center().x, k.height() - 32),
        wait: opt?.wait ?? 0.05,
        waitCharacters: opt?.waitCharacters,
        sprite: opt?.sprite ?? undefined,
        textAlign: opt?.textAlign ?? "left",
        textSize: opt?.textSize ?? 16,
        textFont: opt?.textFont ?? "sans-serif",
        textColor: opt?.textColor ?? "#000000",
        textMargin: opt?.textMargin ?? 16,
        backgroundColor: opt?.backgroundColor ?? "#FFFFFF",
        rectOpt: opt?.rectOpt ?? undefined,
        spriteOpt: opt?.spriteOpt ?? undefined,
        textOpt: opt?.textOpt ?? undefined,
        nameOpt: opt?.nameOpt ?? undefined,
        progressSound: opt?.progressSound ?? undefined
    };

    // Get the textbox's width and height if is sprite, if not, use the opt values.
    // TODO: Temporary, because is imposible get the sprite's width and height right now.
    const textboxWidth = fOpt.sprite ? fOpt.width : fOpt.width;
    const textboxHeight = fOpt.sprite ? fOpt.height : fOpt.height;

    k.destroyAll("textbox");

    // The textbox parent object.
    const textbox: Textbox = k.add([
        k.pos(fOpt.pos),
        k.z(layers.textbox),
        k.anchor("bot"),
        k.opacity(1),

        textboxComp(m, fOpt),
        "textbox"
    ]);

    // The textbox's background.
    textbox.add([
        k.z(10),
        k.anchor("bot"),
        fOpt.sprite ?
            k.sprite(fOpt.sprite, fOpt.spriteOpt) :
            k.rect(fOpt.width, fOpt.height, fOpt.rectOpt),
        "textbox"
    ]);

    // The textbox's text.
    textbox.text = textbox.add([
        k.pos((-textboxWidth / 2) + fOpt.textMargin, -textboxHeight + fOpt.textMargin),
        k.z(20),
        k.text("", {
            ...fOpt.textOpt,
            width: fOpt.width - (fOpt.textMargin * 2)
        }),
        k.color(k.Color.fromHex(fOpt.textColor)),
        "textbox"
    ]);

    // The textbox's name.
    textbox.name = textbox.add([
        k.pos(-textboxWidth / 2, -textboxHeight),
        k.z(20),
        k.anchor("botleft"),
        k.text("", fOpt.nameOpt),
        k.color(k.Color.fromHex(fOpt.textColor)),
        "textbox"
    ]);

    // For now, this is the only way to get setup the
    // textbox and namebox variables in the component.
    textbox.setup();

    return textbox;
}
