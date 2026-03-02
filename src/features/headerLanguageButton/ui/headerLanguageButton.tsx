import c from "./headerLanguageButton.module.scss";
import {useTranslation} from "react-i18next";
import {languageButtonClickHandler} from "../model/languageButtonClickHandler";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import React from "react";
import {languagesConfig} from "../config/languagesConfig";

interface HeaderLanguageButtonProps {
    setIsShowChangeLanguage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HeaderLanguageButton = ({
    setIsShowChangeLanguage,
     ...props
}: HeaderLanguageButtonProps) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);
    const languageData = languagesConfig[currentLanguage];

	return (
        <button
            className={c.button_language}
            aria-expanded="false" {...props}
            onClick={() => languageButtonClickHandler(setIsShowChangeLanguage)}
        >
            <img
                width="19"
                height="19"
                src={languageData[0]}
                alt={t(languageData[1])}
                className={c.flag_img}
            />
        </button>
    )
}
