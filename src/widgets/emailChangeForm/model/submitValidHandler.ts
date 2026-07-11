import type { AxiosResponse } from "axios";
import type { ChangeEmailRequest } from "entities/user";

type SubmitFn = ({
    UUID,
    data
}: {
    UUID: string;
    data: ChangeEmailRequest;
}) => Promise<AxiosResponse<string>>;

/**
 * Обрабатывает успешную отправку формы изменения email:
 * Отправляет запрос изменения адреса электронной почты на сервер.
 *
 * @param newEmailValue - Новый адрес электронной почты.
 * @param UUID UUID пользователя
 * @param submit Функция отправки запроса изменения адреса электронной почты на сервер
 */
export async function submitValidHandler(
    newEmailValue: string,
    UUID: string,
    submit: SubmitFn
) {
    await submit({ UUID: UUID, data: { email: newEmailValue } });
}
