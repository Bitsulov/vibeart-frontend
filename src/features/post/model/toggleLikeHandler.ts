import React from "react";

/**
 * Переключает состояние лайка поста и обновляет счётчик.
 *
 * @param setLikes - Сеттер количества лайков.
 * @param isLiked - Текущее состояние лайка.
 * @param setIsLiked - Сеттер состояния лайка.
 */
export function toggleLikeHandler(
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    isLiked: boolean,
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
) {
    if(isLiked) {
        setLikes(state => state - 1);
        setIsLiked(false);
    } else {
        setLikes(state => state + 1);
        setIsLiked(true);
    }
}
