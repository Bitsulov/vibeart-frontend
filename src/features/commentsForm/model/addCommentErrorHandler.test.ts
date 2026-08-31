import { describe, it, expect, vi } from "vitest";
import { addCommentErrorHandler } from "./addCommentErrorHandler";
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

describe("addCommentErrorHandler - показывает уведомление об ошибке создания комментария", () => {
    it("Показывает уведомление о неверных данных (400)", () => {
        const dispatch = vi.fn();

        addCommentErrorHandler(createError(400), dispatch);

        expectErrorToast(dispatch, "api.invalidData");
    });

    it("Показывает уведомление о том, что публикация не найдена (404)", () => {
        const dispatch = vi.fn();

        addCommentErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.postNotFound");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        addCommentErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        addCommentErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
