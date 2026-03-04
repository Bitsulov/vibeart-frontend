import React from "react";

export function burgerButtonClickHandler(setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsBurgerOpen(state => !state);
}
