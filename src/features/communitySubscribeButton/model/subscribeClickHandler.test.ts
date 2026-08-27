import { describe, it, expect, vi } from "vitest";
import { subscribeClickHandler } from "./subscribeClickHandler";

describe("subscribeClickHandler - переключает подписку оптимистично и отправляет запрос", () => {
    it("Подписывается: переключает isSubscribed и вызывает toggleSubscription с UUID", async () => {
        const setIsSubscribed = vi.fn();
        const toggleSubscription = vi.fn().mockResolvedValue({ data: "ok" });

        await subscribeClickHandler(
            false,
            setIsSubscribed,
            "test-uuid",
            toggleSubscription
        );

        expect(setIsSubscribed).toHaveBeenCalledWith(true);
        expect(toggleSubscription).toHaveBeenCalledWith("test-uuid");
    });

    it("Отписывается: переключает isSubscribed и вызывает toggleSubscription с UUID", async () => {
        const setIsSubscribed = vi.fn();
        const toggleSubscription = vi.fn().mockResolvedValue({ data: "ok" });

        await subscribeClickHandler(
            true,
            setIsSubscribed,
            "test-uuid",
            toggleSubscription
        );

        expect(setIsSubscribed).toHaveBeenCalledWith(false);
        expect(toggleSubscription).toHaveBeenCalledWith("test-uuid");
    });
});
