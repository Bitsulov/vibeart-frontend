import React from "react";

/**
 * Обрабатывает выбор пункта выпадающего меню: закрывает меню и выполняет колбэк.
 *
 * @param onClick - Колбэк выбранного пункта.
 * @param setIsOpen - Сеттер состояния открытия меню.
 */
export function optionClickHandler(
    onClick: () => void,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
    setIsOpen(false);
    onClick();
}
