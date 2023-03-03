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
                if(!ch) throw new Error(`Character with the ${args[0]} id's not found.`);
                
                var charobj = this.k.get("character_" + args[0], { recursive: true })[0];
                var posy = charobj.pos.x;
                this.k.tween(posy, posy - 20, 0.1, (x=>charobj.pos.x=x), this.k.easings.easeInQuad)
                .then(() => 
                    this.k.tween(posy - 20, posy + 20, 0.1, (x=>charobj.pos.x=x), this.k.easings.linear)
                    .then(() => 
                        this.k.tween(posy + 20, posy, 0.1, (x=>charobj.pos.x=x), this.k.easings.easeOutQuad)
                    )
                );

                this.textbox.changeName(ch.name);
                await this.textbox.write(args[1], ch);
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
