import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "entities/user";
import {appReducer} from "entities/appConfig";
import {hintReducer} from "features/mouseHint";

/** Корневой редьюсер. */
export const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    hint: hintReducer,
});
