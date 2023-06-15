import type * as KA from "kaboom";
import type { LayerPlugin } from "./plugins/layer";

// #region Main function
declare function mandarina(opt?: MandarinaOpt): MandarinaPlugin;
// #endregion

// #region Mandarina Plugin
export type MandarinaPlugin = {
    k: KA.KaboomCtx & LayerPlugin;

    /** The textbox object, if there's one */
    _textbox?: Textbox;
    /** In-game pronous */
    pronouns: string;

    // #region Configuration and setup
    loadImage: KA.KaboomCtx["loadSprite"];
    loadSound: KA.KaboomCtx["loadSound"];

    /**
     * Add a character to the game.
     * @param id Character's id, will be used to refer the character in all game code.
     * @param name Character's name, will be displayed in the game.
     * @param opt Character's extra options.
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
    jump(name: string): ActionNormal;
    /**
     * Writes a text in the textbox as a character.
     * @param characterId Character's id.
     * @param text Text to write.
     */
    say(characterId: string, text: string): ActionNormal;
    /**
     * Writes a text in the textbox.
     * @param text Text to write.
     */
    say(text: string): ActionNormal;
    /**
     * Shows a character in the screen.
     * @param characterId Character's id.
     * @param expression Character's expression.
     * @param align Character's alignment.
     */
    show(
        characterId: string,
        expression: string,
        align?: string
    ): Action<"visual">;
    /**
     * Hides a character in the screen.
     * @param characterId Character's id.
     */
    hide(characterId: string): Action<"normal">;
    /**
     * Shows a background in the screen.
     * @param sprite Background's sprite.
     */
    bg(sprite: string): Action<"visual">;
    /**
     * Shows a color background (hex) in the screen.
     */
    bg(color: string): Action<"visual">;
    /**
     * Shows a color background (k.rgb()) in the screen.
     */
    bg(color: KA.Color): Action<"visual">;
    // #endregion
};

export type MandarinaOpt = KA.KaboomOpt & {
    /** Default textbox options. */
    textbox?: TextboxOpt;
    /** Default text writes velocity. Default 0.05. */
    writeVel?: number;
    /** Default text writes waiting before a comma. Default 0.5. */
    writeCommaWait?: number;
};
// #endregion

// #region Actions
// TODO: An action controller?
export type ActionType = "normal" | "visual" | "audio";

export interface ActionRaw {
    /** Action's id. */
    id: string;
    /** Action's type. */
    type: ActionType;
    /** If action won't wait for an user interaction to continue to the next one. */
    autoskip?: boolean;
    /** Action type */
    /** Action's execution function. */
    start(): void | Promise<void>;
    /** Action's skipped function. */
    skip?(): void | Promise<void>;
}

export interface ActionNormal extends ActionRaw {
    type: "normal";
}

export interface ActionVisual extends ActionRaw {
    type: "visual";
    /** If the visual will fadeIn. */
    fade: boolean;
    /** fadeIn visual. */
    fadeIn(): Action<"visual">;
}

export interface ActionAudio extends ActionRaw {
    type: "audio";
    volume: number;

    /** Plays the audio with a different volumen */
    withVolume(volume: number): ActionAudio;
}

type ActionByType<T> = T extends "normal"
    ? ActionNormal
    : T extends "visual"
    ? ActionVisual
    : T extends "audio"
    ? ActionAudio
    : never;

export type Action<T extends ActionType = any> = ActionByType<T>;

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
    /** Character's name colour. */
    color?: string;
};
// #endregion

// #region Textbox
export type Textbox = KA.GameObj<
    KA.PosComp | KA.AnchorComp | KA.OpacityComp | TextboxComp
>;

export type TextboxComp = KA.Comp & {
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
    changeName(this: Textbox, text: string): void;
};

export type TextboxOpt = {
    /** Kaboom loaded sprite for use in textbox. */
    sprite?: string;

    /** Textbox's position. */
    pos?: KA.Vec2;

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
