import React from "react";

/** Обновляет значение поиска при вводе в поле. */
export function searchHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setSearchValue: React.Dispatch<React.SetStateAction<string>>
) {
    setSearchValue(e.target.value);
}
