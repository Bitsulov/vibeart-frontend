import React from "react";

export function copyClickHandler(text: string, setIsShowHint: React.Dispatch<React.SetStateAction<boolean>>) {
    navigator.clipboard.writeText(text)
        .catch(err => console.error("copying error ", err));
    setIsShowHint(true);
}
