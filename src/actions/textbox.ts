import type { Action } from "../types";
import { createAction, getGameData } from "../game";
import { addChoices } from "../objects/choices";

export function showTextbox() {
    const { m } = getGameData();

    return createAction({
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
            const textbox = m._textbox;
            textbox?.hide();
        },
    });
}

export function hideTextbox() {
    const { m } = getGameData();

    const a = createAction({
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
            const textbox = m._textbox;
            textbox?.show();
        },
    });

    return a;
}

export function say(...args: string[]) {
    const { m, k } = getGameData();

    return createAction({
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

// TODO: Implement choices
export type Choice = {
    text: string;
    actions: () => Action[];
};

export function choice(choices: Choice[]) {
    return createAction({
        id: "choice",
        type: "normal",
        start() {
            addChoices(choices);
        },
        skip() {
            return;
        },
        back() {
            return;
        },
    });
}
