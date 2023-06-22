import type { MandarinaPlugin } from "../types";
import { getGameData } from "../main";
import { createAction } from "../game";

export function say(...args: string[]) {
    const { m, k } = getGameData();
    const textbox = m._textbox;

    return createAction<"normal">({
        id: "say",
        type: "normal",
        async start() {
            if (!textbox) throw new Error("Textbox not found.");

            if (args.length > 1) {
                const ch = getGameData().characters.get(args[0]);
                if (!ch)
                    throw new Error(
                        `Character with the ${args[0]} id's not found.`,
                    );

                textbox.changeName(
                    ch.name,
                    k.Color.fromHex(ch.opt?.color || "#000000"),
                );

                await textbox.write(args[1]);
            } else {
                textbox.changeName("");
                await textbox.write(args[0]);
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
            getGameData().current.chapter = name;
            getGameData().current.action = -1;
        },
        skip() {
            return;
        },
        back() {
            getGameData().current.chapter = name;
            getGameData().current.action = -1;
        },
    });
}
