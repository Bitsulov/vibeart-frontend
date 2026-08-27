import type { AxiosResponse } from "axios";

type DeleteFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Удаляет сообщество после подтверждения в модальном окне.
 *
 * @param communityUUID - UUID удаляемого сообщества.
 * @param deleteFn - Функция запроса на удаление сообщества.
 */
export async function confirmDeleteCommunity(communityUUID: string, deleteFn: DeleteFn) {
    await deleteFn(communityUUID);
}
