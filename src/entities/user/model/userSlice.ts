import {createSlice} from "@reduxjs/toolkit";
import type {UserType} from "../lib/types";

const initialState: UserType = {
    id: 0,
    ULID: "",
    email: "",
    name: "",
    tag: "",
    description: "",
    worksCount: 0,
    subscribersCount: 0,
    subscribesCount: 0,
    albumList: [],
    createdAt: new Date().toISOString(),
    trustStatus: "trust",
    isBlocked: false,
    onlineStatus: "offline",
    role: "user",
    avatarUrl: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserInfo(state, action) {
            if(action.payload.id !== undefined) state.id = action.payload.id;
            if(action.payload.ULID !== undefined) state.ULID = action.payload.ULID;
            if(action.payload.email !== undefined) state.email = action.payload.email;
            if(action.payload.name !== undefined) state.name = action.payload.name;
            if(action.payload.tag !== undefined) state.tag = action.payload.tag;
            if(action.payload.description !== undefined) state.description = action.payload.description;
            if(action.payload.worksCount !== undefined) state.worksCount = action.payload.worksCount;
            if(action.payload.subscribersCount !== undefined) state.subscribersCount = action.payload.subscribersCount;
            if(action.payload.subscribesCount !== undefined) state.subscribesCount = action.payload.subscribesCount;
            if(action.payload.albumList !== undefined) state.albumList = action.payload.albumList;
            if(action.payload.createdAt !== undefined) state.createdAt = action.payload.createdAt;
            if(action.payload.trustStatus !== undefined) state.trustStatus = action.payload.trustStatus;
            if(action.payload.isBlocked !== undefined) state.isBlocked = action.payload.isBlocked;
            if(action.payload.onlineStatus !== undefined) state.onlineStatus = action.payload.onlineStatus;
            if(action.payload.role !== undefined) state.role = action.payload.role;
            if(action.payload.avatarUrl !== undefined) state.avatarUrl = action.payload.avatarUrl;
        }
    }
})

export const {setUserInfo} = userSlice.actions;

export const userReducer = userSlice.reducer;
