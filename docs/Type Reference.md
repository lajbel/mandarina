---
layout: default
title: Type Reference
nav-order: 4
---
# Mandarina Type Reference 
 This is an automatically generated documentation of the types used in Mandarina. See it in [GitHub](https://github.com/lajbel/mandarina/wiki/Types)

# Methods

# Types
## `LayerPlugin`: 

## `VisualAlign`: left | right | center | truecenter | trueleft | trueright

## `TextboxComp`: 

## `Textbox`: undefined

## `TextboxOpt`
### `sprite?`: string

### `pos?`: undefined

### `offset?`: undefined

### `width?`: number

### `height?`: number

### `textAlign?`: left | center | right

### `textSize?`: number

### `textFont?`: string

### `textColor?`: string

### `textOffset?`: undefined

## `ChoiceOpt`
### `sprite?`: string

### `pos?`: undefined

### `offset?`: undefined

### `width?`: number

### `height?`: number

### `textAlign?`: left | center | right

### `textSize?`: number

### `textFont?`: string

### `textColor?`: string

### `textOffset?`: undefined

## `mandarina`: MandarinaPlugin

## `UnionToIntersection`: undefined

## `KaboomPlugins`: LayerPlugin

## `GameData`
### `k`: undefined

### `m`: MandarinaPlugin

### `opt`: MandarinaOpt

### `chapters`: Map

### `characters`: Map

### `currentChapter`: string

### `currentAction`: number

### `processingAction`: boolean

### `playingAudios`: Map

### `loadedImages`: Map

### `variables`: Record

### `isProcessingAction`: boolean

## `Inputs`: pc | gamepad | touch

## `GameActions`: next | screenshoot

## `GameInputs`
## `MandarinaPlugin`
### `k`: undefined

### `_textbox?`: Textbox

### `loadImage`: undefined

### `loadAudio`: undefined

### `getMandarinaContext`: MandarinaPlugin

### `character`: undefined

### `chapter`: undefined

### `start`: undefined

### `setVar`: undefined

### `getVar`: T

### `jump`: NormalAction

### `say`: NormalAction
### `say`: NormalAction

### `show`: VisualAction

### `input`: NormalAction

### `hide`: NormalAction

### `showBackground`: VisualAction
### `showBackground`: VisualAction
### `showBackground`: VisualAction

### `playAudio`: AudioAction

### `showTextbox`: NormalAction

### `hideTextbox`: NormalAction

### `choice`: NormalAction

## `MandarinaOpt`
### `textbox?`: TextboxOpt

### `choice?`: ChoiceOpt

### `writeVel?`: number

### `writeCommaWait?`: number

### `language?`: english | spanish

## `LoadImageOpt`
### `scale?`: number

## `SpriteData`: undefined

## `ActionType`: normal | visual | audio

## `BaseAction`: 

## `NormalAction`: 

## `VisualAction`: 

## `AudioAction`: 

## `Action`: undefined

## `CharacterData`
### `id`: string

### `opt?`: CharacterDataOpt

## `CharacterDataOpt`
### `expressions?`: Record

### `color?`: string

### `voice?`: string
