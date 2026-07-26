import React from "react";
import type { AxiosResponse } from "axios";

type ToggleLikeFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Оптимистично переключает лайк и изменяет счётчик, затем отправляет запрос на сервер.
 *
 * @param setLikes - Сеттер количества лайков.
 * @param isLiked - Текущее состояние лайка.
 * @param setIsLiked - Сеттер состояния лайка.
 * @param UUID - UUID публикации.
 * @param toggleLike - Функция запроса на переключение лайка.
 */
export async function likeClickHandler(
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    isLiked: boolean,
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>,
    UUID: string,
    toggleLike: ToggleLikeFn
) {
    setIsLiked(!isLiked);
    setLikes(likes => (isLiked ? likes - 1 : likes + 1));
    await toggleLike(UUID);
}
