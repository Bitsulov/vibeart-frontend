import React from "react";

/** Открывает модальное окно подтверждения удаления чата. */
export function deleteChatClickHandler(setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShowModal(true);
}
