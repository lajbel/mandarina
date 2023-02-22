import type { Comp, GameObj, KaboomCtx, PosComp, TextComp, Vec2 } from "kaboom";

declare function mandarina(): MandarinaCtx;

// #region Mandarina Plugin

export interface MandarinaPlugin {
    k: KaboomCtx;

    /** Internal game data. */
    data: {
        /** Chapters. */
        chapters: Map<string, Action[]>;
        /** Characters. */
        characters: Map<string, CharacterData>;
        /** Current data */
        current: {
            /** Current chapter. */
            chapter: number;
            /** Current action. */
            action: number;
        }
    };

    /**
     * Add a character to the game.
     * @param id Character's id, will be used to refer the character in all game code.
     * @param name Character's name, will be displayed in the game.
     * @param opt Character's extra options.
     */
    character(id: string, name: string, opt?: CharacterDataOpt): void;
}

export interface MandarinaCtx extends MandarinaPlugin {
    /** Kaboom's context. */
    k: KaboomCtx;
}

// #endregion

// #region Actions

export interface Action {
    /** Action's id. */
    id: string;
    /** If action won't wait for an user interaction to continue to the next one. */
    autoskip?: boolean;
    /** Action's execution function. */
    exec: (textbox: Textbox) => void;
}

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

type Textbox = GameObj<PosComp | TextboxComp>;

export interface TextboxComp extends Comp {
    /** If the textbox is in skip. */
    skipped: boolean;
    /** Current character of the writing text. */
    curChar: number;
    
    /** The textbox's text. */
    text?: GameObj<TextComp>;
    /** The textbox's name. */
    name?: GameObj<TextComp>;

    /** Writes a text in the textbox. */
    write(this: Textbox, text: string): void;
    /** Clears the textbox. */
    clear(this: Textbox): void;
    /** Skips the current text. */
    skip(this: Textbox): void;
    /** Shows the textbox. */
    show(this: Textbox): void;
    /** Hides the textbox. */
    hide(this: Textbox): void;
}

export interface TextboxOpt {
    /** Kaboom loaded sprite for use in textbox. */
    sprite?: string;

    /** Textbox's position. */
    pos?: Vec2;

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
