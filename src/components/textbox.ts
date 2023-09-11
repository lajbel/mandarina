import type * as KA from "kaboom";
import type { Textbox } from "objects/textbox";
import { getGameData } from "game";
import pronouns from "_data/pronouns.json";

export interface TextboxComp extends KA.Comp {
    /** If is in input mode. */
    inInput: boolean;
    /** If the textbox is in skip. */
    skipped: boolean;
    /** Current character of the writing text. */
    curChar: number;
    /** The textbox's text. */
    text?: KA.GameObj<KA.TextComp>;
    /** The textbox's name. */
    name?: KA.GameObj<KA.TextComp>;

    /** Writes a text in the textbox. */
    write(this: Textbox, text: string): Promise<void>;
    /** Clears the textbox. */
    clear(this: Textbox): void;
    /** Skips the current text. */
    skip(this: Textbox): void;
    /** Shows the textbox. */
    show(this: Textbox): void;
    /** Hides the textbox. */
    hide(this: Textbox): void;
    /** Change the namebox's text. */
    changeName(this: Textbox, text: string, color?: KA.Color): void;
    /** Get user input in textbox. */
    getInput(this: Textbox, text: string): Promise<string>;
}

function formatText(text: string) {
    const { m, opt, variables } = getGameData();
    const pronoun = m.getVar<number>("pronoun");
    const pronounData = pronouns[opt.language ?? "english"];

    let formattedText = text
        .replace("[they]", pronounData.they[pronoun])
        .replace("[them]", pronounData.them[pronoun])
        .replace("[their]", pronounData.their[pronoun])
        .replace("[theirs]", pronounData.theirs[pronoun])
        .replace("[are]", pronounData.are[pronoun]);

    for (const variable in variables) {
        formattedText = formattedText.replace(
            `[${variable}]`,
            variables[variable],
        );
    }

    return formattedText;
}

export function textboxComponent(): TextboxComp {
    const data = getGameData();
    const k = data.k;
    let textbox: KA.GameObj;
    let namebox: KA.GameObj;

    return {
        id: "mandarina_textbox",
        require: [],
        inInput: false,
        skipped: false,
        curChar: 0,

        add() {
            textbox = this.text!;
            namebox = this.name!;
        },
        write(this: KA.GameObj, text) {
            const fText = formatText(text);

            const writePromise = new Promise<void>((resolve) => {
                textbox.text = "";
                this.curChar = 0;

                const writeCharacter = async () => {
                    const characterToWrite = fText[this.curChar];

                    if (this.skipped) {
                        this.skipped = false;
                        this.curChar = 0;
                        textbox.text = fText;
                        return resolve();
                    }

                    textbox.text += characterToWrite;
                    this.trigger("writeCharacter", fText[this.curChar]);

                    if (characterToWrite == ",")
                        await k.wait(data.opt.writeCommaWait ?? 0.5);

                    this.curChar++;
                    if (this.curChar == fText.length) {
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
            namebox.text = "";
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
        async getInput(text: string) {
            const events: KA.EventController[] = [];
            let value = "";
            this.clear();

            await this.write(text);

            const inputPromise = new Promise<string>((resolve) => {
                const enterPressEvent = k.onKeyPress("enter", () => {
                    resolve(value);
                });

                const charInputEvent = k.onCharInput((ch) => {
                    if (ch == " " && value.length == 0) return;
                    if (k.isKeyDown("shift")) ch = ch.toUpperCase();

                    textbox.text += ch;
                    value += ch;
                });

                const backspacePressEvent = k.onKeyPressRepeat(
                    "backspace",
                    () => {
                        if (value.length == 0) return;

                        textbox.text = textbox.text.substring(
                            0,
                            textbox.text.length - 1,
                        );
                        value = value.substring(0, value.length - 1);
                    },
                );

                events.push(
                    enterPressEvent,
                    charInputEvent,
                    backspacePressEvent,
                );
            });

            inputPromise.then(() => {
                events.forEach((e) => {
                    e.cancel();
                });
            });

            return inputPromise;
        },
    };
}
