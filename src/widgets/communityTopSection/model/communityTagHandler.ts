import { getNewNotice } from "features/notice/model/noticeSlice";
import type React from "react";
import type { Dispatch } from "@reduxjs/toolkit";

export function communityTagClickHandler(e: React.MouseEvent, dispatch: Dispatch, userName: string) {
    navigator.clipboard.writeText(`@${userName}`);
    dispatch(getNewNotice("Тег пользователя cкопирован"));
}
