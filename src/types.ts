import type { Comp, GameObj, KaboomCtx, PosComp, TextComp, Vec2, KaboomOpt, OpacityComp, AnchorComp, RectCompOpt, SpriteCompOpt, TextCompOpt } from "kaboom";

declare function mandarina(opt?: MandarinaOpt): MandarinaCtx;

// #region Mandarina Plugin

export interface MandarinaPlugin {
    k: KaboomCtx;

    /** The textbox object, if there's one */
    textbox?: Textbox;

    /** Internal game data. */
    data: {
        /** Chapters. */
        chapters: Map<string, Action[]>;
        /** Characters. */
        characters: Map<string, CharacterData>;
        /** Current data */
        current: {
            /** Current chapter. */
            chapter: string;
            /** Current action. */
            action: number;

            running: boolean;
        },
        opt: MandarinaOpt
    };

    // #region Configuration and setup
    loadSprite: KaboomCtx["loadSprite"];
    loadSound: KaboomCtx["loadSound"];

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
    chapter(id: string, actions: () => Action[]): void;
    // #endregion

    // #region Actions
    /**
     * Writes a text in the textbox as a character.
     * @param characterId Character's id.
     * @param text Text to write.
    */
    say(characterId: string, text: string): Action;
    /**
     * Writes a text in the textbox.
     * @param text Text to write.
    */
    say(text: string): Action;
    /**
     * Shows a character in the screen.
     * @param characterId Character's id.
     * @param expression Character's expression.
     * @param align Character's alignment.
     */
    show(characterId: string, expression: string, align?: string): Action;
    /**
     * Hides a character in the screen.
     * @param characterId Character's id.
    */
    hide(characterId: string): Action;
    // #endregion
}

export interface MandarinaCtx extends MandarinaPlugin {
    /** Kaboom's context. */
    k: KaboomCtx;
}

export interface MandarinaOpt extends KaboomOpt {
    /** Default textbox options. */
    textbox?: TextboxOpt;
    /** Default text writes velocity. Default 0.05. */
    writeVel?: number;
    /** Default text writes waiting before a comma. Default 0.5. */
    writeCommaWait?: number;
}

// #endregion

// #region Actions

export interface Action {
    /** Action's id. */
    id: string;
    /** If action won't wait for an user interaction to continue to the next one. */
    autoskip?: boolean;
    /** Action's execution function. */
    exec: () => void | Promise<void>;
    /** Action's skipped function. */
    skip?: () => void | Promise<void>;
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
    /** Default sprite. */
    sprite?: string;
    /** Default animation. */
    anim?: string;
    /** Character's set of expressions. */
    expressions?: Record<string, ExpressionOpt>;
    /** Character display height */
    height?: number;
    /** Character's name colour. */
    color?: string;
}

export interface ExpressionOpt {
    /** Sprite for the expression */
    sprite?: string;
    /** Animation of the sprite */
    anim?: string;
    /** Character display height */
    height?: number;
    /** Frame of the animation */
    frame?: number;
}

// #endregion

// #region Textbox

export type Textbox = GameObj<PosComp | AnchorComp | OpacityComp | TextboxComp>;

export interface TextboxComp extends Comp {
    /** If the textbox is in skip. */
    skipped: boolean;
    /** Current character of the writing text. */
    curChar: number;

    /** Setups some internal textbox variables. */
    setup(): void;

    /** The textbox's text. */
    text?: GameObj<TextComp>;
    /** The textbox's name. */
    name?: GameObj<TextComp>;

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
    pos?: Vec2;

    /** Text wait. */
    wait?: number;

    /** Text wait. */
    waitCharacters?: Array<WaitOpt>;

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

    /** Textbox's text margin. */
    textMargin?: number;

    /** Textbox's background color. */
    backgroundColor?: string;

    /** Rect options, for advanced customization. */
    rectOpt?: RectCompOpt;
    spriteOpt?: SpriteCompOpt;
    textOpt?: TextCompOpt;
    nameOpt?: TextCompOpt;
}

export interface WaitOpt {
    character: string;
    time?: number;
}

// #endregion

export default mandarina;
