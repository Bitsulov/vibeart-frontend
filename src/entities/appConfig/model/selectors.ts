import type {RootState} from "app/store";

export const selectCurrentLanguage = (state: RootState) => state.app.currentLanguage;
