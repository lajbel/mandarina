import { MandarinaPlugin, Action } from "./types";

export function addChapter(this: MandarinaPlugin, name: string, actions: () => Action[]) {
    this.data.chapters.set(name, actions());
}