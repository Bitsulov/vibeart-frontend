import { describe, it, expect, vi } from "vitest";
import { changeEmailErrorHandler } from "./changeEmailErrorHandler";
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

describe("changeEmailErrorHandler - показывает уведомление об ошибке изменения email", () => {
    it("Показывает уведомление о раннем запросе (400)", () => {
        const dispatch = vi.fn();

        changeEmailErrorHandler(createError(400), dispatch);

        expectErrorToast(dispatch, "api.earlyCodeRequest");
    });

    it("Показывает уведомление о ненайденном пользователе (404)", () => {
        const dispatch = vi.fn();

        changeEmailErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.principalUserNotFound");
    });

    it("Показывает уведомление о запрете (403)", () => {
        const dispatch = vi.fn();

        changeEmailErrorHandler(createError(403), dispatch);

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление о занятом адресе email (409)", () => {
        const dispatch = vi.fn();

        changeEmailErrorHandler(createError(409), dispatch);

        expectErrorToast(dispatch, "api.conflictUserEmailError");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        changeEmailErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        changeEmailErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
