import React from "react";

export function optionClickHandler(
    onClick: () => void,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
    setIsOpen(false);
    onClick();
}
