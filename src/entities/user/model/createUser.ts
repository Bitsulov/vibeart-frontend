import type {UserType} from "../lib/types";

export function createUser({
    id,
    ULID,
    name,
    email,
    username,
    description,
    worksCount,
    subscribersCount,
    subscribesCount,
    albumList,
    createdAt,
    trustStatus,
    isAuthenticated,
    isBlocked,
    onlineStatus,
    role,
    avatarUrl
}: UserType) {
    return {
        id,
        ULID,
        name,
        email,
        username: `@${username}`,
        description,
        worksCount,
        subscribersCount,
        subscribesCount,
        albumList,
        createdAt,
        trustStatus,
        isAuthenticated,
        isBlocked,
        onlineStatus,
        role,
        avatarUrl
    };
}
