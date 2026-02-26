import type {PostType} from "../lib/types";

export function createPost({
    id = 0,
    ULID,
    name = "",
    description = "",
    likes = 0,
    comments = 0,
    reports = 0,
    tagsList = [],
    checkStatus = "unchecked",
    AIStatus = "good",
    imageUrl,
    createdAt = new Date().toISOString(),
}: PostType) {
    return {
        id,
        ULID,
        name,
        description,
        likes,
        comments,
        reports,
        tagsList,
        checkStatus,
        AIStatus,
        imageUrl,
        createdAt,
    }
}
