import type { Dispatch } from "@reduxjs/toolkit";
import { setVisibility } from "../../modalWindow/model/modalSlice";
import type React from "react";

function authButtonHandler(e: React.MouseEvent, dispatch: Dispatch) {
    dispatch(setVisibility({ type: "sign", show: true }));
}

export { authButtonHandler };
