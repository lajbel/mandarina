import type * as KA from "kaboom";
import type { LayerPlugin } from "./plugins/layer";

declare function mandarina(opt?: MandarinaOpt): MandarinaPlugin;

// #region Mandarina Plugin
export interface MandarinaPlugin {
    k: KA.KaboomCtx & LayerPlugin;

    /** The textbox object, if there's one */
    textbox?: Textbox;

    /** Internal game data. */
    data: {
        /** Chapters. */
        chapters: Map<string, Action<unknown>[]>;
        /** Characters. */
        characters: Map<string, CharacterData>;
        /** Current data */
        current: {
            /** Current chapter. */
            chapter: string;
            /** Current action. */
            action: number;

            runningAction: boolean;
        }
    };

    // #region Configuration and setup
    loadSprite: KA.KaboomCtx["loadSprite"];
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
    chapter(id: string, actions: () => Action<unknown>[]): void;
    // #endregion

    // #region Actions
    /**
     * Writes a text in the textbox as a character.
     * @param characterId Character's id.
     * @param text Text to write.
    */
    say(characterId: string, text: string): Action<"normal">;
    /**
     * Writes a text in the textbox.
     * @param text Text to write.
    */
    say(text: string): Action<"normal">;
    /**
     * Shows a character in the screen.
     * @param characterId Character's id.
     * @param expression Character's expression.
     * @param align Character's alignment.
     */
    show(characterId: string, expression: string, align?: string): Action<"visual">;
    /**
     * Hides a character in the screen.
     * @param characterId Character's id.
    */
    hide(characterId: string): Action<"visual">;
    /**
     * Shows a background in the screen.
     * @param sprite Background's sprite.
    */
    bg(sprite: string): Action<"visual">;
    /**
     * Shows a color background in the screen.
     */
    bg(color: string | KA.Color): Action<"visual">;
    // #endregion
}

export interface MandarinaOpt extends KA.KaboomOpt {
    /** Default textbox options. */
    textbox?: TextboxOpt,
    /** Default text writes velocity. Default 0.05. */
    writeVel?: number,
    /** Default text writes waiting before a comma. Default 0.5. */
    writeCommaWait?: number,
}

// #endregion

// #region Actions
export type ActionType = "normal" | "visual";

export type ActionRaw = {
    /** Action's id. */
    id: string;
    /** If action won't wait for an user interaction to continue to the next one. */
    autoskip?: boolean;
    /** Action type */
    /** Action's execution function. */
    exec(): void | Promise<void>;
    /** Action's skipped function. */
    skip?(): void | Promise<void>;
}

export type ActionNormal = {
    type: "normal";
}

export type ActionVisual = {
    type: "visual";
    fadeIn(): Action<"visual">;
}

export type Action<T = unknown> = ActionRaw & { type: T } & (ActionNormal | ActionVisual);

// #endregion

// #region Characters

export interface CharacterData {
    /** Character's id, will be used to refer the character in all game code. */
    id: string;
    /** Character's name, will be displayed in the game. */
    name: string;
    /** Character's extra options. */
    opt?: CharacterDataOpt;
}

export interface CharacterDataOpt {
    /** Character's set of expressions. */
    expressions?: Record<string, string>;
    /** Character's name colour. */
    color?: string;
}

// #endregion

// #region Textbox

export type Textbox = KA.GameObj<KA.PosComp | KA.AnchorComp | KA.OpacityComp | TextboxComp>;

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
    changeName(this: Textbox, text: string): void;
}

export interface TextboxOpt {
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
}

// #endregion

export default mandarina;
