import type { Dispatch } from "@reduxjs/toolkit";
import React, { type SetStateAction } from "react";
import { showToast } from "features/toast";
import type { ICodeForm } from "../lib/types";
import type { AxiosResponse } from "axios";
import type { ConfirmChangePasswordRequest } from "entities/user";

type SubmitFn = (data: ConfirmChangePasswordRequest) => Promise<AxiosResponse<string>>;

/**
 * Обрабатывает отправку кода подтверждения смены пароля:
 * проверяет длину кода, показывает ошибку или отправляет запрос на сервер.
 *
 * @param data - Данные формы ввода кода.
 * @param dispatch - Функция записи данных в Redux.
 * @param setErrorCode - Переключает режим отображения ошибки в полях кода.
 * @param email - Адрес электронной почты пользователя.
 * @param submit - Функция отправки запроса подтверждения смены пароля на сервер.
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
