import {createSlice} from "@reduxjs/toolkit";
import type {AppConfigType} from "../lib/types";

const initialState: AppConfigType = {
    currentLanguage: "ru",
    serverStatus: "good",
}

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setLanguage(state, action ) {
            state.currentLanguage = action.payload;
        },

        setServerStatus(state, action) {
            state.serverStatus = action.payload;
        }
    }
});

export const {setLanguage, setServerStatus} = appSlice.actions;

export const appReducer = appSlice.reducer;
