import type * as KA from "kaboom";
import type { LayerPlugin } from "./plugins/layer";
export type * from "./components/visual";
export type { LayerPlugin };

// #region Main function
declare function mandarina(opt?: MandarinaOpt & KA.KaboomOpt): MandarinaPlugin;
// #endregion

// #region Type helpers
export type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;
// #endregion

type KaboomPlugins = LayerPlugin;

export type GameData = {
    k: KA.KaboomCtx & KaboomPlugins;
    m: MandarinaPlugin;
    opt: MandarinaOpt;
    chapters: Map<string, BaseAction[]>;
    characters: Map<string, CharacterData>;
    currentChapter: string;
    currentAction: number;
    processingAction: boolean;
    playingAudios: Map<string, KA.AudioPlay[]>;
    loadedImages: Map<string, SpriteData>;

    isProcessingAction(): boolean;
};

type Inputs = "pc" | "gamepad" | "touch";
type GameActions = "next" | "screenshoot";

export type GameInputs = {
    [key in Inputs]: {
        [key in GameActions]: KA.Key;
    };
};

// #region Mandarina Plugin
export type MandarinaPlugin = {
    /** The kaboom.js's context. */
    k: KA.KaboomCtx & LayerPlugin;
    /** The textbox object, if there's one. */
    _textbox?: Textbox;
    /** In-game pronoun. */
    pronoun: string;
    // #region Configuration and setup.
    loadImage(
        name: string,
        path: string,
        opt?: LoadImageOpt
    ): KA.Asset<KA.SpriteData>;
    loadAudio: KA.KaboomCtx["loadSound"];

    /** Get the Mandarina Context. */
    getMandarinaContext(): MandarinaPlugin;
    /**
     * Add a character to the game.
     * @param id Character's id, will be used to refer the character in all game code.
     * @param name Character's name, will be displayed in the game.
     * @param opt Character's extra options. (optional)
     */
    character(id: string, name: string, opt?: CharacterDataOpt): void;
    /**
     * Add a chapter to the game.
     * @param id Chapter's id, will be used to refer the chapter in all game code.
     * @param actions Chapter's actions.
     */
    chapter<T extends ActionType>(id: string, actions: () => Action<T>[]): void;
    /**
     * Starts the game.
     */
    start(): void;
    // #endregion
    // #region Actions
    /**
     * Changes the current chapter.
     * @param name Chapter's id.
     */
    jump(name: string): NormalAction;
    /**
     * Writes a text in the textbox as a character.
     * @param characterId Character's id.
     * @param text Text to write.
     */
    say(characterId: string, text: string): NormalAction;
    /**
     * Writes a text in the textbox.
     * @param text Text to write.
     */
    say(text: string): NormalAction;
    /**
     * Shows a character in the screen.
     * @param characterId Character's id.
     * @param expression Character's expression.
     * @param align Character's alignment.
     */
    show(
        characterId: string,
        expression: string,
        align?: VisualAlign
    ): VisualAction;
    /**
     * Hides a character in the screen.
     * @param characterId Character's id.
     */
    hide(characterId: string): NormalAction;
    /**
     * Shows a background in the screen.
     * @param sprite Background's sprite.
     */
    showBackground(sprite: string): VisualAction;
    /**
     * Shows a color background (hex) in the screen.'
     * @param color Background's color.
     */
    showBackground(color: string): VisualAction;
    /**
     * Shows a color background (k.rgb()) in the screen.
     * @param color Background's color.
     */
    showBackground(color: KA.Color): VisualAction;
    /**
     * Plays a sound.
     * @param channel Sound's channel.
     * @param sound Sound's asset.
     */
    playAudio(
        channel: string,
        sound: string,
        opt?: KA.AudioPlayOpt
    ): AudioAction;
    /** Shows the textbox. */
    showTextbox(): NormalAction;
    /** Hides the textbox. */
    hideTextbox(): NormalAction;
    /** Display a set of choices. */
    choice(text: string, choices: Choice[]): NormalAction;
    /** Display a set of choices. */
    choice(text: string, character: string, choices: Choice[]): NormalAction;
    // #endregion
};

