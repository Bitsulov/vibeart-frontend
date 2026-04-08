import React from "react";

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
