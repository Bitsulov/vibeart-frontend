import type {RootState} from "app/store";

export const selectText = (state: RootState) => state.hint.text;
