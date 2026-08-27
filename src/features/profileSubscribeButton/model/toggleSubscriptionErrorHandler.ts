import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import type { Dispatch, SetStateAction } from "react";

/**
 * Откатывает оптимистичное переключение подписки на пользователя и показывает уведомление об ошибке.
 *
 * @param error - Ошибка запроса на переключение подписки.
 * @param dispatch - Функция записи данных в Redux.
 * @param isSubscribed - Состояние подписки на момент ошибки (уже переключённое оптимистично).
 * @param setIsSubscribed - Сеттер состояния подписки.
 */
export function toggleSubscriptionErrorHandler(
    error: AxiosError<AppError>,
    dispatch: ReduxDispatch,
    isSubscribed: boolean,
    setIsSubscribed: Dispatch<SetStateAction<boolean>>
) {
    setIsSubscribed(!isSubscribed);
    switch (error.response?.data.statusCode) {
        case 404:
            dispatch(showToast({ message: "api.thisUserNotFound", type: "error" }));
            break;
        case 500:
            dispatch(showToast({ message: "api.serverError", type: "error" }));
            break;
        default:
            dispatch(showToast({ message: "api.unknownError", type: "error" }));
    }
}
