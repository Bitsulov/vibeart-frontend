import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";

/**
 * Показывает уведомление об ошибке создания комментария в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка запроса на создание комментария.
 * @param dispatch - Функция записи данных в Redux.
 */
export function addCommentErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 400:
            dispatch(showToast({ message: "api.invalidData", type: "error" }));
            break;
        case 404:
            dispatch(showToast({ message: "api.postNotFound", type: "error" }));
            break;
        case 500:
            dispatch(showToast({ message: "api.serverError", type: "error" }));
            break;
        default:
            dispatch(showToast({ message: "api.unknownError", type: "error" }));
    }
}
