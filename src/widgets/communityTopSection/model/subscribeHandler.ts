import type { Dispatch } from "@reduxjs/toolkit";
import { getNewNotice } from "features/notice/model/noticeSlice";
import type React from "react";

export function subscribeHandler(e: React.MouseEvent, isSubscribe: boolean, setIsSubscribe: React.Dispatch<React.SetStateAction<boolean>>, userName: string, dispatch: Dispatch) {
	if(isSubscribe) {
		dispatch(getNewNotice(`Вы отписались от пользователя ${userName}`));
	} else {
		dispatch(getNewNotice(`Вы подписались на пользователя ${userName}`));
	}
	setIsSubscribe(state => !state);
}
