import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

export function hideHint(dispatch: Dispatch) {
    dispatch(setText(""));
}
