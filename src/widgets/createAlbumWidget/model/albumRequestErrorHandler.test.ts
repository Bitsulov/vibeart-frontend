import { describe, it, expect, vi } from "vitest";
import { albumRequestErrorHandler } from "./albumRequestErrorHandler";
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

describe("albumRequestErrorHandler - показывает уведомление об ошибке создания альбома", () => {
    it("Показывает уведомление о запрете (403)", () => {
        const dispatch = vi.fn();

        albumRequestErrorHandler(createError(403), dispatch);

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление о ненайденном пользователе (404)", () => {
        const dispatch = vi.fn();

        albumRequestErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.principalUserNotFound");
    });

    it("Показывает уведомление о слишком большом файле (413)", () => {
        const dispatch = vi.fn();

        albumRequestErrorHandler(createError(413), dispatch);

        expectErrorToast(dispatch, "api.fileTooLarge");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        albumRequestErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        albumRequestErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
