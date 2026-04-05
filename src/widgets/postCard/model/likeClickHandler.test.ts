import {describe, it, expect, vi} from "vitest";
import {likeClickHandler} from "./likeClickHandler";

describe("likeClickHandler - переключает лайк и обновляет счетчик", () => {
    it("Ставит лайк: переключает isLiked и увеличивает счетчик", () => {
        const setLikes = vi.fn();
        const setIsLiked = vi.fn();

        likeClickHandler(setLikes, false, setIsLiked);

        expect(setIsLiked).toHaveBeenCalledWith(true);
        const updater = setLikes.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(6);
    });

    it("Убирает лайк: переключает isLiked и уменьшает счетчик", () => {
        const setLikes = vi.fn();
        const setIsLiked = vi.fn();

        likeClickHandler(setLikes, true, setIsLiked);

        expect(setIsLiked).toHaveBeenCalledWith(false);
        const updater = setLikes.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(4);
    });
});
