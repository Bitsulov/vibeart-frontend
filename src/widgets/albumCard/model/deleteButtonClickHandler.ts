import React from "react";

/** Открывает модальное окно подтверждения удаления альбома. */
export function deleteButtonClickHandler(setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShowModal(true);
}
