import React from "react";

type InputType = "text" | "email" | "password";

/**
 * Переключает тип поля ввода между `"text"` и `"password"`.
 *
 * @param type - Текущий тип поля ввода.
 * @param setCurrentType - Сеттер типа поля.
 */
export function toggleTypeHandler(type: InputType, setCurrentType: React.Dispatch<React.SetStateAction<InputType>>) {
    if (type === "text") {
        setCurrentType("password");
    } else {
        setCurrentType("text");
    }
}
