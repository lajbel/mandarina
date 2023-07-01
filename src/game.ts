import type { Action, ActionType, CharacterDataOpt, GameData } from "./types";
import { addTextbox } from "./objects/textbox";

// Constants
const LAYERS = [
    "backgrounds",
    "characters",
    "textbox",
    "textbox_name",
    "choices",
];

export const data: Partial<GameData> = {
    chapters: new Map<string, Action[]>(),
    characters: new Map(),
    currentChapter: "start",
    currentAction: 0,
    processingAction: false,
    playingAudios: new Map(),

    isProcessingAction(this: GameData) {
        return data.processingAction as boolean;
    },
};

// Data functions
function hasContextStarted(d: typeof data): d is GameData {
    return "m" in data;
}

export function getGameData(): GameData {
    if (hasContextStarted(data)) {
        return data;
    } else {
        throw new Error("Mandarina context not started");
    }
}

export function addChapter<T extends ActionType>(
    name: string,
    actions: () => Action<T>[],
) {
    getGameData().chapters.set(name, actions());
}

export function addCharacter(
    id: string,
    name: string,
    opt: CharacterDataOpt,
): void {
    const data = getGameData();

    if (data.characters.has(id))
        throw new Error(`Character with id "${id}" already exists.`);

    data.characters.set(id, {
        id,
        name,
        opt,
    });
}

export function createAction<T extends ActionType>(opt: Action<T>): Action<T> {
    const action = { ...opt };

    return action;
}

function getCurrentAction() {
    const data = getGameData();

    const chapter = data.chapters.get(data.currentChapter);
    if (!chapter)
        throw new Error(`Chapter "${data.currentChapter}" not found.`);

    return chapter[data.currentAction];
}

function getPreviousAction() {
    const data = getGameData();
    const chapter = data.chapters.get(data.currentChapter);

    if (!chapter)
        throw new Error(`Chapter "${data.currentChapter}" not found.`);

    return chapter[data.currentAction - 1];
}

// New game functions
async function nextAction() {
    const data = getGameData();
    const action = getCurrentAction();

    data.processingAction = true;

    await action.start();

    // If it not stopped by another process, continue
    if (data.processingAction) {
        if (action.autoskip) {
            data.currentAction++;
            nextAction();
        }

        data.processingAction = false;
        data.currentAction++;
    }
}

function previousAction() {
    const data = getGameData();

    data.processingAction = true;

    getCurrentAction().back?.();
    getPreviousAction().start();

    data.currentAction--;
    data.processingAction = false;
}

function skipAction() {
    getCurrentAction().skip?.();
    getGameData().processingAction = false;
}

export function startNovel() {
    const { k, m, opt, isProcessingAction } = getGameData();

    k.scene("mandarina", () => {
        k.onLoad(() => {
            k.layers(LAYERS, "textbox");

            m._textbox = addTextbox(opt.textbox);

            nextAction();

            // User input
            // TODO: Add support for customize keys
            k.onUpdate(() => {
                if (
                    k.isKeyPressed("space") ||
                    k.isKeyPressed("right") ||
                    k.isMousePressed()
                ) {
                    if (!isProcessingAction()) nextAction();
                    else skipAction();
                }

                if (k.isKeyPressed("left")) {
                    previousAction();
                }
            });
        });
    });
}
