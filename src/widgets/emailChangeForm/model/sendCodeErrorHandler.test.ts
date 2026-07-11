import { describe, it, expect, vi } from "vitest";
import { sendCodeErrorHandler } from "./sendCodeErrorHandler";
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

describe("sendCodeErrorHandler - показывает уведомление об ошибке повторной отправки кода изменения email", () => {
    it("Показывает уведомление о ненайденном пользователе (404)", () => {
        const dispatch = vi.fn();

        sendCodeErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.userNotFound");
    });

    it("Показывает уведомление о раннем повторном запросе (400)", () => {
        const dispatch = vi.fn();

        sendCodeErrorHandler(createError(400), dispatch);

        expectErrorToast(dispatch, "api.earlyCodeRequest");
    });

    it("Показывает уведомление о запрете (403)", () => {
        const dispatch = vi.fn();

        sendCodeErrorHandler(createError(403), dispatch);

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        sendCodeErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        sendCodeErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
