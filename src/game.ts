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
export function addChapter(name: string, actions: () => Action<unknown>[]) {
    getData().chapters.set(name, actions());
}

// In a chapter, there are actions, which are the things that happen in the story.
// Actions are functions that are executed in order.
export function createAction<T extends ActionType>(opt: Action<T>): Action<T> {
    return opt;
}

// Process actions info in game
export async function processAction(m: MandarinaPlugin) {
    const data = getData();

    const chapter = data.chapters.get(data.current.chapter);
    if (!chapter) return;

    const action = chapter[data.current.action];

    // If there's not action, won't do anything.
    if (!action) return;

    if (data.current.runningAction && action && action.skip)
        return action.skip();

    data.current.runningAction = true;

    // Process start action
    await action.start();

    data.current.runningAction = false;

    data.current.action++;
    if (action.autoskip) {
        // TODO: implement
        // action.finish();
        processAction(m);
    }
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
            processAction(m);

            // Input
            k.onUpdate(() => {
                if (
                    k.isKeyPressed("space") ||
                    k.isKeyPressed("right") ||
                    k.isMousePressed()
                ) {
                    processAction(m);
                }
            });

            k.onKeyDown("up", () => {
                k.camScale(k.camScale().add(k.vec2(k.dt())));
            });

            k.onKeyDown("down", () => {
                k.camScale(k.camScale().sub(k.vec2(k.dt())));
            });
        });
    });
}
