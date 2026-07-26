import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Показывает уведомление об ошибке создания или обновления публикации в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка запроса на создание или обновление публикации.
 * @param dispatch - Функция записи данных в Redux.
 */
export function postRequestErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
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
