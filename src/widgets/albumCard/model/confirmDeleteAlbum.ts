import type { AxiosResponse } from "axios";

type DeleteFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Удаляет альбом после подтверждения в модальном окне.
 *
 * @param albumUUID - UUID удаляемого альбома.
 * @param deleteFn - Функция запроса на удаление альбома.
 */
export async function confirmDeleteAlbum(albumUUID: string, deleteFn: DeleteFn) {
    await deleteFn(albumUUID);
}
