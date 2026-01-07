import React, { useEffect, useState } from "react";
import classes from "./likeButton.module.scss";
import { likeHandler } from "../model/likeHandler";
import { parseNumber } from "shared/lib/parseNumber";

interface LikeButtonType {
    count: number;
    isLiked?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const LikeButton = ({ count, isLiked = false, onClick, ...props }: LikeButtonType) => {
    const [countInner, setCountInner] = useState(count);
    const [isLikedInner, setIsLikedInner] = useState(isLiked);

    useEffect(() => {
        setCountInner(count);
        setIsLikedInner(isLiked);
    }, [isLiked, count]);

    return (
        <button
            className={classes.likeButton}
            onClick={e => likeHandler(e, setCountInner, isLikedInner, setIsLikedInner, onClick)}
            {...props}
        >
            <svg
                className={isLikedInner ? `${classes.likeImg} ${classes.likeActive}` : classes.likeImg}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {parseNumber(countInner)}
        </button>
    );
};

export { LikeButton };
