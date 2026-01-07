import { setPasswordValueSign } from "./authSlice";
import type React from "react";
import type { Dispatch } from "@reduxjs/toolkit";

function passwordChangeHandler(e: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch) {
    dispatch(setPasswordValueSign(e.target.value));
}

export { passwordChangeHandler };
