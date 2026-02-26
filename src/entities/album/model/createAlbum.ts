import type {AlbumType} from "../lib/types";

export function createAlbum({
    id = 0,
    ULID,
    name = "",
    description = "",
    postCount = 0,
    imageUrl,
    createdAt = new Date().toISOString()
}: AlbumType) {
    return {
        id,
        ULID,
        name,
        description,
        postCount,
        imageUrl,
        createdAt
    }
}
