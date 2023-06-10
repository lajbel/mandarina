import type { CharacterDataOpt } from "./types";
import { data } from "./main";

export function addCharacter(
    id: string,
    name: string,
    opt: CharacterDataOpt,
): void {
    if (data.characters.has(id))
        throw new Error(`Character with id "${id}" already exists.`);

    data.characters.set(id, {
        id,
        name,
        opt,
    });
}
