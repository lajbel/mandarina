import type { Choice } from "../types";
import { getGameData } from "../main";

export function addChoices(choices: Choice[]) {
    const k = getGameData().k;

    const choicesBox = k.make([
        k.pos(k.width() / 2, k.height() / 2),
        k.layer("choices"),
    ]);

    choices.forEach((choice, i) => {
        choice;
        i;
        choicesBox;
        /// ...
    });
}
