import type {PostType} from "../lib/types";

/**
 * Фабричная функция для создания объекта поста со значениями по умолчанию.
 *
 * @param post - Объект `PostType` с данными поста.
 * @returns Нормализованный объект поста.
 */
export function createPost({
    id = 0,
    ULID,
    name = "",
    description = "",
    author,
    likes = 0,
    comments = 0,
    reports = 0,
    tagsList = [],
    commentList = [],
    checkStatus = "unchecked",
    AIStatus = "good",
    imageUrl,
    createdAt = new Date().toISOString()
}: PostType) {
    return {
        id,
        ULID,
        name,
        description,
        author,
        likes,
        comments,
        reports,
        tagsList,
        commentList,
        checkStatus,
        AIStatus,
        imageUrl,
        createdAt,
    }
}
