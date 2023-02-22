# Mandarina: A visual novel engine (**WIP**)

Mandarina is an engine based in kaboom.js, specially made to make visual novels.

## Example code
```js
import mandarina from "mandarinavn";

const m = mandarina();

// We define characters
m.character("d", "Dude");
m.character("b", "Bro");

// We create our start chapter
m.chapter("start", () => [
	// ...
]);

// We go to the Mandarina scene through kaboom.js
m.k.go("mandarina_novel");
```