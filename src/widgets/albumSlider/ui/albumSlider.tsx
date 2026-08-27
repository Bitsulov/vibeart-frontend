import c from "./albumSlider.module.scss";
import type { AlbumType } from "entities/album";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";
import { AlbumSlide } from "features/albumSlide";
import { AlbumsSliderNavigationButton } from "features/albumsSliderNavigationButton";
import { AlbumAdd } from "features/albumAdd";
import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import { albumBreakpointsConfig } from "../config/albumBreakpointsConfig";
import { initSliderHandler } from "../model/initSliderHandler";
import { slideChangeHandler } from "../model/slideChangeHandler";
import { reachEndSwiperHandler } from "../model/checkReachEndHandler";

/** Свойства компонента {@link AlbumSlider}. */
interface AlbumSliderProps extends ComponentPropsWithoutRef<"section"> {
    /** Список альбомов для отображения в слайдере. */
    albumsList: AlbumType[];
    /** Функция обновления идентификатора выбранного альбома. */
    setSelectedAlbum: Dispatch<SetStateAction<string>>;
    /** UUID выбранного альбома. Специальное значение `"all"` означает «все публикации». */
    selectedAlbum: string;
    /** Функция загрузки следующей страницы альбомов, вызывается при приближении к концу списка. */
    onReachEnd?: () => void;
    /** UUID сообщества, от имени которого будет создан новый альбом через {@link AlbumAdd}. */
    communityUUID?: string;
    /** Признак отображения слайда добавления альбома. По умолчанию `true`. */
    isShowAddAlbum?: boolean;
}

/**
 * Горизонтальный слайдер альбомов на основе Swiper с кнопками навигации и слайдом создания альбома.
 *
 * Первым слайдом всегда отображается элемент «Все работы» с UUID `"all"`.
 * Последним — кнопка добавления нового альбома через {@link AlbumAdd}.
 * Кнопки навигации блокируются при достижении начала или конца слайдера.
 * Точки остановок слайдера задаются через {@link albumBreakpointsConfig}.
 * Вызывает `onReachEnd`, когда становится виден последний загруженный альбом.
 */
export const AlbumSlider = ({
    selectedAlbum,
    setSelectedAlbum,
    albumsList,
    onReachEnd = () => {},
    communityUUID,
    isShowAddAlbum = true,
    ...props
}: AlbumSliderProps) => {
    const { t } = useTranslation();

    const swiperRef = useRef<SwiperType>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        swiper.update();
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
        reachEndSwiperHandler(swiper, albumsList.length, onReachEnd);
    }, [albumsList, onReachEnd]);

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
                    onSwiper={swiper =>
                        initSliderHandler(swiper, swiperRef, setIsBeginning, setIsEnd)
                    }
                    onSlideChange={swiper =>
                        slideChangeHandler(
                            swiper,
                            setIsBeginning,
                            setIsEnd,
                            albumsList.length,
                            onReachEnd
                        )
                    }
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={albumBreakpointsConfig}
                    className={c.slider}
                >
                    <SwiperSlide
                        key="slide all"
                        aria-label={t("ariaLabel.chooseAll")}
                        className={c.slide}
                    >
                        <AlbumSlide
                            imageUrl=""
                            name={t("profile.albumAll")}
                            key="album all"
                            UUID="all"
                            aria-label={t("ariaLabel.chooseAll")}
                            setSelectedAlbum={setSelectedAlbum}
                            selectedAlbum={selectedAlbum}
                        />
                    </SwiperSlide>
                    {albumsList.map((album: AlbumType, i) => (
                        <SwiperSlide
                            key={`slide ${i}`}
                            aria-label={t("ariaLabel.chooseAlbum", { name: album.name })}
                            className={c.slide}
                        >
                            <AlbumSlide
                                imageUrl={album.imageUrl}
                                name={album.name}
                                key={album.UUID}
                                UUID={album.UUID}
                                setSelectedAlbum={setSelectedAlbum}
                                selectedAlbum={selectedAlbum}
                                ariaLabel={t("ariaLabel.chooseAlbum", {
                                    name: album.name
                                })}
                            />
                        </SwiperSlide>
                    ))}
                    {isShowAddAlbum && (
                        <SwiperSlide className={c.slide}>
                            <AlbumAdd communityUUID={communityUUID} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </section>
    );
};
