import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

/**
 * Скрывает подсказку, сбрасывая её текст.
 * @param dispatch - Redux dispatch
 */
export function hideHint(dispatch: Dispatch) {
    dispatch(setText(""));
}
