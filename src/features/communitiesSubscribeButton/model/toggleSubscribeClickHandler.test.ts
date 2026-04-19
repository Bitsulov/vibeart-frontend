import {describe, it, expect, vi} from "vitest";
import {toggleSubscribeClickHandler} from "./toggleSubscribeClickHandler";

describe("toggleSubscribeClickHandler - Переключение подписки", () => {
    it("Вызывает setIsSubscribed", () => {
        const setIsSubscribed = vi.fn();
        toggleSubscribeClickHandler(setIsSubscribed);
        expect(setIsSubscribed).toHaveBeenCalledTimes(1);
    });

    it("Updater переключает false на true", () => {
        const setIsSubscribed = vi.fn();
        toggleSubscribeClickHandler(setIsSubscribed);
        const updater = setIsSubscribed.mock.calls[0][0];
        expect(updater(false)).toBe(true);
    });

    it("Updater переключает true на false", () => {
        const setIsSubscribed = vi.fn();
        toggleSubscribeClickHandler(setIsSubscribed);
        const updater = setIsSubscribed.mock.calls[0][0];
        expect(updater(true)).toBe(false);
    });
});
