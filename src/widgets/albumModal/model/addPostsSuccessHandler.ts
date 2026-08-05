import type { Dispatch as ReduxDispatch } from "@reduxjs/toolkit";
import type { Dispatch, SetStateAction } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { showToast } from "features/toast";
import { closeButtonClickHandler } from "./closeButtonClickHandler";

/**
 * Обрабатывает успешное добавление публикаций в альбом: сбрасывает кэш
 * постов альбома, показывает уведомление об успехе и закрывает модальное окно.
 *
 * @param queryClient - Клиент TanStack Query.
 * @param albumUUID - UUID альбома, в который были добавлены публикации.
 * @param dispatch - Функция записи данных в Redux.
 * @param setIsDisappearring - Сеттер анимации закрытия модального окна.
 * @param transitionTime - Длительность анимации закрытия в миллисекундах.
 * @param setIsShowModal - Сеттер видимости модального окна.
 * @param setSelectedPosts - Сеттер списка выбранных публикаций.
 */
export function addPostsSuccessHandler(
    queryClient: QueryClient,
    albumUUID: string,
    dispatch: ReduxDispatch,
    setIsDisappearring: Dispatch<SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowModal: Dispatch<SetStateAction<boolean>>,
    setSelectedPosts: Dispatch<SetStateAction<string[]>>
) {
    queryClient.invalidateQueries({ queryKey: [`album posts ${albumUUID}`] });
    dispatch(showToast({ message: "api.postsAddedToAlbumSuccess", type: "success" }));
    closeButtonClickHandler(
        setIsDisappearring,
        transitionTime,
        setIsShowModal,
        setSelectedPosts
    );
}
