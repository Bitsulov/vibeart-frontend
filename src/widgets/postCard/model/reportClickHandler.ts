import React from "react";

/** Отправляет жалобу на пост — однократное действие, повторная отправка игнорируется. */
export function reportClickHandler(
    isReported: boolean,
    setIsReported: React.Dispatch<React.SetStateAction<boolean>>
) {
    if(!isReported) {
        setIsReported(true);
    }
}
