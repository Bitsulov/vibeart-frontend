import type { Dispatch } from "@reduxjs/toolkit";
import { setVisibility } from "features/modalWindow/model/modalSlice";
import type React from "react";

export function openMoreInfoHandler(e: React.MouseEvent, dispatch: Dispatch) {
	dispatch(setVisibility({type: "communityInfo", show: true}));
}
