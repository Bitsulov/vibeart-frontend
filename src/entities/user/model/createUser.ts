import type { UserType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта пользователя.
 *
 * Применяет следующие преобразования:
 * - Добавляет символ `@` к полю `username` (например, `"user"` → `"@user"`).
 * - Устанавливает значения по умолчанию для необязательных полей.
 *
 * @param user - Данные пользователя, соответствующие типу `UserType`.
 * @returns Нормализованный объект пользователя.
 *
 * @example
 * const user = createUser({ UUID: "01ARZ...", email: "a@b.com",
 *   username: "johndoe", createdAt: "2026-01-01T00:00:00.000Z",
 *   trustStatus: "TRUST", isAuthenticated: true, isBlocked: false,
 *   onlineStatus: "ONLINE" });
 * user.username // "@johndoe"
 */
export function createUser({
    UUID,
    title = "",
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
    role = "USER",
    avatarUrl = ""
}: UserType) {
    return {
        UUID,
        title,
        username: username ? `@${username}` : "",
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
