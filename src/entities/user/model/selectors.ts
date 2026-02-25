import type {UserType} from "../lib/types";
import type {RootState} from "app/store";
import {createSelector} from "@reduxjs/toolkit";

export const selectUser = (state: RootState): UserType => state.user;
export const selectUserInfo = createSelector([selectUser], user => {
    return {
        id: user.id,
        ULID: user.ULID,
        email: user.email,
        name: user.name,
        tag: user.tag,
        description: user.description,
        worksCount: user.worksCount,
        subscribersCount: user.subscribersCount,
        subscribesCount: user.subscribesCount,
        albumList: user.albumList,
        createdAt: user.createdAt,
        trustStatus: user.trustStatus,
        isBlocked: user.isBlocked,
        onlineStatus: user.onlineStatus,
        role: user.role,
        avatarUrl: user.avatarUrl
    };
});
