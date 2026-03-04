import c from "./burgerButton.module.scss";
import clsx from "clsx";
import {burgerButtonClickHandler} from "../model/burgerButtonClickHandler";
import {useTranslation} from "react-i18next";
import React from "react";

interface BurgerButtonProps {
    imageUrl: string;
    isAuthenticated: boolean;
    name: string;
    isBurgerOpen: boolean;
    setIsBurgerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BurgerButton = ({
     imageUrl,
     name,
     isAuthenticated,
     isBurgerOpen,
     setIsBurgerOpen,
     ...props
}: BurgerButtonProps) => {
    const { t } = useTranslation();

	return (
        <button
            className={clsx(c.button_burger, isBurgerOpen && c.open)}
            aria-expanded={isBurgerOpen}
            aria-controls="burgerMenu"
            aria-label={t("ariaLabel.openBurgerMenu")}
            onClick={() => burgerButtonClickHandler(setIsBurgerOpen)}
            {...props}
        >
            <span className={c.button_burger_line} aria-hidden="true"></span>
            <span className={c.button_burger_line} aria-hidden="true"></span>
            <span className={c.button_burger_line} aria-hidden="true"></span>
        </button>
	)
}
