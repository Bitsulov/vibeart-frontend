import c from "./headerLanguageButton.module.scss";
import {useTranslation} from "react-i18next";
import {languageButtonClickHandler} from "../model/languageButtonClickHandler";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {defaultTransitionTime} from "shared/const/const";

interface HeaderLanguageButtonProps {
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>;
    isShowChangeLanguage: boolean;
    isBurgerOpen: boolean;
    languagesConfig: Record<string, string[]>
}

export const HeaderLanguageButton = ({
    setIsShowChangeLanguage,
    isShowChangeLanguage,
    isBurgerOpen,
    languagesConfig,
     ...props
}: HeaderLanguageButtonProps) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);
    const languageData = languagesConfig[currentLanguage] || languagesConfig["en"];
    const [isShowButton, setIsShowButton] = useState<boolean>(true);
    const transitionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"))
        || defaultTransitionTime;

    useEffect(() => {
        isBurgerOpen ?
            setTimeout(() => {
                setIsShowButton(false);
            }, transitionTime / 3)
        : setIsShowButton(true);
    }, [isBurgerOpen]);

	return (
        <>
            {isShowButton &&
                <button
                    className={clsx(c.button_language, isBurgerOpen && c.hiding)}
                    aria-expanded={isShowChangeLanguage} {...props}
                    aria-label={t("ariaLabel.showLanguageToggler")}
                    onClick={() => languageButtonClickHandler(setIsShowChangeLanguage)}
                >
                    <img
                        loading="lazy"
                        decoding="async"
                        width="19"
                        height="19"
                        src={languageData[0]}
                        alt={t(languageData[3])}
                        className={c.flag_img}
                    />
                </button>
            }
        </>
    )
}
