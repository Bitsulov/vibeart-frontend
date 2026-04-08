import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

export function showHint(dispatch: Dispatch, text: string) {
    dispatch(setText(text));
}
