import type { Dispatch } from "@reduxjs/toolkit";
import { setIsBurgerOpen, setBurgerLinksHeight } from "./burgerSlice";
import type React from "react";

type BurgerLinksHeightType = number | string | null;
type BurgerOpenLinksHeightType = number | null;

function toggleBurgerHandler(
    e: React.MouseEvent,
    dispatch: Dispatch,
    burgerLinksHeight: BurgerLinksHeightType,
    BURGEROPENLINKSHEIGHT: BurgerOpenLinksHeightType
) {
    if (!burgerLinksHeight || burgerLinksHeight === "0px") {
        dispatch(setIsBurgerOpen(true));
        dispatch(setBurgerLinksHeight(BURGEROPENLINKSHEIGHT));
    } else {
        dispatch(setIsBurgerOpen(false));
        dispatch(setBurgerLinksHeight(0));
    }
}

export { toggleBurgerHandler };
