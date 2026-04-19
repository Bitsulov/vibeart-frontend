import React from "react";

/**
 * Переключает состояние подписки на противоположное.
 * @param setIsSubscribed - сеттер состояния подписки
 */
export function toggleSubscribeClickHandler(setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsSubscribed(state => !state);
}
