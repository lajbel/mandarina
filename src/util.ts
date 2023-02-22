// conver arrays to vec2
import type { KaboomCtx, Anchor } from "kaboom";

export function array2Vec2(k: KaboomCtx, arr: number[]) {
    if (!arr || arr.length < 2) return null;

    return k.vec2(arr[0], arr[1]);
}

// Used to translate the selected texts align to the 
// anchor.

// left -> topleft
// right -> topright
// center -> topcenter

export function alignToAnchor(align: string): Anchor {
    return "top" + align as Anchor;
}