import type { CommentType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта комментария.
 *
 * Устанавливает значения по умолчанию: пустую строку
 * для `text`, текущую дату для `createdAt`.
 *
 * @param comment - Данные комментария, соответствующие типу `CommentType`.
 * @returns Нормализованный объект комментария.
 *
 * @example
 * const comment = createComment({ UUID: "01ARZ...", author: profileUserMock,
 *   text: "Отличная работа!" });
 * comment.text // "Отличная работа!"
 */
export function createComment({
    UUID,
    text = "",
    author,
    createdAt = new Date().toISOString()
}: CommentType) {
    return {
        UUID,
        text,
        author,
        createdAt
    };
}
