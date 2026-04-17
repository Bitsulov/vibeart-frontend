import type {CommentType} from "../lib/types";

/**
 * Фабричная функция для создания объекта комментария со значениями по умолчанию.
 *
 * @param comment - Объект `CommentType` с данными комментария.
 * @returns Нормализованный объект комментария.
 */
export function createComment({
    id = 0,
    text = "",
    author,
    createdAt = new Date().toISOString()
}: CommentType) {
    return {
        id,
        text,
        author,
        createdAt
    }
}
