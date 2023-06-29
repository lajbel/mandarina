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
            fontWeight: bold ? "bold" : "inherit",
            italic: italic ? italic : "inherit",
            noselect: noselect ? noselect : "inherit",
            code: code ? code : "inherit",
            underline: underline ? underline : "inherit",
        }}
    >
        {children}
    </span>
);

export default Text;
