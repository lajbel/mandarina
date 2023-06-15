import mandarina from "mandarinavn";

// We create the Mandarina game context,
// There's the init game options
const m = mandarina({
    width: 960,
    height: 540,
    canvas: document.querySelector("#myGame") as HTMLCanvasElement,
    textbox: {
        sprite: "dsimui_textbox",
        textFont: "sans-serif",
        textSize: 24,
        textOffset: [ 3, 3 ],
    },
});

// Load images (assets)
m.loadImage("nerune", "assets/nerune.png");
m.loadImage("ruby", "assets/ruby.png");
m.loadImage("dsimui_textbox", "assets/textbox.png");

// We define characters
m.character("t", "Deffy", {
    expressions: {
        normal: "nerune",
    },
});

m.chapter("start", () => [
    // Show a background
    m.bg(m.k.rgb(255, 255, 255)).fadeIn(),
    // Show our character.
    m.show("t", "normal"),
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
