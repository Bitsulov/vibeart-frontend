import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "entities/user";
import {appReducer} from "entities/appConfig";
import {hintReducer} from "features/mouseHint";
import {ToastReducer} from "features/toast/model/toastSlice";

/** Корневой редьюсер. */
export const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    hint: hintReducer,
    toast: ToastReducer,
});
