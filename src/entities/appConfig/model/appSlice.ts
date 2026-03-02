import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentLanguage: "ru",
}

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setLanguage(state, action ) {
            state.currentLanguage = action.payload;
        }
    }
});

export const {setLanguage} = appSlice.actions;

export const appReducer = appSlice.reducer;
