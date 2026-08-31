import type { UserResponse, UserType } from "entities/user";

/**
 * Описывает один комментарий, оставленный пользователем
 * к публикации на сайте.
 */
export interface CommentType {
    /** UUID комментария, присвоенный сервером. */
    UUID: string;
    /** Текстовое содержимое комментария. */
    text: string;
    /** Дата и время публикации комментария в формате ISO 8601. */
    createdAt: string;
    /** Полный профиль автора комментария. */
    author: UserType;
}

/** Комментарий, возвращаемый сервером. */
export interface CommentResponse {
    uuid: string;
    text: string;
    createdAt: string;
    author: UserResponse;
}

/** Данные для создания комментария. */
export interface CreateCommentRequest {
    postUuid: string;
    text: string;
}

/** Данные для изменения текста комментария. */
export interface UpdateCommentRequest {
    text: string;
}
