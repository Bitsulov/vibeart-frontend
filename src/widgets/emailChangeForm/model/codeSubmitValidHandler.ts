import type { ICodeForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import React, { type SetStateAction } from "react";
import type { ConfirmChangeEmailRequest } from "entities/user";
import type { AxiosResponse } from "axios";

type SubmitFn = (data: ConfirmChangeEmailRequest) => Promise<AxiosResponse<string>>;

/**
 * Обрабатывает отправку кода подтверждения смены email:
 * проверяет длину кода, показывает ошибку или завершает процесс.
 *
 * @param data - Данные формы ввода кода.
 * @param dispatch - Функция записи данных в Redux.
 * @param setErrorCode - Переключает режим отображения ошибки в полях кода.
 * @param email - Новый адрес электронной почты пользователя.
 * @param submit - Функция отправки запроса подтверждения смены адреса электронной почты на сервер.
 */
export async function codeSubmitValidHandler(
    data: ICodeForm,
    dispatch: Dispatch,
    setErrorCode: React.Dispatch<SetStateAction<boolean>>,
    email: string,
    submit: SubmitFn
) {
    if (data.code.length !== 6) {
        dispatch(showToast({ message: "toast.wrongCodeLength", type: "error" }));
        setErrorCode(true);
        return;
    }

    await submit({ email: email, verificationCode: data.code });
}
