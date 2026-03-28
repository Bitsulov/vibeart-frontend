import type Swiper from "swiper";
import React from "react";

export function slideChangeHandler(
    swiper: Swiper,
    setIsBeginning: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEnd: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
}
