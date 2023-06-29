import Nav from "components/Nav";
import GameView from "components/GameVIew";

export default function Home() {
    return (
        <div
            className="flex flex-row w-full h-full p-2 rounded-lg"
            css={{
                backgroundColor: "var(--color-bg1)",
            }}
        >
            <GameView
                width={"100%"}
                code={`
                const m = mandarina({
                    width: 960,
                    height: 540,
                    canvas: document.querySelector("#myGame"),
                    textbox: {
                        sprite: "dsimui_textbox",
                        textFont: "sans-serif",
                        textSize: 24,
                        textOffset: [ 3, 3 ],
                    },
                });
                
                // Load images (assets)
                m.loadImage("nerune", "example/assets/nerune.png");
                m.loadImage("ruby", "example/assets/ruby.png");
                m.loadImage("dsimui_textbox", "example/assets/textbox.png");
                
                // We define characters
                m.character("t", "Deffy", {
                    color: "#873e84",
                    expressions: {
                        normal: "nerune",
                    },
                });
                
                m.chapter("start", () => [
                    // Show a background
                    m.bg(m.k.rgb(255, 255, 255)).fadeIn(),
                    // A text
                    m.say("..."),
                    // Show our character.
                    m.show("t", "normal").fadeIn(),
                    // Say something.
                    m.say("t", "Hi human, object, or whatever you are!"),
                    m.say("t", "Welcome to this Mandarina test!"),
                    m.say("t", "This engine are in development, so it's not ready yet."),
                
                    // Jump to another chapter
                    m.jump("ch1"),
                ]);
                
                m.chapter("ch1", () => [
                    m.say("t", "This is a simple explaination of how Mandarina works."),
                ]);
                
                m.start();             
                `}
            />
        </div>
    );
}
