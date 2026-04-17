import c from "./albumSlide.module.scss";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import React from "react";
import {albumClickHandler} from "../model/albumClickHandler";
import clsx from "clsx";

interface AlbumSlideProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    imageUrl: string;
    name: string;
    ariaLabel?: string;
    ULID: string;
    selectedAlbum: string;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Слайд альбома в слайдере выбора.
 *
 * @param selectedAlbum - ULID текущего выбранного альбома для подсветки активного.
 * @param setSelectedAlbum - Сеттер выбранного альбома.
 */
export const AlbumSlide = ({
    imageUrl,
    name,
    ULID,
    ariaLabel = "",
    selectedAlbum,
    setSelectedAlbum,
    ...props
}: AlbumSlideProps) => {
    const { t } = useTranslation();

	return (
        <button
            aria-label={ariaLabel}
            className={clsx(c.slide, selectedAlbum === ULID && c.active)}
            onClick={() => albumClickHandler(setSelectedAlbum, ULID)}
            {...props}
        >
            {imageUrl ?
                <img
                    width="80"
                    height="80"
                    src={imageUrl}
                    alt={t("profile.altAlbum", {name: name})}
                    className={c.album_img}
                />
            :
                <svg className={c.default_icon} width="80" height="80" viewBox="0 0 24 24" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g id="Layer_2">
                        <path fill="currentColor" d="M17.9,11.3c-0.5-0.8-1.3-1.3-2.3-1.3s-1.8,0.5-2.3,1.3L13,11.8L12,10.1c-0.5-0.9-1.5-1.4-2.5-1.4S7.6,9.2,7,10.1l-4.9,7.9   c-0.4,0.6-0.4,1.4-0.1,2c0.4,0.6,1,1,1.7,1h6.9h10c0.7,0,1.3-0.4,1.6-1c0.3-0.6,0.3-1.3,0-1.9L17.9,11.3z M9.1,18.1   c-0.1,0.1-0.2,0.3-0.2,0.4c0,0.1,0,0.1,0,0.2c0,0.1,0,0.2-0.1,0.3l-5,0l4.9-7.9c0.2-0.4,0.6-0.4,0.8-0.4s0.5,0,0.8,0.4l1.6,2.5   L9.1,18.1z M10.9,19l2-3.2l1-1.5c0,0,0,0,0,0l1.2-1.9c0.2-0.3,0.5-0.3,0.6-0.3c0.1,0,0.4,0,0.6,0.3l4.2,6.7H10.9z"/>
                        <path fill="currentColor" d="M15,5c0,1.7,1.3,3,3,3s3-1.3,3-3s-1.3-3-3-3S15,3.3,15,5z M19,5c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S19,4.4,19,5z"/>
                    </g>
                </svg>
            }
            {ULID === "all" ?
                <p className={c.text}>
                    {name}
                </p>
            :
                <Link
                    className={c.album_link}
                    aria-label={t("ariaLabel.goToAlbum", {name: name})}
                    to={`/album/${ULID}`}
                >
                    <span className={c.album_link_text}>{name}</span>
                </Link>
            }
        </button>
	)
}
