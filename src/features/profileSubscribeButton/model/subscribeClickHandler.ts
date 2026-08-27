import type { Dispatch, SetStateAction } from "react";
import type { AxiosResponse } from "axios";

type ToggleSubscriptionFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Оптимистично переключает подписку на пользователя, затем отправляет запрос на сервер.
 *
 * @param isSubscribed - Текущее состояние подписки.
 * @param setIsSubscribed - Сеттер состояния подписки.
 * @param UUID - UUID пользователя.
 * @param toggleSubscription - Функция запроса на переключение подписки.
 */
export async function subscribeClickHandler(
    isSubscribed: boolean,
    setIsSubscribed: Dispatch<SetStateAction<boolean>>,
    UUID: string,
    toggleSubscription: ToggleSubscriptionFn
) {
    setIsSubscribed(!isSubscribed);
    await toggleSubscription(UUID);
}
