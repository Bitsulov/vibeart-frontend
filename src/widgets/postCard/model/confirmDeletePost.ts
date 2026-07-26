import type { AxiosResponse } from "axios";

type DeleteFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Удаляет публикацию после подтверждения в модальном окне.
 *
 * @param postUUID - UUID удаляемой публикации.
 * @param deleteFn - Функция запроса на удаление публикации.
 */
export async function confirmDeletePost(postUUID: string, deleteFn: DeleteFn) {
    await deleteFn(postUUID);
}
