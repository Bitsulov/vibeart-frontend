import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/**
 * Показывает уведомление об ошибке обновления данных пользователя в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка запроса на обновление данных пользователя.
 * @param dispatch - Функция записи данных в Redux.
 */
export function updateUserErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 404:
            dispatch(
                showToast({
                    message: "api.principalUserNotFound",
                    type: "error"
                })
            );
            break;
        case 403:
            dispatch(
                showToast({
                    message: "api.forbiddenError",
                    type: "error"
                })
            );
            break;
        case 409:
            dispatch(
                showToast({
                    message: "api.conflictUsernameError",
                    type: "error"
                })
            );
            break;
        case 500:
            dispatch(
                showToast({
                    message: "api.serverError",
                    type: "error"
                })
            );
            break;
        default:
            dispatch(
                showToast({
                    message: "api.unknownError",
                    type: "error"
                })
            );
    }
}
