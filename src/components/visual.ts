import type * as KA from "kaboom";
import type { UnionToIntersection } from "types";
import { getGameData } from "game";
import { onAddObj, getAlignment, getSpriteDimensions } from "../util";

export type VisualAlign =
    | "left"
    | "right"
    | "center"
    | "truecenter"
    | "trueleft"
    | "trueright";

export type VisualEffect = "fade" | "appearFrom";

export type VisuaLEffectsOpt = {
    fade: FadeEffectOpt;
    appearFrom: AppearFromEffectOpt;
};

export type FadeEffectOpt = {
    /** Fade in or out. */
    fade: "in" | "out";
    /** Duration of the fade effect. */
    fadeDuration?: number;
};

export type AppearFromEffectOpt = {
    /** Side to appear from. */
    side: "left" | "right";
    /** Duration of the effect. */
    appearDuration?: number;
    /** Appear to. */
    appearTo: number;
};

export type OptByEffects<T extends VisualEffect[]> = UnionToIntersection<
    VisuaLEffectsOpt[T[number]]
>;

export interface VisualComp extends KA.Comp {
    visualObj: string;
    fade(opt: FadeEffectOpt): void;
    appearFrom(opt: AppearFromEffectOpt): void;
    alignTo(sprite: string, align: VisualAlign): void;
}

export interface VisualCompOpt<TEffect extends VisualEffect[] = any> {
    /** Tag of the visual children attached to this game object. */
    visualObj: string;
    /** Appear effect. */
    startEffects?: TEffect;
    /** Global duration of all effects (will be replaced if there's a specific effect duration) */
    duration?: number;
}

export function visual<T extends VisualEffect[] | undefined = undefined>(
    opt: T extends VisualEffect[]
        ? VisualCompOpt<T> & OptByEffects<T>
        : VisualCompOpt,
): VisualComp {
    let visualObj: KA.GameObj;

    function optHasEffect<T2 extends VisualEffect>(
        opt: VisualCompOpt<any>,
        effect: T2,
    ): opt is VisualCompOpt & OptByEffects<[T2]> {
        return opt.startEffects.includes(effect);
    }

    return {
        id: "mandarina_visual",
        visualObj: opt.visualObj,

        add(this: KA.GameObj) {
            visualObj = this.get(opt.visualObj, { recursive: true })[0];

            if (optHasEffect(opt, "fade")) {
                this.fade(opt);
            }
            if (optHasEffect(opt, "appearFrom")) {
                this.appearFrom(opt);
            }
        },

        fade(opt) {
            const { k } = getGameData();
            visualObj.use(k.opacity(0));
            visualObj.use(k.fadeIn(opt.fadeDuration ?? 1));
        },

        appearFrom(this: KA.GameObj, opt) {
            const { k } = getGameData();

            this.pos.x = opt.side === "left" ? 0 : k.width();

            k.tween(
                this.pos.x,
                opt.appearTo,
                1,
                (v) => {
                    this.pos.x = v;
                },
                k.easings.linear,
            );
        },

        alignTo(this: KA.GameObj, sprite, align) {
            const { loadedImages } = getGameData();
            const scale = loadedImages.get(sprite)?.scale ?? 1;
            const spriteSize = getSpriteDimensions(sprite).scale(scale);
            const alignPos = getAlignment(align, spriteSize.x, spriteSize.y);

            this.pos = alignPos;
        },
    };
}
