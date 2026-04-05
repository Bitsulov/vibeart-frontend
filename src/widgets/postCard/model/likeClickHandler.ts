import React from "react";

export function likeClickHandler(
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    isLiked: boolean,
    setIsLiked: React.Dispatch<React.SetStateAction<boolean>>
) {
    setIsLiked(!isLiked);
    setLikes(likes => isLiked ? likes - 1 : likes + 1);
}
