import type {UserType} from "../lib/types";

export function createUser({
    id,
    ULID,
    name,
    username,
    description,
    worksCount,
    subscribersCount,
    subscribesCount,
    albumList,
    createdAt,
    trustStatus,
    isBlocked,
    onlineStatus,
    role,
    avatarUrl
}: UserType) {
    return {
        id,
        ULID,
        name,
        username,
        description,
        worksCount,
        subscribersCount,
        subscribesCount,
        albumList,
        createdAt,
        trustStatus,
        isBlocked,
        onlineStatus,
        role,
        avatarUrl
    };
}
