import type { ICommentsForm } from "../lib/types";
import type { CommentResponse, CreateCommentRequest } from "entities/comment";
import type { AxiosResponse } from "axios";

type AddCommentFn = (
    data: CreateCommentRequest
) => Promise<AxiosResponse<CommentResponse>>;

/**
 * Обрабатывает успешную отправку формы комментария и отправляет запрос на создание комментария.
 *
 * @param data - Данные формы с текстом комментария.
 * @param postUUID - UUID публикации, к которой добавляется комментарий.
 * @param addComment - Функция запроса на создание комментария.
 */
export async function submitValidHandler(
    data: ICommentsForm,
    postUUID: string,
    addComment: AddCommentFn
) {
    await addComment({ postUuid: postUUID, text: data.sendComment });
}
