import mandarina from "mandarinavn";

// We create the Mandarina game context,
// There's the init game options
const m = mandarina({
    width: 960,
    height: 540,
    textbox: {
        sprite: "dsimui_textbox",
        offset: [ 0, 4 ],
        textFont: "sans-serif",
        textSize: 24,
        textOffset: [ 3, 3 ],
    },
    logMax: 20,
});

// Load images (assets)
m.loadImage("nerune", "./assets/nerune.png");
m.loadImage("ruby", "./assets/ruby.png");
m.loadImage("dsimui_textbox", "./assets/textbox.png");

m.loadImage("code1", "./assets/characters/code/code1.png", {
    scale: 0.4,
});

// We define our characters.
m.character("t", "Deffy", {
    // The name color.
    color: "#873e84",
    // The character's images for expressions.
    expressions: {
        normal: "nerune",
    },
});

m.character("code", "Code", {
    color: "#ff0000",
    expressions: {
        "1": "code1",
    },
});

m.chapter("start", () => [
    // Show a background.
    m.showBackground(m.k.rgb(255, 255, 255)),
    // Show our character.
    m.show("t", "normal").appearFrom("right"),
    // Say something.
    m.say("t", "Hi human, object, or whatever you are!"),
    m.say("t", "Welcome to this Mandarina test!"),
    m.say("t", "This engine are in development, so it's not ready yet."),
    m.say("t", "Are you ready to see some cool stuff?"),
    // Jump to another chapter.
    m.jump("ch1"),
]);

m.chapter("ch1", () => [
    m.say("t", "Now, will see a simple explanation of how Mandarina works."),
    m.show("code", "1", "trueleft").appearFrom("left"),
    m.say(
        "t",
        "There's the mandarina() function, with it, you start the novel context.",
    ),
]);

m.start();
