import type { Action } from "../types";
import { data } from "../main";

// TODO: move to types.ts
type Choice = {
    text: string;
    actions: () => Action<unknown>[];
};

export function addChoices(choices: Choice[]) {
    const k = data.k;

    const choicesBox = k.make([
        k.pos(k.width() / 2, k.height() / 2),
        k.layer("choices"),
    ]);

    choices.forEach((choice, i) => {
        /// ...
    });
}
