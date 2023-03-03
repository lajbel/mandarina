import mandarina from "mandarinavn";

// We create the Mandarina game context,
// there's the init game options
const m = mandarina({
	textbox: {
		waitCharacters: [
			{
				character: ",",
				time: 0.25
			},
			{
				character: ".",
				time: 0.5
			},
			{
				character: "Mandarina"
			}
		]
	}
});

// Load sprites with Kaboom (temporary).
m.k.loadSprite("testguy", "sprites/testguy.png");
m.k.loadSprite("mspa", "sprites/mspa.png", {
	sliceX: 4,
  sliceY: 2,
});

// We define characters
m.character("t", "Test Guy!", {
	sprite: "testguy",
	height: m.k.height() - 300,
	expressions: {
		"normal": {}
	}
});
m.character("mspa", "MSPA Reader", {
	sprite: "mspa",
	height: m.k.height() - 300,
	expressions: {
		"happyidle": {
			frame: 0
		},
		"concernedidle": {
			frame: 1
		},
		"shocked": {
			frame: 2
		},
		"mad": {
			frame: 3
		},
		"smug": {
			frame: 4
		},
		"what": {
			frame: 5
		},
		"huh": {
			frame: 6
		},
	}
});

m.chapter("start", () => [
	// Show our character.
	m.show("t", "normal", "left"),
	// Say something.
	m.say("t", "Hi human, robot, cyborg, or whoever you are!"),
	m.show("mspa", "happyidle", "right"),
	m.say("mspa", "Welcome to this Mandarina test!"),
	m.say("t", "The engine is in development, so it's not ready yet."),
	m.show("mspa", "shocked"),
	m.say("mspa", "WHAT??"),
	m.show("mspa", "concernedidle"),
	m.say("mspa", "It's not??"),
	m.say("t", "No... it is not."),
	m.say("mspa", "OK... I'm leaving, then..."),
	m.hide("mspa"),
	m.say("t", "They are now gone..."),
]);

// We go to the Mandarina scene
m.k.go("mandarina");
