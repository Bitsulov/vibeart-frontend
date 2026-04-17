import c from "./albumSlider.module.scss";
import type {AlbumType} from "entities/album";
import {Swiper, SwiperSlide} from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import 'swiper/css/navigation';
import {useTranslation} from "react-i18next";
import {AlbumSlide} from "features/albumSlide";
import {AlbumsSliderNavigationButton} from "features/albumsSliderNavigationButton";
import {AlbumAdd} from "features/albumAdd";
import React, {useRef, useState} from "react";
import clsx from "clsx";
import {albumBreakpointsConfig} from "../config/albumBreakpointsConfig";
import {initSliderHandler} from "../model/initSliderHandler";
import {slideChangeHandler} from "../model/slideChangeHandler";

interface AlbumSliderProps {
    albumsList: AlbumType[];
    setSelectedAlbum: React.Dispatch<React.SetStateAction<string>>;
    selectedAlbum: string
}

/** Горизонтальный Swiper-слайдер альбомов с кнопками навигации и кнопкой создания альбома.
 * 
 * @param albumsList - Список альбомов.
 * @param selectedAlbum - Идентификатор выбранного альбома или `all` - Все работы.
 * @param setSelectedAlbum - Сеттер выбранного альбома.
 * */
export const AlbumSlider = ({
    selectedAlbum,
    setSelectedAlbum,
    albumsList,
    ...props
}: AlbumSliderProps) => {
    const { t } = useTranslation();

    const swiperRef = useRef<SwiperType>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

	return (
		<section className={c.albums} {...props}>
            <h2 className={c.title}>{t("profile.albums")}</h2>
            <div className={c.slider_wrapper}>
                <AlbumsSliderNavigationButton
                    swiperRef={swiperRef}
                    className={clsx(c.slide_left, isBeginning && c.disabled)}
                    imgClassName={c.slide_img}
                    direction="left"
                />
                <AlbumsSliderNavigationButton
                    swiperRef={swiperRef}
                    className={clsx(c.slide_right, isEnd && c.disabled)}
                    imgClassName={c.slide_img}
                    direction="right"
                />
                <Swiper
                    onSwiper={(swiper) => initSliderHandler(swiper, swiperRef, setIsBeginning, setIsEnd)}
                    onSlideChange={(swiper) => slideChangeHandler(swiper, setIsBeginning, setIsEnd)}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={albumBreakpointsConfig}
                    className={c.slider}
                >
                    <SwiperSlide key="slide all" aria-label={t("ariaLabel.chooseAll")} className={c.slide}>
                        <AlbumSlide
                            imageUrl=""
                            name={t("profile.albumAll")}
                            key="album all"
                            ULID="all"
                            aria-label={t("ariaLabel.chooseAll")}
                            setSelectedAlbum={setSelectedAlbum}
                            selectedAlbum={selectedAlbum}
                        />
                    </SwiperSlide>
                    {albumsList.map((album: AlbumType, i) => (
                        <SwiperSlide
                            key={`slide ${i}`}
                            aria-label={t("ariaLabel.chooseAlbum", {name: album.name})}
                            className={c.slide}
                        >
                            <AlbumSlide
                                imageUrl={album.imageUrl}
                                name={album.name}
                                key={album.ULID}
                                ULID={album.ULID}
                                setSelectedAlbum={setSelectedAlbum}
                                selectedAlbum={selectedAlbum}
                                ariaLabel={t("ariaLabel.chooseAlbum", {name: album.name})}
                            />
                        </SwiperSlide>
                    ))}
                    <SwiperSlide className={c.slide}>
                        <AlbumAdd />
                    </SwiperSlide>
                </Swiper>
            </div>
		</section>
	)
}
