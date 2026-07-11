import type { SendCodeRequest } from "entities/user";
import type { AxiosResponse } from "axios";
import type { Dispatch, SetStateAction } from "react";

type SentCodeFn = (data: SendCodeRequest) => Promise<AxiosResponse<string>>;

/**
 * Обрабатывает нажатие кнопки повторной отправки кода подтверждения:
 * блокирует кнопку, запускает запрос на отправку и, в случае успеха,
 * запускает обратный отсчёт перед следующей попыткой. При ошибке
 * запроса повторная отправка снова становится доступной.
 *
 * @param setIsAllowSentCode - Сеттер признака доступности повторной отправки.
 * @param setTimer - Сеттер таймера обратного отсчёта в секундах.
 * @param email - Адрес электронной почты, на который отправляется код.
 * @param sendCode - Функция отправки кода подтверждения на сервер.
 */
export function sentCodeButtonHandler(
    setIsAllowSentCode: Dispatch<SetStateAction<boolean>>,
    setTimer: Dispatch<SetStateAction<number>>,
    email: string,
    sendCode: SentCodeFn
) {
    setIsAllowSentCode(false);
    sendCode({ email })
        .then(() => {
            setIsAllowSentCode(false);
            setTimer(120);
        })
        .catch(() => {
            setIsAllowSentCode(true);
        });
}
