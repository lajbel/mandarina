# Mandarina: A web visual novel engine

Mandarina is an engine based in kaboom.js, made for make visual novels.

## Example code

```js
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
```

Full [`example`](example/)
