import { describe, it, expect, vi, afterEach } from "vitest";
import { codeSubmitValidHandler } from "./codeSubmitValidHandler";

describe("codeSubmitValidHandler - отправка кода подтверждения смены email", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("Показывает ошибку и устанавливает флаг при коде короче 6 символов", () => {
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const submitFn = vi.fn();

        codeSubmitValidHandler(
            { code: "123" },
            dispatch,
            setErrorCode,
            "test.email@email.com",
            submitFn
        );

        expect(dispatch).toHaveBeenCalled();
        expect(dispatch.mock.calls[0][0].payload.message).toBe("toast.wrongCodeLength");
        expect(setErrorCode).toHaveBeenCalledWith(true);
        expect(submitFn).not.toHaveBeenCalled();
    });

    it("Вызывает функцию отправки запроса на сервер при корректном 6-значном коде", () => {
        vi.useFakeTimers();
        const dispatch = vi.fn();
        const setErrorCode = vi.fn();
        const submitFn = vi.fn();

        codeSubmitValidHandler(
            { code: "123456" },
            dispatch,
            setErrorCode,
            "test.email@email.com",
            submitFn
        );

        expect(setErrorCode).not.toHaveBeenCalled();
        vi.runAllTimers();
        expect(submitFn).toHaveBeenCalled();
    });

    it("Не вызывает dispatch при корректном коде", () => {
        vi.useFakeTimers();
        const dispatch = vi.fn();

        codeSubmitValidHandler(
            { code: "123456" },
            dispatch,
            vi.fn(),
            "test.email@email.com",
            vi.fn()
        );

        expect(dispatch).not.toHaveBeenCalled();
    });
});
