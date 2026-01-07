import type { i18n } from "i18next";
import type { LanguagesType } from "../config/languages";

export function changeLanguageHandler(
    e: React.MouseEvent,
    i18n: i18n,
    lang: LanguagesType,
	country: string,
    setCurrentLanguage: React.Dispatch<React.SetStateAction<string>>,
    setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>
) {
    i18n.changeLanguage(lang);
	setCurrentLanguage(country);
	setIsSelectOpen(false);
}
