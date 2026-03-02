import {combineReducers} from "@reduxjs/toolkit";
import {userReducer} from "entities/user";
import {appReducer} from "entities/appConfig";

export const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
});
