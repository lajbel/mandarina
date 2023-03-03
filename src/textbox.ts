// The textbox object.
import type { EventController, GameObj, KaboomCtx } from "kaboom";
import type { MandarinaCtx, Textbox, TextboxComp, TextboxOpt } from "./types";

function textboxComp(m: MandarinaCtx): TextboxComp {
    const k = m.k;

    let textbox: GameObj;
    let namebox: GameObj;
    let writing: undefined | EventController;

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
            return new Promise<boolean>((resolve) => {
                if (writing) {
                    this.skip();
                    resolve(false);
                }
                else writing = k.loop(0.05, async () => {
                    if (this.skipped) {
                        this.skipped = false;
                        textbox.text = text;
                        this.curChar = 0;

                        resolve(true);
                        writing?.cancel();
                        writing = undefined;
                        return;
                    }

                    textbox.text = text.substring(0, this.curChar);

                    if(text[this.curChar] == ",") await k.wait(0.1);

                    this.curChar++;

                    if (this.curChar == text.length) this.skipped = true;
                });
                return true;
            });
        },

        clear() {
            textbox.text = "";
        },

        skip() {
            this.skipped = true;
        },

        show() {
            this.opacity = 1;
        },

        hide() {
            this.opacity = 0;
        },

        changeName(text) {
            var character = m.data.characters.get(text);
            if (!character) throw new Error(`Character with ID "${text}" does not exist.`); 
            namebox.text = character.name;
        },
    };
}

export function addTextbox(m: MandarinaCtx, opt?: TextboxOpt): Textbox {
    const k = m.k;

    const fOpt = {
        width: opt?.width ?? k.width() - k.width()/16,
        height: opt?.height ?? 300,
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
        k.anchor("bot"),
        k.opacity(1),

        textboxComp(m),
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
        k.text(""),
        k.anchor("botleft"),
        k.color(k.Color.fromHex(fOpt.textColor)),
    ]);

    // For now, this is the only way to get setup the
    // textbox and namebox variables in the component.
    textbox.setup();

    return textbox;
}