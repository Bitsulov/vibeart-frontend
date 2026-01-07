import type { RootState } from "app/store";

export const selectIsNewNotice = (state: RootState) => state.notice.isNewNotice;
export const selectNoticeMessage = (state: RootState) => state.notice.noticeMessageNew;
export const selectShowNotice = (state: RootState) => state.notice.showNotice;
export const selectCurrentMessageNotice = (state: RootState) => state.notice.currentMessageNotice;
export const selectClassesNotice = (state: RootState) => state.notice.classesNotice;
export const selectNoticesQueue = (state: RootState) => state.notice.noticesQueue;
