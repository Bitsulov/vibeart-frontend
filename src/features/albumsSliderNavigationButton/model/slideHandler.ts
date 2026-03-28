import type Swiper from "swiper";
import type {RefObject} from "react";

export function slideHandler(swiper: RefObject<Swiper | null>, direction: "left" | "right") {
    direction === "left"
        ? swiper.current?.slidePrev(500)
        : swiper.current?.slideNext(500);
}
