import React, { type SetStateAction } from "react";
import type { UseFormReset } from "react-hook-form";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { IPasswordChangeForm } from "../lib/types";

export function confirmPasswordSuccessHandler(
    setIsPasswordSent: React.Dispatch<SetStateAction<boolean>>,
    resetPasswordForm: UseFormReset<IPasswordChangeForm>,
    setErrorCode: React.Dispatch<SetStateAction<boolean>>,
    dispatch: Dispatch
) {
    setErrorCode(false);
    resetPasswordForm();
    setIsPasswordSent(false);

    dispatch(showToast({ message: "api.confirmPasswordChangeAccess", type: "success" }));
}
