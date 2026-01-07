import type React from "react";
import { getNewNotice } from "../../notice/model/noticeSlice";
import type { Dispatch } from "@reduxjs/toolkit";

export function tagClickHandler(e: React.MouseEvent, dispatch: Dispatch, tag: string) {
    navigator.clipboard.writeText(tag);
    dispatch(getNewNotice(`Тег "${tag}" скопирован`));
}
