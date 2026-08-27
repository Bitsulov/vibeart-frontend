import { describe, it, expect, vi } from "vitest";
import { deleteAlbumErrorHandler } from "./deleteAlbumErrorHandler";
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

describe("deleteAlbumErrorHandler - уведомление об ошибке удаления альбома", () => {
    it("Показывает уведомление о недостатке прав (403)", () => {
        const dispatch = vi.fn();

        deleteAlbumErrorHandler(createError(403), dispatch);

        expectErrorToast(dispatch, "api.forbiddenError");
    });

    it("Показывает уведомление о ненайденном альбоме (404)", () => {
        const dispatch = vi.fn();

        deleteAlbumErrorHandler(createError(404), dispatch);

        expectErrorToast(dispatch, "api.albumNotFound");
    });

    it("Показывает уведомление об ошибке сервера (500)", () => {
        const dispatch = vi.fn();

        deleteAlbumErrorHandler(createError(500), dispatch);

        expectErrorToast(dispatch, "api.serverError");
    });

    it("Показывает уведомление о неизвестной ошибке при отсутствии тела ответа", () => {
        const dispatch = vi.fn();

        deleteAlbumErrorHandler(createError(), dispatch);

        expectErrorToast(dispatch, "api.unknownError");
    });
});
