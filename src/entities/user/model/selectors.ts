import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "app/store";

export const selectUser = (state: RootState) => state.user;
export const selectUserInfo = createSelector([selectUser], user => {
    return {
        id: user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        fullName: `${user.firstName} ${user.secondName}`,
        srcImg: user.srcImg,
        userName: user.userName,
        description: user.description,
        subcribers: user.subcribers,
        subcribes: user.subcribes,
        works: user.works,
        status: user.status
    };
});
