import type { Dispatch } from "@reduxjs/toolkit";
import { setIsLoaded } from "../model/pageStatsSlice";

export function setStatusPage(dispatch: Dispatch) {
	dispatch(setIsLoaded(true));
}
