import type { i18n } from "i18next";

export function changeLanguageClickHandler(lang: string, i18n: i18n) {
    i18n.changeLanguage(lang)
        .catch((er) => console.error("change language error:", er));
}
