/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
// The textbox object.
import type { GameObj, KaboomCtx, SpriteData } from "kaboom";
import type { MandarinaCtx, TextboxComp, TextboxOpt } from "./types";
import { alignToAnchor } from "./util";

function textboxComp(k: KaboomCtx): TextboxComp {
    let textbox: GameObj;
    let namebox: GameObj;

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
            // TODO: Wait some miliseconds when , and .
            return new Promise<void>((resolve) => {
                textbox.text = "";

                const writing = k.loop(0.05, () => {
                    if (this.skipped) {
                        this.skipped = false;
                        textbox.text = text;
                        this.curChar = 0;
            
                        resolve();
                        return writing.cancel();
                    }
            
                    textbox.text += text[this.curChar];
                    this.curChar++;
            
                    if (this.curChar == text.length) {
                        this.curChar = 0;
            
                        resolve();
                        return writing.cancel();
                    }
                });
            });
        },

        clear() {
            textbox.text = "";
        },

        skip() {
            if (!this.skipped) this.skipped = true;
        },

        show() {
        },

        hide() {
        },
    };
}

export function addTextbox(m: MandarinaCtx, opt?: TextboxOpt): GameObj<TextboxComp> {
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
    
    k.debug.log(textboxHeight);
    
    // The textbox parent object.
    const textbox = k.add([
        k.pos(k.center().x, k.height()),
        k.anchor("bot"),

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

    return textbox;
}