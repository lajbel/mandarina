# Mandarina: A web visual novel engine

Mandarina is an engine based in kaboom.js, made for make visual novels.

## Example code
```js
import mandarina from "mandarinavn";

// Some init options
const m = mandarina({
	textbox: {
        textFont: "comic-sans",
        textSize: 24,
    }
});

// We define characters
m.character("d", "Dude");
m.character("b", "Bro");

// We create the start chapter
m.chapter("start", () => [
	m.say("d", "Hello bro"),
	m.say("b", "Hi dude"),
]);

// We go to the Mandarina scene through kaboom.js
m.k.go("mandarina_novel");
```
Full [`example`](example/)
