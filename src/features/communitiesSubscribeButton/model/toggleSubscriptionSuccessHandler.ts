import type { QueryClient } from "@tanstack/react-query";

/**
 * Сбрасывает кэш списков сообществ после успешного переключения подписки,
 * чтобы карточка переместилась между списками «Все» и «Мои подписки».
 *
 * @param queryClient - Клиент TanStack Query.
 */
export function toggleSubscriptionSuccessHandler(queryClient: QueryClient) {
    queryClient.invalidateQueries({
        predicate: query =>
            typeof query.queryKey[0] === "string" &&
            query.queryKey[0].startsWith("communities ")
    });
}
