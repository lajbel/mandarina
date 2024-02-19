import mandarina from "../dist/types";

// We create the Mandarina game context,
// There's the init game options
const m = mandarina({
    width: 960,
    height: 540,
    letterbox: true,
    stretch: true,
    textbox: {
        sprite: "textbox",
        offset: [ 0, 4 ],
        textFont: "sans-serif",
        textSize: 24,
        textOffset: [ 3, 3 ],
    },
    choice: {
        sprite: "choice",
    },
});

// Load images (assets)
m.loadImage("nerune", "assets/nerune.png");
m.loadImage("ruby", "assets/ruby.png");
m.loadImage("textbox", "assets/textbox.png");
m.loadImage("choice", "assets/choice.png");

m.loadImage("code1", "assets/characters/code/code1.png", {
    scale: 0.4,
});

// Some variables
const setName = m.setVar("name", "PlayerUnknown");

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
    m.say("t", "Welcome to this example! I wan't to know you better!"),

    // Jump to another chapter.
    m.jump("presentation"),
]);

m.chapter("presentation", () => [
    m.say("t", "What's your name?"),
    m.input("Write your name: ", setName),

    m.say("t", "Oh, cool name [name]"),
    m.say("t", "And which pronoun do you use?"),

    // Display a set of choices.
    m.choice(
        {
            // The choice's text.
            "he/him": {
                // The choice's value.
                value: 0,
                // The choice's actions to add to the story.
                actions: () => [ m.say("t", "Okay, he") ],
            },
            "she/her": {
                value: 1,
                actions: () => [ m.say("t", "Okay, she") ],
            },
            "they/them": {
                value: 2,
                actions: () => [ m.say("t", "Okay, they") ],
            },
        },
        // The variable to store the choice's value.
        m.setPronoun,
    ),

    m.jump("usercheck"),
]);

m.chapter("usercheck", () => [
    m.say("t", "So, your pronoun is [they], and your name is [name]"),
    m.say("t", "Is that correct?"),

    m.choice({
        yes: {
            actions: () => [ m.say("t", "Okay, let's go!") ],
        },
        no: {
            actions: () => [ m.say("Oh, will return"), m.jump("presentation") ],
        },
    }),
]);

m.start();
