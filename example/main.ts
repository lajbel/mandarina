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

// Some variables
m.setVar("name", "PlayerUnknown");

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
    m.show("t", "normal").fadeIn().appearFrom("left"),
    // Say something.
    m.say("t", "Hi, I'm Deffy!"),
    // TODO: Variables
    m.say("t", "What's your name?"),
    m.say("t", "Oh, cool name [name]"),
    m.say("t", "And what's your pronoun?"),
    m.choice({
        "he/him": () => [ m.say("t", "Hi!") ],
        "she/her": () => [ m.say("t", "Hi!") ],
        "they/them": () => [ m.say("t", "Hi!") ],
    }),
]);

m.start();
