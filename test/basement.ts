import mandarina from "mandarinavn";

// We create the Mandarina game context,
// there's the init game options
const m = mandarina({});

// Load sprites with Kaboom (temporary).
m.loadSprite("testguy", "sprites/testguy.png");

// We define characters
m.character("t", "Test Guy!", {
	expressions: {
		"normal": "testguy",
	}
});

m.chapter("start", () => [
	// Show our character.
	m.show("t", "normal"),
	// Say something.
	m.say("t", "Hi human, object, or whatever you are!"),
	m.say("t", "Welcome to this Mandarina test!"),
	m.say("t", "This engine are in development, so it's not ready yet."),
]);

// We go to the Mandarina scene
m.k.go("mandarina");
