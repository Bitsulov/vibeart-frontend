import type Swiper from "swiper";
import type {RefObject} from "react";

export function slideHandler(swiper: RefObject<Swiper | null>, direction: "left" | "right") {
    if (direction === "left") {
        swiper.current?.slidePrev(500);
    } else {
        swiper.current?.slideNext(500);
    }
}
