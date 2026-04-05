import type {CommentType} from "../lib/types";

export function createComment({
    id = 0,
    text = "",
    author,
    createdAt = new Date().toISOString()
}: CommentType) {
    return {
        id,
        text,
        author,
        createdAt
    }
}
