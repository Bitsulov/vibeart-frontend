import flag_ru from "shared/icons/flag_ru.svg";
import flag_us from "shared/icons/flag_us.svg";

export const languagesConfig: Record<string, string[]> = {
    ru: [flag_ru, "Русский", "ariaLabel.chooseRussian", "languages.altRu", "ru"],
    en: [flag_us, "English", "ariaLabel.chooseEnglish", "languages.altEn", "en"],
}
