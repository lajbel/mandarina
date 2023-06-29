import type { Property } from "csstype";
import * as React from "react";
import { space as spaceUnit } from "lib/ui";

type StackDir = "row" | "column";
type Align = "start" | "end" | "center" | "stretch" | "baseline";

const toAlign = (a: Align) => {
    switch (a) {
    case "start":
        return "flex-start";
    case "end":
        return "flex-end";
    case "center":
        return "center";
    case "stretch":
        return "stretch";
    case "baseline":
        return "baseline";
    }
};

type Justify = "start" | "end" | "center" | "between" | "around" | "even";

const toJustify = (j: Justify) => {
    switch (j) {
    case "start":
        return "flex-start";
    case "end":
        return "flex-end";
    case "center":
        return "center";
    case "between":
        return "space-between";
    case "around":
        return "space-around";
    case "even":
        return "space-evenly";
    }
};

export interface ViewProps {
    dir?: StackDir;
    gap?: number;
    reverse?: boolean;
    wrap?: boolean;
    align?: Align;
    justify?: Justify;
    stretchX?: boolean;
    stretchY?: boolean;
    stretch?: boolean;
    bg?: number | string;
    rounded?: boolean;
    outlined?: boolean;
    width?: number | string;
    height?: number | string;
    focusable?: boolean;
    pad?: number;
    padX?: number;
    padY?: number;
    children?: React.ReactNode;
}

type Props = React.PropsWithChildren<
    ViewProps & Omit<React.HTMLProps<HTMLDivElement>, keyof ViewProps | "ref">
>;

export type ViewPropsAnd<T> = T & Omit<Props, keyof T>;

const View = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            dir,
            gap,
            reverse,
            wrap,
            align,
            justify,
            stretchX,
            stretchY,
            stretch,
            bg,
            rounded,
            outlined,
            width,
            height,
            pad,
            padX,
            padY,
            focusable,
            onKeyDown,
            children,
            ...props
        },
        ref,
    ) => {
        const px = (padX ?? pad ?? 0) * 8;
        const py = (padY ?? pad ?? 0) * 8;
        const localRef = React.useRef(null);
        const curRef = ref ?? localRef;

        return (
            <div
                ref={curRef}
                onKeyDown={
                    focusable || onKeyDown
                        ? (e) => {
                            if (focusable) {
                                if (e.key === "Enter") {
                                    e.currentTarget.click();
                                }
                            }
                            onKeyDown && onKeyDown(e);
                        }
                        : undefined
                }
                tabIndex={focusable ? 0 : undefined}
                css={{
                    display: "flex",
                    flexDirection: ((dir ?? "column") +
                        (reverse ? "-reverse" : "")) as Property.FlexDirection,
                    alignItems: toAlign(align ?? "start"),
                    justifyContent: toJustify(justify ?? "start"),
                    flexWrap: wrap ? "wrap" : "nowrap",
                    width: stretchX || stretch ? "100%" : width,
                    height: stretchY || stretch ? "100%" : height,
                    background:
                        typeof bg === "number" ? `var(--color-bg${bg})` : bg,
                    paddingLeft: `${px}px`,
                    paddingRight: `${px}px`,
                    paddingTop: `${py}px`,
                    paddingBottom: `${py}px`,
                    position: "relative",
                    borderRadius: rounded ? 8 : 0,
                    boxShadow: outlined
                        ? "0 0 0 2px var(--color-outline)"
                        : "none",
                    gap: (gap ?? 0) * spaceUnit,
                    ":focus": {
                        boxShadow: outlined
                            ? "0 0 0 2px var(--color-highlight)"
                            : "none",
                    },
                }}
                {...props}
            >
                {children}
            </div>
        );
    },
);

export default View;
