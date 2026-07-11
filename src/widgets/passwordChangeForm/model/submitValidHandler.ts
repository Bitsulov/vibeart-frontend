import type { IPasswordChangeForm } from "../lib/types";
import type { Dispatch, SetStateAction } from "react";
import type { ChangePasswordRequest } from "entities/user";
import type { AxiosResponse } from "axios";

type SubmitFn = ({
    UUID,
    data
}: {
    UUID: string;
    data: ChangePasswordRequest;
}) => Promise<AxiosResponse<string>>;

/**
 * Обрабатывает успешную отправку формы изменения пароля: сохраняет новый пароль
 * и отправляет запроса на сервер.
 *
 * @param data - Данные формы изменения пароля.
 * @param UUID - UUID пользователя.
 * @param setNewPasswordResult - Сохраняет новый пароль (для внутреннего использования).
 * @param newPasswordValue - Новый пароль, введённый пользователем.
 * @param submit Функция отправки запроса изменения пароля на сервер
 */
export async function submitValidHandler(
    data: IPasswordChangeForm,
    setNewPasswordResult: Dispatch<SetStateAction<string>>,
    newPasswordValue: string,
    UUID: string,
    submit: SubmitFn
) {
    setNewPasswordResult(newPasswordValue);

    await submit({
        UUID: UUID,
        data: {
            password: data.oldPassword,
            newPassword: data.newPassword,
            confirmPassword: data.confirmNewPassword
        }
    });
}
