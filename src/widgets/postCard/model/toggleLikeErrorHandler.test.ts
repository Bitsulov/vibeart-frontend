import { describe, it, expect, vi } from "vitest";
import { toggleLikeErrorHandler } from "./toggleLikeErrorHandler";
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

describe("toggleLikeErrorHandler - откатывает оптимистичный лайк и показывает уведомление об ошибке", () => {
    it("Откатывает лайк обратно и уменьшает счетчик, если он был оптимистично поставлен", () => {
        const dispatch = vi.fn();
        const setIsLiked = vi.fn();
        const setLikes = vi.fn();

        toggleLikeErrorHandler(createError(500), dispatch, true, setIsLiked, setLikes);

        expect(setIsLiked).toHaveBeenCalledWith(false);
        const updater = setLikes.mock.calls[0][0] as (n: number) => number;
        expect(updater(6)).toBe(5);
    });

    it("Откатывает лайк обратно и увеличивает счетчик, если он был оптимистично убран", () => {
        const dispatch = vi.fn();
        const setIsLiked = vi.fn();
        const setLikes = vi.fn();

        toggleLikeErrorHandler(createError(500), dispatch, false, setIsLiked, setLikes);

        expect(setIsLiked).toHaveBeenCalledWith(true);
        const updater = setLikes.mock.calls[0][0] as (n: number) => number;
        expect(updater(5)).toBe(6);
    });

    it("Показывает уведомление о запрете (403)", () => {
        const dispatch = vi.fn();

        toggleLikeErrorHandler(createError(403), dispatch, true, vi.fn(), vi.fn());

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        toggleLikeErrorHandler(createError(500), dispatch, true, vi.fn(), vi.fn());

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        toggleLikeErrorHandler(createError(), dispatch, true, vi.fn(), vi.fn());

        expectErrorToast(dispatch, "api.unknownError");
    });
});
