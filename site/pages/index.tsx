import { css, Global } from "@emotion/react";
import { cssVars } from "lib/ui";
import Markdown from "components/Markdown";
import Nav from "components/Nav";
import Text from "components/Text";
import View from "components/View";

export default function Home() {
    return (
        <main className="flex h-screen w-screen flex-col items-center px-2 py-2 lg:px-28 bg-[#fcc358]">
            <Global
                styles={css`
                    ${cssVars}
                `}
            ></Global>
            <div
                className="flex flex-row w-full h-full p-2 rounded-lg"
                css={{
                    backgroundColor: "var(--color-bg1)",
                }}
            >
                <div className="inline-flex w-1/2 h-auto flex-col p-2 mt-2">
                    <Text size="huge" bold>
                        Mandarina
                    </Text>

                    <Text size="normal">
                        Mandarina is a visual novel engine for the web.
                    </Text>

                    <br></br>

                    <Text size="big" bold>
                        Get Started!
                    </Text>

                    <Markdown
                        rounded
                        stretchX
                        src={`
\`\`\`js
import mandarina from "mandarinavn";

// Init options
const m = mandarina({
    textbox: {
        textFont: "comic-sans",
        textSize: 24,
    },
});

// Define characters
m.character("d", "Dude");
m.character("b", "Bro");

// Create the start chapter
m.chapter("start", () => [
    // Show a background
    m.bg(new m.k.Color(255, 255, 255)).fadeIn(),
    // Show our character.
    m.show("t", "normal"),
    // Say something.
    m.say("t", "Hi human, object, or whatever you are!"),
    m.say("t", "Welcome to this Mandarina test!"),
    m.say("t", "This engine are in development, so it's not ready yet."),

    // Jump to another chapter
    m.jump("ch1"),
]);

// Start novel
m.start();
\`\`\`
		`}
                    />
                </div>

                <div className="inline-flex w-full h-auto items-end flex-col p-2 mt-2">
                    <Nav
                        links={{
                            Home: "/",
                            Documentation: "/doc",
                            Example: "/example/index.html",
                        }}
                    ></Nav>
                </div>
            </div>
        </main>
    );
}
