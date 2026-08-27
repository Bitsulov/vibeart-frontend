import { describe, it, expect, vi } from "vitest";
import { subscribeClickHandler } from "./subscribeClickHandler";

describe("subscribeClickHandler - переключает подписку оптимистично и отправляет запрос", () => {
    it("Подписывается: переключает isSubscribed, увеличивает счетчик и вызывает toggleSubscription с UUID", async () => {
        const setSubscribersCount = vi.fn();
        const setIsSubscribed = vi.fn();
        const toggleSubscription = vi.fn().mockResolvedValue({ data: "ok" });

        await subscribeClickHandler(
            setSubscribersCount,
            false,
            setIsSubscribed,
            "test-uuid",
            toggleSubscription
        );

        expect(setIsSubscribed).toHaveBeenCalledWith(true);
        const updater = setSubscribersCount.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(6);
        expect(toggleSubscription).toHaveBeenCalledWith("test-uuid");
    });

    it("Отписывается: переключает isSubscribed, уменьшает счетчик и вызывает toggleSubscription с UUID", async () => {
        const setSubscribersCount = vi.fn();
        const setIsSubscribed = vi.fn();
        const toggleSubscription = vi.fn().mockResolvedValue({ data: "ok" });

        await subscribeClickHandler(
            setSubscribersCount,
            true,
            setIsSubscribed,
            "test-uuid",
            toggleSubscription
        );

        expect(setIsSubscribed).toHaveBeenCalledWith(false);
        const updater = setSubscribersCount.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(4);
        expect(toggleSubscription).toHaveBeenCalledWith("test-uuid");
    });
});
