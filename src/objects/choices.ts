import type { Choice } from "../types";
import { getGameData } from "../game";

export function makeChoice(choice: Choice) {
    const { k } = getGameData();

    const choiceBox = k.make([
        k.pos(0),
        k.layer("choices"),
        k.rect(100, 40),
        k.anchor("center"),
        "choice_box",
    ]);

    const choiceText = k.make([
        k.pos(0, 0),
        k.anchor("center"),
        k.layer("choices"),
        k.text(choice.text),
        k.color(0, 0, 0),
        "choice_text",
    ]);

    const choiceParent = k.make([]);
    choiceParent.add(choiceBox);
    choiceParent.add(choiceText);

    return choiceParent;
}

export function addChoices(choices: Choice[]) {
    const k = getGameData().k;

    const choicesBox = k.make([
        k.pos(k.width() / 2, k.height() / 2),
        k.layer("choices"),
    ]);

    choices.forEach((choice) => {
        const ch = makeChoice(choice);
        choicesBox.add(ch);
    });

    return choicesBox;
}
