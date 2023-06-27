import * as React from "react";

type TextProps = {
    color?: number | string;
    size?: string;
    bold?: boolean;
    italic?: boolean;
    noselect?: boolean;
    code?: boolean;
    underline?: boolean;
};

type Props = TextProps &
    Omit<React.HTMLProps<HTMLSpanElement>, keyof TextProps>;

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
    ${size ? `text-${size}` : ""}
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
