import { describe, it, expect, vi } from "vitest";
import { confirmPasswordSuccessHandler } from "./confirmPasswordSuccessHandler";
import { showToast } from "features/toast";

describe("confirmPasswordSuccessHandler - обрабатывает успешное подтверждение изменения пароля", () => {
    it("Сбрасывает флаг ошибки кода", () => {
        const setErrorCode = vi.fn();

        confirmPasswordSuccessHandler(vi.fn(), vi.fn(), setErrorCode, vi.fn());

        expect(setErrorCode).toHaveBeenCalledWith(false);
    });

    it("Сбрасывает форму изменения пароля", () => {
        const resetPasswordForm = vi.fn();

        confirmPasswordSuccessHandler(vi.fn(), resetPasswordForm, vi.fn(), vi.fn());

        expect(resetPasswordForm).toHaveBeenCalledOnce();
    });

    it("Возвращает форму к шагу ввода пароля", () => {
        const setIsPasswordSent = vi.fn();

        confirmPasswordSuccessHandler(setIsPasswordSent, vi.fn(), vi.fn(), vi.fn());

        expect(setIsPasswordSent).toHaveBeenCalledWith(false);
    });

    it("Показывает уведомление об успешном изменении пароля", () => {
        const dispatch = vi.fn();

        confirmPasswordSuccessHandler(vi.fn(), vi.fn(), vi.fn(), dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: { message: "api.confirmPasswordChangeAccess", type: "success" }
        });
    });
});
