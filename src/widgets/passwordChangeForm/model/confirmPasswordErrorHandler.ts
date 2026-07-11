import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";

export function confirmPasswordErrorHandler(
    error: AxiosError<AppError>,
    dispatch: Dispatch
) {
    switch (error.response?.data.statusCode) {
        case 404:
            dispatch(
                showToast({
                    message: "api.userNotFound",
                    type: "error"
                })
            );
            break;
        case 410:
            dispatch(
                showToast({
                    message: "api.codeExpired",
                    type: "error"
                })
            );
            break;
        case 400:
            dispatch(
                showToast({
                    message: "api.invalidCode",
                    type: "error"
                })
            );
            break;
        case 403:
            dispatch(
                showToast({
                    message: "api.forbiddenError",
                    type: "error"
                })
            );
            break;
        case 500:
            dispatch(
                showToast({
                    message: "api.serverError",
                    type: "error"
                })
            );
            break;
        default:
            dispatch(
                showToast({
                    message: "api.unknownError",
                    type: "error"
                })
            );
    }
}
