import React from "react";

/** Раскрывает описание профиля. */
export function openDescriptionHandler(setIsOpened: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsOpened(true);
}
