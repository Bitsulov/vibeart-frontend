import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {AppConfigType, ServerStatusType} from "../lib/types";

const initialState: AppConfigType = {
    currentLanguage: "ru",
    serverStatus: "good",
    unreadChatsCount: 0,
    unreadNotificationsCount: 0
}

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setLanguage(state, action ) {
            state.currentLanguage = action.payload;
        },

        setServerStatus(state, action: PayloadAction<ServerStatusType>) {
            state.serverStatus = action.payload;
        },

        setUnreadChatsCount(state, action: PayloadAction<number>) {
            state.unreadChatsCount = action.payload;
        },

        setUnreadNotificationsCount(state, action: PayloadAction<number>) {
            state.unreadNotificationsCount = action.payload;
        }
    }
});

export const {setLanguage, setServerStatus, setUnreadNotificationsCount, setUnreadChatsCount} = appSlice.actions;

export const appReducer = appSlice.reducer;
