import React from "react";

/**
 * Копирует текст в буфер обмена и показывает подсказку об успехе.
 *
 * @param text - Текст для копирования.
 * @param setIsShowHint - Сеттер видимости подсказки.
 */
export function copyClickHandler(text: string, setIsShowHint: React.Dispatch<React.SetStateAction<boolean>>) {
    navigator.clipboard.writeText(text)
        .catch(err => console.error("copying error ", err));
    setIsShowHint(true);
}
