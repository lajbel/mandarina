# 1.0.0 (in development)

**Changes respect to KaNovel**

## Visual

-   added `showBackground()` for add image/color backgrounds.
-   added `start()` for automatically load the novel scene.
-   added `playAudio(channel, audio)` for play audios in different channels
-   added `VisualAction` with the methods:
    -   `fadeIn()` for fade when it appears.
    -   `appearFrom(side)` for appear from a side (left or right)
-   added `AudioAction` with the methods:
    -   `withVolume(volume: number)`
-   **(break)** remove `showBackground()` and `showBackgroundColor()` in favour of only `showBackground()`.
-   **(break)** remove `playMusic()` and `playSound()` in favour of `playAudio()`.

## Technical and misc

-   using stable version of `kaboom`
