import { describe, it, expect, vi } from "vitest";
import { likeClickHandler } from "./likeClickHandler";

describe("likeClickHandler - переключает лайк оптимистично и отправляет запрос", () => {
    it("Ставит лайк: переключает isLiked, увеличивает счетчик и вызывает toggleLike с UUID", async () => {
        const setLikes = vi.fn();
        const setIsLiked = vi.fn();
        const toggleLike = vi.fn().mockResolvedValue({ data: "ok" });

        await likeClickHandler(setLikes, false, setIsLiked, "test-uuid", toggleLike);

        expect(setIsLiked).toHaveBeenCalledWith(true);
        const updater = setLikes.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(6);
        expect(toggleLike).toHaveBeenCalledWith("test-uuid");
    });

    it("Убирает лайк: переключает isLiked, уменьшает счетчик и вызывает toggleLike с UUID", async () => {
        const setLikes = vi.fn();
        const setIsLiked = vi.fn();
        const toggleLike = vi.fn().mockResolvedValue({ data: "ok" });

        await likeClickHandler(setLikes, true, setIsLiked, "test-uuid", toggleLike);

        expect(setIsLiked).toHaveBeenCalledWith(false);
        const updater = setLikes.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(4);
        expect(toggleLike).toHaveBeenCalledWith("test-uuid");
    });
});
