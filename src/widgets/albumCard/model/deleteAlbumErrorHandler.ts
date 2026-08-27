import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";

/**
 * Показывает уведомление об ошибке удаления альбома в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка запроса на удаление альбома.
 * @param dispatch - Функция записи данных в Redux.
 */
export function deleteAlbumErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 403:
            dispatch(showToast({ message: "api.forbiddenError", type: "error" }));
            break;
        case 404:
            dispatch(showToast({ message: "api.albumNotFound", type: "error" }));
            break;
        case 500:
            dispatch(showToast({ message: "api.serverError", type: "error" }));
            break;
        default:
            dispatch(showToast({ message: "api.unknownError", type: "error" }));
    }
}
