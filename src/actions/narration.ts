import type { MandarinaPlugin } from "../types";
import { createAction } from "../game";
import { data } from "../main";

export function say(this: MandarinaPlugin, ...args: string[]) {
    // If there's two args, that means there's a character
    // if not, only write the first one as the text.
    return createAction({
        id: "say",
        type: "normal",
        start: async () => {
            if (!this._textbox) throw new Error("Textbox not found.");

            if (args.length > 1) {
                const ch = data.characters.get(args[0]);
                if (!ch)
                    throw new Error(
                        `Character with the ${args[0]} id's not found.`,
                    );

                this._textbox.changeName(ch.name);
                await this._textbox.write(args[1]);
            } else {
                this._textbox.changeName("");
                await this._textbox.write(args[0]);
            }
        },
        skip: () => {
            this._textbox?.skip();
        },
    });
}

// Change the current chapter
export function changeChapter(this: MandarinaPlugin, name: string) {
    return createAction({
        id: "change_chapter",
        type: "normal",
        start: () => {
            data.current.chapter = name;
            data.current.action = -1;
        },
    });
}
