import type * as KA from "kaboom";
import type { Action } from "../types.ts";
import { visual } from "../components/visual.ts";
import { choice } from "../components/choice.ts";
import { getGameData } from "../game.ts";

export type Choice = KA.GameObj;

export type ChoiceOpt = {
    /** Choice's sprite. */
    sprite?: string;
    /** Choice's alignment. */
    pos?: [number, number];
    /** Choice's offset. */
    offset?: [number, number];
    /** Choice's width. */
    width?: number;
    /** Choice's height. */
    height?: number;
    /** Choice's text align */
    textAlign?: "left" | "center" | "right";
    /** Choice's text size. */
    textSize?: number;
    /** Choice's text font. */
    textFont?: string;
    /** Choice's text color. */
    textColor?: string;
    /** Choice's text offset */
    textOffset?: [number, number];
};

export function makeChoice(
    text: string,
    actions: () => Action[],
    opt?: ChoiceOpt,
): Choice {
    const { k } = getGameData();

    const options = {
        width: opt?.width ?? k.width() - k.width() / 16,
        height: opt?.height ?? 40,
        pos: opt?.pos ? k.vec2(...opt.pos) : k.vec2(k.center().x, k.height()),
        offset: opt?.offset ? k.vec2(...opt.offset) : k.vec2(0),
        sprite: opt?.sprite,
        textAlign: opt?.textAlign ?? "left",
        textSize: opt?.textSize ?? 16,
        textFont: opt?.textFont ?? "sans-serif",
        textColor: opt?.textColor ?? "#000000",
        textOffset: opt?.textOffset ? k.vec2(...opt.textOffset) : k.vec2(0),
    };

    const choiceParent = k.make([
        k.pos(k.center()),
        k.layer("choices"),
        k.area({
            shape: new k.Rect(
                k.vec2(-options.width / 2, -options.height / 2),
                options.width,
                options.height,
            ),
        }),
        visual({
            visualObj: "choice_box",
        }),
        choice(actions),
    ]);

    choiceParent.add([
        "choice_box",
        k.pos(0),
        k.z(0),
        k.layer("choices"),
        options.sprite
            ? k.sprite(options.sprite)
            : k.rect(options.width, options.height),
        k.anchor("center"),
    ]);

    choiceParent.add([
        "choice_text",
        k.pos(0, 0),
        k.z(1),
        k.layer("choices"),
        k.anchor("center"),
        k.text(text, { size: options.textSize, font: options.textFont }),
        k.color(0, 0, 0),
    ]);

    return choiceParent;
}

export function addChoices(choices: Record<string, () => Action[]>) {
    const { k, opt } = getGameData();

    const choicesBox = k.make([ k.layer("choices") ]);

    Object.keys(choices).forEach((choiceName) => {
        const ch = makeChoice(choiceName, choices[choiceName], opt.choice);
        choicesBox.add(ch);
    });

    k.add(choicesBox);

    choicesBox.onUpdate(() => {
        const choices = choicesBox.get("mandarina_choice");
        const choiceLength = choices.length;
        const choiceHeight = choices[0].getDimensions().y;
        choices[0].pos.y = k.center().y - choiceHeight * (choiceLength / 2);

        choices.forEach((choice, i) => {
            if (i === 0) return;
            choice.pos.y = choices[i - 1].pos.y + choiceHeight + 20;
        });
    });

    return choicesBox;
}
