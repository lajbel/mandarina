import mandarina from "mandarinavn";

// We create the Mandarina game context,
// there's the init game options
const m = mandarina({});

// We define characters
m.character("dude", "Dude");

m.chapter("start", () => [
	m.say("dude", "Hey!"),
	m.say("dude", "Welcome to this Mandarina test!"),
	m.say("dude", "Now, this is going to crash. :D"),
]);

// We go to the Mandarina scene
m.k.go("mandarina");
