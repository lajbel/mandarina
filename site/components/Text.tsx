import * as React from "react";

type FontSize = "small" | "normal" | "big" | "huge";

type TextProps = {
    color?: number | string;
    size?: FontSize;
    bold?: boolean;
    italic?: boolean;
    noselect?: boolean;
    code?: boolean;
    underline?: boolean;
};

type Props = TextProps &
    Omit<React.HTMLProps<HTMLSpanElement>, keyof TextProps>;

const fontSizes = {
    small: "text-sm",
    normal: "text-lg",
    big: "text-1xl",
    huge: "text-4xl",
};

const Text: React.FC<Props> = ({
    color,
    size,
    bold,
    italic,
    children,
    noselect,
    code,
    underline,
}) => (
    <span
        className={`
    ${color ? `text-${color}` : ""}
    ${size ? fontSizes[size] : fontSizes["normal"]}
    ${bold ? "font-bold" : ""}
    ${italic ? "italic" : ""}
    ${noselect ? "noselect" : ""}
    ${code ? "code" : ""}
    ${underline ? "underline" : ""}
`}
    >
        {children}
    </span>
);

export default Text;
