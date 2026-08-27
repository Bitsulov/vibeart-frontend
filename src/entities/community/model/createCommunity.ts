import type { CommunityType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта сообщества со значениями по умолчанию.
 *
 * @param community - Данные сообщества, соответствующие типу `CommunityType`.
 * @returns Нормализованный объект сообщества.
 *
 * @example
 * const community = createCommunity({ UUID: "01ARZ...", owner: principalUserMock,
 *   username: "art-club" });
 * community.isSubscribed // false
 * community.posts // 0
 */
export function createCommunity({
    UUID,
    owner,
    username,
    title = "",
    description = "",
    albumsList = [],
    admins = [],
    posts = 0,
    subscribers = 0,
    subscribes = 0,
    createdAt = new Date().toISOString(),
    imageUrl = "",
    isSubscribed = false,
    isBlocked = false,
    trustStatus = "TRUST"
}: CommunityType) {
    return {
        UUID,
        owner,
        username,
        title,
        description,
        albumsList,
        admins,
        posts,
        subscribers,
        subscribes,
        createdAt,
        imageUrl,
        isSubscribed,
        isBlocked,
        trustStatus
    };
}
