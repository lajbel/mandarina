import type * as KA from "kaboom";
import type { Action } from "types";
import { getGameData, insertActions } from "game";

export interface ChoiceComp extends KA.Comp {
    actions: (v: string) => Action[];
}

export function choiceComponent(
    value: any,
    actions: (v: string) => Action[],
    setter?: (value: any) => void,
): ChoiceComp {
    return {
        id: "mandarina_choice",
        require: [ "area" ],
        actions: actions,
        add(this: KA.GameObj) {
            this.onClick(() => {
                insertActions(this.actions());
                this.parent?.destroy();
                setter?.(value);
            });
        },
    };
}
