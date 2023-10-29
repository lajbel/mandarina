---
layout: default
title: Basics of Mandarina
nav_order: 2
---

# Basics

In this section, we will understand how Mandarina works from zero.

## Mandarina function

We start using the `mandarina()` function, this function takes care of create our base game, and can receive some options.
Also, `mandarina()` returns all the other mandarina functions, so you must save it in a variable.

```js
import mandarina from "mandarinavn";

const m = mandarina({
    width: 430,
    height: 200,
});
```

Now, we can start using mandarina.

## Loading assets

We can load assets in our game, like images, sounds, etc. It's necessary to load assets before starting the game, so we can use the `loadImage()` and `loadAudio()` functions.

Example game file tree

```bash
game.js
assets/
    juizy.png
    music.mp3
```

game.js:

```js
const m = mandarina();

m.loadImage("juizy", "assets/juizy.png");
m.loadSound("music", "assets/music.mp3");
```

## Chapters

The sections of your visual novel normally are defined by chapters, like the start chapter, the second chapter, etc. We use this system to define the parts of our novel.

```js
const m = mandarina();

m.chapter("start", () => [
    // Now, there's what will happen in the chapter
]);
```

We can define as many chapters as we want, but all games start in the `start` chapter.

```js
m.chapter("start", () => [
    // ...
]);

m.chapter("chapter1", () => [
    // ...
]);
```

## Actions

An action is what happens inside a chapter, specifically, what happens in a click. For example, a dialogue, the change of a background, etc. This is an example of an action:

```js
m.chapter("start", () => [
    m.say("Hello world!"), // Say action writes something in the textbox.
]);
```

Now, when you start the game, you will see the text "Hello world!" in the textbox.

See more about actions in the [Actions](/Actions.md) section.

## Characters

Characters are the people that appear in your visual novel. We should define our characters before our chapters. We will use the `character()` function, as parameter, it needs an `id`, a `display name` and we can define some extra options.

```js
m.character("j", "Juizy", {
    color: "#ff0000",
    image: "juizy.png",
});
```

Here, **Juizy** is our character represented by the `j` letter, now we can reference this character in actions, for example, in say.

```js
m.chapter("start", () => [m.say("j", "Hello world!")]);
```

## Variables

Variables are the values that we can use in our game. We can define variables in the our novel, and we can use them in actions.

```js
m.setVar("girlName", "Juizy");

m.chapter("start", () => [
    m.say("j", "Hello world!"),
    m.say("j", "My name is [girlName]"),
]);
```

## Choices

Choices are the options that the player can choose. We can define choices in a chapter, and we can define as many choices as we want.

```js
m.chapter("start", () => [
    m.say("j", "Hello world!"),
    m.say("j", "What's your favorite programming language?"),

    m.choice({
        Javascript: {
            actions: () => [m.say("j", "Nice! I like Javascript too!")],
        },
        Python: {
            actions: () => [m.say("j", "Nice! I like Python too!")],
        },
    }),
]);
```
