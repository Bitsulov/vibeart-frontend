import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { AlbumResponse } from "entities/album";

/**
 * Переходит на страницу созданного или обновлённого альбома и показывает уведомление об успехе.
 *
 * @param data - Ответ сервера с данными альбома.
 * @param navigate - Функция навигации React Router.
 * @param dispatch - Функция записи данных в Redux.
 * @param isCreatedAlbum - Признак того, что альбом создан (иначе — обновлён), определяет текст уведомления.
 */
export function albumRequestSuccessHandler(
    data: AxiosResponse<AlbumResponse>,
    navigate: NavigateFunction,
    dispatch: Dispatch,
    isCreatedAlbum: boolean
) {
    navigate(`/album/${data.data.uuid}`, { replace: true });
    dispatch(
        showToast({
            message: isCreatedAlbum
                ? "api.albumCreatedSuccess"
                : "api.albumUpdatedSuccess",
            type: "success"
        })
    );
}
