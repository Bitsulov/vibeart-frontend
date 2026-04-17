import React from "react";

/**
 * Устанавливает выбранный альбом по ULID.
 *
 * @param setSelectedAlbum - Сеттер состояния выбранного альбома.
 * @param ULID - Уникальный идентификатор альбома.
 */
export function albumClickHandler(setSelectedAlbum: React.Dispatch<React.SetStateAction<string>>, ULID: string) {
    setSelectedAlbum(ULID);
}
