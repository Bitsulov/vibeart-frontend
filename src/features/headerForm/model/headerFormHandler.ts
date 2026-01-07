import type React from "react";
import { setSearchText } from "./headerFormSlice";
import type { Dispatch } from "@reduxjs/toolkit";
import type { NavigateFunction } from "react-router-dom";

function headerFormHandler(
    e: React.FormEvent<HTMLFormElement>,
    dispatch: Dispatch,
    searchText: string,
    navigate: NavigateFunction
) {
    e.preventDefault();
    if (searchText.trim() !== "") {
        dispatch(setSearchText(""));
        navigate(`/gallery?search=${searchText}`);
    }
}

export { headerFormHandler };
