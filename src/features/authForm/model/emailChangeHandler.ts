import { setEmailValueSign } from "./authSlice";
import type React from "react";
import type { Dispatch } from "@reduxjs/toolkit";

function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch) {
    dispatch(setEmailValueSign(e.target.value));
}

export { emailChangeHandler };
