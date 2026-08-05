import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Показывает уведомление об ошибке создания альбома в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка запроса на создание альбома.
 * @param dispatch - Функция записи данных в Redux.
 */
export function albumRequestErrorHandler(
    error: AxiosError<AppError>,
    dispatch: Dispatch
) {
    switch (error.response?.data.statusCode) {
        case 403:
            dispatch(
                showToast({
                    message: "api.forbiddenError",
                    type: "error"
                })
            );
            break;
        case 404:
            dispatch(
                showToast({
                    message: "api.principalUserNotFound",
                    type: "error"
                })
            );
            break;
        case 413:
            dispatch(
                showToast({
                    message: "api.fileTooLarge",
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
