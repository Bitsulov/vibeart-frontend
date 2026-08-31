import { api } from "shared/api/instance";
import type { AxiosResponse } from "axios";
import type { Page, Pageable } from "shared/lib/types";
import type {
    CommentResponse,
    CreateCommentRequest,
    UpdateCommentRequest
} from "../lib/types";

/** Эндпоинты запросов комментариев */
const urls = {
    baseUrlComment: "/comment",
    comments: function () {
        return `${this.baseUrlComment}`;
    },
    addComment: function () {
        return `${this.baseUrlComment}`;
    },
    updateComment: function (id: string) {
        return `${this.baseUrlComment}/${id}`;
    },
    deleteComment: function (id: string) {
        return `${this.baseUrlComment}/${id}`;
    }
};

/**
 * Получает постраничный список комментариев публикации.
 *
 * @param postUUID - UUID публикации.
 * @param pageable - Параметры постраничного запроса.
 * @returns Промис со страницей комментариев {@link CommentResponse}.
 */
export async function getCommentsByPost(
    postUUID: string,
    pageable?: Pageable
): Promise<AxiosResponse<Page<CommentResponse>>> {
    console.log(`Calling get comments by post UUID: ${postUUID}`);
    return api.get(urls.comments(), { params: { postUuid: postUUID, ...pageable } });
}

/**
 * Создаёт комментарий к публикации от имени текущего пользователя.
 *
 * @param data - объект {@link CreateCommentRequest} с UUID публикации и текстом комментария.
 * @returns Промис с данными созданного комментария {@link CommentResponse}.
 */
export async function addComment(
    data: CreateCommentRequest
): Promise<AxiosResponse<CommentResponse>> {
    console.log("Calling create comment");
    return api.post(urls.addComment(), data);
}

/**
 * Изменяет текст комментария по его UUID.
 *
 * @param params.id - UUID комментария.
 * @param params.data - объект {@link UpdateCommentRequest} с новым текстом.
 * @returns Промис с данными изменённого комментария {@link CommentResponse}.
 */
export async function updateCommentById({
    id,
    data
}: {
    id: string;
    data: UpdateCommentRequest;
}): Promise<AxiosResponse<CommentResponse>> {
    console.log(`Calling update comment by id: ${id}`);
    return api.put(urls.updateComment(id), data);
}

/**
 * Удаляет комментарий по его UUID.
 *
 * @param id - UUID комментария.
 * @returns Строка с описанием результата выполнения запроса.
 */
export async function deleteCommentById(id: string): Promise<AxiosResponse<string>> {
    console.log(`Calling delete comment by id: ${id}`);
    return api.delete(urls.deleteComment(id));
}
