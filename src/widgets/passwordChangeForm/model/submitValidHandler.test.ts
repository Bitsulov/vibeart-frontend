import { describe, it, expect, vi } from "vitest";
import { submitValidHandler } from "./submitValidHandler";

const resultForm = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
};

describe("submitValidHandler - успешная отправка формы изменения пароля", () => {
    it("Вызывает submit и сохраняет новый пароль", () => {
        const setNewPasswordResult = vi.fn();
        const submitFn = vi.fn();

        submitValidHandler(
            resultForm,
            setNewPasswordResult,
            "NewPass1",
            "UUID",
            submitFn
        );

        expect(setNewPasswordResult).toHaveBeenCalledWith("NewPass1");
        expect(submitFn).toHaveBeenCalledWith({
            UUID: "UUID",
            data: {
                password: resultForm.oldPassword,
                newPassword: resultForm.newPassword,
                confirmPassword: resultForm.confirmNewPassword
            }
        });
    });
});
