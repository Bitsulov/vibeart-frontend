import { showToast } from "features/toast";
import type { UseFormSetValue } from "react-hook-form";
import type { IEmailChangeForm } from "../lib/types";
import React, { type SetStateAction } from "react";
import type { Dispatch } from "@reduxjs/toolkit";

/**
 * <h5>Функция, выполняемая после успешного выполнения запроса изменения адреса электронной почты.</h1>
 *
 * <p>
 *     Переключает форму, сохраняет значение нового адреса электронной почты,
 *     очищает текстовые поля формы и показывает уведомление через {@link Toast}.
 * </p>
 */
export function changeEmailSuccessHandler(
    dispatch: Dispatch,
    setValue: UseFormSetValue<IEmailChangeForm>,
    setIsEmailSent: React.Dispatch<SetStateAction<boolean>>,
    setNewEmailResult: React.Dispatch<SetStateAction<string>>,
    newEmailValue: string
) {
    setIsEmailSent(true);
    setNewEmailResult(newEmailValue);
    setValue("oldEmail", "");
    setValue("newEmail", "");
    dispatch(
        showToast({
            message: "api.registerAccess",
            type: "success",
            params: { email: newEmailValue }
        })
    );
}
