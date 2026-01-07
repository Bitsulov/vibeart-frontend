import type { TagType } from "./types";

export function createTag({ id = Date.now(), name }: TagType) {
    return { id, name };
}
