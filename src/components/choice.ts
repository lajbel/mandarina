import type * as KA from "kaboom";
import type { Action } from "../types.ts";
import { insertActions } from "../game.ts";

export interface ChoiceComp extends KA.Comp {
    actions: () => Action[];
}

export function choice(actions: () => Action[]): ChoiceComp {
    return {
        id: "mandarina_choice",
        require: [ "area" ],
        actions: actions,
        add(this: KA.GameObj) {
            this.onClick(() => {
                insertActions(this.actions());
                this.parent?.destroy();
            });
        },
    };
}
