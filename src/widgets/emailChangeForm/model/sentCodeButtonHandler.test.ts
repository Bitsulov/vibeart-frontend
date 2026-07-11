import { describe, it, expect, vi } from "vitest";
import { sentCodeButtonHandler } from "./sentCodeButtonHandler";

const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));

describe("sentCodeButtonHandler - обрабатывает нажатие кнопки повторной отправки кода изменения email", () => {
    it("Блокирует кнопку сразу после нажатия", () => {
        const setIsAllowSentCode = vi.fn();
        const sendCode = vi.fn().mockResolvedValue({});

        sentCodeButtonHandler(setIsAllowSentCode, vi.fn(), "test@example.com", sendCode);

        expect(setIsAllowSentCode).toHaveBeenCalledWith(false);
    });

    it("Отправляет код на указанный email", () => {
        const sendCode = vi.fn().mockResolvedValue({});

        sentCodeButtonHandler(vi.fn(), vi.fn(), "test@example.com", sendCode);

        expect(sendCode).toHaveBeenCalledWith({ email: "test@example.com" });
    });

    it("Запускает обратный отсчёт при успешной отправке", async () => {
        const setIsAllowSentCode = vi.fn();
        const setTimer = vi.fn();
        const sendCode = vi.fn().mockResolvedValue({});

        sentCodeButtonHandler(setIsAllowSentCode, setTimer, "test@example.com", sendCode);
        await flushPromises();

        expect(setTimer).toHaveBeenCalledWith(120);
        expect(setIsAllowSentCode).toHaveBeenLastCalledWith(false);
    });

    it("Разблокирует кнопку при ошибке отправки", async () => {
        const setIsAllowSentCode = vi.fn();
        const sendCode = vi.fn().mockRejectedValue(new Error("network error"));

        sentCodeButtonHandler(setIsAllowSentCode, vi.fn(), "test@example.com", sendCode);
        await flushPromises();

        expect(setIsAllowSentCode).toHaveBeenLastCalledWith(true);
    });
});
