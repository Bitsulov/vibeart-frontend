import React from "react";

/** Открывает модальное окно добавления постов в альбом. */
export function addPostsAlbumHandler(setIsShowAlbumModal: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsShowAlbumModal(true);
}
