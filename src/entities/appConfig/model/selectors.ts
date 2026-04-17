import type {RootState} from "app/store";

/** Возвращает текущий код языка интерфейса. */
export const selectCurrentLanguage = (state: RootState) => state.app.currentLanguage;

/** Возвращает текущий статус сервера. */
export const selectServerStatus = (state: RootState) => state.app.serverStatus;

/** Возвращает количество непрочитанных сообщений в чатах. */
export const selectUnreadChatsCount = (state: RootState) => state.app.unreadChatsCount;

/** Возвращает количество непрочитанных уведомлений. */
export const selectUnreadNotificationsCount = (state: RootState) => state.app.unreadNotificationsCount;
