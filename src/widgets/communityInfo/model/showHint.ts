import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

/** Показывает подсказку мыши с переданным текстом через Redux. */
export function showHint(dispatch: Dispatch, text: string) {
    dispatch(setText(text));
}
