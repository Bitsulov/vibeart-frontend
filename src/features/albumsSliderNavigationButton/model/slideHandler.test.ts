import {describe, expect, it, vi} from "vitest";
import {slideHandler} from "./slideHandler";
import type {RefObject} from "react";
import type Swiper from "swiper";

describe("slideHandler - клик обработчик albumsSliderNavigationButton", () => {
    it("Вызов функции direction = left", () => {
        const swiperRef = {
            current: {
                slidePrev: vi.fn(),
                slideNext: vi.fn(),
            }
        } as unknown as RefObject<Swiper>;

        slideHandler(swiperRef, "left");

        expect(swiperRef.current.slidePrev).toHaveBeenCalledWith(500);
    });
    it("Вызов функции direction = right", () => {
        const swiperRef = {
            current: {
                slidePrev: vi.fn(),
                slideNext: vi.fn(),
            }
        } as unknown as RefObject<Swiper>;

        slideHandler(swiperRef, "right");

        expect(swiperRef.current.slideNext).toHaveBeenCalledWith(500);
    });
});
