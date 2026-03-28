import React from "react";

export function albumClickHandler(setSelectedAlbum: React.Dispatch<React.SetStateAction<string>>, ULID: string) {
    setSelectedAlbum(ULID);
}
