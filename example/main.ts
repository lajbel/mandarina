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

// Load sprites with Kaboom (temporary).
m.loadSprite("testguy", "sprites/testguy.png");
m.loadSprite("dsimui_textbox", "sprites/textbox.png");

// We define characters
m.character("t", "Deffy", {
    expressions: {
        normal: "testguy",
    },
});

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

m.chapter("ch1", () => [
    m.say("t", "This is a simple explaination of how Mandarina works."),
    m.say("t", "First, we need to define a character."),
    m.say("t", "We can do that with the character function."),
    m.say("t", "The first arg is the char name and the second is the name"),
]);

// We go to the Mandarina scene
// TODO: Implement onLoad for assets
m.k.onLoad(() => {
    m.k.go("mandarina");
});
