import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import type { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import type { Dispatch, SetStateAction } from "react";

/**
 * Откатывает оптимистичное переключение лайка и показывает уведомление об ошибке.
 *
 * @param error - Ошибка запроса на переключение лайка.
 * @param dispatch - Функция записи данных в Redux.
 * @param isLiked - Состояние лайка на момент ошибки (уже переключённое оптимистично).
 * @param setIsLiked - Сеттер состояния лайка.
 * @param setLikes - Сеттер количества лайков.
 */
export function toggleLikeErrorHandler(
    error: AxiosError<AppError>,
    dispatch: ReduxDispatch,
    isLiked: boolean,
    setIsLiked: Dispatch<SetStateAction<boolean>>,
    setLikes: Dispatch<SetStateAction<number>>
) {
    setIsLiked(!isLiked);
    setLikes(likes => (isLiked ? likes - 1 : likes + 1));
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
