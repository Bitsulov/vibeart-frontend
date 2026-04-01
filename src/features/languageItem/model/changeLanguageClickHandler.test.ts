import {describe, expect, it, vi} from "vitest";
import {changeLanguageClickHandler} from "./changeLanguageClickHandler";
import {setLanguage} from "entities/appConfig";
import type { Location } from "react-router-dom";

describe("changeLanguageClickHandler - обработчик смены языка", () => {
    const makeMocks = (search = "") => ({
        i18n: {changeLanguage: vi.fn().mockResolvedValue(undefined)},
        dispatch: vi.fn(),
        navigate: vi.fn(),
        location: {search} as Location,
    });

    it("Вызывает i18n.changeLanguage с переданным языком", () => {
        const {i18n, dispatch, navigate, location} = makeMocks();

        changeLanguageClickHandler("en", i18n as never, dispatch, navigate, location);

        expect(i18n.changeLanguage).toHaveBeenCalledWith("en");
    });

    it("Диспатчит setLanguage с переданным языком", () => {
        const {i18n, dispatch, navigate, location} = makeMocks();

        changeLanguageClickHandler("en", i18n as never, dispatch, navigate, location);

        expect(dispatch).toHaveBeenCalledWith(setLanguage("en"));
    });

    it("Вызывает navigate с параметром lang и replace: true", () => {
        const {i18n, dispatch, navigate, location} = makeMocks("?foo=bar");

        changeLanguageClickHandler("ru", i18n as never, dispatch, navigate, location);

        expect(navigate).toHaveBeenCalledWith(
            {search: "foo=bar&lang=ru"},
            {replace: true},
        );
    });

    it("Перезаписывает уже существующий параметр lang", () => {
        const {i18n, dispatch, navigate, location} = makeMocks("?lang=en");

        changeLanguageClickHandler("ru", i18n as never, dispatch, navigate, location);

        expect(navigate).toHaveBeenCalledWith(
            {search: "lang=ru"},
            {replace: true},
        );
    });
});