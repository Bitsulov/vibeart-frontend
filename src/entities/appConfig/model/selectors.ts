import type {RootState} from "app/store";

export const selectCurrentLanguage = (state: RootState) => state.app.currentLanguage;
export const selectServerStatus = (state: RootState) => state.app.serverStatus;
export const selectUnreadChatsCount = (state: RootState) => state.app.unreadChatsCount;
export const selectUnreadNotificationsCount = (state: RootState) => state.app.unreadNotificationsCount;
