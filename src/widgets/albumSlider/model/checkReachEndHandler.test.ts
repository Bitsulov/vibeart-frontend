import { describe, expect, it, vi } from "vitest";
import { reachEndSwiperHandler } from "./checkReachEndHandler";
import type Swiper from "swiper";

function createSwiper(activeIndex: number, slidesPerView: number | "auto") {
    return {
        activeIndex,
        params: { slidesPerView }
    } as Swiper;
}

describe("reachEndSwiperHandler - определяет момент загрузки следующей страницы альбомов", () => {
    it("Не вызывает onReachEnd, пока последний альбом ещё не виден", () => {
        const onReachEnd = vi.fn();

        reachEndSwiperHandler(createSwiper(1, 3), 5, onReachEnd);

        expect(onReachEnd).not.toHaveBeenCalled();
    });

    it("Вызывает onReachEnd, когда последний альбом становится виден", () => {
        const onReachEnd = vi.fn();

        reachEndSwiperHandler(createSwiper(3, 3), 5, onReachEnd);

        expect(onReachEnd).toHaveBeenCalled();
    });

    it("Считает slidesPerView равным 1, если задано значение 'auto'", () => {
        const onReachEnd = vi.fn();

        reachEndSwiperHandler(createSwiper(5, "auto"), 5, onReachEnd);

        expect(onReachEnd).toHaveBeenCalled();
    });
});
