import type {RootState} from "app/store";

export const selectCurrentToast = (state: RootState) => state.toast.queue[0] ?? null;
