# ![Mandarina 🍊](mandarinalogo.png)

<div align="center">
Mandarina is a visual novel engine made for be simple. <br><br>

[![lajbel - mandarina](https://img.shields.io/static/v1?label=lajbel&message=mandarina&color=orange&logo=github)](https://github.com/lajbel/mandarina "Go to GitHub repo")
[![stars - mandarina](https://img.shields.io/github/stars/lajbel/mandarina?style=social)](https://github.com/lajbel/mandarina)
[![forks - mandarina](https://img.shields.io/github/forks/lajbel/mandarina?style=social)](https://github.com/lajbel/mandarina) <br>
[![GitHub tag](https://img.shields.io/github/tag/lajbel/mandarina?include_prereleases=&sort=semver&color=orange)](https://github.com/lajbel/mandarina/releases/)
[![issues - mandarina](https://img.shields.io/github/issues/lajbel/mandarina)](https://github.com/lajbel/mandarina/issues)

</div>

<div align="center">

[![View site - GH Pages](https://img.shields.io/badge/View_site-GH_Pages-2ea44f?style=for-the-badge)](https://lajbel.github.io/mandarina/)
[![view - Documentation](https://img.shields.io/badge/view-Documentation-blue?style=for-the-badge)](https://github.com/lajbel/mandarina/wiki "Go to project documentation")

</div>

## Features

-   📖 Simple verbal language for creating visual novels.
-   🧑‍💻 All in coding, no difficult visual editors.
-   🎨 Fully customizable.
-   👾 Easy to integrate minigames
-   💥 Based in kaboom.js

## An Example

Start coding/reading mandarina code is quite simple!

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
    m.say("t", "Hi, I'm Deffy!"),
    m.say("t", "What's your name?"),
    // Ask an input
    m.input("name"),

    // Jump to another chapter
    m.jump("ch1"),
]);

// Start novel
m.start();
```

![](https://i.imgur.com/kmwGiux.png)

## Installation

### NPM

The mandarina package is not already inside npmjs service, so you can install trough npm with

```
npm i github:lajbel/mandarina@master
```
