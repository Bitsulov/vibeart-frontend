import type Swiper from "swiper";
import type {RefObject} from "react";

/**
 * Управляет навигацией слайдера Swiper.
 *
 * @param swiper - Ref на экземпляр Swiper.
 * @param direction - Направление прокрутки: `"left"` или `"right"`.
 */
export function slideHandler(swiper: RefObject<Swiper | null>, direction: "left" | "right") {
    if (direction === "left") {
        swiper.current?.slidePrev(500);
    } else {
        swiper.current?.slideNext(500);
    }
}
