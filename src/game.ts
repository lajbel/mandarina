import type {
    MandarinaPlugin,
    MandarinaOpt,
    Action,
    ActionType,
    CharacterDataOpt,
} from "./types";
import { addTextbox } from "./objects/textbox";
import { getData } from "./main";

// Some constants
const LAYERS = [
    "backgrounds",
    "characters",
    "textbox",
    "textbox_name",
    "choices",
];

// Chapters are how Mandarina novels are organized.
export function addChapter<T extends ActionType>(
    name: string,
    actions: () => Action<T>[],
) {
    getData().chapters.set(name, actions());
}

// In a chapter, there are actions, which are the things that happen in the story.
// Actions are functions that are executed in order.
export function createAction<T extends ActionType>(opt: Action<T>): Action<T> {
    return opt;
}

// Process actions info in game
function getCurrentAction() {
    const data = getData();

    const chapter = data.chapters.get(data.current.chapter);
    if (!chapter) return;

    return chapter[data.current.action];
}

async function processAction() {
    const data = getData();
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
    const data = getData();
    data.current.action++;

    processAction();
}

function previousAction() {
    const data = getData();
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

// Characters are the actors
export function addCharacter(
    id: string,
    name: string,
    opt: CharacterDataOpt,
): void {
    const data = getData();

    if (data.characters.has(id))
        throw new Error(`Character with id "${id}" already exists.`);

    data.characters.set(id, {
        id,
        name,
        opt,
    });
}

// The kaboom scene that starts the novel
export function startNovel(m: MandarinaPlugin, opt: MandarinaOpt) {
    const k = getData().k;

    k.scene("mandarina", () => {
        k.onLoad(() => {
            // Layers
            k.layers(LAYERS, "textbox");

            m._textbox = addTextbox(opt.textbox);

            // Process the first game action.
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
