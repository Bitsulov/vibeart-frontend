import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Показывает уведомление об ошибке создания или обновления сообщества в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка запроса на создание или обновление сообщества.
 * @param dispatch - Функция записи данных в Redux.
 */
export function communityRequestErrorHandler(
    error: AxiosError<AppError>,
    dispatch: Dispatch
) {
    switch (error.response?.data.statusCode) {
        case 400:
            dispatch(
                showToast({
                    message: "api.invalidData",
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
        case 404:
            dispatch(
                showToast({
                    message: "api.userNotFound",
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
