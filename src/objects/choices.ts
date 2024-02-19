import type * as KA from "kaboom";
import type { Action } from "types";
import { visualComponent } from "components/visual";
import { choiceComponent } from "components/choice";
import { getGameData } from "game";
import { getSpriteDimensions } from "utils/getDimensions";
import { textWithOptions } from "utils/textWithOptions";

export type Choice = KA.GameObj;

/** Choice's options. */
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
    value: any,
    actions: (v: string) => Action[],
    opt?: ChoiceOpt,
    setter?: (value: any) => void,
) {
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

    let boxDimensions = k.vec2(options.width, options.height);

    if (options.sprite) {
        boxDimensions = getSpriteDimensions(options.sprite);
    }

    const choiceParent = k.make([
        k.pos(k.center()),
        k.layer("choices"),
        k.area({
            shape: new k.Rect(
                k.vec2(-boxDimensions.x / 2, -boxDimensions.y / 2), // For be in center
                boxDimensions.x,
                boxDimensions.y,
            ),
        }),
        visualComponent({
            visualObj: "choice_box",
        }),
        choiceComponent(value, actions, setter),
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
        ...textWithOptions(text, options),
    ]);

    return choiceParent;
}

export async function addChoices(
    choices: Record<
        string,
        {
            actions: () => Action[];
            value?: any;
        }
    >,
    setter?: (value: any) => void,
) {
    const { k, opt } = getGameData();
    const choicesBox = k.make([ k.layer("choices") ]);

    const choicePromise = new Promise((resolve) => {
        Object.keys(choices).forEach((choiceName) => {
            const ch = makeChoice(
                choiceName,
                choices[choiceName].value,
                choices[choiceName].actions,
                opt.choice,
                (v: any) => {
                    if (setter) setter(v);
                    resolve(choicesBox);
                },
            );

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
    });

    return choicePromise;
}
