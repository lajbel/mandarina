import type * as KA from "kaboom";
import type { UnionToIntersection } from "type-fest";
import { getGameData } from "../game";
import { onAddObj } from "../util";

export type VisualEffects = "fade" | "appearFrom";
export type VisuaLEffectsOpt = {
    fade: FadeEffectOpt;
    appearFrom: AppearFromEffectOpt;
};
export type VisualOpt<TEffect extends VisualEffects[] = any> = {
    /** Tag of the visual children attached to this game object. */
    visualObj: string;
    /** Appear effect. */
    startEffects: TEffect;
    /** Global duration of all effects (will be replaced if there's a specific effect duration) */
    duration: number;
};
export type FadeEffectOpt = {
    /** Duration of the fade effect. */
    fadeDuration?: number;
    /** Fade in or out. */
    fade: "in" | "out";
};
export type AppearFromEffectOpt = {
    /** Duration of the effect. */
    appearDuration?: number;
    /** Side to appear from. */
    side: "left" | "right";
};
export type OptByEffects<T extends VisualEffects[]> = UnionToIntersection<
    VisuaLEffectsOpt[T[number]]
>;

export function visual<T extends VisualEffects[] = any>(
    opt: VisualOpt<T> & OptByEffects<T>,
) {
    let visualObj: KA.GameObj<KA.PosComp>;

    function optHasEffect<T extends VisualEffects>(
        opt: VisualOpt<any>,
        effect: T,
    ): opt is VisualOpt & OptByEffects<[T]> {
        return opt.startEffects.includes(effect);
    }

    return {
        id: "mandarina_visual",
        visualObj: opt.visualObj,
        add() {
            const { k } = getGameData();
            visualObj = this.get(opt.visualObj, { recursive: true })[0];

            if (optHasEffect(opt, "fade")) {
                visualObj.use(k.opacity(0));
                visualObj.use(k.fadeIn(opt.fadeDuration || opt.duration));
            }

            if (optHasEffect(opt, "appearFrom")) {
                onAddObj(visualObj, () => {
                    k.tween(visualObj.pos.x, 1200, 1, (v) => {
                        visualObj.pos.x = v;
                    });
                });
            }
        },
    };
}
