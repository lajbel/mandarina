# Actions

As said, an action is what happens inside a chapter, specifically, what happens in a click. For example, a dialogue, the change of a background, etc. There's a list of all actions:

## say()

The say action is the most important action, it's the one that shows a dialogue. It's used like this:

```js
m.say("characterId", "text");
```

It also can be used without a character, like this:

```js
m.say("text");
```

## input()

The input action is used to ask the player for input. It's used like this:

```js
m.input("characterId", "text");
```

## show()

The show action is used to show a character. It's used like this:

```js
m.show("characterId");
```

## hide()

The hide action is used to hide a character. It's used like this:

```js
m.hide("characterId");
```

## showBackground()

The showBackground action is used to show a background. It's used like this:

```js
m.showBackground("image");
```

## playAudio()

The playAudio action is used to play an audio. It's used like this:

```js
m.playAudio("audio");
```

## showTextbox()

The showTextbox action is used to show the textbox. It's used like this:

```js
m.showTextbox();
```

## hideTextbox()

The hideTextbox action is used to hide the textbox. It's used like this:

```js
m.hideTextbox();
```
