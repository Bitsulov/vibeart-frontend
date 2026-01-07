import React, { useState } from "react";
import classes from "./shareButton.module.scss";
import { shareHandler } from "../model/shareHandler";
import { parseNumber } from "shared/lib/parseNumber";

interface ShareButtonType {
    count: number;
    onClick?: React.MouseEventHandler;
}

const ShareButton = ({ count, onClick = () => {}, ...props }: ShareButtonType) => {
    const [countInner, setCountInner] = useState(count);

    return (
        <button className={classes.shareButton} onClick={e => shareHandler(e, setCountInner, onClick)} {...props}>
            <svg
                className={classes.shareImg}
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="351.000000pt"
                height="257.000000pt"
                viewBox="0 0 351.000000 257.000000"
                preserveAspectRatio="xMidYMid meet"
            >
                <g transform="translate(0.000000,257.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                    <path
                        d="M2151 2549 c-43 -17 -78 -48 -97 -86 -15 -32 -19 -71 -24 -233 l-5
						-195 -340 -6 c-351 -7 -418 -13 -578 -59 -479 -134 -864 -504 -1021 -977 -59
						-178 -68 -244 -73 -560 -5 -285 -5 -293 17 -337 27 -57 108 -102 164 -92 67
						13 97 45 163 170 83 157 158 261 273 376 208 208 451 338 750 401 93 20 136
						22 375 23 l270 1 6 -170 c6 -180 12 -207 61 -251 37 -35 63 -44 120 -44 37 0
						64 7 89 23 20 12 291 228 602 481 535 434 567 461 588 510 19 45 20 56 10 94
						-6 24 -19 54 -27 68 -19 28 -1149 839 -1200 860 -38 16 -88 17 -123 3z m635
						-541 c310 -222 565 -408 568 -414 2 -6 1 -15 -2 -21 -7 -9 -1108 -903 -1131
						-917 -6 -4 -18 -2 -26 4 -12 10 -15 44 -15 172 0 177 -7 207 -59 251 -54 45
						-93 50 -371 44 -194 -4 -283 -10 -370 -25 -502 -89 -926 -406 -1154 -861 -33
						-64 -51 -90 -58 -83 -17 17 -4 552 16 637 42 179 120 360 218 503 68 98 210
						243 314 319 102 75 255 154 373 193 175 57 226 63 616 69 348 6 361 7 395 28
						20 12 46 40 58 61 20 37 22 52 22 225 0 102 3 192 6 201 3 9 13 16 22 16 8 0
						269 -181 578 -402z"
                    />
                </g>
            </svg>
            {parseNumber(countInner)}
        </button>
    );
};

export { ShareButton };
