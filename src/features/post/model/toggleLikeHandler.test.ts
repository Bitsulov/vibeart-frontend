import {describe, expect, it, vi} from "vitest";
import {toggleLikeHandler} from "./toggleLikeHandler";

describe("toggleLikeHandler - переключение лайка", () => {
    it("Добавляет лайк: увеличивает счётчик и устанавливает isLiked в true", () => {
        const setLikes = vi.fn();
        const setIsLiked = vi.fn();

        toggleLikeHandler(setLikes, false, setIsLiked);

        const likesUpdater = setLikes.mock.calls[0][0];
        expect(likesUpdater(5)).toBe(6);
        expect(setIsLiked).toHaveBeenCalledWith(true);
    });

    it("Убирает лайк: уменьшает счётчик и устанавливает isLiked в false", () => {
        const setLikes = vi.fn();
        const setIsLiked = vi.fn();

        toggleLikeHandler(setLikes, true, setIsLiked);

        const likesUpdater = setLikes.mock.calls[0][0];
        expect(likesUpdater(5)).toBe(4);
        expect(setIsLiked).toHaveBeenCalledWith(false);
    });
});
