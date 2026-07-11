import { describe, it, expect, vi } from "vitest";
import { confirmPasswordErrorHandler } from "./confirmPasswordErrorHandler";
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

describe("confirmPasswordErrorHandler - показывает уведомление об ошибке подтверждения изменения пароля", () => {
    it("Показывает уведомление о ненайденном пользователе (404)", () => {
        const dispatch = vi.fn();

        confirmPasswordErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.userNotFound");
    });

    it("Показывает уведомление об истёкшем коде (410)", () => {
        const dispatch = vi.fn();

        confirmPasswordErrorHandler(createError(410), dispatch);

        expectErrorToast(dispatch, "api.codeExpired");
    });

    it("Показывает уведомление о неверном коде (400)", () => {
        const dispatch = vi.fn();

        confirmPasswordErrorHandler(createError(400), dispatch);

        expectErrorToast(dispatch, "api.invalidCode");
    });

    it("Показывает уведомление о запрете (403)", () => {
        const dispatch = vi.fn();

        confirmPasswordErrorHandler(createError(403), dispatch);

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        confirmPasswordErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        confirmPasswordErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
