import type * as KA from "kaboom";
import type { UnionToIntersection } from "../types";
import { getGameData } from "../game";
import { onAddObj } from "../util";

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
        : VisualComp,
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
            const { k } = getGameData();
            visualObj = this.get(opt.visualObj, { recursive: true })[0];

            if (optHasEffect(opt, "appearFrom")) {
                onAddObj(visualObj, () => {
                    this.fade(opt);
                });
            }

            if (optHasEffect(opt, "appearFrom")) {
                onAddObj(visualObj, () => {
                    this.appearFrom(opt);
                });
            }
        },

        fade(opt) {
            const { k } = getGameData();
            visualObj.use(k.opacity(0));
            visualObj.use(k.fadeIn(opt.fadeDuration ?? 1));
        },

        appearFrom(opt) {
            const { k } = getGameData();
            k.tween(visualObj.pos.x, opt.appearTo, 1, (v) => {
                visualObj.pos.x = v;
            });
        },
    };
}
