import React from "react";

/** Открывает модальное окно подтверждения удаления поста. */
export function deleteButtonClickHandler(setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShowModal(true);
}
