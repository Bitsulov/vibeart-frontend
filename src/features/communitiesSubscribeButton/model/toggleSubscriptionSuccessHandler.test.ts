import { describe, it, expect, vi } from "vitest";
import { toggleSubscriptionSuccessHandler } from "./toggleSubscriptionSuccessHandler";
import type { Query, QueryClient } from "@tanstack/react-query";

function createQuery(queryKey: readonly unknown[]): Query {
    return { queryKey } as Query;
}

describe("toggleSubscriptionSuccessHandler - сбрасывает кэш списков сообществ", () => {
    it("Вызывает invalidateQueries с предикатом", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        toggleSubscriptionSuccessHandler(queryClient);

        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
            predicate: expect.any(Function)
        });
    });

    it("Предикат совпадает с ключами запросов списков сообществ", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        toggleSubscriptionSuccessHandler(queryClient);

        const { predicate } = (queryClient.invalidateQueries as ReturnType<typeof vi.fn>)
            .mock.calls[0][0];

        expect(predicate(createQuery(["communities all uuid "]))).toBe(true);
        expect(predicate(createQuery(["communities owned uuid"]))).toBe(true);
        expect(predicate(createQuery(["communities my uuid "]))).toBe(true);
    });

    it("Предикат не совпадает с ключами других запросов", () => {
        const queryClient = { invalidateQueries: vi.fn() } as unknown as QueryClient;

        toggleSubscriptionSuccessHandler(queryClient);

        const { predicate } = (queryClient.invalidateQueries as ReturnType<typeof vi.fn>)
            .mock.calls[0][0];

        expect(predicate(createQuery(["album posts album-uuid"]))).toBe(false);
        expect(predicate(createQuery([]))).toBe(false);
    });
});
