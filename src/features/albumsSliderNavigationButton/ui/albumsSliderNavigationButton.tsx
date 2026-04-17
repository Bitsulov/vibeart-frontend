import c from "./albumsSliderNavigationButton.module.scss";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useTranslation} from "react-i18next";
import React, {type RefObject} from "react";
import type Swiper from "swiper";
import {slideHandler} from "../model/slideHandler";

interface AlbumsSliderNavigationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    direction: "right" | "left";
    imgClassName?: string;
    swiperRef: RefObject<Swiper | null>
}

/**
 * Кнопка навигации слайдера альбомов.
 *
 * @param swiperRef - Ref-ссылка на экземпляр Swiper для управления слайдером.
 * @param imgClassName - Дополнительный CSS-класс для иконки стрелки.
 */
export const AlbumsSliderNavigationButton = ({ swiperRef, direction, className = "", imgClassName, ...props }: AlbumsSliderNavigationButtonProps) => {
    const { t } = useTranslation();

	return (
        <>
            {direction === "right" ?
                <button onClick={() => slideHandler(swiperRef, direction)} aria-label={t("ariaLabel.slideRight")} className={`${c.button} ${className}`}>
                    <ChevronRight width="12.5" height="25" className={`${c.navigation_img} ${imgClassName}`} />
                </button>
            :
                <button onClick={() => slideHandler(swiperRef, direction)} aria-label={t("ariaLabel.slideLeft")} className={`${c.button} ${className}`} {...props}>
                    <ChevronLeft width="12.5" height="25" className={`${c.navigation_img} ${imgClassName}`} />
                </button>
            }
        </>
	)
}
