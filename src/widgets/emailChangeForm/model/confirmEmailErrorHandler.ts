import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch } from "@reduxjs/toolkit";

/**
 * <h5>Функция, выполняемая после получения ошибки запроса подтверждения изменения адреса электронной почты.</h1>
 *
 * <h6>Обрабатываемые ошибки:</h6>
 * <ul>
 *     <li>**400** - Введённый код неверный</li>
 *     <li>**404** - Текущий пользователь не найден</li>
 *     <li>**403** - Нет доступа для выполнения действия</li>
 *     <li>**410** - Время действия кода подтверждения истекло</li>
 *     <li>**500** - Ошибка сервера или отсутствие соединения</li>
 * </ul>
 */
export function confirmEmailErrorHandler(
    error: AxiosError<AppError>,
    dispatch: Dispatch
) {
    switch (error.response?.data.statusCode) {
        case 404:
            dispatch(
                showToast({
                    message: "api.userNotFound",
                    type: "error"
                })
            );
            break;
        case 410:
            dispatch(
                showToast({
                    message: "api.codeExpired",
                    type: "error"
                })
            );
            break;
        case 400:
            dispatch(
                showToast({
                    message: "api.invalidCode",
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
