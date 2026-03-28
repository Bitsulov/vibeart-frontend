import React from "react";

export function toggleLikeHandler(
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    isLiked: boolean,
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
) {
    if(isLiked) {
        setLikes(state => state - 1);
        setIsLiked(false);
    } else {
        setLikes(state => state + 1);
        setIsLiked(true);
    }
}
