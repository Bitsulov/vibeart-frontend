import type {UserType} from "../lib/types";

/**
 * Фабричная функция для создания объекта пользователя.
 * Добавляет символ `@` к имени пользователя.
 *
 * @param user - Объект `UserType` с данными пользователя.
 * @returns Нормализованный объект пользователя.
 */
export function createUser({
    id = 0,
    ULID,
    name = "",
    email,
    username,
    description = "",
    worksCount = 0,
    subscribersCount = 0,
    subscribesCount = 0,
    albumList = [],
    createdAt,
    trustStatus,
    isAuthenticated,
    isBlocked,
    onlineStatus,
    role = "user",
    avatarUrl = ""
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
