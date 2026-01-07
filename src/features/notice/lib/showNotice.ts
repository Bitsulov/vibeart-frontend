import type { Dispatch } from "@reduxjs/toolkit";
import { setClassesNotice, setShowNotice } from "../model/noticeSlice";
import classes from "../ui/notice.module.scss";

export function showNoticeFunc(dispatch: Dispatch) {
    dispatch(setClassesNotice(`${classes.notice} ${classes.noticeShow}`));
    dispatch(setShowNotice(true));
    setTimeout(() => {
        dispatch(setClassesNotice(`${classes.notice} ${classes.noticeHide}`));
        setTimeout(() => {
            dispatch(setClassesNotice(classes.notice));
            dispatch(setShowNotice(false));
        }, 1000);
    }, 9000);
}
