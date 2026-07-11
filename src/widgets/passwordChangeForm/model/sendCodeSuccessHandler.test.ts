import { describe, it, expect, vi } from "vitest";
import { sendCodeSuccessHandler } from "./sendCodeSuccessHandler";
import { showToast } from "features/toast";
import type { AxiosResponse } from "axios";

describe("sendCodeSuccessHandler - обрабатывает успешную повторную отправку кода изменения пароля", () => {
    it("Сбрасывает флаг ошибки кода", () => {
        const setErrorCode = vi.fn();

        sendCodeSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "user@example.com" },
            vi.fn(),
            vi.fn(),
            setErrorCode,
            vi.fn()
        );

        expect(setErrorCode).toHaveBeenCalledWith(false);
    });

    it("Сбрасывает форму изменения пароля", () => {
        const resetEmailForm = vi.fn();

        sendCodeSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "user@example.com" },
            vi.fn(),
            resetEmailForm,
            vi.fn(),
            vi.fn()
        );

        expect(resetEmailForm).toHaveBeenCalledOnce();
    });

    it("Возвращает форму к шагу ввода пароля", () => {
        const setIsEmailSent = vi.fn();

        sendCodeSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "user@example.com" },
            setIsEmailSent,
            vi.fn(),
            vi.fn(),
            vi.fn()
        );

        expect(setIsEmailSent).toHaveBeenCalledWith(false);
    });

    it("Показывает уведомление с адресом email из запроса", () => {
        const dispatch = vi.fn();

        sendCodeSuccessHandler(
            {} as AxiosResponse<string>,
            { email: "user@example.com" },
            vi.fn(),
            vi.fn(),
            vi.fn(),
            dispatch
        );

        expect(dispatch.mock.calls[0][0]).toMatchObject({
            type: showToast.type,
            payload: {
                message: "api.sendCodeAccess",
                type: "success",
                params: { email: "user@example.com" }
            }
        });
    });
});
