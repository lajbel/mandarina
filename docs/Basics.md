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

m.chapter("car1", () => [
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
m.chapter("start", () => [
    m.say("j", "Hello world!"),
]);
```

See more about actions in the [Actions](/Actions.md) section.