import type { Dispatch, SetStateAction } from "react";
import type { AxiosResponse } from "axios";

type ToggleSubscriptionFn = (UUID: string) => Promise<AxiosResponse<string>>;

/**
 * Оптимистично переключает подписку и изменяет счётчик подписчиков, затем отправляет запрос на сервер.
 *
 * @param setSubscribersCount - Сеттер количества подписчиков.
 * @param isSubscribed - Текущее состояние подписки.
 * @param setIsSubscribed - Сеттер состояния подписки.
 * @param UUID - UUID сообщества.
 * @param toggleSubscription - Функция запроса на переключение подписки.
 */
export async function subscribeClickHandler(
    setSubscribersCount: Dispatch<SetStateAction<number>>,
    isSubscribed: boolean,
    setIsSubscribed: Dispatch<SetStateAction<boolean>>,
    UUID: string,
    toggleSubscription: ToggleSubscriptionFn
) {
    setIsSubscribed(!isSubscribed);
    setSubscribersCount(count => (isSubscribed ? count - 1 : count + 1));
    await toggleSubscription(UUID);
}
