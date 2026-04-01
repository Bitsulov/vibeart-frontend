import {describe, expect, it, vi} from "vitest";
import {slideChangeHandler} from "./slideChangeHandler";
import type Swiper from "swiper";

describe("slideChangeHandler - обработчик смены слайда", () => {
    it("Вызывает setIsBeginning со значением swiper.isBeginning", () => {
        const setIsBeginning = vi.fn();
        const setIsEnd = vi.fn();
        const swiper = {isBeginning: true, isEnd: false} as Swiper;

        slideChangeHandler(swiper, setIsBeginning, setIsEnd);

        expect(setIsBeginning).toHaveBeenCalledWith(true);
    });

    it("Вызывает setIsEnd со значением swiper.isEnd", () => {
        const setIsBeginning = vi.fn();
        const setIsEnd = vi.fn();
        const swiper = {isBeginning: false, isEnd: true} as Swiper;

        slideChangeHandler(swiper, setIsBeginning, setIsEnd);

        expect(setIsEnd).toHaveBeenCalledWith(true);
    });

    it("Обновляет оба состояния при переходе в середину", () => {
        const setIsBeginning = vi.fn();
        const setIsEnd = vi.fn();
        const swiper = {isBeginning: false, isEnd: false} as Swiper;

        slideChangeHandler(swiper, setIsBeginning, setIsEnd);

        expect(setIsBeginning).toHaveBeenCalledWith(false);
        expect(setIsEnd).toHaveBeenCalledWith(false);
    });
});