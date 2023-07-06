import type * as KA from "kaboom";
import type { VisualAlign } from "../types";
import { createAction, getGameData } from "../game";
import { makeCharacter } from "../objects/characters";

export function showCharacter(
    characterId: string,
    expression = "default",
    align: VisualAlign = "center",
) {
    const { m, k, characters, loadedImages } = getGameData();
    let ch: KA.GameObj;

    return createAction({
        id: "show_character",
        type: "visual",
        autoskip: true,
        fade: false,
        start() {
            ch = makeCharacter(characterId, expression, align);
        },
        back() {
            if (!ch) return;

            ch.destroy();
        },
        skip() {
            return;
        },
        fadeIn() {
            this.fade = true;
            return this;
        },
        appearFrom(side) {
            this.side = side;
            return this;
        },
    });
}

export function hideCharacter(characterId: string) {
    const { k } = getGameData();

    return createAction({
        id: "hide_character",
        type: "normal",
        start: () => {
            k.get("character_" + characterId, { recursive: true })[0].destroy();
        },
        skip() {
            return;
        },
        back() {
            this.showCharacter(characterId, "default", "center");
        },
    });
}
