import {createSlice, nanoid, type PayloadAction} from "@reduxjs/toolkit";

export interface ToastItem {
    id: string;
    message: string;
    type: "success" | "error";
}

interface ToastState {
    queue: ToastItem[];
}

const initialState: ToastState = {
    queue: [],
};

export const ToastSlice = createSlice({
    name: "Toast",
    initialState,
    reducers: {
        showToast: {
            reducer(state, action: PayloadAction<ToastItem>) {
                const isDuplicate = state.queue.some(
                    t => t.message === action.payload.message && t.type === action.payload.type
                );
                if (!isDuplicate) {
                    state.queue.push(action.payload);
                }
            },
            prepare(payload: Omit<ToastItem, "id">) {
                return {payload: {...payload, id: nanoid()}};
            },
        },
        hideToast(state) {
            state.queue.splice(0, 1);
        },
    },
});

export const {showToast, hideToast} = ToastSlice.actions;

export const ToastReducer = ToastSlice.reducer;
