import type { i18n } from "i18next";
import type {Dispatch} from "@reduxjs/toolkit";
import {setLanguage} from "entities/appConfig";
import type {NavigateFunction} from "react-router-dom";
import type {Location} from "react-router-dom";

/**
 * Меняет язык интерфейса: обновляет i18n, Redux и параметр `lang` в URL.
 *
 * @param lang - Код нового языка (например, `"ru"`, `"en"`).
 * @param i18n - Экземпляр i18next.
 * @param dispatch - Функция диспатча Redux.
 * @param navigate - Функция навигации React Router.
 * @param location - Текущий объект location React Router.
 */
export function changeLanguageClickHandler(lang: string, i18n: i18n, dispatch: Dispatch, navigate: NavigateFunction, location: Location) {
    i18n.changeLanguage(lang)
        .catch((er) => console.error("change language error:", er));

    dispatch(setLanguage(lang));

    const params = new URLSearchParams(location.search);
    params.set('lang', lang);
    navigate({search: params.toString()}, {replace: true});
}
