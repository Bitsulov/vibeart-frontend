import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    text: ""
}

export const hintSlice = createSlice({
    name: "hint",
    initialState,
    reducers: {
        setText: (state, action) => {
            state.text = action.payload;
        }
    }
})

export const {setText} = hintSlice.actions;

export const hintReducer = hintSlice.reducer;
