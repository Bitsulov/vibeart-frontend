import { describe, it, expect, vi } from "vitest";
import { changePasswordSuccessHandler } from "./changePasswordSuccessHandler";
import { showToast } from "features/toast";

describe("changePasswordSuccessHandler - обрабатывает успешную отправку запроса на изменение пароля", () => {
    it("Переключает форму на шаг ввода кода", () => {
        const setIsPasswordSent = vi.fn();

        changePasswordSuccessHandler(
            vi.fn(),
            setIsPasswordSent,
            "user@example.com",
            vi.fn()
        );

        expect(setIsPasswordSent).toHaveBeenCalledWith(true);
    });

    it("Сбрасывает поля старого, нового пароля и подтверждения", () => {
        const setValue = vi.fn();

        changePasswordSuccessHandler(setValue, vi.fn(), "user@example.com", vi.fn());

        expect(setValue).toHaveBeenCalledWith("oldPassword", "");
        expect(setValue).toHaveBeenCalledWith("newPassword", "");
        expect(setValue).toHaveBeenCalledWith("confirmNewPassword", "");
    });

    it("Показывает уведомление с адресом email", () => {
        const dispatch = vi.fn();

        changePasswordSuccessHandler(vi.fn(), vi.fn(), "user@example.com", dispatch);

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: {
                message: "api.registerAccess",
                type: "success",
                params: { email: "user@example.com" }
            }
        });
    });
});
