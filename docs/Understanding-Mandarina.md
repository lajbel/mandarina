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

## A chapter
The sections of your visual novel normally are defined by chapters, like the start chapter, the second chapter, etc. We use this system for define the parts of our novel.

```js
const m = mandarina();

m.chapter("start", () => [
    // Now, there's what will happen in the chapter
]);
```

