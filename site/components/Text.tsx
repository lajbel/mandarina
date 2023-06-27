import * as React from "react";
import { FontSize, fontSizes } from "lib/ui";

type TextProps = {
    color?: string;
    size?: FontSize;
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
        css={{
            color: color ? color : "var(--color-fg1)",
            fontSize: size ? fontSizes[size] : "inherit",
        }}
        className={`
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
