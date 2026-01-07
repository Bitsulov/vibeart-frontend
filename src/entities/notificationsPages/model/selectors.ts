import type { RootState } from "app/store";

const selectNotificationsPageNotices = (state: RootState) => state.notificationsPages.notifications;
const selectMessagesPageNotices = (state: RootState) => state.notificationsPages.messages;

export { selectNotificationsPageNotices, selectMessagesPageNotices };
