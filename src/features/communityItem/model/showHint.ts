import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

/**
 * Показывает подсказку с переданным текстом.
 * @param dispatch - Redux dispatch
 * @param text - текст подсказки
 */
export function showHint(dispatch: Dispatch, text: string) {
    dispatch(setText(text));
}
