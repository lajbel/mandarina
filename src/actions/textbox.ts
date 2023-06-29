import { getGameData } from "../main";
import { createAction } from "../game";

export function showTextbox() {
    const { m } = getGameData();

    return createAction<"normal">({
        id: "show_textbox",
        type: "normal",
        start() {
            const textbox = m._textbox;

            textbox?.show();
        },
        skip() {
            return;
        },
        back() {
            // Not implemented
        },
    });
}

export function hideTextbox() {
    const { m } = getGameData();

    return createAction<"normal">({
        id: "hide_textbox",
        type: "normal",
        start() {
            const textbox = m._textbox;

            textbox?.hide();
        },
        skip() {
            return;
        },
        back() {
            // Not implemented
        },
    });
}

export function say(...args: string[]) {
    const { m, k } = getGameData();

    return createAction<"normal">({
        id: "say",
        type: "normal",
        async start() {
            const textbox = m._textbox;

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
