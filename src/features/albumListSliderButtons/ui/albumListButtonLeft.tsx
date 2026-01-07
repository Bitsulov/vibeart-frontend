import React, { forwardRef } from "react";
import classes from "./albumListButtons.module.scss";
import { slideLeft } from "../model/clickHandlers";
import type Swiper from "swiper";

interface AlbumListButtonLeftProps {
    swiperRef: React.RefObject<Swiper | null>;
}

const AlbumListButtonLeft = forwardRef(
    ({ swiperRef, ...props }: AlbumListButtonLeftProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
        return (
            <button ref={ref} onClick={e => slideLeft(e, swiperRef)} {...props}>
                <svg
                    className={`${classes.arrowImg} ${classes.arrowImgLeft}`}
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="512.000000pt"
                    height="512.000000pt"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#000000"
                        stroke="none"
                    >
                        <path
                            d="M3543 5106 c-23 -7 -56 -23 -75 -34 -18 -12 -560 -549 -1204 -1194
					-1076 -1077 -1173 -1177 -1188 -1222 -20 -63 -20 -129 0 -192 15 -45 113 -146
					1193 -1228 1045 -1047 1183 -1181 1236 -1207 77 -37 139 -38 215 -3 70 32 270
					226 307 298 36 71 41 146 13 221 -22 58 -56 94 -999 1038 l-976 977 972 973
					c1062 1062 1023 1018 1023 1134 0 99 -27 145 -162 280 -131 130 -178 160 -266
					168 -26 3 -66 -1 -89 -9z"
                        />
                    </g>
                </svg>
            </button>
        );
    }
);

export { AlbumListButtonLeft };
