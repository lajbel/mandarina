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

const Text: React.FC<Props> = ({
    // color,
    // size,
    // bold,
    // italic,
    children,
    // noselect,
    // code,
    // underline,
    // ...props
}) => <span>{children}</span>;

export default Text;
