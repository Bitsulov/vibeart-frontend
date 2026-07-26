import type { AxiosResponse } from "axios";

type ReportFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Отправляет жалобу на пост — однократное действие, повторная отправка игнорируется.
 *
 * @param isReported - Признак того, что жалоба уже была отправлена.
 * @param postUUID - UUID публикации, на которую подаётся жалоба.
 * @param reportFn - Функция запроса на отправку жалобы.
 */
export async function reportClickHandler(
    isReported: boolean,
    postUUID: string,
    reportFn: ReportFn
) {
    if (!isReported) {
        await reportFn(postUUID);
    }
}
