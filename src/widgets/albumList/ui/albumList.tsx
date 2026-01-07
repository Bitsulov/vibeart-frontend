import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import classes from "./albumList.module.scss";
import { AlbumItem } from "features/albumItem";
import { AlbumListButtonLeft, AlbumListButtonRight } from "features/albumListSliderButtons";
import type { AlbumType } from "entities/album";

interface AlbumListType {
    albumList: AlbumType[];
    selectedAlbum: number;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<number>>;
}

const AlbumList = ({ albumList, selectedAlbum, setSelectedAlbum, ...props }: AlbumListType) => {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className={classes.posts__albums} {...props}>
            <AlbumListButtonLeft ref={prevRef} swiperRef={swiperRef} />
            <Swiper
                spaceBetween={10}
                slidesPerView="auto"
                // onSlideChange={() => {}}
                className={classes.swiperAlbums}
                navigation={{
                    nextEl: nextRef.current,
                    prevEl: prevRef.current
                }}
                onSwiper={swiper => {
                    swiperRef.current = swiper;
                }}
                // onBeforeInit={(swiper) => {
                // 	swiperRef.current = swiper;
                // }}
            >
                {albumList.map(album => {
                    return (
                        <SwiperSlide className={classes.slideAlbum} key={`slide${album.id}`}>
                            <AlbumItem
                                id={album.id}
                                name={album.name}
                                key={`album${album.id}`}
                                isActive={selectedAlbum === album.id}
                                setSelectedAlbum={setSelectedAlbum}
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <AlbumListButtonRight ref={nextRef} swiperRef={swiperRef} />
        </div>
    );
};

export { AlbumList };
