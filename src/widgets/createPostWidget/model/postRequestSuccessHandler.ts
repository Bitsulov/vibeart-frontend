import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { PostResponse } from "entities/post";

/**
 * Переходит на страницу созданной или обновлённой публикации и показывает уведомление об успехе.
 *
 * @param data - Ответ сервера с данными публикации.
 * @param navigate - Функция навигации React Router.
 * @param dispatch - Функция записи данных в Redux.
 * @param isCreatedPost - Признак того, что публикация создана (иначе — обновлена), определяет текст уведомления.
 */
export function postRequestSuccessHandler(
    data: AxiosResponse<PostResponse>,
    navigate: NavigateFunction,
    dispatch: Dispatch,
    isCreatedPost: boolean
) {
    navigate(`/post/${data.data.uuid}`, { replace: true });
    if (isCreatedPost) {
        dispatch(
            showToast({
                message: "api.postCreatedSuccess",
                type: "success"
            })
        );
    } else {
        dispatch(
            showToast({
                message: "api.postUpdatedSuccess",
                type: "success"
            })
        );
    }
}
