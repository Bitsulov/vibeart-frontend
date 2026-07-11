import type { AxiosResponse } from "axios";
import type { SendCodeEmailRequest } from "entities/user";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import React, { type SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import type { IPasswordChangeForm } from "../lib/types";

/**
 * Обрабатывает успешную повторную отправку кода подтверждения:
 * показывает уведомление об отправке кода на указанный адрес электронной почты.
 *
 * @param _response - Ответ сервера (не используется).
 * @param request - Адрес электронной почты, на который повторно отправлен код, {@link SendCodeRequest}.
 * @param dispatch - Функция записи данных в Redux.
 */
export function sendCodeSuccessHandler(
    _response: AxiosResponse<string>,
    request: SendCodeEmailRequest,
    setIsEmailSent: React.Dispatch<SetStateAction<boolean>>,
    resetEmailForm: UseFormReset<IPasswordChangeForm>,
    setErrorCode: React.Dispatch<SetStateAction<boolean>>,
    dispatch: Dispatch
) {
    setErrorCode(false);
    resetEmailForm();
    setIsEmailSent(false);

    dispatch(
        showToast({
            message: "api.sendCodeAccess",
            type: "success",
            params: { email: request.email }
        })
    );
}
