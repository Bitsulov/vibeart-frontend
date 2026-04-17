import React from "react";

/** Обновляет значение поиска при вводе в поле. */
export function searchChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
) {
    setValue(e.target.value);
}
