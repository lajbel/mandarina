import type { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";

export function say(this: MandarinaPlugin, ...args: string[]) {
    // If there's two args, that means there's a character
    // if not, only write the first one as the text.
    return createAction({
        id: "say",
        type: "normal",
        exec: async () => {
            if(!this.textbox) throw new Error("Textbox not found.");

            if(args.length > 1) {
                const ch = this.data.characters.get(args[0]);
                if(!ch) throw new Error(`Character with the ${args[0]} id's not found.`);

                this.textbox.changeName(ch.name);
                await this.textbox.write(args[1]);
            }
            else {
                this.textbox.changeName("");
                await this.textbox.write(args[0]);
            }
        },
        skip: () => {
            this.textbox?.skip();
        },
    });
}
