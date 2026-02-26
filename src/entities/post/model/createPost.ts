import type {PostType} from "../lib/types";

export function createPost({
    id,
    ULID,
    name,
    description,
    likes,
    comments,
    reports,
    checkStatus,
    AIStatus,
    imageUrl,
    createdAt,
}: PostType) {
    return {
        id,
        ULID,
        name,
        description,
        likes,
        comments,
        reports,
        checkStatus,
        AIStatus,
        imageUrl,
        createdAt,
    }
}
