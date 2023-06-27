export type Color =
    | "bg1"
    | "bg2"
    | "bg3"
    | "bg4"
    | "bgpat"
    | "outline"
    | "fg1"
    | "fg2"
    | "fg3"
    | "fg4"
    | "fghl"
    | "highlight"
    | "accent"
    | "danger"
    | "errbg";

export type FontSize = "small" | "normal" | "big" | "huge";

export type CSSVal = string;
export type ThemeDef = Record<Color, CSSVal>;
export type ThemeBook = Record<string, ThemeDef>;

export type NumberMinorToFive = 1 | 2 | 3 | 4;
export type RecordMinorToFive<T extends string> = Record<
    `${T}${NumberMinorToFive}`,
    CSSVal
>;

export type A = RecordMinorToFive<"a">;

export const fontSizes: Record<FontSize, CSSVal> = {
    small: "16px",
    normal: "20px",
    big: "24px",
    huge: "32px",
};

export const space = 8;

function genColors<T extends string>(
    name: T,
    num: number,
    r: number,
    g: number,
    b: number,
    dr: number,
    dg: number,
    db: number,
): RecordMinorToFive<T> {
    const map: Record<string, CSSVal> = {};
    for (let i = 0; i < num; i++) {
        map[`${name}${i + 1}`] = `rgb(${r + dr * i}, ${g + dg * i}, ${
            b + db * i
        })`;
    }
    return map as RecordMinorToFive<T>;
}

export const themes: ThemeBook = {
    dark: {
        ...genColors("bg", 4, 20, 20, 30, 12, 12, 16),
        ...genColors("fg", 4, 215, 225, 235, -50, -50, -45),
        outline: "var(--color-bg4)",
        bgpat: "rgb(16, 16, 26)",
        fghl: "rgb(215, 225, 235)",
        highlight: "rgb(30, 140, 230)",
        accent: "rgb(19, 33, 49)",
        danger: "rgb(240, 90, 90)",
        errbg: "rgb(40, 25, 35)",
    },
    light: {
        ...genColors("bg", 4, 255, 248, 247, -10, -10, -10),
        ...genColors("fg", 4, 20, 20, 20, 12, 12, 12),
        outline: "var(--color-bg4)",
        bgpat: "rgb(235, 235, 245)",
        fghl: "rgb(20, 20, 30)",
        highlight: "rgb(30, 140, 230)",
        accent: "rgb(245, 245, 255)",
        danger: "rgb(240, 90, 90)",
        errbg: "rgb(240, 240, 250)",
    },
};

export const DEF_THEME = "light";

export const cssVars = (() => {
    const buildCSSVars = (
        prefix: string,
        map: Record<string, CSSVal>,
    ): string => {
        let code = "";
        for (const k in map) {
            code += `--${prefix}-${k}: ${map[k]};`;
        }
        return code;
    };

    let code = `:root {${buildCSSVars("text", fontSizes)}${buildCSSVars(
        "color",
        themes[DEF_THEME],
    )}}`;

    for (const theme in themes) {
        code += `.${theme} {${buildCSSVars("color", themes[theme])}}`;
    }

    return code;
})();
