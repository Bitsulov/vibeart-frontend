import type {TagType} from "../lib/types";

export function createTag({
    id = 0,
    title = '',
    createdAt = new Date().toISOString()
}: TagType) {
    return {
        id,
        title,
        createdAt
    }
}
