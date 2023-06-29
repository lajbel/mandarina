import * as React from "react";
import { css, Global } from "@emotion/react";
import { cssVars } from "lib/ui";

const Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <main
            css={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.5rem",
                backgroundColor: "#fcc358",
                "@media (min-width: 1080px)": {
                    paddingLeft: "7rem",
                    paddingRight: "7rem",
                },
            }}
        >
            <Global
                styles={css`
                    ${cssVars}
                `}
            />
            {children}
        </main>
    );
};

export default Page;
