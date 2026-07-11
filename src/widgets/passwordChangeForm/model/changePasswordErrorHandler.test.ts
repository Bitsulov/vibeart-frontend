import { describe, it, expect, vi } from "vitest";
import { changePasswordErrorHandler } from "./changePasswordErrorHandler";
import { showToast } from "features/toast";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

function createError(statusCode?: number, message = ""): AxiosError<AppError> {
    return {
        response:
            statusCode === undefined
                ? undefined
                : {
                      data: { statusCode, message, path: "", timestamp: "" }
                  }
    } as AxiosError<AppError>;
}

function expectErrorToast(dispatch: ReturnType<typeof vi.fn>, message: string) {
    expect(dispatch.mock.calls[0][0]).toMatchObject({
        type: showToast.type,
        payload: { message, type: "error" }
    });
}

describe("changePasswordErrorHandler - показывает уведомление об ошибке изменения пароля", () => {
    it("Показывает уведомление о неверном старом пароле (400, 'Old password does not match')", () => {
        const dispatch = vi.fn();

        changePasswordErrorHandler(
            createError(400, "Old password does not match"),
            dispatch
        );

        expectErrorToast(dispatch, "api.wrongPassword");
    });

    it("Показывает уведомление о раннем запросе (400, другое сообщение)", () => {
        const dispatch = vi.fn();

        changePasswordErrorHandler(createError(400, "other"), dispatch);

        expectErrorToast(dispatch, "api.earlyCodeRequest");
    });

    it("Показывает уведомление о ненайденном пользователе (404)", () => {
        const dispatch = vi.fn();

        changePasswordErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.principalUserNotFound");
    });

    it("Показывает уведомление о запрете (403)", () => {
        const dispatch = vi.fn();

        changePasswordErrorHandler(createError(403), dispatch);

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        changePasswordErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        changePasswordErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
