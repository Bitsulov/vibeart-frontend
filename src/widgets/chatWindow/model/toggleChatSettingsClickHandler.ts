import React from "react";

export function toggleChatSettingsClickHandler(setIsOpenOptions: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsOpenOptions(state => !state);
}
