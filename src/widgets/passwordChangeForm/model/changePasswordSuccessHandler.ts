import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { UseFormSetValue } from "react-hook-form";
import type { IPasswordChangeForm } from "../lib/types";
import React, { type SetStateAction } from "react";

export function changePasswordSuccessHandler(
    setValue: UseFormSetValue<IPasswordChangeForm>,
    setIsPasswordSent: React.Dispatch<SetStateAction<boolean>>,
    email: string,
    dispatch: Dispatch
) {
    setIsPasswordSent(true);
    setValue("oldPassword", "");
    setValue("newPassword", "");
    setValue("confirmNewPassword", "");

    dispatch(
        showToast({
            message: "api.registerAccess",
            type: "success",
            params: { email: email }
        })
    );
}
