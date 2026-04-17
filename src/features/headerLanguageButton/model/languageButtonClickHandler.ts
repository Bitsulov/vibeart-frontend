import React from "react";

/**
 * Открывает модальное окно выбора языка.
 *
 * @param setIsShowChangeLanguage - Сеттер видимости модального окна языка.
 */
export function languageButtonClickHandler(setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShowChangeLanguage(true);
}
