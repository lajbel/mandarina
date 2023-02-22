import { MandarinaPlugin, CharacterDataOpt } from "./types";

export function addCharacter(
    this: MandarinaPlugin,
    id: string,
    name: string,
    opt: CharacterDataOpt
): void {
    if (this.data.characters.has(id))
        throw new Error(`Character with id "${id}" already exists.`);

    this.data.characters.set(id, {
        id,
        name,
        opt,
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function showCharacter(_characterId: string) {
    // TODO
}
