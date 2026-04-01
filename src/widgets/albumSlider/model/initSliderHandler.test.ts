import {describe, expect, it, vi} from "vitest";
import {initSliderHandler} from "./initSliderHandler";
import type {RefObject} from "react";
import type Swiper from "swiper";

describe("initSliderHandler - инициализация слайдера", () => {
    const makeMocks = () => ({
        swiperRef: {current: null} as RefObject<Swiper | null>,
        setIsBeginning: vi.fn(),
        setIsEnd: vi.fn(),
    });

    it("Записывает экземпляр swiper в swiperRef.current", () => {
        const {swiperRef, setIsBeginning, setIsEnd} = makeMocks();
        const swiper = {isBeginning: true, isEnd: false} as Swiper;

        initSliderHandler(swiper, swiperRef, setIsBeginning, setIsEnd);

        expect(swiperRef.current).toBe(swiper);
    });

    it("Вызывает setIsBeginning со значением swiper.isBeginning", () => {
        const {swiperRef, setIsBeginning, setIsEnd} = makeMocks();
        const swiper = {isBeginning: true, isEnd: false} as Swiper;

        initSliderHandler(swiper, swiperRef, setIsBeginning, setIsEnd);

        expect(setIsBeginning).toHaveBeenCalledWith(true);
    });

    it("Вызывает setIsEnd со значением swiper.isEnd", () => {
        const {swiperRef, setIsBeginning, setIsEnd} = makeMocks();
        const swiper = {isBeginning: false, isEnd: true} as Swiper;

        initSliderHandler(swiper, swiperRef, setIsBeginning, setIsEnd);

        expect(setIsEnd).toHaveBeenCalledWith(true);
    });
});