/** Mandarina plugin options. */
export type MandarinaOpt = {
    /** Default textbox options. */
    textbox?: TextboxOpt;
    /** Default text writes velocity. Default 0.05. */
    writeVel?: number;
    /** Default text writes waiting before a comma. Default 0.5. */
    writeCommaWait?: number;
};

/** `loadImage()` options. */
export type LoadImageOpt = {
    /** Scale image to. */
    scale?: number;
};

export type SpriteData = KA.SpriteData & {
    /** Sprite's scale. */
    scale: number;
};
// #endregion

// #region Actions
export type ActionType = "normal" | "visual" | "audio";

export interface BaseAction {
    /** Action's id. */
    id: string;
    /** Action's type. */
    type: ActionType;
    /** If action won't wait for an user interaction to continue to the next one. */
    autoskip?: boolean;
    /** Runs when action starts */
    start(): void | Promise<void>;
    /** Runs when action is backed. */
    back(): void | Promise<void>;
    /** Action's skipped function. */
    skip?(): void | Promise<void>;
}

export interface NormalAction extends BaseAction {
    type: "normal";
}

export type VisualAlign =
    | "left"
    | "right"
    | "center"
    | "truecenter"
    | "trueleft"
    | "trueright";

export interface VisualAction extends BaseAction {
    type: "visual";
    /** If the visual will fadeIn. */
    fade: boolean;
    /** */
    side?: "left" | "right";
    /** Fade the visual at start. */
    fadeIn(): VisualAction;
    /** Appear from a side */
    appearFrom(side: "left" | "right"): VisualAction;
}

export interface AudioAction extends BaseAction {
    type: "audio";
    /** AudioPlay volume */
    volume: number;

    /** Plays the audio with a different volume */
    withVolume(volume: number): AudioAction;
    /** Stop the audio in a specific second */
    stopAt(time: number): AudioAction;
}

export type Action<T = Action<any> | undefined> = T extends NormalAction
    ? NormalAction
    : T extends VisualAction
    ? VisualAction
    : T extends AudioAction
    ? AudioAction
    : NormalAction | VisualAction | AudioAction;
// #endregion

// #region Characters
export type CharacterData = {
    /** Character's id, will be used to refer the character in all game code. */
    id: string;
    /** Character's name, will be displayed in the game. */
    name: string;
    /** Character's extra options. */
    opt?: CharacterDataOpt;
};

export type CharacterDataOpt = {
    /** Character's set of expressions. */
    expressions?: Record<string, string>;
    /** Character's name color. */
    color?: string;
    /** Character's text voice. */
    voice?: string;
};
// #endregion

// #region Choices
export type Choice = {
    text: string;
    actions: () => Action[];
};
// #endregion

// #region Textbox
export type Textbox = KA.GameObj<
    KA.PosComp | KA.AnchorComp | KA.OpacityComp | TextboxComp
>;

export interface TextboxComp extends KA.Comp {
    /** If the textbox is in skip. */
    skipped: boolean;
    /** Current character of the writing text. */
    curChar: number;
    /** The textbox's text. */
    text?: KA.GameObj<KA.TextComp>;
    /** The textbox's name. */
    name?: KA.GameObj<KA.TextComp>;

    /** Writes a text in the textbox. */
    write(this: Textbox, text: string): Promise<void>;
    /** Clears the textbox. */
    clear(this: Textbox): void;
    /** Skips the current text. */
    skip(this: Textbox): void;
    /** Shows the textbox. */
    show(this: Textbox): void;
    /** Hides the textbox. */
    hide(this: Textbox): void;
    /** Change the namebox's text */
    changeName(this: Textbox, text: string, color?: KA.Color): void;
}

export type TextboxOpt = {
    /** Kaboom loaded sprite for use in textbox. */
    sprite?: string;
    /** Textbox's position. */
    pos?: [number, number];
    /** Textbox's offset. */
    offset?: [number, number];
    /** Textbox's width. */
    width?: number;
    /** Textbox's height. */
    height?: number;
    /** Textbox's text align */
    textAlign?: "left" | "center" | "right";
    /** Textbox's text size. */
    textSize?: number;
    /** Textbox's text font. */
    textFont?: string;
    /** Textbox's text color. */
    textColor?: string;
    /** Textbox's text offset */
    textOffset?: [number, number];
};
// #endregion

export default mandarina;
