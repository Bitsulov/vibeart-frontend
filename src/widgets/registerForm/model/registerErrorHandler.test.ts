import { describe, it, expect, vi } from "vitest";
import { registerErrorHandler } from "./registerErrorHandler";
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

describe("registerErrorHandler - помечает поле email формы регистрации в зависимости от ошибки", () => {
    it("Помечает email конфликтом, если email уже зарегистрирован (409)", () => {
        const setError = vi.fn();

        registerErrorHandler(createError(409), setError);

        expect(setError).toHaveBeenCalledWith("email", {
            type: "client",
            message: "api.conflictUserEmailError"
        });
    });

    it("Помечает email невалидными данными (400)", () => {
        const setError = vi.fn();

        registerErrorHandler(createError(400), setError);

        expect(setError).toHaveBeenCalledWith("email", {
            type: "client",
            message: "api.invalidData"
        });
    });

    it("Помечает email слишком ранним запросом кода (400, повторная отправка формы)", () => {
        const setError = vi.fn();

        registerErrorHandler(
            createError(400, "Please wait before requesting a new verification code"),
            setError
        );

        expect(setError).toHaveBeenCalledWith("email", {
            type: "client",
            message: "api.earlyCodeRequest"
        });
    });

    it("Помечает email запретом (403)", () => {
        const setError = vi.fn();

        registerErrorHandler(createError(403), setError);

        expect(setError).toHaveBeenCalledWith("email", {
            type: "client",
            message: "api.forbiddenError"
        });
    });

    it("Помечает email ошибкой сервера (500)", () => {
        const setError = vi.fn();

        registerErrorHandler(createError(500), setError);

        expect(setError).toHaveBeenCalledWith("email", {
            type: "server",
            message: "api.serverError"
        });
    });

    it("Помечает email неизвестной ошибкой при отсутствии тела ответа", () => {
        const setError = vi.fn();

        registerErrorHandler(createError(), setError);

        expect(setError).toHaveBeenCalledWith("email", {
            type: "unknown",
            message: "api.unknownError"
        });
    });
});
