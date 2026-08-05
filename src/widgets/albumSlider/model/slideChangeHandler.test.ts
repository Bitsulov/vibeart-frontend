import { describe, expect, it, vi } from "vitest";
import { slideChangeHandler } from "./slideChangeHandler";
import type Swiper from "swiper";

function createSwiper(isBeginning: boolean, isEnd: boolean, activeIndex = 0) {
    return {
        isBeginning,
        isEnd,
        activeIndex,
        params: { slidesPerView: 1 }
    } as Swiper;
}

describe("slideChangeHandler - обработчик смены слайда", () => {
    it("Вызывает setIsBeginning со значением swiper.isBeginning", () => {
        const setIsBeginning = vi.fn();
        const setIsEnd = vi.fn();

        slideChangeHandler(
            createSwiper(true, false),
            setIsBeginning,
            setIsEnd,
            0,
            vi.fn()
        );

        expect(setIsBeginning).toHaveBeenCalledWith(true);
    });

    it("Вызывает setIsEnd со значением swiper.isEnd", () => {
        const setIsBeginning = vi.fn();
        const setIsEnd = vi.fn();

        slideChangeHandler(
            createSwiper(false, true),
            setIsBeginning,
            setIsEnd,
            0,
            vi.fn()
        );

        expect(setIsEnd).toHaveBeenCalledWith(true);
    });

    it("Обновляет оба состояния при переходе в середину", () => {
        const setIsBeginning = vi.fn();
        const setIsEnd = vi.fn();

        slideChangeHandler(
            createSwiper(false, false),
            setIsBeginning,
            setIsEnd,
            0,
            vi.fn()
        );

        expect(setIsBeginning).toHaveBeenCalledWith(false);
        expect(setIsEnd).toHaveBeenCalledWith(false);
    });

    it("Вызывает onReachEnd при приближении к последнему альбому", () => {
        const onReachEnd = vi.fn();

        slideChangeHandler(
            createSwiper(false, false, 5),
            vi.fn(),
            vi.fn(),
            5,
            onReachEnd
        );

        expect(onReachEnd).toHaveBeenCalled();
    });

    it("Не вызывает onReachEnd, пока последний альбом ещё не виден", () => {
        const onReachEnd = vi.fn();

        slideChangeHandler(
            createSwiper(false, false, 1),
            vi.fn(),
            vi.fn(),
            5,
            onReachEnd
        );

        expect(onReachEnd).not.toHaveBeenCalled();
    });
});
