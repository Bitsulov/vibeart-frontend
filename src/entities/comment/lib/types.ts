import type { UserType } from "entities/user";

/**
 * Описывает один комментарий, оставленный пользователем
 * к публикации на сайте.
 */
export interface CommentType {
    /** Текстовое содержимое комментария. */
    text: string;
    /** Дата и время публикации комментария в формате ISO 8601. */
    createdAt: string;
    /** Полный профиль автора комментария. */
    author: UserType;
}
