import type { RootState } from "app/store";

export const selectSearchText = (state: RootState) => state.headerForm.searchText;
