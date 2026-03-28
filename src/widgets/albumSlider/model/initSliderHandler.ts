import type Swiper from "swiper";
import React, {type RefObject} from "react";

export function initSliderHandler(
    swiper: Swiper,
    swiperRef: RefObject<Swiper | null>,
    setIsBeginning: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEnd: React.Dispatch<React.SetStateAction<boolean>>
) {
    swiperRef.current = swiper;
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
}
