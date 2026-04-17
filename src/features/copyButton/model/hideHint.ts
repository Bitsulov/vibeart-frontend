import type {Dispatch} from "@reduxjs/toolkit";
import {setText} from "features/mouseHint";

/**
 * Скрывает подсказку мыши, сбрасывая текст в Redux.
 *
 * @param dispatch - Функция диспатча Redux.
 */
export function hideHint(dispatch: Dispatch) {
    dispatch(setText(""));
}
