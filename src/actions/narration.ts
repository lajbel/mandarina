import type { MandarinaPlugin } from "../types";
import { getData } from "../main";
import { createAction } from "../game";

export function say(this: MandarinaPlugin, ...args: string[]) {
    const k = getData().k;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const m = this;

    return createAction<"normal">({
        id: "say",
        type: "normal",
        async start() {
            if (!m._textbox) throw new Error("Textbox not found.");

            // If there's two args, that means there's a character
            // if not, only write the first one as the text.
            if (args.length > 1) {
                const ch = getData().characters.get(args[0]);
                if (!ch)
                    throw new Error(
                        `Character with the ${args[0]} id's not found.`,
                    );

                m._textbox.changeName(
                    ch.name,
                    k.Color.fromHex(ch.opt?.color || "#000000"),
                );
                await m._textbox.write(args[1]);
            } else {
                m._textbox.changeName("");
                await m._textbox.write(args[0]);
            }
        },
        back() {
            if (!m._textbox) return;
            m._textbox.clear();
        },
        skip() {
            m._textbox?.skip();
        },
    });
}

// Change the current chapter
export function changeChapter(this: MandarinaPlugin, name: string) {
    return createAction<"normal">({
        id: "change_chapter",
        type: "normal",
        start() {
            getData().current.chapter = name;
            getData().current.action = -1;
        },
        skip() {
            return;
        },
        back() {
            getData().current.chapter = name;
            getData().current.action = -1;
        },
    });
}
