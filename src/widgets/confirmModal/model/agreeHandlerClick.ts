import React from "react";

/** Выполняет подтверждённое действие с анимацией закрытия модального окна. */
export function agreeHandlerClick(
    func: () => void,
    setIsDisappearring: React.Dispatch<React.SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsDisappearring(true);
    setTimeout(() => {
        setIsShowChangeLanguage(false);
        setIsDisappearring(false);
        func();
    }, transitionTime);
}
