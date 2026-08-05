import type Swiper from "swiper";
import React from "react";
import { reachEndSwiperHandler } from "./checkReachEndHandler";

/**
 * Обновляет состояния начала и конца слайдера при смене слайда
 * и запускает загрузку следующей страницы альбомов при приближении к концу списка.
 *
 * @param swiper - Текущий экземпляр Swiper.
 * @param setIsBeginning - Сеттер признака нахождения на первом слайде.
 * @param setIsEnd - Сеттер признака нахождения на последнем слайде.
 * @param albumsCount - Количество уже загруженных альбомов.
 * @param onReachEnd - Функция загрузки следующей страницы альбомов.
 */
export function slideChangeHandler(
    swiper: Swiper,
    setIsBeginning: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEnd: React.Dispatch<React.SetStateAction<boolean>>,
    albumsCount: number,
    onReachEnd: () => void
) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    reachEndSwiperHandler(swiper, albumsCount, onReachEnd);
}
