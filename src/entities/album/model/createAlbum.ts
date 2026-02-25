import type {AlbumType} from "../lib/types";

export function createAlbum({
    id = 0,
    ULID,
    name = "",
    description = "",
    likes = 0,
    comments = 0,
    reports = 0,
    checkStatus = "unchecked",
    AIStatus = "good",
    imageUrl,
    createdAt = new Date().toISOString()
}: AlbumType) {
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
        createdAt
    }
}
