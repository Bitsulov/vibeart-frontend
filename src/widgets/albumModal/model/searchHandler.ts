import React from "react";

export function searchHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
) {
    setSearchValue(e.target.value);
}
