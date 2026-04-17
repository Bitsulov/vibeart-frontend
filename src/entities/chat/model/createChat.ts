import type {ChatType} from "../lib/types";

/**
 * Фабричная функция для создания объекта чата со значениями по умолчанию.
 *
 * @param chat - Объект `ChatType` с данными чата.
 * @returns Нормализованный объект чата.
 */
export function createChat({
    id = 0,
    ULID,
    companion,
    lastMessage,
    createdAt = new Date().toISOString(),
    imageUrl,
}: ChatType) {
    return {
        id,
        ULID,
        companion,
        lastMessage,
        createdAt,
        imageUrl,
    }
}
