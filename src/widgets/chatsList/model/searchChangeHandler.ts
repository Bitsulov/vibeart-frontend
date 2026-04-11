import React from "react";

export function searchChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
) {
    setValue(e.target.value);
}
