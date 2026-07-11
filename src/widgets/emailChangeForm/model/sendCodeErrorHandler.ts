import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Обрабатывает ошибку повторной отправки кода подтверждения:
 * показывает уведомление с описанием ошибки в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка axios с телом ответа {@link AppError}.
 * @param dispatch - Функция записи данных в Redux.
 */
export function sendCodeErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 404:
            dispatch(
                showToast({
                    message: "api.userNotFound",
                    type: "error"
                })
            );
            break;
        case 400:
            dispatch(
                showToast({
                    message: "api.earlyCodeRequest",
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
