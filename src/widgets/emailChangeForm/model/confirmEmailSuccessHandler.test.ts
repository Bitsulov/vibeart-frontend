import { describe, it, expect, vi } from "vitest";
import { confirmEmailSuccessHandler } from "./confirmEmailSuccessHandler";
import { showToast } from "features/toast";
import { setUserInfo } from "entities/user";

describe("confirmEmailSuccessHandler - обрабатывает успешное подтверждение изменения email", () => {
    it("Сбрасывает флаг ошибки кода", () => {
        const setErrorCode = vi.fn();

        confirmEmailSuccessHandler(
            vi.fn(),
            vi.fn(),
            setErrorCode,
            "new@example.com",
            vi.fn()
        );

        expect(setErrorCode).toHaveBeenCalledWith(false);
    });

    it("Сбрасывает форму изменения email", () => {
        const resetEmailForm = vi.fn();

        confirmEmailSuccessHandler(
            vi.fn(),
            resetEmailForm,
            vi.fn(),
            "new@example.com",
            vi.fn()
        );

        expect(resetEmailForm).toHaveBeenCalledOnce();
    });

    it("Возвращает форму к шагу ввода email", () => {
        const setIsEmailSent = vi.fn();

        confirmEmailSuccessHandler(
            setIsEmailSent,
            vi.fn(),
            vi.fn(),
            "new@example.com",
            vi.fn()
        );

        expect(setIsEmailSent).toHaveBeenCalledWith(false);
    });

    it("Обновляет email пользователя в Redux", () => {
        const dispatch = vi.fn();

        confirmEmailSuccessHandler(
            vi.fn(),
            vi.fn(),
            vi.fn(),
            "new@example.com",
            dispatch
        );

        expect(dispatch).toHaveBeenCalledWith(setUserInfo({ email: "new@example.com" }));
    });

    it("Показывает уведомление об успешном изменении email", () => {
        const dispatch = vi.fn();

        confirmEmailSuccessHandler(
            vi.fn(),
            vi.fn(),
            vi.fn(),
            "new@example.com",
            dispatch
        );

        expect(dispatch.mock.calls[1][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.confirmEmailChangeAccess", type: "success" }
        });
    });
});
