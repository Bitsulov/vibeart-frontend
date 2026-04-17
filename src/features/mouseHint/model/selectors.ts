import type {RootState} from "app/store";

/** Возвращает текущий текст подсказки мыши. */
export const selectText = (state: RootState) => state.hint.text;
