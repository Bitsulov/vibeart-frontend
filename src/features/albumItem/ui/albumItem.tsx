import React from "react";
import classes from "./albumItem.module.scss";
import { albumClickHandler } from "../model/albumClickHandler";

interface AlbumItem {
    id: number;
    name: string | undefined;
    isActive: boolean;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<number>>;
}

const AlbumItem = ({ id, name, isActive = false, setSelectedAlbum, ...props }: AlbumItem) => {
    return (
        <button
            className={isActive ? `${classes.albumsAlbum} ${classes.albumActive}` : classes.albumsAlbum}
            onClick={e => albumClickHandler(e, setSelectedAlbum, id)}
            {...props}
        >
            {name}
        </button>
    );
};

export { AlbumItem };
