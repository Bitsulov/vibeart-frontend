import type { UseFormSetValue } from "react-hook-form";
import type { ISettingsForm } from "../lib/types";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import type { QueryClient } from "@tanstack/react-query";
import { setUserInfo, type UserResponse } from "entities/user";
import type { AxiosResponse } from "axios";

export function updateUserSuccessHandler(
    response: AxiosResponse<UserResponse>,
    setValue: UseFormSetValue<ISettingsForm>,
    dispatch: Dispatch,
    queryClient: QueryClient,
    UUID?: string
) {
    setValue("avatar", "");
    setValue("title", "");
    setValue("description", "");
    setValue("id", "");

    const data = response.data;

    if (UUID) {
        queryClient.invalidateQueries({ queryKey: [`user ${UUID}`] });
    }
    dispatch(
        setUserInfo({
            name: data.name,
            username: data.username,
            avatarUrl: data.avatarUrl
        })
    );
    dispatch(showToast({ message: "api.userDataUpdated", type: "success" }));
}
