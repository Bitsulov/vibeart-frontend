import type React from "react";
import { setVisibility } from "../../modalWindow/model/modalSlice";
import type { Dispatch } from "@reduxjs/toolkit";

function regButtonHandler(e: React.MouseEvent, dispatch: Dispatch) {
    dispatch(setVisibility({ type: "reg", show: true }));
}

export { regButtonHandler };
