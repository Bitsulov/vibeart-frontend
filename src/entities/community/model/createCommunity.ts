import type {CommunityType} from "../lib/types";

export function createCommunity({
    id = 0,
    ULID,
    owner,
    username,
    title = "",
    description = "",
    posts = 0,
    subscribers = 0,
    subscribes = 0,
    createdAt = new Date().toISOString(),
    imageUrl = "",
    albumsList = []
}: CommunityType) {
    return {
        id,
        ULID,
        owner,
        username,
        title,
        description,
        posts,
        subscribers,
        subscribes,
        createdAt,
        imageUrl,
        albumsList
    }
}
