import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import type { UseFormSetError } from "react-hook-form";
import type { IRegisterForm } from "../lib/types";

/**
 * Обрабатывает ошибку запроса регистрации: помечает одно из полей
 * формы регистрации сообщением об ошибке
 * в зависимости от кода ответа сервера.
 *
 * @param error - Ошибка axios с телом ответа {@link AppError}.
 * @param setError - Функция react-hook-form для установки ошибки поля {@link IRegisterForm}.
 */
export function registerErrorHandler(
    error: AxiosError<AppError>,
    setError: UseFormSetError<IRegisterForm>
) {
    switch (error.response?.data.statusCode) {
        case 409:
            setError("email", { type: "client", message: "api.conflictUserEmailError" });
            break;
        case 400:
            if (
                error.response?.data.message ===
                "Please wait before requesting a new verification code"
            ) {
                setError("email", { type: "client", message: "api.earlyCodeRequest" });
            } else {
                setError("email", { type: "client", message: "api.invalidData" });
            }
            break;
        case 403:
            setError("email", { type: "client", message: "api.forbiddenError" });
            break;
        case 500:
            setError("email", { type: "server", message: "api.serverError" });
            break;
        default:
            setError("email", { type: "unknown", message: "api.unknownError" });
    }
}
