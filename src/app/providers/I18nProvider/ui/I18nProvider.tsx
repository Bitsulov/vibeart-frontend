import type { ReactNode } from "react";
import i18n from "i18next";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "shared/locales/en.json";
import ru from "shared/locales/ru.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
    resources: {
        en: { translation: en },
        ru: { translation: ru }
    },
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    },
	detection: {
		order: ["navigator", "htmlTag", "localStorage", "cookie"],
		caches: ["localStorage", "cookie"],
	},
});

interface I18nProviderPropsType {
    children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderPropsType) => {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
