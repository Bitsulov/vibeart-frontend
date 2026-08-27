import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";
import type { CommunityResponse } from "entities/community";

/**
 * Переходит на страницу созданного или обновлённого сообщества и показывает уведомление об успехе.
 *
 * @param data - Ответ сервера с данными сообщества.
 * @param navigate - Функция навигации React Router.
 * @param dispatch - Функция записи данных в Redux.
 * @param isCreatedCommunity - Признак того, что сообщество создано (иначе — обновлено), определяет текст уведомления.
 */
export function communityRequestSuccessHandler(
    data: AxiosResponse<CommunityResponse>,
    navigate: NavigateFunction,
    dispatch: Dispatch,
    isCreatedCommunity: boolean
) {
    navigate(`/communities/${data.data.uuid}`, { replace: true });
    dispatch(
        showToast({
            message: isCreatedCommunity
                ? "api.communityCreatedSuccess"
                : "api.communityUpdatedSuccess",
            type: "success"
        })
    );
}
