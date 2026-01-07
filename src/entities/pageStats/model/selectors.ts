import type { RootState } from "app/store";

export const selectIsLoaded = (state: RootState) => state.pageStats.isLoaded;
