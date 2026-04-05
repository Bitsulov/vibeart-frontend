import React from "react";

export function reportClickHandler(
    isReported: boolean,
    setIsReported: React.Dispatch<React.SetStateAction<boolean>>
) {
    if(!isReported) {
        setIsReported(true);
    }
}
