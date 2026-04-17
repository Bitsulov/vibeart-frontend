import React from "react";

/**
 * Переключает состояние бургер-меню.
 *
 * @param setIsBurgerOpen - Сеттер состояния открытия меню.
 */
export function burgerButtonClickHandler(setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsBurgerOpen(state => !state);
}
