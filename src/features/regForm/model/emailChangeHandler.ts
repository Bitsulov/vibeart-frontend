import type React from "react";
import { setEmailValueReg } from "./regSlice";
import type { Dispatch } from "@reduxjs/toolkit";

function emailChangeHandler(e: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch) {
    dispatch(setEmailValueReg(e.target.value));
}

export { emailChangeHandler };
