import type * as KA from "kaboom";
import type { Textbox } from "../objects/textbox";
import { getGameData } from "../game";
import pronouns from "../data/pronouns.json";

export interface TextboxComp extends KA.Comp {
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
    /** Change the namebox's text */
    changeName(this: Textbox, text: string, color?: KA.Color): void;
}

function formatText(text: string) {
    const { m, opt, variables } = getGameData();
    const pronoun = m.getVar("pronoun") as number;
    const pronounData = pronouns[opt.language ?? "english"];

    let formattedText = text
        .replace("[they]", pronounData.their[pronoun])
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

export function textbox(): TextboxComp {
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
