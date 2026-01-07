import { getNewNotice } from "features/notice/model/noticeSlice";
import type { Dispatch } from "@reduxjs/toolkit";
import type React from "react";

export function toggleSubscribeHandler(
    e: React.MouseEvent,
    dispatch: Dispatch,
    isSubscribe: boolean,
    setIsSubscribe: React.Dispatch<React.SetStateAction<boolean>>,
    userName: string
) {
    if (isSubscribe) {
        dispatch(getNewNotice(`Вы отписались от пользователя ${userName}`));
    } else {
        dispatch(getNewNotice(`Вы подписались на пользователя ${userName}`));
    }
    setIsSubscribe(state => !state);
}
