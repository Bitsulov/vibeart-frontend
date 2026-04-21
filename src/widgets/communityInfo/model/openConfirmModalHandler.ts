import React from "react";

/** Открывает модальное окно подтверждения действия. */
export function openConfirmModalHandler(setIsShow: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShow(true);
}
