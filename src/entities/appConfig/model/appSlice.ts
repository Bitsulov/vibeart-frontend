import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {AppConfigType, ServerStatusType} from "../lib/types";

const initialState: AppConfigType = {
    currentLanguage: "ru",
    serverStatus: "good",
    unreadChatsCount: 0,
    unreadNotificationsCount: 0
}

/** Redux-слайс для управления глобальной конфигурацией приложения. */
export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        /** Устанавливает текущий язык интерфейса. */
        setLanguage(state, action ) {
            state.currentLanguage = action.payload;
        },

        /** Устанавливает статус сервера. */
        setServerStatus(state, action: PayloadAction<ServerStatusType>) {
            state.serverStatus = action.payload;
        },

        /** Устанавливает количество непрочитанных сообщений в чатах. */
        setUnreadChatsCount(state, action: PayloadAction<number>) {
            state.unreadChatsCount = action.payload;
        },

        /** Устанавливает количество непрочитанных уведомлений. */
        setUnreadNotificationsCount(state, action: PayloadAction<number>) {
            state.unreadNotificationsCount = action.payload;
        }
    }
});

export const {setLanguage, setServerStatus, setUnreadNotificationsCount, setUnreadChatsCount} = appSlice.actions;

export const appReducer = appSlice.reducer;
