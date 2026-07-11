import type { NavigateFunction } from "react-router-dom";
import type { Dispatch } from "@reduxjs/toolkit";
import { showToast } from "features/toast";
import React, { type SetStateAction } from "react";
import { setUserInfo } from "entities/user";
import { clearCookiesTokens } from "shared/lib/clearCookiesTokens";

export function deleteUserSuccessHandler(
    navigate: NavigateFunction,
    dispatch: Dispatch,
    setIsShowModal: React.Dispatch<SetStateAction<boolean>>
) {
    setIsShowModal(false);
    dispatch(
        setUserInfo({
            UUID: "",
            email: "",
            name: "",
            username: "",
            trustStatus: "TRUST",
            isAuthenticated: false,
            isBlocked: false,
            role: "USER",
            avatarUrl: "",
            accessToken: "",
            refreshToken: "",
            accessTokenExpiresIn: 0,
            refreshTokenExpiresIn: 0
        })
    );
    clearCookiesTokens();
    dispatch(showToast({ message: "api.deleteUserSuccess", type: "success" }));
    navigate("/");
}
