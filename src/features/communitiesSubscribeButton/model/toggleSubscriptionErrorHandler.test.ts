import { describe, it, expect, vi } from "vitest";
import { toggleSubscriptionErrorHandler } from "./toggleSubscriptionErrorHandler";
import { showToast } from "features/toast";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

function createError(statusCode?: number): AxiosError<AppError> {
    return {
        response:
            statusCode === undefined
                ? undefined
                : {
                      data: { statusCode, message: "", path: "", timestamp: "" }
                  }
    } as AxiosError<AppError>;
}

function expectErrorToast(dispatch: ReturnType<typeof vi.fn>, message: string) {
    expect(dispatch.mock.calls[0][0]).toMatchObject({
        type: showToast.type,
        payload: { message, type: "error" }
    });
}

describe("toggleSubscriptionErrorHandler - откатывает оптимистичную подписку и показывает уведомление об ошибке", () => {
    it("Откатывает подписку обратно и уменьшает счетчик, если она была оптимистично оформлена", () => {
        const dispatch = vi.fn();
        const setIsSubscribed = vi.fn();
        const setSubscribersCount = vi.fn();

        toggleSubscriptionErrorHandler(
            createError(500),
            dispatch,
            true,
            setIsSubscribed,
            setSubscribersCount
        );

        expect(setIsSubscribed).toHaveBeenCalledWith(false);
        const updater = setSubscribersCount.mock.calls[0][0] as (n: number) => number;
        expect(updater(6)).toBe(5);
    });

    it("Откатывает подписку обратно и увеличивает счетчик, если она была оптимистично отменена", () => {
        const dispatch = vi.fn();
        const setIsSubscribed = vi.fn();
        const setSubscribersCount = vi.fn();

        toggleSubscriptionErrorHandler(
            createError(500),
            dispatch,
            false,
            setIsSubscribed,
            setSubscribersCount
        );

        expect(setIsSubscribed).toHaveBeenCalledWith(true);
        const updater = setSubscribersCount.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(6);
    });

    it("Показывает уведомление о ненайденном сообществе (404)", () => {
        const dispatch = vi.fn();

        toggleSubscriptionErrorHandler(
            createError(404),
            dispatch,
            true,
            vi.fn(),
            vi.fn()
        );

        expectErrorToast(dispatch, "api.communityNotFound");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        toggleSubscriptionErrorHandler(
            createError(500),
            dispatch,
            true,
            vi.fn(),
            vi.fn()
        );

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        toggleSubscriptionErrorHandler(createError(), dispatch, true, vi.fn(), vi.fn());

        expectErrorToast(dispatch, "api.unknownError");
    });
});
