import React from "react";

/** Переключает видимость выпадающего списка настроек чата. */
export function toggleChatSettingsClickHandler(setIsOpenOptions: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsOpenOptions(state => !state);
}
