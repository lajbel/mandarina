import type * as KA from "kaboom";
import type {
    Action,
    ActionType,
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
    chapters: new Map<string, BaseAction[]>(),
    characters: new Map(),
    currentChapter: "start",
    currentAction: 0,
    processingAction: false,
    playingAudios: new Map(),
    loadedImages: new Map<string, SpriteData>(),

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

// Chapters
export function addChapter<T extends ActionType>(
    name: string,
    actions: () => BaseAction[],
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

export function createAction<T extends Action<unknown>>(opt: T): Action<T> {
    const action = { ...opt };

    return action as unknown as Action<T>;
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

async function nextAction() {
    const data = getGameData();
    const action = getCurrentAction();
    if (!action) return;

    data.processingAction = true;

    await action.start();

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
    getCurrentAction().skip?.();
    getGameData().processingAction = false;
    getGameData().currentAction++;
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
