import type * as KA from "kaboom";
import type {
    Action,
    CharacterDataOpt,
    GameData,
    LoadImageOpt,
    SpriteData,
    BaseAction,
} from "types";
import { addTextbox } from "objects/textbox";

// Constants
const LAYERS = [
    "backgrounds",
    "characters",
    "textbox",
    "textbox_name",
    "choices",
];

export const data: Partial<GameData> = {
    actionStack: [],
    chapters: new Map<string, Action[]>(),
    characters: new Map(),
    currentAction: 0,
    processingAction: false,
    playingAudios: new Map(),
    loadedImages: new Map<string, SpriteData>(),
    variables: {},

    isProcessingAction(this: GameData) {
        return data.processingAction as boolean;
    },
};

// Data functions
function hasContextStarted(d: typeof data): d is GameData {
    return "m" in d;
}

export function getGameData(): GameData {
    if (hasContextStarted(data)) {
        return data;
    } else {
        throw new Error("Mandarina context not started");
    }
}

// Loaders
export function loadImage(
    name: string,
    path: string,
    opt: LoadImageOpt & KA.LoadSpriteOpt = {},
) {
    const { k, loadedImages } = getGameData();
    const sprite = k.loadSprite(name, path, opt);
    sprite.onLoad((data) => {
        loadedImages.set(name, { ...data, scale: opt.scale ?? 1 });
    });

    return sprite;
}

// Variables
export function setVar<T>(name: string, value: T): (value: T) => void {
    const data = getGameData();
    data.variables[name] = value;

    console.log(`Variable ${name} set to ${value}`);

    return (value) => {
        data.variables[name] = value;
    };
}

export function getVar(name: string): any {
    const data = getGameData();
    return data.variables[name];
}

// Chapters
export function addChapter(name: string, actions: () => Action<any>[]) {
    console.log(`Chapter ${name} added with ${actions().length} actions.`);

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

export function createAction<T extends Action<unknown>>(opt: T): Action<T> {
    const action = { ...opt };
    return action as unknown as Action<T>;
}

function getCurrentAction() {
    const { actionStack, currentAction } = getGameData();
    return actionStack[currentAction];
}

function getPreviousAction() {
    const { actionStack, currentAction } = getGameData();
    return actionStack[currentAction - 1];
}

export function insertActions(actions: Action[], mod: number = 0) {
    const { actionStack, currentAction } = getGameData();
    actionStack.splice(currentAction + 1, 0, ...actions);
}

export function insertChapter(name: string) {
    const { chapters, actionStack, currentAction } = getGameData();
    actionStack.splice(currentAction + 1, 0, ...(chapters.get(name) ?? []));
}

async function nextAction() {
    const data = getGameData();
    const action = getCurrentAction();
    if (!action) return;

    data.processingAction = true;

    console.log(`Started to process action ${data.currentAction}`, action);
    await action.start();
    console.log(`Finished to process action ${data.currentAction}`, action);

    // If it not stopped by another process, continue
    if (data.processingAction) {
        data.processingAction = false;
        data.currentAction++;

        if (action.autoskip) nextAction();
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
    if (getCurrentAction().canSkip === false) return;

    console.log(`Skipped action ${getGameData().currentAction}`);
    getCurrentAction().skip?.();
}

export function startNovel() {
    const { k, m, opt, isProcessingAction } = getGameData();
    const input = opt.inputs ?? {
        pc: {
            next: "space",
            screenshoot: "f2",
        },
    };

    // some variables
    m.setVar("pronoun", 2);

    k.scene("mandarina", () => {
        k.onLoad(() => {
            k.layers(LAYERS, "textbox");
            m._textbox = addTextbox(opt.textbox);
            insertChapter("start");
            nextAction();

            // User input
            k.onUpdate(() => {
                k.debug.log(isProcessingAction());
                if (
                    k.isKeyPressed(input.pc?.next) ||
                    k.isKeyPressed("enter") ||
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
