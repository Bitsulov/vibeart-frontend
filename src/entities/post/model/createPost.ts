import type { PostType } from "../lib/types";

/**
 * Фабричная функция для создания нормализованного объекта публикации.
 *
 * Устанавливает значения по умолчанию: `0` для счётчиков, пустые массивы
 * для списков тегов и комментариев, `"unchecked"` для статуса модерации,
 * `"good"` для статуса анализа искусственным интеллектом.
 *
 * @param post - Данные публикации, соответствующие типу `PostType`.
 * @returns Нормализованный объект публикации.
 *
 * @example
 * const post = createPost({ UUID: "01ARZ...", imageUrl: "/img.jpg",
 *   author: profileUserMock });
 * post.checkStatus // "unchecked"
 * post.likes       // 0
 */
export function createPost({
    UUID,
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
    createdAt = new Date().toISOString(),
    isLiked = false,
    isReported = false
}: PostType) {
    return {
        UUID,
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
        isLiked,
        isReported
    };
}
