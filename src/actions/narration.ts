import type { MandarinaPlugin } from "../types";
import { createAction } from "../chapters";

export function say(this: MandarinaPlugin, ...args: string[]) {
    // If there's two args, that means there's a character
    // if not, only write the first one as the text.
    return createAction({
        id: "say",
        exec: async () => {
            if(!this.textbox) throw new Error("Textbox not found.");
            
            if(args.length > 1) {
                const ch = this.data.characters.get(args[0]);
                if(!ch) throw new Error(`Character with ID "${args[0]}" does not exist.`);

                this.textbox.changeName(args[0]);
                return (await this.textbox.write(args[1]));
            }
            else {
                this.textbox.changeName("");
                return (await this.textbox.write(args[0]));
            }
        },
    });
}
