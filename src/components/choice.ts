import type * as KA from "kaboom";
import type { Action } from "../types";
import { insertActions } from "../game";

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
            });
        },
    };
}
