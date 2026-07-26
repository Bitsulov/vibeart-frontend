/** Соответствие кода HTTP-ошибки ключу перевода для сообщения. */
export const errorsConfig: Record<number, string> = {
    401: "error.error401",
    403: "error.error403",
    404: "error.error404",
    500: "error.error500"
};
