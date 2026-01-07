import type React from "react";
import { setIsFooterLinksOpen, setFooterLinksHeight } from "./footerLinksSlice";
import type { Dispatch } from "@reduxjs/toolkit";

type FooterLinksHeightType = number | string | null;
type OpenFooterLinksHeightType = number | null;

const toggleLinksHandler = (
    e: React.MouseEvent,
    dispatch: Dispatch,
    footerLinksHeight: FooterLinksHeightType,
    OPENFOOTERLINKSHEIGHT: OpenFooterLinksHeightType
) => {
    if (!footerLinksHeight || footerLinksHeight === "0px") {
        dispatch(setIsFooterLinksOpen(true));
        dispatch(setFooterLinksHeight(OPENFOOTERLINKSHEIGHT));
    } else {
        dispatch(setIsFooterLinksOpen(false));
        dispatch(setFooterLinksHeight(0));
    }
};

export { toggleLinksHandler };
