import {type LucideIcon, Trash2} from "lucide-react";
import {t} from "i18next";
import {deleteChatClickHandler} from "../model/deleteChatClickHandler";
import React from "react";

/** Пункты выпадающего списка настроек чата. */
export const chatOptionsConfig: {
    icon: LucideIcon;
    text: () => string;
    color: () => string;
    ariaLabel?: () => string;
    onClick: (setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>) => void;
}[] = [
    {
        icon: Trash2,
        text: () => t("chat.delete"),
        ariaLabel: () => t("ariaLabel.deleteChat"),
        color: () => getComputedStyle(document.documentElement).getPropertyValue("--negative-active").trim() || "#C40000",
        onClick: (setIsShowModal) => deleteChatClickHandler(setIsShowModal)
    }
];
