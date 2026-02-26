import type {CommunityType} from "../lib/types";

export function createCommunity({
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
    imageUrl
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
        imageUrl
    }
}
