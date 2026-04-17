import type Swiper from "swiper";
import React from "react";

/** Обновляет состояния начала и конца слайдера при смене слайда. */
export function slideChangeHandler(
    swiper: Swiper,
    setIsBeginning: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEnd: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
}
