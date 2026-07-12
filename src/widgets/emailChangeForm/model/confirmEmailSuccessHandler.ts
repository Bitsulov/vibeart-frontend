import React, { type SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import type { IEmailChangeForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import { setUserInfo } from "entities/user";

/**
 * <h5>Функция, выполняемая после успешного выполнения запроса подтверждения изменения адреса электронной почты.</h1>
 *
 * <p>
 *     Отключает отображение ошибок для кода, сбрасывает форму регистрации,
 *     переключает форму, обновляет email пользователя в Redux и показывает
 *     уведомление через {@link Toast}.
 * </p>
 */
export function confirmEmailSuccessHandler(
    setIsEmailSent: React.Dispatch<SetStateAction<boolean>>,
    resetEmailForm: UseFormReset<IEmailChangeForm>,
    setErrorCode: React.Dispatch<SetStateAction<boolean>>,
    newEmail: string,
    dispatch: Dispatch
) {
    setErrorCode(false);
    resetEmailForm();
    setIsEmailSent(false);

    dispatch(setUserInfo({ email: newEmail }));
    dispatch(showToast({ message: "api.confirmEmailChangeAccess", type: "success" }));
}
