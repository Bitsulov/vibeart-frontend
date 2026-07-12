import type { AxiosResponse } from "axios";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

/**
 * Обрабатывает успешную повторную отправку кода подтверждения:
 * показывает уведомление об отправке кода на указанный адрес электронной почты.
 *
 * @param _response - Ответ сервера (не используется).
 * @param newEmail - Новый адрес электронной почты, на который повторно отправлен код.
 * @param dispatch - Функция записи данных в Redux.
 */
export function sendCodeSuccessHandler(
    _response: AxiosResponse<string>,
    newEmail: string,
    dispatch: Dispatch
) {
    dispatch(
        showToast({
            message: "api.sendCodeAccess",
            type: "success",
            params: { email: newEmail }
        })
    );
}
