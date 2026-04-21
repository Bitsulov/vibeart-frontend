import React from "react";

/** Раскрывает описание профиля. */
export function openDescriptionHandler(setIsOpenedModal: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsOpenedModal(true);
}
