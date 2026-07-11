import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";

/**
 * <h5>Функция, выполняемая после получения ошибки запроса изменения адреса электронной почты.</h1>
 *
 * <h6>Обрабатываемые ошибки:</h6>
 * <ul>
 *     <li>**400** - Запрос отправлен слишком рано</li>
 *     <li>**404** - Текущий пользователь не найден</li>
 *     <li>**403** - Нет доступа для выполнения действия</li>
 *     <li>**409** - Введённый адрес электронной почты уже занят</li>
 *     <li>**500** - Ошибка сервера или отсутствие соединения</li>
 * </ul>
 */
export function changeEmailErrorHandler(error: AxiosError<AppError>, dispatch: Dispatch) {
    switch (error.response?.data.statusCode) {
        case 400:
            dispatch(
                showToast({
                    message: "api.earlyCodeRequest",
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
                    message: "api.conflictUserEmailError",
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
