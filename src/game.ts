import type {
    MandarinaPlugin,
    MandarinaOpt,
    Action,
    ActionType,
    CharacterDataOpt,
} from "./types";
import { addTextbox } from "./objects/textbox";
import { getGameData } from "./main";

// Constants
const LAYERS = [
    "backgrounds",
    "characters",
    "textbox",
    "textbox_name",
    "choices",
];

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
    return opt;
}

function getCurrentAction() {
    const data = getGameData();

    const chapter = data.chapters.get(data.current.chapter);
    if (!chapter) return;

    return chapter[data.current.action];
}

async function processAction() {
    const data = getGameData();
    const action = getCurrentAction();
    if (!action) return;

    if (data.current.runningAction) skipAction();

    data.current.runningAction = true;

    // Run action
    await action.start();

    data.current.runningAction = false;

    if (action.autoskip) {
        skipAction();
        nextAction();
    }
}

function nextAction() {
    const data = getGameData();
    data.current.action++;

    processAction();
}

function previousAction() {
    const data = getGameData();
    const action = getCurrentAction();

    action?.back();
    data.current.action--;

    processAction();
}

function skipAction() {
    const action = getCurrentAction();
    if (!action) return;

    action.skip?.();
}

export function startNovel(m: MandarinaPlugin, opt: MandarinaOpt) {
    const k = getGameData().k;

    k.scene("mandarina", () => {
        k.onLoad(() => {
            k.layers(LAYERS, "textbox");

            m._textbox = addTextbox(opt.textbox);

            processAction();

            // Input
            k.onUpdate(() => {
                if (
                    k.isKeyPressed("space") ||
                    k.isKeyPressed("right") ||
                    k.isMousePressed()
                ) {
                    nextAction();
                }
            });

            k.onKeyDown("up", () => {
                if (k.isKeyDown("shift"))
                    k.camScale(k.camScale().add(k.vec2(k.dt())));
            });

            k.onKeyDown("down", () => {
                if (k.isKeyDown("shift"))
                    k.camScale(k.camScale().sub(k.vec2(k.dt())));
            });

            k.onKeyPress("left", () => {
                previousAction();
            });

            k.onKeyPress("right", () => {
                nextAction();
            });
        });
    });
}
