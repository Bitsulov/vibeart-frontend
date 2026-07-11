import { describe, it, expect, vi } from "vitest";
import { changeEmailSuccessHandler } from "./changeEmailSuccessHandler";
import { showToast } from "features/toast";

describe("changeEmailSuccessHandler - обрабатывает успешную отправку запроса на изменение email", () => {
    it("Переключает форму на шаг ввода кода", () => {
        const setIsEmailSent = vi.fn();

        changeEmailSuccessHandler(
            vi.fn(),
            vi.fn(),
            setIsEmailSent,
            vi.fn(),
            "new@example.com"
        );

        expect(setIsEmailSent).toHaveBeenCalledWith(true);
    });

    it("Сохраняет новый адрес email", () => {
        const setNewEmailResult = vi.fn();

        changeEmailSuccessHandler(
            vi.fn(),
            vi.fn(),
            vi.fn(),
            setNewEmailResult,
            "new@example.com"
        );

        expect(setNewEmailResult).toHaveBeenCalledWith("new@example.com");
    });

    it("Сбрасывает поля старого и нового email", () => {
        const setValue = vi.fn();

        changeEmailSuccessHandler(vi.fn(), setValue, vi.fn(), vi.fn(), "new@example.com");

        expect(setValue).toHaveBeenCalledWith("oldEmail", "");
        expect(setValue).toHaveBeenCalledWith("newEmail", "");
    });

    it("Показывает уведомление об успешной отправке кода", () => {
        const dispatch = vi.fn();

        changeEmailSuccessHandler(dispatch, vi.fn(), vi.fn(), vi.fn(), "new@example.com");

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: {
                message: "api.registerAccess",
                type: "success",
                params: { email: "new@example.com" }
            }
        });
    });
});
