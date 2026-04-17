import {closeButtonClickHandler} from "./closeButtonClickHandler";
import React from "react";

/** Подтверждает добавление постов в альбом: закрывает модальное окно и сбрасывает выбор. */
export function addAlbumsClickHandler(
    setIsDisappearring: React.Dispatch<React.SetStateAction<boolean>>,
    transitionTime: number,
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>
) {
    closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal, setSelectedPosts);
}
